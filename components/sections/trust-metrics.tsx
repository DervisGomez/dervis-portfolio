"use client";

import {
  Globe,
  Rocket,
  Smartphone,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedCounter } from "@/components/shared/animated-counter";
import { FadeIn } from "@/components/shared/fade-in";
import { trustMetricIds, trustMetricsData, type TrustMetricId } from "@/lib/data";
import { cn } from "@/lib/utils";

const metricIcons: Record<(typeof trustMetricsData)[TrustMetricId]["icon"], LucideIcon> = {
  zap: Zap,
  rocket: Rocket,
  smartphone: Smartphone,
  globe: Globe,
};

function MetricValue({ id }: { id: TrustMetricId }) {
  const metric = trustMetricsData[id];

  if (metric.counter) {
    return (
      <AnimatedCounter
        value={metric.counter.value}
        suffix={metric.counter.suffix}
      />
    );
  }

  return <>{metric.value}</>;
}

export function TrustMetrics() {
  const t = useTranslations("metrics");
  const tTrust = useTranslations("trustMetrics");

  return (
    <section id="trust-metrics" aria-label={tTrust("ariaLabel")}>
      <div className="page-container py-4 sm:py-5 md:py-6">
        <FadeIn>
          <div className="metrics-premium-card overflow-hidden">
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {trustMetricIds.map((id, index) => {
                const metric = trustMetricsData[id];
                const Icon = metricIcons[metric.icon];

                return (
                  <div
                    key={id}
                    className={cn(
                      "metrics-premium-cell",
                      index % 2 === 1 &&
                        "border-l border-border/60 dark:border-white/[0.06]",
                      index >= 2 &&
                        "border-t border-border/60 dark:border-white/[0.06] lg:border-t-0",
                      index > 0 &&
                        "lg:border-t-0 lg:border-l lg:border-border/60 dark:lg:border-white/[0.06]"
                    )}
                  >
                    <dl className="w-full">
                      <dt className="flex items-center justify-center gap-2.5 sm:gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.625rem] bg-brand/10 text-brand dark:bg-brand/15">
                          <Icon className="h-[1.125rem] w-[1.125rem] stroke-[2]" aria-hidden />
                        </span>
                        <span className="metric-value text-[1.875rem] leading-none sm:text-[2.125rem] lg:text-[2.5rem]">
                          <MetricValue id={id} />
                        </span>
                      </dt>
                      <dd className="mt-2.5 text-sm leading-snug text-muted-foreground sm:mt-3">
                        {t(metric.labelKey)}
                      </dd>
                    </dl>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
