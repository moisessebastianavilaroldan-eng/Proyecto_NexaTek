import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Eye, 
  X, 
  Layers, 
  ArrowRight,
  Trophy,
  Code,
  FolderTree,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Smartphone,
  Monitor,
  Globe,
  BarChart3,
  QrCode,
  ShieldCheck,
  CheckCircle,
  FileCode2
} from 'lucide-react';
import { projectsList } from '../../data/projects';
import type { ProjectCategory, Project } from '../../types';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('Todos');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [modalTab, setModalTab] = useState<'resumen' | 'modulos' | 'estructura' | 'metricas'>('resumen');
  const [copiedStructure, setCopiedStructure] = useState<boolean>(false);
  const [cardActiveTab, setCardActiveTab] = useState<Record<string, 'problema' | 'modulos' | 'stack'>>({});

  const categories: ProjectCategory[] = [
    'Todos',
    'Sistemas de gestión',
    'Aplicaciones web',
    'Aplicaciones de escritorio',
    'Aplicaciones móviles',
  ];

  const filteredProjects = selectedCategory === 'Todos'
    ? projectsList
    : projectsList.filter((p) => p.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Sistemas de gestión':
        return <Layers className="w-3.5 h-3.5 text-blue-500" />;
      case 'Aplicaciones web':
        return <Globe className="w-3.5 h-3.5 text-cyan-500" />;
      case 'Aplicaciones de escritorio':
        return <Monitor className="w-3.5 h-3.5 text-amber-500" />;
      case 'Aplicaciones móviles':
        return <Smartphone className="w-3.5 h-3.5 text-emerald-500" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-brand-electric" />;
    }
  };

  const openProjectModal = (project: Project, initialTab: 'resumen' | 'modulos' | 'estructura' | 'metricas' = 'resumen') => {
    setActiveModalProject(project);
    setModalTab(initialTab);
    setCopiedStructure(false);
  };

  const handleNextProject = () => {
    if (!activeModalProject) return;
    const currentIndex = projectsList.findIndex(p => p.id === activeModalProject.id);
    const nextIndex = (currentIndex + 1) % projectsList.length;
    setActiveModalProject(projectsList[nextIndex]);
    setCopiedStructure(false);
  };

  const handlePrevProject = () => {
    if (!activeModalProject) return;
    const currentIndex = projectsList.findIndex(p => p.id === activeModalProject.id);
    const prevIndex = (currentIndex - 1 + projectsList.length) % projectsList.length;
    setActiveModalProject(projectsList[prevIndex]);
    setCopiedStructure(false);
  };

  const copyStructureToClipboard = (text?: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedStructure(true);
    setTimeout(() => setCopiedStructure(false), 2500);
  };

  const setProjectCardTab = (projectId: string, tab: 'problema' | 'modulos' | 'stack') => {
    setCardActiveTab(prev => ({ ...prev, [projectId]: tab }));
  };

  return (
    <section id="proyectos" className="py-24 lg:py-32 bg-slate-50/60 border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado Principal */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-brand-electric text-xs font-semibold tracking-wide border border-blue-200/50 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
            <span>Portafolio de Soluciones Reales & Proyectos Académicos</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark tracking-tight">
            Proyectos que convierten <br />
            <span className="text-brand-electric">retos reales en software funcional</span>
          </h2>

          <p className="text-base text-brand-muted leading-relaxed font-normal">
            Soluciones desarrolladas y validadas por nuestro equipo de ingeniería. Explora la arquitectura, los módulos interactivos y las tecnologías de cada aplicación.
          </p>
        </div>

        {/* Filtros Interactivos por Categoría con Conteo y Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((category) => {
            const count = category === 'Todos' 
              ? projectsList.length 
              : projectsList.filter(p => p.category === category).length;
            const isSelected = selectedCategory === category;

            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`group px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 shadow-2xs border ${
                  isSelected
                    ? 'bg-brand-navy text-white border-brand-navy shadow-md shadow-brand-navy/20 scale-105'
                    : 'bg-white text-slate-600 border-slate-200/80 hover:bg-slate-100 hover:text-brand-dark hover:border-slate-300'
                }`}
              >
                {getCategoryIcon(category)}
                <span>{category}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono transition-colors ${
                  isSelected 
                    ? 'bg-brand-electric text-white' 
                    : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Cuadrícula Interactiva de Proyectos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project: Project) => {
            const currentCardTab = cardActiveTab[project.id] || 'problema';

            return (
              <div
                key={project.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand-electric/40 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Banner / Imagen con Badges e Interactividad */}
                  <div className="relative h-60 sm:h-64 overflow-hidden bg-slate-900">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    
                    {/* Badges superiores */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white/95 text-brand-dark backdrop-blur-sm shadow-sm">
                        {getCategoryIcon(project.category)}
                        <span>{project.category}</span>
                      </span>

                      {project.badge ? (
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold text-white shadow-sm ${
                          project.id === 'decideya-mobile' 
                            ? 'bg-amber-500 font-extrabold animate-pulse'
                            : project.id === 'edugest-academico'
                            ? 'bg-brand-electric'
                            : 'bg-slate-800 border border-slate-700'
                        }`}>
                          {project.id === 'decideya-mobile' && <Trophy className="w-3.5 h-3.5" />}
                          {project.id === 'edugest-academico' && <QrCode className="w-3.5 h-3.5" />}
                          <span>{project.badge}</span>
                        </span>
                      ) : (
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold text-white ${
                          project.status === 'En desarrollo' ? 'bg-amber-600' : 'bg-emerald-600'
                        }`}>
                          <span>{project.status}</span>
                        </span>
                      )}
                    </div>

                    {/* Título y subtítulo sobre imagen */}
                    <div className="absolute bottom-4 left-5 right-5 z-10">
                      <h3 className="text-xl sm:text-2xl font-black text-white leading-tight drop-shadow-sm">
                        {project.title}
                      </h3>
                      {project.highlightText && (
                        <p className="text-xs text-blue-200 mt-1 line-clamp-1 font-medium">
                          {project.highlightText}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Barra de Pestañas Interactivas DENTRO de la Tarjeta */}
                  <div className="flex items-center border-b border-slate-100 bg-slate-50/80 px-4 pt-2">
                    <button
                      onClick={() => setProjectCardTab(project.id, 'problema')}
                      className={`px-3 py-2 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
                        currentCardTab === 'problema'
                          ? 'border-brand-electric text-brand-electric bg-white rounded-t-lg'
                          : 'border-transparent text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Visión & Reto</span>
                    </button>

                    <button
                      onClick={() => setProjectCardTab(project.id, 'modulos')}
                      className={`px-3 py-2 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
                        currentCardTab === 'modulos'
                          ? 'border-brand-electric text-brand-electric bg-white rounded-t-lg'
                          : 'border-transparent text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      <Layers className="w-3 h-3" />
                      <span>Módulos ({project.modules?.length || project.keyFeatures.length})</span>
                    </button>

                    <button
                      onClick={() => setProjectCardTab(project.id, 'stack')}
                      className={`px-3 py-2 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
                        currentCardTab === 'stack'
                          ? 'border-brand-electric text-brand-electric bg-white rounded-t-lg'
                          : 'border-transparent text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      <Code className="w-3 h-3" />
                      <span>Stack ({project.technologies.length})</span>
                    </button>
                  </div>

                  {/* Contenido Dinámico de la Tarjeta según pestaña seleccionada */}
                  <div className="p-6 space-y-4 min-h-[160px]">
                    {currentCardTab === 'problema' && (
                      <div className="space-y-3 animate-fade-in text-xs">
                        <div>
                          <span className="font-bold text-rose-600 uppercase tracking-wider text-[10px] block mb-1">
                            El Problema Identificado
                          </span>
                          <p className="text-slate-600 leading-relaxed line-clamp-2">
                            {project.problemDescription}
                          </p>
                        </div>
                        <div className="pt-2 border-t border-slate-100">
                          <span className="font-bold text-brand-navy uppercase tracking-wider text-[10px] block mb-1">
                            Solución Desarrollada por NEXATEK
                          </span>
                          <p className="text-slate-700 leading-relaxed font-medium line-clamp-2">
                            {project.implementedSolution}
                          </p>
                        </div>
                      </div>
                    )}

                    {currentCardTab === 'modulos' && (
                      <div className="space-y-2 animate-fade-in">
                        <span className="font-bold text-brand-navy uppercase tracking-wider text-[10px] block mb-1.5">
                          Módulos y Capacidades del Sistema
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {(project.modules 
                            ? project.modules.map(m => m.name) 
                            : project.keyFeatures.slice(0, 4)
                          ).map((modName, idx) => (
                            <div 
                              key={idx}
                              className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200/70 text-xs font-medium text-slate-700"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-brand-electric shrink-0" />
                              <span className="truncate">{modName}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {currentCardTab === 'stack' && (
                      <div className="space-y-3 animate-fade-in">
                        <span className="font-bold text-brand-navy uppercase tracking-wider text-[10px] block mb-1.5">
                          Tecnologías Principales
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 rounded-lg text-xs font-bold bg-brand-surface text-brand-navy border border-slate-200/80"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        {project.folderStructure && (
                          <button
                            onClick={() => openProjectModal(project, 'estructura')}
                            className="inline-flex items-center gap-1.5 text-[11px] font-bold text-brand-electric hover:underline pt-1"
                          >
                            <FolderTree className="w-3.5 h-3.5" />
                            <span>Ver arquitectura de carpetas y backend</span>
                          </button>
                        )}
                      </div>
                    )}

                    {/* Métricas destacadas en miniatura */}
                    {project.metrics && project.metrics.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100">
                        {project.metrics.map((m, idx) => (
                          <div key={idx} className="bg-slate-50 rounded-xl p-2 text-center border border-slate-100">
                            <span className="block text-xs font-extrabold text-brand-navy">{m.value}</span>
                            <span className="block text-[10px] text-slate-500 font-medium truncate">{m.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer de la Tarjeta con Botón de Ficha Técnica Completa */}
                <div className="p-5 border-t border-slate-100 bg-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] font-medium text-slate-500">
                      Código verificado por el equipo
                    </span>
                  </div>

                  <button
                    onClick={() => openProjectModal(project)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-brand-navy hover:bg-brand-electric text-white transition-all shadow-xs group/btn"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Ver Ficha Técnica</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* MODAL INTERACTIVO COMPLETO CON PESTAÑAS, VISOR DE ESTRUCTURA Y NAVEGADOR DE PROYECTOS */}
      {activeModalProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setActiveModalProject(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-4xl w-full border border-slate-200 shadow-2xl overflow-hidden max-h-[94vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del Modal con Imagen, Navegador Anterior/Siguiente y Botón Cerrar */}
            <div className="relative h-44 sm:h-52 bg-slate-900 shrink-0">
              <img
                src={activeModalProject.thumbnail}
                alt={activeModalProject.title}
                className="w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
              
              {/* Botones de Navegación Rápida entre Proyectos */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 z-10">
                <button
                  onClick={handlePrevProject}
                  className="w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors backdrop-blur-xs"
                  title="Proyecto anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextProject}
                  className="w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors backdrop-blur-xs"
                  title="Siguiente proyecto"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <span className="text-[11px] text-white/80 font-mono ml-2 hidden sm:inline-block">
                  {projectsList.findIndex(p => p.id === activeModalProject.id) + 1} de {projectsList.length}
                </span>
              </div>

              {/* Botón Cerrar */}
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors backdrop-blur-xs z-10"
                aria-label="Cerrar modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Título y Categoría */}
              <div className="absolute bottom-4 left-5 right-5 z-10">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-3 py-0.5 rounded-full text-[10px] font-bold bg-brand-electric text-white">
                    {activeModalProject.category}
                  </span>
                  {activeModalProject.badge && (
                    <span className="px-3 py-0.5 rounded-full text-[10px] font-bold bg-white/20 text-white backdrop-blur-xs">
                      {activeModalProject.badge}
                    </span>
                  )}
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white ${
                    activeModalProject.status === 'En desarrollo' ? 'bg-amber-600' : 'bg-emerald-600'
                  }`}>
                    {activeModalProject.status}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {activeModalProject.title}
                </h3>
              </div>
            </div>

            {/* Pestañas de Navegación del Modal */}
            <div className="flex items-center gap-1 sm:gap-2 px-5 pt-3 border-b border-slate-200 bg-slate-50 shrink-0 overflow-x-auto">
              <button
                onClick={() => setModalTab('resumen')}
                className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
                  modalTab === 'resumen'
                    ? 'border-brand-electric text-brand-electric bg-white rounded-t-xl shadow-2xs'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Resumen & Objetivo</span>
              </button>

              <button
                onClick={() => setModalTab('modulos')}
                className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
                  modalTab === 'modulos'
                    ? 'border-brand-electric text-brand-electric bg-white rounded-t-xl shadow-2xs'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Módulos ({activeModalProject.modules?.length || activeModalProject.keyFeatures.length})</span>
              </button>

              {activeModalProject.folderStructure && (
                <button
                  onClick={() => setModalTab('estructura')}
                  className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
                    modalTab === 'estructura'
                      ? 'border-brand-electric text-brand-electric bg-white rounded-t-xl shadow-2xs'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <FolderTree className="w-3.5 h-3.5" />
                  <span>Estructura de Código</span>
                </button>
              )}

              <button
                onClick={() => setModalTab('metricas')}
                className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
                  modalTab === 'metricas'
                    ? 'border-brand-electric text-brand-electric bg-white rounded-t-xl shadow-2xs'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Stack & Métricas</span>
              </button>
            </div>

            {/* Contenido con Scroll de la Pestaña Activa */}
            <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1 text-xs sm:text-sm">
              
              {/* TAB 1: RESUMEN Y OBJETIVO */}
              {modalTab === 'resumen' && (
                <div className="space-y-6 animate-fade-in">
                  {/* Objetivo General si existe */}
                  {activeModalProject.generalObjective && (
                    <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/70 space-y-1.5">
                      <span className="font-bold text-brand-navy text-xs uppercase tracking-wider block flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-brand-electric" />
                        <span>Objetivo General del Proyecto</span>
                      </span>
                      <p className="text-slate-700 leading-relaxed font-normal text-xs sm:text-sm">
                        {activeModalProject.generalObjective}
                      </p>
                    </div>
                  )}

                  {/* Comparativa Desafío vs Solución */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-100 space-y-2">
                      <span className="font-bold text-rose-700 text-xs uppercase tracking-wider block">
                        Problema Identificado
                      </span>
                      <p className="text-slate-700 leading-relaxed text-xs">
                        {activeModalProject.problemDescription}
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                      <span className="font-bold text-brand-navy text-xs uppercase tracking-wider block">
                        Solución Técnica Propuesta
                      </span>
                      <p className="text-slate-700 leading-relaxed text-xs">
                        {activeModalProject.implementedSolution}
                      </p>
                    </div>
                  </div>

                  {/* Funcionalidades Clave Rápidas */}
                  <div>
                    <span className="text-xs font-bold text-brand-dark uppercase tracking-wider block mb-3">
                      Funcionalidades Principales Desarrolladas
                    </span>
                    <div className="space-y-2">
                      {activeModalProject.keyFeatures.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-brand-electric shrink-0 mt-0.5" />
                          <span className="leading-relaxed font-medium">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: MÓDULOS DEL SISTEMA */}
              {modalTab === 'modulos' && (
                <div className="space-y-4 animate-fade-in">
                  <span className="text-xs font-bold text-brand-dark uppercase tracking-wider block mb-1">
                    Arquitectura Modular del Software
                  </span>
                  <p className="text-xs text-slate-500 mb-4">
                    Cada componente fue diseñado bajo principios de cohesión funcional y bajo acoplamiento para facilitar escalabilidad y mantenimiento.
                  </p>

                  {activeModalProject.modules ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {activeModalProject.modules.map((mod, idx) => (
                        <div 
                          key={idx} 
                          className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-brand-electric/40 transition-colors space-y-2.5"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-blue-100 text-brand-navy flex items-center justify-center font-bold text-xs">
                              {idx + 1}
                            </div>
                            <h4 className="font-extrabold text-brand-dark text-xs sm:text-sm">
                              {mod.name}
                            </h4>
                          </div>

                          {mod.description && (
                            <p className="text-[11px] text-slate-600 font-medium">
                              {mod.description}
                            </p>
                          )}

                          <ul className="space-y-1.5 pt-1 border-t border-slate-200/60">
                            {mod.items.map((item, itemIdx) => (
                              <li key={itemIdx} className="flex items-start gap-2 text-xs text-slate-700">
                                <span className="text-brand-electric font-bold text-xs leading-none mt-1">•</span>
                                <span className="leading-tight">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {activeModalProject.keyFeatures.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-brand-electric shrink-0 mt-0.5" />
                          <span className="leading-relaxed font-medium">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: ESTRUCTURA DE CÓDIGO */}
              {modalTab === 'estructura' && activeModalProject.folderStructure && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-brand-dark uppercase tracking-wider block">
                        Organización del Repositorio
                      </span>
                      <p className="text-xs text-slate-500">
                        Estructura desacoplada de carpetas y dependencias de la solución.
                      </p>
                    </div>

                    <button
                      onClick={() => copyStructureToClipboard(activeModalProject.folderStructure)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                    >
                      {copiedStructure ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">¡Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copiar árbol</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="relative rounded-2xl bg-slate-950 p-5 font-mono text-xs text-emerald-400 overflow-x-auto shadow-inner border border-slate-800">
                    <pre className="leading-relaxed whitespace-pre font-mono">
                      {activeModalProject.folderStructure}
                    </pre>
                  </div>
                </div>
              )}

              {/* TAB 4: STACK Y MÉTRICAS */}
              {modalTab === 'metricas' && (
                <div className="space-y-6 animate-fade-in">
                  {/* Métricas clave */}
                  {activeModalProject.metrics && activeModalProject.metrics.length > 0 && (
                    <div>
                      <span className="text-xs font-bold text-brand-dark uppercase tracking-wider block mb-3">
                        Indicadores de Rendimiento & Logros
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {activeModalProject.metrics.map((metric, idx) => (
                          <div key={idx} className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 text-center">
                            <span className="text-xl sm:text-2xl font-black text-brand-navy block">
                              {metric.value}
                            </span>
                            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mt-1">
                              {metric.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Stack Completo */}
                  <div>
                    <span className="text-xs font-bold text-brand-dark uppercase tracking-wider block mb-3">
                      Herramientas y Frameworks Utilizados
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeModalProject.technologies.map((tech) => (
                        <div
                          key={tech}
                          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 text-brand-navy border border-slate-200"
                        >
                          <Code className="w-3.5 h-3.5 text-brand-electric" />
                          <span>{tech}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Footer del Modal */}
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Proyecto construido por los ingenieros de NEXATEK</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="w-1/2 sm:w-auto px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-full transition-colors text-center"
                >
                  Cerrar
                </button>
                <a
                  href="#contacto"
                  onClick={() => setActiveModalProject(null)}
                  className="w-1/2 sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2 text-xs font-bold text-white bg-brand-electric hover:bg-brand-hoverElectric rounded-full shadow-sm transition-colors"
                >
                  <span>Cotizar proyecto similar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
