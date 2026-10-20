import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Shield, ArrowUp } from 'lucide-react';
import { Logo } from '../common/Logo';
import { companyInfo } from '../../data/company';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-dark text-slate-400 text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          
          {/* Identidad de la empresa */}
          <div className="lg:col-span-5 space-y-4">
            <Logo isLight />
            <p className="text-xs sm:text-sm text-slate-300 max-w-sm leading-relaxed">
              {companyInfo.description}
            </p>
            <div className="pt-2 flex items-center gap-2.5">
              {companyInfo.socialLinks.facebook && (
                <a
                  href={companyInfo.socialLinks.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#1877F2] transition-all shadow-sm"
                  aria-label="Facebook de NEXATEK"
                  title="Facebook Oficial"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {companyInfo.socialLinks.instagram && (
                <a
                  href={companyInfo.socialLinks.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 transition-all shadow-sm"
                  aria-label="Instagram de NEXATEK"
                  title="Instagram Oficial"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Enlaces Rápidos de Navegación */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Navegación
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="/#inicio" className="hover:text-white transition-colors">Inicio</a>
              </li>
              <li>
                <a href="/#servicios" className="hover:text-white transition-colors">Servicios Especializados</a>
              </li>
              <li>
                <a href="/#proyectos" className="hover:text-white transition-colors">Portafolio de Soluciones</a>
              </li>
              <li>
                <a href="/#nosotros" className="hover:text-white transition-colors">Sobre Nosotros (Equipo)</a>
              </li>
              <li>
                <a href="/#metodologia" className="hover:text-white transition-colors">Metodología de Trabajo</a>
              </li>
              <li>
                <a href="/#faq" className="hover:text-white transition-colors">Preguntas Frecuentes</a>
              </li>
            </ul>
          </div>

          {/* Contacto & Panel Administrativo */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Contacto y Administración
            </h4>
            <div className="space-y-2 text-xs">
              <p className="text-slate-300">
                Correo de contacto directo:
              </p>
              <a 
                href={`mailto:${companyInfo.contactEmail}`}
                className="inline-block text-brand-electric font-semibold hover:underline"
              >
                {companyInfo.contactEmail}
              </a>
              <div className="pt-3">
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                >
                  <Shield className="w-3.5 h-3.5 text-brand-electric" />
                  <span>Panel Privado para Integrantes</span>
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Fila Inferior con Derechos, Aviso de Privacidad y Botón Subir */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <span>© {currentYear} NEXATEK. Todos los derechos reservados.</span>
            <Link to="/privacidad" className="hover:text-white underline transition-colors">
              Aviso de Privacidad
            </Link>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
          >
            <span>Volver arriba</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
