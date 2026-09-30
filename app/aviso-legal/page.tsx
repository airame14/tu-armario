import type { Metadata } from "next";
import Link from "next/link";
import site from "@/data/site.json";

export const metadata: Metadata = {
    title: "Aviso Legal",
    description: "Aviso legal e información del titular de " + site.brand,
};

export default function AvisoLegalPage() {
    return (
        <main className="min-h-screen bg-slate-50 py-16">
            <div className="mx-auto max-w-3xl px-6">
                <nav className="mb-8 text-sm text-slate-500">
                    <Link href="/" className="hover:text-slate-900">Inicio</Link>
                    {" / "}
                    <span className="text-slate-900">Aviso Legal</span>
                </nav>

                <h1 className="text-3xl font-bold text-slate-900">Aviso Legal</h1>
                <p className="mt-4 text-slate-600">Última actualización: Enero 2026</p>

                <div className="mt-8 prose prose-slate max-w-none">
                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">1. Datos identificativos</h2>
                        <p className="text-slate-600 mb-4">
                            En cumplimiento con el deber de información, se facilitan los siguientes datos del titular:
                        </p>
                        <ul className="list-none space-y-2 text-slate-600 bg-white rounded-xl p-6 border border-slate-200">
                            <li><strong>Denominación social:</strong> [NOMBRE DE LA EMPRESA]</li>
                            <li><strong>Domicilio:</strong> [DIRECCIÓN DE LA EMPRESA]</li>
                            <li><strong>Nombre comercial:</strong> {site.brand}</li>
                            <li><strong>Sitio web:</strong> {site.domain}</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">2. Objeto del sitio web</h2>
                        <p className="text-slate-600 mb-4">
                            {site.brand} es un portal informativo que tiene como finalidad:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-slate-600">
                            <li>Proporcionar información sobre servicios de rehabilitación de edificios en España</li>
                            <li>Ofrecer guías orientativas para comparar presupuestos</li>
                            <li>Facilitar el acceso a profesionales del sector a través de plataformas de terceros</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">3. Naturaleza del servicio</h2>
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                            <p className="text-slate-700">
                                <strong>Aviso importante:</strong> {site.brand} NO es una empresa constructora, no ejecuta
                                obras ni presta servicios de rehabilitación directamente. Actuamos exclusivamente como
                                portal informativo que conecta usuarios con profesionales independientes a través de
                                plataformas de terceros.
                            </p>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">4. Exclusión de responsabilidad</h2>
                        <p className="text-slate-600 mb-4">
                            El titular del sitio web no se hace responsable de:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-slate-600">
                            <li>La calidad, plazos o resultado de los trabajos realizados por profesionales de terceros</li>
                            <li>Los precios finales, que dependen exclusivamente de cada profesional</li>
                            <li>Posibles incidencias en la contratación con terceros</li>
                            <li>El contenido de sitios web enlazados desde este portal</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">5. Propiedad intelectual e industrial</h2>
                        <p className="text-slate-600">
                            Todos los contenidos del sitio web (textos, imágenes, logotipos, código fuente, diseño gráfico)
                            son propiedad de [NOMBRE DE LA EMPRESA] o se utilizan bajo licencia. Queda prohibida su reproducción,
                            distribución o transformación sin autorización expresa.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">6. Jurisdicción y ley aplicable</h2>
                        <p className="text-slate-600">
                            Para cualquier controversia derivada del uso de este sitio web, las partes acuerdan someterse
                            a la jurisdicción que corresponda según la normativa aplicable. Los usuarios de la Unión Europea
                            tienen a su disposición la plataforma de resolución de litigios en línea de la Comisión Europea.
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
