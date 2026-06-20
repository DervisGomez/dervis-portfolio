"use client";

import {
  BarChart3,
  BookOpen,
  Building2,
  Download,
  Factory,
  FileStack,
  Flame,
  Globe,
  Globe2,
  Handshake,
  Heart,
  Languages,
  LayoutDashboard,
  MapPin,
  Package,
  PenTool,
  QrCode,
  RefreshCw,
  Sheet,
  ShoppingCart,
  Smartphone,
  Tags,
  TrendingUp,
  Upload,
  User,
  UserCircle,
  Users,
  WifiOff,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import type { PortfolioProjectId } from "@/lib/data";
import { productMeta } from "@/lib/data";
import { cn } from "@/lib/utils";

const HIGHLIGHT_CARD_CLASS =
  "rounded-xl border border-[color-mix(in_srgb,#059669_22%,var(--border))] bg-[color-mix(in_srgb,#059669_10%,var(--card))] p-4";

const formidavelCapabilityIcons: Record<string, LucideIcon> = {
  gpsRoutes: MapPin,
  digitalMarkup: PenTool,
  offline: WifiOff,
  qr: QrCode,
  excel: Sheet,
  pdf: FileStack,
};

const enaexCapabilityIcons: Record<string, LucideIcon> = {
  multiCountry: Globe,
  multiLanguage: Languages,
  organizationalAnalytics: BarChart3,
  plantStats: Factory,
  areaStats: Building2,
  countryStats: Globe2,
  userMetrics: User,
  categoryMetrics: Tags,
  bulkImport: Upload,
  enterpriseExport: Download,
};

const projectCapabilityIcons: Partial<
  Record<PortfolioProjectId, Record<string, LucideIcon>>
> = {
  formidavel: formidavelCapabilityIcons,
  enaex: enaexCapabilityIcons,
};

const devocionHighlightIcons: Record<string, LucideIcon> = {
  "0": BookOpen,
  "1": Heart,
  "2": TrendingUp,
  "3": Flame,
  "4": Smartphone,
  "5": LayoutDashboard,
  "6": UserCircle,
  "7": RefreshCw,
};

const veycoHighlightIcons: Record<string, LucideIcon> = {
  marketplace: ShoppingCart,
  favorites: Heart,
  orders: Package,
  catalog: Tags,
  userRoles: Users,
  adminPanel: LayoutDashboard,
  activitySummaries: BarChart3,
  commercialEcosystem: Handshake,
};

const projectHighlightIcons: Partial<
  Record<PortfolioProjectId, Record<string, LucideIcon>>
> = {
  devocion: devocionHighlightIcons,
  veyco: veycoHighlightIcons,
};

function FeatureHighlightGrid({
  id,
  label,
  keys,
  contentKey,
  icons,
}: {
  id: PortfolioProjectId;
  label: string;
  keys: readonly string[];
  contentKey: "highlights" | "capabilities";
  icons?: Record<string, LucideIcon>;
}) {
  const t = useTranslations("projects");

  return (
    <div>
      <p className="field-label mb-3">{label}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {keys.map((key) => {
          const Icon = icons?.[key];

          return (
            <div key={key} className={HIGHLIGHT_CARD_CLASS}>
              {Icon ? (
                <Icon className="mb-2.5 h-4 w-4 text-[#059669]" aria-hidden />
              ) : null}
              <h4 className="text-sm font-semibold tracking-tight text-[#059669]">
                {t(`items.${id}.${contentKey}.${key}.title`)}
              </h4>
              <p className="text-body mt-1.5 text-sm leading-snug">
                {t(`items.${id}.${contentKey}.${key}.description`)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function PlatformsSection({ id }: { id: PortfolioProjectId }) {
  const t = useTranslations("projects");
  const meta = productMeta[id];
  const badgeKeys =
    meta.platformBadgeKeys ?? meta.platformKeys ?? meta.platforms ?? [];

  if (!badgeKeys.length) return null;

  const getBadgeLabel = (platform: string) => {
    if (meta.platformBadgeKeys) {
      return t(`items.${id}.platformBadges.${platform}`);
    }
    if (meta.platformKeys) {
      return t(`items.${id}.platforms.${platform}`);
    }
    return t(`platforms.${platform as "web" | "android" | "ios"}`);
  };

  return (
    <div>
      <p className="field-label mb-3">{t("platformsLabel")}</p>
      <div className="flex flex-wrap gap-2">
        {badgeKeys.map((platform) => {
          const href = meta.platformUrls?.[platform];
          const label = getBadgeLabel(platform);

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
                  className="rounded-full px-3 py-1 text-xs font-medium transition-colors hover:border-brand/30 hover:bg-brand-subtle hover:text-brand"
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
              className="rounded-full px-3 py-1 text-xs font-medium"
            >
              {label}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}

export function ProjectCaseStudyContent({ id }: { id: PortfolioProjectId }) {
  const t = useTranslations("projects");
  const meta = productMeta[id];
  const isDevocion = meta.theme === "devocion";
  const isEnaex = id === "enaex";

  const contextSection = (
    <div>
      <p className="field-label mb-3">{t("contextLabel")}</p>
      <p className="text-body text-sm leading-relaxed">
        {t(`items.${id}.description`)}
      </p>
      {id === "devocion" ? (
        <p className="text-body mt-3 text-sm leading-relaxed">
          {t(`items.${id}.longDescription`)}
        </p>
      ) : null}
    </div>
  );

  const resultsSection = (
    <div>
      <p className="field-label mb-3">{t("resultsLabel")}</p>
      <p className="text-sm font-semibold tracking-tight text-foreground">
        {t(`items.${id}.impact.metric`)}
      </p>
      <p className="text-body mt-2 text-sm leading-relaxed">
        {t(`items.${id}.impact.description`)}
      </p>
    </div>
  );

  const organizationalImpactSection = meta.organizationalImpact ? (
    <div>
      <p className="field-label mb-3">{t("organizationalImpactLabel")}</p>
      <p className="text-body text-sm leading-relaxed">
        {t(`items.${id}.organizationalImpact`)}
      </p>
    </div>
  ) : null;

  const businessCapabilitiesSection = meta.businessCapabilityKeys?.length ? (
    <FeatureHighlightGrid
      id={id}
      label={t("businessCapabilitiesLabel")}
      keys={meta.businessCapabilityKeys}
      contentKey="capabilities"
      icons={projectCapabilityIcons[id]}
    />
  ) : null;

  const technicalHighlightsSection = meta.highlightKeys?.length ? (
    <FeatureHighlightGrid
      id={id}
      label={t("technicalHighlightsLabel")}
      keys={meta.highlightKeys}
      contentKey="highlights"
      icons={projectHighlightIcons[id]}
    />
  ) : null;

  const responsibilitiesSection = (
    <div>
      <p className="field-label mb-3">{t("responsibilitiesLabel")}</p>
      <ul className="space-y-2.5">
        {meta.responsibilityKeys.map((key) => (
          <li
            key={key}
            className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
          >
            <span
              aria-hidden
              className={cn(
                "mt-2 h-1 w-1 shrink-0 rounded-full",
                isDevocion ? "project-bullet" : "bg-muted-foreground/60"
              )}
            />
            <span>{t(`items.${id}.responsibilities.${key}`)}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  const technologiesSection = (
    <div>
      <p className="field-label mb-3">{t("technologiesLabel")}</p>
      <div className="flex flex-wrap gap-2">
        {meta.stack.map((tech) => (
          <Badge key={tech} variant="tech" className="text-xs">
            {tech}
          </Badge>
        ))}
      </div>
    </div>
  );

  const statisticsSection = meta.statisticKeys?.length ? (
    <div>
      <p className="field-label mb-3">{t("statisticsLabel")}</p>
      <div className="flex flex-wrap gap-2">
        {meta.statisticKeys.map((key) => (
          <Badge
            key={key}
            variant="outline"
            className="rounded-full px-3 py-1 text-xs font-medium"
          >
            {t(`items.${id}.statistics.${key}`)}
          </Badge>
        ))}
      </div>
    </div>
  ) : null;

  const platformsSection = <PlatformsSection id={id} />;

  return (
    <div className="space-y-6">
      {contextSection}
      {resultsSection}
      {organizationalImpactSection}
      {isEnaex ? (
        <>
          {technologiesSection}
          {businessCapabilitiesSection}
          {responsibilitiesSection}
        </>
      ) : (
        <>
          {businessCapabilitiesSection}
          {technicalHighlightsSection}
          {responsibilitiesSection}
          {technologiesSection}
          {statisticsSection}
          {platformsSection}
        </>
      )}
    </div>
  );
}
