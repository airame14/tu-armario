import type { Metadata } from "next";
import Link from "next/link";
import site from "@/data/site.json";

export const metadata: Metadata = {
    title: "Términos y Condiciones",
    description: "Términos y condiciones de uso de " + site.brand,
};

export default function TerminosPage() {
    return (
        <main className="min-h-screen bg-slate-50 py-16">
            <div className="mx-auto max-w-3xl px-6">
                <nav className="mb-8 text-sm text-slate-500">
                    <Link href="/" className="hover:text-slate-900">Inicio</Link>
                    {" / "}
                    <span className="text-slate-900">Términos y Condiciones</span>
                </nav>

                <h1 className="text-3xl font-bold text-slate-900">Términos y Condiciones</h1>
                <p className="mt-4 text-slate-600">Última actualización: Enero 2026</p>

                <div className="mt-8 prose prose-slate max-w-none">
                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">1. Identificación del titular</h2>
                        <ul className="list-none space-y-2 text-slate-600 bg-white rounded-xl p-6 border border-slate-200">
                            <li><strong>Entidad:</strong> [NOMBRE DE LA EMPRESA]</li>
                            <li><strong>Dirección:</strong> [DIRECCIÓN DE LA EMPRESA]</li>
                            <li><strong>Sitio web:</strong> {site.domain}</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">2. Objeto y ámbito de aplicación</h2>
                        <p className="text-slate-600 mb-4">
                            Estos términos regulan el acceso y uso del sitio web {site.brand}, cuyo objetivo es proporcionar
                            información sobre servicios de rehabilitación de edificios y facilitar la conexión entre usuarios
                            y profesionales del sector.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">3. Servicios ofrecidos</h2>
                        <p className="text-slate-600 mb-4">
                            Este sitio web ofrece:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-slate-600">
                            <li>Información orientativa sobre servicios de rehabilitación de edificios</li>
                            <li>Guías y consejos para comparar presupuestos</li>
                            <li>Enlaces a plataformas de terceros para solicitar presupuestos</li>
                            <li>Cobertura informativa por provincias y municipios</li>
                        </ul>
                        <p className="text-slate-600 mt-4">
                            <strong>Importante:</strong> {site.brand} actúa como intermediario informativo. No somos una
                            empresa de construcción ni ejecutamos obras. Los presupuestos son proporcionados por terceros
                            independientes.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">4. Uso del sitio web</h2>
                        <p className="text-slate-600 mb-4">
                            El usuario se compromete a:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-slate-600">
                            <li>Hacer un uso lícito y conforme a estos términos</li>
                            <li>No reproducir, distribuir o modificar el contenido sin autorización</li>
                            <li>No utilizar el sitio para fines ilegales o perjudiciales</li>
                            <li>Proporcionar información veraz si solicita presupuestos</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">5. Propiedad intelectual</h2>
                        <p className="text-slate-600">
                            Todos los contenidos del sitio web (textos, imágenes, diseño, código) son propiedad de
                            [NOMBRE DE LA EMPRESA] o se utilizan con licencia. Queda prohibida su reproducción sin autorización expresa.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">6. Limitación de responsabilidad</h2>
                        <p className="text-slate-600">
                            {site.brand} no garantiza la exactitud de los precios orientativos mostrados ni se hace
                            responsable de los servicios prestados por terceros. Los presupuestos finales dependen
                            exclusivamente de los profesionales contactados.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">7. Legislación aplicable</h2>
                        <p className="text-slate-600">
                            Estos términos se rigen por la legislación aplicable en cada caso. Para usuarios de la
                            Unión Europea, se aplicarán las normas de protección al consumidor correspondientes.
                        </p>
                    </section>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-200">
                    <Link href="/" className="text-amber-600 hover:text-amber-700 font-medium">
                        ← Volver al inicio
                    </Link>
                </div>
            </div>
        </main>
    );
}
