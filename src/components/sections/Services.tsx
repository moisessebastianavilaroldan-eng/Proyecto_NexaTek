import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Smartphone, 
  Monitor,
  Palette, 
  Database, 
  Cpu, 
  Wrench, 
  ArrowRight, 
  CheckCircle2,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { servicesList } from '../../data/services';
import type { ServiceItem } from '../../types';

const iconMap: Record<string, React.ElementType> = {
  Globe,
  Smartphone,
  Monitor,
  Palette,
  Database,
  Cpu,
  Wrench,
};

interface ServiceCardProps {
  service: ServiceItem;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const IconComponent = iconMap[service.iconName] || Globe;

  return (
    <div className="h-full bg-[#0C1E33] hover:bg-[#102742] rounded-3xl p-7 border border-white/10 hover:border-brand-electric/60 transition-all duration-300 flex flex-col justify-between group shadow-xl">
      <div>
        {/* Icono con fondo neón en azul eléctrico */}
        <div className="w-12 h-12 rounded-2xl bg-brand-electric/15 border border-brand-electric/30 flex items-center justify-center text-brand-electric group-hover:bg-brand-electric group-hover:text-white transition-all duration-300 mb-6 shadow-inner">
          <IconComponent className="w-6 h-6" />
        </div>

        <h3 className="text-lg font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
          {service.title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
          {service.shortDescription}
        </p>

        {/* Lista de características */}
        <div className="space-y-2 pt-4 border-t border-white/10">
          {service.details.map((detail, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-electric shrink-0 mt-0.5" />
              <span>{detail}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Enlace inferior con flecha */}
      <div className="mt-8 pt-4 border-t border-white/10">
        <a
          href="#contacto"
          className="inline-flex items-center gap-2 text-xs font-bold text-brand-electric hover:text-blue-300 transition-colors"
        >
          <span>Solicitar información</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
        </a>
      </div>
    </div>
  );
};

export const Services: React.FC = () => {
  // Índice actual del carrusel: de 3 en 3 (Página 0: items 0,1,2 | Página 1: items 3,4,5)
  const [currentPage, setCurrentPage] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const totalPages = Math.ceil(servicesList.length / 3); // 6 / 3 = 2 páginas

  // Avance automático cada 6 segundos si no se hace hover
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

  return (
    <section 
      id="servicios" 
      className="py-24 lg:py-32 bg-[#061220] text-white relative overflow-hidden"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      
      {/* Resplandor neón en el fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-brand-electric/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabecera Dark Tech con controles del carrusel */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-brand-electric text-xs font-semibold tracking-wide backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Nuestros Servicios Especializados</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Lo que obtienes con nuestros <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-brand-electric to-blue-200">
                servicios de software
              </span>
            </h2>

            <p className="text-base text-slate-300 leading-relaxed font-normal">
              Cada desarrollo se adapta con precisión a tus procesos empresariales, garantizando velocidad de respuesta, alta seguridad y libertad de operación.
            </p>
          </div>

          {/* Botones de Navegación del Carrusel Estilo Cápsula Redondeada */}
          <div className="flex items-center justify-center md:justify-end gap-3 shrink-0">
            <button
              onClick={prevSlide}
              aria-label="Anterior grupo de servicios"
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white text-slate-300 hover:text-brand-navy border border-white/15 flex items-center justify-center transition-all duration-200 active:scale-95 shadow-md"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextSlide}
              aria-label="Siguiente grupo de servicios"
              className="w-12 h-12 rounded-full bg-brand-electric hover:bg-brand-hoverElectric text-white flex items-center justify-center transition-all duration-200 active:scale-95 shadow-lg shadow-brand-electric/30"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* CONTENEDOR DEL CARRUSEL (Mostrando 3 tarjetas por vista con deslizamiento) */}
        <div className="overflow-hidden relative">
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentPage * 100}%)` }}
          >
            {/* Página 1 (3 servicios) */}
            <div className="w-full shrink-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicesList.slice(0, 3).map((service) => (
                <div key={service.id} className="h-full">
                  <ServiceCard service={service} />
                </div>
              ))}
            </div>

            {/* Página 2 (3 servicios) */}
            <div className="w-full shrink-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicesList.slice(3, 6).map((service) => (
                <div key={service.id} className="h-full">
                  <ServiceCard service={service} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Indicadores de Puntos (Dots de paginación) */}
        <div className="flex items-center justify-center gap-2.5 mt-12">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx)}
              aria-label={`Ir a la página ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentPage === idx 
                  ? 'w-9 bg-brand-electric' 
                  : 'w-2.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Llamado en cápsula inferior */}
        <div className="mt-14 text-center">
          <a
            href="#contacto"
            className="group inline-flex items-center gap-3 pl-6 pr-2.5 py-3 text-xs sm:text-sm font-bold text-white bg-white/10 hover:bg-white/15 border border-white/15 rounded-full transition-all"
          >
            <span>¿Tienes un requerimiento especial para tu empresa?</span>
            <div className="w-6 h-6 rounded-full bg-brand-electric text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </a>
        </div>

      </div>
    </section>
  );
};
