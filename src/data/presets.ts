import type { QuotationTheme } from "@/types/quotation";

export const COMPANY_PRESETS = [
  { id: "sukhnath", label: "સુખનાથ ઈલેક્ટ્રીકલ", gradient: "from-blue-700 via-blue-600 to-cyan-500" },
  { id: "siddheshwar", label: "સિદ્ધેશ્વર ઈલેક્ટ્રીકલ", gradient: "from-amber-700 via-amber-600 to-yellow-500" },
  { id: "custom", label: "કસ્ટમ નામ", gradient: "from-violet-700 via-purple-600 to-fuchsia-500" },
] as const;

export const SUBTITLE = "ઈલેક્ટ્રીકલ એન્ડ પાવર સર્વિસ";

export const PRIMARY_CONTACT = {
  name: "મધુ જે. ભડિયાદરા",
  phone: "9898567492",
};

export const OFFICE_ADDRESSES = [
  {
    id: "panchvati",
    label: "પંચવટી રો-હાઉસ",
    text: "૪૫, પંચવટી રો-હાઉસ, મહાવીર ની સામે, યોગીચોક, નાનાવરાછા, સુરત.",
  },
  {
    id: "riseon",
    label: "રાઈઝઓન પ્લાઝા",
    text: "૨૩૩, રાઈઝઓન પ્લાઝા, સરથાણા જકાતનાકા, સુરત.",
  },
] as const;

export const SITE_PRESETS = [
  { id: "shivay" as const, label: "શિવાય ગ્લોરી", text: "શિવાય ગ્લોરી, મિશન રોડ, સુરત." },
  { id: "custom" as const, label: "જાતે લખો", text: "" },
];

export const QUOTATION_THEMES: QuotationTheme[] = [
  {
    id: "premium-blue",
    name: "Premium Blue",
    nameGu: "પ્રીમિયમ બ્લુ",
    primary: "#1d4ed8",
    accent: "#0ea5e9",
    headerGradient: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #38bdf8 100%)",
    locationBg: "rgba(219, 234, 254, 0.65)",
    locationBorder: "#2563eb",
    paperBg: "#f8fafc",
    bodyText: "#422006",
    sigBg: "#dbeafe",
  },
  {
    id: "royal-gold",
    name: "Royal Gold",
    nameGu: "રોયલ ગોલ્ડ",
    primary: "#b45309",
    accent: "#f59e0b",
    headerGradient: "linear-gradient(135deg, #78350f 0%, #d97706 50%, #fcd34d 100%)",
    locationBg: "rgba(254, 243, 199, 0.7)",
    locationBorder: "#d97706",
    paperBg: "#fffbeb",
    bodyText: "#451a03",
    sigBg: "#fef3c7",
  },
  {
    id: "electrical-green",
    name: "Electrical Green",
    nameGu: "ઇલેક્ટ્રિકલ ગ્રીન",
    primary: "#15803d",
    accent: "#22c55e",
    headerGradient: "linear-gradient(135deg, #14532d 0%, #16a34a 50%, #4ade80 100%)",
    locationBg: "rgba(220, 252, 231, 0.7)",
    locationBorder: "#16a34a",
    paperBg: "#f0fdf4",
    bodyText: "#14532d",
    sigBg: "#dcfce7",
  },
  {
    id: "classic-maroon",
    name: "Classic Maroon",
    nameGu: "ક્લાસિક મેરૂન",
    primary: "#991b1b",
    accent: "#dc2626",
    headerGradient: "linear-gradient(135deg, #7f1d1d 0%, #b91c1c 50%, #f87171 100%)",
    locationBg: "rgba(254, 226, 226, 0.65)",
    locationBorder: "#b91c1c",
    paperBg: "#fef2f2",
    bodyText: "#450a0a",
    sigBg: "#fee2e2",
  },
  {
    id: "minimal-white",
    name: "Minimal White",
    nameGu: "મિનિમલ વ્હાઇટ",
    primary: "#334155",
    accent: "#64748b",
    headerGradient: "linear-gradient(135deg, #0f172a 0%, #334155 50%, #94a3b8 100%)",
    locationBg: "rgba(248, 250, 252, 0.9)",
    locationBorder: "#cbd5e1",
    paperBg: "#ffffff",
    bodyText: "#1e293b",
    sigBg: "#f1f5f9",
  },
];

/** Professional default clauses (HTML for TipTap) */
export const DEFAULT_CLAUSES_HTML: string[] = [
  "<p>સર્વિસ વાયર <strong>10mm-4 Core</strong> અને મેઈન લાઈન <strong>RR Cable Armoured</strong> વાપરવામાં આવશે.</p>",
  "<p>દરેક કનેક્શન માટે <strong>HEX Lug</strong> અને <strong>BBC Box</strong> લગાવવામાં આવશે.</p>",
  "<p>સ્ટ્રીટ લાઈટ માટે <strong>6mm x 2 Core</strong> વાયર અને <strong>C.O.P</strong> ફિટિંગ કરવામાં આવશે.</p>",
  "<p>મીટર કનેક્શન, <strong>3 Phase / T.C.</strong> અને ડી.જી.વી.સી.એલ. પ્લાન મુજબ કામ કરવામાં આવશે.</p>",
  "<p>અંડરગ્રાઉન્ડ કેબલ 2 થી 2.5 ફૂટ ઊંડાઈમાં મૂકવામાં આવશે — સંપૂર્ણ સલામતી માનક મુજબ.</p>",
  "<p>મજૂરી અને મટીરિયલ અલગ અલગ દર્શાવવામાં આવશે. ટોટલ એમાઉન્ટ પ્રોજેક્ટ મુજબ નક્કી થશે.</p>",
  "<p><strong>60% પેમેન્ટ</strong> એડવાન્સ અને <strong>40%</strong> કામ ચાલુ હોય ત્યારે આપવાનું રહેશે.</p>",
  "<p>અમારા કામની <strong>7 વર્ષની ગેરંટી</strong> રહેશે. ગુણવત્તાપૂર્ણ સામગ્રી જ વાપરવામાં આવશે.</p>",
];

export const CLAUSE_SNIPPETS = [
  { label: "RR Cable", html: "<p>મેઈન લાઈન <strong>RR Cable Armoured</strong> વાપરવામાં આવશે.</p>" },
  { label: "HEX Lug", html: "<p><strong>HEX Lug Connection</strong> દરેક જોડણીમાં કરવામાં આવશે.</p>" },
  { label: "BBC Box", html: "<p><strong>BBC Box Installation</strong> સંપૂર્ણ સેફ્ટી મુજબ થશે.</p>" },
  { label: "Meter", html: "<p><strong>Meter Connection</strong> DGVCL ના નિયમો મુજબ કરવામાં આવશે.</p>" },
  { label: "Underground", html: "<p><strong>Underground Cable Work</strong> પ્લોટ દીઠ નક્કી કરેલ ભાવ મુજબ.</p>" },
  { label: "Payment 60/40", html: "<p><strong>60% પેમેન્ટ</strong> એડવાન્સ, <strong>40%</strong> કામ દરમ્યાન.</p>" },
  { label: "Guarantee", html: "<p>અમારા કામની <strong>7 વર્ષની ગેરંટી</strong> રહેશે.</p>" },
];
