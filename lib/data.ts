export const siteConfig = {
  name: "Dervis Gómez",
  profileImage: "/Profile.png",
  cvUrl: "/CV.pdf",
  email: "dervis@appi.cl",
  linkedin: "https://linkedin.com/in/dervisgomez",
  github: "https://github.com/dervisgomez",
  whatsapp: "https://wa.me/56900000000",
};

export const metricsData = [
  { value: 9, suffix: "+", labelKey: "yearsExperience" as const },
  { value: 20, suffix: "+", labelKey: "projectsDelivered" as const },
  { value: 6, suffix: "+", labelKey: "mobileApps" as const },
];

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
  { key: "contact" as const, href: "#contact" },
];

export const featuredProductIds = [
  "veyco",
  "area33",
  "enaex",
  "formidavel",
  "devocion",
  "ubicatupuesto",
] as const;

export const primaryProductIds = ["veyco", "enaex", "formidavel"] as const satisfies readonly FeaturedProductId[];
export const secondaryProductIds = ["area33", "devocion", "ubicatupuesto"] as const satisfies readonly FeaturedProductId[];

export type FeaturedProductId = (typeof featuredProductIds)[number];

export const productMeta: Record<
  FeaturedProductId,
  {
    image?: string;
    url?: string;
    applicationUrl?: string;
    stack: string[];
    responsibilityKeys: readonly string[];
    platforms?: readonly ("web" | "android" | "ios")[];
    platformKeys?: readonly string[];
    platformUrls?: Partial<Record<string, string>>;
    highlightKeys?: readonly string[];
    statisticKeys?: readonly string[];
    status?: "production";
    cta?: "live" | "enterprise";
  }
> = {
  veyco: {
    image: "/veyco.png",
    url: "https://veycoo.com.co",
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
  },
  area33: {
    stack: ["Ionic", "Angular", "Firebase", "Capacitor"],
    responsibilityKeys: ["0", "1", "2", "3", "4"],
  },
  enaex: {
    image: "/enaex.png",
    url: "https://reconocimiento.enaex.com/",
    platformUrls: {
      web: "https://reconocimiento.enaex.com/",
      android:
        "https://play.google.com/store/apps/details?id=com.enaex.programareconocimientos",
      ios: "https://apps.apple.com/us/app/programa-de-reconocimiento/id1328394685?l=es-MX",
    },
    stack: [
      "Angular",
      "Ionic",
      "TypeScript",
      "Capacitor",
      "Firebase",
      "Firebase Functions",
      "REST APIs",
      "Azure AD",
    ],
    platforms: ["web", "android", "ios"],
    highlightKeys: ["0", "1", "2", "3"],
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
      "Firebase Functions",
      "Firestore",
      "App Check",
      "TypeScript",
      "Chart.js",
      "QR Codes",
      "PWA",
    ],
    platformKeys: ["webApp", "pwa", "mobile", "desktop"],
    highlightKeys: ["0", "1", "2", "3"],
    statisticKeys: ["0", "1", "2", "3", "4"],
    status: "production",
    cta: "enterprise",
    responsibilityKeys: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  },
  devocion: {
    stack: ["Ionic", "Angular", "Firebase", "Node.js"],
    responsibilityKeys: ["0", "1", "2", "3", "4"],
  },
  ubicatupuesto: {
    stack: ["Angular", "Node.js", "PostgreSQL", "TypeScript"],
    responsibilityKeys: ["0", "1", "2", "3", "4"],
  },
};

export const industrySectorKeys = [
  "manufacturing",
  "logistics",
  "retail",
  "transportation",
  "technology",
  "services",
] as const;

export type IndustrySectorKey = (typeof industrySectorKeys)[number];

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
