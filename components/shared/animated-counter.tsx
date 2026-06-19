interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({
  value,
  suffix = "",
  className,
}: AnimatedCounterProps) {
  return (
    <span className={className}>
      {value}
      {suffix}
    </span>
  );
}
