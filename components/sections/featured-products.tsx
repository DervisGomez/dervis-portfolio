"use client";

import { useState } from "react";
import Image from "next/image";
import { Layers } from "lucide-react";
import { useTranslations } from "next-intl";

import { ProjectCaseStudyModal } from "@/components/sections/project-case-study-modal";
import { ProjectEngagementCard } from "@/components/sections/project-engagement-card";
import { ProjectShowcase } from "@/components/sections/project-showcase";
import { SectionHeader } from "@/components/shared/section-header";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/fade-in";
import { Button } from "@/components/ui/button";
import {
  primaryProductIds,
  secondaryProductIds,
  productMeta,
} from "@/lib/data";
import type { PortfolioProjectId } from "@/lib/data";
import { richHighlight } from "@/lib/design-system";

const MAX_SECONDARY_TECH = 4;

function SecondaryProjectCard({
  id,
  onOpenDetail,
}: {
  id: PortfolioProjectId;
  onOpenDetail: () => void;
}) {
  const t = useTranslations("projects");
  const meta = productMeta[id];
  const [hasError, setHasError] = useState(false);
  const showImage = Boolean(meta.image) && !hasError;
  const projectName = t(`items.${id}.name`);

  return (
    <article className="secondary-project-card group surface-card flex flex-col overflow-hidden">
      <div className="secondary-project-card__accent" aria-hidden />
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-elevated">
        {showImage ? (
          <Image
            src={meta.image!}
            alt={t(`items.${id}.imageAlt`)}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
            onError={() => setHasError(true)}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center px-4 text-center">
            <p className="field-label text-[10px] text-brand">{t(`items.${id}.category`)}</p>
            <p className="heading-card mt-1.5 text-base text-foreground/20">
              {t(`items.${id}.name`)}
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div>
          <h3 className="heading-card mt-1 text-[1rem] font-semibold tracking-tight sm:text-[1.05rem]">
            {t(`items.${id}.name`)}
          </h3>
          <p className="mt-1.5 text-sm leading-snug text-muted-foreground">
            {t(`items.${id}.subtitle`)}
          </p>
        </div>

        <ProjectEngagementCard id={id} compact className="mt-0" />

        <div className="flex flex-wrap gap-1.5">
          {meta.stack.slice(0, MAX_SECONDARY_TECH).map((tech) => (
            <span key={tech} className="project-tech-chip">
              {tech}
            </span>
          ))}
        </div>

        <Button
          type="button"
          variant="caseStudy"
          size="sm"
          onClick={onOpenDetail}
          aria-label={`${t("viewDetail")} — ${projectName}`}
          className="project-showcase-btn mt-auto w-full cursor-pointer justify-center"
        >
          {t("viewDetail")}
        </Button>
      </div>
    </article>
  );
}

function SecondaryProjectsSection({
  onOpenDetail,
}: {
  onOpenDetail: (id: PortfolioProjectId) => void;
}) {
  const t = useTranslations("projects");

  return (
    <div className="secondary-projects-block mt-10 border-t border-border/80 pt-10 md:mt-14 md:pt-12 dark:border-white/[0.06]">
      <FadeIn>
        <div className="mb-6 flex items-start gap-3 md:mb-8">
          <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--accent-green-border)] bg-[var(--accent-green-subtle)] text-[var(--accent-green)] dark:bg-[color-mix(in_srgb,var(--accent-green)_12%,var(--card))]">
            <Layers className="h-[1.125rem] w-[1.125rem] stroke-[2]" aria-hidden />
          </span>
          <SectionHeader
            label={t("secondaryLabel")}
            title={t.rich("secondaryTitle", richHighlight)}
            description={t("secondaryDescription")}
            className="mb-0 [&_.heading-section]:text-[1.625rem] md:[&_.heading-section]:text-[1.875rem] [&_.text-body-lg]:mt-3"
          />
        </div>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5">
        {secondaryProductIds.map((id) => (
          <StaggerItem key={id}>
            <SecondaryProjectCard
              id={id}
              onOpenDetail={() => onOpenDetail(id)}
            />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}

export function FeaturedProducts() {
  const t = useTranslations("projects");
  const [modalProjectId, setModalProjectId] = useState<PortfolioProjectId | null>(
    null
  );

  const openCaseStudy = (id: PortfolioProjectId) => setModalProjectId(id);

  return (
    <section id="projects" className="section-muted pb-0 pt-10 md:pt-14">
      <div className="page-container">
        <FadeIn>
          <SectionHeader
            label={t("label")}
            title={t.rich("title", richHighlight)}
            description={t("descriptionShort")}
          />
        </FadeIn>

        <StaggerContainer className="flex flex-col gap-5 md:gap-6">
          {primaryProductIds.map((id) => (
            <StaggerItem key={id}>
              <ProjectShowcase
                id={id}
                onOpenCaseStudy={() => openCaseStudy(id)}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <SecondaryProjectsSection onOpenDetail={openCaseStudy} />
      </div>

      <ProjectCaseStudyModal
        projectId={modalProjectId}
        onClose={() => setModalProjectId(null)}
      />
    </section>
  );
}
