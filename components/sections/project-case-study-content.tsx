"use client";

import {
  BarChart3,
  Bell,
  BookOpen,
  Building2,
  Cloud,
  Container,
  Database,
  Download,
  Factory,
  FileStack,
  Flame,
  FolderOpen,
  Globe,
  Globe2,
  Handshake,
  Heart,
  KeyRound,
  Languages,
  LayoutDashboard,
  MapPin,
  Monitor,
  Newspaper,
  Package,
  PenTool,
  QrCode,
  RefreshCw,
  Share2,
  Sheet,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sparkles,
  TabletSmartphone,
  Tags,
  TrendingUp,
  Upload,
  User,
  UserCircle,
  Users,
  Video,
  WifiOff,
  Workflow,
  Zap,
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
  n8nAutomations: Zap,
  brevoEmail: Bell,
  openAiForms: Sparkles,
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
  msmpackaging: {
    multiLanguage: Languages,
    internationalSeo: Globe,
    productCatalog: Tags,
    leadGeneration: TrendingUp,
    corporateBranding: LayoutDashboard,
    performanceOptimization: Zap,
  },
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
  "8": Bell,
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
  pushNotifications: Bell,
};

const enfoqueglobalHighlightIcons: Record<string, LucideIcon> = {
  churchManagement: Building2,
  digitalMentorship: Handshake,
  communityFeed: Newspaper,
  resourceLibrary: FolderOpen,
  excelReports: Sheet,
  documentSharing: Share2,
  multiCountry: Globe2,
  mobileApp: Smartphone,
  webPlatform: Monitor,
};

const area33HighlightIcons: Record<string, LucideIcon> = {
  videoCourses: Video,
  learningPaths: BookOpen,
  progressTracking: TrendingUp,
  userManagement: UserCircle,
  firebaseInfra: Cloud,
  androidApp: Smartphone,
  iosApp: TabletSmartphone,
  hybridArchitecture: Zap,
};

const ubicaturepuestoHighlightIcons: Record<string, LucideIcon> = {
  quoteEngine: FileStack,
  emailAutomation: RefreshCw,
  phpWebService: Cloud,
  specializedMarketplace: ShoppingCart,
  orderManagement: Package,
  adminPanel: LayoutDashboard,
  productCatalog: Tags,
};

const msmpackagingHighlightIcons: Record<string, LucideIcon> = {
  astroArchitecture: Monitor,
  advancedSeo: Globe,
  multiLanguageExperience: Languages,
  productCatalog: Tags,
  highPerformance: Zap,
  responsiveDesign: TabletSmartphone,
};

const churchapiHighlightIcons: Record<string, LucideIcon> = {
  jwtAuth: KeyRound,
  fullCrud: RefreshCw,
  layeredArchitecture: Workflow,
  efMigrations: Database,
  healthChecks: ShieldCheck,
  serilogLogging: FileStack,
  envVariables: Cloud,
  dockerMultiStage: Container,
  azureContainerApps: Cloud,
  azureSql: Database,
  automatedTests: Sparkles,
};

const projectHighlightIcons: Partial<
  Record<PortfolioProjectId, Record<string, LucideIcon>>
> = {
  devocion: devocionHighlightIcons,
  veyco: veycoHighlightIcons,
  enfoqueglobal: enfoqueglobalHighlightIcons,
  area33: area33HighlightIcons,
  ubicaturepuesto: ubicaturepuestoHighlightIcons,
  msmpackaging: msmpackagingHighlightIcons,
  churchapi: churchapiHighlightIcons,
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
              <div className="flex items-center gap-2">
                {Icon ? (
                  <Icon className="h-4 w-4 shrink-0 text-[#059669]" aria-hidden />
                ) : null}
                <h4 className="text-sm font-semibold tracking-tight text-[#059669]">
                  {t(`items.${id}.${contentKey}.${key}.title`)}
                </h4>
              </div>
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

function ArchitectureSection({
  id,
  layerKeys,
}: {
  id: PortfolioProjectId;
  layerKeys: readonly string[];
}) {
  const t = useTranslations("projects");

  return (
    <div>
      <p className="field-label mb-3">{t("architectureLabel")}</p>
      <div className="featured-project-architecture featured-project-architecture--compact">
        {layerKeys.map((key, index) => (
          <div key={key} className="featured-project-architecture__layer">
            <div className="featured-project-architecture__node">
              <span>{t(`items.${id}.architecture.${key}`)}</span>
            </div>
            {index < layerKeys.length - 1 ? (
              <span className="featured-project-architecture__arrow" aria-hidden>
                ↓
              </span>
            ) : null}
          </div>
        ))}
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
      if (platform === "web" || platform === "android" || platform === "ios") {
        return t(`platforms.${platform}`);
      }
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
      {t.has(`items.${id}.longDescription`) ? (
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
  const architectureSection = meta.architectureLayerKeys?.length ? (
    <ArchitectureSection id={id} layerKeys={meta.architectureLayerKeys} />
  ) : null;

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
          {architectureSection}
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
