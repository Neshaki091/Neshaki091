import { create } from 'zustand';
import { projectsData } from '../data/projects';
import { skillsData } from '../data/skills';
import { timelineData } from '../data/timeline';
import { Project, SkillCategory, TimelineItem } from '../types';


export interface ResearchHighlightItem {
  id: string;
  title: string;
  desc: string;
}

export interface ProfileData {
  avatarUrl: string;
  badge: string;
  titlePrefix: string;
  name: string;
  tagline: string;
  subtext: string;
  bio: string;
  education: string;
  degree: string;
  gpa: string;
}

interface ResearchData {
  abstractEn: string;
  abstractVi: string;
  memoryReduction: string;
  accuracyRetention: string;
  highlights: ResearchHighlightItem[];
}

interface ContactInfoData {
  email: string;
  github: string;
  huggingface: string;
  linkedin: string;
}

interface ContentState {
  profile: ProfileData;
  projects: Project[];
  skills: SkillCategory[];
  timeline: TimelineItem[];
  research: ResearchData;
  contactInfo: ContactInfoData;

  updateProfile: (data: Partial<ProfileData>) => void;
  updateProject: (id: string, updated: Partial<Project>) => void;
  addProject: (newProject: Project) => void;
  deleteProject: (id: string) => void;
  updateSkills: (skills: SkillCategory[]) => void;
  updateTimeline: (timeline: TimelineItem[]) => void;
  updateResearch: (data: Partial<ResearchData>) => void;
  addResearchHighlight: (item: ResearchHighlightItem) => void;
  deleteResearchHighlight: (id: string) => void;
  updateContactInfo: (data: Partial<ContactInfoData>) => void;
}

const defaultHighlights: ResearchHighlightItem[] = [
  { id: 'h1', title: 'TurboQuant + IVF Integration', desc: 'Custom Rust core synthesizing TurboQuant vector quantization with Inverted File Indexing.' },
  { id: 'h2', title: 'SIMD AVX2 Hardware Acceleration', desc: '256-bit vector registers utilized for parallelized inner-product & asymmetric distance computation.' },
  { id: 'h3', title: 'Memory-Mapped File Access (mmap)', desc: 'Disk-backed quantized index querying directly via OS page cache without full RAM residency.' },
  { id: 'h4', title: 'Cluster-Centric Scan & Query Batching', desc: 'Maximizes CPU L1/L2/L3 cache locality and memory bandwidth utilization during multi-query retrieval.' },
  { id: 'h5', title: 'ITQ & Max-Lloyd Quantization', desc: 'Orthogonal Procrustes rotation with P01-P99 outlier clipping and ADC via precomputed Lookup Tables (LUT).' },
];

const defaultProfile: ProfileData = {
  avatarUrl: '/avatar.jpg',
  badge: 'Backend & AI Engineer',
  titlePrefix: 'Hello, I am ',
  name: 'Huỳnh Công Luyện',
  tagline: 'Backend & AI Engineer | RAG • Vector Search • AI Systems',
  subtext: 'Specializing in Rust SIMD vector quantization, enterprise Java/Node backends, and production-grade RAG pipelines.',
  bio: 'Information Technology graduate from University of Transport Ho Chi Minh City (UTH) with a GPA of 3.34/4.0. Passionate about Low-Level Vector Retrieval, High-Performance Computing, Backend Systems, and RAG architectures.',
  education: 'University of Transport Ho Chi Minh City (UTH)',
  degree: 'Bachelor of Information Technology (2022 - 2026)',
  gpa: '3.34 / 4.0',
};

export const useContentStore = create<ContentState>((set, get) => {
  return {
    profile: defaultProfile,
    projects: projectsData,
    skills: skillsData,
    timeline: timelineData,
    research: {
      abstractEn:
        'ARQ-RAG is a high-performance vector retrieval engine implemented in Rust using SIMD AVX2 intrinsics and TurboQuant vector quantization combined with IVF indexing and mmap memory management. It resolves the high-dimensional vector memory wall for dense retrieval in large-scale RAG systems.',
      abstractVi:
        'ARQ-RAG là engine truy xuất vector hiệu năng cao xây dựng bằng Rust kết hợp tối ưu phần cứng SIMD AVX2 và lượng tử hóa TurboQuant với chỉ mục IVF và quản lý bộ nhớ mmap. Hệ thống giải quyết bài toán nút thắt bộ nhớ vector trong các hệ thống RAG quy mô lớn.',
      memoryReduction: '2-bit – 4-bit Quantization',
      accuracyRetention: 'Recall@K vs Float32',
      highlights: defaultHighlights,
    },
    contactInfo: {
      email: 'huynhluyen839@gmail.com',
      github: 'https://github.com/neshaki091',
      huggingface: 'https://huggingface.co/Neshaki',
      linkedin: 'www.linkedin.com/in/huynhcongluyen',
    },

    updateProfile: (data) => {
      const nextProfile = { ...get().profile, ...data };
      set({ profile: nextProfile });
    },

    updateProject: (id, updated) => {
      const current = get().projects;
      const targetIndex = current.findIndex((p) => p.id === id);
      if (targetIndex === -1) return;

      const fullUpdatedProject = { ...current[targetIndex], ...updated };
      const nextProjects = [...current];
      nextProjects[targetIndex] = fullUpdatedProject;

      set({ projects: nextProjects });
    },

    addProject: (newProject) => {
      const nextProjects = [newProject, ...get().projects];
      set({ projects: nextProjects });
    },

    deleteProject: (id) => {
      const nextProjects = get().projects.filter((p) => p.id !== id);
      set({ projects: nextProjects });
    },

    updateSkills: (newSkills) => {
      set({ skills: newSkills });
    },

    updateTimeline: (newTimeline) => {
      set({ timeline: newTimeline });
    },

    updateResearch: (data) => {
      const next = { ...get().research, ...data };
      set({ research: next });
    },

    addResearchHighlight: (item) => {
      const nextHighlights = [item, ...(get().research.highlights || [])];
      const nextResearch = { ...get().research, highlights: nextHighlights };
      set({ research: nextResearch });
    },

    deleteResearchHighlight: (id) => {
      const nextHighlights = (get().research.highlights || []).filter((h) => h.id !== id);
      const nextResearch = { ...get().research, highlights: nextHighlights };
      set({ research: nextResearch });
    },

    updateContactInfo: (data) => {
      const next = { ...get().contactInfo, ...data };
      set({ contactInfo: next });
    },
  };
});
