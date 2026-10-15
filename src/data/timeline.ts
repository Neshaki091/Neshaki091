import { TimelineItem } from '../types';

export const timelineData: TimelineItem[] = [
  {
    year: '2022 - 2026',
    title: {
      en: 'IT Student @ UTH',
      vi: 'Sinh viên CNTT @ UTH'
    },
    subtitle: {
      en: 'University of Transport Ho Chi Minh City',
      vi: 'Đại học Giao thông Vận tải TP.HCM'
    },
    description: {
      en: 'GPA 3.34 / 4.0. Specializing in Software Engineering, Backend Architecture, High-Performance Computing, and Vector Retrieval.',
      vi: 'GPA 3.34 / 4.0. Chuyên ngành Kỹ thuật Phần mềm, Kiến trúc Backend, Tính toán Hiệu năng cao và Truy xuất Vector.'
    },
    type: 'education'
  },
  {
    year: 'Nov 2025',
    title: {
      en: 'Waterbase — Self-Hosted BaaS',
      vi: 'Waterbase — BaaS Đa người dùng Tự host'
    },
    subtitle: {
      en: 'Sole Developer | Graduation Internship Project',
      vi: 'Lập trình viên duy nhất | Đồ án Thực tập Tốt nghiệp'
    },
    description: {
      en: 'Researched and built a 7-service microservices BaaS (Database-per-App multi-tenancy, declarative Rule Engine RBAC, WebSocket realtime, Docker Compose deployed on a 1GB RAM / 1 vCPU VPS).',
      vi: 'Nghiên cứu và phát triển hệ thống BaaS 7 microservices (cô lập dữ liệu Database-per-App, Rule Engine RBAC, đồng bộ realtime WebSocket, triển khai Docker Compose ổn định trên VPS chỉ 1GB RAM, 1 vCPU).'
    },
    type: 'project'
  },
  {
    year: 'Mar 2026',
    title: {
      en: 'Lotus Hackathon VNG 2026 — AI Assistant',
      vi: 'Lotus Hackathon VNG 2026 — Trợ lý AI'
    },
    subtitle: {
      en: 'Team Leader & Full AI Backend (Team of 2)',
      vi: 'Trưởng nhóm & Kỹ sư AI Backend (Đội 2 người)'
    },
    description: {
      en: 'Built and deployed an end-to-end working prototype in 36 hours among ~300 teams (~800 participants), featuring 3-tier intent routing and n8n workflow automation.',
      vi: 'Phát triển và triển khai bản demo working prototype hoàn chỉnh trong 36 giờ giữa ~300 đội (~800 người), tích hợp bộ phân loại ý định 3 lớp và tự động hóa n8n.'
    },
    type: 'project'
  },
  {
    year: 'Apr 2026',
    title: {
      en: 'ARQ-RAG Thesis (Grade: 9.0/10)',
      vi: 'Khóa luận Tốt nghiệp ARQ-RAG (Điểm: 9.0/10)'
    },
    subtitle: {
      en: 'Graduate Researcher & Core Developer',
      vi: 'Nghiên cứu sinh Tốt nghiệp & Kỹ sư Hệ thống'
    },
    description: {
      en: 'Researched and built a Rust-based SIMD AVX2 vector quantization & retrieval core with TurboQuant + IVF and mmap. Research paper submitted to AMI2026.',
      vi: 'Nghiên cứu và phát triển core lượng tử hóa & truy xuất vector bằng Rust SIMD AVX2 kết hợp TurboQuant + IVF và mmap. Bài báo nghiên cứu đã submit tới AMI2026.'
    },
    type: 'achievement'
  },
  {
    year: '2025 - 2026',
    title: {
      en: 'EduChatbot — Java RAG Assistant',
      vi: 'EduChatbot — Trợ lý AI Môn học Java'
    },
    subtitle: {
      en: 'Team Leader (6 Members) | Java Course Project',
      vi: 'Trưởng nhóm (6 thành viên) | Đồ án Môn học Java'
    },
    description: {
      en: 'Led a 6-member team to design and build a Spring Boot 3 + LangChain4j + Qdrant courseware assistant with automated LLM-as-a-Judge evaluation and an async Python FastAPI LoRA bridge.',
      vi: 'Dẫn dắt nhóm 6 thành viên thiết kế và phát triển trợ lý hỏi đáp tài liệu môn học Spring Boot 3 + LangChain4j + Qdrant với quy trình đánh giá tự động LLM-as-a-Judge và cầu nối FastAPI phục vụ mô hình LoRA.'
    },
    type: 'project'
  }
];

