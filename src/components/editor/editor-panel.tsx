"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  MapPin,
  Palette,
  Phone,
  ImageIcon,
  Type,
  Plus,
} from "lucide-react";
import { useQuotationStore } from "@/store/quotation-store";
import {
  COMPANY_PRESETS,
  OFFICE_ADDRESSES,
  SITE_PRESETS,
  QUOTATION_THEMES,
} from "@/data/presets";
import { ClauseList } from "./clause-list";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { BorderStyle, QuotationThemeId } from "@/types/quotation";

// ─── Section wrapper ────────────────────────────────────────────────────────

function Section({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Card className="overflow-hidden rounded-2xl border-border/60 shadow-md shadow-slate-200/50 dark:shadow-none">
        <CardHeader className="flex flex-row items-start gap-3 space-y-0 bg-gradient-to-r from-primary/5 to-transparent pb-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="font-display text-lg">{title}</CardTitle>
            {description && (
              <CardDescription className="mt-0.5">{description}</CardDescription>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">{children}</CardContent>
      </Card>
    </motion.div>
  );
}

// ─── Image upload ────────────────────────────────────────────────────────────

function ImageUploadField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string | null;
  onChange: (v: string | null) => void;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input
        type="file"
        accept="image/*"
        className="text-xs"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = () => onChange(reader.result as string);
          reader.readAsDataURL(file);
        }}
      />
      {value && (
        <button
          type="button"
          className="text-xs text-destructive underline"
          onClick={() => onChange(null)}
        >
          દૂર કરો
        </button>
      )}
    </div>
  );
}

// ─── Font size segmented control ─────────────────────────────────────────────

const FONT_SIZE_OPTIONS = [
  { value: "sm" as const, label: "નાનો", hint: "Small" },
  { value: "base" as const, label: "મધ્યમ", hint: "Medium" },
  { value: "lg" as const, label: "મોટો", hint: "Large" },
];

function FontSizeControl() {
  const descriptionFontSize = useQuotationStore((s) => s.descriptionFontSize);
  const setField = useQuotationStore((s) => s.setField);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label>વર્ણન ટેક્સ્ટ સાઇઝ</Label>
        <span className="rounded-md bg-primary/10 px-2 py-0.5 font-sans text-[11px] font-semibold text-primary">
          {FONT_SIZE_OPTIONS.find((o) => o.value === descriptionFontSize)?.hint}
        </span>
      </div>

      {/* Segmented buttons */}
      <div className="flex overflow-hidden rounded-xl border border-border bg-muted/40">
        {FONT_SIZE_OPTIONS.map((opt, i) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setField("descriptionFontSize", opt.value)}
            className={cn(
              "flex flex-1 flex-col items-center gap-0.5 px-3 py-2.5 text-center transition-all duration-200",
              i !== 0 && "border-l border-border",
              descriptionFontSize === opt.value
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <span
              className="font-gujarati font-semibold leading-none"
              style={{
                fontSize: opt.value === "sm" ? 11 : opt.value === "base" ? 13 : 16,
              }}
            >
              ક
            </span>
            <span className="font-sans text-[10px] font-medium leading-none opacity-80">
              {opt.label}
            </span>
          </button>
        ))}
      </div>

      {/* Live preview strip */}
      <div className="rounded-xl border border-border/60 bg-background px-3 py-2.5">
        <p
          className={cn(
            "font-gujarati leading-relaxed text-foreground/80 transition-all duration-300",
            descriptionFontSize === "sm" && "text-[11px]",
            descriptionFontSize === "base" && "text-[13px]",
            descriptionFontSize === "lg" && "text-[15px]"
          )}
        >
          (1) સર્વિસ વાયર <strong>10mm-4 Core</strong> અને મેઈન લાઈન{" "}
          <strong>RR Cable Armoured</strong> વાપરવામાં આવશે.
        </p>
      </div>
    </div>
  );
}

// ─── Custom company dialog ────────────────────────────────────────────────────

function AddCustomCompanyRow({
  onAdd,
}: {
  onAdd: (name: string) => void;
}) {
  const [value, setValue] = useState("");

  return (
    <div className="flex gap-2 pt-1">
      <Input
        className="font-gujarati text-sm"
        placeholder="નવી કંપની નામ…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && value.trim()) {
            onAdd(value.trim());
            setValue("");
          }
        }}
      />
      <Button
        type="button"
        size="sm"
        variant="secondary"
        className="shrink-0 gap-1"
        onClick={() => {
          if (value.trim()) {
            onAdd(value.trim());
            setValue("");
          }
        }}
      >
        <Plus className="h-3.5 w-3.5" />
        ઉમેરો
      </Button>
    </div>
  );
}

// ─── Main EditorPanel ─────────────────────────────────────────────────────────

export function EditorPanel() {
  // Hydration-safe mounted flag
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const setField = useQuotationStore((s) => s.setField);
  const companyId = useQuotationStore((s) => s.companyId);
  const customCompanyName = useQuotationStore((s) => s.customCompanyName);
  const showSecondaryContact = useQuotationStore((s) => s.showSecondaryContact);
  const secondaryContactName = useQuotationStore((s) => s.secondaryContactName);
  const secondaryContactPhone = useQuotationStore((s) => s.secondaryContactPhone);
  const addressId = useQuotationStore((s) => s.addressId);
  const customAddress = useQuotationStore((s) => s.customAddress);
  const sitePresetId = useQuotationStore((s) => s.sitePresetId);
  const customSiteLocation = useQuotationStore((s) => s.customSiteLocation);
  const footerNote = useQuotationStore((s) => s.footerNote);
  const themeId = useQuotationStore((s) => s.themeId);
  const customPrimary = useQuotationStore((s) => s.customPrimary);
  const customAccent = useQuotationStore((s) => s.customAccent);
  const borderStyle = useQuotationStore((s) => s.borderStyle);
  const companyLogo = useQuotationStore((s) => s.companyLogo);
  const watermarkImage = useQuotationStore((s) => s.watermarkImage);
  const stampImage = useQuotationStore((s) => s.stampImage);

  // Render a stable skeleton until client hydration is complete
  if (!mounted) {
    return (
      <div className="space-y-5 pb-32 lg:pb-8">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-32 animate-pulse rounded-2xl bg-muted/60"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-5 pb-32 lg:pb-8">
      {/* ── Contact ── */}
      <Section icon={Building2} title="કંપની" description="નામ અને લોગો">
        <div className="space-y-3">
          <Label>કંપની પસંદ કરો</Label>

          {/* Segmented company selector — avoids Select hydration mismatch */}
          <div className="flex flex-col gap-2">
            {COMPANY_PRESETS.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setField("companyId", c.id)}
                className={cn(
                  "flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-200",
                  companyId === c.id
                    ? "border-primary bg-primary/5 ring-2 ring-primary/25"
                    : "border-border bg-background hover:border-primary/40 hover:bg-muted/40"
                )}
              >
                <div
                  className={cn(
                    "h-3 w-3 shrink-0 rounded-full bg-gradient-to-br",
                    c.gradient
                  )}
                />
                <span className="font-gujarati text-sm font-semibold">{c.label}</span>
                {companyId === c.id && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-primary" />
                )}
              </button>
            ))}
          </div>

          {/* Custom company name input */}
          {companyId === "custom" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2 overflow-hidden"
            >
              <Label>કસ્ટમ કંપની નામ</Label>
              <Input
                className="font-gujarati text-lg font-semibold"
                placeholder="કંપની નામ લખો"
                value={customCompanyName}
                onChange={(e) => setField("customCompanyName", e.target.value)}
              />
            </motion.div>
          )}
        </div>

        <ImageUploadField
          label="કંપની લોગો"
          value={companyLogo}
          onChange={(v) => setField("companyLogo", v)}
        />
      </Section>

      {/* ── Contact ── */}
      <Section icon={Phone} title="સંપર્ક" description="પ્રાથમિક + દ્વિતીય">
        <div className="rounded-xl bg-muted/50 p-3 font-gujarati text-sm">
          <p className="font-bold">મધુ જે. ભડિયાદરા</p>
          <p className="font-sans text-muted-foreground">9898567492 (ફિક્સ્ડ)</p>
        </div>
        <div className="flex items-center justify-between rounded-xl border border-border/60 bg-background px-4 py-3">
          <Label htmlFor="sec-contact" className="cursor-pointer">
            બીજો નંબર બતાવો
          </Label>
          <Switch
            id="sec-contact"
            checked={showSecondaryContact}
            onCheckedChange={(c) => setField("showSecondaryContact", c)}
          />
        </div>
        {showSecondaryContact && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-3 sm:grid-cols-2"
          >
            <div className="space-y-2">
              <Label>નામ</Label>
              <Input
                className="font-gujarati"
                value={secondaryContactName}
                onChange={(e) => setField("secondaryContactName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>મોબાઇલ</Label>
              <Input
                className="font-sans"
                value={secondaryContactPhone}
                onChange={(e) => setField("secondaryContactPhone", e.target.value)}
              />
            </div>
          </motion.div>
        )}
      </Section>

      {/* ── Address & Site ── */}
      <Section icon={MapPin} title="સરનામું અને સ્થળ">
        <div className="space-y-2">
          <Label>ઓફિસ સરનામું</Label>
          <Select
            value={addressId}
            onValueChange={(v) => {
              setField("addressId", v);
              const addr = OFFICE_ADDRESSES.find((a) => a.id === v);
              if (addr) setField("customAddress", addr.text);
            }}
          >
            <SelectTrigger className="font-gujarati">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {OFFICE_ADDRESSES.map((a) => (
                <SelectItem key={a.id} value={a.id} className="font-gujarati">
                  {a.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Textarea
            className="font-gujarati"
            value={customAddress}
            onChange={(e) => setField("customAddress", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>સ્થળ (સાઇટ)</Label>
          <Select
            value={sitePresetId}
            onValueChange={(v) => {
              setField("sitePresetId", v as "shivay" | "custom");
              if (v === "shivay") setField("customSiteLocation", SITE_PRESETS[0].text);
            }}
          >
            <SelectTrigger className="font-gujarati">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SITE_PRESETS.map((s) => (
                <SelectItem key={s.id} value={s.id} className="font-gujarati">
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {sitePresetId === "custom" && (
            <Input
              className="font-gujarati text-base font-semibold"
              placeholder="સ્થળ લખો…"
              value={customSiteLocation}
              onChange={(e) => setField("customSiteLocation", e.target.value)}
            />
          )}
        </div>

        <div className="space-y-2">
          <Label>નીચે નોંધ (વૈકલ્પિક)</Label>
          <Textarea
            className="font-gujarati"
            placeholder="ઉદા. સોસાયટી પેમેન્ટ નોંધ…"
            value={footerNote}
            onChange={(e) => setField("footerNote", e.target.value)}
          />
        </div>
      </Section>

      {/* ── Font size control ── */}
      <Section icon={Type} title="ટેક્સ્ટ સાઇઝ" description="ક્વોટેશન વર્ણન ફોન્ટ">
        <FontSizeControl />
      </Section>

      {/* ── Theme ── */}
      <Section icon={Palette} title="થીમ અને રંગ" description="લાઇવ પ્રિવ્યૂ અપડેટ">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {QUOTATION_THEMES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setField("themeId", t.id as QuotationThemeId);
                setField("customPrimary", null);
                setField("customAccent", null);
              }}
              className={cn(
                "rounded-xl border-2 p-3 text-left transition-all",
                themeId === t.id
                  ? "border-primary ring-2 ring-primary/30"
                  : "border-border hover:border-primary/50"
              )}
            >
              <div
                className="mb-2 h-8 w-full rounded-lg"
                style={{ background: t.headerGradient }}
              />
              <span className="font-gujarati text-xs font-semibold">{t.nameGu}</span>
            </button>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>પ્રાથમિક રંગ</Label>
            <Input
              type="color"
              value={customPrimary ?? "#1d4ed8"}
              onChange={(e) => setField("customPrimary", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>એક્સેન્ટ રંગ</Label>
            <Input
              type="color"
              value={customAccent ?? "#0ea5e9"}
              onChange={(e) => setField("customAccent", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>બોર્ડર સ્ટાઇલ</Label>
          <Select
            value={borderStyle}
            onValueChange={(v) => setField("borderStyle", v as BorderStyle)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="double">ડબલ બોર્ડર</SelectItem>
              <SelectItem value="single">સિંગલ</SelectItem>
              <SelectItem value="elegant">એલિગન્ટ</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Section>

      {/* ── Images ── */}
      <Section icon={ImageIcon} title="છબીઓ" description="વોટરમાર્ક અને સ્ટેમ્પ">
        <ImageUploadField
          label="વોટરમાર્ક"
          value={watermarkImage}
          onChange={(v) => setField("watermarkImage", v)}
        />
        <ImageUploadField
          label="સ્ટેમ્પ"
          value={stampImage}
          onChange={(v) => setField("stampImage", v)}
        />
      </Section>

      <ClauseList />
    </div>
  );
}
