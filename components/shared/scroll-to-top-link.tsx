"use client";

import { type ComponentProps, type MouseEvent } from "react";

import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { smoothScrollToY } from "@/lib/smooth-scroll";

type ScrollToTopLinkProps = ComponentProps<typeof Link>;

const homePaths = routing.locales.map((locale) =>
  locale === routing.defaultLocale ? "/" : `/${locale}`
);

export function ScrollToTopLink({
  href = "/",
  onClick,
  ...props
}: ScrollToTopLinkProps) {
  const pathname = usePathname();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (event.defaultPrevented || href !== "/") return;

    const isOnHome = homePaths.includes(pathname);
    if (!isOnHome || window.scrollY <= 2) return;

    event.preventDefault();
    smoothScrollToY(0);
    window.history.pushState(null, "", pathname);
  };

  return <Link href={href} onClick={handleClick} {...props} />;
}
