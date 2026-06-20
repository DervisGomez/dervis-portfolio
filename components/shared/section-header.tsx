import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label?: string;
  title: React.ReactNode;
  description?: string;
  className?: string;
}

export function SectionHeader({
  label,
  title,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <header className={cn("mb-10 md:mb-16", className)}>
      {label && <p className="section-indicator mb-4">{label}</p>}
      <h2 className="heading-section">{title}</h2>
      {description && (
        <p className="text-body-lg mt-5 max-w-2xl">{description}</p>
      )}
    </header>
  );
}
