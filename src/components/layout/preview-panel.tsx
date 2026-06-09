"use client";

import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { QuotationPaper } from "@/components/preview/quotation-paper";
import { useQuotationStore } from "@/store/quotation-store";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

export function PreviewPanel() {
  const previewZoom = useQuotationStore((s) => s.previewZoom);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Panel header */}
      <div className="mb-4 flex items-center justify-between gap-2 px-1 lg:px-0">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Eye className="h-4 w-4" />
          </div>
          <div>
            <h2 className="font-display text-lg font-bold">લાઇવ પ્રિવ્યૂ</h2>
            <p className="text-xs text-muted-foreground">A4 • પ્રિન્ટ રેડી</p>
          </div>
        </div>
        <Badge variant="secondary" className="font-gujarati">
          ઑટો-સેવ ચાલુ
        </Badge>
      </div>

      {/* Scrollable preview area */}
      <div className="custom-scrollbar flex-1 overflow-auto rounded-2xl bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50/80 p-3 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 sm:p-6">
        {/*
          The outer motion.div applies the zoom transform for the UI preview.
          The inner #quotation-print-root is the isolated print/PDF target —
          it must NOT have any transform applied to it directly.
        */}
        {mounted && (
          <motion.div
            layout
            className="preview-zoom-wrapper mx-auto origin-top transition-transform duration-300"
            style={{
              transform: `scale(${previewZoom})`,
              width: "210mm",
              // Shrink the layout footprint so the container doesn't overflow
              marginBottom: `calc((${previewZoom} - 1) * 297mm)`,
            }}
          >
            <div className="shadow-paper rounded-sm">
              {/* Print/PDF isolation root — no transforms inside */}
              <div id="quotation-print-root">
                <QuotationPaper />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
