const WORKS = [
  {
    title: "Type Specimen",
    tags: ["Typography", "Editorial"],
    href: "assets/works/type-specimen.jpg",
    thumb: "assets/works/type-specimen.jpg",
  },
  {
    title: "Mango Chilimansi Hot Sauce",
    tags: ["Packaging", "Brand Identity"],
    href: "assets/works/mango-chilimansi.png",
    thumb: "assets/works/mango-chilimansi.png",
  },
  {
    title: "Final 102 Project",
    tags: ["Collage", "Layout"],
    href: "assets/works/final-102-project.png",
    thumb: "assets/works/final-102-project.png",
    thumbAspectRatio: "1024 / 819",
  },
  {
    title: "Image Brochure",
    tags: ["Editorial", "Print"],
    href: "assets/works/image-brochure.png",
    thumb: "assets/works/image-brochure.png",
    thumbAspectRatio: "1024 / 768",
    gridRow: 2,
    gridColumn: 2,
  },
  {
    title: "Fuse Typeface",
    tags: ["Typography", "Type Design"],
    href: "assets/works/fuse-typeface.png",
    thumb: "assets/works/fuse-typeface.png",
    thumbAspectRatio: "768 / 1024",
    gridRow: 2,
    gridColumn: 3,
    offsetY: -160,
  },
  {
    title: "2026 Dance Showcase",
    tags: ["Poster", "Typography"],
    href: "assets/works/showcase.png",
    thumb: "assets/works/showcase.png",
    thumbAspectRatio: "768 / 1024",
  },
];

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null) continue;
    if (k === "class") node.className = v;
    else if (k === "text") node.textContent = v;
    else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v);
    else node.setAttribute(k, String(v));
  }
  for (const child of children) node.append(child);
  return node;
}

function buildCard(work) {
  const isExternal = /^https?:\/\//.test(work.href);
  const disabled = work.href === "#";
  const isPdf = !disabled && /\.pdf($|\?)/i.test(work.href);

  const thumbAttrs = {
    class: `thumb ${work.thumb || isPdf ? "" : "placeholder"} ${work.thumbFit === "contain" ? "thumb--contain" : ""}`,
  };
  if (work.thumbAspectRatio) thumbAttrs.style = `aspect-ratio: ${work.thumbAspectRatio};`;
  const thumb = el("div", thumbAttrs, []);
  if (work.thumb) {
    thumb.append(
      el("img", {
        class: `thumbImg ${work.thumbFit === "contain" ? "thumbImg--contain" : ""}`,
        src: work.thumb,
        alt: `${work.title} thumbnail`,
        loading: "lazy",
      })
    );
  } else if (isPdf) {
    // Browser-native PDF preview (first page visible without clicking).
    // Pointer events are disabled in CSS so the card remains clickable.
    thumb.append(
      el("embed", {
        class: "pdfPreview",
        src: `${work.href}#page=1&zoom=page-fit&toolbar=0&navpanes=0`,
        type: "application/pdf",
      })
    );
  }

  const metaChildren = [];
  if (work.client) metaChildren.push(el("div", { class: "metaTop", text: work.client }));
  metaChildren.push(el("div", { class: "metaTitle", text: work.title }));
  const meta = el("div", { class: "meta" }, metaChildren);

  const linkAttrs = {
    class: "cardLink",
    href: disabled ? "javascript:void(0)" : work.href,
    "aria-label": `${work.title} — open`,
  };
  if (!disabled && (isExternal || isPdf)) {
    linkAttrs.target = "_blank";
    linkAttrs.rel = "noreferrer";
  }
  if (disabled) {
    linkAttrs["aria-disabled"] = "true";
    linkAttrs.onclick = (e) => e.preventDefault();
  }

  const link = el("a", linkAttrs, [thumb, meta]);

  const cardAttrs = { class: "card" };
  if (work.gridRow || work.gridColumn) {
    const parts = [];
    if (work.gridColumn) parts.push(`grid-column: ${work.gridColumn};`);
    if (work.gridRow) parts.push(`grid-row: ${work.gridRow};`);
    cardAttrs.style = parts.join(" ");
  }
  if (work.offsetY) {
    cardAttrs.class += " card--offset";
    cardAttrs.style = `${cardAttrs.style ? `${cardAttrs.style} ` : ""}--offsetY: ${work.offsetY}px;`;
  }
  return el("article", cardAttrs, [link]);
}

function renderWorks() {
  const root = document.querySelector("[data-works]");
  if (!root) return;

  root.innerHTML = "";
  for (const work of WORKS) root.append(buildCard(work));
}

document.addEventListener("DOMContentLoaded", () => {
  renderWorks();
});

