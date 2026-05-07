import type { Metadata } from "next";
import Link from "next/link";
import site from "@/data/site.json";

export const metadata: Metadata = {
    title: "Política de Cookies",
    description: "Política de cookies de " + site.brand,
};

export default function CookiesPage() {
    return (
        <main className="min-h-screen bg-slate-50 py-16">
            <div className="mx-auto max-w-3xl px-6">
                <nav className="mb-8 text-sm text-slate-500">
                    <Link href="/" className="hover:text-slate-900">Inicio</Link>
                    {" / "}
                    <span className="text-slate-900">Política de Cookies</span>
                </nav>

                <h1 className="text-3xl font-bold text-slate-900">Política de Cookies</h1>
                <p className="mt-4 text-slate-600">Última actualización: Enero 2026</p>

                <div className="mt-8 prose prose-slate max-w-none">
                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">1. ¿Qué son las cookies?</h2>
                        <p className="text-slate-600">
                            Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas
                            un sitio web. Permiten al sitio recordar tus acciones y preferencias durante un período de tiempo.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">2. Cookies que utilizamos</h2>

                        <div className="space-y-4">
                            <div className="bg-white rounded-xl p-5 border border-slate-200">
                                <h3 className="font-medium text-slate-900">Cookies técnicas (necesarias)</h3>
                                <p className="mt-2 text-sm text-slate-600">
                                    Esenciales para el funcionamiento del sitio. No requieren consentimiento.
                                </p>
                            </div>

                            <div className="bg-white rounded-xl p-5 border border-slate-200">
                                <h3 className="font-medium text-slate-900">Cookies de análisis</h3>
                                <p className="mt-2 text-sm text-slate-600">
                                    Nos ayudan a entender cómo los usuarios interactúan con el sitio para mejorarlo.
                                    Los datos son anónimos y agregados.
                                </p>
                            </div>

                            <div className="bg-white rounded-xl p-5 border border-slate-200">
                                <h3 className="font-medium text-slate-900">Cookies de terceros</h3>
                                <p className="mt-2 text-sm text-slate-600">
                                    Al hacer clic en enlaces externos (como solicitar presupuesto), pueden instalarse
                                    cookies de esas plataformas según sus propias políticas.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">3. Gestión de cookies</h2>
                        <p className="text-slate-600 mb-4">
                            Puedes configurar tu navegador para:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-slate-600">
                            <li>Bloquear todas las cookies</li>
                            <li>Permitir solo cookies de primeros (este sitio)</li>
                            <li>Eliminar las cookies al cerrar el navegador</li>
                            <li>Recibir un aviso antes de instalar cookies</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">4. Cómo desactivar cookies</h2>
                        <p className="text-slate-600 mb-4">
                            Instrucciones por navegador:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-slate-600">
                            <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</li>
                            <li><strong>Firefox:</strong> Opciones → Privacidad → Cookies</li>
                            <li><strong>Safari:</strong> Preferencias → Privacidad → Cookies</li>
                            <li><strong>Edge:</strong> Configuración → Cookies y permisos del sitio</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">5. Contacto</h2>
                        <ul className="list-none space-y-2 text-slate-600 bg-white rounded-xl p-6 border border-slate-200">
                            <li><strong>Entidad:</strong> OPHARANA LLC</li>
                            <li><strong>Dirección:</strong> 99 Wall Street, Suite 1432, 10005 New York, USA</li>
                        </ul>
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
