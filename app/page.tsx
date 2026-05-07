import Link from "next/link";
import Image from "next/image";
import provincias from "@/data/provincias.json";
import site from "@/data/site.json";
import Carousel from "./components/Carousel";
import { getGenericParentLinks } from "@/lib/parentLinks";

const c = (site as any).copy;

export const metadata = {
  title: c.homeMetaTitle,
  description: c.homeMetaDescription,
  alternates: {
    canonical: site.domain.startsWith("http") ? site.domain : `https://${site.domain}`
  }
};

export default function Home() {
  const genericLinks = getGenericParentLinks((site as any).satelliteTags || [], 3);

  return (
    <main className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        </div>

        <div className="relative grid lg:grid-cols-2 min-h-[600px]">
          <div className="flex flex-col justify-center px-6 py-16 lg:px-12 xl:px-24 z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-sm text-amber-400 mb-6 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              {c.heroEyebrow}
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6">
              {c.heroH1Lead} <br />
              <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">{c.heroH1Highlight}</span>
            </h1>

            <p className="text-lg text-slate-300 mb-8 max-w-xl">{c.heroDescription}</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={site.affiliateBaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-primary inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-semibold text-white shadow-lg shadow-amber-500/20"
              >
                {site.ctaText}
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <Link
                href="/#como-funciona"
                className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-800/50 px-8 py-4 text-base font-medium text-white hover:bg-slate-800 transition-colors"
              >
                Cómo funciona
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-6 text-sm text-slate-400">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-slate-900 bg-slate-700"></div>
                ))}
              </div>
              <div>
                <span className="block text-white font-bold">4.9/5</span>
                <span className="text-xs">Valoración clientes</span>
              </div>
            </div>
          </div>

          <div className="relative h-[400px] lg:h-auto w-full lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <Image
              src={c.carouselSlides[1]?.src || "/hero-province.webp"}
              alt={c.heroH1Lead}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent lg:bg-gradient-to-r lg:from-slate-900 lg:via-transparent"></div>
          </div>
        </div>
      </section>

      <section className="bg-amber-500 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <dl className="grid grid-cols-1 gap-y-8 text-center sm:grid-cols-3">
            {c.stats.map((s: any) => (
              <div key={s.label}>
                <dt className="text-base leading-7 text-amber-100">{s.label}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Carousel slides={c.carouselSlides} title="Trabajos Recientes" subtitle="Calidad demostrada" />

      <section id="como-funciona" className="py-24 sm:py-32 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-amber-600">Proceso simplificado</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{c.stepsTitle}</p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {c.steps.map((step: any) => (
                <div key={step.title} className="flex flex-col items-center text-center bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <dt className="flex flex-col items-center gap-y-4 text-xl font-bold leading-7 text-slate-900">
                    {step.title}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                    <p className="flex-auto">{step.desc}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section id="ventajas" className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-amber-600">Por qué elegirnos</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{c.ventajasTitle}</p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <div className="grid grid-cols-1 gap-y-8 gap-x-8 sm:grid-cols-2">
              {c.ventajas.map((item: string) => (
                <div key={item} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                    <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-lg text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {genericLinks.length > 0 && (
        <section className="py-20 bg-slate-50 border-y border-slate-200">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-2xl lg:text-center mb-12">
              <h2 className="text-base font-semibold leading-7 text-amber-600">Servicios complementarios</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{c.complementaryHomeHeading}</p>
              <p className="mt-4 text-lg text-slate-600">{c.complementaryHomeDescription}</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {genericLinks.map((link) => (
                <a
                  key={link.parentId}
                  href={link.href}
                  target="_blank"
                  rel="noopener"
                  className="card-hover group rounded-2xl border border-slate-200 bg-white p-6"
                >
                  <h3 className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors">{link.parentBrand}</h3>
                  <p className="mt-2 text-sm text-slate-600">{link.description}</p>
                  <div className="mt-4 inline-flex items-center text-sm font-medium text-amber-600">
                    Ver web <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-24 bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Lo que dicen los clientes</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {c.testimonials.map((t: any, i: number) => (
              <div key={i} className="bg-slate-800 p-8 rounded-2xl">
                <div className="flex justify-center mb-4 text-amber-400">★★★★★</div>
                <p className="italic mb-6 text-slate-300">&ldquo;{t.quote}&rdquo;</p>
                <p className="font-bold text-white">{t.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="provincias" className="py-24 sm:py-32 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Cobertura nacional</h2>
            <p className="mt-4 text-lg text-slate-600">Encuentra profesionales en tu provincia.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {provincias.map((provincia) => (
              <Link
                key={provincia.slug}
                href={`/${provincia.slug}`}
                className="group relative flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 hover:border-amber-400 hover:shadow-md transition-all"
              >
                {provincia.nombre}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
