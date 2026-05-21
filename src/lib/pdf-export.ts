"use client";

import {
  prepareCloneForCanvas,
  waitForExportReady,
  withPreviewAtFullScale,
} from "@/lib/export-utils";

const A4_WIDTH_PX = 794;

/**
 * Export quotation PDF — pixel-perfect match to live preview.
 * Captures #quotation-print-root at 100% scale (no zoom transform).
 */
export async function exportQuotationPdf(): Promise<void> {
  await withPreviewAtFullScale(async () => {
    await waitForExportReady();

    // Target the single live preview paper — ExportMirror has been removed
    const root = document.getElementById("quotation-print-root");
    if (!root) {
      throw new Error("Quotation element not found for PDF export.");
    }

    const paper =
      (root.querySelector(".quotation-paper") as HTMLElement | null) ?? root;

    const html2pdf = (await import("html2pdf.js")).default;

    const companyEl = paper.querySelector("h1");
    const companyName = companyEl?.textContent?.trim() || "quotation";
    const safeFilename =
      companyName.replace(/[^\w\u0A80-\u0AFF\s-]/g, "").trim() || "quotation";

    const width = Math.max(paper.offsetWidth, paper.scrollWidth, A4_WIDTH_PX);
    const height = Math.max(paper.offsetHeight, paper.scrollHeight, 1123);

    const opt = {
      margin: 0,
      filename: `${safeFilename}-quotation.pdf`,
      image: { type: "jpeg" as const, quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: "#ffffff",
        width,
        height,
        windowWidth: width,
        windowHeight: height,
        scrollX: 0,
        scrollY: -window.scrollY,
        x: 0,
        y: 0,
        onclone: (clonedDoc: Document) => {
          prepareCloneForCanvas(clonedDoc, paper);
        },
      },
      jsPDF: {
        unit: "mm" as const,
        format: "a4" as const,
        orientation: "portrait" as const,
      },
      pagebreak: { mode: ["avoid-all"] as string[] },
    };

    await html2pdf().set(opt as Record<string, unknown>).from(paper).save();
  });
}
