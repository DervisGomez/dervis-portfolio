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
  prominent,
}: {
  image?: string;
  alt: string;
  category: string;
  name: string;
  priority?: boolean;
  prominent?: boolean;
}) {
  const [hasError, setHasError] = useState(false);
  const showImage = Boolean(image) && !hasError;

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-surface-elevated",
        prominent ? "aspect-[16/9] md:aspect-[2.05/1]" : "aspect-[16/10] md:aspect-[2/1]"
      )}
    >
      <div className="absolute inset-x-0 top-0 z-10 flex h-9 items-center gap-1.5 border-b border-border bg-card/90 px-3 backdrop-blur-sm sm:h-10 sm:gap-2 sm:px-5 dark:border-white/[0.06]">
        <span className="h-2 w-2 rounded-full bg-border dark:bg-white/10" aria-hidden />
        <span className="h-2 w-2 rounded-full bg-border dark:bg-white/10" aria-hidden />
        <span className="h-2 w-2 rounded-full bg-border dark:bg-white/10" aria-hidden />
        <span className="field-label ml-2 truncate normal-case">{category}</span>
      </div>

      {showImage ? (
        <div className="absolute inset-0 pt-9 sm:pt-10">
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
        <div className="flex h-full flex-col items-center justify-center px-4 pt-9 text-center sm:px-6 sm:pt-10">
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
  const isDevocion = meta.theme === "devocion";
  const caseStudyId = `${id}-case-study`;
  const highlightsId = `${id}-highlights`;
  const sidebarId = `${id}-sidebar`;

  const platformSummary = isDevocion
    ? t(`items.${id}.platformSummary`)
    : null;

  return (
    <div
      className={cn("space-y-4", isDevocion && "devocion-case-study")}
    >
      <article
        id={caseStudyId}
        className={cn(
          "surface-card overflow-hidden",
          meta.prominent &&
            "ring-1 ring-border shadow-[var(--shadow-card-hover)] dark:ring-white/[0.08]",
          isDevocion && "ring-[var(--project-accent-border)]"
        )}
      >
        <ProjectScreenshot
          image={meta.image}
          alt={t(`items.${id}.imageAlt`)}
          category={t(`items.${id}.category`)}
          name={t(`items.${id}.name`)}
          priority={id === "veyco" || id === "enaex" || id === "formidavel" || id === "devocion"}
          prominent={meta.prominent}
        />

        <div className="p-5 sm:p-6 md:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-14 xl:gap-16">
            <div className="min-w-0">
              <div className="flex flex-wrap items-start gap-2.5 sm:items-center sm:gap-3">
                <h3
                  className={cn(
                    "min-w-0 flex-1 heading-card md:text-3xl lg:text-[2rem]",
                    meta.prominent && "text-[1.5rem] sm:text-[1.75rem] md:text-[2.125rem] lg:text-[2.25rem]"
                  )}
                >
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
                {meta.status === "activeDevelopment" ? (
                  <Badge
                    variant="outline"
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-medium",
                      isDevocion
                        ? "border-[var(--project-accent-border)] bg-[var(--project-accent-subtle)] text-[var(--project-accent)]"
                        : "border-border text-foreground"
                    )}
                  >
                    {t("activeDevelopmentStatus")}
                  </Badge>
                ) : null}
              </div>

              {platformSummary ? (
                <p className="text-caption mt-3 font-medium">{platformSummary}</p>
              ) : null}

              <p className="text-body-lg mt-5 max-w-2xl">
                {t(`items.${id}.description`)}
              </p>

              {isDevocion ? (
                <p className="text-body mt-4 max-w-2xl">
                  {t(`items.${id}.longDescription`)}
                </p>
              ) : null}

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

              <div
                className={cn(
                  "mt-8 rounded-xl border p-5 md:p-6",
                  isDevocion
                    ? "project-impact-card"
                    : "border-border bg-muted/40 dark:bg-muted/20"
                )}
              >
                <p className="field-label mb-2">{t("impactLabel")}</p>
                <p
                  className={cn(
                    "text-lg font-semibold tracking-tight md:text-xl",
                    isDevocion ? "project-accent-text" : "text-foreground"
                  )}
                >
                  {t(`items.${id}.impact.metric`)}
                </p>
                <p className="text-body mt-2">
                  {t(`items.${id}.impact.description`)}
                </p>
              </div>

              <div className="mt-8">
                <p className="field-label mb-3">{t("technologiesLabel")}</p>
                <div className="flex flex-wrap gap-2">
                  {meta.stack.map((tech) =>
                    isDevocion ? (
                      <div
                        key={tech}
                        className="project-tech-badge inline-flex rounded-full border px-3.5 py-1.5 text-[13px] font-medium"
                      >
                        {tech}
                      </div>
                    ) : (
                      <Badge key={tech} variant="tech">
                        {tech}
                      </Badge>
                    )
                  )}
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3">
                {meta.cta === "product" ? (
                  <>
                    {meta.url ? (
                      <Button
                        asChild
                        className={cn(
                          "btn-mobile-wrap w-full rounded-full sm:w-auto",
                          isDevocion &&
                            "bg-[var(--project-accent)] text-white hover:bg-[#047857]"
                        )}
                      >
                        <a href={meta.url}>
                          {t("viewProject")}
                          <ArrowUpRight />
                        </a>
                      </Button>
                    ) : null}
                    <Button
                      disabled
                      variant="outline"
                      className="btn-mobile-wrap w-full rounded-full sm:w-auto"
                    >
                      {t("caseStudyComingSoon")}
                    </Button>
                  </>
                ) : meta.cta === "enterprise" ? (
                  <>
                    {meta.url ? (
                      <Button asChild className="btn-mobile-wrap w-full rounded-full sm:w-auto">
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
                      <Button asChild variant="outline" className="btn-mobile-wrap w-full rounded-full sm:w-auto">
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
                    <Button asChild variant="outline" className="btn-mobile-wrap w-full rounded-full sm:w-auto">
                      <a href={`#${highlightsId}`}>
                        {t("viewCaseStudy")}
                        <ArrowUpRight />
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="btn-mobile-wrap w-full rounded-full sm:w-auto">
                      <a href={`#${sidebarId}`}>{t("viewProjectDetails")}</a>
                    </Button>
                  </>
                ) : (
                  <>
                    {meta.url ? (
                      <Button asChild className="btn-mobile-wrap w-full rounded-full sm:w-auto">
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
                    <Button asChild variant="outline" className="btn-mobile-wrap w-full rounded-full sm:w-auto">
                      <a href="#contact">{t("contactCta")}</a>
                    </Button>
                  </>
                )}
              </div>
            </div>

            <div
              id={sidebarId}
              className="space-y-8 lg:border-l lg:border-border lg:pl-10 dark:lg:border-white/[0.06] xl:pl-12"
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
                        className={cn(
                          "mt-2 h-1 w-1 shrink-0 rounded-full",
                          isDevocion
                            ? "project-bullet"
                            : "bg-muted-foreground/60"
                        )}
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
        <div id={highlightsId} className="space-y-4">
          {isDevocion ? (
            <p className="field-label">{t("technicalHighlightsLabel")}</p>
          ) : null}
          <div
            className={cn(
              "grid gap-3 sm:grid-cols-2",
              meta.highlightKeys.length > 4 ? "lg:grid-cols-4" : "lg:grid-cols-4"
            )}
          >
            {meta.highlightKeys.map((key) => (
              <div
                key={key}
                className={cn(
                  "surface-card p-4 sm:p-5 md:p-6",
                  isDevocion && "ring-[var(--project-accent-border)]"
                )}
              >
                <h4
                  className={cn(
                    "text-[15px] font-semibold tracking-tight",
                    isDevocion ? "project-accent-text" : "text-foreground"
                  )}
                >
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
