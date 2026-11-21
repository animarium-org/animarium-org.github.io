import fs from "node:fs";
import path from "node:path";

// Editorial links belong to the web library, outside the manuscript statement.
export function installRelatedResult(root, stage, contract, note) {
  const registry = new Map(JSON.parse(fs.readFileSync(path.join(root, "publication/entry-tags.json"), "utf8")).Tags);
  const source = contract.Routes.find(r => r.Kind === "entry" && "/" + contract.WorkId + r.Path === registry.get(note.source));
  const target = registry.get(note.target);
  if (!source || typeof target !== "string" || !fs.existsSync(path.join(root, target, "index.html"))) {
    throw new Error("Missing related result for " + note.source);
  }
  const fragment = source.Fragments.find(f => f.Kind === "latex-label").Id;
  const pages = contract.Routes.filter(r => ["entry", "section"].includes(r.Kind) && r.Fragments.some(f => f.Id === fragment));
  if (pages.length !== 2) throw new Error("Expected a section and an entry for " + fragment);
  const escape = s => s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  const noteHtml = '<aside aria-label="Animarium cross-reference"><p>' + escape(note.text) +
    ' <a href="https://animarium.org/tag/' + note.target + '/">[' + escape(note.label) + ']</a>.</p></aside>';
  for (const page of pages) {
    const file = path.join(stage, page.Path, "index.html");
    const html = fs.readFileSync(file, "utf8");
    const id = html.indexOf(' id="' + fragment + '"');
    const start = html.lastIndexOf("<", id);
    const element = html.slice(start).match(/^<(section|div)\b/)?.[1];
    if (id < 0 || !element) throw new Error("Missing statement block in " + file);
    let depth = 0;
    let end = 0;
    for (const m of html.slice(start).matchAll(new RegExp("</?" + element + "\\b[^>]*>", "g"))) {
      depth += m[0].startsWith("</") ? -1 : 1;
      if (depth === 0) { end = start + m.index + m[0].length; break; }
    }
    if (!end) throw new Error("Unclosed statement block in " + file);
    fs.writeFileSync(file, html.slice(0, end) + noteHtml + html.slice(end));
  }
}
