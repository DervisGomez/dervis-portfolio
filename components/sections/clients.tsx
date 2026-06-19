"use client";

import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/shared/section-header";
import { FadeIn } from "@/components/shared/fade-in";
import { industrySectorKeys } from "@/lib/data";
import { richHighlight } from "@/lib/design-system";

export function Clients() {
  const t = useTranslations("clients");

  return (
    <section id="clients" className="section-padding section-muted">
      <div className="page-container">
        <FadeIn>
          <SectionHeader
            label={t("label")}
            title={t.rich("title", richHighlight)}
            description={t("description")}
          />
        </FadeIn>

        <FadeIn delay={0.06}>
          <ul className="flex flex-wrap gap-2.5">
            {industrySectorKeys.map((key) => (
              <li key={key}>
                <Badge variant="outline" className="rounded-full px-4 py-2 text-sm">
                  {t(`industries.${key}`)}
                </Badge>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}
