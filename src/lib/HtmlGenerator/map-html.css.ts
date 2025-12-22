export const MAP_PDF_CSS = `
@page { margin: 18mm 16mm; }

* { box-sizing: border-box; }

body {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12pt;
  line-height: 1.45;
  color: #111;
}

.container { width: 100%; }

h1 {
  font-size: 22pt;
  margin: 0 0 10mm 0;
  padding-bottom: 4mm;
  border-bottom: 1px solid #ddd;
}

.image-wrap {
  margin: 0 0 10mm 0;
  padding: 6mm;
  border: 1px solid #e6e6e6;
  border-radius: 6px;
}

img {
  width: 100%;
  height: auto;
  display: block;
}

.meta {
  margin-top: 4mm;
  font-size: 10.5pt;
  color: #555;
}

.section-title {
  margin: 0 0 4mm 0;
  font-size: 14pt;
}

.marker {
  padding: 6mm;
  margin: 0 0 6mm 0;
  border: 1px solid #eee;
  border-radius: 6px;
  page-break-inside: avoid;
}

.marker h2 {
  font-size: 13.5pt;
  margin: 0 0 3mm 0;
  padding-bottom: 2mm;
  border-bottom: 1px dashed #e5e5e5;
}

.marker .desc { color: #222; }

.divider {
  height: 1px;
  background: #e9e9e9;
  margin: 10mm 0;
}
`;
