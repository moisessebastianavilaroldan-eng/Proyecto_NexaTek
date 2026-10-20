import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Inbox, 
  Search, 
  LogOut, 
  RefreshCw, 
  Eye, 
  Mail, 
  CheckCircle2, 
  Clock, 
  CheckCheck, 
  SlidersHorizontal, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Calendar, 
  Building, 
  DollarSign, 
  ExternalLink,
  Trash2,
  AlertCircle,
  Menu
} from 'lucide-react';
import { Logo } from '../../components/common/Logo';
import { 
  getContactMessages, 
  updateMessageStatus, 
  deleteContactMessage, 
  adminLogout 
} from '../../services/adminService';
import type { ContactMessage, MessageStatus, AdminFilters } from '../../types';
import { isSupabaseConfigured, supabase } from '../../lib/supabase';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [metrics, setMetrics] = useState({
    total: 0,
    new: 0,
    review: 0,
    closed: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Filtros
  const [filters, setFilters] = useState<AdminFilters>({
    searchTerm: '',
    status: 'Todos',
    serviceType: 'Todos',
    sortByDate: 'desc',
    page: 1,
    pageSize: 8,
  });

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getContactMessages(filters);
      setMessages(res.messages);
      setMetrics({
        total: res.totalCount,
        new: res.newCount,
        review: res.reviewCount,
        closed: res.closedCount,
      });
    } catch (err) {
      console.error('Error al cargar datos:', err);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Suscripción Realtime si Supabase está configurado
  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'contact_messages' },
        () => {
          loadData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadData]);

  const handleLogout = async () => {
    await adminLogout();
    navigate('/admin/login');
  };

  const handleStatusChange = async (newStatus: MessageStatus) => {
    if (!selectedMessage) return;
    setIsUpdatingStatus(true);
    try {
      const success = await updateMessageStatus(selectedMessage.id, newStatus);
      if (success) {
        setSelectedMessage((prev) => prev ? { ...prev, status: newStatus } : null);
        await loadData();
      }
    } catch (err) {
      console.error('Error actualizando estado:', err);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!window.confirm('¿Confirmas que deseas eliminar permanentemente este mensaje?')) return;
    try {
      const success = await deleteContactMessage(id);
      if (success) {
        setSelectedMessage(null);
        await loadData();
      }
    } catch (err) {
      console.error('Error eliminando mensaje:', err);
    }
  };

  const getStatusBadge = (status: MessageStatus) => {
    switch (status) {
      case 'Nuevo':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            Nuevo
          </span>
        );
      case 'En revisión':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
            <Clock className="w-3 h-3 text-amber-600" />
            En revisión
          </span>
        );
      case 'Contactado':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800 border border-purple-200">
            <CheckCircle2 className="w-3 h-3 text-purple-600" />
            Contactado
          </span>
        );
      case 'Cerrado':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
            <CheckCheck className="w-3 h-3 text-slate-500" />
            Cerrado
          </span>
        );
    }
  };

  const totalPages = Math.max(1, Math.ceil(metrics.total / filters.pageSize));

  return (
    <div className="min-h-screen bg-slate-100/70 flex">
      
      {/* Sidebar de Navegación Lateral */}
      <aside 
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-brand-dark text-slate-300 transition-transform duration-300 transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col justify-between`}
      >
        <div>
          {/* Header del Sidebar */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <Logo isLight />
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-md text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Menú de Navegación */}
          <div className="p-4 space-y-1">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Bandeja Central
            </div>

            <button
              onClick={() => {
                setFilters((prev) => ({ ...prev, status: 'Todos', page: 1 }));
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                filters.status === 'Todos'
                  ? 'bg-brand-navy text-white shadow-xs'
                  : 'text-slate-400 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Inbox className="w-4 h-4 text-brand-electric" />
                <span>Todos los mensajes</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300">
                {metrics.total}
              </span>
            </button>

            <button
              onClick={() => {
                setFilters((prev) => ({ ...prev, status: 'Nuevo', page: 1 }));
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                filters.status === 'Nuevo'
                  ? 'bg-brand-navy text-white shadow-xs'
                  : 'text-slate-400 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span>Nuevos</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-blue-500/20 text-blue-400 font-bold">
                {metrics.new}
              </span>
            </button>

            <button
              onClick={() => {
                setFilters((prev) => ({ ...prev, status: 'En revisión', page: 1 }));
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                filters.status === 'En revisión'
                  ? 'bg-brand-navy text-white shadow-xs'
                  : 'text-slate-400 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>En revisión</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500/20 text-amber-400">
                {metrics.review}
              </span>
            </button>

            <button
              onClick={() => {
                setFilters((prev) => ({ ...prev, status: 'Cerrado', page: 1 }));
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                filters.status === 'Cerrado'
                  ? 'bg-brand-navy text-white shadow-xs'
                  : 'text-slate-400 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-slate-500" />
                <span>Cerrados</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-400">
                {metrics.closed}
              </span>
            </button>
          </div>
        </div>

        {/* Footer del Sidebar */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <span>Ver sitio público</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {/* Backdrop para móvil */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        />
      )}

      {/* Contenido Principal */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        
        {/* Barra Superior */}
        <header className="bg-white border-b border-slate-200/80 px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-brand-dark">
                Bandeja de Solicitudes
              </h1>
              <p className="text-[11px] text-slate-500">
                Gestión de consultas de cotización de clientes de NEXATEK
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              disabled={isLoading}
              className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-brand-electric hover:bg-slate-50 transition-colors"
              title="Refrescar mensajes"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-brand-electric' : ''}`} />
            </button>

            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Equipo Autorizado</span>
            </div>
          </div>
        </header>

        {/* Cuerpo del Dashboard */}
        <main className="p-4 sm:p-8 space-y-6 flex-1">
          
          {/* Tarjetas Métricas */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-xs font-medium text-slate-500">Total Solicitudes</span>
              <div className="text-2xl font-black text-brand-dark mt-1">
                {metrics.total}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">Histórico de mensajes</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-blue-200/80 shadow-xs bg-gradient-to-br from-white to-blue-50/30">
              <span className="text-xs font-medium text-blue-700">Mensajes Nuevos</span>
              <div className="text-2xl font-black text-blue-600 mt-1">
                {metrics.new}
              </div>
              <span className="text-[10px] text-blue-500 mt-1 block">Pendientes de atención</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-amber-200/80 shadow-xs bg-gradient-to-br from-white to-amber-50/30">
              <span className="text-xs font-medium text-amber-700">En Revisión</span>
              <div className="text-2xl font-black text-amber-600 mt-1">
                {metrics.review}
              </div>
              <span className="text-[10px] text-amber-500 mt-1 block">Evaluación de alcance</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-xs font-medium text-slate-500">Cerrados</span>
              <div className="text-2xl font-black text-slate-700 mt-1">
                {metrics.closed}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">Atendidos o finalizados</span>
            </div>
          </div>

          {/* Barra de Filtros y Búsqueda */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
            {/* Buscador */}
            <div className="relative w-full md:w-80">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Buscar por cliente, empresa o email..."
                value={filters.searchTerm}
                onChange={(e) => setFilters((prev) => ({ ...prev, searchTerm: e.target.value, page: 1 }))}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-electric/30 focus:border-brand-electric"
              />
            </div>

            {/* Selectores de Filtro */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {/* Filtro de Servicio */}
              <select
                value={filters.serviceType}
                onChange={(e) => setFilters((prev) => ({ ...prev, serviceType: e.target.value, page: 1 }))}
                className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-electric/30"
              >
                <option value="Todos">Todos los servicios</option>
                <option value="Sistema de gestión">Sistema de gestión</option>
                <option value="Sistema de ventas e inventario">Ventas e inventario</option>
                <option value="Página o plataforma web">Plataforma web</option>
                <option value="Aplicación móvil">Aplicación móvil</option>
                <option value="Automatización de procesos">Automatización</option>
                <option value="Integración de sistemas">Integración</option>
                <option value="Otro">Otro</option>
              </select>

              {/* Orden de Fecha */}
              <button
                onClick={() => setFilters((prev) => ({ ...prev, sortByDate: prev.sortByDate === 'desc' ? 'asc' : 'desc' }))}
                className="px-3 py-2 text-xs rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Fecha: {filters.sortByDate === 'desc' ? 'Más recientes' : 'Más antiguos'}</span>
              </button>
            </div>
          </div>

          {/* Tabla de Mensajes */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3.5 px-4 sm:px-6">Remitente</th>
                    <th className="py-3.5 px-4">Empresa</th>
                    <th className="py-3.5 px-4">Servicio</th>
                    <th className="py-3.5 px-4">Estado</th>
                    <th className="py-3.5 px-4">Fecha</th>
                    <th className="py-3.5 px-4 sm:px-6 text-right">Detalle</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {isLoading ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-400">
                        <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-brand-electric" />
                        <span>Cargando solicitudes...</span>
                      </td>
                    </tr>
                  ) : messages.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-500">
                        <AlertCircle className="w-6 h-6 mx-auto mb-2 text-slate-400" />
                        <span className="font-medium">No se encontraron solicitudes con los filtros seleccionados.</span>
                      </td>
                    </tr>
                  ) : (
                    messages.map((msg) => (
                      <tr 
                        key={msg.id} 
                        className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                        onClick={() => setSelectedMessage(msg)}
                      >
                        <td className="py-3.5 px-4 sm:px-6">
                          <div className="font-bold text-brand-dark">{msg.name}</div>
                          <div className="text-slate-400 text-[11px] font-mono">{msg.email}</div>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600">
                          {msg.company || <span className="text-slate-300 italic">No especificada</span>}
                        </td>
                        <td className="py-3.5 px-4 font-medium text-slate-700">
                          {msg.service_type}
                        </td>
                        <td className="py-3.5 px-4">
                          {getStatusBadge(msg.status)}
                        </td>
                        <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                          {new Date(msg.created_at).toLocaleDateString('es-ES', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedMessage(msg);
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-brand-electric hover:bg-blue-50 transition-colors"
                            title="Ver solicitud completa"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Paginación */}
            <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div>
                Página <span className="font-bold text-slate-800">{filters.page}</span> de <span className="font-bold text-slate-800">{totalPages}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  disabled={filters.page <= 1}
                  onClick={() => setFilters((prev) => ({ ...prev, page: prev.page - 1 }))}
                  className="p-1.5 rounded-lg border border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  disabled={filters.page >= totalPages}
                  onClick={() => setFilters((prev) => ({ ...prev, page: prev.page + 1 }))}
                  className="p-1.5 rounded-lg border border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </main>
      </div>

      {/* Modal de Detalle de Solicitud */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Cabecera del Modal */}
            <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Detalle de Solicitud
                </span>
                <h3 className="text-lg font-black text-brand-dark">
                  {selectedMessage.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Contenido con Scroll */}
            <div className="p-6 space-y-6 overflow-y-auto flex-1 text-xs">
              
              {/* Selector de Estado Activo */}
              <div className="p-4 rounded-2xl bg-brand-surface border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="font-bold text-brand-navy block">Estado de la Solicitud</span>
                  <span className="text-[11px] text-slate-500">Actualiza el progreso en Supabase</span>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    disabled={isUpdatingStatus}
                    value={selectedMessage.status}
                    onChange={(e) => handleStatusChange(e.target.value as MessageStatus)}
                    className="px-3 py-1.5 rounded-xl border border-slate-300 font-bold bg-white text-xs text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-electric/30"
                  >
                    <option value="Nuevo">Nuevo</option>
                    <option value="En revisión">En revisión</option>
                    <option value="Contactado">Contactado</option>
                    <option value="Cerrado">Cerrado</option>
                  </select>
                  {isUpdatingStatus && <RefreshCw className="w-4 h-4 animate-spin text-brand-electric" />}
                </div>
              </div>

              {/* Grid de Datos del Contacto */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Correo Electrónico</span>
                  <div className="font-semibold text-brand-dark flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-brand-electric" />
                    <span>{selectedMessage.email}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Empresa o Negocio</span>
                  <div className="font-semibold text-brand-dark flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-slate-500" />
                    <span>{selectedMessage.company || 'Particular / No especificado'}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Servicio Requerido</span>
                  <div className="font-semibold text-brand-electric">
                    {selectedMessage.service_type}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Presupuesto Estimado</span>
                  <div className="font-semibold text-emerald-700 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{selectedMessage.budget || 'Sin rango seleccionado'}</span>
                  </div>
                </div>
              </div>

              {/* Mensaje Completo del Cliente */}
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1.5">
                  Descripción del Proyecto o Necesidad
                </span>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-800 leading-relaxed whitespace-pre-wrap font-sans text-xs">
                  {selectedMessage.message}
                </div>
              </div>

              {/* Tiempos y Metadatos */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  Recibido: {new Date(selectedMessage.created_at).toLocaleString('es-ES')}
                </span>
                <span className="font-mono text-[10px]">
                  ID: {selectedMessage.id}
                </span>
              </div>
            </div>

            {/* Pie del Modal con Acciones */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => handleDeleteMessage(selectedMessage.id)}
                className="inline-flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-800 p-2 rounded-lg hover:bg-rose-50 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Eliminar mensaje</span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setSelectedMessage(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200/70 rounded-xl transition-colors"
                >
                  Cerrar
                </button>

                {/* mailto directo para responder sin simulación */}
                <a
                  href={`mailto:${selectedMessage.email}?subject=${encodeURIComponent(`Respuesta a tu solicitud en NEXATEK - ${selectedMessage.service_type}`)}&body=${encodeURIComponent(`Hola ${selectedMessage.name},\n\nGracias por comunicarte con NEXATEK. Hemos revisado tu solicitud respecto al servicio de "${selectedMessage.service_type}".\n\n[Escribe aquí tu respuesta]\n\nAtentamente,\nEquipo NEXATEK\nTecnología que impulsa tu negocio`)}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-brand-electric hover:bg-brand-hoverElectric rounded-xl shadow-xs transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Responder por correo</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
