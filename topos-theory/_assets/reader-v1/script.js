(() => {
  const proofs = [...document.querySelectorAll(".proof-shell")];
  const choices = [...document.querySelectorAll("button[data-proof-mode]")];
  const preferenceKey = "notes-reader:topos-theory:v1:proof-mode";
  function setMode(mode, save = true) {
    const resolved = mode === "collapsed" ? "collapsed" : "displayed";
    document.body.dataset.proofMode = resolved;
    proofs.forEach((proof) => { proof.open = resolved === "displayed"; });
    choices.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.proofMode === resolved)));
    if (save) { try { localStorage.setItem(preferenceKey, resolved); } catch {} }
  }
  let initial = "displayed";
  try {
    const saved = localStorage.getItem(preferenceKey);
    const legacy = JSON.parse(localStorage.getItem("layered-notes-reader-preferences-v1") || "{}");
    initial = saved || (legacy.detailLevel === "-1" ? "collapsed" : "displayed");
  } catch {}
  setMode(initial, false);
  choices.forEach((button) => button.addEventListener("click", () => setMode(button.dataset.proofMode)));

  // Ordinary reading uses the default PDF's depth, without layer controls.
  // Keep every experimental layer addressable through its existing anchors.
  document.body.dataset.presentation = "seamless";
  document.querySelectorAll("[data-detail-toggle]").forEach((button) => { button.hidden = true; });
  document.querySelectorAll(".proof-detail").forEach((detail) => {
    detail.hidden = Number(detail.dataset.depth) > 1;
  });
  function revealTarget() {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const target = document.getElementById(id);
    if (!target) return;
    if (target.matches("[data-legacy-reference]")) {
      location.replace(target.dataset.legacyReference);
      return;
    }
    const content = target.matches("[data-detail-toggle]")
      ? document.getElementById(target.getAttribute("aria-controls")) : target;
    let detail = content?.closest(".proof-detail");
    while (detail) {
      detail.hidden = false;
      detail = detail.parentElement?.closest(".proof-detail");
    }
    target.closest(".proof-shell")?.setAttribute("open", "");
    if (target.matches("[data-detail-toggle]")) content?.scrollIntoView();
  }
  window.addEventListener("hashchange", revealTarget);
  revealTarget();
})();
