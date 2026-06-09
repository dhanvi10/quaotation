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
  clonePaper.style.minHeight = "auto";
  clonePaper.style.height = "auto";
  clonePaper.style.overflow = "visible";
  clonePaper.style.background = window.getComputedStyle(sourcePaper).background;
  clonePaper.style.margin = "0";
  clonePaper.style.boxSizing = "border-box";

  mirrorComputedStyles(sourcePaper, clonePaper);

  // Gradient text → keep gradient on clone (canvas renders background-image on block)
  clonePaper.querySelectorAll<HTMLElement>(".company-gradient-text").forEach((el, idx) => {
    const src = sourcePaper.querySelectorAll<HTMLElement>(".company-gradient-text")[idx];
    if (!src) return;

    // For PDF export, replace gradient with solid color
    // html2canvas can't render text with background-clip:text + transparent color
    el.style.backgroundImage = "none";
    el.style.color = "#1d4ed8"; // Blue color to match theme
    el.style.webkitTextFillColor = "#1d4ed8";
    el.style.setProperty("-webkit-text-fill-color", "#1d4ed8");

    const cs = window.getComputedStyle(src);
    el.style.lineHeight = cs.lineHeight;
    el.style.padding = cs.padding;
    el.style.fontSize = cs.fontSize;
    el.style.fontWeight = cs.fontWeight;
    el.style.display = "inline-block";
    el.style.width = "auto";
    el.style.maxWidth = "100%";

    // Add marker class for CSS overrides
    el.classList.add("pdf-company-title");
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

  // Mirror all images from source to clone (copy src, alt, styles)
  const sourceImages = sourcePaper.querySelectorAll<HTMLImageElement>("img");
  const cloneImages = clonePaper.querySelectorAll<HTMLImageElement>("img");
  sourceImages.forEach((srcImg, idx) => {
    const cloneImg = cloneImages[idx];
    if (!cloneImg) return;
    // Copy image attributes
    cloneImg.src = srcImg.src;
    cloneImg.alt = srcImg.alt;
    cloneImg.setAttribute("crossorigin", "anonymous");
    // Copy image styles
    const computedStyle = window.getComputedStyle(srcImg);
    ["width", "height", "maxWidth", "maxHeight", "objectFit", "objectPosition"].forEach((prop) => {
      const val = computedStyle.getPropertyValue(prop);
      if (val) cloneImg.style.setProperty(prop, val);
    });
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
      // Wait for all images to load before exporting
      const images = Array.from(document.querySelectorAll<HTMLImageElement>("img"));
      const imagePromises = images.map(
        (img) =>
          new Promise<void>((imgResolve) => {
            if (img.complete) {
              imgResolve();
            } else {
              img.onload = () => imgResolve();
              img.onerror = () => imgResolve(); // Resolve even if load fails
            }
          })
      );

      Promise.all(imagePromises).then(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            // Extra delay for iOS Safari font rendering + Gujarati fonts
            setTimeout(() => {
              setTimeout(resolve, 300);
            }, 200);
          });
        });
      });
    };
    if (document.fonts?.ready) {
      document.fonts.ready.then(done).catch(done);
    } else {
      setTimeout(done, 500);
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
