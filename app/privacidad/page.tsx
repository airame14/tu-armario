import type { Metadata } from "next";
import Link from "next/link";
import site from "@/data/site.json";

export const metadata: Metadata = {
    title: "Política de Privacidad",
    description: "Política de privacidad y protección de datos de " + site.brand,
};

export default function PrivacidadPage() {
    return (
        <main className="min-h-screen bg-slate-50 py-16">
            <div className="mx-auto max-w-3xl px-6">
                <nav className="mb-8 text-sm text-slate-500">
                    <Link href="/" className="hover:text-slate-900">Inicio</Link>
                    {" / "}
                    <span className="text-slate-900">Política de Privacidad</span>
                </nav>

                <h1 className="text-3xl font-bold text-slate-900">Política de Privacidad</h1>
                <p className="mt-4 text-slate-600">Última actualización: Enero 2026</p>

                <div className="mt-8 prose prose-slate max-w-none">
                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">1. Responsable del tratamiento</h2>
                        <p className="text-slate-600 mb-4">
                            El responsable del tratamiento de los datos recogidos en este sitio web es:
                        </p>
                        <ul className="list-none space-y-2 text-slate-600 bg-white rounded-xl p-6 border border-slate-200">
                            <li><strong>Entidad:</strong> OPHARANA LLC</li>
                            <li><strong>Dirección:</strong> 99 Wall Street, Suite 1432, 10005 New York, USA</li>
                            <li><strong>Sitio web:</strong> {site.domain}</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">2. Datos que recopilamos</h2>
                        <p className="text-slate-600 mb-4">
                            Este sitio web actúa como un portal informativo que conecta usuarios con profesionales del sector.
                            Los datos que podemos recopilar incluyen:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-slate-600">
                            <li>Datos de navegación (dirección IP, tipo de navegador, páginas visitadas)</li>
                            <li>Datos proporcionados voluntariamente al solicitar presupuestos a través de terceros</li>
                            <li>Cookies técnicas y de análisis según nuestra política de cookies</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">3. Finalidad del tratamiento</h2>
                        <p className="text-slate-600 mb-4">
                            Los datos se utilizan para:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-slate-600">
                            <li>Facilitar la conexión entre usuarios y profesionales de rehabilitación</li>
                            <li>Mejorar el funcionamiento y experiencia de usuario del sitio</li>
                            <li>Realizar análisis estadísticos anónimos</li>
                            <li>Cumplir con obligaciones legales aplicables</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">4. Derechos del usuario</h2>
                        <p className="text-slate-600 mb-4">
                            Puede ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad
                            contactando con nosotros a través de los datos indicados en esta política.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">5. Transferencias internacionales</h2>
                        <p className="text-slate-600">
                            Al ser una entidad con sede en Estados Unidos, los datos pueden ser tratados fuera del Espacio
                            Económico Europeo. Aplicamos las garantías adecuadas según la normativa vigente.
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
