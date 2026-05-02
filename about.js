function animateLetters(node) {
  const text = (node.textContent || "").trim();
  if (!text) return;

  node.textContent = "";
  let i = 0;
  for (const ch of text) {
    const span = document.createElement("span");
    span.className = "textLetter";
    span.style.setProperty("--i", String(i));
    span.textContent = ch === " " ? "\u00A0" : ch;
    node.append(span);
    i += 1;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const nodes = document.querySelectorAll("[data-letter-animate]");
  for (const node of nodes) animateLetters(node);
});

