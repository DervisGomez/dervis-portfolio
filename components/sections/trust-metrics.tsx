"use client";

import { useTranslations } from "next-intl";

import { AnimatedCounter } from "@/components/shared/animated-counter";
import { StaggerContainer, StaggerItem } from "@/components/shared/fade-in";
import { trustMetricsData } from "@/lib/data";
import { cn } from "@/lib/utils";

export function TrustMetrics() {
  const t = useTranslations("metrics");
  const tTrust = useTranslations("trustMetrics");

  return (
    <section
      id="trust-metrics"
      aria-label={tTrust("ariaLabel")}
      className="border-y border-border dark:border-white/[0.06]"
    >
      <div className="page-container py-14 md:py-16 lg:py-20">
        <StaggerContainer className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-10 lg:grid-cols-4 lg:gap-x-0 lg:gap-y-0">
          {trustMetricsData.map((metric, index) => (
            <StaggerItem
              key={metric.labelKey}
              className={cn(
                index % 2 === 1 &&
                  "border-l border-border pl-6 dark:border-white/[0.06] sm:pl-8",
                index > 0 &&
                  "lg:border-l lg:border-border lg:pl-8 dark:lg:border-white/[0.06]",
                index === 0 && "lg:pl-0"
              )}
            >
              <dl>
                <dt className="metric-value text-[2rem] leading-none tracking-tight sm:text-[2.25rem] md:text-[2.5rem]">
                  {metric.type === "counter" ? (
                    <AnimatedCounter
                      value={metric.value}
                      suffix={metric.suffix}
                    />
                  ) : (
                    t(metric.valueKey)
                  )}
                </dt>
                <dd className="text-caption mt-3 max-w-[10rem] leading-snug sm:max-w-[12rem] lg:max-w-none">
                  {t(metric.labelKey)}
                </dd>
              </dl>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
