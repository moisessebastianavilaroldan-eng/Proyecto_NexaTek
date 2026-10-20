import React, { useState, useEffect } from 'react';
import { 
  Layers, 
  Github, 
  Sparkles, 
  Database, 
  Server, 
  Smartphone, 
  MonitorSmartphone,
  Layout, 
  Wrench,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { techStackData } from '../../data/techStack';

export const TechStack: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // 6 categorías agrupadas de 3 en 3 = 2 páginas
  const itemsPerPage = 3;
  const totalPages = Math.ceil(techStackData.length / itemsPerPage);

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlay, totalPages]);

  const prevSlide = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Frontend':
        return <Layout className="w-4 h-4 text-brand-electric" />;
      case 'Backend & APIs':
        return <Server className="w-4 h-4 text-blue-600" />;
      case 'Bases de Datos Relacionales':
      case 'Bases de Datos No Relacionales':
        return <Database className="w-4 h-4 text-emerald-600" />;
      case 'Desarrollo Móvil & Escritorio':
      case 'Desarrollo Móvil':
        return <MonitorSmartphone className="w-4 h-4 text-purple-600" />;
      default:
        return <Wrench className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <section 
      className="py-20 lg:py-28 bg-brand-surface/60 border-b border-slate-100 relative overflow-hidden"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado con Controles del Carrusel */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-brand-electric text-xs font-semibold tracking-wide border border-blue-200/50">
              <Layers className="w-3.5 h-3.5 text-blue-500" />
              <span>Herramientas & Tecnologías</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark tracking-tight">
              Tecnologías probadas para software confiable
            </h2>

            <p className="text-base text-brand-muted leading-relaxed">
              Explora nuestro stack tecnológico por áreas especializadas. Desliza para conocer los lenguajes, frameworks y motores de bases de datos que dominamos.
            </p>
          </div>

          {/* Botones de Navegación del Carrusel de Tecnologías */}
          <div className="flex items-center justify-center md:justify-end gap-3 shrink-0">
            <button
              onClick={prevSlide}
              aria-label="Anterior grupo de tecnologías"
              className="w-12 h-12 rounded-full bg-white hover:bg-brand-navy text-slate-700 hover:text-white border border-slate-200/80 flex items-center justify-center transition-all duration-200 active:scale-95 shadow-xs"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextSlide}
              aria-label="Siguiente grupo de tecnologías"
              className="w-12 h-12 rounded-full bg-brand-electric hover:bg-brand-hoverElectric text-white flex items-center justify-center transition-all duration-200 active:scale-95 shadow-md shadow-brand-electric/25"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* CONTENEDOR DEL CARRUSEL (De 3 en 3 categorías) */}
        <div className="overflow-hidden relative pb-2">
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentPage * 100}%)` }}
          >
            {/* Página 1: Primeras 3 Categorías (Frontend, Backend & APIs, Bases Relacionales) */}
            <div className="w-full shrink-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {techStackData.slice(0, 3).map((group) => (
                <div
                  key={group.category}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:shadow-card hover:border-brand-electric/30 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                      <h3 className="text-base font-bold text-brand-dark flex items-center gap-2">
                        {getCategoryIcon(group.category)}
                        <span>{group.category}</span>
                      </h3>
                      <span className="text-[10px] font-bold text-brand-electric bg-blue-50 px-2.5 py-0.5 rounded-full font-mono border border-blue-100">
                        {group.items.length} tecnologías
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {group.items.map((tech) => (
                        <div 
                          key={tech.name} 
                          className="p-3 rounded-2xl bg-brand-surface/70 border border-slate-200/50 hover:border-brand-electric/40 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs sm:text-sm font-bold text-brand-navy">
                              {tech.name}
                            </span>
                            {(tech.name === 'Angular' || tech.name === 'React' || tech.name === 'Next.js' || tech.name === 'Go (Golang)' || tech.name === 'Spring Boot' || tech.name === 'PostgreSQL') && (
                              <span className="text-[10px] font-semibold text-brand-electric bg-blue-50 px-2 py-0.5 rounded-full">
                                Core
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                            {tech.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Página 2: Siguientes 3 Categorías (Bases No Relacionales, Móvil, Diseño y Colaboración) */}
            <div className="w-full shrink-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {techStackData.slice(3, 6).map((group) => (
                <div
                  key={group.category}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:shadow-card hover:border-brand-electric/30 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                      <h3 className="text-base font-bold text-brand-dark flex items-center gap-2">
                        {getCategoryIcon(group.category)}
                        <span>{group.category}</span>
                      </h3>
                      <span className="text-[10px] font-bold text-brand-electric bg-blue-50 px-2.5 py-0.5 rounded-full font-mono border border-blue-100">
                        {group.items.length} tecnologías
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {group.items.map((tech) => (
                        <div 
                          key={tech.name} 
                          className="p-3 rounded-2xl bg-brand-surface/70 border border-slate-200/50 hover:border-brand-electric/40 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs sm:text-sm font-bold text-brand-navy">
                              {tech.name}
                            </span>
                            {tech.name === 'GitHub' && (
                              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                                Colaboración
                              </span>
                            )}
                            {(tech.name === 'Docker' || tech.name === 'Render') && (
                              <span className="text-[10px] font-semibold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-full border border-cyan-200/60">
                                Despliegue Cloud
                              </span>
                            )}
                            {tech.name === 'Brevo' && (
                              <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/60">
                                Mailing Gmail
                              </span>
                            )}
                            {(tech.name === 'MongoDB' || tech.name === 'Expo Go' || tech.name === 'React Native' || tech.name === 'Python' || tech.name.includes('Java')) && (
                              <span className="text-[10px] font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                                Especialidad
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                            {tech.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Paginación de Puntos */}
        <div className="flex items-center justify-center gap-2.5 mt-10">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx)}
              aria-label={`Ir a la diapositiva ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentPage === idx 
                  ? 'w-9 bg-brand-navy' 
                  : 'w-2.5 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

        {/* Banner Horizontal Destacado de GitHub y Control de Versiones */}
        <div className="mt-14 bg-gradient-to-r from-brand-navy via-[#0d2a45] to-brand-dark rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white shrink-0 border border-white/10 shadow-inner">
              <Github className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-brand-electric text-xs font-semibold uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Colaboración Ágil de los 4 Integrantes</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold">
                Control de código y despliegue continuo con GitHub
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5 leading-relaxed">
                Trazabilidad completa en cada versión de software, revisiones continuas y sincronización directa con Vercel y Supabase.
              </p>
            </div>
          </div>

          <a
            href="#contacto"
            className="shrink-0 px-6 py-3 rounded-full text-xs font-bold text-brand-navy bg-white hover:bg-slate-100 transition-colors shadow-sm"
          >
            Consultar arquitectura técnica
          </a>
        </div>

      </div>
    </section>
  );
};
