import { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'arq-rag',
    title: 'ARQ-RAG',
    subtitle: 'Adaptive Retrieval with Quantization for RAG (Thesis)',
    type: 'Graduate Thesis (Grade: 9.0/10)',
    role: 'Lead Researcher & Core Systems Developer',
    description: {
      en: 'High-performance RAG vector retrieval engine built in Rust with SIMD AVX2 acceleration and TurboQuant vector quantization, breaking the dense vector memory wall with mmap and IVF indexing.',
      vi: 'Hệ thống truy xuất vector RAG hiệu năng cao xây dựng bằng Rust tối ưu SIMD AVX2 và lượng tử hóa TurboQuant, giải quyết nút thắt bộ nhớ vector bằng mmap và chỉ mục IVF.'
    },
    technologies: ['Rust', 'SIMD (AVX2)', 'Vector Quantization', 'IVF', 'mmap', 'Python', 'RAG'],
    features: {
      en: [
        'Custom Rust-based vector quantization & retrieval core optimized with 256-bit SIMD AVX2 intrinsics',
        'Novel integration of TurboQuant with Inverted File Index (IVF) for coarse-to-fine search space pruning',
        'Memory-mapped file (mmap) support to query large quantized indices directly from disk without RAM bloat',
        'Cluster-centric scan & query batching to maximize CPU L1/L2/L3 cache locality during multi-query retrieval',
        'ITQ (Iterative Quantization) with orthogonal rotation and Max-Lloyd quantization with P01-P99 outlier clipping',
        'Asymmetric Distance Computation (ADC) accelerated via precomputed Lookup Tables (LUT)'
      ],
      vi: [
        'Engine lượng tử hóa & truy xuất vector viết bằng Rust với tối ưu hóa thanh ghi 256-bit SIMD AVX2',
        'Tích hợp thuật toán TurboQuant với chỉ mục IVF (Inverted File Index) giúp phân vùng và tỉa không gian tìm kiếm',
        'Truy xuất file qua mmap cho phép đọc chỉ mục lượng tử hóa trực tiếp từ bộ nhớ đệm đĩa mà không tốn RAM',
        'Quét theo cụm (Cluster-centric scan) và gom nhóm truy vấn (Query batching) tối ưu hóa CPU cache locality',
        'Thuật toán ITQ (Iterative Quantization) với phép xoay trực giao & lượng tử hóa Max-Lloyd kết hợp lọc nhiễu P01-P99',
        'Tính toán khoảng cách bất đối xứng ADC thông qua bảng tra Lookup Tables (LUT) bỏ qua giải nén Float32'
      ]
    },
    metrics: {
      en: [
        'Evaluation Baseline: Uncompressed Float32 dense vectors',
        'Recall Formula: Recall@K = |TopK_compressed ∩ TopK_Float32| / K',
        'Tested Datasets: Meta Wikipedia 5M vector dataset, HotpotQA, Qasper, Vietnamese Transport Law',
        'Research paper submitted to AMI2026'
      ],
      vi: [
        'Chuẩn đối sánh (Baseline): Vector dense Float32 không nén',
        'Công thức đo độ chính xác: Recall@K = |TopK_compressed ∩ TopK_Float32| / K',
        'Tập dữ liệu thử nghiệm: Meta Wikipedia 5M vectors, HotpotQA, Qasper, Luật Giao thông Việt Nam',
        'Bài báo nghiên cứu đã submit tới hội nghị AMI2026'
      ]
    },
    links: {
      docs: 'https://drive.google.com/file/d/1CuYJQvmqH9g4N3WjXOtkQw9x_mnb0VC5/view?usp=drive_link',
      demo: 'https://arq-rag-frontend.vercel.app/'
    },
    featured: true
  },
  {
    id: 'waterbase',
    title: 'Waterbase',
    subtitle: {
      en: 'Self-Hosted Multi-Tenant BaaS Platform',
      vi: 'Hệ thống Backend-as-a-Service (BaaS) Đa người dùng Tự host'
    },
    type: {
      en: 'Graduation Internship Project',
      vi: 'Đồ án Thực tập Tốt nghiệp'
    },
    role: {
      en: 'Sole Developer (Architecture • Code • Deployment)',
      vi: 'Lập trình viên duy nhất (Thiết kế kiến trúc • Code • Triển khai)'
    },
    description: {
      en: 'A lightweight, self-hosted multi-tenant Backend-as-a-Service (BaaS) platform researched, architected, and built end-to-end with 7 modular microservices, currently running live in production on a minimal 1GB RAM / 1 vCPU VPS.',
      vi: 'Hệ thống Backend-as-a-Service (BaaS) đa người dùng tự host được nghiên cứu, thiết kế kiến trúc và phát triển toàn diện; hiện đang triển khai thực tế toàn bộ 7 services ổn định trên VPS chỉ 1GB RAM, 1 vCPU.'
    },
    technologies: ['Node.js', 'Express', 'MongoDB', 'Redis', 'Docker Compose', 'Nginx (API Gateway)', 'WebSocket (Realtime)', 'JWT'],
    features: {
      en: [
        '7-service decoupled microservices architecture (Auth, App, WaterDB, RTWaterDB, Storage, Rule Engine, Analytics) orchestrated via Nginx API Gateway for high modularity',
        'Database-per-Application multi-tenancy model: provisions dedicated MongoDB databases per tenant application, guaranteeing physical data segregation and privacy',
        'Declarative Rule Engine & RBAC: evaluates scoped JWT credentials and compiles dynamic expression-based rules for granular collection-level read/write permission control',
        'Bi-directional realtime data synchronization via WebSocket (RTWaterDB) and turn-key Docker Compose deployment, currently deploying all 7 services in production on a minimal 1GB RAM / 1 vCPU VPS'
      ],
      vi: [
        'Kiến trúc Microservices gồm 7 services độc lập (Auth, App, WaterDB, RTWaterDB, Storage, Rule Engine, Analytics) điều phối qua Nginx API Gateway, đảm bảo tính phân tách module',
        'Mô hình Multi-tenancy Database-per-Application: tự động cấp phát và cô lập hoàn toàn database MongoDB riêng biệt theo từng ứng dụng tenant, triệt tiêu rủi ro rò rỉ dữ liệu chéo',
        'Bảo mật phân quyền khai báo (Rule Engine & RBAC): thẩm định JWT kết hợp biên dịch dynamic security rules dạng biểu thức để kiểm soát quyền đọc/ghi chi tiết tới từng collection',
        'Đồng bộ dữ liệu thời gian thực hai chiều qua WebSocket (RTWaterDB) và đóng gói trọn gói bằng Docker Compose, hiện đang triển khai thực tế toàn bộ 7 services chạy mượt mà trên VPS chỉ 1GB RAM, 1 vCPU'
      ]
    },
    metrics: {
      en: [
        'Graduation Internship Project: 100% solo architected, developed, and deployed end-to-end',
        'Ultra resource-efficient: currently hosting all 7 services live on a minimal 1GB RAM / 1 vCPU VPS',
        'Guaranteed cross-tenant data isolation via Database-per-App separation and declarative Rule Engine'
      ],
      vi: [
        'Đồ án Thực tập Tốt nghiệp: Tự chủ 100% từ thiết kế kiến trúc hệ thống, lập trình backend đến đóng gói triển khai',
        'Tối ưu tài nguyên vượt trội: Vận hành ổn định toàn bộ 7 services trên VPS cấu hình tối thiểu (1GB RAM, 1 vCPU)',
        'Bảo mật và cô lập tenant tuyệt đối nhờ mô hình Database-per-App và Rule Engine thẩm định quyền khai báo'
      ]
    },
    links: {
      github: 'https://github.com/Neshaki091/Waterbase_BaaS',
      docs: 'https://drive.google.com/file/d/1DUNpvCczlFXdZzgPnyBH9FlTcZrbis9I/view?usp=drive_link',
      demo: 'https://tttn-project-waterbase-mini-clone-f.vercel.app/'
    },
    featured: true
  },
  {
    id: 'java-rag',
    title: 'EduChatbot',
    subtitle: {
      en: 'Vietnamese RAG Courseware Assistant & Fine-Tuning Benchmark',
      vi: 'Trợ lý Hỏi đáp Tài liệu Môn học RAG & Phân tích Thực nghiệm Fine-tuning'
    },
    type: {
      en: 'Java Course Project (Team of 6)',
      vi: 'Đồ án Môn học Lập trình Java (Nhóm 6 người)'
    },
    role: {
      en: 'Team Leader & Backend Architect',
      vi: 'Trưởng nhóm (6 thành viên) & Thiết kế Kiến trúc Backend'
    },
    description: {
      en: 'A Vietnamese academic courseware assistant developed as a Java Course Project. Built with Java 17, Spring Boot 3, and LangChain4j, featuring an async bridge to a Python FastAPI LoRA service and automated LLM-as-a-Judge evaluation comparing RAG vs Fine-Tuning.',
      vi: 'Hệ thống trợ lý ảo hỏi đáp tài liệu môn học tiếng Việt phát triển trong khuôn khổ Đồ án Môn học Lập trình Java. Xây dựng trên Java 17, Spring Boot 3 và LangChain4j, tích hợp cầu nối bất đồng bộ tới mô hình LoRA (Python FastAPI) và đánh giá thực nghiệm RAG vs Fine-tuning.'
    },
    technologies: ['Java 17', 'Spring Boot 3.x', 'Spring Security', 'LangChain4j', 'Python', 'FastAPI', 'Qdrant', 'Supabase', 'React'],
    features: {
      en: [
        'Team Leadership (6 Members): Authored System Requirements Specification (SRS), Database Owner Matrix, and conducted cross-module code reviews',
        'Spring Boot 3 Backend Architecture: Spring Security with JWT & refresh token rotation, Student/Teacher/Admin RBAC, and centralized exception handling',
        'Document Ingestion Pipeline: Apache Tika multi-format parsing (PDF, DOCX) with custom Vietnamese semantic text splitter',
        'Vector Retrieval: LangChain4j with LLM query rewriting (Llama 3.1) and subject-scoped vector search on Qdrant',
        'Java-Python Microservice Bridge: Spring WebClient asynchronous bridge connecting Spring Boot to a Python FastAPI LoRA model service',
        'Empirical Benchmark: Blind A/B comparison system and automated LLM-as-a-Judge evaluation for answer faithfulness and latency'
      ],
      vi: [
        'Vai trò Trưởng nhóm (6 thành viên): Thiết kế tài liệu đặc tả SRS, ma trận phân quyền CSDL Database Owner Matrix và review/tái cấu trúc code toàn nhóm',
        'Kiến trúc Backend Spring Boot 3: Spring Security JWT kèm refresh token, phân quyền Student/Teacher/Admin RBAC và xử lý lỗi tập trung',
        'Pipeline xử lý tài liệu: Tích hợp Apache Tika đọc đa định dạng (PDF, DOCX) kết hợp bộ tách câu ngữ nghĩa tiếng Việt',
        'Truy xuất Vector: LangChain4j kết hợp Query Rewriting bằng LLM (Llama 3.1) và lọc vector theo môn học trên Qdrant',
        'Cầu nối Java-Python: Spring WebClient bất đồng bộ kết nối Spring Boot với FastAPI phục vụ mô hình LoRA Fine-tuned',
        'Đánh giá & Benchmark: Hệ thống A/B test ẩn danh và quy trình chấm điểm tự động LLM-as-a-Judge đo độ trung thực (faithfulness) và độ trễ'
      ]
    },
    metrics: {
      en: [
        'Team of 6 engineers — Led system design, database schemas, and codebase coordination across 4 functional modules',
        'Empirical evaluation: conducted automated faithfulness, hallucination, and latency benchmarks (RAG vs LoRA Fine-Tuning)'
      ],
      vi: [
        'Nhóm 6 thành viên — Trưởng nhóm chủ trì thiết kế kiến trúc, ma trận CSDL và điều phối tích hợp 4 module chức năng',
        'Đánh giá thực nghiệm: hoàn thành quy trình benchmark đối kháng tự động đo độ trung thực, tỷ lệ hallucination và độ trễ (RAG vs LoRA)'
      ]
    },
    links: {
      github: 'https://github.com/Neshaki091/Educhatbot',
      docs: 'https://drive.google.com/file/d/14acLZAxLF20wkeRooSVNerm5vjZHqNKr/view?usp=drive_link'
    },
    featured: true
  },
  {
    id: 'hackathon-ai',
    title: 'Internal AI Assistant',
    subtitle: 'Lotus Hackathon VNG 2026 — 36-Hour Working Prototype',
    type: 'Hackathon Project (Prototype)',
    role: 'Team Leader & Full AI Backend (Team of 2)',
    description: {
      en: 'A 36-hour working prototype developed for Lotus Hackathon VNG 2026 (~800 participants / ~300 teams). Enables employees to query internal policies via RAG and trigger automated business workflows (leave requests, emails, calendar events) via natural language.',
      vi: 'Bản prototype hoàn chỉnh xây dựng trong 36 giờ tại Lotus Hackathon VNG 2026 (~800 người / ~300 đội). Hỗ trợ nhân viên tra cứu chính sách nội bộ qua RAG và kích hoạt tự động quy trình làm việc (xin nghỉ phép, gửi mail, lịch họp) bằng hội thoại.'
    },
    technologies: ['Node.js', 'Express.js', 'Supabase (pgvector)', 'Gemini API', 'n8n', 'Socket.io'],
    features: {
      en: [
        '3-Tier Resilient Intent Classifier: TinyFish AI (4s timeout fallback) → Gemini API → Keyword classification fallback',
        'RAG Knowledge Base: Document chunking, Gemini Embeddings, and Supabase pgvector semantic search with anti-hallucination prompting',
        'Workflow Automation: Integrated n8n webhooks to automate actions across Google Sheets, Gmail, and Google Calendar',
        'Multi-Tenant Schema: Isolated company organizational data via dynamic clientId tenancy checks',
        'Real-time Content Moderation: Implemented input/output safety checks using Gemini Safety filters'
      ],
      vi: [
        'Bộ phân loại ý định 3 lớp chịu lỗi: TinyFish AI (timeout 4s fallback) → Gemini API → Bộ khớp từ khóa fallback',
        'Hệ thống RAG: Chunking tài liệu, Gemini Embeddings và tìm kiếm ngữ nghĩa qua Supabase pgvector chống hallucination',
        'Tự động hóa workflow: Kết nối n8n webhooks tự động cập nhật Google Sheets, gửi Gmail và tạo lịch Google Calendar',
        'Thiết kế CSDL Multi-Tenant: Phân tách không gian dữ liệu công ty an toàn thông qua kiểm tra clientId',
        'Kiểm duyệt nội dung thời gian thực: Tích hợp bộ lọc an toàn Gemini Safety filters'
      ]
    },
    metrics: {
      en: [
        'Delivered complete end-to-end working prototype in a high-intensity 36-hour hackathon sprint',
        'Team of 2 competing among ~300 teams (~800 participants)'
      ],
      vi: [
        'Hoàn thiện bản demo working prototype đầy đủ chức năng trong 36 giờ thi đấu liên tục',
        'Đội 2 thành viên thi đấu giữa khoảng 300 đội (~800 thí sinh tham gia)'
      ]
    },
    links: {
      github: 'https://github.com/Neshaki091/InternalAssistant',
      video: 'https://devpost.com/software/internal-ai-assistant'
    },
    featured: true
  }
];

