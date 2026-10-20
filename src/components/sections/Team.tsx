import React from 'react';
import { Users, Github, Code2, ExternalLink } from 'lucide-react';
import { teamMembers } from '../../data/team';

export const Team: React.FC = () => {
  // Función para obtener iniciales a partir del nombre
  const getInitials = (fullName: string) => {
    const parts = fullName.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 2][0] || parts[1][0]}`.toUpperCase();
    }
    return fullName.substring(0, 2).toUpperCase();
  };

  return (
    <section id="nosotros" className="py-20 lg:py-28 bg-brand-surface/50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-brand-electric text-xs font-semibold tracking-wide border border-blue-200/50">
            <Users className="w-3.5 h-3.5" />
            <span>Equipo de Desarrollo</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
            Un equipo, una visión tecnológica
          </h2>

          <p className="text-base text-brand-muted leading-relaxed">
            Somos NEXATEK, un equipo de cuatro integrantes que combina conocimientos y habilidades para desarrollar soluciones de software adaptadas a las necesidades de cada proyecto.
          </p>
        </div>

        {/* 4 Tarjetas de Integrantes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => {
            const initials = getInitials(member.name);

            return (
              <div
                key={member.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-card hover:border-brand-electric/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Avatar Gráfico Corporativo con Iniciales */}
                  <div className="relative mb-6 flex justify-center">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-navy via-[#1b5387] to-brand-electric flex items-center justify-center text-white text-xl font-black shadow-md shadow-brand-navy/15 tracking-wider border border-white/20 group-hover:scale-105 transition-transform duration-200">
                      <span>{initials}</span>
                    </div>
                    <div className="absolute -bottom-2.5 px-3 py-0.5 bg-brand-surface border border-slate-200 rounded-full text-[10px] font-bold text-brand-navy shadow-xs flex items-center gap-1">
                      <Code2 className="w-3 h-3 text-brand-electric" />
                      <span>NEXATEK</span>
                    </div>
                  </div>

                  {/* Nombre y Rol */}
                  <div className="text-center mb-4">
                    <h3 className="text-base font-bold text-brand-dark group-hover:text-brand-electric transition-colors leading-snug">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-brand-electric mt-1">
                      {member.role}
                    </p>
                  </div>

                  {/* Especialidades */}
                  <div className="space-y-1.5 pt-3 border-t border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block text-center mb-2">
                      Especialidades
                    </span>
                    <div className="flex flex-wrap justify-center gap-1.5">
                      {member.specialties.map((spec) => (
                        <span
                          key={spec}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-50 text-slate-700 border border-slate-200/60"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Enlace Directo a GitHub */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  {member.githubUrl && (
                    <a
                      href={member.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-white bg-slate-50 hover:bg-brand-navy rounded-xl border border-slate-200/80 hover:border-brand-navy transition-all duration-200 shadow-2xs"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Ver GitHub</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
