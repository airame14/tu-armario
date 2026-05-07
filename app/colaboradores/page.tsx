import site from "@/data/site.json";
import { getGenericParentLinks } from "@/lib/parentLinks";

const c = (site as any).copy;
const SATELITE_TAGS = (site as any).satelliteTags || [];

export const metadata = {
  title: "Colabora con Nosotros",
  description: c.colaboradoresHeroDescription
};

export default function ColaboradoresPage() {
  const partnerSites = getGenericParentLinks(SATELITE_TAGS, 6);

  return (
    <main className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-slate-900 py-20 sm:py-32">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/hero-service.webp')] bg-cover bg-center mix-blend-overlay"></div>
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">{c.colaboradoresHeroTitle}</h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">{c.colaboradoresHeroDescription}</p>
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-amber-600">Colaboración Profesional</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Crecemos juntos</p>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              No somos un directorio. Operamos como central de proyectos, asignando trabajos únicamente a colaboradores verificados.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {c.colaboradoresFeatures.map((feature: any) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-slate-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-600">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-slate-600">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {partnerSites.length > 0 && (
        <section className="bg-slate-50 py-20 border-y border-slate-200">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center mb-12">
              <h2 className="text-base font-semibold leading-7 text-amber-600">Empresas colaboradoras</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Otras webs especializadas que recomendamos
              </p>
              <p className="mt-4 text-lg text-slate-600">
                Trabajamos junto a otros operadores especializados en obra y reformas para ofrecer servicio completo al cliente final.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {partnerSites.map((s) => (
                <a
                  key={s.parentId}
                  href={s.href}
                  target="_blank"
                  rel="noopener"
                  className="card-hover group block rounded-2xl border border-slate-200 bg-white p-6"
                >
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">{s.parentBrand}</h3>
                  <p className="mt-2 text-sm text-slate-600">{s.description}</p>
                  <span className="mt-3 inline-block text-xs text-slate-500 truncate">
                    {s.href.replace(/^https?:\/\//, "")}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-white py-24 sm:py-32" id="contacto-profesional">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-xl lg:max-w-4xl">
            <div className="bg-slate-50 p-8 sm:p-12 shadow-lg rounded-3xl border border-slate-200">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">Solicita acceso profesional</h2>
                <p className="mt-4 text-slate-600">Déjanos tus datos y nos pondremos en contacto.</p>
              </div>

              <form action={site.professionalFormUrl} method="POST" className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                <input type="text" name="_gotcha" style={{ display: "none" }} />

                <div>
                  <label htmlFor="company" className="block text-sm font-semibold leading-6 text-slate-900">Empresa / Autónomo</label>
                  <div className="mt-2.5">
                    <input type="text" name="company" id="company" required className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
                <div>
                  <label htmlFor="service-type" className="block text-sm font-semibold leading-6 text-slate-900">Categoría profesional</label>
                  <div className="mt-2.5">
                    <select id="service-type" name="service-type" className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6">
                      {(c.colaboradoresFormCategories as string[]).map((cat) => (
                        <option key={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold leading-6 text-slate-900">Email profesional</label>
                  <div className="mt-2.5">
                    <input type="email" name="email" id="email" required className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-slate-900">Teléfono</label>
                  <div className="mt-2.5">
                    <input type="tel" name="phone" id="phone" required className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="province" className="block text-sm font-semibold leading-6 text-slate-900">Ámbito (provincia)</label>
                  <div className="mt-2.5">
                    <input type="text" name="province" id="province" required className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6" placeholder="Ej. Madrid, Barcelona..." />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block text-sm font-semibold leading-6 text-slate-900">Comentarios</label>
                  <div className="mt-2.5">
                    <textarea name="message" id="message" rows={4} className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"></textarea>
                  </div>
                </div>
                <div className="sm:col-span-2 mt-4">
                  <button type="submit" className="block w-full rounded-md bg-slate-900 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition-colors">
                    Enviar solicitud
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
