import { cn } from "@/lib/utils";

export function TextHighlight({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <span className={cn("text-brand", className)}>{children}</span>;
}
