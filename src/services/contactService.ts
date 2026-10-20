import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { ContactFormData } from '../types';

export interface SubmitResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export const submitContactForm = async (data: ContactFormData): Promise<SubmitResult> => {
  // 1. Protección contra bots: si el campo trampa (honeypot) fue completado, simular éxito silencioso
  if (data.honeypot && data.honeypot.trim() !== '') {
    return {
      success: true,
      messageId: 'spam-filtered',
    };
  }

  // 2. Validación de campos obligatorios en el cliente
  if (!data.name || data.name.trim().length < 2) {
    return { success: false, error: 'Por favor, ingresa tu nombre completo (al menos 2 caracteres).' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    return { success: false, error: 'Por favor, ingresa un correo electrónico válido.' };
  }

  if (!data.service_type || data.service_type.trim() === '') {
    return { success: false, error: 'Por favor, selecciona el tipo de servicio que necesitas.' };
  }

  if (!data.message || data.message.trim().length < 10) {
    return { success: false, error: 'Por favor, describe tu proyecto con al menos 10 caracteres.' };
  }

  if (!data.privacy_accepted) {
    return { success: false, error: 'Debes aceptar el aviso de privacidad para enviar el formulario.' };
  }

  // 3. Verificación de configuración de Supabase
  if (!isSupabaseConfigured()) {
    // Si aún no se configuró .env en desarrollo local, guardamos en localStorage para no perder el mensaje de prueba
    const localId = 'local-' + Date.now();
    const existing = JSON.parse(localStorage.getItem('nexatek_dev_messages') || '[]');
    existing.unshift({
      id: localId,
      name: data.name.trim(),
      email: data.email.trim(),
      company: data.company?.trim() || null,
      service_type: data.service_type,
      budget: data.budget?.trim() || null,
      message: data.message.trim(),
      privacy_accepted: true,
      status: 'Nuevo',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    localStorage.setItem('nexatek_dev_messages', JSON.stringify(existing));

    return {
      success: true,
      messageId: localId,
    };
  }

  // 4. Inserción segura en Supabase PostgreSQL
  try {
    const payload = {
      name: data.name.trim(),
      email: data.email.trim(),
      company: data.company?.trim() || null,
      service_type: data.service_type,
      budget: data.budget?.trim() || null,
      message: data.message.trim(),
      privacy_accepted: true,
      status: 'Nuevo',
    };

    const { data: inserted, error } = await supabase
      .from('contact_messages')
      .insert([payload])
      .select('id')
      .single();

    if (error) {
      console.error('Error al registrar mensaje en Supabase:', error);
      return {
        success: false,
        error: 'No fue posible guardar tu mensaje en la base de datos. Por favor, reintenta o escríbenos a nuestro correo.',
      };
    }

    return {
      success: true,
      messageId: inserted?.id,
    };
  } catch (err: unknown) {
    console.error('Error inesperado de conexión:', err);
    return {
      success: false,
      error: 'Ocurrió un error inesperado al procesar la solicitud. Por favor intenta nuevamente.',
    };
  }
};
