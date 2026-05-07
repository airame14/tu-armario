# tu-armario.es

Web SEO de captación de leads para gasistas autorizados en España. Stack: Next.js 16 (App Router), React 19, Tailwind CSS 4, TypeScript.

## Desarrollo

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # build de producción
npm start            # servir build local
```

## Estructura

```
app/
  page.tsx                          → Home
  [provincia]/page.tsx              → Landing por provincia (50 provincias)
  [provincia]/[servicio]/page.tsx   → Servicio + provincia (6 servicios × 50 = 300 páginas)
  components/                       → Header, Footer, Carousel
  colaboradores/                    → Alta de profesionales
  privacidad/, terminos/, cookies/, aviso-legal/
  robots.ts, sitemap.ts
data/
  site.json                         → Marca, dominio, CTA, URL afiliación
  servicios.json                    → 6 servicios de gas
  provincias.json                   → 50 provincias españolas
  municipios_por_provincia.json     → Municipios para SEO long-tail
  parent-catalog.json               → Catálogo de webs relacionadas (ver "Enlaces salientes")
lib/
  affiliate.ts                      → URL de afiliación con UTMs
  parentLinks.ts                    → Selección de enlaces a webs relacionadas
public/                             → Imágenes (logo.webp, hero, carrusel)
```

## Configuración rápida

Toda la configuración del sitio vive en `data/site.json`:

```json
{
  "brand": "TuArmario",
  "domain": "https://tu-armario.es",
  "ctaText": "Solicitar presupuesto GRATIS",
  "affiliateBaseUrl": "https://tidd.ly/4wbZ9Qh",
  "professionalFormUrl": "https://formspree.io/f/...",
  "seo": { "homeTitle": "...", "homeDescription": "..." },
  "utm": { "source": "tu-armario", "medium": "seo", "campaign": "provincias" }
}
```

Cambios de marca / dominio / enlace de afiliación → solo aquí.

## Servicios

Los 6 servicios viven en `data/servicios.json`. Para añadir o modificar uno:

```json
{
  "slug": "nuevo-servicio",
  "nombre": "Nombre visible",
  "intro": "Descripción para hero y meta description.",
  "beneficios": ["...", "...", "..."],
  "tags": ["gas", "..."],
  "ctaLabel": "Texto del CTA secundario"
}
```

Tras añadir un servicio, registra su icono en el mapa `serviceIcons` de `app/[provincia]/page.tsx` (opcional; sin icono renderiza un genérico).

## Enlaces salientes

Esta web enlaza a webs relacionadas listadas en `data/parent-catalog.json`. La función `lib/parentLinks.ts` selecciona enlaces relevantes en función de los `tags` del servicio activo y los inyecta en:

- Home → sección "Servicios complementarios" + Footer
- Página de provincia → sección "Si tu obra va más allá del gas"
- Página de servicio × provincia → párrafo intro + checklist + CTA banner
- Página `/colaboradores` → bloque "Empresas colaboradoras"

Para quitar o modificar estos enlaces, edita `data/parent-catalog.json` (o vacía la lista de `parents`).

## Deploy a Vercel

1. Crear proyecto en Vercel apuntando a este repo.
2. Conectar el dominio `tu-armario.es` desde el panel de Vercel.
3. Cada push a `main` despliega automáticamente.

No necesita variables de entorno. Es un build estático puro (375 páginas pre-renderizadas).

## TODO al recibir el proyecto

- [ ] Reemplazar imágenes en `public/` (`logo.webp`, `building-hero.webp`, etc.) por activos propios.
- [ ] Verificar el `professionalFormUrl` apunta a tu propio Formspree.
- [ ] Confirmar `affiliateBaseUrl` (URL de Habitissimo o el partner que uses).
- [ ] Conectar Google Analytics / GSC.
- [ ] Dar de alta el sitemap (`/sitemap.xml`) en Google Search Console.
