import React from 'react';
import { Search, Compass, Code, Rocket, ArrowRight } from 'lucide-react';
import { companyInfo } from '../../data/company';

export const Methodology: React.FC = () => {
  const stepIcons = [Search, Compass, Code, Rocket];

  return (
    <section id="metodologia" className="py-20 lg:py-28 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-brand-navy text-xs font-semibold tracking-wide">
            <span>Metodología de Trabajo</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
            De la idea a la solución
          </h2>

          <p className="text-base text-brand-muted leading-relaxed">
            Nuestro proceso estructurado en 4 fases garantiza transparencia en los avances, entregas previsibles y un resultado alineado con tus metas de negocio.
          </p>
        </div>

        {/* Línea de progreso interactiva y adaptable */}
        <div className="relative">
          {/* Línea horizontal en desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-slate-100 -translate-y-8 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {companyInfo.workflowSteps.map((step, idx) => {
              const Icon = stepIcons[idx] || Search;
              return (
                <div
                  key={step.step}
                  className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-card hover:border-brand-electric/40 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Número y Icono */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-brand-surface border border-slate-200 flex items-center justify-center text-brand-navy group-hover:bg-brand-electric group-hover:text-white transition-colors shadow-xs">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-2xl font-black text-slate-200 group-hover:text-brand-electric/30 transition-colors font-mono">
                        {step.step}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-brand-dark mb-2 group-hover:text-brand-electric transition-colors">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] font-semibold text-brand-navy flex items-center gap-1">
                    <span>Fase {idx + 1} de 4</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Llamado a la acción rápido */}
        <div className="mt-16 text-center">
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-electric hover:text-brand-hoverElectric transition-colors"
          >
            <span>¿Listo para comenzar la fase de análisis con nosotros?</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
