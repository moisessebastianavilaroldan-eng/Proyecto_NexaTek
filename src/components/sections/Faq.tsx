import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { faqsData } from '../../data/faqs';

export const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-brand-navy text-xs font-semibold tracking-wide">
            <HelpCircle className="w-3.5 h-3.5 text-brand-electric" />
            <span>Resolviendo tus dudas</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
            Preguntas frecuentes
          </h2>

          <p className="text-base text-brand-muted leading-relaxed">
            Conoce cómo abordamos los proyectos de software, tiempos de entrega y modelos de trabajo.
          </p>
        </div>

        {/* Acordeón de FAQs */}
        <div className="space-y-4">
          {faqsData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-brand-surface/50 border border-slate-200/90 rounded-2xl overflow-hidden transition-all duration-200 shadow-xs"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none focus:bg-slate-100/60"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-bold text-brand-dark">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-lg bg-white border border-slate-200 text-slate-500 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-brand-electric bg-blue-50 border-blue-200' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-200/40 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
