import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import provincias from "@/data/provincias.json";
import servicios from "@/data/servicios.json";
import municipiosPorProvincia from "@/data/municipios_por_provincia.json";
import site from "@/data/site.json";
import Carousel from "../components/Carousel";
import { getParentLinks } from "@/lib/parentLinks";

type Params = { provincia: string };

const c = (site as any).copy;
const BASE_URL = site.domain.startsWith("http") ? site.domain : `https://${site.domain}`;
const SITE_NAME = site.brand;
const YEAR = (site as any)?.year || "2026";
const SATELITE_TAGS = (site as any).satelliteTags || [];

export function generateStaticParams() {
  return provincias.map((p) => ({ provincia: p.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<Params> | Params;
}) {
  const resolved = (params as any)?.then ? await (params as Promise<Params>) : (params as Params);
  const slug = decodeURIComponent(resolved.provincia).trim().toLowerCase();
  const p = provincias.find((x) => x.slug === slug);
  if (!p) return {};

  const title = `${c.provinciaH1Lead} ${p.nombre} | Presupuesto GRATIS (${YEAR})`;
  const description = `${SITE_NAME} en ${p.nombre}. ${c.provinciaDescription}`;
  const canonical = `${BASE_URL}/${p.slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: { title, description, url: canonical, siteName: SITE_NAME, type: "website", locale: "es_ES" },
    twitter: { card: "summary_large_image", title, description }
  };
}

const defaultIcon = (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

export default async function ProvinciaPage({
  params
}: {
  params: Promise<Params> | Params;
}) {
  const resolved = (params as any)?.then ? await (params as Promise<Params>) : (params as Params);
  const slug = decodeURIComponent(resolved.provincia).trim().toLowerCase();
  const p = provincias.find((x) => x.slug === slug);
  if (!p) notFound();

  const municipios = (municipiosPorProvincia as any)[p.slug] || [];
  const parentLinks = getParentLinks(p.slug, SATELITE_TAGS, `provincia:${p.slug}`, 2);

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
                <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                {c.provinciaEyebrow} en {p.nombre}
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6">
                {c.provinciaH1Lead}{" "}
                <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                  {p.nombre}
                </span>
              </h1>

              <p className="text-lg text-slate-300 mb-8 max-w-xl">{c.provinciaDescription}</p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#servicios" className="cta-primary inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-semibold text-white">
                  Ver servicios disponibles
                  <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-3xl blur-2xl"></div>
              <div className="relative overflow-hidden rounded-2xl border border-slate-700 shadow-2xl">
                <Image
                  src={c.carouselSlides[1]?.src || "/hero-province.webp"}
                  alt={`${SITE_NAME} en ${p.nombre}`}
                  width={600}
                  height={500}
                  className="object-cover w-full h-[500px]"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="servicios" className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Servicios disponibles en {p.nombre}
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Selecciona el servicio que necesitas para ver detalles y solicitar presupuesto.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {servicios.map((s: any) => (
              <Link
                key={s.slug}
                href={`/${p.slug}/${s.slug}`}
                className="card-hover group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 group-hover:bg-amber-500 group-hover:text-white transition-colors mb-4">
                  {defaultIcon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors">{s.nombre}</h3>
                <p className="mt-2 text-slate-600 line-clamp-2">{s.intro}</p>
                <div className="mt-4 flex items-center text-sm font-medium text-amber-600">
                  Ver detalles <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Carousel slides={c.carouselSlides} title="Trabajos en la provincia" subtitle="Calidad demostrada" />

      {parentLinks.length > 0 && (
        <section className="py-20 bg-white border-t border-slate-200">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12">
              <span className="inline-block rounded-full bg-amber-500/10 px-4 py-1 text-sm font-medium text-amber-600 mb-4">
                {c.complementaryProvinciaEyebrow} en {p.nombre}
              </span>
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">{c.complementaryProvinciaTitle}</h2>
              <p className="mt-4 text-lg text-slate-600 max-w-3xl">{c.complementaryProvinciaDescription}</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {parentLinks.map((link) => (
                <a
                  key={`${link.parentId}-${link.servicioNombre}`}
                  href={link.href}
                  target="_blank"
                  rel="noopener"
                  className="card-hover group rounded-2xl border border-slate-200 bg-slate-50 p-8 hover:border-amber-400"
                >
                  <div className="text-sm font-semibold text-amber-600 mb-2">{link.parentBrand}</div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-700 transition-colors">{link.anchor}</h3>
                  <p className="mt-3 text-slate-600">{link.description}</p>
                  <div className="mt-4 inline-flex items-center text-sm font-medium text-amber-600">
                    Ir a la web <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 bg-slate-900">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block rounded-full bg-amber-500/10 px-4 py-1 text-sm font-medium text-amber-400 mb-4">Guía Experta</span>
              <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6">{c.provinciaTipsTitle} en {p.nombre}</h2>
              <p className="text-slate-400 text-lg mb-8">{c.provinciaTipsLead}</p>

              <div className="space-y-4">
                {c.provinciaTips.map((tip: any, i: number) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500 text-white font-bold">{i + 1}</div>
                    <div>
                      <h3 className="font-semibold text-white">{tip.title}</h3>
                      <p className="text-sm text-slate-400">{tip.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-amber-500/20 rounded-full blur-3xl"></div>
              <Image
                src={c.carouselSlides[2]?.src || "/hero-service.webp"}
                alt="Asesoramiento profesional"
                width={600}
                height={600}
                className="relative rounded-2xl shadow-2xl border border-slate-700"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-6">
          <div className="overflow-hidden bg-white p-8 sm:p-12 shadow-sm rounded-3xl border border-slate-200">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Municipios de {p.nombre}</h2>
                <p className="mt-2 text-slate-600">Damos servicio en todas las localidades de la provincia.</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>

            {municipios.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {municipios.map((m: string) => (
                  <div
                    key={m}
                    className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-600 hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700 transition-colors cursor-default"
                  >
                    <svg className="h-2.5 w-2.5 text-amber-400/50" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="truncate" title={m}>{m}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">Contacta para verificar disponibilidad en tu municipio.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
