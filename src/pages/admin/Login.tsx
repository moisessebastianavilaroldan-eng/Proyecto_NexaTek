import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, AlertCircle, Loader2, ArrowLeft, Shield, Info } from 'lucide-react';
import { adminLogin } from '../../services/adminService';
import { Logo } from '../../components/common/Logo';
import { isSupabaseConfigured } from '../../lib/supabase';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showForgotNotice, setShowForgotNotice] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const res = await adminLogin(email.trim(), password);
      if (res.success) {
        navigate('/admin');
      } else {
        setErrorMessage(res.error || 'Credenciales inválidas o cuenta no autorizada.');
      }
    } catch {
      setErrorMessage('Error al conectar con el servicio de autenticación.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-surface flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        
        {/* Link de retorno */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-brand-dark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a la página principal</span>
          </Link>
        </div>

        {/* Tarjeta de Login */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-card space-y-6">
          
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <Logo />
            </div>
            <div className="pt-2">
              <h1 className="text-xl font-extrabold text-brand-dark flex items-center justify-center gap-2">
                <Shield className="w-5 h-5 text-brand-electric" />
                <span>Panel de Integrantes</span>
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Acceso restringido únicamente a los integrantes autorizados de NEXATEK.
              </p>
            </div>
          </div>

          {/* Banner informativo de modo local si no hay Supabase en .env */}
          {!isSupabaseConfigured() && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <Info className="w-4 h-4 text-amber-700" />
                <span>Modo de Desarrollo Local Activo</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Aún no has configurado tus credenciales en <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">.env</code>. Para explorar el panel puedes usar:
                <br />
                <span className="font-mono font-semibold">admin@nexatek.com / admin123</span>
              </p>
            </div>
          )}

          {/* Alerta de Error */}
          {errorMessage && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-start gap-2.5 animate-fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-brand-dark mb-1.5" htmlFor="admin-email">
                Correo Electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="admin-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="integrante@nexatek.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-electric/30 focus:border-brand-electric transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-brand-dark" htmlFor="admin-password">
                  Contraseña
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotNotice(!showForgotNotice)}
                  className="text-[11px] text-brand-electric hover:underline font-semibold"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="admin-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-electric/30 focus:border-brand-electric transition-colors"
                />
              </div>
            </div>

            {showForgotNotice && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-[11px] text-brand-dark leading-relaxed animate-fade-in">
                <strong>Recuperación de contraseña:</strong> Por motivos de seguridad y control interno del equipo, el restablecimiento de contraseñas de administradores se realiza desde la consola de Supabase Auth o mediante solicitud interna a los miembros del equipo.
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-brand-electric hover:bg-brand-hoverElectric shadow-sm transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verificando acceso...</span>
                </>
              ) : (
                <span>Ingresar al Panel</span>
              )}
            </button>
          </form>

          <div className="pt-2 text-center border-t border-slate-100">
            <p className="text-[11px] text-slate-400">
              El registro público está desactivado. Solo los 4 integrantes autorizados tienen credenciales asignadas.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
