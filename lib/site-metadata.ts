import type { Metadata } from "next";

import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { siteConfig } from "@/lib/data";

export type SiteMetadataContent = {
  title: string;
  titleTemplate: string;
  description: string;
  keywords: string;
};

function getOpenGraphLocale(locale: Locale): string {
  return locale === "es" ? "es_ES" : "en_US";
}

export function getCanonicalPath(locale: Locale): string {
  return getPathname({ locale, href: "/" });
}

export function getLanguageAlternates(): Record<string, string> {
  const languages = Object.fromEntries(
    routing.locales.map((locale) => [
      locale,
      getCanonicalPath(locale),
    ])
  ) as Record<string, string>;

  languages["x-default"] = getCanonicalPath(routing.defaultLocale);

  return languages;
}

export function buildSiteMetadata(
  locale: Locale,
  content: SiteMetadataContent
): Metadata {
  const canonical = getCanonicalPath(locale);
  const openGraphLocale = getOpenGraphLocale(locale);
  const alternateOpenGraphLocale =
    locale === "es" ? "en_US" : "es_ES";

  return {
    metadataBase: new URL(siteConfig.url),
    applicationName: siteConfig.name,
    title: {
      default: content.title,
      template: content.titleTemplate,
    },
    description: content.description,
    keywords: content.keywords
      .split(",")
      .map((keyword) => keyword.trim())
      .filter(Boolean),
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category: "technology",
    referrer: "origin-when-cross-origin",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical,
      languages: getLanguageAlternates(),
    },
    openGraph: {
      title: content.title,
      description: content.description,
      url: canonical,
      siteName: siteConfig.name,
      type: "website",
      locale: openGraphLocale,
      alternateLocale: [alternateOpenGraphLocale],
    },
    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.description,
      creator: siteConfig.name,
    },
  };
}
