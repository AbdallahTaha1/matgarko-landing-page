import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import { useId, useState } from "react";

type FaqItem = { question: string; answer: string };

type FaqListProps = {
  items: FaqItem[];
  defaultOpen?: number | null;
  className?: string;
};

/**
 * Accessible accordion. Answers stay in the DOM (collapsed with CSS) so
 * crawlers and assistive tech can always read them.
 */
export function FaqList({ items, defaultOpen = 0, className }: FaqListProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);
  const baseId = useId();

  return (
    <div className={cn("divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white", className)}>
      {items.map((faq, index) => {
        const isOpen = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div key={faq.question} itemScope itemType="https://schema.org/Question">
            <h3 className="m-0">
              <button
                id={buttonId}
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-center justify-between gap-4 px-4 py-4 text-start transition-colors hover:bg-gray-50 sm:px-5"
              >
                <span className="text-sm font-bold leading-6 text-gray-950 sm:text-base" itemProp="name">
                  {faq.question}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors",
                    isOpen ? "border-emerald-600 bg-emerald-600 text-white" : "border-gray-200 bg-white text-gray-500",
                  )}
                >
                  {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              itemScope
              itemType="https://schema.org/Answer"
              itemProp="acceptedAnswer"
              className={cn("grid transition-[grid-template-rows] duration-300 ease-out", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
            >
              <div className="overflow-hidden">
                <p className="px-4 pb-4 text-sm leading-7 text-gray-600 sm:px-5 sm:text-[15px]" itemProp="text">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
