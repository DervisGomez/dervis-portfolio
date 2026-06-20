"use client";

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type MouseEvent,
} from "react";

import { smoothScrollToHash } from "@/lib/smooth-scroll";

type AnchorLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  href: `#${string}`;
};

export const AnchorLink = forwardRef<HTMLAnchorElement, AnchorLinkProps>(
  function AnchorLink({ href, onClick, ...props }, ref) {
    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event);

      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const targetId = href.slice(1);
      if (!document.getElementById(targetId)) return;

      event.preventDefault();
      smoothScrollToHash(href);
      window.history.pushState(null, "", href);
    };

    return <a ref={ref} href={href} onClick={handleClick} {...props} />;
  }
);

AnchorLink.displayName = "AnchorLink";
