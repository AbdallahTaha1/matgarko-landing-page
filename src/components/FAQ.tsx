import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "هل أقدر أعمل المتجر بنفسي؟",
    answer:
      "نعم. تختار اسم المتجر والرابط، تنشئ الحساب، ثم تدخل لوحة الإدارة لإضافة المنتجات وبيانات التواصل وطرق الدفع والشحن.",
  },
  {
    question: "هل أحتاج شركة برمجة؟",
    answer:
      "لا. متجركو مصممة لتبدأ بنفسك من غير برمجة ومن غير انتظار شهور لتجهيز متجر مخصوص.",
  },
  {
    question: "هل أقدر أجرب قبل ما أدفع؟",
    answer:
      "نعم، يوجد شهر مجاني لفترة محدودة حتى تجرب المنصة وتعرف هل مناسبة لتجارتك قبل الاشتراك.",
  },
  {
    question: "هل الأسعار مناسبة للسوق المصري؟",
    answer:
      "نعم. الباقات الحالية بالجنيه المصري وتبدأ من سعر بسيط يناسب التجار الذين يريدون تجربة البيع أونلاين بتكلفة قليلة.",
  },
  {
    question: "ماذا يحدث بعد التسجيل؟",
    answer:
      "بعد التسجيل تدخل لوحة الإدارة، تضيف بيانات متجرك ومنتجاتك، وتبدأ تجهيز طرق الدفع والشحن ثم استقبال الطلبات.",
  },
];

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
