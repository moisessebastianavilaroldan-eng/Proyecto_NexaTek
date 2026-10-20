import type { TechCategory } from '../types';

export const techStackData: TechCategory[] = [
  {
    category: 'Frontend',
    items: [
      { name: 'React', description: 'Biblioteca líder para interfaces modulares, reactivas y dinámicas' },
      { name: 'Angular', description: 'Framework robusto y estructurado para aplicaciones web empresariales' },
      { name: 'TypeScript', description: 'Tipado estático avanzado para código mantenible y libre de errores' },
      { name: 'Tailwind CSS', description: 'Diseño visual moderno, responsivo y de alto rendimiento' },
      { name: 'Vite', description: 'Entorno de desarrollo y empaquetado ultra rápido' },
    ],
  },
  {
    category: 'Backend & APIs',
    items: [
      { name: 'Next.js', description: 'Framework full-stack para renderizado híbrido y APIs escalables' },
      { name: 'Go (Golang)', description: 'Lenguaje de alto rendimiento y concurrencia para microservicios' },
      { name: 'Gin', description: 'Framework web ultra rápido en Go para servicios backend de baja latencia' },
      { name: 'Spring Boot', description: 'Framework Java empresarial para arquitecturas robustas y seguras' },
      { name: 'Prisma', description: 'ORM moderno y tipado para gestión y consultas de bases de datos' },
      { name: 'Node.js', description: 'Entorno ágil y eficiente para APIs RESTful y servicios en tiempo real' },
      { name: 'Serverless Functions', description: 'Microfunciones escalables bajo demanda en la nube' },
    ],
  },
  {
    category: 'Bases de Datos Relacionales',
    items: [
      { name: 'PostgreSQL', description: 'Motor relacional avanzado, confiable y de alta integridad' },
      { name: 'MySQL', description: 'Sistema de gestión de bases de datos relacional rápido y popular' },
      { name: 'SQL Server', description: 'Motor corporativo de Microsoft para grandes volúmenes transaccionales' },
      { name: 'Oracle', description: 'Base de datos de misión crítica de nivel empresarial' },
      { name: 'Supabase', description: 'Backend PostgreSQL en la nube con Auth y Row Level Security' },
    ],
  },
  {
    category: 'Bases de Datos No Relacionales',
    items: [
      { name: 'MongoDB', description: 'Base de datos NoSQL documental flexible para datos dinámicos y JSON' },
    ],
  },
  {
    category: 'Desarrollo Móvil & Escritorio',
    items: [
      { name: 'Java (JavaFX / Swing)', description: 'Aplicaciones nativas de escritorio (Windows, Linux, Mac) de alto rendimiento y operación local' },
      { name: 'Python', description: 'Automatización de procesos, aplicaciones de escritorio, scripts analíticos e interfaces funcionales' },
      { name: 'React Native', description: 'Desarrollo de aplicaciones nativas multiplataforma para iOS y Android' },
      { name: 'Expo Go', description: 'Plataforma y herramientas para desarrollo, pruebas y despliegue móvil ágil' },
      { name: 'JasperReports', description: 'Generación e impresión directa de tickets, comprobantes y reportes contables' },
    ],
  },
  {
    category: 'Diseño y Colaboración',
    items: [
      { name: 'Docker', description: 'Contenedores para estandarización de entornos, despliegue desacoplado y alta portabilidad' },
      { name: 'Render', description: 'Plataforma en la nube para despliegue continuo de APIs, microservicios y bases de datos' },
      { name: 'Brevo', description: 'Servicio transaccional para envío automatizado y seguro de correos corporativos y notificaciones Gmail' },
      { name: 'GitHub', description: 'Control de versiones en equipo, pull requests y revisión de código' },
      { name: 'Figma', description: 'Diseño de interfaces ergonómicas, prototipos UI/UX testeables' },
      { name: 'Vercel', description: 'Despliegue continuo de alto rendimiento y CDN global' },
    ],
  },
];
