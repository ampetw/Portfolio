const WORKS = [
  {
    id: "amelies-world",
    title: "Music Visualizer: Amelie's World",
    tags: ["Video"],
    href: "https://youtu.be/95krtLKLwNE?si=Yp5J7iqW2yT7ARKh",
    thumb: "assets/works/amelies-world.jpg",
    thumbPoster: "assets/works/amelies-world.jpg",
    thumbAspectRatio: "16 / 9",
    fullRow: true,
    date: "June 2026",
    description:
      "Amelie's World is a music visualizer that explores the emotions I feel based on a curated playlist of some my favorite songs. This workshop was hosted by Ordinary People Studio and the University of Tennessee School of Design.",
    images: ["https://youtu.be/95krtLKLwNE?si=Yp5J7iqW2yT7ARKh"],
    youtubePreviewStart: 240,
    youtubePreviewEnd: 252,
  },
  {
    id: "type-specimen",
    title: "Type Specimen Poster: Didot",
    tags: ["Typography", "Editorial"],
    href: "assets/didot.png",
    thumb: "assets/didot.png",
    date: "September 2025",
    description:
      "This poster displays Didot’s typeface anatomy, style variations, character setting, special characters, and history of the typeface. ",
  },
  {
    id: "mango-chilimansi",
    title: "Hot Sauce Labels",
    tags: ["Packaging", "Brand Identity"],
    href: "assets/works/mango-chilimansi.png",
    thumb: "assets/works/mango-chilimansi.png",
    thumbHoverImg: "assets/hot sauce/Ghostolatl.jpg",
    date: "December 2025",
    description:
      "This project includes two hot sauces: Mango Chilimansi (mango, chili, and calamansi) and Ghostolatl (ghost pepper and chocolate). The label is designed to cater to two different audiences: young Filipinos for the spicy Mango Chilimansi and adventurous spice risk takers for Ghostolatl.",
    images: [
      "assets/works/mango-chilimansi.png",
      "assets/hot sauce/Ghostolatl.jpg",
      "assets/hot sauce/New_mango.png",
      "assets/hot sauce/Ghostalatl Final File.png",
    ],
  },
  {
    id: "final-102-project",
    title: "Editorial Illustration",
    tags: ["Collage", "Layout"],
    href: "assets/works/final-102-project.png",
    thumb: "assets/works/final-102-project.png",
    thumbAspectRatio: "1024 / 819",
    date: "December 2024",
    description:
      'This is an editorial illustration for an article under the New York Times Style Magazine called "Why Are Pants So Big (Again)?".',
  },
  {
    id: "fuse-typeface",
    title: "Museum Brochures",
    tags: ["Typography", "Type Design"],
    href: "assets/works/image-brochure.png",
    thumb: "assets/works/image-brochure.png",
    thumbAspectRatio: "1024 / 768",
    date: "November 2025",
    description:
      "These museum brochures showcase three artists: Batia Suter, Petra Stvast, and Martin Parr. Each brochure is designed to highlight the artist's unique style and within a consistent layout.",
    images: [
      "assets/works/image-brochure.png",
      "assets/brochures/3 brochures.png",
      "assets/brochures/suter.png",
      "assets/brochures/stavast.png",
      "assets/brochures/parr.png",
    ],
    thumbHoverCycleFromImages: true,
  },
  {
    id: "dance-showcase",
    title: "K-pop Dance Association Branding",
    tags: ["Poster", "Typography"],
    href: "assets/works/showcase.png",
    thumb: "assets/works/showcase.png",
    thumbAspectRatio: "768 / 1024",
    date: "April 2026",
    description: "This project includes the branding for the K-pop Dance Association (KPDA) at the University of Tennessee's annual dance showcase with visual elements inspired by songs Tricky House by Xikers and God's Menu by Stray Kids.",
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
    title: "Fuse Modular Typeface",
    tags: ["Editorial", "Print"],
    href: "assets/modular typeface.png",
    thumb: "assets/modular typeface.png",
    thumbAspectRatio: "768 / 1024",
    date: "March 2025",
    description:
      'This modular typeface conceptually represents the fusion of the Latin alphabet and a traditional Filipino script called baybayin by using modular elements of the translation of "fuse" in baybayin.',
  },
  {
    id: "project-1-walkthrough",
    title: "Website Zine: Me and Music",
    tags: ["Video"],
    href: "assets/works/project1.mp4",
    thumbPoster: "assets/works/project1.png",
    thumbVideo: "assets/works/project1.mp4",
    thumbAspectRatio: "16 / 9",
    fullRow: true,
    date: "February 2026",
    description:
      'This webzine explores my personal experiences and interests with music. Click on the different black piano keys to explore fun facts, my music taste, and performances!<br><br><a class="workMetaDescLink workMetaDescLink--zine" href="https://project-1-five-hazel.vercel.app/" target="_blank" rel="noopener noreferrer">Link to webzine</a>',
    images: ["assets/works/project1.mp4"],
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

function getYoutubeId(src) {
  if (!src) return null;
  const match = String(src).match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|shorts\/|watch\?v=|watch\?.+&v=))([A-Za-z0-9_-]{6,})/i
  );
  return match ? match[1] : null;
}

function isPdfSrc(src) {
  return /\.pdf($|\?)/i.test(src || "");
}

function buildCard(work) {
  const isExternal = /^https?:\/\//.test(work.href);
  const disabled = work.href === "#";
  const isPdf = !disabled && /\.pdf($|\?)/i.test(work.href);
  const isVideo = !disabled && isVideoSrc(work.href);
  const youtubeId = getYoutubeId(work.href) || getYoutubeId(work.images?.[0]);
  const thumbSrc = work.thumb || work.thumbPoster || (youtubeId ? `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg` : null);

  const thumbAttrs = {
    class: `thumb ${thumbSrc || isPdf ? "" : "placeholder"} ${work.thumbFit === "contain" ? "thumb--contain" : ""}`,
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
    if (posterImg) thumb.append(posterImg);
    thumb.append(vid);
  } else if (youtubeId) {
    thumb.append(
      el("img", {
        class: "thumbPoster",
        src: thumbSrc || `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`,
        alt: `${work.title} thumbnail`,
        loading: "lazy",
      })
    );
  } else if (thumbSrc && work.thumbHoverImg) {
    thumb.append(
      el("img", {
        class: `thumbImg thumbImg--base ${work.thumbFit === "contain" ? "thumbImg--contain" : ""}`,
        src: thumbSrc,
        alt: `${work.title} thumbnail`,
        loading: "lazy",
      }),
      el("img", {
        class: `thumbImg thumbHoverImg ${work.thumbFit === "contain" ? "thumbImg--contain" : ""}`,
        src: work.thumbHoverImg,
        alt: "",
        loading: "lazy",
        "aria-hidden": "true",
      })
    );
  } else if (thumbSrc) {
    thumb.append(
      el("img", {
        class: `thumbImg ${work.thumbFit === "contain" ? "thumbImg--contain" : ""}`,
        src: thumbSrc,
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

  const thumbVid = thumb.querySelector("video.thumbVideo");
  if (thumbVid) {
    link.addEventListener("mouseenter", () => {
      try {
        thumbVid.play();
      } catch {}
    });
    link.addEventListener("mouseleave", () => {
      thumbVid.pause();
      try {
        thumbVid.currentTime = 0;
        thumbVid.load();
      } catch {}
    });
  }

  if (youtubeId && !work.thumbVideo) {
    let hoverFrame = null;
    let hoverTimer = null;
    const previewStart = Number.isFinite(work.youtubePreviewStart) ? work.youtubePreviewStart : 0;
    const previewEnd = Number.isFinite(work.youtubePreviewEnd) ? work.youtubePreviewEnd : 12;

    const stopYoutubePreview = () => {
      window.clearTimeout(hoverTimer);
      hoverTimer = null;
      if (hoverFrame) {
        hoverFrame.remove();
        hoverFrame = null;
      }
    };

    const startYoutubePreview = () => {
      window.clearTimeout(hoverTimer);
      hoverTimer = window.setTimeout(() => {
        if (hoverFrame) return;
        hoverFrame = el("iframe", {
          class: "thumbYoutube",
          src: `https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&modestbranding=1&playsinline=1&rel=0&loop=1&playlist=${youtubeId}&start=${previewStart}&end=${previewEnd}`,
          title: `${work.title} preview`,
          allow: "autoplay; encrypted-media",
          frameborder: "0",
          tabindex: "-1",
          "aria-hidden": "true",
        });
        thumb.append(hoverFrame);
        requestAnimationFrame(() => hoverFrame?.classList.add("thumbYoutube--visible"));
      }, 140);
    };

    link.addEventListener("mouseenter", startYoutubePreview);
    link.addEventListener("mouseleave", stopYoutubePreview);
    link.addEventListener("focusin", startYoutubePreview);
    link.addEventListener("focusout", stopYoutubePreview);
  }

  const cycleSrcs =
    work.thumbHoverCycleFromImages &&
    work.thumb &&
    Array.isArray(work.images) &&
    work.images.length > 1
      ? work.images.filter((src) => !isVideoSrc(src))
      : null;
  if (cycleSrcs && cycleSrcs.length > 1) {
    const cycImg = thumb.querySelector("img.thumbImg");
    if (cycImg) {
      let cycleTimer = null;
      let cycleIdx = 0;
      link.addEventListener("mouseenter", () => {
        window.clearInterval(cycleTimer);
        cycleIdx = 0;
        const tick = () => {
          cycleIdx = (cycleIdx + 1) % cycleSrcs.length;
          cycImg.src = cycleSrcs[cycleIdx];
        };
        tick();
        cycleTimer = window.setInterval(tick, 900);
      });
      link.addEventListener("mouseleave", () => {
        window.clearInterval(cycleTimer);
        cycleTimer = null;
        cycImg.src = work.thumb;
      });
    }
  }

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

  function buildCarouselMedia(src, titleText) {
    const ytId = getYoutubeId(src);
    if (ytId) {
      return el("iframe", {
        class: "workCarouselMedia workCarouselYoutube",
        src: `https://www.youtube.com/embed/${ytId}`,
        title: titleText || "YouTube video",
        frameborder: "0",
        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
        allowfullscreen: "true",
        referrerpolicy: "strict-origin-when-cross-origin",
      });
    }
    if (isVideoSrc(src)) {
      return el(
        "video",
        { src, class: "workCarouselMedia", controls: "true", playsinline: "true", preload: "metadata" },
        []
      );
    }
    if (isPdfSrc(src)) {
      return el("embed", { src, type: "application/pdf", class: "workCarouselMedia workCarouselPdf" }, []);
    }
    return el("img", { src, alt: titleText || "", loading: "lazy", class: "workCarouselMedia" }, []);
  }

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

    // Always use the wide viewer layout (image/video below description).
    modal.classList.add("workModal--viewer");
    modal.classList.remove("workModal--carousel");

    if (titleEl) titleEl.textContent = work.title;
    if (dateEl) dateEl.textContent = work.date ?? "";
    if (descEl) descEl.innerHTML = work.description ?? "Add a description of the work here.";

    const images = Array.isArray(work.images) && work.images.length ? work.images : [work.href];
    const uniqueImages = [...new Set(images)];

    if (galleryEl) galleryEl.innerHTML = "";

    // Single-asset: show one wide viewer below description.
    if (uniqueImages.length <= 1 && stackEl) {
      const mediaSlot = el("div", { class: "workCarouselViewport" }, [
        buildCarouselMedia(uniqueImages[0], work.title),
      ]);
      stackEl.innerHTML = "";
      stackEl.append(el("div", { class: "workViewer" }, [mediaSlot]));
    }

    // Multi-asset: carousel below description (with slide transition).
    if (uniqueImages.length > 1 && stackEl) {
      modal.classList.add("workModal--carousel");

      let idx = 0;
      const total = uniqueImages.length;
      const mediaSlot = el("div", { class: "workCarouselViewport" }, []);
      const counter = el("div", { class: "workCarouselCounter", text: `${idx + 1} / ${total}` }, []);

      const render = (dir) => {
        const src = uniqueImages[idx];
        const nextEl = buildCarouselMedia(src, work.title);
        if (dir === "prev") nextEl.classList.add("workCarouselMedia--enterLeft");
        if (dir === "next") nextEl.classList.add("workCarouselMedia--enterRight");

        const current = mediaSlot.firstElementChild;
        if (!current) {
          mediaSlot.append(nextEl);
        } else {
          if (dir === "prev") current.classList.add("workCarouselMedia--exitRight");
          if (dir === "next") current.classList.add("workCarouselMedia--exitLeft");
          mediaSlot.append(nextEl);
          window.setTimeout(() => {
            current.remove();
            nextEl.classList.remove("workCarouselMedia--enterLeft", "workCarouselMedia--enterRight");
          }, 260);
        }
        counter.textContent = `${idx + 1} / ${total}`;
      };

      const prevBtn = el("button", { class: "workCarouselBtn", type: "button", text: "Prev" }, []);
      const nextBtn = el("button", { class: "workCarouselBtn", type: "button", text: "Next" }, []);
      prevBtn.addEventListener("click", () => {
        idx = (idx - 1 + total) % total;
        render("prev");
      });
      nextBtn.addEventListener("click", () => {
        idx = (idx + 1) % total;
        render("next");
      });

      const controls = el("div", { class: "workCarouselControls" }, [prevBtn, counter, nextBtn]);
      stackEl.innerHTML = "";
      stackEl.append(el("div", { class: "workCarousel" }, [controls, mediaSlot]));
      render();
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

