import Image from "next/image";
import { notFound } from "next/navigation";
import provincias from "@/data/provincias.json";
import servicios from "@/data/servicios.json";
import site from "@/data/site.json";
import { buildAffiliateUrl } from "@/lib/affiliate";
import municipiosPorProvincia from "@/data/municipios_por_provincia.json";
import Carousel from "../../components/Carousel";
import { getParentLinks } from "@/lib/parentLinks";

type Params = { provincia: string; servicio: string };

const c = (site as any).copy;
const BASE_URL = site.domain.startsWith("http") ? site.domain : `https://${site.domain}`;
const SITE_NAME = site.brand;
const YEAR = (site as any)?.year || "2026";
const SATELITE_TAGS = (site as any).satelliteTags || [];

export function generateStaticParams() {
  const params: Params[] = [];
  for (const p of provincias) {
    for (const s of servicios as any[]) {
      params.push({ provincia: p.slug, servicio: s.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params
}: {
  params: Promise<Params> | Params;
}) {
  const resolved = (params as any)?.then ? await (params as Promise<Params>) : (params as Params);
  const provinciaSlug = decodeURIComponent(resolved.provincia).trim().toLowerCase();
  const servicioSlug = decodeURIComponent(resolved.servicio).trim().toLowerCase();

  const p = provincias.find((x) => x.slug === provinciaSlug);
  const s = (servicios as any[]).find((x: any) => x.slug === servicioSlug);
  if (!p || !s) return {};

  const title = `${s.nombre} en ${p.nombre} | Precio + Presupuesto GRATIS (${YEAR})`;
  const description = `${s.nombre} en ${p.nombre}: información, plazos, normativa y acceso a profesionales verificados.`;
  const canonical = `${BASE_URL}/${p.slug}/${s.slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: { title, description, url: canonical, siteName: SITE_NAME, type: "article", locale: "es_ES" },
    twitter: { card: "summary_large_image", title, description }
  };
}

export default async function ServicioProvinciaPage({
  params
}: {
  params: Promise<Params> | Params;
}) {
  const resolved = (params as any)?.then ? await (params as Promise<Params>) : (params as Params);
  const provinciaSlug = decodeURIComponent(resolved.provincia).trim().toLowerCase();
  const servicioSlug = decodeURIComponent(resolved.servicio).trim().toLowerCase();

  const p = provincias.find((x) => x.slug === provinciaSlug);
  const s = (servicios as any[]).find((x: any) => x.slug === servicioSlug);
  if (!p || !s) notFound();

  const municipios = (municipiosPorProvincia as any)[p.slug] || [];
  const affUrl = buildAffiliateUrl({ provincia: p.slug, servicio: s.slug });
  const secondaryCtaText =
    (site as any)?.ctaAltText?.trim?.() ? (site as any).ctaAltText : s.ctaLabel;

  const tags: string[] = (s.tags && s.tags.length > 0) ? s.tags : SATELITE_TAGS;
  const deepLinks = getParentLinks(p.slug, tags, `servicio:${s.slug}`, 3);
  const inlineLink = deepLinks[0];
  const ctaLink = deepLinks[1];
  const sideLink = deepLinks[2];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `¿Cuánto cuesta ${s.nombre.toLowerCase()} en ${p.nombre}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "El precio depende del alcance, materiales y condiciones del inmueble. Lo recomendable es comparar al menos 3 presupuestos detallados."
        }
      },
      {
        "@type": "Question",
        name: "¿Qué documentación debo recibir?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Cualquier profesional debe entregar presupuesto detallado, factura final y, cuando proceda, certificado oficial firmado del trabajo realizado."
        }
      },
      {
        "@type": "Question",
        name: "¿Cuántos presupuestos debería pedir?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Lo ideal es pedir al menos 3 presupuestos para comparar alcance, materiales, mano de obra, plazos y garantía."
        }
      }
    ]
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-sm text-amber-400 mb-6">
                <span className="font-semibold">{p.nombre}</span>
                <span className="text-slate-500">|</span>
                <span>{s.nombre}</span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6">
                {s.nombre} en{" "}
                <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">{p.nombre}</span>
              </h1>

              <p className="text-lg text-slate-300 mb-8 max-w-xl">
                {s.intro}
                {inlineLink && (
                  <>
                    {" "}Si tu obra incluye además trabajos en el inmueble, puedes consultar{" "}
                    <a
                      href={inlineLink.href}
                      target="_blank"
                      rel="noopener"
                      className="text-amber-400 hover:text-amber-300 underline underline-offset-4"
                    >
                      {inlineLink.anchor}
                    </a>
                    .
                  </>
                )}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href={affUrl} target="_blank" rel="noopener noreferrer" className="cta-primary inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-semibold text-white">
                  {site.ctaText}
                  <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
                <a href={affUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-xl border border-slate-600 bg-slate-800/50 px-8 py-4 text-base font-medium text-white hover:bg-slate-700 transition-colors">
                  {secondaryCtaText}
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Sin compromiso
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Profesionales verificados
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-3xl blur-2xl"></div>
              <div className="relative overflow-hidden rounded-2xl border border-slate-700 shadow-2xl">
                <Image src={c.carouselSlides[2]?.src || "/hero-service.webp"} alt={`${s.nombre} en ${p.nombre}`} width={600} height={500} className="object-cover w-full h-[500px]" priority />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">{c.servicioBeneficiosTitle}</h2>
            <p className="mt-4 text-slate-600">{c.servicioBeneficiosLead}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(s.beneficios as string[]).map((b: string) => (
              <div key={b} className="card-hover rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 mb-4">
                  <svg className="h-5 w-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900">{b}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Carousel slides={c.carouselSlides} title="Ejemplos de trabajos" subtitle="Resultados reales" />

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">{c.servicioPasosTitle}</h2>
              <div className="space-y-6">
                {c.servicioPasos.map((step: string, i: number) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white font-bold text-sm">{i + 1}</div>
                    <p className="text-slate-700 font-medium pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-amber-50 border border-amber-100 p-8">
              <h3 className="text-xl font-bold text-amber-900 mb-6">{c.servicioChecklistTitle}</h3>
              <ul className="space-y-4">
                {c.servicioChecklist.map((item: string, i: number) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white">
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
              {sideLink && (
                <p className="mt-6 text-sm text-slate-600 border-t border-amber-200 pt-6">
                  ¿Vas a hacer también obras en {p.nombre}? Echa un vistazo a{" "}
                  <a href={sideLink.href} target="_blank" rel="noopener" className="font-medium text-amber-700 hover:text-amber-900 underline underline-offset-2">
                    {sideLink.anchor}
                  </a>
                  .
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">¿Preparado para empezar?</h2>
          <p className="mt-4 text-lg text-slate-400">{c.servicioCtaSubtitle}</p>
          <a
            href={affUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 px-10 py-4 text-lg font-bold text-white shadow-lg hover:from-amber-600 hover:to-yellow-700 transition-all transform hover:scale-105"
          >
            {site.ctaText}
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          {ctaLink && (
            <p className="mt-8 text-sm text-slate-500">
              También puede interesarte:{" "}
              <a href={ctaLink.href} target="_blank" rel="noopener" className="text-amber-400 hover:text-amber-300 underline underline-offset-4">
                {ctaLink.anchor}
              </a>
            </p>
          )}
        </div>
      </section>

      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Cobertura completa en {p.nombre}</h3>
            <p className="text-slate-600 max-w-3xl mx-auto">
              Cubrimos {s.nombre.toLowerCase()} en todas las localidades de la provincia.
            </p>
          </div>

          {municipios.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {municipios.map((m: string) => (
                <div key={m} className="flex items-center gap-2 text-sm text-slate-600 bg-white px-3 py-2 rounded-lg border border-slate-200 hover:border-amber-400 hover:shadow-sm transition-all">
                  <svg className="h-3 w-3 text-amber-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="truncate" title={m}>{m}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 text-sm text-center">Consulta cobertura completa al solicitar presupuesto.</p>
          )}
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </main>
  );
}
