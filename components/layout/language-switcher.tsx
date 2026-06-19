"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("language");

  function switchLocale(nextLocale: Locale) {
    if (nextLocale === locale) return;
    router.replace(pathname, { locale: nextLocale });
  }

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
        <button
          key={loc}
          type="button"
          onClick={() => switchLocale(loc)}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
            locale === loc
              ? "bg-brand-subtle text-brand shadow-sm dark:shadow-[inset_0_0_0_1px_rgb(255,255,255,0.06)]"
              : "text-muted-foreground hover:text-brand dark:hover:bg-white/[0.04]"
          )}
          aria-pressed={locale === loc}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
