export interface Project {
  id: string;
  title: string;
  subtitle: string | { en: string; vi: string };
  description: {
    en: string;
    vi: string;
  };
  type: string | { en: string; vi: string };
  role: string | { en: string; vi: string };
  image?: string;
  technologies: string[];
  features: {
    en: string[];
    vi: string[];
  };
  metrics?: {
    en: string[];
    vi: string[];
  };
  links: {
    demo?: string;
    video?: string;
    github?: string;
    docs?: string;
    paper?: string;
  };
  featured: boolean;
}

export interface SkillCategory {
  category: string;
  title: {
    en: string;
    vi: string;
  };
  items: {
    name: string;
    level?: string;
    description?: {
      en: string;
      vi: string;
    };
  }[];
}

export interface TimelineItem {
  year: string;
  title: {
    en: string;
    vi: string;
  };
  subtitle: {
    en: string;
    vi: string;
  };
  description: {
    en: string;
    vi: string;
  };
  type: 'education' | 'work' | 'project' | 'achievement';
}
