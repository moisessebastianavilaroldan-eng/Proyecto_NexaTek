export type MessageStatus = 'Nuevo' | 'En revisión' | 'Contactado' | 'Cerrado';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  company?: string | null;
  service_type: string;
  budget?: string | null;
  message: string;
  privacy_accepted: boolean;
  status: MessageStatus;
  created_at: string;
  updated_at: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  service_type: string;
  budget?: string;
  message: string;
  privacy_accepted: boolean;
  honeypot?: string; // Campo trampa anti-spam
}

export type ProjectCategory = 
  | 'Todos'
  | 'Sistemas de gestión'
  | 'Aplicaciones web'
  | 'Aplicaciones móviles'
  | 'Aplicaciones de escritorio'
  | 'Automatización'
  | 'Otros';

export type ProjectStatus = 'En producción' | 'Completado' | 'En desarrollo' | 'Prototipo';

export interface ProjectModule {
  name: string;
  description?: string;
  items: string[];
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  thumbnail: string;
  badge?: string;
  highlightText?: string;
  problemDescription: string;
  implementedSolution: string;
  generalObjective?: string;
  keyFeatures: string[];
  modules?: ProjectModule[];
  folderStructure?: string;
  technologies: string[];
  status: ProjectStatus;
  demoUrl?: string;
  githubUrl?: string;
  isDemoAvailable: boolean;
  metrics?: ProjectMetric[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialties: string[];
  avatarUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  isPlaceholder?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  iconName: string;
  details: string[];
}

export interface TechCategory {
  category: string;
  items: {
    name: string;
    description: string;
    iconName?: string;
  }[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface AdminFilters {
  searchTerm: string;
  status: string;
  serviceType: string;
  sortByDate: 'desc' | 'asc';
  page: number;
  pageSize: number;
}
