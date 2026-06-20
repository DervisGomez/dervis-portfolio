import type { ReactNode } from "react";

import { TextHighlight } from "@/components/shared/text-highlight";

export const designSystem = {
  brand: {
    color: "#2563EB",
    usage: [
      "Headline emphasis words",
      "Metric numbers",
      "Active navigation state",
      "Technology badges",
      "Primary buttons",
      "Section indicators",
      "Links and CTAs",
    ],
  },
  principles: {
    tone: "Minimalist, elegant, product-focused",
    avoid: [
      "Colorful card backgrounds",
      "Large gradients",
      "Glow effects",
      "Flashy animations",
    ],
  },
} as const;

export const richHighlight = {
  highlight: (chunks: ReactNode) => <TextHighlight>{chunks}</TextHighlight>,
};

export const richHeadline = {
  ...richHighlight,
  line: (chunks: ReactNode) => <span className="block">{chunks}</span>,
};
