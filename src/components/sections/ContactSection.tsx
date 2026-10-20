import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  Mail, 
  ShieldCheck, 
  Building, 
  User, 
  DollarSign, 
  Lock
} from 'lucide-react';
import { submitContactForm } from '../../services/contactService';
import type { ContactFormData } from '../../types';
import { companyInfo } from '../../data/company';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    service_type: 'Sistema de gestión',
    budget: '',
    message: '',
    privacy_accepted: false,
    honeypot: '', // Campo trampa anti-spam
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessageId, setSuccessMessageId] = useState<string | null>(null);

  const serviceOptions = [
    'Sistema de gestión',
    'Sistema de ventas e inventario',
    'Página o plataforma web',
    'Aplicación móvil',
    'Aplicación de escritorio (Java)',
    'Automatización de procesos',
    'Integración de sistemas',
    'Otro',
  ];

  const budgetOptions = [
    'Menos de $1,000 USD',
    '$1,000 - $3,000 USD',
    '$3,000 - $5,000 USD',
    'Más de $5,000 USD',
    'Por definir tras análisis',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    // Limpiar error al editar
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const result = await submitContactForm(formData);

      if (result.success) {
        setSuccessMessageId(result.messageId || 'confirmado');
        // Limpiar el formulario solo tras éxito
        setFormData({
          name: '',
          email: '',
          company: '',
          service_type: 'Sistema de gestión',
          budget: '',
          message: '',
          privacy_accepted: false,
          honeypot: '',
        });
      } else {
        setErrorMessage(result.error || 'No fue posible registrar la solicitud. Por favor intenta de nuevo.');
      }
    } catch {
      setErrorMessage('Ocurrió un error al procesar la solicitud. Tus datos se mantuvieron para que puedas reintentar.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contacto" className="py-20 lg:py-28 bg-white border-b border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Columna Izquierda: Información de Contacto y Confianza */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-brand-electric text-xs font-semibold tracking-wide border border-blue-200/50">
              <Mail className="w-3.5 h-3.5" />
              <span>Canal Directo con NEXATEK</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight leading-tight">
              Inicia tu cotización <br />
              <span className="text-brand-electric">sin intermediarios</span>
            </h2>

            <p className="text-base text-brand-muted leading-relaxed">
              Completa el formulario describiendo lo que tu empresa necesita. Todos los datos ingresados se guardan de forma cifrada y confidencial en nuestra base de datos.
            </p>

            {/* Puntos de Garantía */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-brand-electric flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-brand-dark">Confidencialidad Garantizada</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Tus requerimientos y datos de negocio son privados y no son compartidos con terceros.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-slate-100 text-brand-navy flex items-center justify-center shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-brand-dark">Base de Datos PostgreSQL Segura</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Protegido mediante políticas Row Level Security (RLS) en Supabase.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-brand-dark">Correo Oficial</h4>
                  <a href={`mailto:${companyInfo.contactEmail}`} className="text-xs font-semibold text-brand-electric hover:underline">
                    {companyInfo.contactEmail}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Tarjeta del Formulario */}
          <div className="lg:col-span-7">
            <div className="bg-brand-surface/70 rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-card">
              
              {/* Notificación de Éxito */}
              {successMessageId && (
                <div className="mb-6 p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-3 animate-fade-in">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
                    <h3 className="text-base font-bold text-emerald-900">
                      ¡Solicitud Registrada Exitosamente!
                    </h3>
                  </div>
                  <p className="text-sm text-emerald-800 leading-relaxed font-medium">
                    ¡Gracias por contactar con NEXATEK! Hemos recibido tu solicitud y revisaremos la información para ponernos en contacto contigo.
                  </p>
                  <div className="text-xs text-emerald-700 font-mono bg-emerald-100/70 p-2 rounded-lg inline-block">
                    Código de registro: {successMessageId}
                  </div>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setSuccessMessageId(null)}
                      className="text-xs font-bold text-emerald-800 hover:text-emerald-950 underline"
                    >
                      Enviar otra consulta
                    </button>
                  </div>
                </div>
              )}

              {/* Notificación de Error */}
              {errorMessage && (
                <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 flex items-start gap-3 animate-fade-in text-xs sm:text-sm">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">No pudimos procesar tu mensaje</span>
                    <p className="mt-0.5">{errorMessage}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Campo Trampa Anti-Spam (Honeypot) - Oculto para humanos */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="form_honeypot_check">No llenar este campo:</label>
                  <input
                    type="text"
                    id="form_honeypot_check"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Nombre Completo */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold text-brand-dark mb-1.5">
                      Nombre completo <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ej. Roberto Sánchez"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-electric/30 focus:border-brand-electric transition-colors"
                      />
                    </div>
                  </div>

                  {/* Correo Electrónico */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-brand-dark mb-1.5">
                      Correo electrónico <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="tu-correo@empresa.com"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-electric/30 focus:border-brand-electric transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Empresa o Negocio (Opcional) */}
                  <div>
                    <label htmlFor="company" className="block text-xs font-bold text-brand-dark mb-1.5">
                      Empresa o negocio <span className="text-slate-400 font-normal">(Opcional)</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Building className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Nombre de tu empresa"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-electric/30 focus:border-brand-electric transition-colors"
                      />
                    </div>
                  </div>

                  {/* Tipo de Servicio (Selector Obligatorio) */}
                  <div>
                    <label htmlFor="service_type" className="block text-xs font-bold text-brand-dark mb-1.5">
                      Tipo de servicio <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="service_type"
                        name="service_type"
                        required
                        value={formData.service_type}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-electric/30 focus:border-brand-electric transition-colors"
                      >
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Presupuesto Aproximado (Opcional) */}
                <div>
                  <label htmlFor="budget" className="block text-xs font-bold text-brand-dark mb-1.5">
                    Presupuesto aproximado <span className="text-slate-400 font-normal">(Opcional)</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <DollarSign className="w-4 h-4" />
                    </div>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-electric/30 focus:border-brand-electric transition-colors"
                    >
                      <option value="">Selecciona un rango estimado (opcional)</option>
                      {budgetOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Descripción del Proyecto o Mensaje */}
                <div>
                  <label htmlFor="message" className="block text-xs font-bold text-brand-dark mb-1.5">
                    Descripción del proyecto o requerimiento <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Cuéntanos brevemente qué procesos buscas optimizar, qué problemas enfrentas o las funciones que necesitas..."
                      className="w-full p-4 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-electric/30 focus:border-brand-electric transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Aceptación de Privacidad */}
                <div className="flex items-start gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="privacy_accepted"
                    name="privacy_accepted"
                    required
                    checked={formData.privacy_accepted}
                    onChange={handleChange}
                    className="w-4 h-4 mt-0.5 rounded border-slate-300 text-brand-electric focus:ring-brand-electric/30 cursor-pointer"
                  />
                  <label htmlFor="privacy_accepted" className="text-xs text-slate-600 leading-normal cursor-pointer select-none">
                    He leído y acepto el{' '}
                    <a href="/privacidad" target="_blank" className="text-brand-electric font-semibold hover:underline">
                      Aviso de Privacidad
                    </a>
                    . Entiendo que mis datos solo se utilizarán para evaluar mi cotización y responder mi solicitud.
                  </label>
                </div>

                {/* Botón de Enviar */}
                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group w-full inline-flex items-center justify-center gap-3 pl-8 pr-3 py-4 text-sm sm:text-base font-bold text-white bg-brand-electric hover:bg-brand-hoverElectric rounded-full shadow-lg shadow-brand-electric/30 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Verificando y guardando solicitud...</span>
                      </>
                    ) : (
                      <>
                        <span>Enviar solicitud de cotización</span>
                        <div className="w-8 h-8 rounded-full bg-white text-brand-navy flex items-center justify-center group-hover:translate-x-1 transition-transform">
                          <Send className="w-4 h-4 text-brand-electric" />
                        </div>
                      </>
                    )}
                  </button>
                  <p className="text-center text-[11px] text-slate-400 mt-2.5">
                    Tus datos se transmiten de manera segura a nuestra base de datos.
                  </p>
                </div>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
