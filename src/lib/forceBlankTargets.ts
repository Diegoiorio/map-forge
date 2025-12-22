export default function forceBlankTargets(html: string): string {
  if (!html || !html.includes("<a")) return html;

  const doc = new DOMParser().parseFromString(html, "text/html");

  doc.querySelectorAll("a[href]").forEach((a) => {
    a.setAttribute("target", "_blank");

    // security best practice:
    const rel = (a.getAttribute("rel") ?? "").split(/\s+/).filter(Boolean);
    const needed = ["noopener", "noreferrer"];

    for (const n of needed) if (!rel.includes(n)) rel.push(n);

    a.setAttribute("rel", rel.join(" "));
  });

  return doc.body.innerHTML;
}
