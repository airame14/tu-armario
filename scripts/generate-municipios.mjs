import fs from "fs";
import path from "path";

const csvPath = path.join(process.cwd(), "data", "municipios_provincias.csv");
const provinciasPath = path.join(process.cwd(), "data", "provincias.json");
const outPath = path.join(process.cwd(), "data", "municipios_por_provincia.json");

function normalize(s) {
  return String(s || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// --- parser CSV correcto (comillas, delimitador, etc.) ---
function parseCSVLine(line, delimiter) {
  const out = [];
  let cur = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];

    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (ch === delimiter && !inQuotes) {
      out.push(cur);
      cur = "";
      continue;
    }

    cur += ch;
  }
  out.push(cur);
  return out.map((v) => String(v).trim());
}

function detectDelimiter(sampleLine) {
  const count = (delim) => {
    let c = 0;
    let inQuotes = false;
    for (let i = 0; i < sampleLine.length; i++) {
      const ch = sampleLine[i];
      if (ch === '"') {
        if (inQuotes && sampleLine[i + 1] === '"') i++;
        else inQuotes = !inQuotes;
      } else if (ch === delim && !inQuotes) c++;
    }
    return c;
  };
  return count(";") > count(",") ? ";" : ",";
}

// ---- Fuente de verdad: tus provincias.json ----
const provincias = JSON.parse(fs.readFileSync(provinciasPath, "utf8"));

// Mapa: nombre normalizado -> slug
const provNameToSlug = new Map();
for (const p of provincias) {
  provNameToSlug.set(normalize(p.nombre), p.slug);
}

// Alias típicos de cómo puede venir en CSV (añade aquí si hace falta)
const CSV_PROV_ALIASES = new Map([
  ["la coruna", "a coruna"],
  ["coruna", "a coruna"],
  ["guipuzcoa", "gipuzkoa"],
  ["vizcaya", "bizkaia"],
  ["alava", "alava"],
  ["araba", "alava"],
  ["baleares", "islas baleares"],
  ["illes balears", "islas baleares"],
  ["rioja", "la rioja"],
  ["la rioja", "la rioja"],
  ["lerida", "lleida"],
  ["gerona", "girona"]
]);

function resolveProvinceSlugFromCSVName(csvNameRaw) {
  const n = normalize(csvNameRaw);

  // 1) match directo con tus provincias.json
  if (provNameToSlug.has(n)) return provNameToSlug.get(n);

  // 2) alias -> nombre “oficial” -> slug
  if (CSV_PROV_ALIASES.has(n)) {
    const officialName = CSV_PROV_ALIASES.get(n);
    const officialNorm = normalize(officialName);
    if (provNameToSlug.has(officialNorm)) return provNameToSlug.get(officialNorm);
  }

  // 3) no encontrado
  return null;
}

const raw = fs.readFileSync(csvPath, "utf8").replace(/^\uFEFF/, "");
const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
const delimiter = detectDelimiter(lines[0]);

const header = parseCSVLine(lines[0], delimiter).map((h) => h.trim().toUpperCase());
const idxNombre = header.findIndex((h) => h === "NOMBRE" || h === "MUNICIPIO");
const idxProv = header.findIndex((h) => h === "PROVINCIA");

if (idxNombre === -1 || idxProv === -1) {
  console.error("Header no válido. Columnas encontradas:", header);
  process.exit(1);
}

// Prepara objeto con TODAS las provincias (52) aunque alguna salga vacía
const grouped = {};
for (const p of provincias) grouped[p.slug] = [];

const unknownProvinces = new Set();

for (let i = 1; i < lines.length; i++) {
  const cols = parseCSVLine(lines[i], delimiter);
  if (cols.length <= Math.max(idxNombre, idxProv)) continue;

  const municipio = (cols[idxNombre] || "").trim();
  const provRaw = (cols[idxProv] || "").trim();
  if (!municipio || !provRaw) continue;

  const slug = resolveProvinceSlugFromCSVName(provRaw);
  if (!slug) {
    unknownProvinces.add(provRaw);
    continue;
  }

  grouped[slug].push(municipio);
}

// limpiar duplicados y ordenar
for (const slug of Object.keys(grouped)) {
  grouped[slug] = Array.from(new Set(grouped[slug])).sort((a, b) =>
    a.localeCompare(b, "es")
  );
}

fs.writeFileSync(outPath, JSON.stringify(grouped, null, 2), "utf8");

console.log("OK ->", outPath);
console.log("Delimitador:", delimiter);
console.log("Provincias en provincias.json:", provincias.length);
console.log("Provincias en output:", Object.keys(grouped).length);
console.log("Provincias no reconocidas desde CSV:", unknownProvinces.size);

if (unknownProvinces.size) {
  console.log("Listado provincias no reconocidas (raw):");
  console.log(Array.from(unknownProvinces).sort((a, b) => a.localeCompare(b, "es")).join(" | "));
}
