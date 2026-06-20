"use client";

import { useTranslations } from "next-intl";

import { isAppiExecutorProject, type PortfolioProjectId } from "@/lib/data";
import { cn } from "@/lib/utils";

interface ProjectEngagementCardProps {
  id: PortfolioProjectId;
  className?: string;
  compact?: boolean;
}

export function ProjectEngagementCard({
  id,
  className,
  compact = false,
}: ProjectEngagementCardProps) {
  const t = useTranslations("projects");
  const isAppiProject = isAppiExecutorProject(id);
  const clientName =
    isAppiProject && t.has(`items.${id}.engagement.endClient`)
      ? t(`items.${id}.engagement.endClient`)
      : t(`items.${id}.name`);
  const companyName = isAppiProject
    ? t("executorCompanyName")
    : id === "devocion"
      ? t("ownProjectCompanyName")
      : t("independentCompanyName");
  const hasParticipationNote =
    isAppiProject && t.has(`items.${id}.engagement.participationNote`);

  if (compact) {
    return (
      <div className={cn("mt-4 flex flex-wrap gap-2", className)}>
        <span className="project-context-chip">
          {t("engagement.endClientLabel")}: {clientName}
        </span>
        <span className="project-context-chip">
          {t("engagement.executorCompanyLabel")}: {companyName}
        </span>
        <span className="project-context-chip">
          {t("engagement.roleLabel")}: {t(`items.${id}.role`)}
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "project-engagement-card mt-4",
        compact && "project-engagement-card--compact",
        className
      )}
    >
      <dl className={cn("grid gap-3 sm:grid-cols-3 sm:gap-4", compact && "gap-2.5 sm:gap-3")}>
        <div className="min-w-0">
          <dt className="project-engagement-label">{t("engagement.endClientLabel")}</dt>
          <dd className="project-engagement-value mt-1">{clientName}</dd>
        </div>
        <div className="min-w-0">
          <dt className="project-engagement-label">{t("engagement.executorCompanyLabel")}</dt>
          <dd className="project-engagement-value mt-1">{companyName}</dd>
        </div>
        <div className="min-w-0">
          <dt className="project-engagement-label">{t("engagement.roleLabel")}</dt>
          <dd className="project-engagement-value mt-1">{t(`items.${id}.role`)}</dd>
        </div>
      </dl>
      {hasParticipationNote ? (
        <p className="text-body mt-3.5 text-[13px] leading-relaxed sm:text-sm">
          {t(`items.${id}.engagement.participationNote`)}
        </p>
      ) : null}
    </div>
  );
}
