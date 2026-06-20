"use client";

import Image from "next/image";
import { Briefcase, Calendar, Clock, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

import { SectionHeader } from "@/components/shared/section-header";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/fade-in";
import {
  experienceIds,
  experienceMeta,
  type ExperienceId,
} from "@/lib/data";
import { richHighlight } from "@/lib/design-system";
import { cn } from "@/lib/utils";

const MAX_VISIBLE_TECH = 6;

function ExperienceLogo({ id, className }: { id: ExperienceId; className?: string }) {
  const t = useTranslations("experience");
  const meta = experienceMeta[id];
  const company = t(`items.${id}.company`);

  if (meta.logo) {
    return (
      <div className={cn("experience-logo experience-logo--lg", className)}>
        <Image
          src={meta.logo}
          alt={company}
          width={48}
          height={48}
          className="h-full w-full object-contain"
        />
      </div>
    );
  }

  return (
    <div
      className={cn("experience-logo experience-logo--lg experience-logo-fallback", className)}
      aria-hidden
    >
      {meta.initials}
    </div>
  );
}

function ExperienceTechStack({ stack }: { stack: readonly string[] }) {
  const t = useTranslations("experience");
  const visible = stack.slice(0, MAX_VISIBLE_TECH);
  const remaining = stack.length - MAX_VISIBLE_TECH;

  if (stack.length === 0) return null;

  return (
    <div className="mt-4">
      <p className="field-label mb-2.5 opacity-80">{t("technologiesLabel")}</p>
      <div className="flex flex-wrap gap-1.5">
        {visible.map((tech) => (
          <span key={tech} className="project-tech-chip">
            {tech}
          </span>
        ))}
        {remaining > 0 ? (
          <span className="project-tech-chip border-dashed opacity-70">
            +{remaining}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function ExperienceEntry({ id }: { id: ExperienceId }) {
  const t = useTranslations("experience");
  const meta = experienceMeta[id];
  const hasLocation = t.has(`items.${id}.location`);
  const hasDuration = t.has(`items.${id}.duration`);
  const period = meta.present
    ? t(`items.${id}.period`, { present: t("present") })
    : t(`items.${id}.period`);

  return (
    <article className="experience-card group surface-card overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="experience-card-accent" aria-hidden />

        <div className="flex min-w-0 flex-1 flex-col gap-5 p-5 sm:p-6 md:flex-row md:gap-0 md:p-0">
          <div className="flex min-w-0 items-start gap-4 md:w-[17.5rem] md:shrink-0 md:p-6 lg:w-[19rem] lg:p-7">
            <ExperienceLogo id={id} />
            <div className="min-w-0 flex-1">
              <h3 className="heading-card text-[1.05rem] sm:text-lg">
                {t(`items.${id}.role`)}
              </h3>
              <p className="mt-1 text-sm font-medium text-foreground">
                {t(`items.${id}.company`)}
              </p>
              {meta.present ? (
                <span className="experience-present-badge mt-2.5">
                  <span className="experience-present-dot" aria-hidden />
                  {t("present")}
                </span>
              ) : null}
            </div>
          </div>

          <div className="min-w-0 flex-1 md:border-l md:border-border/70 md:px-6 md:py-6 lg:px-8 lg:py-7 dark:md:border-white/[0.06]">
            <ul className="flex flex-wrap gap-2">
              <li className="experience-meta-chip">
                <Calendar className="h-3.5 w-3.5 shrink-0 text-brand/80" aria-hidden />
                <span>{period}</span>
              </li>
              {hasDuration ? (
                <li className="experience-meta-chip">
                  <Clock className="h-3.5 w-3.5 shrink-0 text-brand/80" aria-hidden />
                  <span>{t(`items.${id}.duration`)}</span>
                </li>
              ) : null}
              {hasLocation ? (
                <li className="experience-meta-chip">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-brand/80" aria-hidden />
                  <span>{t(`items.${id}.location`)}</span>
                </li>
              ) : null}
            </ul>

            <p className="text-body mt-4 text-[15px] leading-relaxed">
              {t(`items.${id}.description`)}
            </p>

            <ExperienceTechStack stack={meta.stack} />
          </div>
        </div>
      </div>
    </article>
  );
}

export function ExperienceTimeline() {
  const t = useTranslations("experience");

  return (
    <section id="experience" className="section-muted pb-16 md:pb-28">
      <div className="page-container">
        <div className="experience-section-divider pt-10 md:pt-14">
          <FadeIn>
            <div className="mb-4 flex items-start gap-3 md:mb-5">
              <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand ring-1 ring-brand/20 dark:bg-brand/15">
                <Briefcase className="h-[1.125rem] w-[1.125rem] stroke-[2]" aria-hidden />
              </span>
              <SectionHeader
                label={t("label")}
                title={t.rich("title", richHighlight)}
                description={t("description")}
                className="mb-0 [&_.text-body-lg]:mt-3"
              />
            </div>
          </FadeIn>

          <StaggerContainer className="flex flex-col gap-4 md:gap-5">
            {experienceIds.map((id) => (
              <StaggerItem key={id}>
                <ExperienceEntry id={id} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
