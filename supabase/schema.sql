-- ==============================================================================
-- NEXATEK - ESQUEMA DE BASE DE DATOS SUPABASE
-- Tabla de mensajes de contacto, índices y políticas de seguridad (RLS)
-- ==============================================================================

-- 1. Habilitar extensión para UUIDs (habitual en PostgreSQL/Supabase)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Crear tabla para mensajes de contacto
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(150),
    service_type VARCHAR(100) NOT NULL,
    budget VARCHAR(100),
    message TEXT NOT NULL,
    privacy_accepted BOOLEAN NOT NULL DEFAULT false,
    status VARCHAR(50) NOT NULL DEFAULT 'Nuevo' CHECK (status IN ('Nuevo', 'En revisión', 'Contactado', 'Cerrado')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Crear índices para optimizar consultas en el panel administrativo
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON public.contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON public.contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON public.contact_messages(email);

-- 4. Trigger para actualizar el campo updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_contact_messages_updated_at ON public.contact_messages;
CREATE TRIGGER trigger_contact_messages_updated_at
    BEFORE UPDATE ON public.contact_messages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- SEGURIDAD OBLIGATORIA (ROW LEVEL SECURITY - RLS)
-- ==============================================================================

-- 5. Habilitar RLS en la tabla
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- 6. Política para visitantes anónimos:
-- Solo pueden INSERTAR solicitudes válidas que acepten las políticas de privacidad.
-- NO pueden leer (SELECT), modificar (UPDATE) ni borrar (DELETE).
DROP POLICY IF EXISTS "Permitir insercion publica de mensajes" ON public.contact_messages;
CREATE POLICY "Permitir insercion publica de mensajes"
    ON public.contact_messages
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (
        privacy_accepted = true 
        AND length(name) >= 2 
        AND length(email) >= 5 
        AND length(message) >= 10
    );

-- 7. Tabla auxiliar de Administradores Autorizados de NEXATEK (4 integrantes)
-- Permite un control estricto de quiénes pueden ver la bandeja de entrada
CREATE TABLE IF NOT EXISTS public.admin_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(150),
    is_active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- Política para que un admin logueado pueda ver su propio perfil
DROP POLICY IF EXISTS "Admins pueden ver su propio perfil" ON public.admin_profiles;
CREATE POLICY "Admins pueden ver su propio perfil"
    ON public.admin_profiles
    FOR SELECT
    TO authenticated
    USING (auth.uid() = id);

-- 8. Políticas para Administradores sobre contact_messages:
-- Solo los usuarios autenticados presentes en admin_profiles pueden LEER los mensajes
DROP POLICY IF EXISTS "Solo administradores autorizados pueden leer mensajes" ON public.contact_messages;
CREATE POLICY "Solo administradores autorizados pueden leer mensajes"
    ON public.contact_messages
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.admin_profiles
            WHERE admin_profiles.id = auth.uid()
            AND admin_profiles.is_active = true
        )
    );

-- Solo los administradores autorizados pueden ACTUALIZAR el estado de los mensajes
DROP POLICY IF EXISTS "Solo administradores autorizados pueden actualizar mensajes" ON public.contact_messages;
CREATE POLICY "Solo administradores autorizados pueden actualizar mensajes"
    ON public.contact_messages
    FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.admin_profiles
            WHERE admin_profiles.id = auth.uid()
            AND admin_profiles.is_active = true
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.admin_profiles
            WHERE admin_profiles.id = auth.uid()
            AND admin_profiles.is_active = true
        )
    );

-- Solo los administradores autorizados pueden ELIMINAR mensajes
DROP POLICY IF EXISTS "Solo administradores autorizados pueden eliminar mensajes" ON public.contact_messages;
CREATE POLICY "Solo administradores autorizados pueden eliminar mensajes"
    ON public.contact_messages
    FOR DELETE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.admin_profiles
            WHERE admin_profiles.id = auth.uid()
            AND admin_profiles.is_active = true
        )
    );

-- ==============================================================================
-- INSTRUCCIONES PARA AUTORIZAR A LOS 4 INTEGRANTES DE NEXATEK
-- ==============================================================================
-- Paso 1: En el panel de Supabase > Authentication > Users, crear los 4 usuarios
-- con sus correos y contraseñas seguras.
-- Paso 2: Ejecutar el siguiente INSERT reemplazando los correos con los reales:
--
-- INSERT INTO public.admin_profiles (id, email, full_name)
-- SELECT id, email, raw_user_meta_data->>'full_name'
-- FROM auth.users
-- WHERE email IN (
--     'integrante1@nexatek.com',
--     'integrante2@nexatek.com',
--     'integrante3@nexatek.com',
--     'integrante4@nexatek.com'
-- )
-- ON CONFLICT (id) DO UPDATE SET is_active = true;
