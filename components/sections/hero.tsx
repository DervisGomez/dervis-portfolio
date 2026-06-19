"use client";

import Image from "next/image";
import { Download } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { metricsData, siteConfig } from "@/lib/data";
import { richHighlight } from "@/lib/design-system";
import { cn } from "@/lib/utils";

function ProfilePhoto({ className }: { className?: string }) {
  const t = useTranslations("hero");

  return (
    <div
      className={cn(
        "image-frame relative aspect-[4/5] rounded-[1.5rem] ring-1 ring-border dark:ring-white/[0.08]",
        className
      )}
    >
      <Image
        src={siteConfig.profileImage}
        alt={t("profileAlt")}
        fill
        priority
        sizes="(max-width: 1024px) 180px, 320px"
        className="object-cover object-[center_12%]"
      />
    </div>
  );
}

export function Hero() {
  const t = useTranslations("hero");
  const tMetrics = useTranslations("metrics");

  return (
    <section className="relative">
      <div className="page-container pb-20 pt-28 md:pb-28 md:pt-36 lg:pb-32 lg:pt-40">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-20 xl:grid-cols-[minmax(0,1fr)_320px] xl:gap-24">

          <div className="max-w-[640px]">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <p className="text-sm font-medium tracking-tight text-foreground">
                {t("name")}
              </p>
              <span className="text-muted-foreground/40" aria-hidden>
                ·
              </span>
              <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
            </div>

            {/* Mobile photo — above the headline so it doesn't interrupt reading flow */}
            <div className="mt-7 lg:hidden">
              <ProfilePhoto className="mx-auto max-w-[180px]" />
            </div>

            <h1 className="heading-display mt-8 text-[2.25rem] leading-[1.08] sm:text-[2.75rem] md:text-[3.25rem] lg:mt-10 lg:text-[3.5rem]">
              {t.rich("headline", richHighlight)}
            </h1>

            <p className="text-body-lg mt-6 max-w-[520px] lg:mt-8">
              {t("description")}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild size="lg" className="h-11 w-full rounded-full px-7 sm:w-auto">
                <a href="#projects">{t("viewProjects")}</a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-11 w-full rounded-full px-7 sm:w-auto"
              >
                <a href={siteConfig.cvUrl} download>
                  {t("downloadCv")}
                  <Download />
                </a>
              </Button>
            </div>

            <dl className="mt-10 grid grid-cols-3 gap-x-6 border-t border-border pt-8 dark:border-white/[0.06] lg:mt-12 lg:pt-10">
              {metricsData.map((metric) => (
                <div key={metric.labelKey}>
                  <dt className="metric-value text-[1.625rem] md:text-[1.875rem]">
                    <AnimatedCounter
                      value={metric.value}
                      suffix={metric.suffix}
                    />
                  </dt>
                  <dd className="text-caption mt-1.5">{tMetrics(metric.labelKey)}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="hidden lg:block lg:justify-self-end">
            <ProfilePhoto />
          </div>

        </div>
      </div>
    </section>
  );
}
