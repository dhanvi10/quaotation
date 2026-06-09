"use client";

import { DgvclBadge } from "./dgvcl-badge";
import {
  useQuotationStore,
  getCompanyDisplayName,
  getOfficeAddress,
  getSiteLocation,
} from "@/store/quotation-store";
import { useActiveTheme } from "@/hooks/use-theme-colors";
import { PRIMARY_CONTACT } from "@/data/presets";
import { cn } from "@/lib/utils";
import type { BorderStyle } from "@/types/quotation";

function borderClass(style: BorderStyle): string {
  if (style === "double") return "border-[5px] border-double";
  if (style === "elegant")
    return "border-4 border-solid shadow-[inset_0_0_0_1px_rgba(255,255,255,0.5)]";
  return "border border-solid";
}

const FONT_SIZE_MAP = {
  sm: "text-[11px]",
  base: "text-[13px]",
  lg: "text-[15px]",
} as const;

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
  const companyLogo = useQuotationStore((s) => s.companyLogo);
  const watermarkImage = useQuotationStore((s) => s.watermarkImage);
  const stampImage = useQuotationStore((s) => s.stampImage);
  const descriptionFontSize = useQuotationStore((s) => s.descriptionFontSize);

  const companyName = getCompanyDisplayName({ companyId, customCompanyName });
  const address = getOfficeAddress(state);
  const site = getSiteLocation(state);

  const paperStyle = {
    "--q-primary": theme.primary,
    "--q-accent": theme.accent,
    background: theme.paperBg,
    borderColor: theme.primary,
  } as React.CSSProperties;

  return (
    <article
      id={id}
      className="quotation-paper relative mx-auto w-[210mm] overflow-x-hidden print:shadow-none"
      style={paperStyle}
    >
      {/* ── Watermark ── */}
      {watermarkImage ? (
        <img
          src={watermarkImage}
          alt=""
          className="pointer-events-none absolute inset-0 z-0 h-full w-full object-contain opacity-[0.06]"
        />
      ) : (
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-[0.06]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-500 96 900 250"
            className="h-full w-full"
            aria-hidden="true"
          >
            {/* Background diagonal lines */}
            <g fill="none" strokeLinecap="round">
              <g stroke={theme.primary} strokeWidth="1.5" opacity="0.4">
                <line x1="-50" y1="200" x2="450" y2="-50" />
                <line x1="-50" y1="260" x2="450" y2="10" />
                <line x1="-50" y1="320" x2="450" y2="70" />
                <line x1="-50" y1="380" x2="450" y2="130" />
                <line x1="-50" y1="440" x2="450" y2="190" />
                <line x1="-50" y1="500" x2="450" y2="250" />
                <line x1="-50" y1="560" x2="450" y2="310" />
                <line x1="-50" y1="620" x2="450" y2="370" />
                <line x1="-50" y1="680" x2="450" y2="430" />
              </g>
              {/* Central vertical pole */}
              <line x1="200" y1="260" x2="200" y2="680" stroke={theme.primary} strokeWidth="26" />
              {/* Top slanted crossbar */}
              <line x1="100" y1="510" x2="310" y2="405" stroke={theme.primary} strokeWidth="26" />
              {/* Bottom slanted crossbar */}
              <line x1="100" y1="615" x2="310" y2="510" stroke={theme.primary} strokeWidth="26" />
              {/* Top crossbar pins */}
              <g stroke={theme.primary} strokeWidth="12">
                <line x1="125" y1="480" x2="125" y2="497" />
                <line x1="165" y1="460" x2="165" y2="478" />
                <line x1="240" y1="422" x2="240" y2="440" />
                <line x1="280" y1="402" x2="280" y2="420" />
              </g>
              {/* Bottom crossbar pins */}
              <g stroke={theme.primary} strokeWidth="12">
                <line x1="125" y1="585" x2="125" y2="602" />
                <line x1="165" y1="565" x2="165" y2="583" />
                <line x1="240" y1="527" x2="240" y2="545" />
                <line x1="280" y1="507" x2="280" y2="525" />
              </g>
            </g>
          </svg>
        </div>
      )}

      {/* ── Inner bordered content ── */}
      <div
        className={cn(
          "relative z-10 flex flex-col p-5",
          borderClass(borderStyle)
        )}
        style={{
          borderColor: theme.primary,
          margin: "6mm",
          minHeight: "calc(297mm - 12mm)",
          boxSizing: "border-box",
        }}
      >
        {/* ── Header ─────────────────────────────────────────────────────────
            Layout matches reference:
            [Left: name + phones]  [Center: logo + company + address]  [Right: DGVCL badge]
        ──────────────────────────────────────────────────────────────────── */}
        <header
          className="grid items-start gap-3"
          style={{ gridTemplateColumns: "minmax(0,auto) minmax(0,2fr) minmax(0,auto)" }}
        >
          {/* Col 1 — primary contact name + phones */}
          <div className="flex flex-col gap-0.5 pt-1">
            <p
              className="font-gujarati font-bold leading-snug"
              style={{ color: theme.primary, fontSize: "0.85rem" }}
            >
              {PRIMARY_CONTACT.name}
            </p>
            <p
              className="font-sans font-semibold tabular-nums"
              style={{ color: theme.primary, fontSize: "0.82rem" }}
            >
              મો. {PRIMARY_CONTACT.phone}
            </p>
            {showSecondary && (
              <>
                <p
                  className="mt-1 font-gujarati font-semibold leading-snug"
                  style={{ color: theme.primary, fontSize: "0.82rem" }}
                >
                  {secondaryName}
                </p>
                <p
                  className="font-sans font-semibold tabular-nums"
                  style={{ color: theme.primary, fontSize: "0.82rem" }}
                >
                  મો. {secondaryPhone}
                </p>
              </>
            )}
          </div>

          {/* Col 2 — logo (optional) + company name + address */}
          <div className="flex flex-col items-center text-center">
            {companyLogo && (
              <img
                src={companyLogo}
                alt=""
                className="mx-auto mb-2 h-14 w-auto object-contain"
              />
            )}
            <h1
              className="company-gradient-text font-display font-extrabold tracking-tight"
              style={{
                backgroundImage: theme.headerGradient,
                fontSize: "3rem",
              }}
            >
              {companyName}
            </h1>
            <p
              className="mt-1 font-gujarati font-semibold leading-relaxed"
              style={{ color: theme.accent, fontSize: "0.82rem" }}
            >
              {address}
            </p>
          </div>

          {/* Col 3 — DGVCL badge + optional stamp */}
          <div className="flex flex-col items-end gap-2 pt-1">
            <DgvclBadge />
            {stampImage && (
              <img
                src={stampImage}
                alt="stamp"
                className="h-14 w-14 object-contain opacity-90"
              />
            )}
          </div>
        </header>

        {/* ── Divider under header ── */}
        <div
          className="my-3 h-[2px] w-full rounded-full opacity-20"
          style={{ background: theme.primary }}
        />

        {/* ── Location glass box ── */}
        <div
          className="glass-location rounded-2xl px-5 py-3"
          style={{
            background: theme.locationBg,
            border: `2px solid ${theme.locationBorder}`,
          }}
        >
          <p
            className="font-display text-lg font-bold leading-snug"
            style={{ color: theme.primary }}
          >
            <span className="mr-2">સ્થળ :</span>
            <span className="font-gujarati font-semibold" style={{ color: theme.accent }}>
              {site || "—"}
            </span>
          </p>
        </div>

        {/* ── Clauses ── */}
        <div className="mt-8 flex-1 space-y-2.5" style={{ color: theme.bodyText }}>
          {clauses.map((clause, i) => {
            const text = clause.html.replace(/<[^>]+>/g, "").trim();
            if (!text) return null;
            return (
              <div
                key={clause.id}
                className={cn(
                  "flex gap-2 leading-relaxed",
                  FONT_SIZE_MAP[descriptionFontSize ?? "base"]
                )}
              >
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

        {/* ── Signatures ── */}
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
