import type { ServiceItem } from '../types';

export const servicesList: ServiceItem[] = [
  {
    id: 'plataformas-web',
    title: 'Desarrollo de plataformas web',
    shortDescription: 'Portales y aplicaciones web interactivas, seguras y de alto rendimiento adaptadas al modelo de tu empresa.',
    iconName: 'Globe',
    details: [
      'Paneles administrativos interactivos y modernos',
      'Arquitectura modular y escalable para la nube',
      'Experiencia de usuario fluida y optimizada'
    ]
  },
  {
    id: 'aplicaciones-moviles',
    title: 'Aplicaciones móviles',
    shortDescription: 'Soluciones móviles para equipos de campo o clientes finales, permitiendo operar desde cualquier lugar.',
    iconName: 'Smartphone',
    details: [
      'Compatibilidad multiplataforma optimizada (React Native / Expo)',
      'Sincronización segura de datos con el servidor central',
      'Interfaz intuitiva pensada en el usuario móvil'
    ]
  },
  {
    id: 'aplicaciones-escritorio',
    title: 'Aplicaciones de escritorio (Java & Python)',
    shortDescription: 'Software nativo multiplataforma (Windows, Linux, macOS) para operaciones locales, alta estabilidad, scripts analíticos y facturación.',
    iconName: 'Monitor',
    details: [
      'Desarrollo robusto en Java (JavaFX / Swing) y Python',
      'Operación autónoma 100% offline y en red local',
      'Conexión e impresión directa de comprobantes (JasperReports)'
    ]
  },
  {
    id: 'diseno-ui-ux',
    title: 'Diseño de interfaces y prototipos UI/UX',
    shortDescription: 'Concepción visual centrada en el usuario, facilitando la adopción y usabilidad de los sistemas.',
    iconName: 'Palette',
    details: [
      'Wireframes y prototipos interactivos testeables',
      'Diseño visual coherente con la identidad corporativa',
      'Arquitectura de información ergonómica'
    ]
  },
  {
    id: 'integracion-bases-datos-apis',
    title: 'Integración de bases de datos y APIs',
    shortDescription: 'Conexión entre diferentes aplicaciones, servicios de terceros y migración estructurada de datos.',
    iconName: 'Database',
    details: [
      'Desarrollo y consumo de APIs RESTful seguras',
      'Modelado relacional y NoSQL (PostgreSQL, MySQL, SQL Server, MongoDB)',
      'Despliegue ágil en la nube con Docker y Render'
    ]
  },
  {
    id: 'automatizacion-mantenimiento',
    title: 'Automatización, Despliegue y Soporte',
    shortDescription: 'Automatización de procesos, despliegues continuos en la nube, notificaciones por correo y soporte preventivo.',
    iconName: 'Cpu',
    details: [
      'Scripts de automatización y procesamiento de datos en Python',
      'Despliegue continuo en la nube con Docker, Render y Vercel',
      'Notificaciones automáticas y correos corporativos/Gmail con Brevo'
    ]
  }
];
