import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  id?: string;
  kicker?: string;
  title: string;
  lead?: string;
  align?: "center" | "start";
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeading({ id, kicker, title, lead, align = "center", tone = "light", className }: SectionHeadingProps) {
  const isDark = tone === "dark";

  return (
    <div className={cn("max-w-2xl", align === "center" ? "mx-auto text-center" : "text-start", className)}>
      {kicker ? (
        <span className={cn("section-kicker", isDark && "border-white/15 bg-white/10 text-emerald-200")}>{kicker}</span>
      ) : null}
      <h2 id={id} className={cn("section-title", kicker && "mt-4", isDark && "text-white")}>
        {title}
      </h2>
      {lead ? <p className={cn("section-lead mt-3", isDark && "text-gray-300")}>{lead}</p> : null}
    </div>
  );
}
