"use client";

import { QuotationPaper } from "./quotation-paper";

/**
 * Full-size hidden render used only for PDF export (no preview zoom).
 * Kept in sync via Zustand — same data as preview.
 */
export function ExportMirror() {
  return (
    <div
      id="quotation-export-mount"
      className="pointer-events-none fixed left-0 top-0 -z-[100] opacity-0"
      style={{ width: "210mm", minWidth: "800px" }}
      aria-hidden
    >
      <div id="quotation-export-root" className="bg-white">
        <QuotationPaper />
      </div>
    </div>
  );
}
