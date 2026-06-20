"use client";

import {
  Cloud,
  Cpu,
  Database,
  Monitor,
  Server,
  Smartphone,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { SectionHeader } from "@/components/shared/section-header";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/fade-in";
import {
  primaryStackTechnologies,
  techCategoriesData,
  type TechCategoryIcon,
} from "@/lib/data";
import { richHighlight } from "@/lib/design-system";

const categoryIcons: Record<TechCategoryIcon, LucideIcon> = {
  monitor: Monitor,
  server: Server,
  database: Database,
  smartphone: Smartphone,
  sparkles: Sparkles,
  cloud: Cloud,
};

function PrimaryStackSection() {
  const t = useTranslations("stack");

  return (
    <div className="stack-primary-panel mb-4 md:mb-5">
      <p className="field-label mb-2.5 opacity-90">{t("primaryTitle")}</p>
      <div className="flex flex-wrap gap-2 sm:gap-2.5">
        {primaryStackTechnologies.map((tech) => (
          <span key={tech} className="stack-primary-chip">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

function TechCategoryCard({
  categoryKey,
  icon,
  technologies,
}: {
  categoryKey: (typeof techCategoriesData)[number]["key"];
  icon: TechCategoryIcon;
  technologies: readonly string[];
}) {
  const t = useTranslations("stack");
  const Icon = categoryIcons[icon];

  return (
    <article className="stack-category-card group surface-card h-full overflow-hidden">
      <div className="stack-category-accent" aria-hidden />
      <div className="p-5 sm:p-6">
        <div className="flex items-start gap-3.5">
          <span className="stack-category-icon">
            <Icon className="h-[1.125rem] w-[1.125rem] stroke-[2]" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="stack-category-title">{t(`categories.${categoryKey}`)}</h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-[13px]">
              {t(`categoryDescriptions.${categoryKey}`)}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5 border-t border-border/60 pt-4 dark:border-white/[0.06]">
          {technologies.map((tech) => (
            <span key={tech} className="project-tech-chip">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export function TechStack() {
  const t = useTranslations("stack");

  return (
    <section id="stack" className="pb-12 md:pb-16">
      <div className="page-container border-t border-border/80 pt-8 dark:border-white/[0.06] md:pt-10">
        <FadeIn>
          <div className="mb-3 flex items-start gap-3 md:mb-4">
            <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--accent-green-border)] bg-[var(--accent-green-subtle)] text-[var(--accent-green)] dark:bg-[color-mix(in_srgb,var(--accent-green)_12%,var(--card))]">
              <Cpu className="h-[1.125rem] w-[1.125rem] stroke-[2]" aria-hidden />
            </span>
            <SectionHeader
              label={t("label")}
              title={t.rich("title", richHighlight)}
              description={t("description")}
              className="mb-0 [&_.text-body-lg]:mt-3"
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.05}>
          <PrimaryStackSection />
        </FadeIn>

        <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {techCategoriesData.map((category) => (
            <StaggerItem key={category.key}>
              <TechCategoryCard
                categoryKey={category.key}
                icon={category.icon}
                technologies={category.technologies}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
