"use client";

const A4_WIDTH_PX = 794; // 210mm @ 96dpi

/** Copy stylesheets so cloned document renders like the live preview */
export function injectStylesIntoClone(clonedDoc: Document): void {
  document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]').forEach((link) => {
    if (link.href) {
      const l = clonedDoc.createElement("link");
      l.rel = "stylesheet";
      l.href = link.href;
      clonedDoc.head.appendChild(l);
    }
  });
  document.querySelectorAll("style").forEach((style) => {
    clonedDoc.head.appendChild(style.cloneNode(true));
  });
}

/** Inline computed styles from source → clone (html2canvas misses many CSS rules) */
export function mirrorComputedStyles(sourceRoot: HTMLElement, cloneRoot: HTMLElement): void {
  const sourceNodes = [sourceRoot, ...Array.from(sourceRoot.querySelectorAll<HTMLElement>("*"))];
  const cloneNodes = [cloneRoot, ...Array.from(cloneRoot.querySelectorAll<HTMLElement>("*"))];

  sourceNodes.forEach((src, i) => {
    const clone = cloneNodes[i];
    if (!clone) return;

    const computed = window.getComputedStyle(src);
    const props = [
      "display",
      "position",
      "top",
      "left",
      "right",
      "bottom",
      "width",
      "min-width",
      "max-width",
      "height",
      "min-height",
      "margin",
      "padding",
      "border",
      "border-color",
      "border-width",
      "border-style",
      "border-radius",
      "background",
      "background-color",
      "background-image",
      "color",
      "font-family",
      "font-size",
      "font-weight",
      "line-height",
      "letter-spacing",
      "text-align",
      "flex",
      "flex-direction",
      "align-items",
      "justify-content",
      "grid-template-columns",
      "grid-template-rows",
      "gap",
      "order",
      "opacity",
      "box-shadow",
      "overflow",
      "white-space",
      "word-break",
    ];

    props.forEach((prop) => {
      const val = computed.getPropertyValue(prop);
      if (val) clone.style.setProperty(prop, val);
    });
  });
}

export function prepareCloneForCanvas(
  clonedDoc: Document,
  sourcePaper: HTMLElement
): HTMLElement | null {
  injectStylesIntoClone(clonedDoc);

  const clonePaper =
    (clonedDoc.querySelector(".quotation-paper") as HTMLElement | null) ??
    (clonedDoc.body.firstElementChild as HTMLElement | null);

  if (!clonePaper) return null;

  clonePaper.style.transform = "none";
  clonePaper.style.zoom = "1";
  clonePaper.style.width = "210mm";
  clonePaper.style.minWidth = `${A4_WIDTH_PX}px`;
  clonePaper.style.maxWidth = "210mm";
  clonePaper.style.minHeight = "297mm";
  clonePaper.style.overflow = "visible";
  clonePaper.style.background = window.getComputedStyle(sourcePaper).background;
  clonePaper.style.margin = "0";
  clonePaper.style.boxSizing = "border-box";

  mirrorComputedStyles(sourcePaper, clonePaper);

  // Gradient text → keep gradient on clone (canvas renders background-image on block)
  clonePaper.querySelectorAll<HTMLElement>(".company-gradient-text").forEach((el, idx) => {
    const src = sourcePaper.querySelectorAll<HTMLElement>(".company-gradient-text")[idx];
    if (!src) return;
    const cs = window.getComputedStyle(src);
    el.style.backgroundImage = cs.backgroundImage;
    el.style.backgroundClip = "text";
    el.style.setProperty("-webkit-background-clip", "text");
    el.style.webkitTextFillColor = "transparent";
    el.style.color = "transparent";
    el.style.lineHeight = cs.lineHeight;
    el.style.padding = cs.padding;
    el.style.fontSize = cs.fontSize;
    el.style.fontWeight = cs.fontWeight;
    el.style.display = "inline-block";
    el.style.width = "auto";
    el.style.maxWidth = "100%";
  });

  clonePaper.querySelectorAll<HTMLElement>(".glass-location").forEach((el, idx) => {
    const src = sourcePaper.querySelectorAll<HTMLElement>(".glass-location")[idx];
    if (!src) return;
    const cs = window.getComputedStyle(src);
    el.style.background = cs.background;
    el.style.border = cs.border;
    el.style.borderRadius = cs.borderRadius;
    el.style.boxShadow = cs.boxShadow;
    el.style.backdropFilter = "none";
    el.style.setProperty("-webkit-backdrop-filter", "none");
  });

  const header = clonePaper.querySelector("header") as HTMLElement | null;
  if (header) {
    header.style.display = "grid";
    header.style.gridTemplateColumns = "minmax(0,1fr) minmax(0,1.5fr) minmax(0,1fr)";
    header.style.gap = "16px";
    header.style.alignItems = "start";
    header.style.overflow = "visible";
  }

  return clonePaper;
}

export function waitForExportReady(): Promise<void> {
  return new Promise((resolve) => {
    const done = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => resolve());
      });
    };
    if (document.fonts?.ready) {
      document.fonts.ready.then(done).catch(done);
    } else {
      setTimeout(done, 300);
    }
  });
}

/** Temporarily remove preview zoom so capture matches on-screen pixels at 100% */
export function withPreviewAtFullScale<T>(fn: () => Promise<T>): Promise<T> {
  const wrapper = document.querySelector<HTMLElement>(".preview-zoom-wrapper");
  const saved = wrapper?.style.transform ?? "";
  if (wrapper) wrapper.style.transform = "none";

  document.documentElement.classList.add("pdf-exporting");

  return fn().finally(() => {
    if (wrapper) wrapper.style.transform = saved;
    document.documentElement.classList.remove("pdf-exporting");
  });
}
