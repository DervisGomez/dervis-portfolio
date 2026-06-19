import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium transition-colors duration-200",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-secondary text-secondary-foreground dark:bg-muted dark:text-foreground",
        secondary:
          "border-transparent bg-muted text-muted-foreground dark:bg-secondary dark:text-muted-foreground",
        outline:
          "border-border text-foreground dark:border-border dark:text-foreground",
        tech: "rounded-full border px-3.5 py-1.5 text-[13px] border-brand/25 bg-brand-subtle text-brand dark:border-brand/35 dark:bg-brand-subtle dark:text-brand",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
