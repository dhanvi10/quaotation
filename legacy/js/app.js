/**
 * Sukhnath Electrical — Quotation Generator
 */

(function () {
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const els = {
    templateStyle: $("#templateStyle"),
    listStyle: $("#listStyle"),
    officeAddress: $("#officeAddress"),
    officeAddressCustom: $("#officeAddressCustom"),
    siteLocation: $("#siteLocation"),
    siteLocationCustom: $("#siteLocationCustom"),
    clausesEditor: $("#clausesEditor"),
    footerNotePreset: $("#footerNotePreset"),
    footerNote: $("#footerNote"),
    previewAddress: $("#previewAddress"),
    previewLocation: $("#previewLocation"),
    previewClauses: $("#previewClauses"),
    previewFooterNote: $("#previewFooterNote"),
    quotation: $("#quotation"),
    addClause: $("#addClause"),
    btnPrint: $("#btnPrint"),
    btnReset: $("#btnReset"),
  };

  let clauses = [];

  function fillSelect(select, items, valueKey, labelKey) {
    select.innerHTML = "";
    items.forEach((item) => {
      const opt = document.createElement("option");
      opt.value = item[valueKey];
      opt.textContent = item[labelKey];
      select.appendChild(opt);
    });
  }

  function getPresetText(presetId) {
    const p = CLAUSE_PRESETS.find((c) => c.id === presetId);
    return p ? p.text : "";
  }

  function getAddressText() {
    const custom = els.officeAddressCustom.value.trim();
    if (custom) return custom;
    const id = els.officeAddress.value;
    const addr = OFFICE_ADDRESSES.find((a) => a.id === id);
    return addr ? addr.text : "";
  }

  function getLocationText() {
    const custom = els.siteLocationCustom.value.trim();
    if (custom) return custom;
    const id = els.siteLocation.value;
    const loc = SITE_LOCATIONS.find((l) => l.id === id);
    return loc && loc.text ? loc.text : "";
  }

  function syncAddressCustom() {
    const id = els.officeAddress.value;
    const addr = OFFICE_ADDRESSES.find((a) => a.id === id);
    if (addr) els.officeAddressCustom.value = addr.text;
  }

  function syncLocationCustom() {
    const id = els.siteLocation.value;
    if (id === "custom") {
      els.siteLocationCustom.value = "";
      els.siteLocationCustom.focus();
      return;
    }
    const loc = SITE_LOCATIONS.find((l) => l.id === id);
    if (loc) els.siteLocationCustom.value = loc.text;
  }

  function renderClauseEditor() {
    els.clausesEditor.innerHTML = "";
    clauses.forEach((clause, index) => {
      const row = document.createElement("div");
      row.className = "clause-row";
      row.dataset.index = index;

      const head = document.createElement("div");
      head.className = "clause-row-head";

      const select = document.createElement("select");
      CLAUSE_PRESETS.forEach((p) => {
        const opt = document.createElement("option");
        opt.value = p.id;
        opt.textContent = p.label;
        if (p.id === clause.presetId) opt.selected = true;
        select.appendChild(opt);
      });

      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "clause-remove";
      removeBtn.title = "દૂર કરો";
      removeBtn.textContent = "×";
      removeBtn.addEventListener("click", () => {
        clauses.splice(index, 1);
        if (clauses.length === 0) clauses.push({ presetId: "custom", text: "" });
        renderClauseEditor();
        updatePreview();
      });

      const textarea = document.createElement("textarea");
      textarea.value = clause.text;
      textarea.placeholder = "અહીં ગુજરાતી / English ટર્મ લખો…";

      select.addEventListener("change", () => {
        const presetId = select.value;
        const text = getPresetText(presetId);
        clause.presetId = presetId;
        if (text) {
          clause.text = text;
          textarea.value = text;
        }
        updatePreview();
      });

      textarea.addEventListener("input", () => {
        clause.text = textarea.value;
        clause.presetId = "custom";
        select.value = "custom";
        updatePreview();
      });

      head.appendChild(select);
      head.appendChild(removeBtn);
      row.appendChild(head);
      row.appendChild(textarea);
      els.clausesEditor.appendChild(row);
    });
  }

  function addClause(presetId, text) {
    const preset = presetId || "custom";
    const t = text !== undefined ? text : getPresetText(preset);
    clauses.push({ presetId: preset, text: t || "" });
    renderClauseEditor();
    updatePreview();
  }

  function updatePreview() {
    els.previewAddress.textContent = getAddressText();
    els.previewLocation.textContent = getLocationText();

    const listStyle = els.listStyle.value;
    const ol = els.previewClauses;
    ol.className = `q-clauses ${listStyle === "number" ? "numbered" : "bullet"}`;
    ol.innerHTML = "";

    clauses.forEach((clause, i) => {
      const text = (clause.text || "").trim();
      if (!text) return;
      const li = document.createElement("li");
      if (listStyle === "number") {
        li.setAttribute("data-num", `(${toGujaratiNumber(i + 1)})`);
      }
      li.innerHTML = formatClauseHtml(text);
      ol.appendChild(li);
    });

    const footerText = els.footerNote.value.trim();
    els.previewFooterNote.textContent = footerText;

    const style = els.templateStyle.value;
    els.quotation.className = `quotation template-${style}`;
  }

  /** Bold common English technical terms in preview */
  function formatClauseHtml(text) {
    const terms = [
      "RR Cable",
      "RR Cable Armode",
      "HEX",
      "BBC",
      "B.B.C.",
      "C.O.P",
      "DGVCL",
      "D.G.V.C.L.",
      "GEB",
      "10mm",
      "6MM",
      "12 Gage",
      "12 Gaje",
      "250 AMP",
      "200 AMP",
      "1KW",
      "6.5 K.V.",
      "35mm",
      "3.5 mm",
      "100%",
      "60%",
      "40%",
      "50%",
    ];
    let html = escapeHtml(text);
    terms.forEach((term) => {
      const re = new RegExp(escapeRegex(term), "gi");
      html = html.replace(re, (m) => `<strong>${m}</strong>`);
    });
    return html;
  }

  function escapeHtml(s) {
    const d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function escapeRegex(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function loadTemplate(key) {
    const t = TEMPLATES[key];
    if (!t) return;

    els.templateStyle.value = t.templateStyle;
    els.listStyle.value = t.listStyle;
    els.officeAddress.value = t.officeAddressId;
    syncAddressCustom();
    els.siteLocation.value = t.siteLocationId;
    syncLocationCustom();

    if (t.footerNoteId) {
      els.footerNotePreset.value = t.footerNoteId;
      const note = FOOTER_NOTE_PRESETS.find((f) => f.id === t.footerNoteId);
      els.footerNote.value = note ? note.text : "";
    } else {
      els.footerNotePreset.value = "none";
      els.footerNote.value = "";
    }

    clauses = t.clauses.map((id) => ({
      presetId: id,
      text: getPresetText(id),
    }));

    renderClauseEditor();
    updatePreview();
  }

  function resetForm() {
    els.templateStyle.value = "blue";
    els.listStyle.value = "bullet";
    els.officeAddress.value = "riseon";
    syncAddressCustom();
    els.siteLocation.value = "shivay";
    syncLocationCustom();
    els.footerNotePreset.value = "none";
    els.footerNote.value = "";
    loadTemplate("shivay");
  }

  function init() {
    fillSelect(els.officeAddress, OFFICE_ADDRESSES, "id", "label");
    fillSelect(els.siteLocation, SITE_LOCATIONS, "id", "label");
    fillSelect(els.footerNotePreset, FOOTER_NOTE_PRESETS, "id", "label");

    els.officeAddress.value = "riseon";
    syncAddressCustom();

    els.siteLocation.value = "shivay";
    syncLocationCustom();

    els.officeAddress.addEventListener("change", () => {
      syncAddressCustom();
      updatePreview();
    });
    els.officeAddressCustom.addEventListener("input", updatePreview);

    els.siteLocation.addEventListener("change", () => {
      syncLocationCustom();
      updatePreview();
    });
    els.siteLocationCustom.addEventListener("input", updatePreview);

    els.templateStyle.addEventListener("change", updatePreview);
    els.listStyle.addEventListener("change", updatePreview);

    els.footerNotePreset.addEventListener("change", () => {
      const note = FOOTER_NOTE_PRESETS.find((f) => f.id === els.footerNotePreset.value);
      els.footerNote.value = note ? note.text : "";
      updatePreview();
    });
    els.footerNote.addEventListener("input", updatePreview);

    els.addClause.addEventListener("click", () => addClause("custom", ""));

    els.btnPrint.addEventListener("click", () => window.print());

    els.btnReset.addEventListener("click", resetForm);

    $$("[data-template]").forEach((btn) => {
      btn.addEventListener("click", () => loadTemplate(btn.dataset.template));
    });

    loadTemplate("shivay");
  }

  init();
})();
