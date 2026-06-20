"use client";

import Image from "next/image";
import { Download } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnchorLink } from "@/components/shared/anchor-link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { heroTechnologies, siteConfig } from "@/lib/data";
import { richHeadline } from "@/lib/design-system";
import { cn } from "@/lib/utils";

function HeroVisualFrame({
  src,
  alt,
  sizes,
  imageClassName,
  className,
}: {
  src: string;
  alt: string;
  sizes: string;
  imageClassName?: string;
  className?: string;
}) {
  return (
    <div className={cn("hero-showcase__frame relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes={sizes}
        className={cn("object-center", imageClassName)}
      />
    </div>
  );
}

export function Hero() {
  const t = useTranslations("hero");
  const alt = t("heroImageAlt");

  return (
    <section className="relative overflow-x-clip">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      >
        <div className="absolute -right-24 top-0 h-[min(520px,70vw)] w-[min(520px,70vw)] rounded-full bg-brand/[0.06] blur-3xl dark:bg-brand/[0.08]" />
        <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-brand/[0.04] blur-3xl dark:bg-brand/[0.06]" />
      </div>

      <div className="page-container pb-8 pt-[calc(var(--header-offset)+1.25rem)] sm:pb-10 sm:pt-[calc(var(--header-offset)+2rem)] lg:pb-10 lg:pt-[calc(var(--header-offset)+2.5rem)]">
        <div className="grid items-stretch gap-8 md:grid-cols-[1.22fr_0.78fr] md:gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:gap-12">
          <div className="relative z-10 flex min-w-0 flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-brand/20 bg-brand-subtle px-3 py-1">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
              <span className="text-xs font-medium text-brand">
                {t("focusBadge")}
              </span>
            </div>

            <div className="mt-5 flex flex-col items-start gap-0.5 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3">
              <p className="text-sm font-medium tracking-tight text-foreground">
                {t("name")}
              </p>
              <span className="hidden text-muted-foreground/40 sm:inline" aria-hidden>
                ·
              </span>
              <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
            </div>

            <h1 className="mt-5 text-wrap text-[1.875rem] font-semibold leading-[1.1] tracking-[-0.03em] text-foreground sm:mt-6 sm:text-[2.25rem] md:text-[2.5rem] lg:mt-7 lg:text-[3rem] xl:text-[3.25rem]">
              {t.rich("headline", richHeadline)}
            </h1>

            {/* Mobile hero image — after headline */}
            <HeroVisualFrame
              src={siteConfig.heroMobileImage}
              alt={alt}
              sizes="100vw"
              imageClassName="object-contain"
              className="mt-6 aspect-[16/10] w-full md:hidden"
            />

            <p className="text-body-lg mt-5 max-w-xl md:mt-6 md:max-w-none">
              {t("description")}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:mt-9">
              <Button
                asChild
                size="lg"
                className="btn-mobile-wrap h-11 w-full rounded-full px-7 shadow-[var(--shadow-button)] sm:w-auto"
              >
                <AnchorLink href="#projects">{t("viewProjects")}</AnchorLink>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="btn-mobile-wrap h-11 w-full rounded-full px-7 sm:w-auto"
              >
                <a href={siteConfig.cvUrl} download>
                  {t("downloadCv")}
                  <Download />
                </a>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap gap-2 lg:mt-9">
              {heroTechnologies.map((tech) => (
                <Badge key={tech} variant="tech">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Desktop hero image */}
          <div className="relative hidden min-h-0 md:block md:h-full">
            <HeroVisualFrame
              src={siteConfig.heroImage}
              alt={alt}
              sizes="42vw"
              imageClassName="object-cover"
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
