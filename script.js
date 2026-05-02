const WORKS = [
  {
    id: "type-specimen",
    title: "Type Specimen",
    tags: ["Typography", "Editorial"],
    href: "assets/works/type-specimen.jpg",
    thumb: "assets/works/type-specimen.jpg",
  },
  {
    id: "mango-chilimansi",
    title: "Mango Chilimansi Hot Sauce",
    tags: ["Packaging", "Brand Identity"],
    href: "assets/works/mango-chilimansi.png",
    thumb: "assets/works/mango-chilimansi.png",
    date: "February 2026",
    description:
      "Add a description of the project here. Include goals, tools, and what you learned.",
    images: [
      "assets/works/mango-chilimansi.png",
      "assets/hot sauce/Ghostolatl.jpg",
      "assets/hot sauce/Mango-Chilimansi-Final.png",
      "assets/hot sauce/Ghostalatl-Final.png",
    ],
  },
  {
    id: "final-102-project",
    title: "Final 102 Project",
    tags: ["Collage", "Layout"],
    href: "assets/works/final-102-project.png",
    thumb: "assets/works/final-102-project.png",
    thumbAspectRatio: "1024 / 819",
  },
  {
    id: "fuse-typeface",
    title: "Fuse Typeface",
    tags: ["Typography", "Type Design"],
    href: "assets/works/image-brochure.png",
    thumb: "assets/works/image-brochure.png",
    thumbAspectRatio: "1024 / 768",
  },
  {
    id: "dance-showcase",
    title: "2026 Dance Showcase",
    tags: ["Poster", "Typography"],
    href: "assets/works/showcase.png",
    thumb: "assets/works/showcase.png",
    thumbAspectRatio: "768 / 1024",
    date: "2026",
    description: "Add a description for the KPDA dance showcase project.",
    images: [
      "assets/works/showcase.png",
      "assets/kpda/showcase flyer draft.png",
      "assets/kpda/shirt mockup 1.png",
      "assets/kpda/ScreenRecording_04-20-2026-10-22-15_1.mov",
    ],
    thumbVideo: "assets/kpda/ScreenRecording_04-20-2026-10-22-15_1.mov",
    thumbPoster: "assets/works/showcase.png",
  },
  {
    id: "image-brochure",
    title: "Image Brochure",
    tags: ["Editorial", "Print"],
    href: "assets/works/fuse-typeface.png",
    thumb: "assets/works/fuse-typeface.png",
    thumbAspectRatio: "768 / 1024",
  },
  {
    id: "project-1-walkthrough",
    title: "Project 1 Walkthrough",
    tags: ["Video"],
    href: "assets/works/Project 1 Walkthrough.mov",
    thumbAspectRatio: "16 / 9",
    fullRow: true,
    date: "2026",
    description: "Add a description for this walkthrough video.",
    images: ["assets/works/Project 1 Walkthrough.mov"],
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

function isVideoSrc(src) {
  return /\.(mov|mp4|webm)(\?.*)?$/i.test(src || "");
}

function isPdfSrc(src) {
  return /\.pdf($|\?)/i.test(src || "");
}

function buildCard(work) {
  const isExternal = /^https?:\/\//.test(work.href);
  const disabled = work.href === "#";
  const isPdf = !disabled && /\.pdf($|\?)/i.test(work.href);
  const isVideo = !disabled && isVideoSrc(work.href);

  const thumbAttrs = {
    class: `thumb ${work.thumb || isPdf ? "" : "placeholder"} ${work.thumbFit === "contain" ? "thumb--contain" : ""}`,
  };
  if (work.thumbAspectRatio) thumbAttrs.style = `aspect-ratio: ${work.thumbAspectRatio};`;
  const thumb = el("div", thumbAttrs, []);
  if (work.thumbVideo) {
    const posterImg = work.thumbPoster
      ? el("img", { class: "thumbPoster", src: work.thumbPoster, alt: `${work.title} thumbnail`, loading: "lazy" })
      : null;
    const vid = el("video", {
      class: "thumbVideo",
      src: work.thumbVideo,
      muted: "true",
      playsinline: "true",
      loop: "true",
      preload: "metadata",
    });
    if (work.thumbPoster) vid.setAttribute("poster", work.thumbPoster);
    // Hover-to-play preview
    vid.addEventListener("mouseenter", () => {
      try { vid.play(); } catch {}
    });
    vid.addEventListener("mouseleave", () => {
      vid.pause();
      try { vid.currentTime = 0; vid.load(); } catch {}
    });
    if (posterImg) thumb.append(posterImg);
    thumb.append(vid);
  } else if (work.thumb) {
    thumb.append(
      el("img", {
        class: `thumbImg ${work.thumbFit === "contain" ? "thumbImg--contain" : ""}`,
        src: work.thumb,
        alt: `${work.title} thumbnail`,
        loading: "lazy",
      })
    );
  } else if (isVideo) {
    const vid = el("video", {
      class: "thumbVideo",
      src: work.href,
      muted: "true",
      playsinline: "true",
      loop: "true",
      preload: "metadata",
    });
    // Hover-to-play preview
    vid.addEventListener("mouseenter", () => {
      try { vid.play(); } catch {}
    });
    vid.addEventListener("mouseleave", () => {
      vid.pause();
      try { vid.currentTime = 0; } catch {}
    });
    thumb.append(vid);
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

  // Title overlay (shown on hover/focus).
  thumb.append(
    el("div", { class: "thumbOverlay", "aria-hidden": "true" }, [
      el("div", { class: "thumbOverlayTitle", text: work.title }),
    ])
  );

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

  const link = el("a", linkAttrs, [thumb]);

  const cardAttrs = { class: `card${work.fullRow ? " card--fullRow" : ""}` };
  if (work.id) cardAttrs["data-work-id"] = work.id;
  return el("article", cardAttrs, [link]);
}

function renderWorks() {
  const root = document.querySelector("[data-works]");
  if (!root) return;

  root.innerHTML = "";
  for (const work of WORKS) root.append(buildCard(work));
}

function animateSvgLetters(selector) {
  const root = document.querySelector(selector);
  if (!root) return;

  const letters = root.querySelectorAll("tspan");
  let i = 0;
  for (const tspan of letters) {
    if (!tspan.textContent || !tspan.textContent.trim()) continue;
    tspan.classList.add("svgLetter");
    tspan.style.setProperty("--i", String(i));
    i += 1;
  }
}

function setupWorkDetail() {
  const grid = document.querySelector("[data-works]");
  const overlay = document.querySelector("[data-work-modal-overlay]");
  const modal = document.querySelector("[data-work-modal]");
  if (!grid || !overlay || !modal) return;

  const titleEl = modal.querySelector("[data-work-modal-title]");
  const dateEl = modal.querySelector("[data-work-modal-date]");
  const descEl = modal.querySelector("[data-work-modal-desc]");
  const stackEl = modal.querySelector("[data-work-modal-stack]");
  const galleryEl = modal.querySelector("[data-work-modal-gallery]");
  const closeBtn = modal.querySelector("[data-work-modal-close]");

  const close = () => {
    overlay.classList.remove("workModalOverlay--open");
    window.setTimeout(() => {
      overlay.hidden = true;
    }, 220);
  };

  closeBtn?.addEventListener("click", close);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !overlay.hidden) close();
  });

  grid.addEventListener("click", (e) => {
    const link = e.target.closest("a.cardLink");
    if (!link) return;

    const card = link.closest(".card");
    const id = card?.getAttribute("data-work-id");
    const work = WORKS.find((w) => w.id === id) || WORKS.find((w) => w.href === link.getAttribute("href"));
    if (!work) return;

    e.preventDefault();

    if (titleEl) titleEl.textContent = work.title;
    if (dateEl) dateEl.textContent = work.date ?? "";
    if (descEl) descEl.textContent = work.description ?? "Add a description of the work here.";

    const images = Array.isArray(work.images) && work.images.length ? work.images : [work.href];
    const gallery = images.slice(0, 2);
    const stack = images.slice(2);

    if (galleryEl) {
      galleryEl.innerHTML = "";
      for (const src of gallery) {
        if (isVideoSrc(src)) {
          galleryEl.append(
            el(
              "video",
              { src, class: "workMediaVideo", controls: "true", playsinline: "true", preload: "metadata" },
              []
            )
          );
        } else if (isPdfSrc(src)) {
          galleryEl.append(
            el("embed", { src, type: "application/pdf", class: "workMediaPdf" }, [])
          );
        } else {
          galleryEl.append(el("img", { src, alt: work.title, loading: "lazy" }, []));
        }
      }
    }
    if (stackEl) {
      stackEl.innerHTML = "";
      for (const src of stack) {
        if (isVideoSrc(src)) {
          stackEl.append(
            el(
              "video",
              { src, class: "workMediaVideo", controls: "true", playsinline: "true", preload: "metadata" },
              []
            )
          );
        } else if (isPdfSrc(src)) {
          stackEl.append(
            el("embed", { src, type: "application/pdf", class: "workMediaPdf" }, [])
          );
        } else {
          stackEl.append(el("img", { src, alt: work.title, loading: "lazy" }, []));
        }
      }
    }

    overlay.hidden = false;
    requestAnimationFrame(() => overlay.classList.add("workModalOverlay--open"));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderWorks();
  setupWorkDetail();
  animateSvgLetters(".homeNametag.homeSvgText");
  animateSvgLetters(".homeAboutText.homeSvgText");
});

