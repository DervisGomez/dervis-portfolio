"use client";

import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/shared/section-header";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/fade-in";
import { techCategoriesData } from "@/lib/data";
import { richHighlight } from "@/lib/design-system";

export function TechStack() {
  const t = useTranslations("stack");

  return (
    <section id="stack" className="section-padding">
      <div className="page-container">
        <FadeIn>
          <SectionHeader
            label={t("label")}
            title={t.rich("title", richHighlight)}
            description={t("description")}
          />
        </FadeIn>

        <StaggerContainer className="grid gap-4 md:grid-cols-2">
          {techCategoriesData.map((category) => (
            <StaggerItem key={category.key}>
              <div className="surface-card p-6 md:p-8">
                <h3 className="field-label normal-case tracking-normal text-sm">
                  {t(`categories.${category.key}`)}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {category.technologies.map((tech) => (
                    <Badge key={tech} variant="tech">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
