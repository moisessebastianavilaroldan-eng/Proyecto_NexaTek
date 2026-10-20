import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { Logo } from '../common/Logo';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { label: 'Inicio', href: '/#inicio' },
    { label: 'Servicios', href: '/#servicios' },
    { label: 'Proyectos', href: '/#proyectos' },
    { label: 'Nosotros', href: '/#nosotros' },
    { label: 'Metodología', href: '/#metodologia' },
    { label: 'Preguntas', href: '/#faq' },
    { label: 'Contacto', href: '/#contacto' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#061220]/95 backdrop-blur-md shadow-lg py-3 border-b border-slate-800/80' 
          : 'bg-[#061220]/75 backdrop-blur-sm py-4 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo NEXATEK en versión contraste para Header Dark */}
          <Link to="/" className="focus:outline-none focus:ring-2 focus:ring-brand-electric/40 rounded-xl">
            <Logo isLight />
          </Link>

          {/* Navegación Desktop */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 py-2 text-xs xl:text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all rounded-full"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Acciones Desktop con botón cápsula estilo SaaS */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4">
            <Link
              to="/admin"
              className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5 px-3 py-2 rounded-full hover:bg-white/5 transition-colors"
              title="Panel Administrativo de NEXATEK"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-brand-electric" />
              <span>Equipo</span>
            </Link>

            <a
              href="/#contacto"
              className="group inline-flex items-center gap-2 pl-5 pr-2.5 py-2 text-xs xl:text-sm font-semibold text-white bg-brand-electric hover:bg-brand-hoverElectric rounded-full shadow-lg shadow-brand-electric/25 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Solicitar cotización</span>
              <div className="w-6 h-6 rounded-full bg-white text-brand-navy flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </a>
          </div>

          {/* Botón Menú Móvil */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="/#contacto"
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-brand-electric rounded-full"
            >
              Cotizar
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl focus:outline-none"
              aria-label="Abrir menú de navegación"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Desplegable Móvil */}
      {isOpen && (
        <div className="lg:hidden bg-[#0A1B2E] border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-fade-in">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-white/5 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-800 space-y-2">
            <a
              href="/#contacto"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-brand-electric rounded-full shadow-md"
            >
              <span>Solicitar cotización</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-slate-300 hover:bg-white/5 rounded-xl transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-brand-electric" />
              <span>Acceso Panel de Integrantes</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
