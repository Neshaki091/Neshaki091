import { SkillCategory } from '../types';

export const skillsData: SkillCategory[] = [
  {
    category: 'languages',
    title: {
      en: 'Programming Languages',
      vi: 'Ngôn Ngữ Lập Trình'
    },
    items: [
      {
        name: 'Rust',
        level: 'Advanced',
        description: {
          en: 'SIMD AVX2 intrinsics, TurboQuant quantization engine, mmap, memory safety',
          vi: 'SIMD AVX2 intrinsics, engine lượng tử hóa TurboQuant, mmap, an toàn bộ nhớ'
        }
      },
      {
        name: 'Java',
        level: 'Advanced',
        description: {
          en: 'Java 17+, Spring Boot 3, JPA/Hibernate, LangChain4j, Microservices',
          vi: 'Java 17+, Spring Boot 3, JPA/Hibernate, LangChain4j, Kiến trúc Microservices'
        }
      },
      {
        name: 'Node.js / TypeScript',
        level: 'Advanced',
        description: {
          en: 'Express, NestJS, Async I/O, WebSockets, Multi-tenant systems',
          vi: 'Express, NestJS, Async I/O, WebSockets, Hệ thống Multi-tenant'
        }
      },
      {
        name: 'Python',
        level: 'Experienced',
        description: {
          en: 'FastAPI, PyTorch, Vector Quantization (ITQ), LangChain, Data Pipeline',
          vi: 'FastAPI, PyTorch, Lượng tử hóa Vector (ITQ), LangChain, Pipeline dữ liệu'
        }
      },
      {
        name: 'C / C++',
        level: 'Proficient',
        description: {
          en: 'Low-level memory management, Data Structures & Algorithms',
          vi: 'Quản lý bộ nhớ con trỏ, Cấu trúc dữ liệu & Giải thuật'
        }
      }
    ]
  },
  {
    category: 'frameworks',
    title: {
      en: 'Frameworks & Ecosystem',
      vi: 'Frameworks & Hệ Sinh Thái'
    },
    items: [
      {
        name: 'Spring Boot 3',
        level: 'Core Framework',
        description: {
          en: 'REST APIs, Spring Security, JPA Data Repositories, Actuator',
          vi: 'Xây dựng REST APIs, Spring Security, JPA Repositories, Actuator'
        }
      },
      {
        name: 'Express.js / NestJS',
        level: 'Core Framework',
        description: {
          en: 'Modular architecture, Dependency Injection, Middleware, JWT Auth',
          vi: 'Kiến trúc mô-đun, Dependency Injection, Middleware, Xác thực JWT'
        }
      },
      {
        name: 'FastAPI',
        level: 'AI Microservices',
        description: {
          en: 'Async endpoints, Pydantic data validation, PyTorch model bridges',
          vi: 'Endpoints bất đồng bộ, Pydantic validation, Cầu nối mô hình PyTorch'
        }
      },
      {
        name: 'React',
        level: 'Frontend UI',
        description: {
          en: 'Vite, Tailwind CSS, Framer Motion, Zustand, i18next',
          vi: 'Vite, Tailwind CSS, Framer Motion, Zustand, Đa ngôn ngữ i18next'
        }
      },
      {
        name: 'LangChain & LangChain4j',
        level: 'RAG Framework',
        description: {
          en: 'Document loaders, Text splitters, VectorStore integration, Prompt templates',
          vi: 'Loader tài liệu, Text splitter, Tích hợp VectorStore, Prompt templates'
        }
      }
    ]
  },
  {
    category: 'ai_vector',
    title: {
      en: 'AI, RAG & Vector Databases',
      vi: 'Trí Tuệ Nhân Tạo & Vector Databases'
    },
    items: [
      {
        name: 'Vector Quantization (TurboQuant / ITQ)',
        level: 'Core Research',
        description: {
          en: 'Max-Lloyd percentile clipping, Asymmetric Distance Computation (ADC), LUTs',
          vi: 'Max-Lloyd percentile clipping, Tính khoảng cách bất đối xứng ADC, Bảng tra LUT'
        }
      },
      {
        name: 'SIMD AVX2 Hardware Acceleration',
        level: 'HPC & Performance',
        description: {
          en: '256-bit vector registers, parallel inner-product & distance computation',
          vi: 'Thanh ghi vector 256-bit, tính tích trong & khoảng cách song song'
        }
      },
      {
        name: 'Qdrant & Supabase pgvector',
        level: 'Vector Stores',
        description: {
          en: 'HNSW indexing, ANN search, Payload metadata filtering, Tenant isolation',
          vi: 'Chỉ mục HNSW, Tìm kiếm ANN, Lọc payload metadata, Cô lập tenant'
        }
      },
      {
        name: 'LLM Integration & Prompting',
        level: 'Generative AI',
        description: {
          en: 'Gemini 2.5 Flash, Groq, OpenRouter, Anti-hallucination prompting, LLM-as-a-Judge',
          vi: 'Gemini 2.5 Flash, Groq, OpenRouter, Anti-hallucination prompting, LLM-as-a-Judge'
        }
      }
    ]
  },
  {
    category: 'databases_devops',
    title: {
      en: 'Databases & Infrastructure',
      vi: 'Cơ Sở Dữ Liệu & DevOps'
    },
    items: [
      {
        name: 'Databases (PostgreSQL, MongoDB, Redis)',
        level: 'Data Layer',
        description: {
          en: 'Relational schema design, Document databases, Caching & Session stores',
          vi: 'Thiết kế CSDL quan hệ, Document DB, Caching & Quản lý Session'
        }
      },
      {
        name: 'Message Queues (RabbitMQ)',
        level: 'Event-Driven',
        description: {
          en: 'Inter-service async communication, Task queues, Exchange routing',
          vi: 'Giao tiếp microservices bất đồng bộ, Hàng đợi công việc, Routing'
        }
      },
      {
        name: 'Docker & Nginx',
        level: 'DevOps & Hosting',
        description: {
          en: 'Containerization, Multi-service Docker Compose, Reverse Proxy, SSL termination',
          vi: 'Đóng gói Container, Docker Compose multi-service, Reverse Proxy, SSL'
        }
      },
      {
        name: 'Automation & CI/CD',
        level: 'Workflow',
        description: {
          en: 'n8n workflow triggers, GitHub Actions, Linux administration',
          vi: 'n8n workflow triggers, GitHub Actions, Quản trị hệ thống Linux'
        }
      }
    ]
  }
];
