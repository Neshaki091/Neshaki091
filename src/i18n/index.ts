import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const defaultEnglishTranslations: Record<string, string> = {
  "nav.home": "Home",
  "nav.about": "About",
  "nav.skills": "Skills",
  "nav.projects": "Projects",
  "nav.research": "Research",
  "nav.contact": "Contact",

  "hero.badge": "Backend & AI Engineer",
  "hero.titlePrefix": "Hello, I am ",
  "hero.name": "Huỳnh Công Luyện",
  "hero.tagline": "Backend & AI Engineer | RAG • Vector Search • AI Systems",
  "hero.subtext": "Focused on low-level vector quantization (Rust + SIMD AVX2), backend architectures (Java/Spring Boot, Node.js), and production-grade RAG pipelines.",
  "hero.ctaProjects": "View Projects",
  "hero.ctaCv": "Download CV",
  "hero.ctaContact": "Contact Me",

  "about.title": "About Me",
  "about.subtitle": "Growth Journey, Education & Milestones",
  "about.bio": "I am an Information Technology graduate from University of Transport Ho Chi Minh City (UTH) with a GPA of 3.34/4.0. I focus on low-level vector quantization algorithms, high-performance computing, backend systems, and verifiable RAG pipelines.",
  "about.education": "University of Transport Ho Chi Minh City (UTH)",
  "about.degree": "Bachelor of Information Technology (2022 - 2026)",
  "about.gpa": "GPA: 3.34 / 4.0",
  "about.academicStanding": "Academic Standing",
  "about.philosophy": "Core Engineering Philosophy",
  "about.timelineTitle": "Journey & Milestones",

  "skills.title": "Technical Stack",
  "skills.subtitle": "Core backend technologies, AI retrieval pipelines, and distributed infrastructure",
  "skills.techsCount": "Technologies",

  "projects.title": "Featured Projects",
  "projects.subtitle": "Selected engineering systems, BaaS platform, and RAG architectures",
  "projects.keyFeatures": "Key Innovations & Features",
  "projects.results": "Technical Performance Metrics",
  "projects.role": "Role",
  "projects.viewDemo": "Live Demo",
  "projects.viewVideo": "Video Demo",
  "projects.github": "GitHub Source",
  "projects.viewGithub": "GitHub Source",
  "projects.viewDocs": "Docs",

  "research.title": "Research & Thesis",
  "research.subtitle": "Graduate Thesis on Vector Quantization & RAG (Score: 9.0/10 • Paper Submitted to AMI2026)",
  "research.abstractTitle": "ARQ-RAG Thesis Engine Abstract",
  "research.thesisMeta": "Graduate Thesis (Score: 9.0/10) • Paper submitted to AMI2026",
  "research.memoryReduction": "Memory Reduction",
  "research.accuracyRetention": "Accuracy Retention",
  "research.highlightsTitle": "Key Technical Innovations",

  "contact.title": "Get In Touch",
  "contact.subtitle": "Available for Junior / Fresher Backend & AI Engineer opportunities in Ho Chi Minh City",
  "contact.directEmail": "Direct Email",
  "contact.socials": "Online Links & Profiles",
  "contact.formName": "Your Name",
  "contact.formEmail": "Your Email",
  "contact.formMessage": "Your Message",
  "contact.send": "Send Direct Email",

  "footer.rights": "All rights reserved. Built with React.",
  "footer.quote": "Crafting resilient software through hands-on engineering."
};

const defaultVietnameseTranslations: Record<string, string> = {
  "nav.home": "Trang chủ",
  "nav.about": "Về tôi",
  "nav.skills": "Kỹ năng",
  "nav.projects": "Dự án",
  "nav.research": "Nghiên cứu",
  "nav.contact": "Liên hệ",

  "hero.badge": "Backend & AI Engineer",
  "hero.titlePrefix": "Xin chào, tôi là ",
  "hero.name": "Huỳnh Công Luyện",
  "hero.tagline": "Backend & AI Engineer | RAG • Vector Search • AI Systems",
  "hero.subtext": "Chuyên sâu về lượng tử hóa vector tầng thấp (Rust + SIMD AVX2), kiến trúc backend (Java/Spring Boot, Node.js) và hệ thống RAG thực tế.",
  "hero.ctaProjects": "Xem Dự Án",
  "hero.ctaCv": "Tải CV",
  "hero.ctaContact": "Liên Hệ",

  "about.title": "Về Bản Thân",
  "about.subtitle": "Quá trình phát triển, Học vấn & Cột mốc",
  "about.bio": "Tôi tốt nghiệp chuyên ngành Công nghệ Thông tin tại Trường Đại học Giao thông Vận tải TP.HCM (UTH) với GPA 3.34/4.0. Tôi tập trung nghiên cứu thuật toán lượng tử hóa vector, tính toán hiệu năng cao, kiến trúc backend và các hệ thống RAG thực tế.",
  "about.education": "Đại học Giao thông Vận tải TP.HCM (UTH)",
  "about.degree": "Cử nhân Công nghệ Thông tin (2022 - 2026)",
  "about.gpa": "GPA: 3.34 / 4.0",
  "about.academicStanding": "Xếp loại Học lực",
  "about.philosophy": "Triết lý Kỹ thuật Cốt lõi",
  "about.timelineTitle": "Hành trình & Cột mốc Kỹ thuật",

  "skills.title": "Kỹ Năng & Công Nghệ",
  "skills.subtitle": "Hạ tầng Backend cốt lõi, pipeline truy xuất AI và hệ thống phân tán",
  "skills.techsCount": "Công nghệ",

  "projects.title": "Dự Án Nổi Bật",
  "projects.subtitle": "Các hệ thống kỹ thuật tiêu biểu, nền tảng BaaS và kiến trúc RAG",
  "projects.keyFeatures": "Tính Năng & Đột Phá Kỹ Thuật",
  "projects.results": "Chỉ Số & Kết Quả Đạt Được",
  "projects.role": "Vai trò",
  "projects.viewDemo": "Live Demo",
  "projects.viewVideo": "Video Demo",
  "projects.github": "Mã Nguồn GitHub",
  "projects.viewGithub": "Mã Nguồn GitHub",
  "projects.viewDocs": "Tài Liệu Báo Cáo",

  "research.title": "Nghiên Cứu & Luận Văn",
  "research.subtitle": "Khóa luận tốt nghiệp về Lượng tử hóa Vector & RAG (Điểm: 9.0/10 • Paper Submitted to AMI2026)",
  "research.abstractTitle": "Tóm Tắt Khóa Luận ARQ-RAG",
  "research.thesisMeta": "Khóa luận Tốt nghiệp (Điểm: 9.0/10) • Bài báo đã gửi tới AMI2026",
  "research.memoryReduction": "Mức Nén Bộ Nhớ",
  "research.accuracyRetention": "Độ Chính Xác Giữ Lại",
  "research.highlightsTitle": "Điểm Nổi Bật Kỹ Thuật",

  "contact.title": "Liên Hệ",
  "contact.subtitle": "Sẵn sàng đón nhận cơ hội việc làm Backend & AI Engineer (Junior / Fresher) tại TP.HCM",
  "contact.directEmail": "Email Trực Tiếp",
  "contact.socials": "Liên Kết & Dự Án Trực Tuyến",
  "contact.formName": "Họ và Tên",
  "contact.formEmail": "Địa chỉ Email",
  "contact.formMessage": "Nội dung Tin nhắn",
  "contact.send": "Gửi Email Trực Tiếp",

  "footer.rights": "Bảo lưu mọi quyền. Xây dựng bằng React.",
  "footer.quote": "Kiến tạo phần mềm bền bỉ thông qua kỹ thuật thực chiến."
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: defaultEnglishTranslations },
      vi: { translation: defaultVietnameseTranslations },
    },
    lng: 'en',
    fallbackLng: 'en',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
