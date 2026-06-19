"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";

import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { ThemeSwitcher } from "@/components/layout/theme-switcher";
import { Button } from "@/components/ui/button";
import { useActiveSection } from "@/hooks/use-active-section";
import { Link } from "@/i18n/navigation";
import { navAnchors, siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";

const sectionIds = navAnchors.map((link) => link.href.replace("#", ""));

export function Header() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navLinkClass = (href: string) => {
    const id = href.replace("#", "");
    const isActive = activeSection === id;

    return cn(
      "rounded-sm text-sm transition-colors",
      isActive
        ? "font-medium text-brand"
        : "text-muted-foreground hover:text-foreground"
    );
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-xl dark:border-white/[0.06] dark:bg-background/90"
          : "bg-transparent"
      )}
    >
      <div className="page-container flex h-[4.25rem] items-center justify-between gap-6 md:h-[4.75rem]">
        <Link
          href="/"
          className="rounded-sm text-[15px] font-medium tracking-tight text-foreground transition-colors hover:text-brand"
        >
          {siteConfig.name.split(" ")[0]}
        </Link>

        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label={t("mainNav")}
        >
          {navAnchors.map((link) => (
            <a key={link.href} href={link.href} className={navLinkClass(link.href)}>
              {t(link.key)}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeSwitcher />
          <LanguageSwitcher />
          <Button asChild size="sm" className="ml-1 rounded-full px-4">
            <a href="#contact">{t("contactMe")}</a>
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeSwitcher />
          <LanguageSwitcher />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm text-muted-foreground hover:text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-nav"
          className="border-t border-border bg-background dark:border-white/[0.06] lg:hidden"
        >
          <nav
            className="page-container flex flex-col py-4"
            aria-label={t("mainNav")}
          >
            {navAnchors.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn("py-3.5 text-base", navLinkClass(link.href))}
              >
                {t(link.key)}
              </a>
            ))}
            <Button asChild className="mt-3 w-full rounded-full" size="lg">
              <a href="#contact" onClick={() => setMobileOpen(false)}>
                {t("contactMe")}
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
