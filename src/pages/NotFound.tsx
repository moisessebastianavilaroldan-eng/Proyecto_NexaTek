import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Logo } from '../components/common/Logo';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-brand-surface p-4 text-center">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-slate-200/90 shadow-card space-y-6">
        <div className="flex justify-center">
          <Logo />
        </div>

        <div className="space-y-2">
          <span className="text-6xl font-black text-brand-electric font-mono block">
            404
          </span>
          <h1 className="text-xl font-bold text-brand-dark">
            Página no encontrada
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            La página que buscas no existe o ha sido movida. Puedes regresar al inicio o contactarnos.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-2.5">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-brand-electric hover:bg-brand-hoverElectric rounded-xl shadow-sm transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Volver a la página de inicio</span>
          </Link>

          <Link
            to="/#contacto"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-600 hover:text-brand-dark hover:bg-slate-50 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Ir a formulario de contacto</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
