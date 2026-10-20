import React from 'react';
import { ArrowRight, MessageSquare, PhoneCall } from 'lucide-react';
import { companyInfo } from '../../data/company';

export const CtaBanner: React.FC = () => {
  const hasWhatsapp = Boolean(companyInfo.whatsappNumber && companyInfo.whatsappNumber.trim() !== '');
  const whatsappUrl = hasWhatsapp 
    ? `https://wa.me/${companyInfo.whatsappNumber}?text=${encodeURIComponent(companyInfo.whatsappDefaultMsg)}`
    : '';

  return (
    <section className="py-24 bg-[#061220] text-white relative overflow-hidden border-t border-slate-800">
      {/* Resplandor neón */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(38,117,245,0.18),transparent_60%)]" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-brand-electric border border-white/10 text-xs font-semibold tracking-wide backdrop-blur-sm">
          <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
          <span>Inicia la Transformación de tu Negocio</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
          Cuéntanos qué necesita tu negocio
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
          Conversemos sobre tu idea y evaluemos cómo podemos convertirla en una solución digital sólida, eficiente y a la medida de tu presupuesto.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href="#contacto"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 pl-8 pr-3 py-4 text-base font-bold text-white bg-brand-electric hover:bg-brand-hoverElectric rounded-full shadow-lg shadow-brand-electric/30 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Solicitar cotización</span>
            <div className="w-8 h-8 rounded-full bg-white text-brand-navy flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </div>
          </a>

          {hasWhatsapp && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-full transition-all shadow-md"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Contactar por WhatsApp</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
};
