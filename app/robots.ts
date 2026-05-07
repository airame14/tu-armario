import { MetadataRoute } from 'next'
import site from '@/data/site.json'

const BASE_URL = site.domain.startsWith("http") ? site.domain : `https://${site.domain}`;

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/admin/'],
        },
        sitemap: `${BASE_URL}/sitemap.xml`,
    }
}
