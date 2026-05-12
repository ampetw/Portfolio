(function () {
  if (!window.matchMedia("(pointer: fine)").matches) return;

  const follower = document.createElement("div");
  follower.id = "siteCursorStar";
  follower.setAttribute("aria-hidden", "true");
  const img = document.createElement("img");
  img.src = "assets/cursor.svg";
  img.alt = "";
  img.width = 56;
  img.height = 56;
  follower.appendChild(img);
  document.body.appendChild(follower);

  document.documentElement.classList.add("siteCursorStarActive");

  let visible = false;
  let raf = 0;
  let lx = 0;
  let ly = 0;

  function paint() {
    raf = 0;
    follower.style.left = `${lx}px`;
    follower.style.top = `${ly}px`;
    if (!visible) {
      follower.classList.add("siteCursorStar--visible");
      visible = true;
    }
  }

  document.addEventListener(
    "pointermove",
    (e) => {
      lx = e.clientX;
      ly = e.clientY;
      if (!raf) raf = window.requestAnimationFrame(paint);
    },
    { passive: true }
  );

  document.addEventListener("pointerdown", () => {
    follower.classList.add("siteCursorStar--press");
  });
  document.addEventListener("pointerup", () => {
    follower.classList.remove("siteCursorStar--press");
  });

  window.addEventListener("blur", () => {
    follower.classList.remove("siteCursorStar--visible");
    visible = false;
  });
})();
