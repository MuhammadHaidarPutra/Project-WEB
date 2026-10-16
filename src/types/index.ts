export type Role = 'ADMIN' | 'USER';

export type PostStatus = 'DRAFT' | 'PUBLISHED';

export type ConsultationStatus = 'NEW' | 'READ' | 'PROCESSED' | 'DONE';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string | Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  _count?: {
    posts: number;
  };
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail: string | null;
  status: string;
  authorId: string;
  categoryId: string;
  publishedAt: string | Date | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  author?: {
    name: string;
    email?: string;
  };
  category?: {
    id: string;
    name: string;
    slug: string;
  };
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  advantages: string | null;
  process: string | null;
  faq: string | null;
  image: string | null;
  icon: string | null;
  order: number;
  isActive: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface ProjectImage {
  id: string;
  projectId: string;
  imageUrl: string;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  category: string;
  location: string;
  year: string;
  area: string | null;
  description: string;
  thumbnail: string | null;
  status: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  images?: ProjectImage[];
}

export interface Consultation {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: string;
  createdAt: string | Date;
}

export interface DashboardStats {
  totalPosts: number;
  totalProjects: number;
  totalServices: number;
  totalConsultations: number;
  newConsultations: number;
  recentConsultations: Consultation[];
  recentPosts: Post[];
  monthlyConsultations: { month: string; total: number }[];
}
