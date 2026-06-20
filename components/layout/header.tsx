"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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

function BrandMark() {
  const t = useTranslations("hero");
  const firstName = siteConfig.name.split(" ")[0];

  return (
    <Link
      href="/"
      className="group flex min-w-0 items-center gap-2.5 rounded-full outline-none sm:gap-3"
      aria-label={t("profileAlt")}
    >
      <span
        className={cn(
          "relative h-7 w-7 shrink-0 overflow-hidden rounded-full ring-1 ring-border transition-all duration-200 sm:h-8 sm:w-8",
          "group-hover:ring-brand/30 dark:ring-white/[0.1] dark:group-hover:ring-brand/40"
        )}
      >
        <Image
          src={siteConfig.profileImage}
          alt=""
          fill
          sizes="32px"
          className="object-cover object-[center_12%]"
          priority
        />
      </span>
      <span className="truncate text-sm font-medium tracking-tight text-foreground transition-colors group-hover:text-brand sm:text-[15px]">
        {firstName}
      </span>
    </Link>
  );
}

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
      "rounded-sm text-[13px] font-medium tracking-tight transition-colors duration-200",
      isActive
        ? "text-brand"
        : "text-muted-foreground hover:text-foreground"
    );
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/90 shadow-[0_1px_0_0_rgb(0_0_0/0.03)] backdrop-blur-xl dark:border-white/[0.06] dark:bg-background/90 dark:shadow-[0_1px_0_0_rgb(255_255_255/0.04)]"
          : "bg-background/60 backdrop-blur-md dark:bg-background/50"
      )}
    >
      <div className="page-container grid h-[4.25rem] grid-cols-[1fr_auto] items-center gap-3 lg:h-[4.75rem] lg:grid-cols-[1fr_auto_1fr]">
        <div className="min-w-0 justify-self-start">
          <BrandMark />
        </div>

        <nav
          className="hidden items-center gap-8 justify-self-center lg:flex"
          aria-label={t("mainNav")}
        >
          {navAnchors.map((link) => (
            <a key={link.href} href={link.href} className={navLinkClass(link.href)}>
              {t(link.key)}
            </a>
          ))}
        </nav>

        <div className="hidden items-center justify-self-end gap-2 md:flex">
          <ThemeSwitcher />
          <LanguageSwitcher />
          <Button
            asChild
            size="sm"
            className="ml-1.5 rounded-full bg-[#059669] px-4 text-white shadow-[var(--shadow-button)] hover:bg-[#047857]"
          >
            <a href="#contact">{t("contactMe")}</a>
          </Button>
        </div>

        <div className="flex shrink-0 items-center justify-self-end gap-1 sm:gap-1.5 md:hidden">
          <ThemeSwitcher className="[&_button]:h-6 [&_button]:w-6 [&_svg]:h-3 [&_svg]:w-3" />
          <LanguageSwitcher className="px-0.5 [&_button]:px-2 [&_button]:text-[11px]" />
          <button
            type="button"
            className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 top-[4.25rem] z-40 cursor-pointer bg-background/70 backdrop-blur-sm md:hidden"
            aria-label={t("closeMenu")}
            onClick={() => setMobileOpen(false)}
          />
          <div
            id="mobile-nav"
            className="fixed inset-x-0 top-[4.25rem] z-50 max-h-[calc(100dvh-4.25rem)] overflow-y-auto border-t border-border bg-background/95 shadow-lg backdrop-blur-xl dark:border-white/[0.06] md:hidden"
          >
            <nav
              className="page-container flex flex-col py-5"
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
              <Button
                asChild
                className="btn-mobile-wrap mt-4 w-full rounded-full bg-[#059669] text-white hover:bg-[#047857]"
                size="lg"
              >
                <a href="#contact" onClick={() => setMobileOpen(false)}>
                  {t("contactMe")}
                </a>
              </Button>
            </nav>
          </div>
        </>
      ) : null}
    </header>
  );
}
