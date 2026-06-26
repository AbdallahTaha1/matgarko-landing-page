import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs } from "@/data/faqs";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-gray-50" dir="rtl">
      <div className="container px-4 mx-auto md:px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 font-heading tracking-tighter-heading">
            أسئلة شائعة
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-right"
              >
                <span className="text-lg font-bold text-gray-900 font-heading">
                  {faq.question}
                </span>
                <span className="mr-4 text-primary bg-primary/10 p-2 rounded-full">
                  {openIndex === index ? (
                    <Minus className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
