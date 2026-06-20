import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/data";

function getLocalizedPath(locale: string) {
  return locale === routing.defaultLocale ? "" : `/${locale}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => ({
    url: `${siteConfig.url}${getLocalizedPath(locale)}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === routing.defaultLocale ? 1 : 0.9,
  }));
}
