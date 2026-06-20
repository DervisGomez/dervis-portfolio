"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

import { ProjectCaseStudyModal } from "@/components/sections/project-case-study-modal";
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
          <p className="section-indicator text-[10px]">{t(`items.${id}.category`)}</p>
          <h3 className="heading-card mt-1 text-[1rem] font-semibold tracking-tight sm:text-[1.05rem]">
            {t(`items.${id}.name`)}
          </h3>
        </div>

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

        <FadeIn delay={0.1} className="mt-10 md:mt-12">
          <div className="border-t border-border pt-10 dark:border-white/[0.06] md:pt-12">
            <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground md:text-xl">
              {t("moreProjectsTitle")}
            </h3>
            <p className="text-body mt-2 max-w-2xl text-sm leading-relaxed md:text-[15px]">
              {t("moreProjectsDescription")}
            </p>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowSecondary((prev) => !prev)}
              aria-expanded={showSecondary}
              className="project-showcase-btn mt-5 cursor-pointer gap-2"
            >
              {showSecondary ? t("hideMoreProjects") : t("showMoreProjects")}
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-200",
                  showSecondary && "rotate-180"
                )}
              />
            </Button>

            {showSecondary ? (
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4">
                {secondaryProductIds.map((id) => (
                  <SecondaryProjectCard
                    key={id}
                    id={id}
                    onOpenDetail={() => openCaseStudy(id)}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </FadeIn>
      </div>

      <ProjectCaseStudyModal
        projectId={modalProjectId}
        onClose={() => setModalProjectId(null)}
      />
    </section>
  );
}
