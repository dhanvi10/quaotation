import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import type { BorderStyle, ClauseItem, QuotationState, QuotationThemeId, SavedTemplate } from "@/types/quotation";
import {
  DEFAULT_CLAUSES_HTML,
  OFFICE_ADDRESSES,
  SITE_PRESETS,
} from "@/data/presets";
import { generateQuotationNumber } from "@/lib/utils";

function createDefaultClauses(): ClauseItem[] {
  return DEFAULT_CLAUSES_HTML.map((html) => ({ id: uuidv4(), html }));
}

// Use a stable empty string as the SSR placeholder.
// The real value is either rehydrated from localStorage by the persist
// middleware, or generated on the client via the onRehydrateStorage callback.
const initialState: QuotationState = {
  quotationNumber: "",
  quotationDate: "",
  companyId: "sukhnath",
  customCompanyName: "",
  showSecondaryContact: true,
  secondaryContactName: "મધુ જે. ભડિયાદરા",
  secondaryContactPhone: "7041024564",
  addressId: "riseon",
  customAddress: OFFICE_ADDRESSES[1].text,
  sitePresetId: "shivay",
  customSiteLocation: SITE_PRESETS[0].text,
  clauses: createDefaultClauses(),
  footerNote: "",
  themeId: "premium-blue",
  customPrimary: null,
  customAccent: null,
  borderStyle: "double",
  companyLogo: null,
  watermarkImage: null,
  stampImage: null,
  previewZoom: 0.55,
  descriptionFontSize: "base" as const,
};

interface QuotationActions {
  reset: () => void;
  setField: <K extends keyof QuotationState>(key: K, value: QuotationState[K]) => void;
  addClause: (html?: string) => void;
  updateClause: (id: string, html: string) => void;
  removeClause: (id: string) => void;
  duplicateClause: (id: string) => void;
  reorderClauses: (fromIndex: number, toIndex: number) => void;
  setClauses: (clauses: ClauseItem[]) => void;
  saveTemplate: (name: string) => SavedTemplate;
  loadTemplate: (template: SavedTemplate) => void;
  getSnapshot: () => string;
  hydrateFromSnapshot: (snapshot: string) => void;
}

type Store = QuotationState & QuotationActions & {
  savedTemplates: SavedTemplate[];
};

export const useQuotationStore = create<Store>()(
  persist(
    (set, get) => ({
      ...initialState,
      savedTemplates: [],

      reset: () =>
        set({
          ...initialState,
          quotationNumber: generateQuotationNumber(),
          quotationDate: new Date().toISOString().split("T")[0],
          clauses: createDefaultClauses(),
          savedTemplates: get().savedTemplates,
        }),

      setField: (key, value) => set({ [key]: value }),

      addClause: (html = "<p>નવો પોઈન્ટ લખો…</p>") =>
        set((s) => ({
          clauses: [...s.clauses, { id: uuidv4(), html }],
        })),

      updateClause: (id, html) =>
        set((s) => ({
          clauses: s.clauses.map((c) => (c.id === id ? { ...c, html } : c)),
        })),

      removeClause: (id) =>
        set((s) => ({
          clauses: s.clauses.length <= 1 ? s.clauses : s.clauses.filter((c) => c.id !== id),
        })),

      duplicateClause: (id) =>
        set((s) => {
          const idx = s.clauses.findIndex((c) => c.id === id);
          if (idx === -1) return s;
          const copy = { id: uuidv4(), html: s.clauses[idx].html };
          const next = [...s.clauses];
          next.splice(idx + 1, 0, copy);
          return { clauses: next };
        }),

      reorderClauses: (fromIndex, toIndex) =>
        set((s) => {
          const next = [...s.clauses];
          const [moved] = next.splice(fromIndex, 1);
          next.splice(toIndex, 0, moved);
          return { clauses: next };
        }),

      setClauses: (clauses) => set({ clauses }),

      getSnapshot: () => {
        const { savedTemplates, ...state } = get();
        return JSON.stringify(state);
      },

      hydrateFromSnapshot: (snapshot) => {
        try {
          const parsed = JSON.parse(snapshot) as QuotationState;
          set({ ...parsed });
        } catch {
          /* ignore */
        }
      },

      saveTemplate: (name) => {
        const template: SavedTemplate = {
          id: uuidv4(),
          name,
          createdAt: new Date().toISOString(),
          snapshot: get().getSnapshot(),
        };
        set((s) => ({ savedTemplates: [template, ...s.savedTemplates].slice(0, 20) }));
        return template;
      },

      loadTemplate: (template) => {
        get().hydrateFromSnapshot(template.snapshot);
      },
    }),
    {
      name: "sukhnath-quotation-v2",
      partialize: (state) => ({
        quotationNumber: state.quotationNumber,
        quotationDate: state.quotationDate,
        companyId: state.companyId,
        customCompanyName: state.customCompanyName,
        showSecondaryContact: state.showSecondaryContact,
        secondaryContactName: state.secondaryContactName,
        secondaryContactPhone: state.secondaryContactPhone,
        addressId: state.addressId,
        customAddress: state.customAddress,
        sitePresetId: state.sitePresetId,
        customSiteLocation: state.customSiteLocation,
        clauses: state.clauses,
        footerNote: state.footerNote,
        themeId: state.themeId,
        customPrimary: state.customPrimary,
        customAccent: state.customAccent,
        borderStyle: state.borderStyle,
        companyLogo: state.companyLogo,
        watermarkImage: state.watermarkImage,
        stampImage: state.stampImage,
        previewZoom: state.previewZoom,
        descriptionFontSize: state.descriptionFontSize,
        savedTemplates: state.savedTemplates,
      }),
      // Called on the client after localStorage is read.
      // If no persisted number/date exists yet, generate fresh ones here
      // (never during SSR) so server and client render the same empty string.
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        if (!state.quotationNumber) {
          state.quotationNumber = generateQuotationNumber();
        }
        if (!state.quotationDate) {
          state.quotationDate = new Date().toISOString().split("T")[0];
        }
      },
    }
  )
);

export function getCompanyDisplayName(state: Pick<QuotationState, "companyId" | "customCompanyName">): string {
  if (state.companyId === "custom" && state.customCompanyName.trim()) {
    return state.customCompanyName.trim();
  }
  if (state.companyId === "siddheshwar") return "સિદ્ધેશ્વર ઈલેક્ટ્રીકલ";
  return "સુખનાથ ઈલેક્ટ્રીકલ";
}

export function getSiteLocation(state: Pick<QuotationState, "sitePresetId" | "customSiteLocation">): string {
  if (state.sitePresetId === "custom") return state.customSiteLocation.trim();
  return SITE_PRESETS.find((s) => s.id === "shivay")?.text ?? "";
}

export function getOfficeAddress(state: Pick<QuotationState, "addressId" | "customAddress">): string {
  return state.customAddress.trim() || OFFICE_ADDRESSES.find((a) => a.id === state.addressId)?.text || "";
}
