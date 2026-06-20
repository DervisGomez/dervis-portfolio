"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, Layers } from "lucide-react";
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
import { cn } from "@/lib/utils";

const MAX_SECONDARY_TECH = 4;
const MAX_PREVIEW_NAMES = 5;

function MoreProjectsCta({
  expanded,
  onToggle,
}: {
  expanded: boolean;
  onToggle: () => void;
}) {
  const t = useTranslations("projects");
  const count = secondaryProductIds.length;
  const previewIds = secondaryProductIds.slice(0, MAX_PREVIEW_NAMES);
  const remainingNames = count - previewIds.length;

  return (
    <div className="more-projects-cta p-6 sm:p-8 md:p-10">
      <div className="more-projects-cta__glow" aria-hidden />

      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-10">
        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-3 sm:gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand ring-1 ring-brand/20 dark:bg-brand/15">
              <Layers className="h-5 w-5" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="section-indicator">{t("moreProjectsTitle")}</p>
              <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-foreground sm:text-2xl">
                {t("moreProjectsHint")}
              </h3>
              <p className="text-body mt-2 max-w-xl text-sm leading-relaxed sm:text-[15px]">
                {t("moreProjectsDescription")}
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {previewIds.map((id) => (
              <span
                key={id}
                className="inline-flex items-center rounded-full border border-border/80 bg-background/70 px-3 py-1 text-xs font-medium text-foreground/90 backdrop-blur-sm dark:border-white/[0.08] dark:bg-white/[0.04]"
              >
                {t(`items.${id}.name`)}
              </span>
            ))}
            {remainingNames > 0 ? (
              <span className="project-tech-chip border-dashed px-3 py-1 text-xs">
                {t("moreTech", { count: remainingNames })}
              </span>
            ) : null}
          </div>

          <Button
            type="button"
            variant="caseStudy"
            size="lg"
            onClick={onToggle}
            aria-expanded={expanded}
            className="project-showcase-btn btn-mobile-wrap mt-6 cursor-pointer gap-2 px-6 sm:w-auto"
          >
            {expanded ? t("hideMoreProjects") : t("showMoreProjects")}
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform duration-200",
                expanded && "rotate-180"
              )}
            />
          </Button>
        </div>

        <div className="flex shrink-0 items-center gap-4 md:flex-col md:items-end md:text-right">
          <div className="hidden h-px flex-1 bg-border/80 md:block md:h-auto md:w-px md:flex-none md:self-stretch dark:bg-white/[0.08]" />
          <div>
            <p className="more-projects-cta__count">+{count}</p>
            <p className="mt-2 max-w-[10rem] text-sm leading-snug text-muted-foreground md:ml-auto">
              {t("moreProjectsCount", { count })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

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

  return (
    <article className="secondary-project-card group surface-card flex flex-col overflow-hidden">
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
          className="project-showcase-btn mt-auto w-full cursor-pointer justify-center"
        >
          {t("viewDetail")}
        </Button>
      </div>
    </article>
  );
}

export function FeaturedProducts() {
  const t = useTranslations("projects");
  const [modalProjectId, setModalProjectId] = useState<PortfolioProjectId | null>(
    null
  );
  const [showSecondary, setShowSecondary] = useState(false);

  const openCaseStudy = (id: PortfolioProjectId) => setModalProjectId(id);

  return (
    <section id="projects" className="section-muted pb-16 pt-10 md:pb-28 md:pt-14">
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

        <FadeIn delay={0.1} className="mt-10 md:mt-14">
          <MoreProjectsCta
            expanded={showSecondary}
            onToggle={() => setShowSecondary((prev) => !prev)}
          />

          {showSecondary ? (
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-8 md:gap-4">
              {secondaryProductIds.map((id) => (
                <SecondaryProjectCard
                  key={id}
                  id={id}
                  onOpenDetail={() => openCaseStudy(id)}
                />
              ))}
            </div>
          ) : null}
        </FadeIn>
      </div>

      <ProjectCaseStudyModal
        projectId={modalProjectId}
        onClose={() => setModalProjectId(null)}
      />
    </section>
  );
}
