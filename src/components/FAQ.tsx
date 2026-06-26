import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { faqs } from "@/data/faqs";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-gray-50" dir="rtl">
      <div className="container px-4 mx-auto md:px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-heading tracking-tighter-heading">
            أسئلة شائعة
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                itemScope
                itemType="https://schema.org/Question"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-right"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg font-bold text-gray-900 font-heading" itemProp="name">
                    {faq.question}
                  </span>
                  <span className="mr-4 text-primary bg-primary/10 p-2 rounded-full" aria-hidden="true">
                    {isOpen ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </span>
                </button>

                {/*
                  Answer is ALWAYS rendered in the DOM for SEO crawlability.
                  Visual collapse is done via CSS max-height transition only.
                */}
                <div
                  itemScope
                  itemType="https://schema.org/Answer"
                  style={{
                    maxHeight: isOpen ? "500px" : "0px",
                    overflow: "hidden",
                    transition: "max-height 0.3s ease",
                  }}
                >
                  <div
                    className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-50 pt-4"
                    itemProp="text"
                  >
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
