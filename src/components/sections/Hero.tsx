import React from 'react';
import { ArrowRight, Sparkles, Building2, Sliders, Headset, Layers, ShieldCheck, Database, GitBranch } from 'lucide-react';

export const Hero: React.FC = () => {
  const highlightFeatures = [
    {
      icon: Building2,
      title: 'Sistemas de Gestión',
      desc: 'Control integral de operaciones, inventarios y compras en un solo lugar.',
    },
    {
      icon: Sliders,
      title: 'Soluciones a Medida',
      desc: 'Software diseñado específicamente para las reglas de tu modelo de negocio.',
    },
    {
      icon: Headset,
      title: 'Soporte Continuo',
      desc: 'Acompañamiento directo de nuestro equipo tras la entrega y puesta en marcha.',
    },
    {
      icon: Layers,
      title: 'Arquitectura Escalable',
      desc: 'Bases de datos PostgreSQL seguras y código preparado para crecer con tu empresa.',
    },
  ];

  return (
    <div className="relative bg-[#061220] text-white overflow-hidden pt-28 sm:pt-36">
      
      {/* Resplandores y Luces Neón de Fondo (Efecto Dark Tech) */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-brand-electric/15 rounded-full blur-[140px] pointer-events-none -z-0" />
      <div className="absolute top-1/3 left-0 w-[450px] h-[450px] bg-brand-navy/30 rounded-full blur-[130px] pointer-events-none -z-0" />

      {/* SECCIÓN PRINCIPAL DEL HERO */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Columna Izquierda: Copywriting y CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Badge Píldora */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-brand-electric text-xs font-semibold tracking-wide backdrop-blur-sm shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Desarrollo de Software Empresarial a Medida</span>
            </div>

            {/* Título Principal */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12]">
              Tu Negocio. <br />
              Tus Procesos. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-brand-electric to-blue-300">
                Una Solución a tu Medida.
              </span>
            </h1>

            {/* Descripción */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Desarrollamos sistemas de gestión y soluciones digitales que ayudan a las empresas a optimizar sus operaciones, organizar su información y trabajar de manera más eficiente.
            </p>

            {/* Botones de Acción Estilo Cápsula */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#contacto"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 pl-7 pr-3 py-3.5 text-sm sm:text-base font-bold text-white bg-brand-electric hover:bg-brand-hoverElectric rounded-full shadow-lg shadow-brand-electric/30 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Solicitar cotización</span>
                <div className="w-8 h-8 rounded-full bg-white text-brand-navy flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </a>

              <a
                href="#proyectos"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-sm sm:text-base font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all"
              >
                <span>Explorar proyectos</span>
              </a>
            </div>

            {/* Bloque de Confianza: Los 4 Integrantes */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-left">
              {/* Círculos con Iniciales de los 4 Integrantes */}
              <div className="flex -space-x-2.5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-navy to-brand-electric border-2 border-[#061220] flex items-center justify-center text-xs font-bold text-white shadow-xs">
                  RY
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-700 to-indigo-500 border-2 border-[#061220] flex items-center justify-center text-xs font-bold text-white shadow-xs">
                  MS
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-electric to-cyan-400 border-2 border-[#061220] flex items-center justify-center text-xs font-bold text-white shadow-xs">
                  GL
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-600 to-blue-400 border-2 border-[#061220] flex items-center justify-center text-xs font-bold text-white shadow-xs">
                  PA
                </div>
              </div>
              <div className="text-xs text-slate-300">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <span>Equipo de 4 Desarrolladores Dedicados</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <span className="text-slate-400">Colaboración activa y trazable en GitHub</span>
              </div>
            </div>

          </div>

          {/* Columna Derecha: Imagen Nocturna de Programación + Badges Flotantes */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Contenedor con borde neón y esquinas curvas */}
              <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl shadow-blue-950/50 group">
                <img
                  src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&w=1000&q=80"
                  alt="Desarrollador de software trabajando en un sistema empresarial"
                  className="w-full h-[420px] sm:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061220] via-transparent to-transparent opacity-80" />

                {/* Tarjeta Flotante Inferior de Indicadores Demostrativos */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-[#0B1F33]/90 backdrop-blur-md border border-white/15 shadow-xl text-left space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <GitBranch className="w-4 h-4 text-brand-electric" />
                      Arquitectura Modular NEXATEK
                    </span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      En producción
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-300 leading-snug">
                    Desarrollo colaborativo sincronizado con control de versiones en GitHub y base PostgreSQL en Supabase.
                  </div>
                </div>

                {/* Badge Flotante Superior */}
                <div className="absolute top-5 right-5 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg flex items-center gap-2.5">
                  <Database className="w-5 h-5 text-brand-electric" />
                  <div className="text-left text-xs font-bold text-white leading-none">
                    <span>PostgreSQL</span>
                    <span className="block text-[10px] text-slate-300 font-normal mt-0.5">RLS Activado</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* SECCIÓN DE 4 TARJETAS FLOTANTES (Fondo blanco / superficie) */}
      <div className="bg-white text-slate-800 pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
        <div className="max-w-7xl mx-auto -mt-16 sm:-mt-20 relative z-20">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {highlightFeatures.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:border-brand-electric/40 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-13 h-13 w-12 h-12 rounded-2xl bg-brand-surface border border-slate-200 flex items-center justify-center text-brand-navy group-hover:bg-brand-electric group-hover:text-white transition-colors duration-200 mb-5 shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="text-base font-bold text-brand-dark mb-2 group-hover:text-brand-electric transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Statement Central de Alto Impacto (Estilo la imagen de referencia) */}
          <div className="mt-20 max-w-4xl mx-auto text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark tracking-tight leading-snug">
              Creamos soluciones de software inteligentes que combinan estrategia, arquitectura modular y soporte dedicado para ayudar a tu negocio a crecer sin límites operativos.
            </h2>
          </div>

        </div>
      </div>

    </div>
  );
};
