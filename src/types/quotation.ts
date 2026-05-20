export type QuotationThemeId =
  | "premium-blue"
  | "royal-gold"
  | "electrical-green"
  | "classic-maroon"
  | "minimal-white";

export type BorderStyle = "double" | "single" | "elegant";

export interface QuotationTheme {
  id: QuotationThemeId;
  name: string;
  nameGu: string;
  primary: string;
  accent: string;
  headerGradient: string;
  locationBg: string;
  locationBorder: string;
  paperBg: string;
  bodyText: string;
  sigBg: string;
}

export interface ClauseItem {
  id: string;
  html: string;
}

export interface SavedTemplate {
  id: string;
  name: string;
  createdAt: string;
  snapshot: string;
}

export interface QuotationState {
  // Meta
  quotationNumber: string;
  quotationDate: string;

  // Company
  companyId: string;
  customCompanyName: string;

  // Contact
  showSecondaryContact: boolean;
  secondaryContactName: string;
  secondaryContactPhone: string;

  // Address
  addressId: string;
  customAddress: string;

  // Site
  sitePresetId: "shivay" | "custom";
  customSiteLocation: string;

  // Clauses
  clauses: ClauseItem[];

  // Footer
  footerNote: string;

  // Theme
  themeId: QuotationThemeId;
  customPrimary: string | null;
  customAccent: string | null;
  borderStyle: BorderStyle;

  // Media
  companyLogo: string | null;
  watermarkImage: string | null;
  stampImage: string | null;

  // UI
  previewZoom: number;

  // Typography
  descriptionFontSize: "sm" | "base" | "lg";
}
