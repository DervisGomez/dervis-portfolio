const MIN_DURATION_MS = 1400;
const MAX_DURATION_MS = 2600;
const REDUCED_MOTION_DURATION_MS = 450;
const MS_PER_PIXEL = 1.05;

let activeAnimationFrame: number | null = null;

function easeInOutQuart(progress: number): number {
  return progress < 0.5
    ? 8 * progress ** 4
    : 1 - (-2 * progress + 2) ** 4 / 2;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getScrollOffset(): number {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--header-offset")
    .trim();

  if (!raw) return 80;

  if (raw.endsWith("rem")) {
    const rem = Number.parseFloat(raw);
    const rootSize = Number.parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
    return rem * rootSize;
  }

  return Number.parseFloat(raw) || 80;
}

function getDurationForDistance(distance: number): number {
  if (prefersReducedMotion()) {
    return REDUCED_MOTION_DURATION_MS;
  }

  return Math.round(
    Math.min(
      MAX_DURATION_MS,
      Math.max(MIN_DURATION_MS, Math.abs(distance) * MS_PER_PIXEL)
    )
  );
}

function cancelActiveScroll(): void {
  if (activeAnimationFrame !== null) {
    window.cancelAnimationFrame(activeAnimationFrame);
    activeAnimationFrame = null;
  }
}

function setScrollY(y: number): void {
  const scrollingElement = document.scrollingElement ?? document.documentElement;
  scrollingElement.scrollTop = y;
}

export function getScrollTargetForElement(element: HTMLElement): number {
  const offset = getScrollOffset();
  const top = element.getBoundingClientRect().top + window.scrollY - offset;
  return Math.max(0, top);
}

export function smoothScrollToY(targetY: number, duration?: number): void {
  cancelActiveScroll();

  const startY = window.scrollY;
  const distance = targetY - startY;

  if (Math.abs(distance) < 2) return;

  const resolvedDuration = duration ?? getDurationForDistance(distance);
  let startTime: number | null = null;

  const step = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;

    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / resolvedDuration, 1);
    const eased = easeInOutQuart(progress);

    setScrollY(startY + distance * eased);

    if (progress < 1) {
      activeAnimationFrame = window.requestAnimationFrame(step);
    } else {
      activeAnimationFrame = null;
    }
  };

  activeAnimationFrame = window.requestAnimationFrame(step);
}

export function smoothScrollToElement(
  element: HTMLElement,
  duration?: number
): void {
  smoothScrollToY(getScrollTargetForElement(element), duration);
}

export function smoothScrollToHash(hash: string, duration?: number): boolean {
  const id = hash.replace(/^#/, "");
  if (!id) return false;

  const element = document.getElementById(id);
  if (!element) return false;

  smoothScrollToElement(element, duration);
  return true;
}
