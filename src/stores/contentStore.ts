import { create } from 'zustand';
import { projectsData } from '../data/projects';
import { skillsData } from '../data/skills';
import { timelineData } from '../data/timeline';
import { Project, SkillCategory, TimelineItem } from '../types';
import { fetchTableContentFromSupabase, saveContentToSupabase, deleteContentFromSupabase, createBackupInRecoveryBucket, isSupabaseConfigured } from '../lib/supabase';

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
  waterbase: string;
  cvEn: string;
  cvVi: string;
}

interface ContentState {
  profile: ProfileData;
  projects: Project[];
  skills: SkillCategory[];
  timeline: TimelineItem[];
  research: ResearchData;
  contactInfo: ContactInfoData;

  syncWithSupabase: () => Promise<void>;
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
  backupToRecoveryBucket: () => Promise<{ success: boolean; fileName?: string; error?: any }>;
}

const defaultHighlights: ResearchHighlightItem[] = [
  { id: 'h1', title: 'TurboQuant Quantization Engine', desc: 'Custom Rust implementation leveraging SIMD AVX2 intrinsic parallel execution.' },
  { id: 'h2', title: 'ITQ (Iterative Quantization)', desc: 'Orthogonal Procrustes rotation minimizing quantization loss.' },
  { id: 'h3', title: 'Max-Lloyd Percentile Clipping', desc: 'Optimal centroid codebook generation with P01-P99 outlier clipping.' },
  { id: 'h4', title: 'Asymmetric Distance Computation (ADC)', desc: 'Lookup Table (LUT) acceleration bypassing Float32 decompression.' },
  { id: 'h5', title: 'Memory-Mapped Vector Access (mmap)', desc: 'Disk-backed vector index handling datasets exceeding physical RAM.' },
];

const defaultProfile: ProfileData = {
  avatarUrl: '/avatar.jpg',
  badge: 'Backend & AI Software Engineer',
  titlePrefix: 'Hello, I am ',
  name: 'Huỳnh Công Luyện',
  tagline: 'Software Engineer Specializing in High-Performance RAG Systems & Scalable Infrastructure',
  subtext: 'Building Rust SIMD vector quantization engines, scalable backend microservices, and production AI retrieval systems.',
  bio: 'IT Graduate from University of Transport Ho Chi Minh City with a GPA of 3.26/4.0. Passionate about Backend Architecture, High-Performance Computing (HPC), Vector Databases, and production RAG systems.',
  education: 'University of Transport Ho Chi Minh City',
  degree: 'Bachelor of Information Technology (2022 - 2026)',
  gpa: '3.26 / 4.0',
};

export const useContentStore = create<ContentState>((set, get) => {
  return {
    profile: defaultProfile,
    projects: projectsData,
    skills: skillsData,
    timeline: timelineData,
    research: {
      abstractEn:
        'ARQ-RAG introduces a high-performance retrieval engine implemented in Rust using SIMD AVX2 intrinsics and TurboQuant vector quantization. It reduces vector memory footprint by 8-16x (Float32 down to 2-4bit) while preserving >95% Recall@K accuracy and boosting throughput by 3-5x.',
      abstractVi:
        'ARQ-RAG phát triển engine truy xuất hiệu năng cao bằng ngôn ngữ Rust kết hợp tối ưu hóa phần cứng SIMD AVX2 và thuật toán TurboQuant. Hệ thống giảm dung lượng bộ nhớ vector 8-16 lần (Float32 xuống 2-4bit) trong khi duy trì độ chính xác Recall@K >95% và tăng thông lượng xử lý 3-5 lần.',
      memoryReduction: '8x – 16x',
      accuracyRetention: '> 95%',
      highlights: defaultHighlights,
    },
    contactInfo: {
      email: 'neshaki091@gmail.com',
      github: 'https://github.com/neshaki091',
      waterbase: 'https://web.waterbase.click',
      cvEn: '/assets/cv/cv-en.pdf',
      cvVi: '/assets/cv/cv-vi.pdf',
    },

    // Sync profile and all content directly with Supabase Cloud DB
    syncWithSupabase: async () => {
      if (!isSupabaseConfigured) return;

      const remoteProjects = await fetchTableContentFromSupabase<Project>('projects');
      if (remoteProjects && remoteProjects.length > 0) {
        set({ projects: remoteProjects });
      }

      const remoteSettings = await fetchTableContentFromSupabase<{ key: string; value: string }>('admin_settings');
      if (remoteSettings) {
        const profileObj = { ...get().profile };
        const resObj = { ...get().research };
        const contactObj = { ...get().contactInfo };
        let remoteSkills: SkillCategory[] | null = null;
        let remoteTimeline: TimelineItem[] | null = null;

        remoteSettings.forEach((row) => {
          if (row.key === 'profile_avatar_url') profileObj.avatarUrl = row.value;
          if (row.key === 'profile_badge') profileObj.badge = row.value;
          if (row.key === 'profile_title_prefix') profileObj.titlePrefix = row.value;
          if (row.key === 'profile_name') profileObj.name = row.value;
          if (row.key === 'profile_tagline') profileObj.tagline = row.value;
          if (row.key === 'profile_subtext') profileObj.subtext = row.value;
          if (row.key === 'profile_bio') profileObj.bio = row.value;
          if (row.key === 'profile_education') profileObj.education = row.value;
          if (row.key === 'profile_degree') profileObj.degree = row.value;
          if (row.key === 'gpa') profileObj.gpa = row.value;

          if (row.key === 'research_abstract_vi') resObj.abstractVi = row.value;
          if (row.key === 'research_abstract_en') resObj.abstractEn = row.value;
          if (row.key === 'research_mem_reduction') resObj.memoryReduction = row.value;
          if (row.key === 'research_accuracy') resObj.accuracyRetention = row.value;
          if (row.key === 'research_highlights') resObj.highlights = JSON.parse(row.value);

          if (row.key === 'contact_email') contactObj.email = row.value;
          if (row.key === 'contact_github') contactObj.github = row.value;
          if (row.key === 'contact_waterbase') contactObj.waterbase = row.value;
          if (row.key === 'contact_cven') contactObj.cvEn = row.value;
          if (row.key === 'contact_cvvi') contactObj.cvVi = row.value;

          if (row.key === 'skills_data') remoteSkills = JSON.parse(row.value);
          if (row.key === 'timeline_data') remoteTimeline = JSON.parse(row.value);
        });

        set({
          profile: profileObj,
          research: resObj,
          contactInfo: contactObj,
          ...(remoteSkills ? { skills: remoteSkills } : {}),
          ...(remoteTimeline ? { timeline: remoteTimeline } : {}),
        });
      }
    },

    updateProfile: (data) => {
      const nextProfile = { ...get().profile, ...data };
      set({ profile: nextProfile });

      if (isSupabaseConfigured) {
        if (data.avatarUrl !== undefined) saveContentToSupabase('admin_settings', { key: 'profile_avatar_url', value: data.avatarUrl });
        if (data.badge !== undefined) saveContentToSupabase('admin_settings', { key: 'profile_badge', value: data.badge });
        if (data.titlePrefix !== undefined) saveContentToSupabase('admin_settings', { key: 'profile_title_prefix', value: data.titlePrefix });
        if (data.name !== undefined) saveContentToSupabase('admin_settings', { key: 'profile_name', value: data.name });
        if (data.tagline !== undefined) saveContentToSupabase('admin_settings', { key: 'profile_tagline', value: data.tagline });
        if (data.subtext !== undefined) saveContentToSupabase('admin_settings', { key: 'profile_subtext', value: data.subtext });
        if (data.bio !== undefined) saveContentToSupabase('admin_settings', { key: 'profile_bio', value: data.bio });
        if (data.education !== undefined) saveContentToSupabase('admin_settings', { key: 'profile_education', value: data.education });
        if (data.degree !== undefined) saveContentToSupabase('admin_settings', { key: 'profile_degree', value: data.degree });
        if (data.gpa !== undefined) saveContentToSupabase('admin_settings', { key: 'gpa', value: data.gpa });
      }
    },

    updateProject: (id, updated) => {
      const current = get().projects;
      const targetIndex = current.findIndex((p) => p.id === id);
      if (targetIndex === -1) return;

      const fullUpdatedProject = { ...current[targetIndex], ...updated };
      const nextProjects = [...current];
      nextProjects[targetIndex] = fullUpdatedProject;

      set({ projects: nextProjects });

      if (isSupabaseConfigured) {
        saveContentToSupabase('projects', fullUpdatedProject);
      }
    },

    addProject: (newProject) => {
      const nextProjects = [newProject, ...get().projects];
      set({ projects: nextProjects });

      if (isSupabaseConfigured) {
        saveContentToSupabase('projects', newProject);
      }
    },

    deleteProject: (id) => {
      const nextProjects = get().projects.filter((p) => p.id !== id);
      set({ projects: nextProjects });

      if (isSupabaseConfigured) {
        deleteContentFromSupabase('projects', 'id', id);
      }
    },

    updateSkills: (newSkills) => {
      set({ skills: newSkills });

      if (isSupabaseConfigured) {
        saveContentToSupabase('admin_settings', { key: 'skills_data', value: JSON.stringify(newSkills) });
      }
    },

    updateTimeline: (newTimeline) => {
      set({ timeline: newTimeline });

      if (isSupabaseConfigured) {
        saveContentToSupabase('admin_settings', { key: 'timeline_data', value: JSON.stringify(newTimeline) });
      }
    },

    updateResearch: (data) => {
      const next = { ...get().research, ...data };
      set({ research: next });

      if (isSupabaseConfigured) {
        if (data.abstractVi) saveContentToSupabase('admin_settings', { key: 'research_abstract_vi', value: data.abstractVi });
        if (data.abstractEn) saveContentToSupabase('admin_settings', { key: 'research_abstract_en', value: data.abstractEn });
        if (data.memoryReduction) saveContentToSupabase('admin_settings', { key: 'research_mem_reduction', value: data.memoryReduction });
        if (data.accuracyRetention) saveContentToSupabase('admin_settings', { key: 'research_accuracy', value: data.accuracyRetention });
        if (data.highlights) saveContentToSupabase('admin_settings', { key: 'research_highlights', value: JSON.stringify(data.highlights) });
      }
    },

    addResearchHighlight: (item) => {
      const nextHighlights = [item, ...(get().research.highlights || [])];
      const nextResearch = { ...get().research, highlights: nextHighlights };
      set({ research: nextResearch });

      if (isSupabaseConfigured) {
        saveContentToSupabase('admin_settings', { key: 'research_highlights', value: JSON.stringify(nextHighlights) });
      }
    },

    deleteResearchHighlight: (id) => {
      const nextHighlights = (get().research.highlights || []).filter((h) => h.id !== id);
      const nextResearch = { ...get().research, highlights: nextHighlights };
      set({ research: nextResearch });

      if (isSupabaseConfigured) {
        saveContentToSupabase('admin_settings', { key: 'research_highlights', value: JSON.stringify(nextHighlights) });
      }
    },

    updateContactInfo: (data) => {
      const next = { ...get().contactInfo, ...data };
      set({ contactInfo: next });

      if (isSupabaseConfigured) {
        if (data.email) saveContentToSupabase('admin_settings', { key: 'contact_email', value: data.email });
        if (data.github) saveContentToSupabase('admin_settings', { key: 'contact_github', value: data.github });
        if (data.waterbase) saveContentToSupabase('admin_settings', { key: 'contact_waterbase', value: data.waterbase });
        if (data.cvEn) saveContentToSupabase('admin_settings', { key: 'contact_cven', value: data.cvEn });
        if (data.cvVi) saveContentToSupabase('admin_settings', { key: 'contact_cvvi', value: data.cvVi });
      }
    },

    // Upload Backup JSON Snapshot File to Supabase 'recovery' Storage Bucket
    backupToRecoveryBucket: async () => {
      const fullSnapshot = {
        profile: get().profile,
        projects: get().projects,
        skills: get().skills,
        timeline: get().timeline,
        research: get().research,
        contactInfo: get().contactInfo,
        created_at: new Date().toISOString(),
      };
      return await createBackupInRecoveryBucket(fullSnapshot);
    },
  };
});
