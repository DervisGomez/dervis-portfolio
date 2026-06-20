"use client";

import { AnchorLink } from "@/components/shared/anchor-link";
import { navAnchors } from "@/lib/data";

type FooterNavLabels = {
  projects: string;
  experience: string;
  stack: string;
};

type FooterNavLinksProps = {
  labels: FooterNavLabels;
};

export function FooterNavLinks({ labels }: FooterNavLinksProps) {
  return (
    <ul className="space-y-1">
      {navAnchors.map((link) => (
        <li key={link.href}>
          <AnchorLink href={link.href} className="footer-nav-link">
            {labels[link.key]}
          </AnchorLink>
        </li>
      ))}
    </ul>
  );
}
