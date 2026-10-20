# NEXATEK - Plataforma Web Corporativa y Panel de Gestión

> **"Tecnología que impulsa tu negocio"**  
> Solución web corporativa, moderna, modular y conectada con base de datos PostgreSQL en Supabase, diseñada para **NEXATEK** (equipo de cuatro desarrolladores de software).

---

## 📌 Tabla de Contenidos

1. [Identidad de Marca](#1-identidad-de-marca)
2. [Arquitectura y Tecnologías](#2-arquitectura-y-tecnologías)
3. [Estructura del Proyecto](#3-estructura-del-proyecto)
4. [Requisitos Previos](#4-requisitos-previos)
5. [Instalación y Ejecución Local](#5-instalación-y-ejecución-local)
6. [Configuración de la Base de Datos (Supabase)](#6-configuración-de-la-base-de-datos-supabase)
7. [Creación y Autorización de los 4 Administradores](#7-creación-y-autorización-de-los-4-administradores)
8. [Variables de Entorno](#8-variables-de-entorno)
9. [Notificaciones por Correo Electrónico](#9-notificaciones-por-correo-electrónico)
10. [Personalización de Proyectos, Equipo y Servicios](#10-personalización-de-proyectos-equipo-y-servicios)
11. [Subida a GitHub](#11-subida-a-github)
12. [Despliegue en Vercel](#12-despliegue-en-vercel)
13. [Solución de Errores Habituales](#13-solución-de-errores-habituales)

---

## 1. Identidad de Marca

- **Empresa:** NEXATEK
- **Propósito:** Equipo de cuatro desarrolladores de software que crea soluciones digitales y sistemas a medida para optimizar procesos empresariales y organizar operaciones.
- **Paleta de Colores Oficial:**
  - Azul marino principal: `#123F67`
  - Azul eléctrico de acción: `#2675F5`
  - Blanco: `#FFFFFF`
  - Gris azulado de fondo: `#F2F6FA`
  - Gris para textos secundarios: `#64748B`
  - Azul oscuro para títulos: `#0B1F33`

---

## 2. Arquitectura y Tecnologías

- **Frontend:** React 19 + TypeScript + Vite 6
- **Estilos:** Tailwind CSS 3.4 con diseño responsivo y micro-animaciones
- **Navegación:** React Router 7 (`/`, `/privacidad`, `/admin/login`, `/admin`)
- **Iconografía:** Lucide React
- **Base de Datos & Auth:** Supabase (PostgreSQL relacional, Row Level Security, Supabase Auth)
- **Despliegue:** Vercel (con `vercel.json` configurado para SPA routing)
- **Control de Versiones:** Git & GitHub

---

## 3. Estructura del Proyecto

```text
NexaTek/
├── public/
│   ├── favicon.svg             # Favicon corporativo oficial
│   └── ...
├── src/
│   ├── assets/                 # Recursos gráficos adicionales
│   ├── components/
│   │   ├── admin/
│   │   │   └── ProtectedRoute.tsx # Guardián de autenticación de panel
│   │   ├── common/
│   │   │   └── Logo.tsx        # Isotipo y logotipo oficial de NEXATEK
│   │   ├── layout/
│   │   │   ├── Navbar.tsx      # Cabecera sticky con menú desktop y móvil
│   │   │   └── Footer.tsx      # Pie corporativo con enlaces y aviso legal
│   │   └── sections/
│   │       ├── Hero.tsx        # Sección Hero con mockup ilustrativo
│   │       ├── ProblemsSolutions.tsx # Retos empresariales vs solución
│   │       ├── Services.tsx    # Los 8 servicios especializados reutilizables
│   │       ├── Projects.tsx    # Portafolio con filtros por categoría
│   │       ├── Team.tsx        # 4 integrantes del equipo configurables
│   │       ├── Methodology.tsx # Proceso en 4 etapas: Análisis, Diseño, etc.
│   │       ├── TechStack.tsx   # Stack clasificado con GitHub destacado
│   │       ├── Faq.tsx         # Acordeón interactivo con dudas frecuentes
│   │       ├── CtaBanner.tsx   # Llamado a la acción con WhatsApp
│   │       └── ContactSection.tsx # Formulario con honeypot y guardado
│   ├── data/
│   │   ├── company.ts          # Datos corporativos, WhatsApp y correos
│   │   ├── services.ts         # Lista de servicios
│   │   ├── projects.ts         # Base editable de proyectos
│   │   ├── team.ts             # Datos de los 4 integrantes de NEXATEK
│   │   ├── techStack.ts        # Tecnologías organizadas por área
│   │   └── faqs.ts             # Preguntas frecuentes
│   ├── lib/
│   │   └── supabase.ts         # Cliente seguro de Supabase
│   ├── pages/
│   │   ├── Home.tsx            # Landing page principal
│   │   ├── PrivacyPolicy.tsx   # Aviso de privacidad
│   │   ├── NotFound.tsx        # Página 404 personalizada
│   │   └── admin/
│   │       ├── Login.tsx       # Inicio de sesión con Supabase Auth
│   │       └── Dashboard.tsx   # Bandeja de entrada privada completa
│   ├── services/
│   │   ├── contactService.ts   # Envío seguro de cotizaciones a Supabase
│   │   └── adminService.ts     # CRUD, estados, filtros y autenticación
│   ├── types/
│   │   └── index.ts            # Tipado TypeScript centralizado
│   ├── App.tsx                 # Enrutador principal
│   ├── index.css               # Directivas Tailwind y estilos globales
│   └── main.tsx                # Entrada raíz
├── supabase/
│   └── schema.sql              # Script SQL con tablas, índices y RLS
├── .env.example                # Variables de entorno documentadas
├── package.json
├── tailwind.config.js          # Paleta oficial NEXATEK
├── vercel.json                 # Configuración de routing para Vercel
└── vite.config.ts
```

---

## 4. Requisitos Previos

- **Node.js:** Versión 18 o superior (recomendado 20 LTS).
- **npm:** Versión 9 o superior.
- Una cuenta gratuita en [Supabase](https://supabase.com).
- Una cuenta en [Vercel](https://vercel.com) y en [GitHub](https://github.com).

---

## 5. Instalación y Ejecución Local

1. Clona el repositorio o abre el directorio del proyecto:
   ```bash
   cd NexaTek
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea tu archivo de variables locales a partir de la plantilla:
   ```bash
   copy .env.example .env
   ```
   *(En Linux / Mac usa `cp .env.example .env`)*

4. Inicia el servidor de desarrollo local:
   ```bash
   npm run dev
   ```
   Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

5. Para validar la compilación de producción:
   ```bash
   npm run build
   ```

---

## 6. Configuración de la Base de Datos (Supabase)

1. Ingresa a [supabase.com](https://supabase.com) y crea un nuevo proyecto llamado **NexaTek**.
2. Una vez aprovisionado, dirígete al menú lateral izquierdo a **SQL Editor**.
3. Haz clic en **New Query**.
4. Abre el archivo `supabase/schema.sql` de este repositorio, copia todo su contenido y pégalo en el editor SQL de Supabase.
5. Presiona **Run** (Ejecutar).
6. Esto creará:
   - La tabla `contact_messages` con columnas de auditoría y estados permitidos (`Nuevo`, `En revisión`, `Contactado`, `Cerrado`).
   - La tabla `admin_profiles` para control de permisos de los cuatro integrantes.
   - Las reglas de seguridad **Row Level Security (RLS)** que impiden que visitantes públicos lean mensajes ajenos o alteren la base de datos.
   - El disparador (trigger) automático que actualiza la fecha `updated_at`.

---

## 7. Creación y Autorización de los 4 Administradores

Por seguridad, el registro público en la web está bloqueado. El alta de los cuatro administradores se realiza de la siguiente manera:

### Paso A: Crear las 4 cuentas en Supabase Auth
1. En tu consola de Supabase, ve a **Authentication** > **Users**.
2. Haz clic en **Add User** > **Create User**.
3. Ingresa el correo y la contraseña provisional segura para cada uno de los 4 integrantes:
   - `integrante1@nexatek.com`
   - `integrante2@nexatek.com`
   - `integrante3@nexatek.com`
   - `integrante4@nexatek.com`
4. Marca la casilla **Auto Confirm User** para que no requieran confirmación por correo previa.

### Paso B: Otorgar permisos de Administrador en la tabla `admin_profiles`
1. Ve nuevamente a **SQL Editor** en Supabase.
2. Ejecuta el siguiente comando (sustituyendo los correos si usaste otros):

```sql
INSERT INTO public.admin_profiles (id, email, full_name, is_active)
SELECT id, email, COALESCE(raw_user_meta_data->>'full_name', split_part(email, '@', 1)), true
FROM auth.users
WHERE email IN (
    'integrante1@nexatek.com',
    'integrante2@nexatek.com',
    'integrante3@nexatek.com',
    'integrante4@nexatek.com'
)
ON CONFLICT (id) DO UPDATE SET is_active = true;
```

¡Listo! A partir de ese momento, cualquiera de los 4 miembros podrá iniciar sesión en:
`https://tudominio.com/admin/login`

---

## 8. Variables de Entorno

En tu consola de Supabase ve a **Project Settings** > **API**. Copia los valores y colócalos en tu archivo `.env`:

```env
# Variables públicas (Frontend Vite)
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Configuración de WhatsApp de NEXATEK (opcional)
# Código de país + número sin espacios ni símbolos (+). Ej: 521XXXXXXXXXX
VITE_WHATSAPP_NUMBER=

# Correo oficial visible
VITE_CONTACT_EMAIL=contacto@nexatek.com
```

> **Aviso de Seguridad:** La clave privada `SUPABASE_SERVICE_ROLE_KEY` **nunca** debe agregarse con prefijo `VITE_` ni compartirse en el frontend.

---

## 9. Notificaciones por Correo Electrónico

El proyecto guarda **obligatoriamente** cada solicitud de contacto en Supabase PostgreSQL.

Si deseas recibir además un aviso por correo electrónico a la casilla del equipo cada vez que un cliente cotice:
1. Puedes crear una **Supabase Edge Function** o un webhook que escuche inserciones en `public.contact_messages`.
2. Utiliza un proveedor transaccional como **Resend** (`npm i resend`).
3. Variables en Supabase Secrets:
   - `RESEND_API_KEY=re_123456789`
   - `NOTIFICATION_RECEIVER_EMAIL=contacto@nexatek.com`
4. Si la notificación por correo fallara temporalmente por límite del proveedor, **el mensaje queda asegurado en Supabase** y visible en el panel `/admin`.

---

## 10. Personalización de Proyectos, Equipo y Servicios

Todos los datos están desacoplados de la interfaz para que los 4 miembros de NEXATEK puedan modificarlos sin tocar HTML ni lógica compleja:

- **Integrantes (4 personas):** Edita `src/data/team.ts` para asignar nombres reales, enlaces de GitHub/LinkedIn o fotos.
- **Proyectos desarrollados:** Edita `src/data/projects.ts` para añadir capturas de pantalla, descripciones de problemas reales y repositorios.
- **Servicios:** Edita `src/data/services.ts`.
- **Preguntas frecuentes:** Edita `src/data/faqs.ts`.
- **Datos de la empresa y WhatsApp:** Edita `src/data/company.ts` o variables de entorno.

---

## 11. Subida a GitHub

1. Inicializa tu repositorio Git local si aún no está inicializado:
   ```bash
   git init
   git add .
   git commit -m "feat: lanzamiento inicial web corporativa NEXATEK"
   ```

2. Crea un repositorio en GitHub para tu organización/equipo (por ejemplo `nexatek/nexatek-web`).

3. Vincula y sube la rama principal:
   ```bash
   git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   git branch -M main
   git push -u origin main
   ```

---

## 12. Despliegue en Vercel

1. Entra a [vercel.com](https://vercel.com) e inicia sesión con tu cuenta de GitHub.
2. Haz clic en **Add New...** > **Project**.
3. Selecciona el repositorio de GitHub de NEXATEK e impórtalo.
4. Vercel detectará automáticamente **Vite**:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. En la sección **Environment Variables**, añade:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_WHATSAPP_NUMBER` (opcional)
   - `VITE_CONTACT_EMAIL` (opcional)
6. Haz clic en **Deploy**.
7. En unos segundos tu web estará en línea con HTTPS, CDN global y soporte para recargar rutas directas gracias al archivo `vercel.json` incluido.

---

## 13. Solución de Errores Habituales

### ¿Qué pasa si envío el formulario antes de configurar Supabase?
El sistema incluye un mecanismo de desarrollo local (`localStorage`) que simula el guardado y te muestra un aviso claro para que puedas probar la experiencia completa sin romper la interfaz.

### Al recargar una página interna en Vercel me da 404:
El proyecto ya cuenta con el archivo `vercel.json` con la regla de reescritura hacia `/index.html`, lo que soluciona de raíz cualquier error de rutas en Single Page Applications.

### Un usuario no autorizado intenta ver `/admin`:
El componente `ProtectedRoute.tsx` intercepta cualquier acceso sin sesión válida y lo redirige automáticamente a `/admin/login`. Además, las políticas RLS en la base de datos de PostgreSQL impiden que cualquier consulta anónima obtenga registros de clientes.

---

Desarrollado con dedicación para el equipo **NEXATEK**.
