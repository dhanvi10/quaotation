"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Printer,
  Save,
  ZoomIn,
  ZoomOut,
  Moon,
  Sun,
  RotateCcw,
  FolderOpen,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useQuotationStore } from "@/store/quotation-store";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { exportQuotationPdf } from "@/lib/pdf-export";

export function ExportToolbar() {
  const { theme, setTheme } = useTheme();
  const [exporting, setExporting] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const previewZoom = useQuotationStore((s) => s.previewZoom);
  const setField = useQuotationStore((s) => s.setField);
  const reset = useQuotationStore((s) => s.reset);
  const saveTemplate = useQuotationStore((s) => s.saveTemplate);
  const savedTemplates = useQuotationStore((s) => s.savedTemplates);
  const loadTemplate = useQuotationStore((s) => s.loadTemplate);

  const handlePdf = async () => {
    setExporting(true);
    try {
      await exportQuotationPdf();
    } finally {
      setExporting(false);
    }
  };

  const handlePrint = () => {
    // Open a new window for the print page to ensure proper rendering on mobile
    const printWindow = window.open("/print", "_blank", "width=800,height=600");
    
    if (!printWindow) {
      alert("Please disable pop-up blockers to use the print feature");
      return;
    }

    // Monitor the new window for readiness
    printWindow.addEventListener("load", () => {
      // Ensure print dialog opens on mobile with enough delay
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const delay = isMobile ? 800 : 400;
      
      setTimeout(() => {
        printWindow.print();
      }, delay);
    });
  };

  return (
    <>
      {/* Desktop top bar */}
      <div className="sticky top-0 z-40 hidden border-b border-border/60 bg-background/80 backdrop-blur-xl lg:block">
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2" onClick={handlePrint}>
              <Printer className="h-4 w-4" />
              પ્રિન્ટ
            </Button>
            <Button
              size="sm"
              className="gap-2"
              onClick={handlePdf}
              disabled={exporting}
            >
              <Download className="h-4 w-4" />
              {exporting ? "તૈયાર થાય છે…" : "PDF ડાઉનલોડ"}
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary" size="sm" className="gap-2">
                  <Save className="h-4 w-4" />
                  ટેમ્પલેટ સેવ
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="font-display">ટેમ્પલેટ સેવ કરો</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 pt-2">
                  <Label>નામ</Label>
                  <Input
                    placeholder="ઉદા. શિવાય ગ્લોરી - અંડરગ્રાઉન્ડ"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                  />
                  <Button
                    className="w-full"
                    onClick={() => {
                      if (templateName.trim()) {
                        saveTemplate(templateName.trim());
                        setTemplateName("");
                      }
                    }}
                  >
                    સેવ કરો
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            {savedTemplates.length > 0 && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <FolderOpen className="h-4 w-4" />
                    લોડ ({savedTemplates.length})
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="font-display">સેવ ટેમ્પલેટ</DialogTitle>
                  </DialogHeader>
                  <ul className="max-h-64 space-y-2 overflow-y-auto custom-scrollbar">
                    {savedTemplates.map((t) => (
                      <li key={t.id}>
                        <button
                          type="button"
                          className="w-full rounded-xl border px-4 py-3 text-left text-sm hover:bg-muted"
                          onClick={() => loadTemplate(t)}
                        >
                          <span className="font-semibold">{t.name}</span>
                          <span className="mt-1 block text-xs text-muted-foreground">
                            {new Date(t.createdAt).toLocaleDateString("gu-IN")}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </DialogContent>
              </Dialog>
            )}
            <Button variant="ghost" size="sm" onClick={() => reset()}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setField("previewZoom", Math.max(0.35, previewZoom - 0.05))}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="min-w-[3rem] text-center text-xs text-muted-foreground">
              {Math.round(previewZoom * 100)}%
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setField("previewZoom", Math.min(1, previewZoom + 0.05))}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile floating toolbar */}
      <motion.div
        initial={{ y: 80 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/80 bg-background/95 p-3 shadow-2xl backdrop-blur-xl lg:hidden"
      >
        <div className="flex gap-2 overflow-x-auto pb-safe">
          <Button size="sm" variant="outline" className="shrink-0 gap-1.5" onClick={handlePrint}>
            <Printer className="h-4 w-4" />
            પ્રિન્ટ
          </Button>
          <Button size="sm" className="shrink-0 gap-1.5" onClick={handlePdf} disabled={exporting}>
            <Download className="h-4 w-4" />
            PDF
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="secondary" className="shrink-0 gap-1.5">
                <Save className="h-4 w-4" />
                સેવ
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-display">ટેમ્પલેટ સેવ</DialogTitle>
              </DialogHeader>
              <Input
                placeholder="ટેમ્પલેટ નામ"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
              />
              <Button
                className="mt-3 w-full"
                onClick={() => templateName.trim() && saveTemplate(templateName.trim())}
              >
                સેવ કરો
              </Button>
            </DialogContent>
          </Dialog>
          <Button size="sm" variant="ghost" className="shrink-0" onClick={() => reset()}>
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="shrink-0"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </motion.div>
    </>
  );
}
