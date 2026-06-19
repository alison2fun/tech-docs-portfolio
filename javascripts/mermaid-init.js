(function () {
  function runMermaid() {
    if (!window.mermaid) return;

    document.querySelectorAll("pre.mermaid > code").forEach(function (code) {
      var pre = code.parentElement;
      if (!pre || pre.dataset.normalized === "true") return;
      pre.textContent = code.textContent;
      pre.dataset.normalized = "true";
    });

    window.mermaid.initialize({
      startOnLoad: false,
      theme: "base",
      securityLevel: "loose",
      themeVariables: {
        background: "#fffdf7",
        primaryColor: "#e8eef6",
        primaryTextColor: "#181817",
        primaryBorderColor: "#1b365d",
        lineColor: "#1b365d",
        secondaryColor: "#faf9f4",
        tertiaryColor: "#f5f4ed",
        noteBkgColor: "#fff7df",
        noteTextColor: "#181817",
        noteBorderColor: "#c8bfad",
        actorBkg: "#fffdf7",
        actorBorder: "#1b365d",
        actorTextColor: "#181817",
        signalColor: "#1b365d",
        signalTextColor: "#181817",
        fontFamily: "Georgia, 'Noto Serif CJK SC', 'Songti SC', serif"
      },
      sequence: {
        mirrorActors: false,
        showSequenceNumbers: false,
        actorMargin: 48,
        boxMargin: 10,
        messageMargin: 34,
        noteMargin: 12
      },
      flowchart: {
        curve: "basis",
        padding: 14
      }
    });

    window.mermaid.run({ querySelector: ".mermaid" }).catch(function () {});
  }

  if (window.document$) {
    window.document$.subscribe(runMermaid);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", runMermaid);
  } else {
    runMermaid();
  }
})();
