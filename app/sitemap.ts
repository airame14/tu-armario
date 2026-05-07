import { MetadataRoute } from 'next'
import provincias from '@/data/provincias.json'
import servicios from '@/data/servicios.json'
import site from '@/data/site.json'

const BASE_URL = site.domain.startsWith("http") ? site.domain : `https://${site.domain}`;

export default function sitemap(): MetadataRoute.Sitemap {
    const routes: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${BASE_URL}/privacidad`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.1,
        },
        {
            url: `${BASE_URL}/terminos`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.1,
        },
        {
            url: `${BASE_URL}/cookies`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.1,
        },
        {
            url: `${BASE_URL}/aviso-legal`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.1,
        },
    ];

    // Provinces
    for (const p of provincias) {
        routes.push({
            url: `${BASE_URL}/${p.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        });

        // Services per Province
        for (const s of servicios) {
            routes.push({
                url: `${BASE_URL}/${p.slug}/${s.slug}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.7,
            });
        }
    }

    return routes
}
