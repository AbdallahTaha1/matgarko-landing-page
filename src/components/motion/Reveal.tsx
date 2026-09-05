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
 * Progressive scroll reveal. Content is fully visible in the prerendered HTML;
 * once JavaScript runs (html.js) the element fades and slides in when it
 * enters the viewport. Respects prefers-reduced-motion through CSS.
 */
export function Reveal({ children, className, delay = 0, as: Tag = "div", id }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      element.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.classList.add("is-visible");
            observer.disconnect();
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const style: CSSProperties | undefined = delay ? { transitionDelay: `${delay}ms` } : undefined;

  return (
    <Tag ref={ref as never} id={id} className={cn("reveal", className)} style={style}>
      {children}
    </Tag>
  );
}
