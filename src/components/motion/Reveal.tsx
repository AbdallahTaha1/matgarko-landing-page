import { cn } from "@/lib/utils";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay in milliseconds, useful for staggering items in a grid. */
  delay?: number;
  as?: "div" | "section" | "article" | "li";
  id?: string;
};

/**
 * Progressive scroll reveal. The prerendered HTML is fully visible and stays so unless this
 * effect runs: only then is an element that is still below the screen marked as waiting, and it
 * fades in when it scrolls into view. A browser where scripts fail (some in-app browsers on old
 * phones) therefore never ends up with hidden content. Respects prefers-reduced-motion in CSS.
 */
export function Reveal({ children, className, delay = 0, as: Tag = "div", id }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    if (element.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    const show = () => element.removeAttribute("data-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          show();
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.05 },
    );

    element.setAttribute("data-reveal", "wait");
    observer.observe(element);
    return () => {
      observer.disconnect();
      show();
    };
  }, []);

  const style: CSSProperties | undefined = delay ? { transitionDelay: `${delay}ms` } : undefined;

  return (
    <Tag ref={ref as never} id={id} className={cn("reveal", className)} style={style}>
      {children}
    </Tag>
  );
}
