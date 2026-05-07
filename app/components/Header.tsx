"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import site from "@/data/site.json";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/logo.webp"
                        alt={site.brand}
                        width={40}
                        height={40}
                        className="rounded-lg"
                    />
                    <span className="font-bold text-slate-900 text-lg hidden sm:block">
                        {site.brand}
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/#provincias" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                        Provincias
                    </Link>
                    <Link href="/#como-funciona" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                        Cómo funciona
                    </Link>
                    <Link href="/#ventajas" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                        Ventajas
                    </Link>
                    <Link href="/colaboradores" className="text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors border border-amber-200 rounded-lg px-3 py-1 bg-amber-50">
                        Soy Profesional
                    </Link>
                </div>

                {/* CTA Button */}
                <div className="flex items-center gap-4">
                    <a
                        href={site.affiliateBaseUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cta-primary hidden sm:inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
                    >
                        {site.ctaText}
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>

                    {/* Mobile menu button */}
                    <button
                        type="button"
                        className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <span className="sr-only">Abrir menú</span>
                        {mobileMenuOpen ? (
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </nav>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-slate-200 bg-white">
                    <div className="space-y-1 px-6 py-4">
                        <Link
                            href="/#provincias"
                            className="block rounded-lg px-4 py-2 text-base font-medium text-slate-600 hover:bg-slate-50"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Provincias
                        </Link>
                        <Link
                            href="/#como-funciona"
                            className="block rounded-lg px-4 py-2 text-base font-medium text-slate-600 hover:bg-slate-50"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Cómo funciona
                        </Link>
                        <Link
                            href="/#ventajas"
                            className="block rounded-lg px-4 py-2 text-base font-medium text-slate-600 hover:bg-slate-50"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Ventajas
                        </Link>
                        <Link
                            href="/colaboradores"
                            className="block rounded-lg px-4 py-2 text-base font-medium text-amber-600 hover:bg-amber-50"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Soy Profesional
                        </Link>
                        <a
                            href={site.affiliateBaseUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full cta-primary mt-4 rounded-xl px-4 py-3 text-center text-base font-semibold text-white"
                        >
                            {site.ctaText}
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}
