import type { Project } from '../types';

export const projectsList: Project[] = [
  {
    id: 'edugest-academico',
    title: 'EduGest - Sistema de Gestión Académica & Control QR',
    category: 'Sistemas de gestión',
    badge: 'Módulo QR Dinámico',
    highlightText: 'Control de asistencia en tiempo real y cálculo automático de notas',
    thumbnail: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80',
    generalObjective: 'Desarrollar una plataforma académica que permita centralizar y automatizar la gestión de asistencia, calificaciones y reportes académicos, mejorando la organización de la información y reduciendo el tiempo dedicado a tareas administrativas.',
    problemDescription: 'Actualmente muchos docentes registran asistencia manual en papel, gestionan calificaciones en múltiples hojas de cálculo dispersas, invierten tiempo excesivo en tareas repetitivas y carecen de herramientas centralizadas para generar reportes y monitorear el rendimiento estudiantil.',
    implementedSolution: 'Plataforma web centralizada construida con enfoque en diseño centrado en el usuario (UCD). Permite registrar asistencia digitalmente, gestionar calificaciones con cálculo automático de promedios, generar reportes instantáneos y ofrece un módulo innovador de asistencia mediante códigos QR únicos con actualización en tiempo real.',
    keyFeatures: [
      'Módulo QR dinámico: generación de códigos QR únicos, escaneo ágil y registro automático de asistencia',
      'Gestión académica integral: registro de estudiantes, cursos y asignación de ponderados de evaluación',
      'Cálculo automatizado de promedios ponderados y detección de alumnos en riesgo académico',
      'Generación y exportación de reportes académicos estructurados para docentes y directivos',
      'Portal intuitivo para consulta de notas y asistencia accesible para docentes y padres de familia',
      'Sistema de autenticación y control de accesos por roles (Docentes, Estudiantes, Padres y Administradores)'
    ],
    modules: [
      {
        name: 'Gestión Académica',
        description: 'Administración curricular completa y cómputo de rendimiento.',
        items: [
          'Registro y padrón de estudiantes por grado y sección',
          'Gestión y configuración de cursos y competencias curriculares',
          'Registro de calificaciones por periodo y unidad',
          'Cálculo automático e instantáneo de promedios ponderados',
          'Generación de reportes académicos y actas'
        ]
      },
      {
        name: 'Gestión de Asistencia',
        description: 'Control diario de presentismo con historial detallado.',
        items: [
          'Registro manual rápido de asistencia diaria',
          'Consulta de historial consolidado por aula y estudiante',
          'Reportes analíticos de inasistencias y tardanzas'
        ]
      },
      {
        name: 'Módulo QR (Complementario)',
        description: 'Automatización de ingreso y control sin contacto.',
        items: [
          'Generación de códigos QR únicos por estudiante/sesión',
          'Escaneo bidireccional ágil mediante cámara o lector',
          'Registro automático de timestamp de ingreso',
          'Actualización en tiempo real del estado de aula'
        ]
      },
      {
        name: 'Gestión de Usuarios & Seguridad',
        description: 'Acceso seguro y granular a la plataforma.',
        items: [
          'Autenticación robusta con sesiones protegidas',
          'Control estricto de roles (Docente, Administrador, Padres)',
          'Administración de permisos de lectura y edición'
        ]
      }
    ],
    folderStructure: `EduGest/
├── frontend/        # React, Bootstrap, CSS, JavaScript (Vite SPA)
├── backend/         # Node.js, Express, Middleware de autenticación y APIs REST
├── database/        # Scripts SQL MySQL, esquemas relacionales, phpMyAdmin (XAMPP)
├── .gitignore
└── README.md`,
    technologies: ['React', 'JavaScript', 'Node.js', 'Express', 'MySQL', 'phpMyAdmin (XAMPP)', 'Bootstrap'],
    status: 'En desarrollo',
    isDemoAvailable: false,
    demoUrl: '',
    githubUrl: '',
    metrics: [
      { label: 'Tiempo en planillas', value: '-70%' },
      { label: 'Registro con QR', value: '< 2 seg' },
      { label: 'Cálculo de promedios', value: 'Instantáneo' },
      { label: 'Enfoque UCD', value: '100% Intuitivo' }
    ]
  },
  {
    id: 'buenasalud-medico',
    title: 'BuenaSalud - Plataforma Web de Gestión Clínica y Consultas',
    category: 'Aplicaciones web',
    badge: 'Angular & Spring Web',
    highlightText: 'Gestión integral de consultas médicas y organización de historias clínicas',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80',
    generalObjective: 'Optimizar y digitalizar el flujo de atención médica ambulatoria mediante una plataforma desacoplada que centralice el agendamiento de citas, el historial clínico de pacientes y el control operativo del personal médico.',
    problemDescription: 'Clínicas y consultorios independientes enfrentaban demoras crónicas en la asignación de turnos, historiales médicos en papel propensos a extravío y falta de seguimiento en las interconsultas médicas.',
    implementedSolution: 'Plataforma web empresarial desarrollada con Frontend en Angular y Backend robusto en Spring Web (Spring Boot). Diseñada con arquitectura desacoplada orientada a servicios REST, garantizando alta disponibilidad, estricta validación de datos clínicos y una experiencia ágil para el personal de salud.',
    keyFeatures: [
      'Agendamiento inteligente de consultas médicas con filtrado por especialidad y médico tratante',
      'Expediente clínico digitalizado con registro cronológico de diagnósticos y recetas',
      'Optimización de tiempos de espera en salas de atención y control de turnos en vivo',
      'Seguridad de la información con validaciones rigurosas y persistencia relacional',
      'Interfaz modular desarrollada en Angular con componentes reactivos y formularios tipados'
    ],
    modules: [
      {
        name: 'Gestión de Consultas',
        description: 'Coordinación eficiente de citas y agenda médica.',
        items: [
          'Programación y reprogramación de citas médicas',
          'Filtrado por médico, fecha, especialidad y estado de consulta',
          'Control de turnos y estado de asistencia del paciente'
        ]
      },
      {
        name: 'Organización Clínica',
        description: 'Estructuración digital del expediente del paciente.',
        items: [
          'Registro de historias clínicas con antecedentes médicos',
          'Notas de evolución y prescripción de tratamientos',
          'Búsqueda rápida de pacientes por DNI o código clínico'
        ]
      },
      {
        name: 'Optimización de Procesos',
        description: 'Flujo continuo entre recepción, triaje y consultorio.',
        items: [
          'Reducción de tiempos muertos en sala de espera',
          'Trazabilidad completa de las atenciones realizadas',
          'Reportes de demanda por especialidad médica'
        ]
      }
    ],
    technologies: ['Angular', 'Spring Web', 'Spring Boot', 'Java', 'MySQL / PostgreSQL', 'REST APIs'],
    status: 'Completado',
    isDemoAvailable: false,
    demoUrl: '',
    githubUrl: '',
    metrics: [
      { label: 'Tiempo de búsqueda clínica', value: '-80%' },
      { label: 'Backend empresarial', value: 'Spring Web' },
      { label: 'Frontend reactivo', value: 'Angular' },
      { label: 'Integridad médica', value: '100% Auditada' }
    ]
  },
  {
    id: 'jdm-surveys-desktop',
    title: 'JDM Surveys - Plataforma de Encuestas en Java Desktop',
    category: 'Aplicaciones de escritorio',
    badge: 'Desktop Java & NetBeans',
    highlightText: 'Aplicación nativa de escritorio con arquitectura modular y persistencia relacional',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
    generalObjective: 'Construir una aplicación nativa de escritorio en Java que permita levantar, consolidar y procesar cuestionarios estructurados de forma rápida y confiable en entornos locales sin depender de internet.',
    problemDescription: 'Dificultad para aplicar encuestas y procesar respuestas estructuradas en computadoras locales cuando las plataformas web se caen o carecen de conexión estable, sumado al retraso en la consolidación de datos manuales.',
    implementedSolution: 'Aplicación de escritorio desarrollada colaborativamente en equipo usando Java y el IDE NetBeans. Implementa una sólida arquitectura en capas (MVC), lógica de negocio modular, persistencia en base de datos relacional y control de versiones profesional mediante Git y GitHub.',
    keyFeatures: [
      'Aplicación nativa de escritorio con alta velocidad de respuesta y bajo consumo de recursos',
      'Desarrollo modular de lógica de negocio orientada a objetos en Java',
      'Implementación de capa de persistencia y conexión a base de datos relacional MySQL',
      'Módulos de validación de datos en cliente para garantizar la calidad de las respuestas',
      'Flujo de trabajo colaborativo profesional implementado con Git y GitHub en NetBeans IDE'
    ],
    modules: [
      {
        name: 'Desarrollo de Lógica de Negocio',
        description: 'Reglas de encuesta, validación de tipos de pregunta y ponderación.',
        items: [
          'Diseño orientado a objetos con patrones de software consolidados',
          'Control de flujo condicional según respuestas del usuario',
          'Validaciones en memoria antes de la persistencia'
        ]
      },
      {
        name: 'Persistencia & Base de Datos',
        description: 'Almacenamiento relacional confiable.',
        items: [
          'Capa DAO / JDBC optimizada para operaciones CRUD',
          'Gestión de transacciones y consistencia relacional en MySQL',
          'Modelado relacional de preguntas, opciones y encuestados'
        ]
      },
      {
        name: 'Trabajo Colaborativo & Git',
        description: 'Metodología ágil de desarrollo en equipo.',
        items: [
          'Desarrollo centralizado en NetBeans IDE con control de dependencias',
          'Gestión de ramas y resolución de conflictos vía Git y GitHub',
          'Integración de componentes construidos en paralelo por el equipo'
        ]
      }
    ],
    technologies: ['Java', 'Java Swing / JavaFX', 'MySQL', 'NetBeans IDE', 'JDBC', 'Git & GitHub'],
    status: 'Completado',
    isDemoAvailable: false,
    demoUrl: '',
    githubUrl: '',
    metrics: [
      { label: 'Ejecución offline', value: '100% Nativa' },
      { label: 'Tiempo de respuesta', value: '< 50ms' },
      { label: 'Arquitectura', value: 'MVC en Java' },
      { label: 'Colaboración', value: 'Git & GitHub' }
    ]
  },
  {
    id: 'decideya-mobile',
    title: 'DecideYA - App Móvil Electoral (Hackathon El Comercio 2025)',
    category: 'Aplicaciones móviles',
    badge: '🏆 Hackathon El Comercio 2025',
    highlightText: 'Innovación cívica con Kotlin para la orientación informada del votante peruano',
    thumbnail: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=900&q=80',
    generalObjective: 'Empoderar a la ciudadanía en el proceso electoral mediante una solución móvil interactiva desarrollada en Kotlin que sintetice planes de gobierno, contraste posturas políticas y fomente un voto informado e imparcial.',
    problemDescription: 'Durante los procesos electorales, los ciudadanos se enfrentan a un bombardeo masivo de desinformación, planes de gobierno extensos e incomprensibles y falta de herramientas amigables que permitan saber en qué coinciden realmente con los candidatos.',
    implementedSolution: 'Aplicación móvil nativa en Kotlin postulada en el prestigioso concurso Hackathon de El Comercio 2025. Utiliza una arquitectura moderna con Jetpack Compose y consumo de fuentes de datos oficiales para ofrecer comparadores visuales de propuestas, hojas de vida limpias y un test cívico de compatibilidad ciudadana.',
    keyFeatures: [
      'Comparador dinámico de planes de gobierno por ejes temáticos (Economía, Seguridad, Salud, Educación y Empleo)',
      'Fichas biográficas con trayectoria profesional, antecedentes y propuestas clave verificadas',
      'Test interactivo de compatibilidad cívica que calcula el porcentaje de afinidad con cada lista electoral',
      'Diseño nativo para Android en Kotlin con animaciones fluidas y accesibilidad táctil de primer nivel',
      'Proyecto concebido y ejecutado bajo presión competitiva en la Hackathon El Comercio 2025'
    ],
    modules: [
      {
        name: 'Comparador Electoral Interactivo',
        description: 'Contraste lado a lado de propuestas de diferentes partidos políticos.',
        items: [
          'Visualización temática organizada por prioridades ciudadanas',
          'Filtros por eje programático e impacto social',
          'Resúmenes ejecutivos simplificados para lectura rápida'
        ]
      },
      {
        name: 'Algoritmo de Compatibilidad Votante',
        description: 'Test cívico interactivo con ponderación automática.',
        items: [
          'Cuestionario ágil de posturas clave sobre políticas públicas',
          'Cálculo algorítmico de afinidad porcentual por candidato',
          'Transparencia metodológica y total neutralidad informativa'
        ]
      },
      {
        name: 'Arquitectura Móvil en Kotlin',
        description: 'Rendimiento nativo y código moderno para Android.',
        items: [
          'Uso de Kotlin y Jetpack Compose para interfaces declarativas',
          'Consumo optimizado de APIs REST de datos electorales abiertos',
          'Modo de consulta rápida y almacenamiento en caché local'
        ]
      }
    ],
    technologies: ['Kotlin', 'Android SDK', 'Jetpack Compose', 'APIs REST', 'Git & GitHub', 'Material 3'],
    status: 'Completado',
    isDemoAvailable: false,
    demoUrl: '',
    githubUrl: '',
    metrics: [
      { label: 'Certamen', value: 'Hackathon 2025' },
      { label: 'Plataforma', value: 'Kotlin Nativo' },
      { label: 'Tiempo de comparador', value: 'En 3 clics' },
      { label: 'Alineación ciudadana', value: 'Neutral & Abierta' }
    ]
  }
];
