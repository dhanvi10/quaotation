"use client";

import { useEffect, useRef } from "react";
import { QuotationPaper } from "@/components/preview/quotation-paper";

export default function PrintPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Remove dark mode
    document.documentElement.classList.remove("dark");
    document.body.classList.remove("dark");

    // Ensure content is visible before printing
    const t = setTimeout(() => {
      // Ensure the container is visible for mobile
      if (containerRef.current) {
        containerRef.current.style.display = "block";
      }

      // For mobile, we need to ensure the print dialog opens after content is rendered
      const printDelay = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? 1000 : 500;
      
      setTimeout(() => {
        window.print();
      }, printDelay);
    }, 300);

    return () => clearTimeout(t);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="print-page-root bg-white p-0" 
      style={{ display: "block", width: "100%" }}
    >
      <div id="quotation-print-root" style={{ width: "100%", backgroundColor: "white" }}>
        <QuotationPaper />
      </div>
    </div>
  );
}
