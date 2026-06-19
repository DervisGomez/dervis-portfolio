"use client";

import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { ProjectCaseStudy } from "@/components/sections/project-case-study";
import { SectionHeader } from "@/components/shared/section-header";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/fade-in";
import { primaryProductIds, secondaryProductIds, productMeta } from "@/lib/data";
import type { FeaturedProductId } from "@/lib/data";
import { richHighlight } from "@/lib/design-system";

function CompactProjectCard({ id }: { id: FeaturedProductId }) {
  const t = useTranslations("projects");
  const meta = productMeta[id];

  return (
    <article className="surface-card flex flex-col gap-5 p-6">
      <div>
        <p className="section-indicator text-[11px]">{t(`items.${id}.category`)}</p>
        <h3 className="heading-card mt-2 text-[1.1rem]">{t(`items.${id}.name`)}</h3>
      </div>
      <p className="text-body flex-1 text-[15px] leading-relaxed">
        {t(`items.${id}.impact.description`)}
      </p>
      <div className="flex flex-wrap gap-1.5 border-t border-border pt-4 dark:border-white/[0.06]">
        {meta.stack.map((tech) => (
          <Badge key={tech} variant="tech">
            {tech}
          </Badge>
        ))}
      </div>
    </article>
  );
}

export function FeaturedProducts() {
  const t = useTranslations("projects");

  return (
    <section id="projects" className="section-padding section-muted">
      <div className="page-container">
        <FadeIn>
          <SectionHeader
            label={t("label")}
            title={t.rich("title", richHighlight)}
            description={t("description")}
          />
        </FadeIn>

        {/* Primary case studies — full detail */}
        <StaggerContainer className="flex flex-col gap-12 md:gap-14">
          {primaryProductIds.map((id) => (
            <StaggerItem key={id}>
              <ProjectCaseStudy id={id} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Secondary projects — compact cards */}
        <FadeIn delay={0.1} className="mt-10 md:mt-12">
          <p className="field-label mb-6">{t("moreProjects")}</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {secondaryProductIds.map((id) => (
              <CompactProjectCard key={id} id={id} />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
