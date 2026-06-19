"use client";

import { useTranslations } from "next-intl";

import { SectionHeader } from "@/components/shared/section-header";
import { FadeIn } from "@/components/shared/fade-in";
import { experienceIds } from "@/lib/data";
import { richHighlight } from "@/lib/design-system";

export function ExperienceTimeline() {
  const t = useTranslations("experience");

  return (
    <section id="experience" className="section-padding">
      <div className="page-container">
        <FadeIn>
          <SectionHeader
            label={t("label")}
            title={t.rich("title", richHighlight)}
            description={t("description")}
          />
        </FadeIn>

        <div>
          {experienceIds.map((id, index) => (
            <FadeIn key={id} delay={index * 0.05}>
              <article className="grid gap-4 border-t border-border py-10 dark:border-white/[0.06] md:grid-cols-[200px_1fr] md:gap-12 md:py-11">
                <div>
                  <p className="font-mono text-sm text-brand">
                    {id === "appi"
                      ? t("items.appi.period", { present: t("present") })
                      : t(`items.${id}.period`)}
                  </p>
                  <p className="mt-2 text-[15px] font-medium text-foreground">
                    {t(`items.${id}.company`)}
                  </p>
                </div>

                <div>
                  <h3 className="heading-card">{t(`items.${id}.role`)}</h3>
                  <p className="text-body-lg mt-4 max-w-2xl">
                    {t(`items.${id}.description`)}
                  </p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
