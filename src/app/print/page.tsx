"use client";

import { useEffect } from "react";
import { QuotationPaper } from "@/components/preview/quotation-paper";

export default function PrintPage() {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
    const t = setTimeout(() => window.print(), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="print-page-root bg-white p-0">
      <div id="quotation-print-root">
        <QuotationPaper />
      </div>
    </div>
  );
}
