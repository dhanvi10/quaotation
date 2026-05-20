"use client";

export async function exportQuotationPdf(): Promise<void> {
  const element = document.getElementById("quotation-print-root");
  if (!element) {
    throw new Error("Quotation preview not found");
  }

  const html2pdf = (await import("html2pdf.js")).default;

  const companyEl = element.querySelector("h1");
  const companyName = companyEl?.textContent?.trim() || "quotation";

  const opt = {
    margin: [0, 0, 0, 0] as [number, number, number, number],
    filename: `${companyName}-quotation.pdf`,
    image: { type: "jpeg" as const, quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true,
      logging: false,
      windowWidth: element.scrollWidth,
    },
    jsPDF: {
      unit: "mm" as const,
      format: "a4" as const,
      orientation: "portrait" as const,
    },
    pagebreak: { mode: ["avoid-all", "css", "legacy"] },
  };

  await html2pdf().set(opt as Record<string, unknown>).from(element).save();
}
