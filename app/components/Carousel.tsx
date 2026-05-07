"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoPlay from "embla-carousel-autoplay";
import Image from "next/image";

type CarouselProps = {
    slides: {
        src: string;
        alt: string;
        title?: string;
        description?: string;
    }[];
    title?: string;
    subtitle?: string;
};

export default function Carousel({ slides, title, subtitle }: CarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
        AutoPlay({ delay: 5000, stopOnInteraction: false })
    ]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
    }, [emblaApi, onSelect]);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    return (
        <section className="py-20 bg-white">
            <div className="mx-auto max-w-7xl px-6">
                {(title || subtitle) && (
                    <div className="text-center mb-12">
                        {subtitle && (
                            <span className="inline-block rounded-full bg-amber-500/10 px-4 py-1 text-sm font-medium text-amber-600 mb-4">
                                {subtitle}
                            </span>
                        )}
                        {title && (
                            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                                {title}
                            </h2>
                        )}
                    </div>
                )}

                <div className="relative">
                    <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
                        <div className="flex">
                            {slides.map((slide, index) => (
                                <div className="relative flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-4" key={index}>
                                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl group cursor-pointer">
                                        <Image
                                            src={slide.src}
                                            alt={slide.alt}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="absolute bottom-0 left-0 p-6 text-white">
                                                {slide.title && <h3 className="font-bold text-lg">{slide.title}</h3>}
                                                {slide.description && <p className="text-sm text-slate-200">{slide.description}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Buttons for desktop */}
                    <button
                        onClick={scrollPrev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg hover:bg-white text-slate-900 hidden md:block"
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={scrollNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg hover:bg-white text-slate-900 hidden md:block"
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Dots */}
                <div className="mt-8 flex justify-center gap-2">
                    {emblaApi && emblaApi.scrollSnapList().map((_, index) => (
                        <button
                            key={index}
                            className={`h-2.5 rounded-full transition-all ${index === selectedIndex ? "w-8 bg-amber-500" : "w-2.5 bg-slate-200"
                                }`}
                            onClick={() => emblaApi.scrollTo(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
