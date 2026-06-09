"use client";

import {
  prepareCloneForCanvas,
  waitForExportReady,
  withPreviewAtFullScale,
} from "@/lib/export-utils";
import { toPng } from "html-to-image";

const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;

// Device detection
const getDeviceInfo = () => ({
  isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent),
  isAndroid: /Android/.test(navigator.userAgent),
  isMobile: /Mobile|Android|iPhone/.test(navigator.userAgent),
});

/**
 * Export quotation PDF using html-to-image + jsPDF.
 * More reliable than html2pdf.js, especially on mobile.
 */
export async function exportQuotationPdf(): Promise<void> {
  const device = getDeviceInfo();

  await withPreviewAtFullScale(async () => {
    await waitForExportReady();

    // Extended delay for iOS Safari font rendering
    await new Promise((resolve) =>
      setTimeout(resolve, device.isIOS ? 800 : 500)
    );

    // Target the single live preview paper
    const root = document.getElementById("quotation-print-root");
    if (!root) {
      throw new Error("Quotation element not found for PDF export.");
    }

    const paper =
      (root.querySelector(".quotation-paper") as HTMLElement | null) ?? root;

    const companyEl = paper.querySelector("h1");
    const companyName = companyEl?.textContent?.trim() || "quotation";
    const safeFilename =
      companyName.replace(/[^\w\u0A80-\u0AFF\s-]/g, "").trim() || "quotation";

    try {
      // Convert HTML to PNG image with proper scaling for PDF embedding
      // Lower pixelRatio to prevent oversized images on mobile
      const scale = device.isMobile ? 1.5 : 2;
      const pngDataUrl = await toPng(paper, {
        cacheBust: true,
        pixelRatio: scale,
        backgroundColor: "#ffffff",
        quality: 0.98,
      });

      // Import jsPDF dynamically
      const { jsPDF } = await import("jspdf");

      // Get the actual rendered size from the element (not scaled, actual DOM size)
      const paperWidth = paper.offsetWidth; // Original element width in pixels
      const paperHeight = paper.offsetHeight; // Original element height in pixels

      // A4 dimensions in mm
      const pdfWidth = 210;
      const pdfHeight = 297;

      // Calculate the aspect ratio from the actual paper element
      const aspectRatio = paperHeight / paperWidth;
      
      // Calculate PDF image height maintaining aspect ratio
      const calculatedHeight = pdfWidth * aspectRatio;
      
      // Ensure height doesn't exceed A4 page height
      const finalHeight = Math.min(calculatedHeight, pdfHeight);

      // Create PDF with A4 size
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Add image to PDF centered and properly sized
      pdf.addImage(pngDataUrl, "PNG", 0, 0, pdfWidth, finalHeight);

      // Handle download based on device
      if (device.isIOS) {
        // iOS: open in new tab
        const pdfDataUrl = pdf.output("bloburi");

        const link = document.createElement("a");
        link.href = pdfDataUrl.toString();
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (device.isAndroid) {
        // Android: open in new tab
        const blob = pdf.output("blob");
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl, "_blank");
        setTimeout(() => URL.revokeObjectURL(blobUrl), 5000);
      } else {
        // Desktop: direct download
        pdf.save(`${safeFilename}-quotation.pdf`);
      }
    } catch (error) {
      console.error("PDF export failed:", error);
      // Fallback: use native print
      console.warn("PDF export failed, falling back to print dialog");
      window.print();
    }
  });
}
