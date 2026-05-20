"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { EditorPanel } from "@/components/editor/editor-panel";
import { PreviewPanel } from "@/components/layout/preview-panel";
import { ExportToolbar } from "@/components/layout/export-toolbar";

export function AppShell() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      {/* Sticky top toolbar — hidden in print */}
      <div className="no-print">
        <ExportToolbar />
      </div>

      {/* Mobile header — hidden in print */}
      <header className="no-print border-b border-border/50 bg-background/60 px-4 py-4 backdrop-blur-lg lg:hidden">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-display text-xl font-extrabold tracking-tight">
              ક્વોટેશન બિલ્ડર
            </h1>
            <p className="font-gujarati text-xs text-muted-foreground">
              સુખનાથ ઈલેક્ટ્રીકલ • Premium
            </p>
          </div>
        </motion.div>
      </header>

      {/* Main two-column layout */}
      <main className="mx-auto max-w-[1800px] px-3 py-4 sm:px-4 lg:grid lg:grid-cols-[minmax(360px,440px)_1fr] lg:gap-6 lg:px-6 lg:py-6">
        {/* Editor panel — mobile: below preview */}
        <section className="no-print order-2 lg:order-1 lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto lg:pr-1 custom-scrollbar">
          <div className="mb-5 hidden lg:block">
            <h1 className="font-display text-2xl font-extrabold tracking-tight">
              ક્વોટેશન બિલ્ડર
            </h1>
            <p className="mt-1 font-gujarati text-sm text-muted-foreground">
              પ્રીમિયમ ગુજરાતી ક્વોટેશન — મોબાઇલ ફ્રેન્ડલી
            </p>
          </div>
          <EditorPanel />
        </section>

        {/* Preview panel — mobile: on top */}
        <section className="order-1 mb-4 lg:order-2 lg:sticky lg:top-16 lg:mb-0 lg:max-h-[calc(100vh-4rem)] lg:min-h-[600px]">
          <PreviewPanel />
        </section>
      </main>
    </div>
  );
}
