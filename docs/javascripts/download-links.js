document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("a[data-download-pdf]").forEach((link) => {
    link.addEventListener("click", async (event) => {
      event.preventDefault();
      event.stopPropagation();

      const filename = link.getAttribute("download") || "resume.pdf";
      const href = link.href;

      try {
        const response = await fetch(href, { cache: "no-store" });
        if (!response.ok) throw new Error(`PDF request failed: ${response.status}`);

        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        const downloadLink = document.createElement("a");

        downloadLink.href = objectUrl;
        downloadLink.download = filename;
        downloadLink.rel = "noopener";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        downloadLink.remove();

        window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
      } catch (_) {
        window.open(href, "_blank", "noopener");
      }
    });
  });
});
