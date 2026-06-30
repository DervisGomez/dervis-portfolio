"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Activity, Code2, ExternalLink, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { ProjectEngagementCard } from "@/components/sections/project-engagement-card";
import type { PortfolioProjectId } from "@/lib/data";
import { productMeta, projectImpactHighlights } from "@/lib/data";
import { cn } from "@/lib/utils";

const MAX_VISIBLE_TECH = 6;

interface ProjectShowcaseProps {
  id: PortfolioProjectId;
  onOpenCaseStudy: () => void;
}

function ProjectHeroImage({
  id,
  image,
  alt,
  name,
  category,
}: {
  id: PortfolioProjectId;
  image?: string;
  alt: string;
  name: string;
  category: string;
}) {
  const [hasError, setHasError] = useState(false);
  const showImage = Boolean(image) && !hasError;
  const isMarketingHero = id === "churchapi";
  const priority =
    id === "churchapi" ||
    id === "devocion" ||
    id === "veyco" ||
    id === "enaex" ||
    id === "formidavel";

  return (
    <div
      className={cn(
        "relative aspect-[16/9] w-full overflow-hidden md:aspect-[2/1]",
        isMarketingHero ? "bg-[#0a1628]" : "bg-surface-elevated"
      )}
    >
      {showImage ? (
        <Image
          src={image!}
          alt={alt}
          fill
          priority={priority}
          unoptimized={isMarketingHero}
          sizes="(max-width: 1080px) 100vw, 1080px"
          className={cn(
            isMarketingHero
              ? "object-contain"
              : "object-cover object-top transition-transform duration-500 group-hover:scale-[1.012]"
          )}
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center px-6 text-center">
          <p className="field-label text-brand">{category}</p>
          <p className="heading-card mt-2 text-foreground/20">{name}</p>
        </div>
      )}
    </div>
  );
}

function ProjectCapabilityChips({ id }: { id: PortfolioProjectId }) {
  const t = useTranslations("projects.impactOverview");
  const highlights = projectImpactHighlights[id as keyof typeof projectImpactHighlights];

  if (!highlights) return null;

  return (
    <div className="mt-5">
      <p className="field-label mb-2.5 opacity-80">{t(`${id}.type`)}</p>
      <ul className="grid gap-2 sm:grid-cols-2">
      {highlights.map((key) => (
        <li
          key={key}
          className="project-capability-chip"
        >
          <Sparkles className="h-3.5 w-3.5 shrink-0 text-brand/85" aria-hidden />
          <span>{t(`${id}.highlights.${key}`)}</span>
        </li>
      ))}
      </ul>
    </div>
  );
}

function TechStack({ stack }: { stack: string[] }) {
  const t = useTranslations("projects");
  const visible = stack.slice(0, MAX_VISIBLE_TECH);
  const remaining = stack.length - MAX_VISIBLE_TECH;

  return (
    <div>
      <p className="field-label mb-2.5 opacity-80">{t("technologiesLabel")}</p>
      <div className="flex flex-wrap gap-1.5">
        {visible.map((tech) => (
          <span key={tech} className="project-tech-chip">
            {tech}
          </span>
        ))}
        {remaining > 0 ? (
          <span className="project-tech-chip border-dashed opacity-70">
            {t("moreTech", { count: remaining })}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function StoreAppButtons({ id }: { id: PortfolioProjectId }) {
  const t = useTranslations("projects");
  const meta = productMeta[id];
  const urls = meta.storeAppUrls;

  if (!urls?.android && !urls?.ios) return null;

  const storeBtnClass =
    "project-showcase-btn w-full cursor-pointer justify-center gap-2 font-medium";

  return (
    <>
      {urls.android ? (
        <Button asChild variant="outline" size="sm" className={storeBtnClass}>
          <a
            href={urls.android}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t("googlePlay")} — ${t(`items.${id}.name`)}`}
          >
            <Image
              src="/store/google-play.svg"
              alt=""
              width={16}
              height={16}
              className="shrink-0 opacity-90"
            />
            {t("googlePlay")}
          </a>
        </Button>
      ) : null}

      {urls.ios ? (
        <Button asChild variant="outline" size="sm" className={storeBtnClass}>
          <a
            href={urls.ios}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t("appStore")} — ${t(`items.${id}.name`)}`}
          >
            <Image
              src="/store/app-store.svg"
              alt=""
              width={16}
              height={16}
              className="shrink-0 opacity-90 dark:invert"
            />
            {t("appStore")}
          </a>
        </Button>
      ) : null}
    </>
  );
}

function ExternalLinkButtons({ id }: { id: PortfolioProjectId }) {
  const t = useTranslations("projects");
  const links = productMeta[id].externalLinks;

  if (!links?.github && !links?.healthCheck) return null;

  const btnClass =
    "project-showcase-btn w-full cursor-pointer justify-center gap-2 font-medium";
  const githubReady = links.github && links.github !== "TODO";

  return (
    <>
      {links.github ? (
        githubReady ? (
          <Button asChild variant="outline" size="sm" className={btnClass}>
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t("githubRepository")} — ${t(`items.${id}.name`)}`}
            >
              <Code2 className="h-3.5 w-3.5" aria-hidden />
              {t("githubRepository")}
            </a>
          </Button>
        ) : null
      ) : null}

      {links.healthCheck ? (
        <Button asChild variant="outline" size="sm" className={btnClass}>
          <a
            href={links.healthCheck}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t("healthCheck")} — ${t(`items.${id}.name`)}`}
          >
            <Activity className="h-3.5 w-3.5" aria-hidden />
            {t("healthCheck")}
          </a>
        </Button>
      ) : null}
    </>
  );
}

function getProjectUrl(id: PortfolioProjectId) {
  const meta = productMeta[id];
  if (meta.cta === "enterprise") {
    return meta.applicationUrl ?? meta.url;
  }
  return meta.url;
}

function ProjectActions({
  id,
  onOpenCaseStudy,
}: {
  id: PortfolioProjectId;
  onOpenCaseStudy: () => void;
}) {
  const t = useTranslations("projects");
  const meta = productMeta[id];
  const projectUrl = getProjectUrl(id);

  return (
    <>
      {projectUrl ? (
        <Button
          asChild
          size="sm"
          className="project-showcase-btn w-full justify-center"
        >
          <a
            href={projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t("viewProject")} — ${t(`items.${id}.name`)}`}
          >
            {t("viewProject")}
            {meta.cta === "live" || meta.cta === "enterprise" ? (
              <ExternalLink className="h-3.5 w-3.5" />
            ) : (
              <ArrowUpRight className="h-3.5 w-3.5" />
            )}
          </a>
        </Button>
      ) : null}

      <Button
        type="button"
        variant="caseStudy"
        size="sm"
        onClick={onOpenCaseStudy}
        className="project-showcase-btn w-full cursor-pointer justify-center"
      >
        {t("viewCaseStudy")}
      </Button>
    </>
  );
}

export function ProjectShowcase({ id, onOpenCaseStudy }: ProjectShowcaseProps) {
  const t = useTranslations("projects");
  const meta = productMeta[id];
  const isDevocion = meta.theme === "devocion";

  return (
    <article
      id={`${id}-case-study`}
      className={cn(
        "project-showcase-card group surface-card overflow-hidden",
        isDevocion && "devocion-case-study ring-[var(--project-accent-border)]"
      )}
    >
      <ProjectHeroImage
        id={id}
        image={meta.image}
        alt={t(`items.${id}.imageAlt`)}
        name={t(`items.${id}.name`)}
        category={t(`items.${id}.category`)}
      />

      <div className="grid gap-8 p-6 md:grid-cols-2 md:gap-x-12 md:gap-y-8 md:p-8 lg:gap-x-16 lg:p-10">
        <div className="min-w-0">
          <h3 className="text-2xl font-semibold tracking-[-0.03em] text-foreground md:text-[1.75rem] lg:text-[2rem]">
            {t(`items.${id}.name`)}
          </h3>

          <p className="mt-3 text-[15px] leading-snug text-muted-foreground md:text-base md:leading-normal">
            {t(`items.${id}.subtitle`)}
          </p>

          <ProjectEngagementCard id={id} compact />

          <ProjectCapabilityChips id={id} />
        </div>

        <div className="min-w-0 md:pt-1">
          <TechStack stack={meta.stack} />
          <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <StoreAppButtons id={id} />
            <ExternalLinkButtons id={id} />
            <ProjectActions id={id} onOpenCaseStudy={onOpenCaseStudy} />
          </div>
        </div>
      </div>
    </article>
  );
}
