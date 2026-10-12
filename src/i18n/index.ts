import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Default English Key-Value Dictionary (No static JSON files needed)
const defaultEnglishTranslations: Record<string, string> = {
  "nav.home": "Home",
  "nav.about": "About",
  "nav.skills": "Skills",
  "nav.projects": "Projects",
  "nav.research": "Research",
  "nav.contact": "Contact",

  "hero.badge": "Backend & AI RAG Student Developer",
  "hero.titlePrefix": "Hello, I am ",
  "hero.name": "Huỳnh Công Luyện",
  "hero.tagline": "IT Student with Extensive Practical Experience in High-Performance RAG Systems & Backend Infrastructure",
  "hero.subtext": "Passionate about building Rust SIMD vector quantization engines, microservices architectures, and hands-on production systems.",
  "hero.ctaProjects": "View Projects",
  "hero.ctaCv": "Download CV",
  "hero.ctaContact": "Contact Me",

  "about.title": "About Me",
  "about.subtitle": "Growth Journey, Education & Milestones",
  "about.bio": "I am a senior IT undergraduate at University of Transport Ho Chi Minh City with a GPA of 3.26/4.0. I focus on gaining extensive hands-on engineering experience through practical projects in Backend Architecture, High-Performance Computing (HPC), Vector Databases, and RAG systems.",
  "about.education": "University of Transport Ho Chi Minh City",
  "about.degree": "Bachelor of Information Technology (2022 - 2026)",
  "about.gpa": "GPA: 3.26 / 4.0",
  "about.timelineTitle": "Journey & Milestones",

  "skills.title": "Skills & Expertise",
  "skills.subtitle": "Technical skills acquired through hands-on development",

  "projects.title": "Featured Projects",
  "projects.subtitle": "Highlighted systems and applications built",
  "projects.keyFeatures": "Key Innovations & Features",
  "projects.results": "Technical Performance Metrics",
  "projects.viewDemo": "Live Demo",
  "projects.github": "GitHub Source",
  "projects.viewGithub": "GitHub Source",
  "projects.viewDocs": "Docs",

  "research.title": "Research & Thesis",
  "research.subtitle": "Bachelor Thesis on RAG & High-Performance Vector Retrieval",
  "research.abstractTitle": "ARQ-RAG Thesis Engine Abstract",
  "research.highlightsTitle": "Key Innovations",

  "contact.title": "Get In Touch",
  "contact.subtitle": "Feel free to reach out for career opportunities or project discussions",
  "contact.directEmail": "Direct Email",
  "contact.socials": "Online Links & Profiles",
  "contact.formName": "Your Name",
  "contact.formEmail": "Your Email",
  "contact.formMessage": "Your Message",
  "contact.send": "Send Direct Email",

  "footer.rights": "All rights reserved. Built with React.",
  "footer.quote": "Crafting resilient software through hands-on engineering."
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: defaultEnglishTranslations },
      vi: { translation: defaultEnglishTranslations },
    },
    lng: 'en',
    fallbackLng: 'en',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
