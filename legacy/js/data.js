/** Default data for Sukhnath Electrical quotation generator */

const COMPANY = {
  name: "સુખનાથ ઈલેક્ટ્રીકલ",
  owner: "મધુ જે. ભડિયાદરા",
  phones: ["મો. ૯૮૯૮૫ ૬૭૪૯૨", "૭૦૪૧૦ ૨૪૫૬૪"],
  banner: "ઈલેક્ટ્રીકલ એન્ડ પાવર સર્વિસ",
};

const OFFICE_ADDRESSES = [
  {
    id: "panchvati",
    label: "પંચવટી (૪૫, રો-હાઉસ)",
    text: "૪૫, પંચવટી રો-હાઉસ, મહાવીર ની સામે, યોગીચોક, નાનાવરાછા, સુરત.",
  },
  {
    id: "riseon",
    label: "રાઈઝઓન પ્લાઝા",
    text: "૨૩૩, રાઈઝઓન પ્લાઝા, સરથાણા જકાતનાકા, સુરત.",
  },
];

const SITE_LOCATIONS = [
  { id: "custom", label: "— પોતે લખો —", text: "" },
  { id: "parmeshwar", label: "પરમેશ્વર પાર્ક", text: "પરમેશ્વર પાર્ક, યોગીચોક, સુરત." },
  { id: "shivay", label: "શિવાય ગ્લોરી", text: "શિવાય ગ્લોરી, મિશન રોડ, સુરત." },
  { id: "amar", label: "અમર બિઝનેસ હબ", text: "અમર બિઝનેસ હબ, ગોડાદરા, સુરત." },
  { id: "maa", label: "માં બિઝનેસ હબ", text: "માં બિઝનેસ હબ, ગોડાદરા, સુરત." },
];

/** Common clause presets — dropdown + editable */
const CLAUSE_PRESETS = [
  { id: "custom", label: "— પોતે લખો —", text: "" },
  {
    id: "service-10mm",
    label: "સર્વિસ વાયર 10mm",
    text: "સર્વિસ વાયર 10mm-4 Core વાપરવામાં આવશે.",
  },
  {
    id: "main-rr",
    label: "મેઈન લાઈન RR Cable",
    text: "મેઈન લાઈન RR Cable Armode વાપરવામાં આવશે.",
  },
  {
    id: "aluminium-armour",
    label: "એલ્યુમિનિયમ આર્મર",
    text: "એલ્યુમિનિયમ આર્મર કેબલ વાપરવામાં આવશે.",
  },
  {
    id: "street-light",
    label: "સ્ટ્રીટ લાઈટ",
    text: "સ્ટ્રીટ લાઈટ માટે 6MM X 2 Core વાયર વાપરવામાં આવશે.",
  },
  {
    id: "timer",
    label: "ઓટો ટાઈમર",
    text: "ઓટો ટાઈમર લગાવવામાં આવશે.",
  },
  {
    id: "12gage-bbc",
    label: "12 Gage BBC",
    text: "12 Gage પાઉડર કોટીંગ પેટી દરેક BBC ટોરેન્ટ પાવર વાપરે તે.",
  },
  {
    id: "hex-lug",
    label: "HEX Lug",
    text: "HEX કંપનીના Lug વાપરવામાં આવશે.",
  },
  {
    id: "cop-bbc",
    label: "C.O.P / BBC",
    text: "C.O.P અને B.B.C. બોક્ષ લગાવવામાં આવશે.",
  },
  {
    id: "3phase-tc",
    label: "3 Phase / T.C.",
    text: "3 Pase / T.C. કનેક્શન કરવામાં આવશે.",
  },
  {
    id: "labor-50000",
    label: "મજૂરી રૂ. ૫૦,૦૦૦",
    text: "મજૂરી રૂા. ૫૦,૦૦૦/- લેખે આપવાના રહેશે.",
  },
  {
    id: "total-850000",
    label: "ટોટલ રૂ. ૮,૫૦,૦૦૦",
    text: "પ્રોજેક્ટનું ટોટલ એમાઉન્ટ રૂા. ૮,૫૦,૦૦૦/- રહેશે.",
  },
  {
    id: "payment-60-40",
    label: "૬૦% / ૪૦% પેમેન્ટ",
    text: "૬૦% પેમેન્ટ & ૪૦% કામ ચાલુ હોય ત્યારે આપવાનું રહેશે.",
  },
  {
    id: "payment-50-50",
    label: "૫૦% / ૫૦% પેમેન્ટ",
    text: "૫૦% એડવાન્સ અને ૫૦% કામ પૂરું થયા પછી આપવાનું રહેશે.",
  },
  {
    id: "guarantee-7",
    label: "૭ વર્ષ ગેરંટી",
    text: "અમારા કામની ૭ વર્ષ ની ગેરંટી.",
  },
  {
    id: "guarantee-10",
    label: "૧૦ વર્ષ ગેરંટી",
    text: "અમારા કામની ૧૦ વર્ષ ની ગેરંટી.",
  },
  {
    id: "underground-plot",
    label: "અંડરગ્રાઉન્ડ પ્લોટ ભાવ",
    text: "પ્લોટ દીઠ અંડરગ્રાઉન્ડ ભાવ રૂા. 25,500/- લેખે આપવાના રહેશે.",
  },
  {
    id: "meter-25000",
    label: "મીટર કનેક્શન ૨૫,૦૦૦",
    text: "મીટર કનેક્શન માટે રૂા. 25,000/- લેખે ભાવ આપવાનો રહેશે.",
  },
  {
    id: "cable-depth",
    label: "કેબલ ઊંડાઈ",
    text: "કેબલ 2 થી 2.5 ફૂટ ઊંડાઈમાં મૂકવામાં આવશે.",
  },
  {
    id: "dgvcl-plan",
    label: "DGVCL પ્લાન",
    text: "D.G.V.C.L. ના પ્લાન મુજબ BBC ફિટિંગ કરવામાં આવશે.",
  },
  {
    id: "geb-smart",
    label: "GEB Smart Meter",
    text: "GEB (જી.ઈ.બી) Smart Meter લગાવવામાં આવશે.",
  },
  {
    id: "society-payment",
    label: "સોસાયટી પેમેન્ટ નોંધ",
    text: "સોસાયટીનું કોઈપણ પ્રકારનું પેમેન્ટ બાકી હશે, તો કોઈપણ પ્રકારની સર્વિસ આપવામાં આવશે નહી.",
  },
];

const FOOTER_NOTE_PRESETS = [
  { id: "none", label: "— કોઈ નોંધ નહી —", text: "" },
  {
    id: "society",
    label: "સોસાયટી પેમેન્ટ",
    text: "સોસાયટીનું કોઈપણ પ્રકારનું પેમેન્ટ બાકી હશે, તો કોઈપણ પ્રકારની સર્વિસ આપવામાં આવશે નહી.",
  },
];

/** Full ready-made templates from your sample quotations */
const TEMPLATES = {
  shivay: {
    templateStyle: "blue",
    listStyle: "bullet",
    officeAddressId: "riseon",
    siteLocationId: "shivay",
    footerNoteId: "none",
    clauses: [
      "service-10mm",
      "main-rr",
      "aluminium-armour",
      "street-light",
      "timer",
      "12gage-bbc",
      "hex-lug",
      "cop-bbc",
      "3phase-tc",
      "labor-50000",
      "total-850000",
      "payment-60-40",
      "guarantee-7",
    ],
  },
  parmeshwar: {
    templateStyle: "classic",
    listStyle: "number",
    officeAddressId: "panchvati",
    siteLocationId: "parmeshwar",
    footerNoteId: "society",
    clauses: [
      "service-10mm",
      "main-rr",
      "12gage-bbc",
      "dgvcl-plan",
      "underground-plot",
      "payment-50-50",
      "geb-smart",
      "guarantee-10",
    ],
  },
  amar: {
    templateStyle: "bordered",
    listStyle: "bullet",
    officeAddressId: "riseon",
    siteLocationId: "amar",
    footerNoteId: "none",
    clauses: [
      "service-10mm",
      "main-rr",
      "12gage-bbc",
      "meter-25000",
      "payment-60-40",
      "cable-depth",
      "guarantee-7",
    ],
  },
  underground: {
    templateStyle: "bordered",
    listStyle: "bullet",
    officeAddressId: "riseon",
    siteLocationId: "maa",
    footerNoteId: "none",
    clauses: [
      "main-rr",
      "12gage-bbc",
      "underground-plot",
      "payment-60-40",
      "cable-depth",
      "guarantee-7",
    ],
  },
};

const GUJ_DIGITS = ["૦", "૧", "૨", "૩", "૪", "૫", "૬", "૭", "૮", "૯"];

function toGujaratiNumber(n) {
  return String(n)
    .split("")
    .map((d) => (/\d/.test(d) ? GUJ_DIGITS[parseInt(d, 10)] : d))
    .join("");
}
