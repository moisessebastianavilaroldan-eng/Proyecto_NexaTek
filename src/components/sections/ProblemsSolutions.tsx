import React from 'react';
import { 
  FileSpreadsheet, 
  Clock, 
  AlertTriangle, 
  BarChart3, 
  Sliders, 
  CheckCircle, 
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers,
  Database
} from 'lucide-react';

export const ProblemsSolutions: React.FC = () => {
  const problems = [
    {
      icon: FileSpreadsheet,
      title: 'Información dispersa en hojas de cálculo',
      desc: 'Centralizamos todos tus registros en bases de datos relacionales y no relacionales seguras en tiempo real.',
    },
    {
      icon: Clock,
      title: 'Procesos manuales y repetitivos',
      desc: 'Automatizamos las operaciones diarias para que tu equipo se concentre en actividades de alto valor.',
    },
    {
      icon: AlertTriangle,
      title: 'Descontrol en inventarios y almacenes',
      desc: 'Trazabilidad rigurosa por lote, stock mínimo y registro instantáneo de entradas y salidas.',
    },
    {
      icon: BarChart3,
      title: 'Falta de información para tomar decisiones',
      desc: 'Paneles visuales y reportes consolidados para evaluar la rentabilidad de cada área a tiempo.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-brand-surface/40 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Columna Izquierda: Copywriting + Tarjetas de Capacidades Técnicas */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 text-brand-navy text-xs font-bold tracking-wide">
              <Cpu className="w-3.5 h-3.5 text-brand-electric" />
              <span>Eficiencia Operativa Comprobada</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark tracking-tight leading-tight">
              Menos tareas manuales. <br />
              <span className="text-brand-electric">Más control sobre tu negocio.</span>
            </h2>

            <p className="text-base text-brand-muted leading-relaxed">
              El software genérico obliga a tu empresa a amoldarse a sus limitaciones. En NEXATEK analizamos exactamente cómo opera tu equipo y construimos la herramienta técnica que necesitas para escalar.
            </p>

            {/* 3 Bloques Métricos / Indicadores en Azul Eléctrico y Marino */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-brand-navy text-white p-4 rounded-2xl text-center shadow-sm flex flex-col justify-center">
                <span className="text-2xl sm:text-3xl font-black block font-mono">4</span>
                <span className="text-[11px] text-slate-300 font-medium leading-tight block mt-1">Desarrolladores en equipo</span>
              </div>
              <div className="bg-brand-electric text-white p-4 rounded-2xl text-center shadow-sm flex flex-col justify-center">
                <span className="text-2xl sm:text-3xl font-black block font-mono">100%</span>
                <span className="text-[11px] text-blue-100 font-medium leading-tight block mt-1">Código a medida</span>
              </div>
              <div className="bg-blue-600 text-white p-4 rounded-2xl text-center shadow-sm flex flex-col justify-center">
                <span className="text-lg sm:text-2xl font-black block font-mono">SQL & NoSQL</span>
                <span className="text-[10px] sm:text-[11px] text-blue-100 font-medium leading-tight block mt-1">Relacionales y No Relacionales</span>
              </div>
            </div>

            {/* Lista Compacta de Problemas Resueltos */}
            <div className="space-y-3 pt-4 border-t border-slate-200">
              {problems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-brand-electric flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-brand-dark">{item.title}</h4>
                      <p className="text-[11px] text-slate-600 leading-normal mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Columna Derecha: Imagen Enmarcada + Tarjeta de Detalle */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-2xl bg-white p-3">
              <div className="relative rounded-2xl overflow-hidden h-72 sm:h-96">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80"
                  alt="Equipo de NEXATEK colaborando en el diseño de un sistema"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-300 block mb-1">
                    Metodología Ágil
                  </span>
                  <p className="text-sm font-semibold text-white drop-shadow-sm">
                    Reuniones periódicas de avances y entregables continuos para validar cada módulo con tu empresa.
                  </p>
                </div>
              </div>

              {/* Pie de la tarjeta con botón cápsula */}
              <div className="p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
                  Alineamos los objetivos de negocio con una arquitectura de software limpia y libre de fallos.
                </p>

                <a
                  href="#metodologia"
                  className="group shrink-0 inline-flex items-center gap-2.5 pl-5 pr-2 py-2 text-xs font-bold text-white bg-brand-electric hover:bg-brand-hoverElectric rounded-full shadow-md transition-colors"
                >
                  <span>Ver metodología</span>
                  <div className="w-5 h-5 rounded-full bg-white text-brand-navy flex items-center justify-center">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
