import { setRequestLocale, getTranslations } from "next-intl/server";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { TrustMetrics } from "@/components/sections/trust-metrics";
import { OrganizationsContributed } from "@/components/sections/organizations-contributed";
import { FeaturedProducts } from "@/components/sections/featured-products";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { TechStack } from "@/components/sections/tech-stack";
import { Contact } from "@/components/sections/contact";
import { routing } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("nav");

  return (
    <>
      <a href="#main-content" className="skip-link">
        {t("skipToContent")}
      </a>
      <Header />
      <main id="main-content" className="flex-1 min-w-0">
        <Hero />
        <TrustMetrics />
        <OrganizationsContributed />
        <FeaturedProducts />
        <ExperienceTimeline />
        <TechStack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
