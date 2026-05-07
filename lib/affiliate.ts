import site from "@/data/site.json";

type AffiliateOpts = {
  provincia?: string;
  servicio?: string;
};

export function buildAffiliateUrl(opts: AffiliateOpts = {}) {
  const base = site.affiliateBaseUrl;

  const params = new URLSearchParams({
    utm_source: site.utm.source,
    utm_medium: site.utm.medium,
    utm_campaign: site.utm.campaign
  });

  // Para segmentar mejor en analytics / afiliado
  if (opts.provincia) params.set("utm_term", opts.provincia);
  if (opts.servicio) params.set("utm_content", opts.servicio);

  return `${base}?${params.toString()}`;
}
