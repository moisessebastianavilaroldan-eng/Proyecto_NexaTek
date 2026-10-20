export const companyInfo = {
  name: 'NEXATEK',
  tagline: 'Tecnología que impulsa tu negocio',
  description: 'NEXATEK es un equipo de desarrollo de software que crea soluciones digitales a medida para ayudar a empresas y negocios a optimizar sus procesos, gestionar mejor su información y crecer mediante la tecnología.',
  teamSize: 4,
  contactEmail: import.meta.env.VITE_CONTACT_EMAIL || 'contacto@nexatek.com',
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '', // Configurable via VITE_WHATSAPP_NUMBER
  whatsappDefaultMsg: import.meta.env.VITE_WHATSAPP_DEFAULT_MSG || 'Hola NEXATEK, me gustaría solicitar una cotización para un proyecto de software.',
  socialLinks: {
    facebook: 'https://www.facebook.com/share/19q6fh7nFQ/',
    instagram: 'https://www.instagram.com/nexatek_oficial/?hl=es',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
  },
  workflowSteps: [
    {
      step: '01',
      title: 'Análisis',
      description: 'Conocemos a fondo las necesidades operativas y los objetivos estratégicos del cliente.',
    },
    {
      step: '02',
      title: 'Diseño',
      description: 'Definimos la arquitectura técnica, los flujos de trabajo y la experiencia de usuario.',
    },
    {
      step: '03',
      title: 'Desarrollo',
      description: 'Implementamos código limpio, modular y probamos exhaustivamente cada funcionalidad.',
    },
    {
      step: '04',
      title: 'Entrega y evolución',
      description: 'Desplegamos el producto final y acordamos el plan de soporte continuo y mejoras.',
    },
  ],
};
