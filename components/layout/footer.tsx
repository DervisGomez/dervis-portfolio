import { getTranslations } from "next-intl/server";

import { contactChannels, navAnchors, siteConfig } from "@/lib/data";

export async function Footer() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const tContact = await getTranslations("contact");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border dark:border-white/[0.06]">
      <div className="page-container py-14 md:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between md:gap-12">
          <div className="max-w-sm">
            <p className="text-[15px] font-medium text-foreground">
              {siteConfig.name}
            </p>
            <p className="text-caption mt-1">{t("subtitle")}</p>
            <p className="text-caption mt-4 leading-relaxed">{t("bio")}</p>
          </div>

          <div className="flex flex-wrap gap-8 text-sm sm:gap-16">
            <div>
              <p className="field-label mb-4">{t("navigate")}</p>
              <ul className="space-y-2.5">
                {navAnchors.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="link-brand">
                      {tNav(link.key)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="field-label mb-4">{t("connect")}</p>
              <ul className="space-y-2.5">
                {contactChannels.map((channel) => (
                  <li key={channel.key}>
                    <a
                      href={channel.href}
                      target={channel.key === "email" ? undefined : "_blank"}
                      rel={
                        channel.key === "email"
                          ? undefined
                          : "noopener noreferrer"
                      }
                      className="link-brand"
                    >
                      {tContact(`channels.${channel.key}`)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className="text-caption mt-10 md:mt-12">
          © {year} {siteConfig.name}. {t("rights")}
        </p>
      </div>
    </footer>
  );
}
