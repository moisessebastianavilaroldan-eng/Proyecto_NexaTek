import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { ContactMessage, MessageStatus, AdminFilters } from '../types';

export interface MessagesResponse {
  messages: ContactMessage[];
  totalCount: number;
  newCount: number;
  reviewCount: number;
  closedCount: number;
}

// 1. Autenticación con Supabase Auth
export const adminLogin = async (email: string, password: string) => {
  if (!isSupabaseConfigured()) {
    // Si no está configurado Supabase, modo demostración local para desarrollo
    if (email === 'admin@nexatek.com' && password === 'admin123') {
      localStorage.setItem('nexatek_dev_session', 'true');
      return { success: true, user: { email, id: 'dev-admin-id' } };
    }
    return { 
      success: false, 
      error: 'Supabase no está configurado en .env. Para probar el panel en modo desarrollo local, usa admin@nexatek.com / admin123.' 
    };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, user: data.user };
};

export const adminLogout = async () => {
  if (isSupabaseConfigured()) {
    await supabase.auth.signOut();
  }
  localStorage.removeItem('nexatek_dev_session');
};

export const checkAdminSession = async (): Promise<boolean> => {
  if (!isSupabaseConfigured()) {
    return localStorage.getItem('nexatek_dev_session') === 'true';
  }

  const { data: { session } } = await supabase.auth.getSession();
  return !!session;
};

// 2. Consulta y filtrado de mensajes en Supabase
export const getContactMessages = async (filters: AdminFilters): Promise<MessagesResponse> => {
  if (!isSupabaseConfigured()) {
    // Fallback de mensajes almacenados en localStorage durante el desarrollo local
    const raw = localStorage.getItem('nexatek_dev_messages');
    let list: ContactMessage[] = raw ? JSON.parse(raw) : [
      {
        id: 'mock-1',
        name: 'Carlos Mendoza',
        email: 'carlos@mendoza-distribuciones.com',
        company: 'Mendoza Distribuciones',
        service_type: 'Sistemas de ventas e inventarios',
        budget: '$1,500 - $3,000 USD',
        message: 'Requerimos un sistema para controlar el stock de dos bodegas y conectar lectores de códigos de barras.',
        privacy_accepted: true,
        status: 'Nuevo',
        created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
        updated_at: new Date(Date.now() - 3600000 * 4).toISOString(),
      },
      {
        id: 'mock-2',
        name: 'Elena Morales',
        email: 'elena@estudiolegal.com',
        company: 'Estudio Legal Morales & Asoc.',
        service_type: 'Sistemas de gestión empresarial',
        budget: '$3,000 - $5,000 USD',
        message: 'Buscamos una plataforma web interna para gestionar expedientes jurídicos y tiempos de los asociados.',
        privacy_accepted: true,
        status: 'En revisión',
        created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
        updated_at: new Date(Date.now() - 3600000 * 12).toISOString(),
      }
    ];

    // Conteo global
    const totalCount = list.length;
    const newCount = list.filter(m => m.status === 'Nuevo').length;
    const reviewCount = list.filter(m => m.status === 'En revisión').length;
    const closedCount = list.filter(m => m.status === 'Cerrado').length;

    // Aplicar filtros
    if (filters.status && filters.status !== 'Todos') {
      list = list.filter(m => m.status === filters.status);
    }
    if (filters.serviceType && filters.serviceType !== 'Todos') {
      list = list.filter(m => m.service_type === filters.serviceType);
    }
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      list = list.filter(m => 
        m.name.toLowerCase().includes(term) ||
        m.email.toLowerCase().includes(term) ||
        (m.company && m.company.toLowerCase().includes(term))
      );
    }

    // Ordenamiento
    list.sort((a, b) => {
      const timeA = new Date(a.created_at).getTime();
      const timeB = new Date(b.created_at).getTime();
      return filters.sortByDate === 'asc' ? timeA - timeB : timeB - timeA;
    });

    // Paginación
    const startIndex = (filters.page - 1) * filters.pageSize;
    const paged = list.slice(startIndex, startIndex + filters.pageSize);

    return {
      messages: paged,
      totalCount,
      newCount,
      reviewCount,
      closedCount
    };
  }

  try {
    // 1. Obtener conteos métricos desde Supabase
    const { count: totalCount } = await supabase.from('contact_messages').select('*', { count: 'exact', head: true });
    const { count: newCount } = await supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('status', 'Nuevo');
    const { count: reviewCount } = await supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('status', 'En revisión');
    const { count: closedCount } = await supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('status', 'Cerrado');

    // 2. Construir consulta con filtros
    let query = supabase.from('contact_messages').select('*');

    if (filters.status && filters.status !== 'Todos') {
      query = query.eq('status', filters.status);
    }
    if (filters.serviceType && filters.serviceType !== 'Todos') {
      query = query.eq('service_type', filters.serviceType);
    }
    if (filters.searchTerm) {
      query = query.or(`name.ilike.%${filters.searchTerm}%,email.ilike.%${filters.searchTerm}%,company.ilike.%${filters.searchTerm}%`);
    }

    // Ordenamiento
    query = query.order('created_at', { ascending: filters.sortByDate === 'asc' });

    // Paginación
    const from = (filters.page - 1) * filters.pageSize;
    const to = from + filters.pageSize - 1;
    query = query.range(from, to);

    const { data, error } = await query;

    if (error) {
      console.error('Error al consultar mensajes de Supabase:', error);
      return { messages: [], totalCount: 0, newCount: 0, reviewCount: 0, closedCount: 0 };
    }

    return {
      messages: (data as ContactMessage[]) || [],
      totalCount: totalCount || 0,
      newCount: newCount || 0,
      reviewCount: reviewCount || 0,
      closedCount: closedCount || 0,
    };
  } catch (err) {
    console.error('Error inesperado al consultar la base de datos:', err);
    return { messages: [], totalCount: 0, newCount: 0, reviewCount: 0, closedCount: 0 };
  }
};

// 3. Actualizar estado del mensaje
export const updateMessageStatus = async (id: string, status: MessageStatus): Promise<boolean> => {
  if (!isSupabaseConfigured()) {
    const raw = localStorage.getItem('nexatek_dev_messages');
    if (raw) {
      const list: ContactMessage[] = JSON.parse(raw);
      const target = list.find(m => m.id === id);
      if (target) {
        target.status = status;
        target.updated_at = new Date().toISOString();
        localStorage.setItem('nexatek_dev_messages', JSON.stringify(list));
      }
    }
    return true;
  }

  const { error } = await supabase
    .from('contact_messages')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id);

  return !error;
};

// 4. Eliminar mensaje
export const deleteContactMessage = async (id: string): Promise<boolean> => {
  if (!isSupabaseConfigured()) {
    const raw = localStorage.getItem('nexatek_dev_messages');
    if (raw) {
      let list: ContactMessage[] = JSON.parse(raw);
      list = list.filter(m => m.id !== id);
      localStorage.setItem('nexatek_dev_messages', JSON.stringify(list));
    }
    return true;
  }

  const { error } = await supabase
    .from('contact_messages')
    .delete()
    .eq('id', id);

  return !error;
};
