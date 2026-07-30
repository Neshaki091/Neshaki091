import { TimelineItem } from '../types';

export const timelineData: TimelineItem[] = [
  {
    year: '2022 - Present',
    title: {
      en: 'IT Student @ UTH',
      vi: 'Sinh viên CNTT @ UTH'
    },
    subtitle: {
      en: 'University of Transport Ho Chi Minh City',
      vi: 'Đại học Giao thông Vận tải TP.HCM'
    },
    description: {
      en: 'GPA 3.26 / 4.0. Specializing in Software Engineering, Backend Architecture, HPC, and AI.',
      vi: 'GPA 3.26 / 4.0. Chuyên ngành Công nghệ phần mềm, kiến trúc Backend, tính toán hiệu năng cao và AI.'
    },
    type: 'education'
  },
  {
    year: '2024',
    title: {
      en: 'Waterbase BaaS Platform',
      vi: 'Nền tảng Waterbase BaaS'
    },
    subtitle: {
      en: 'Personal Product & Founder',
      vi: 'Sản phẩm cá nhân & Tự phát triển'
    },
    description: {
      en: 'Architected & deployed an 8-microservice self-hosted BaaS platform supporting authentication, real-time DB, rule engines, and Gemini RAG.',
      vi: 'Thiết kế & triển khai nền tảng BaaS tự host với 8 microservices hỗ trợ auth, real-time DB, security rules và Gemini RAG.'
    },
    type: 'project'
  },
  {
    year: '2025',
    title: {
      en: 'Enterprise Java RAG Chatbot',
      vi: 'Trợ lý AI Java RAG Doanh nghiệp'
    },
    subtitle: {
      en: 'Team Leader & Infrastructure Engineer',
      vi: 'Trưởng nhóm & Kỹ sư Hạ tầng'
    },
    description: {
      en: 'Led a team of 6 to build Spring Boot 3 + LangChain4j RAG chatbot with side-by-side A/B evaluation against LoRA Fine-Tuned models.',
      vi: 'Lãnh đạo nhóm 6 người phát triển chatbot RAG Spring Boot 3 + LangChain4j với hệ thống thử nghiệm A/B so sánh với LoRA Fine-tuning.'
    },
    type: 'work'
  },
  {
    year: '2026',
    title: {
      en: '⚡ Hackathon 2026 AI Assistant',
      vi: '⚡ Hackathon 2026 AI Assistant'
    },
    subtitle: {
      en: 'Team Lead & AI Backend Architect',
      vi: 'Trưởng nhóm & Kiến trúc sư AI Backend'
    },
    description: {
      en: 'Built & deployed a functional enterprise RAG assistant with 3-tier intent parsing and n8n workflow automation in 36 hours.',
      vi: 'Xây dựng & triển khai hoàn chỉnh trợ lý RAG doanh nghiệp xử lý ý định 3 lớp và tự động hóa quy trình n8n trong 36 giờ.'
    },
    type: 'project'
  },
  {
    year: '2026',
    title: {
      en: 'ARQ-RAG Thesis',
      vi: 'Luận Văn Tốt Nghiệp ARQ-RAG'
    },
    subtitle: {
      en: 'Graduate Researcher',
      vi: 'Nghiên cứu sinh Tốt nghiệp'
    },
    description: {
      en: 'Researched & built TurboQuant engine in Rust with SIMD AVX2, achieving 8-16x vector compression with >95% Recall@K retention.',
      vi: 'Nghiên cứu & phát triển engine TurboQuant bằng Rust với SIMD AVX2, đạt tỷ lệ nén vector 8-16x và duy trì độ chính xác >95%.'
    },
    type: 'achievement'
  }
];
