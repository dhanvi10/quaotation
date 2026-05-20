"use client";

/**
 * Exports the quotation paper as a high-quality A4 PDF.
 * Targets #quotation-print-root — the isolated printable element.
 */
export async function exportQuotationPdf(): Promise<void> {
  const root = document.getElementById("quotation-print-root");
  if (!root) {
    throw new Error("Quotation preview element (#quotation-print-root) not found.");
  }

  // Grab the inner .quotation-paper element for accurate sizing
  const paper =
    (root.querySelector(".quotation-paper") as HTMLElement | null) ?? root;

  const html2pdf = (await import("html2pdf.js")).default;

  // Derive filename from company heading
  const companyEl = paper.querySelector("h1");
  const companyName = companyEl?.textContent?.trim() || "quotation";
  const safeFilename = companyName.replace(/[^\w\s-]/g, "").trim() || "quotation";

  const opt = {
    margin: [0, 0, 0, 0] as [number, number, number, number],
    filename: `${safeFilename}-quotation.pdf`,
    image: { type: "jpeg" as const, quality: 0.99 },
    html2canvas: {
      scale: 3,                  // Higher DPI for crisp Gujarati text
      useCORS: true,
      allowTaint: true,
      letterRendering: true,
      logging: false,
      backgroundColor: "#ffffff",
      windowWidth: 794,          // ~210mm at 96dpi
      windowHeight: 1123,        // ~297mm at 96dpi
      scrollX: 0,
      scrollY: 0,
      onclone: (clonedDoc: Document) => {
        // Ensure cloned element has no transform scale applied
        const clonedPaper = clonedDoc.querySelector(
          ".quotation-paper"
        ) as HTMLElement | null;
        if (clonedPaper) {
          clonedPaper.style.transform = "none";
          clonedPaper.style.width = "210mm";
          clonedPaper.style.minHeight = "297mm";
        }
      },
    },
    jsPDF: {
      unit: "mm" as const,
      format: "a4" as const,
      orientation: "portrait" as const,
      compress: true,
    },
    pagebreak: {
      mode: ["css", "legacy"] as string[],
      avoid: [".quotation-paper"],
    },
  };

  await html2pdf()
    .set(opt as Record<string, unknown>)
    .from(paper)
    .save();
}
