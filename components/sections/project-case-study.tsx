"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { FeaturedProductId } from "@/lib/data";
import { productMeta } from "@/lib/data";
import { cn } from "@/lib/utils";

interface ProjectCaseStudyProps {
  id: FeaturedProductId;
}

function ProjectScreenshot({
  image,
  alt,
  category,
  name,
  priority,
}: {
  image?: string;
  alt: string;
  category: string;
  name: string;
  priority?: boolean;
}) {
  const [hasError, setHasError] = useState(false);
  const showImage = Boolean(image) && !hasError;

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-elevated md:aspect-[2/1]">
      <div className="absolute inset-x-0 top-0 z-10 flex h-10 items-center gap-2 border-b border-border bg-card/90 px-5 backdrop-blur-sm dark:border-white/[0.06]">
        <span className="h-2 w-2 rounded-full bg-border dark:bg-white/10" aria-hidden />
        <span className="h-2 w-2 rounded-full bg-border dark:bg-white/10" aria-hidden />
        <span className="h-2 w-2 rounded-full bg-border dark:bg-white/10" aria-hidden />
        <span className="field-label ml-2 truncate normal-case">{category}</span>
      </div>

      {showImage ? (
        <div className="absolute inset-0 pt-10">
          <Image
            src={image!}
            alt={alt}
            fill
            className="object-cover object-top"
            sizes="(max-width: 1080px) 100vw, 1080px"
            priority={priority}
            onError={() => setHasError(true)}
          />
        </div>
      ) : (
        <div className="flex h-full flex-col items-center justify-center px-6 pt-10 text-center">
          <p className="field-label text-brand">{category}</p>
          <p className="heading-card mt-3 text-foreground/20">{name}</p>
        </div>
      )}
    </div>
  );
}

export function ProjectCaseStudy({ id }: ProjectCaseStudyProps) {
  const t = useTranslations("projects");
  const meta = productMeta[id];
  const caseStudyId = `${id}-case-study`;
  const highlightsId = `${id}-highlights`;
  const sidebarId = `${id}-sidebar`;

  return (
    <div className="space-y-4">
      <article id={caseStudyId} className="surface-card overflow-hidden">
        <ProjectScreenshot
          image={meta.image}
          alt={t(`items.${id}.imageAlt`)}
          category={t(`items.${id}.category`)}
          name={t(`items.${id}.name`)}
          priority={id === "veyco" || id === "enaex" || id === "formidavel"}
        />

        <div className="scroll-mt-28 p-6 md:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14 xl:gap-16">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="heading-card text-[1.625rem] md:text-3xl lg:text-[2rem]">
                  {t(`items.${id}.name`)}
                </h3>
                {meta.status === "production" ? (
                  <Badge
                    variant="outline"
                    className="rounded-full border-border px-3 py-1 text-xs font-medium text-foreground"
                  >
                    {t("productionStatus")}
                  </Badge>
                ) : null}
              </div>

              <p className="text-body-lg mt-5 max-w-2xl">
                {t(`items.${id}.description`)}
              </p>

              {meta.platformKeys?.length || meta.platforms?.length ? (
                <div className="mt-8">
                  <p className="field-label mb-3">{t("platformsLabel")}</p>
                  <div className="flex flex-wrap gap-2">
                    {(meta.platformKeys ?? meta.platforms ?? []).map((platform) => {
                      const href = meta.platformUrls?.[platform];
                      const label = meta.platformKeys
                        ? t(`items.${id}.platforms.${platform}`)
                        : t(`platforms.${platform as "web" | "android" | "ios"}`);

                      if (href) {
                        return (
                          <a
                            key={platform}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${label} — ${t(`items.${id}.name`)}`}
                          >
                            <Badge
                              variant="outline"
                              className="rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:border-brand/30 hover:bg-brand-subtle hover:text-brand"
                            >
                              {label}
                            </Badge>
                          </a>
                        );
                      }

                      return (
                        <Badge
                          key={platform}
                          variant="outline"
                          className="rounded-full px-3.5 py-1.5 text-[13px] font-medium"
                        >
                          {label}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              ) : null}

              <div className="mt-8 rounded-xl border border-border bg-muted/40 p-5 dark:bg-muted/20 md:p-6">
                <p className="field-label mb-2">{t("impactLabel")}</p>
                <p className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
                  {t(`items.${id}.impact.metric`)}
                </p>
                <p className="text-body mt-2">
                  {t(`items.${id}.impact.description`)}
                </p>
              </div>

              <div className="mt-8">
                <p className="field-label mb-3">{t("technologiesLabel")}</p>
                <div className="flex flex-wrap gap-2">
                  {meta.stack.map((tech) => (
                    <Badge key={tech} variant="tech">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {meta.cta === "enterprise" ? (
                  <>
                    {meta.url ? (
                      <Button asChild className="w-full rounded-full sm:w-auto">
                        <a
                          href={meta.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${meta.applicationUrl ? t("viewWebsite") : t("viewLive")} — ${t(`items.${id}.name`)}`}
                        >
                          {meta.applicationUrl ? t("viewWebsite") : t("viewLive")}
                          <ExternalLink />
                        </a>
                      </Button>
                    ) : null}
                    {meta.applicationUrl ? (
                      <Button asChild variant="outline" className="w-full rounded-full sm:w-auto">
                        <a
                          href={meta.applicationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${t("viewApplication")} — ${t(`items.${id}.name`)}`}
                        >
                          {t("viewApplication")}
                          <ExternalLink />
                        </a>
                      </Button>
                    ) : null}
                    <Button asChild variant="outline" className="w-full rounded-full sm:w-auto">
                      <a href={`#${highlightsId}`}>
                        {t("viewCaseStudy")}
                        <ArrowUpRight />
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="w-full rounded-full sm:w-auto">
                      <a href={`#${sidebarId}`}>{t("viewProjectDetails")}</a>
                    </Button>
                  </>
                ) : (
                  <>
                    {meta.url ? (
                      <Button asChild className="w-full rounded-full sm:w-auto">
                        <a
                          href={meta.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${t("viewLive")} — ${t(`items.${id}.name`)}`}
                        >
                          {t("viewLive")}
                          <ExternalLink />
                        </a>
                      </Button>
                    ) : null}
                    <Button asChild variant="outline" className="w-full rounded-full sm:w-auto">
                      <a href="#contact">{t("contactCta")}</a>
                    </Button>
                  </>
                )}
              </div>
            </div>

            <div
              id={sidebarId}
              className="scroll-mt-28 space-y-8 lg:border-l lg:border-border lg:pl-10 dark:lg:border-white/[0.06] xl:pl-12"
            >
              <div>
                <p className="field-label">{t("roleLabel")}</p>
                <p className="mt-2 text-base font-medium text-foreground">
                  {t(`items.${id}.role`)}
                </p>
              </div>

              <div>
                <p className="field-label">{t("responsibilitiesLabel")}</p>
                <ul className="mt-4 space-y-3">
                  {meta.responsibilityKeys.map((key) => (
                    <li
                      key={key}
                      className="flex gap-3 text-[15px] leading-relaxed text-muted-foreground"
                    >
                      <span
                        aria-hidden
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/60"
                      />
                      <span>{t(`items.${id}.responsibilities.${key}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </article>

      {meta.highlightKeys?.length ? (
        <div id={highlightsId} className="scroll-mt-28 space-y-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {meta.highlightKeys.map((key) => (
              <div
                key={key}
                className={cn(
                  "surface-card p-5 md:p-6",
                  "border-border dark:border-white/[0.06]"
                )}
              >
                <h4 className="text-[15px] font-semibold tracking-tight text-foreground">
                  {t(`items.${id}.highlights.${key}.title`)}
                </h4>
                <p className="text-body mt-2 text-sm leading-relaxed">
                  {t(`items.${id}.highlights.${key}.description`)}
                </p>
              </div>
            ))}
          </div>

          {meta.statisticKeys?.length ? (
            <div className="surface-card p-5 md:p-6">
              <p className="field-label mb-3">{t("statisticsLabel")}</p>
              <div className="flex flex-wrap gap-2">
                {meta.statisticKeys.map((key) => (
                  <Badge
                    key={key}
                    variant="outline"
                    className="rounded-full px-3.5 py-1.5 text-[13px] font-medium"
                  >
                    {t(`items.${id}.statistics.${key}`)}
                  </Badge>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
