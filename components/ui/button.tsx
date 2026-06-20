import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[var(--shadow-button)] hover:bg-[#1d4ed8] dark:hover:bg-[#3b82f6]",
        caseStudy:
          "border-transparent bg-[#059669] text-white shadow-[var(--shadow-button)] hover:bg-[#047857]",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        outline:
          "border border-brand/25 bg-transparent text-brand hover:bg-brand-subtle dark:border-brand/30 dark:hover:border-brand/40 dark:hover:bg-brand-subtle",
        secondary:
          "border border-border bg-secondary text-secondary-foreground hover:bg-secondary/80 dark:hover:bg-accent",
        ghost:
          "text-muted-foreground hover:bg-accent hover:text-foreground dark:hover:bg-white/[0.04]",
        link: "text-brand underline-offset-4 hover:text-brand/80",
      },
      size: {
        default: "h-10 rounded-full px-5",
        sm: "h-9 rounded-full px-4 text-[13px]",
        lg: "h-11 rounded-full px-7 text-[15px]",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
