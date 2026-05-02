const PLAY_ITEMS = [
  {
    src: "assets/play/peppers.png",
    alt: "Pepper sculptures",
    aspectRatio: "1 / 1",
    gridColumn: 1,
    gridRow: 1,
  },
  {
    src: "assets/play/egg-sequence.png",
    alt: "Egg sequence",
    aspectRatio: "1024 / 391",
    gridColumn: 2,
    gridRow: 1,
  },
  {
    src: "assets/play/frog1.png",
    alt: "Frog drawing 1",
    aspectRatio: "755 / 1024",
    gridColumn: 2,
    gridRow: 2,
  },
  {
    src: "assets/play/frog2.png",
    alt: "Frog drawing 2",
    aspectRatio: "673 / 1024",
    gridColumn: 3,
    gridRow: "1 / span 2",
  },
  {
    src: "assets/play/donuts.png",
    alt: "Donut painting",
    aspectRatio: "1024 / 711",
    gridColumn: 1,
    gridRow: 2,
  },
  {
    src: "assets/play/portrait.png",
    alt: "Portrait painting",
    aspectRatio: "1 / 1",
    gridColumn: 1,
    gridRow: 3,
  },
  {
    src: "assets/play/still-life.png",
    alt: "Still life painting",
    aspectRatio: "2 / 1",
    gridColumn: "2 / span 2",
    gridRow: 3,
  },
  {
    src: "assets/play/pantry.png",
    alt: "Pantry painting",
    aspectRatio: "3 / 4",
    gridColumn: 3,
    gridRow: 3,
  },
];

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null) continue;
    if (k === "class") node.className = v;
    else if (k === "text") node.textContent = v;
    else node.setAttribute(k, String(v));
  }
  for (const child of children) node.append(child);
  return node;
}

let TOP_Z = 1;

function initRippleText() {
  const nodes = document.querySelectorAll("[data-ripple-text]");
  for (const node of nodes) {
    const text = node.textContent || "";
    node.textContent = "";

    let i = 0;
    for (const ch of text) {
      if (ch === "\n") continue;
      const span = document.createElement("span");
      span.className = "rippleChar";
      span.style.setProperty("--i", String(i));
      span.textContent = ch === " " ? "\u00A0" : ch;
      node.append(span);
      i += 1;
    }
    node.classList.add("rippleReady");
  }
}

function enableDrag(node) {
  let startX = 0;
  let startY = 0;
  let originX = 0;
  let originY = 0;

  function getXY() {
    const x = Number(node.dataset.x || "0");
    const y = Number(node.dataset.y || "0");
    return { x, y };
  }

  function getBase() {
    const x = Number(node.dataset.baseX || "0");
    const y = Number(node.dataset.baseY || "0");
    return { x, y };
  }

  function setXY(x, y) {
    const base = getBase();
    node.dataset.x = String(x);
    node.dataset.y = String(y);
    node.style.transform = `translate(${base.x + x}px, ${base.y + y}px)`;
  }

  node.addEventListener("pointerdown", (e) => {
    if (e.button !== 0) return;

    node.setPointerCapture(e.pointerId);
    node.classList.add("playItem--dragging");
    TOP_Z += 1;
    node.style.zIndex = String(TOP_Z);

    const { x, y } = getXY();
    originX = x;
    originY = y;
    startX = e.clientX;
    startY = e.clientY;

    e.preventDefault();
  });

  node.addEventListener("pointermove", (e) => {
    if (!node.classList.contains("playItem--dragging")) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    // Free drag in any direction; refresh resets positions back to the grid.
    setXY(originX + dx, originY + dy);
  });

  function endDrag(e) {
    if (!node.classList.contains("playItem--dragging")) return;
    node.classList.remove("playItem--dragging");
    try {
      node.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  }

  node.addEventListener("pointerup", endDrag);
  node.addEventListener("pointercancel", endDrag);
}

function renderPlay() {
  const root = document.querySelector("[data-play]");
  if (!root) return;

  root.innerHTML = "";

  for (const item of PLAY_ITEMS) {
    const thumb = el("div", { class: "thumb playThumb" }, []);
    if (item.aspectRatio) thumb.style.aspectRatio = item.aspectRatio;

    const img = el("img", { class: "thumbImg", src: item.src, alt: item.alt || "", draggable: "false" });
    thumb.append(img);

    const wrapper = el("div", { class: "playItem" }, [thumb]);
    wrapper.dataset.x = "0";
    wrapper.dataset.y = "0";
    wrapper.dataset.baseX = "0";
    wrapper.dataset.baseY = String(item.baseOffsetY || 0);
    wrapper.style.transform = `translate(${Number(wrapper.dataset.baseX)}px, ${Number(wrapper.dataset.baseY)}px)`;

    enableDrag(wrapper);
    root.append(wrapper);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initRippleText();
  renderPlay();
  // Letter-by-letter animation for the Play title SVG (redplay)
  const titleSvg = document.querySelector(".playSvgText");
  if (titleSvg) {
    const letters = titleSvg.querySelectorAll("tspan");
    let i = 0;
    for (const tspan of letters) {
      if (!tspan.textContent || !tspan.textContent.trim()) continue;
      tspan.classList.add("svgLetter");
      tspan.style.setProperty("--i", String(i));
      i += 1;
    }
  }
});

