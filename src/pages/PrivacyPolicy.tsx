import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Lock } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { companyInfo } from '../data/company';

export const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-brand-electric hover:text-brand-hoverElectric transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a la página principal</span>
            </Link>
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-brand-electric text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Transparencia y Seguridad de Información</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
              Aviso de Privacidad
            </h1>
            
            <p className="text-xs text-slate-500 font-medium">
              Última actualización: Octubre 2026
            </p>

            <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-6 pt-4 border-t border-slate-100">
              <section className="space-y-3">
                <h2 className="text-lg font-bold text-brand-navy">1. Identidad y Responsable del Tratamiento</h2>
                <p>
                  <strong>NEXATEK</strong>, con domicilio de contacto digital en el correo{' '}
                  <a href={`mailto:${companyInfo.contactEmail}`} className="text-brand-electric underline">
                    {companyInfo.contactEmail}
                  </a>
                  , es responsable del tratamiento y resguardo confidencial de los datos personales proporcionados voluntariamente por los usuarios a través del formulario de contacto de este sitio web.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold text-brand-navy">2. Datos Personales Recabados</h2>
                <p>
                  Para atender solicitudes de cotización e información técnica sobre nuestros servicios de software, recabamos los siguientes datos:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
                  <li>Nombre completo.</li>
                  <li>Dirección de correo electrónico corporativo o personal.</li>
                  <li>Nombre de la empresa o negocio (opcional).</li>
                  <li>Tipo de servicio y requerimientos del proyecto.</li>
                  <li>Presupuesto aproximado (opcional).</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold text-brand-navy">3. Finalidades del Tratamiento</h2>
                <p>
                  Los datos recabados son utilizados única y exclusivamente para:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
                  <li>Evaluar los requerimientos técnicos descritos y estructurar una propuesta o cotización.</li>
                  <li>Contactar al solicitante por correo electrónico para aclarar dudas del proyecto.</li>
                  <li>Llevar el registro y seguimiento interno de solicitudes en la base de datos de NEXATEK.</li>
                </ul>
                <p className="text-sm font-semibold text-brand-dark">
                  NEXATEK no vende, no comercializa ni transfiere tus datos personales a empresas de publicidad ni a terceros no autorizados.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold text-brand-navy">4. Almacenamiento Seguro y Protección</h2>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <Lock className="w-5 h-5 text-brand-navy shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Las solicitudes se almacenan de manera cifrada en una base de datos PostgreSQL en Supabase, protegida con políticas de seguridad a nivel de fila (Row Level Security - RLS). Solo los cuatro integrantes autorizados del equipo tienen credenciales de acceso para consultar la bandeja de entrada.
                  </p>
                </div>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold text-brand-navy">5. Derechos de Acceso, Rectificación y Cancelación</h2>
                <p>
                  Cualquier usuario puede solicitar en cualquier momento la eliminación o actualización de sus datos de contacto de nuestros registros enviando un mensaje directo a{' '}
                  <a href={`mailto:${companyInfo.contactEmail}`} className="text-brand-electric font-semibold underline">
                    {companyInfo.contactEmail}
                  </a>
                  .
                </p>
              </section>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};
