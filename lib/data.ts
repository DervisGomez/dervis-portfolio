export const siteConfig = {
  name: "Dervis Gómez",
  profileImage: "/Profile.png",
  heroImage: "/hero.png",
  heroMobileImage: "/hero-movil.png",
  cvUrl: "/CV.pdf",
  email: "dervisgomez77@gmail.com",
  linkedin: "https://linkedin.com/in/dervisgomez",
  github: "https://github.com/dervisgomez",
  whatsapp: "https://wa.me/573014587871",
};

/** URLs de las apps ENAEX en tiendas — actualizar `ios` cuando corresponda. */
export const enaexStoreUrls = {
  android:
    "https://play.google.com/store/apps/details?id=com.enaex.programareconocimientos",
  ios: "https://apps.apple.com/us/app/programa-de-reconocimiento/id1328394685?l=es-MX",
} as const;

export const veycoStoreUrls = {
  android: "https://play.google.com/store/apps/details?id=app.veycoo.co",
} as const;

export const enfoqueGlobalStoreUrls = {
  android:
    "https://play.google.com/store/apps/details?id=us.enfoquegloblal.app",
} as const;

export const area33StoreUrls = {
  android: "https://play.google.com/store/apps/details?id=cl.area33.app",
  ios: "https://apps.apple.com/cl/app/area33/id6740711768",
} as const;

export const trustMetricIds = [
  "experience",
  "projects",
  "mobile",
  "organizations",
] as const;

export type TrustMetricId = (typeof trustMetricIds)[number];

export const trustMetricsData: Record<
  TrustMetricId,
  {
    icon: "zap" | "rocket" | "smartphone" | "globe";
    value: string;
    labelKey:
      | "yearsExperience"
      | "projectsDelivered"
      | "mobileApps"
      | "organizations";
    counter?: { value: number; suffix: string };
  }
> = {
  experience: {
    icon: "zap",
    value: "9+",
    labelKey: "yearsExperience",
    counter: { value: 9, suffix: "+" },
  },
  projects: {
    icon: "rocket",
    value: "20+",
    labelKey: "projectsDelivered",
    counter: { value: 20, suffix: "+" },
  },
  mobile: {
    icon: "smartphone",
    value: "6+",
    labelKey: "mobileApps",
    counter: { value: 6, suffix: "+" },
  },
  organizations: {
    icon: "globe",
    value: "+10",
    labelKey: "organizations",
  },
};

export const heroTechnologies = [
  "Angular",
  "React",
  "Node.js",
  "TypeScript",
  "Firebase",
  "Next.js",
];

export const navAnchors = [
  { key: "projects" as const, href: "#projects" },
  { key: "experience" as const, href: "#experience" },
  { key: "stack" as const, href: "#stack" },
] as const;

export const featuredProductIds = [
  "devocion",
  "veyco",
  "enaex",
  "formidavel",
  "enfoqueglobal",
  "area33",
  "ubicatupuesto",
  "ubicaturepuesto",
  "msmpackaging",
  "vitrogourmet",
  "churchapi",
  "devocionadmin",
] as const;

export type PortfolioProjectId = (typeof featuredProductIds)[number];

/** @deprecated Use PortfolioProjectId */
export type FeaturedProductId = PortfolioProjectId;

export const primaryProductIds = [
  "devocion",
  "veyco",
  "enaex",
  "formidavel",
] as const satisfies readonly PortfolioProjectId[];

export const secondaryProductIds = [
  "enfoqueglobal",
  "area33",
  "ubicaturepuesto",
  "msmpackaging",
] as const satisfies readonly PortfolioProjectId[];

export const appiExecutorProjectIds = [
  "enaex",
  "formidavel",
  "area33",
  "msmpackaging",
] as const satisfies readonly PortfolioProjectId[];

export type AppiExecutorProjectId = (typeof appiExecutorProjectIds)[number];

export function isAppiExecutorProject(
  id: PortfolioProjectId
): id is AppiExecutorProjectId {
  return (appiExecutorProjectIds as readonly PortfolioProjectId[]).includes(id);
}

export const projectImpactHighlights: Record<
  (typeof primaryProductIds)[number],
  readonly string[]
> = {
  devocion: ["0", "1", "2", "3"],
  veyco: ["0", "1", "2", "3"],
  enaex: ["0", "1", "2", "3"],
  formidavel: ["0", "1", "2", "3"],
};

export const productMeta: Record<
  PortfolioProjectId,
  {
    image?: string;
    url?: string;
    applicationUrl?: string;
    stack: string[];
    responsibilityKeys: readonly string[];
    platforms?: readonly ("web" | "android" | "ios")[];
    platformKeys?: readonly string[];
    platformBadgeKeys?: readonly string[];
    platformUrls?: Partial<Record<string, string>>;
    storeAppUrls?: { android?: string; ios?: string };
    businessCapabilityKeys?: readonly string[];
    highlightKeys?: readonly string[];
    statisticKeys?: readonly string[];
    status?: "production" | "activeDevelopment";
    cta?: "live" | "enterprise" | "product";
    theme?: "devocion";
    prominent?: boolean;
    organizationalImpact?: boolean;
  }
> = {
  veyco: {
    image: "/veyco.png",
    url: "https://veycoo.com.co",
    storeAppUrls: {
      android: veycoStoreUrls.android,
    },
    stack: [
      "Angular",
      "Ionic",
      "Capacitor",
      "Node.js",
      "Express",
      "MongoDB",
      "TypeScript",
      "REST APIs",
    ],
    responsibilityKeys: ["0", "1", "2", "3", "4", "5", "6"],
    highlightKeys: [
      "marketplace",
      "favorites",
      "orders",
      "catalog",
      "userRoles",
      "adminPanel",
      "activitySummaries",
      "commercialEcosystem",
      "pushNotifications",
    ],
    status: "production",
    cta: "live",
  },
  area33: {
    image: "/area33.png",
    storeAppUrls: {
      android: area33StoreUrls.android,
      ios: area33StoreUrls.ios,
    },
    stack: [
      "Angular",
      "Ionic",
      "Capacitor",
      "Firebase",
      "Firestore",
      "Cloud Functions",
      "TypeScript",
    ],
    platforms: ["android", "ios"],
    highlightKeys: [
      "videoCourses",
      "learningPaths",
      "progressTracking",
      "userManagement",
      "firebaseInfra",
      "androidApp",
      "iosApp",
      "hybridArchitecture",
    ],
    status: "production",
    cta: "live",
    theme: "devocion",
    responsibilityKeys: ["0", "1", "2", "3", "4", "5"],
  },
  enaex: {
    image: "/enaex.png",
    url: "https://reconocimiento.enaex.com/",
    platformUrls: {
      web: "https://reconocimiento.enaex.com/",
    },
    storeAppUrls: {
      android: enaexStoreUrls.android,
      ios: enaexStoreUrls.ios,
    },
    stack: [
      "Angular",
      "Ionic",
      "Capacitor",
      "Firebase",
      "Cloud Functions",
      "REST APIs",
      "Microsoft Azure AD",
      "TypeScript",
    ],
    businessCapabilityKeys: [
      "multiCountry",
      "multiLanguage",
      "organizationalAnalytics",
      "plantStats",
      "areaStats",
      "countryStats",
      "userMetrics",
      "categoryMetrics",
      "bulkImport",
      "enterpriseExport",
    ],
    organizationalImpact: true,
    status: "production",
    cta: "enterprise",
    responsibilityKeys: ["0", "1", "2", "3", "4", "5", "6"],
  },
  formidavel: {
    image: "/formidavel.png",
    url: "https://formidavel.cl/",
    applicationUrl: "https://formidavel.app/",
    platformUrls: {
      webApp: "https://formidavel.app/",
    },
    stack: [
      "Angular",
      "Ionic",
      "Capacitor",
      "Firebase",
      "Firestore",
      "Cloud Functions",
      "TypeScript",
      "Dexie",
      "Chart.js",
      "QR Code",
      "n8n",
      "Brevo",
      "PDFMonkey",
      "OpenAI",
    ],
    platformKeys: ["webApp", "pwa", "mobile", "desktop"],
    businessCapabilityKeys: [
      "gpsRoutes",
      "digitalMarkup",
      "offline",
      "qr",
      "excel",
      "pdf",
      "n8nAutomations",
      "brevoEmail",
      "openAiForms",
    ],
    statisticKeys: ["0", "1", "2", "3", "4"],
    status: "production",
    cta: "enterprise",
    responsibilityKeys: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  },
  devocion: {
    image: "/DevocionDiaria.png",
    url: "https://devociondiaria.web.app/",
    stack: [
      "Angular",
      "Ionic",
      "Capacitor",
      "React",
      "Next.js",
      "Firebase",
      "Firestore",
      "Cloud Functions",
      "PWA",
      "TypeScript",
    ],
    highlightKeys: ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
    status: "activeDevelopment",
    cta: "product",
    theme: "devocion",
    prominent: true,
    responsibilityKeys: ["0", "1", "2", "3", "4", "5", "6", "7"],
  },
  ubicatupuesto: {
    stack: ["Angular", "Node.js", "PostgreSQL", "TypeScript"],
    responsibilityKeys: ["0", "1", "2", "3", "4"],
  },
  ubicaturepuesto: {
    image: "/ubicaturepuesto.png",
    url: "https://ubicaturepuesto.cl/",
    stack: [
      "Angular",
      "Ionic",
      "Capacitor",
      "Firebase",
      "Cloud Functions",
      "TypeScript",
      "REST APIs",
      "PHP",
    ],
    platforms: ["web", "android", "ios"],
    highlightKeys: [
      "quoteEngine",
      "emailAutomation",
      "phpWebService",
      "specializedMarketplace",
      "orderManagement",
      "adminPanel",
      "productCatalog",
    ],
    status: "production",
    cta: "live",
    responsibilityKeys: ["0", "1", "2", "3", "4", "5", "6"],
  },
  enfoqueglobal: {
    image: "/enfoqueglobal.png",
    url: "https://appenfoqueglobal.web.app/",
    platformUrls: {
      web: "https://appenfoqueglobal.web.app/",
    },
    storeAppUrls: {
      android: enfoqueGlobalStoreUrls.android,
    },
    stack: [
      "Angular",
      "Ionic",
      "Capacitor",
      "Firebase",
      "Firestore",
      "Cloud Functions",
      "PWA",
      "TypeScript",
    ],
    platformKeys: ["web", "android", "multiCountry"],
    highlightKeys: [
      "churchManagement",
      "digitalMentorship",
      "communityFeed",
      "resourceLibrary",
      "excelReports",
      "documentSharing",
      "multiCountry",
      "mobileApp",
      "webPlatform",
    ],
    status: "production",
    cta: "live",
    responsibilityKeys: ["0", "1", "2", "3", "4", "5"],
  },
  msmpackaging: {
    image: "/msm.png",
    url: "https://msmpackaging.com/",
    stack: ["Astro", "TypeScript", "JavaScript", "HTML5", "CSS3", "Brevo"],
    platforms: ["web"],
    businessCapabilityKeys: [
      "multiLanguage",
      "internationalSeo",
      "productCatalog",
      "leadGeneration",
      "corporateBranding",
      "performanceOptimization",
    ],
    highlightKeys: [
      "astroArchitecture",
      "advancedSeo",
      "multiLanguageExperience",
      "productCatalog",
      "highPerformance",
      "responsiveDesign",
    ],
    status: "production",
    cta: "live",
    responsibilityKeys: ["0", "1", "2", "3", "4", "5"],
  },
  vitrogourmet: {
    stack: ["Angular", "Firebase", "TypeScript", "Ionic"],
    responsibilityKeys: ["0", "1", "2", "3"],
  },
  churchapi: {
    stack: ["Node.js", "Express", "Firebase", "TypeScript", "REST APIs"],
    responsibilityKeys: ["0", "1", "2", "3", "4"],
  },
  devocionadmin: {
    stack: ["Angular", "Firebase", "Firestore", "TypeScript", "Cloud Functions"],
    responsibilityKeys: ["0", "1", "2", "3", "4", "5"],
    theme: "devocion",
  },
};

export const experienceIds = ["appi", "wonderchatt", "uniserv"] as const;

export type ExperienceId = (typeof experienceIds)[number];

export const techCategoriesData = [
  {
    key: "frontend" as const,
    technologies: ["Angular", "React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    key: "backend" as const,
    technologies: ["Node.js", "Express", "ASP.NET Core"],
  },
  {
    key: "databases" as const,
    technologies: ["Firebase", "SQL Server", "PostgreSQL"],
  },
  {
    key: "other" as const,
    technologies: ["Firebase", "OpenAI API", "n8n", "Git", "GitHub"],
  },
];

export const contactChannels = [
  {
    key: "linkedin" as const,
    href: siteConfig.linkedin,
    descriptionKey: "linkedinDescription" as const,
  },
  {
    key: "github" as const,
    href: siteConfig.github,
    descriptionKey: "githubDescription" as const,
  },
  {
    key: "email" as const,
    href: `mailto:${siteConfig.email}`,
    descriptionKey: null,
  },
  {
    key: "whatsapp" as const,
    href: siteConfig.whatsapp,
    descriptionKey: "whatsappDescription" as const,
  },
] as const;
