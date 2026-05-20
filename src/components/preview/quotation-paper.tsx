"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { DgvclBadge } from "./dgvcl-badge";
import { useQuotationStore, getCompanyDisplayName, getOfficeAddress, getSiteLocation } from "@/store/quotation-store";
import { useActiveTheme } from "@/hooks/use-theme-colors";
import { PRIMARY_CONTACT, SUBTITLE } from "@/data/presets";
import { formatGujaratiDate } from "@/lib/utils";
import type { BorderStyle } from "@/types/quotation";

function borderClass(style: BorderStyle): string {
  if (style === "double") return "border-[3px] border-double";
  if (style === "elegant") return "border-2 border-solid shadow-[inset_0_0_0_1px_rgba(255,255,255,0.5)]";
  return "border border-solid";
}

export function QuotationPaper({ id }: { id?: string }) {
  const theme = useActiveTheme();
  const borderStyle = useQuotationStore((s) => s.borderStyle);
  const companyId = useQuotationStore((s) => s.companyId);
  const customCompanyName = useQuotationStore((s) => s.customCompanyName);
  const showSecondary = useQuotationStore((s) => s.showSecondaryContact);
  const secondaryName = useQuotationStore((s) => s.secondaryContactName);
  const secondaryPhone = useQuotationStore((s) => s.secondaryContactPhone);
  const state = useQuotationStore();
  const clauses = useQuotationStore((s) => s.clauses);
  const footerNote = useQuotationStore((s) => s.footerNote);
  const quotationNumber = useQuotationStore((s) => s.quotationNumber);
  const quotationDate = useQuotationStore((s) => s.quotationDate);
  const companyLogo = useQuotationStore((s) => s.companyLogo);
  const watermarkImage = useQuotationStore((s) => s.watermarkImage);
  const stampImage = useQuotationStore((s) => s.stampImage);

  const companyName = getCompanyDisplayName({ companyId, customCompanyName });
  const address = getOfficeAddress(state);
  const site = getSiteLocation(state);

  const formattedDate = useMemo(() => {
    try {
      return formatGujaratiDate(new Date(quotationDate));
    } catch {
      return quotationDate;
    }
  }, [quotationDate]);

  const paperStyle = {
    "--q-primary": theme.primary,
    "--q-accent": theme.accent,
    background: theme.paperBg,
    borderColor: theme.primary,
  } as React.CSSProperties;

  return (
    <article
      id={id}
      className="quotation-paper relative mx-auto w-[210mm] min-h-[297mm] overflow-hidden print:shadow-none"
      style={paperStyle}
    >
      {/* Watermark */}
      {watermarkImage ? (
        <img
          src={watermarkImage}
          alt=""
          className="pointer-events-none absolute inset-0 z-0 h-full w-full object-contain opacity-[0.06]"
        />
      ) : (
        <div
          className="pointer-events-none absolute bottom-[18%] right-[12%] z-0 h-48 w-24 opacity-[0.05]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 120'%3E%3Crect x='27' y='0' width='6' height='100' fill='${encodeURIComponent(theme.primary)}'/%3E%3Cline x1='0' y1='18' x2='60' y2='18' stroke='${encodeURIComponent(theme.primary)}' stroke-width='3'/%3E%3Cline x1='5' y1='38' x2='55' y2='38' stroke='${encodeURIComponent(theme.primary)}' stroke-width='3'/%3E%3C/svg%3E")`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
        />
      )}

      <div
        className={`relative z-10 m-3 flex min-h-[calc(297mm-24px)] flex-col ${borderClass(borderStyle)} p-5 md:p-6`}
        style={{ borderColor: theme.primary }}
      >
        {/* Meta row */}
        <div className="mb-3 flex flex-wrap justify-between gap-2 font-sans text-[10px] text-slate-600">
          <span>
            <strong>ક્વોટે. નં:</strong> {quotationNumber}
          </span>
          <span>
            <strong>તારીખ:</strong> {formattedDate}
          </span>
        </div>

        {/* Header */}
        <header className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_1.4fr_1fr] sm:items-start">
          <div className="order-2 sm:order-1">
            <div
              className="inline-block rounded-br-2xl px-4 py-2 text-[11px] font-bold leading-snug text-white shadow-md"
              style={{ background: theme.headerGradient }}
            >
              {SUBTITLE}
            </div>
          </div>

          <div className="order-1 text-center sm:order-2">
            {companyLogo && (
              <img src={companyLogo} alt="" className="mx-auto mb-2 h-14 w-auto object-contain" />
            )}
            <h1
              className="company-gradient-text font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl"
              style={{
                backgroundImage: theme.headerGradient,
              }}
            >
              {companyName}
            </h1>
            <p
              className="mt-1.5 font-gujarati text-sm font-semibold leading-relaxed sm:text-base"
              style={{ color: theme.accent }}
            >
              {address}
            </p>
          </div>

          <div className="order-3 text-center sm:text-right">
            <p className="font-gujarati text-sm font-bold text-slate-900">{PRIMARY_CONTACT.name}</p>
            <p className="font-sans text-sm font-semibold text-slate-700">
              મો. {PRIMARY_CONTACT.phone}
            </p>
            {showSecondary && (
              <>
                <p className="mt-1 font-gujarati text-xs font-semibold text-slate-800">
                  {secondaryName}
                </p>
                <p className="font-sans text-sm text-slate-600">મો. {secondaryPhone}</p>
              </>
            )}
            <div className="mt-2 flex justify-center sm:justify-end">
              <DgvclBadge />
            </div>
            {stampImage && (
              <img
                src={stampImage}
                alt="stamp"
                className="mt-2 ml-auto h-16 w-16 object-contain opacity-90"
              />
            )}
          </div>
        </header>

        {/* Location glass box */}
        <motion.div
          layout
          className="glass-location my-4 rounded-2xl px-4 py-3 sm:px-5 sm:py-4"
          style={{
            background: theme.locationBg,
            border: `2px solid ${theme.locationBorder}`,
            boxShadow: `0 8px 32px -8px ${theme.primary}33`,
          }}
        >
          <p className="font-display text-lg font-bold leading-snug sm:text-xl" style={{ color: theme.primary }}>
            <span className="mr-2">સ્થળ :</span>
            <span className="font-gujarati font-semibold" style={{ color: theme.accent }}>
              {site || "—"}
            </span>
          </p>
        </motion.div>

        {/* Clauses */}
        <div className="flex-1 space-y-2.5" style={{ color: theme.bodyText }}>
          {clauses.map((clause, i) => {
            const text = clause.html.replace(/<[^>]+>/g, "").trim();
            if (!text) return null;
            return (
              <div key={clause.id} className="flex gap-2 text-[13px] leading-relaxed sm:text-sm">
                <span
                  className="mt-0.5 shrink-0 font-display text-sm font-bold"
                  style={{ color: theme.primary }}
                >
                  ({i + 1})
                </span>
                <div
                  className="clause-content flex-1 text-justify font-gujarati"
                  dangerouslySetInnerHTML={{ __html: clause.html }}
                />
              </div>
            );
          })}
        </div>

        {footerNote.trim() && (
          <p
            className="mt-4 text-right font-gujarati text-sm font-bold"
            style={{ color: theme.primary }}
          >
            {footerNote}
          </p>
        )}

        {/* Signatures */}
        <footer className="mt-6 grid grid-cols-[1fr_3px_1fr] gap-0 pt-4">
          <div
            className="flex min-h-[72px] items-start justify-center rounded-tl-xl p-3"
            style={{ background: theme.sigBg }}
          >
            <span className="font-display text-sm font-bold" style={{ color: theme.primary }}>
              કામ આપનારની સહી
            </span>
          </div>
          <div style={{ background: theme.primary }} />
          <div
            className="flex min-h-[72px] items-start justify-center rounded-tr-xl p-3"
            style={{ background: theme.sigBg }}
          >
            <span className="font-display text-sm font-bold" style={{ color: theme.primary }}>
              કામ લેનારની સહી
            </span>
          </div>
        </footer>
      </div>
    </article>
  );
}
