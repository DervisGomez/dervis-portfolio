"use client";

import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "@teispace/next-themes";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

const themes = ["light", "dark", "system"] as const;
type ThemeOption = (typeof themes)[number];

const icons: Record<ThemeOption, typeof Sun> = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("theme");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "h-8 w-[88px] rounded-full border border-border bg-muted/40 dark:border-white/[0.08] dark:bg-white/[0.03]",
          className
        )}
        aria-hidden
      />
    );
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
      {themes.map((option) => {
        const Icon = icons[option];
        const isActive = theme === option;

        return (
          <button
            key={option}
            type="button"
            onClick={() => setTheme(option)}
            className={cn(
              "inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full transition-colors duration-200",
              isActive
                ? "bg-brand-subtle text-brand shadow-sm dark:shadow-[inset_0_0_0_1px_rgb(255,255,255,0.06)]"
                : "text-muted-foreground hover:bg-muted/60 hover:text-brand dark:hover:bg-white/[0.06]"
            )}
            aria-label={t(option)}
            aria-pressed={isActive}
            title={t(option)}
          >
            <Icon className="h-3.5 w-3.5" />
          </button>
        );
      })}
    </div>
  );
}
