const WORKS = [
  {
    title: "Type Specimen",
    client: "Study Abroad Submission",
    tags: ["Typography", "Editorial"],
    href: "assets/works/Type-Specimen_Amelie-FINAL.pdf",
    thumb: null,
  },
  {
    title: "Mango Chilimansi Hot Sauce",
    client: "Study Abroad Submission",
    tags: ["Packaging", "Brand Identity"],
    href: "assets/works/Mango-Chilimansi-Hot-Sauce.pdf",
    thumb: null,
  },
  {
    title: "Add your next project",
    client: "Drop images into assets/works/",
    tags: ["Poster", "Motion", "Illustration"],
    href: "#",
    thumb: null,
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

  const thumb = el("div", { class: `thumb ${work.thumb ? "" : "placeholder"}` }, []);
  if (work.thumb) {
    thumb.append(el("img", { src: work.thumb, alt: `${work.title} thumbnail`, loading: "lazy" }));
  }

  const tags = el(
    "div",
    { class: "tags" },
    (work.tags || []).map((t) => el("span", { class: "tag", text: t }))
  );

  const meta = el("div", { class: "meta" }, [
    el("div", { class: "metaTop", text: work.client || "" }),
    el("div", { class: "metaTitle", text: work.title }),
    tags,
  ]);

  const linkAttrs = {
    class: "cardLink",
    href: disabled ? "javascript:void(0)" : work.href,
    "aria-label": `${work.title} — open`,
  };
  if (!disabled && (isExternal || /\.pdf($|\?)/i.test(work.href))) {
    linkAttrs.target = "_blank";
    linkAttrs.rel = "noreferrer";
  }
  if (disabled) {
    linkAttrs["aria-disabled"] = "true";
    linkAttrs.onclick = (e) => e.preventDefault();
  }

  const link = el("a", linkAttrs, [thumb, meta]);

  return el("article", { class: "card" }, [link]);
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

