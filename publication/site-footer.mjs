const stylesheet = '<link rel="stylesheet" href="/assets/footer.css">';
const legalLink = '<a href="/impressum.html">Impressum &amp; Datenschutz</a>';

export function withSiteFooter(html) {
  if (!html.includes("</head>") || !html.includes("</body>")) {
    throw new Error("Expected a complete HTML page when installing the site footer.");
  }
  if (!html.includes(stylesheet)) html = html.replace("</head>", `${stylesheet}\n</head>`);

  const footer = html.match(/<footer\b[^>]*>[\s\S]*?<\/footer>/i)?.[0];
  if (!footer) return html.replace("</body>", `  <footer>${legalLink}</footer>\n</body>`);

  const pdfControl = html.match(/<a\b[^>]*\bclass="[^"]*\bmanuscript-trigger\b[^"]*"[^>]*>/)?.[0];
  const pdfHref = pdfControl?.match(/\bhref="([^"]+)"/)?.[1];
  let updated = footer.replace(/^[ \t]*<a href="([^"]+)">PDF<\/a>\r?\n/gm,
    (line, href) => href === pdfHref ? "" : line);
  updated = updated.replace(/^[ \t]*<p class="source-note">[^<]*LaTeX source[^<]*<\/p>\r?\n/gm, "");
  updated = updated.replace('<a href="/impressum.html">Impressum</a>', legalLink);
  if (!updated.includes(legalLink)) updated = updated.replace("</footer>", `  ${legalLink}\n</footer>`);
  return html.replace(footer, () => updated);
}
