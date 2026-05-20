"use client";

import { motion } from "framer-motion";
import { Building2, MapPin, Palette, Phone, Settings2, ImageIcon } from "lucide-react";
import { useQuotationStore } from "@/store/quotation-store";
import {
  COMPANY_PRESETS,
  OFFICE_ADDRESSES,
  SITE_PRESETS,
  QUOTATION_THEMES,
} from "@/data/presets";
import { ClauseList } from "./clause-list";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { BorderStyle, QuotationThemeId } from "@/types/quotation";

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
            {description && <CardDescription className="mt-0.5">{description}</CardDescription>}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">{children}</CardContent>
      </Card>
    </motion.div>
  );
}

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

export function EditorPanel() {
  const setField = useQuotationStore((s) => s.setField);
  const quotationNumber = useQuotationStore((s) => s.quotationNumber);
  const quotationDate = useQuotationStore((s) => s.quotationDate);
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

  return (
    <div className="space-y-5 pb-32 lg:pb-8">
      <Section icon={Settings2} title="ક્વોટેશન વિગત" description="નંબર અને તારીખ">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>ક્વોટેશન નંબર</Label>
            <Input
              value={quotationNumber}
              onChange={(e) => setField("quotationNumber", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>તારીખ</Label>
            <Input
              type="date"
              value={quotationDate}
              onChange={(e) => setField("quotationDate", e.target.value)}
            />
          </div>
        </div>
      </Section>

      <Section icon={Building2} title="કંપની" description="નામ અને લોગો">
        <div className="space-y-2">
          <Label>કંપની પસંદ કરો</Label>
          <Select value={companyId} onValueChange={(v) => setField("companyId", v)}>
            <SelectTrigger className="font-gujarati">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {COMPANY_PRESETS.map((c) => (
                <SelectItem key={c.id} value={c.id} className="font-gujarati">
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {companyId === "custom" && (
          <div className="space-y-2">
            <Label>કસ્ટમ કંપની નામ</Label>
            <Input
              className="font-gujarati text-lg font-semibold"
              placeholder="કંપની નામ લખો"
              value={customCompanyName}
              onChange={(e) => setField("customCompanyName", e.target.value)}
            />
          </div>
        )}
        <ImageUploadField
          label="કંપની લોગો"
          value={companyLogo}
          onChange={(v) => setField("companyLogo", v)}
        />
      </Section>

      <Section icon={Phone} title="સંપર્ક" description="પ્રાથમિક + દ્વિતીય">
        <div className="rounded-xl bg-muted/50 p-3 font-gujarati text-sm">
          <p className="font-bold">મધુ જે. ભડિયાદરા</p>
          <p className="font-sans text-muted-foreground">9898567492 (ફિક્સ્ડ)</p>
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="sec-contact">બીજો નંબર બતાવો</Label>
          <Switch
            id="sec-contact"
            checked={showSecondaryContact}
            onCheckedChange={(c) => setField("showSecondaryContact", c)}
          />
        </div>
        {showSecondaryContact && (
          <div className="grid gap-3 sm:grid-cols-2">
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
          </div>
        )}
      </Section>

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
              className={`rounded-xl border-2 p-3 text-left transition-all ${
                themeId === t.id
                  ? "border-primary ring-2 ring-primary/30"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="mb-2 h-8 w-full rounded-lg" style={{ background: t.headerGradient }} />
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
