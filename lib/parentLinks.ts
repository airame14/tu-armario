import catalog from "@/data/parent-catalog.json";

type ParentService = {
  slug: string;
  nombre: string;
  tags: string[];
};

type Parent = {
  id: string;
  brand: string;
  domain: string;
  servicios: ParentService[];
};

export type ParentLink = {
  parentId: string;
  parentBrand: string;
  href: string;
  anchor: string;
  description: string;
  servicioNombre: string;
  provinciaNombre: string;
};

const PARENTS = catalog.parents as Parent[];

const PROVINCIA_NOMBRE: Record<string, string> = Object.fromEntries(
  (catalog.provincias as { slug: string; nombre: string }[]).map((p) => [p.slug, p.nombre])
);

function hash(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h * 31 + input.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function score(parentTags: string[], satelliteTags: string[]): number {
  let s = 0;
  for (const t of satelliteTags) if (parentTags.includes(t)) s += 2;
  for (const t of parentTags) if (satelliteTags.includes(t)) s += 1;
  return s;
}

type AnchorTemplate = (ctx: {
  servicio: string;
  servicioLower: string;
  provincia: string;
  brand: string;
  domain: string;
}) => string;

const ANCHOR_TEMPLATES: AnchorTemplate[] = [
  ({ servicio, provincia }) => `${servicio} en ${provincia}`,
  ({ servicio, provincia }) => `presupuesto de ${servicio.toLowerCase()} en ${provincia}`,
  ({ servicio }) => `empresas de ${servicio.toLowerCase()}`,
  ({ brand }) => brand,
  ({ servicioLower, provincia }) => `${servicioLower} ${provincia}`,
  ({ servicio }) => servicio.toLowerCase(),
  ({ domain }) => domain.replace(/^https?:\/\//, "").replace(/\/$/, ""),
  ({ brand, provincia }) => `${brand} – ${provincia}`,
  ({ servicio, provincia }) => `profesionales de ${servicio.toLowerCase()} en ${provincia}`,
  ({ servicio }) => `guía de ${servicio.toLowerCase()}`
];

const DESCRIPTION_TEMPLATES: Array<(servicio: string, provincia: string, brand: string) => string> = [
  (s, p) => `Compara presupuestos de ${s.toLowerCase()} en ${p} sin compromiso.`,
  (s, p) => `Empresas verificadas para ${s.toLowerCase()} en ${p}.`,
  (s, p, b) => `${b}: especialistas en ${s.toLowerCase()} en ${p}.`,
  (s) => `Solicita presupuesto de ${s.toLowerCase()} con garantía profesional.`,
  (s, p) => `Guía y acceso a profesionales de ${s.toLowerCase()} en ${p}.`,
  (s, p) => `${s} en ${p} con presupuesto cerrado y sin sorpresas.`
];

/**
 * Devuelve N enlaces relevantes a páginas profundas de webs padre,
 * variando anchor y padre por (provinciaSlug, satelliteServiceSlug, satelliteTags).
 *
 * @param provinciaSlug   Slug de provincia del satélite (mismo set que padres).
 * @param satelliteTags   Tags del servicio del satélite (de servicios.json).
 * @param contextSeed     Cadena adicional para variar (p.ej. slug del servicio).
 * @param count           Cuántos enlaces devolver.
 */
export function getParentLinks(
  provinciaSlug: string,
  satelliteTags: string[],
  contextSeed: string,
  count: number
): ParentLink[] {
  const provinciaNombre = PROVINCIA_NOMBRE[provinciaSlug] || provinciaSlug;
  const seed = hash(`${provinciaSlug}|${contextSeed}|${satelliteTags.join(",")}`);

  // Score every parent×service combo.
  const candidates: Array<{
    parent: Parent;
    servicio: ParentService;
    s: number;
  }> = [];

  for (const parent of PARENTS) {
    for (const servicio of parent.servicios) {
      const s = score(servicio.tags, satelliteTags);
      if (s > 0) candidates.push({ parent, servicio, s });
    }
  }

  // Sort by score desc, then deterministic shuffle by seed within same score buckets.
  candidates.sort((a, b) => {
    if (b.s !== a.s) return b.s - a.s;
    const ha = hash(`${seed}|${a.parent.id}|${a.servicio.slug}`);
    const hb = hash(`${seed}|${b.parent.id}|${b.servicio.slug}`);
    return ha - hb;
  });

  // Pick top, ensuring we don't repeat the same parent twice in a row when possible.
  const picked: typeof candidates = [];
  const seen = new Set<string>();
  for (const c of candidates) {
    if (picked.length >= count) break;
    const last = picked[picked.length - 1];
    // Prefer parent rotation: skip if same parent as previous and we still have alternatives.
    if (
      last &&
      last.parent.id === c.parent.id &&
      candidates.some(
        (x) =>
          x.parent.id !== c.parent.id &&
          !seen.has(`${x.parent.id}/${x.servicio.slug}`) &&
          !picked.includes(x)
      )
    ) {
      continue;
    }
    if (seen.has(`${c.parent.id}/${c.servicio.slug}`)) continue;
    picked.push(c);
    seen.add(`${c.parent.id}/${c.servicio.slug}`);
  }

  // Fill if we didn't reach count.
  if (picked.length < count) {
    for (const c of candidates) {
      if (picked.length >= count) break;
      if (seen.has(`${c.parent.id}/${c.servicio.slug}`)) continue;
      picked.push(c);
      seen.add(`${c.parent.id}/${c.servicio.slug}`);
    }
  }

  return picked.map((c, i) => {
    const ctx = {
      servicio: c.servicio.nombre,
      servicioLower: c.servicio.nombre.toLowerCase(),
      provincia: provinciaNombre,
      brand: c.parent.brand,
      domain: c.parent.domain
    };
    const anchorIdx = (seed + i * 7) % ANCHOR_TEMPLATES.length;
    const descIdx = (seed + i * 11) % DESCRIPTION_TEMPLATES.length;
    return {
      parentId: c.parent.id,
      parentBrand: c.parent.brand,
      href: `${c.parent.domain}/${provinciaSlug}/${c.servicio.slug}`,
      anchor: ANCHOR_TEMPLATES[anchorIdx](ctx),
      description: DESCRIPTION_TEMPLATES[descIdx](c.servicio.nombre, provinciaNombre, c.parent.brand),
      servicioNombre: c.servicio.nombre,
      provinciaNombre
    };
  });
}

/**
 * Enlaces "genéricos" sin provincia, apuntando a homepages de padres
 * relevantes para los tags dados. Útil para Footer y página /colaboradores.
 */
export function getGenericParentLinks(satelliteTags: string[], count: number): ParentLink[] {
  const candidates = PARENTS.map((parent) => {
    const totalScore = parent.servicios.reduce((sum, s) => sum + score(s.tags, satelliteTags), 0);
    return { parent, totalScore };
  })
    .filter((c) => c.totalScore > 0)
    .sort((a, b) => b.totalScore - a.totalScore);

  return candidates.slice(0, count).map((c) => ({
    parentId: c.parent.id,
    parentBrand: c.parent.brand,
    href: c.parent.domain,
    anchor: c.parent.brand,
    description: `Especialistas: ${c.parent.brand}.`,
    servicioNombre: "",
    provinciaNombre: ""
  }));
}
