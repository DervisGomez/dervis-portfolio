"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("language");

  return (
    <div
      className={cn(
        "flex items-center rounded-full border border-border bg-muted/30 p-0.5 dark:border-white/[0.08] dark:bg-white/[0.03]",
        className
      )}
      role="group"
      aria-label={t("switch")}
    >
      {routing.locales.map((loc) => (
        <Link
          key={loc}
          href="/"
          locale={loc}
          className={cn(
            "cursor-pointer rounded-full px-2.5 py-1 text-xs font-medium transition-colors duration-200",
            locale === loc
              ? "bg-brand-subtle text-brand shadow-sm dark:shadow-[inset_0_0_0_1px_rgb(255,255,255,0.06)]"
              : "text-muted-foreground hover:bg-muted/60 hover:text-brand dark:hover:bg-white/[0.06]"
          )}
          aria-current={locale === loc ? "true" : undefined}
          aria-label={t("switchTo", { language: t(loc) })}
        >
          {loc.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
