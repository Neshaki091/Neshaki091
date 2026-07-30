import { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'arq-rag',
    title: 'ARQ-RAG',
    subtitle: 'Adaptive Retrieval with Quantization for RAG (Thesis)',
    type: 'Graduate Thesis',
    role: 'Researcher & Core Developer',
    description: {
      en: 'High-performance RAG system utilizing TurboQuant vector quantization to compress vector memory footprints by 8-16x while maintaining >95% Recall@K accuracy.',
      vi: 'Hệ thống RAG hiệu năng cao sử dụng thuật toán nén TurboQuant giúp giảm 8-16 lần dung lượng bộ nhớ vector nhưng vẫn giữ độ chính xác Recall@K trên 95%.'
    },
    technologies: ['Rust', 'SIMD AVX2', 'Python', 'Vector Quantization', 'mmap', 'Linear Algebra'],
    features: {
      en: [
        'TurboQuant engine written in Rust with SIMD AVX2 intrinsic optimization',
        'ITQ (Iterative Quantization) with Orthogonal Procrustes rotation',
        'Max-Lloyd quantization with percentile clipping (P01-P99)',
        'Asymmetric Distance Computation (ADC) via Lookup Tables (LUT)',
        'Cluster-centric scan + SIMD Query Fusion for high throughput',
        'mmap memory-mapped file support for handling datasets larger than RAM'
      ],
      vi: [
        'Engine TurboQuant viết bằng Rust với tối ưu hóa SIMD AVX2 phần cứng',
        'Thuật toán ITQ (Iterative Quantization) kết hợp Orthogonal Procrustes',
        'Lượng tử hóa Max-Lloyd với percentile clipping khống chế nhiễu (P01-P99)',
        'Tính toán khoảng cách bất đối xứng ADC thông qua bảng tra Lookup Tables',
        'Cluster-centric scan kết hợp SIMD Query Fusion tăng tối đa throughput',
        'Hỗ trợ mmap truy xuất tập dữ liệu vượt quá giới hạn bộ nhớ RAM vật lý'
      ]
    },
    metrics: {
      en: [
        '8x to 16x vector memory compression ratio (Float32 → 4-bit / 2-bit)',
        '>95% Recall@K accuracy retention vs Float32 baseline',
        '3-5x throughput acceleration via SIMD AVX2 parallel execution'
      ],
      vi: [
        'Tỷ lệ nén bộ nhớ vector từ 8x đến 16x (Float32 xuống 4-bit / 2-bit)',
        'Duy trì >95% độ chính xác Recall@K so với chuẩn Float32',
        'Tăng thông lượng truy xuất 3-5 lần nhờ tối ưu hóa phần cứng SIMD'
      ]
    },
    links: {},
    featured: true
  },
  {
    id: 'waterbase',
    title: 'Waterbase',
    subtitle: 'Self-Hosted Backend-as-a-Service (BaaS)',
    type: 'Personal Product',
    role: 'Founder & Full-stack Architect',
    description: {
      en: 'A self-hosted Firebase alternative designed for developer teams. Includes 8 containerized microservices supporting multi-tenancy, authentication, real-time database, rule engines, and RAG AI assistants.',
      vi: 'Nền tảng BaaS tự host thay thế Firebase dành cho developers. Gồm 8 microservices containerized hỗ trợ đa người dùng (multi-tenant), xác thực, cơ sở dữ liệu thời gian thực và trợ lý AI.'
    },
    technologies: ['Node.js', 'MongoDB', 'Redis', 'RabbitMQ', 'Docker Compose', 'Nginx', 'React', 'Socket.io'],
    features: {
      en: [
        'Multi-tenant architecture with isolated clientId spaces',
        'JWT authentication with refresh token rotation & RBAC',
        'Real-time document database with WebSocket broadcast subscriptions',
        'Security rules execution engine for fine-grained access control',
        'Built-in RAG AI assistant integration using Gemini API',
        'Docker Compose orchestration for single-command self-hosting',
        'Nginx reverse proxy with SSL termination and rate limiting'
      ],
      vi: [
        'Kiến trúc Multi-tenant cô lập không gian dữ liệu bằng clientId',
        'Xác thực JWT với cơ chế refresh token rotation & phân quyền RBAC',
        'Real-time database qua WebSocket truyền dữ liệu tức thì',
        'Engine thực thi quy tắc bảo mật (Security Rules) chi tiết tới từng trường',
        'Tích hợp trợ lý RAG AI tự động dựa trên Gemini API',
        'Đóng gói Docker Compose giúp triển khai self-host chỉ với 1 câu lệnh',
        'Nginx reverse proxy quản lý SSL termination và chống ddos/rate limit'
      ]
    },
    links: {
      demo: 'https://web.waterbase.click',
      docs: 'https://api.waterbase.click'
    },
    featured: true
  },
  {
    id: 'hackathon-ai',
    title: 'Internal AI Assistant',
    subtitle: 'Enterprise Action & Retrieval Bot (Hackathon 2026)',
    type: 'Hackathon Project',
    role: 'Team Lead & AI Backend Architect',
    description: {
      en: 'Built & deployed in 36 hours for Hackathon 2026. Fully functional enterprise AI assistant enabling employees to query internal policy documents via RAG and trigger automated workflows (leave requests, email sending) using natural conversation.',
      vi: 'Xây dựng & triển khai hoàn chỉnh trong 36 giờ tại Hackathon 2026. Trợ lý AI doanh nghiệp cho phép nhân viên tra cứu quy chế nội bộ qua RAG và kích hoạt tự động quy trình làm việc (xin nghỉ phép, gửi mail) bằng hội thoại tự nhiên.'
    },
    technologies: ['Node.js', 'Express', 'Supabase (pgvector)', 'Gemini API', 'n8n', 'Socket.io'],
    features: {
      en: [
        'RAG Pipeline: Gemini Embeddings + Supabase pgvector with anti-hallucination prompts',
        '3-tier Intent Parser fallback: TinyFish AI (4s timeout) → Gemini 2.5 Flash → Keyword Matcher',
        'Workflow Automation: n8n webhook triggers for Google Sheets, Gmail & Google Calendar',
        'Multi-tenant database schema with dynamic organization isolation',
        'Real-time safety moderation via Gemini AI prompt filtering'
      ],
      vi: [
        'Quy trình RAG: Gemini Embeddings + Supabase pgvector kết hợp chống hallucination',
        'Bộ phân tích ý định 3 lớp fallback: TinyFish AI → Gemini 2.5 Flash → Keyword Matching',
        'Tự động hóa workflow: Kết nối n8n webhook cập nhật Google Sheet, Gmail, Calendar',
        'Thiết kế CSDL Multi-tenant hỗ trợ nhiều doanh nghiệp dùng chung hạ tầng',
        'Lọc nội dung vi phạm thời gian thực bằng Gemini AI'
      ]
    },
    metrics: {
      en: [
        '⚡ Fully Functional Production Demo — Built & Deployed in 36 hours',
        '<1.2s average end-to-end intent resolution & document retrieval latency'
      ],
      vi: [
        '⚡ Demo chạy thực tế hoàn chỉnh — Xây dựng và triển khai thành công trong 36 giờ',
        'Thời gian phản hồi RAG và phân tích ý định trung bình < 1.2s'
      ]
    },
    links: {},
    featured: true
  },
  {
    id: 'java-rag',
    title: 'Enterprise Java RAG Chatbot',
    subtitle: 'Academic Courseware Assistant & Fine-Tuning Benchmark',
    type: 'University Capstone Project',
    role: 'Team Lead & Infrastructure Engineer',
    description: {
      en: 'A high-throughput Vietnamese academic RAG chatbot built with Java Spring Boot 3 & LangChain4j. Features side-by-side A/B testing and automated evaluation comparing RAG vs LoRA Fine-Tuning performance.',
      vi: 'Trợ lý AI hỗ trợ sinh viên tra cứu tài liệu môn học viết bằng Java Spring Boot 3 & LangChain4j. Tích hợp hệ thống thử nghiệm A/B đánh giá so sánh hiệu năng giữa RAG và Fine-tuning.'
    },
    technologies: ['Java 17', 'Spring Boot 3.x', 'Python', 'FastAPI', 'LangChain4j', 'Qdrant', 'Supabase', 'React'],
    features: {
      en: [
        'Core Spring Boot Architecture: Standardized ApiResponse, Global Exception Handler, JPA BaseEntity',
        'Qdrant Vector Database integration via LangChain4j with Vietnamese Query Rewriting',
        'Fine-Tuning Bridge: Java-Python WebClient bridge linking Spring Boot to LoRA FastAPI models',
        'Side-by-side Blind A/B Testing suite comparing RAG vs Fine-tuned responses',
        'Automated LLM-as-a-Judge grading pipeline using Gemma model via OpenRouter'
      ],
      vi: [
        'Chuẩn hóa kiến trúc Spring Boot: ApiResponse, Global Exception Handler, BaseEntity JPA',
        'Tích hợp Vector DB Qdrant qua LangChain4j kết hợp Query Rewriting tiếng Việt',
        'Cầu nối Java-Python WebClient kết nối Spring Boot với mô hình LoRA Fine-tuned trên FastAPI',
        'Hệ thống A/B Test ẩn danh so sánh kết quả RAG và Fine-tuning trực tiếp',
        'Đánh giá tự động LLM-as-a-Judge sử dụng Gemma qua OpenRouter'
      ]
    },
    links: {
      docs: './report_tex/SR.md'
    },
    featured: true
  }
];
