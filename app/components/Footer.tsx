import Link from "next/link";
import Image from "next/image";
import site from "@/data/site.json";
import servicios from "@/data/servicios.json";
import { getGenericParentLinks } from "@/lib/parentLinks";

const c = (site as any).copy;
const SATELITE_TAGS = (site as any).satelliteTags || [];

const currentYear = new Date().getFullYear();

const legalLinks = [
  { name: "Política de Privacidad", href: "/privacidad" },
  { name: "Términos y Condiciones", href: "/terminos" },
  { name: "Política de Cookies", href: "/cookies" },
  { name: "Aviso Legal", href: "/aviso-legal" }
];

// Servicios populares: primeros 5 de servicios.json apuntando a /madrid/<slug>.
const serviceLinks = (servicios as any[]).slice(0, 5).map((s: any) => ({
  name: s.nombre,
  href: `/madrid/${s.slug}`
}));

export default function Footer() {
  const otherSites = getGenericParentLinks(SATELITE_TAGS, 5);

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logo.webp" alt={site.brand} width={48} height={48} className="rounded-xl" />
              <span className="font-bold text-white text-xl">{site.brand}</span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-slate-400">{c.footerTagline}</p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 rounded-full bg-slate-800 px-3 py-1.5 text-xs">
                <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{c.footerBadge}</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-slate-800 px-3 py-1.5 text-xs">
                <svg className="h-4 w-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>100% gratuito</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white">Servicios populares</h3>
            <ul className="mt-4 space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white">Otros servicios</h3>
            <ul className="mt-4 space-y-3">
              {otherSites.map((link) => (
                <li key={link.parentId}>
                  <a href={link.href} target="_blank" rel="noopener" className="text-sm hover:text-white transition-colors">
                    {link.parentBrand}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white">Legal</h3>
            <ul className="mt-4 space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="text-center md:text-left">
              <p className="text-sm text-slate-400">© {currentYear} {site.brand}. Todos los derechos reservados.</p>
              <p className="mt-1 text-xs text-slate-500">Operado por <strong className="text-slate-400">[NOMBRE DE LA EMPRESA]</strong></p>
              <p className="text-xs text-slate-500">[DIRECCIÓN DE LA EMPRESA]</p>
            </div>

            <div className="flex items-center gap-4">
              <a href={site.affiliateBaseUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-600 transition-colors">
                {site.ctaText}
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
