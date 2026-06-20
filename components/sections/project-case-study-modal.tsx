"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ExternalLink, X } from "lucide-react";
import { useTranslations } from "next-intl";

import { ProjectCaseStudyContent } from "@/components/sections/project-case-study-content";
import { ProjectEngagementCard } from "@/components/sections/project-engagement-card";
import { Button } from "@/components/ui/button";
import type { PortfolioProjectId } from "@/lib/data";
import { isAppiExecutorProject, productMeta } from "@/lib/data";
import { cn } from "@/lib/utils";

function useHasMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

function getProjectUrl(id: PortfolioProjectId) {
  const meta = productMeta[id];
  if (meta.cta === "enterprise") {
    return meta.applicationUrl ?? meta.url;
  }
  return meta.url;
}

function ModalHeroImage({
  image,
  alt,
  name,
  category,
}: {
  image?: string;
  alt: string;
  name: string;
  category: string;
}) {
  const [hasError, setHasError] = useState(false);
  const showImage = Boolean(image) && !hasError;

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-surface-elevated">
      {showImage ? (
        <Image
          src={image!}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 720px"
          className="object-cover object-top"
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

function ModalExternalLinks({ id }: { id: PortfolioProjectId }) {
  const t = useTranslations("projects");
  const meta = productMeta[id];
  const projectUrl = getProjectUrl(id);
  const urls = meta.storeAppUrls;
  const hasStoreLinks = Boolean(urls?.android || urls?.ios);

  if (!projectUrl && !hasStoreLinks) return null;

  const linkBtnClass =
    "project-showcase-btn h-auto min-h-10 justify-center gap-2 font-medium";

  return (
    <div className="border-t border-border pt-6 dark:border-white/[0.06]">
      <p className="field-label mb-3">{t("externalLinksLabel")}</p>
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        {projectUrl ? (
          <Button
            asChild
            size="sm"
            className={linkBtnClass}
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

        {urls?.android ? (
          <Button asChild variant="outline" size="sm" className={linkBtnClass}>
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

        {urls?.ios ? (
          <Button asChild variant="outline" size="sm" className={linkBtnClass}>
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
      </div>
    </div>
  );
}

interface ProjectCaseStudyModalProps {
  projectId: PortfolioProjectId | null;
  onClose: () => void;
}

export function ProjectCaseStudyModal({
  projectId,
  onClose,
}: ProjectCaseStudyModalProps) {
  const t = useTranslations("projects");
  const reduceMotion = useReducedMotion();
  const mounted = useHasMounted();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!projectId) return;

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [projectId, handleKeyDown]);

  if (!mounted) return null;

  const meta = projectId ? productMeta[projectId] : null;
  const isDevocion = meta?.theme === "devocion";

  return createPortal(
    <AnimatePresence>
      {projectId && meta ? (
        <motion.div
          key={projectId}
          role="presentation"
          className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4 md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.2 }}
        >
          <motion.button
            type="button"
            aria-label={t("closeModal")}
            className="absolute inset-0 bg-black/45 backdrop-blur-md dark:bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${projectId}-modal-title`}
            className={cn(
              "project-modal-panel surface-card relative z-10 flex max-h-[92vh] w-full flex-col overflow-hidden sm:max-h-[88vh] sm:max-w-2xl md:max-w-3xl",
              isDevocion && "devocion-case-study"
            )}
            initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 16, scale: 0.98 }
            }
            transition={{ duration: reduceMotion ? 0 : 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 dark:border-white/[0.06] sm:px-6">
              <div className="min-w-0 pr-2">
                <p className="section-indicator text-[11px]">
                  {t(`items.${projectId}.category`)}
                </p>
                <h2
                  id={`${projectId}-modal-title`}
                  className="mt-1 text-xl font-semibold tracking-[-0.03em] text-foreground sm:text-2xl"
                >
                  {t(`items.${projectId}.name`)}
                </h2>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onClose}
                aria-label={t("closeModal")}
                className="project-showcase-btn h-9 w-9 shrink-0 cursor-pointer p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="overflow-y-auto overscroll-contain px-5 py-5 sm:px-6 sm:py-6">
              <ModalHeroImage
                image={meta.image}
                alt={t(`items.${projectId}.imageAlt`)}
                name={t(`items.${projectId}.name`)}
                category={t(`items.${projectId}.category`)}
              />

              {isAppiExecutorProject(projectId) ? (
                <ProjectEngagementCard id={projectId} className="mt-5" />
              ) : (
                <p className="mt-5 text-sm font-medium text-foreground">
                  {t("roleLabel")}: {t(`items.${projectId}.role`)}
                </p>
              )}

              <div className="mt-6">
                <ProjectCaseStudyContent id={projectId} />
              </div>

              <ModalExternalLinks id={projectId} />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
