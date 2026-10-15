# Portfolio Website - Kế hoạch chi tiết

## 1. Tổng quan dự án

### Mục tiêu
Xây dựng portfolio website chuyên nghiệp thể hiện:
- Kỹ năng Backend & AI Engineering
- 4 dự án nổi bật (ARQ-RAG, Waterbase, Hackathon, Java RAG)
- Khả năng lãnh đạo và làm việc nhóm
- Chuyên môn về RAG và High-Performance Computing

### Đối tượng người xem
- Nhà tuyển dụng (Backend/AI Engineer positions)
- Giảng viên đánh giá luận văn
- Đồng nghiệp và cộng đồng developer

---

## 2. Cấu trúc Website

```
/
├── Hero Section (Giới thiệu ngắn gọn, ấn tượng)
├── About Section (Thông tin chi tiết, timeline học tập)
├── Skills Section (Tech stack với animation)
├── Projects Section (4 dự án chính)
│   ├── ARQ-RAG (Thesis)
│   ├── Waterbase (BaaS)
│   ├── Hackathon AI Assistant
│   └── Java RAG Chatbot (Team Lead)
├── Research Section (Publications, Thesis abstract)
├── Experience Section (Leadership roles)
├── Contact Section (Form + Social links)
└── Footer
```

---

## 3. Thiết kế UI/UX

### Color Palette
- **Primary**: `#00D9FF` (Cyan - Tech/AI feel)
- **Secondary**: `#0D1117` (Dark background - GitHub style)
- **Accent**: `#58A6FF` (Blue - Links)
- **Text**: `#C9D1D9` (Light gray - Body text)
- **Code**: `#F78166` (Orange - Syntax highlight)

### Typography
- **Heading**: `Inter` or `JetBrains Mono`
- **Body**: `Inter`
- **Code**: `JetBrains Mono` or `Fira Code`

### Animation & Effects
1. **Hero**: Typing effect (giống README), particles background
2. **Scroll**: Fade-in + slide-up khi scroll đến section
3. **Skills**: Progress bar animation, hover glow effect
4. **Projects**: Card flip hoặc zoom on hover, tag cloud animation
5. **Code blocks**: Syntax highlighting với copy button

---

## 4. Content chi tiết từng section

### 4.1 Hero Section
**Tagline**: "Backend & AI Engineer specializing in RAG Systems"
**Sub-text**: "Building high-performance retrieval systems and scalable backend infrastructure"
**CTA Buttons**: 
- "View Projects" → scroll to projects
- "Download CV" → link to PDF
- "Contact Me" → scroll to contact

### 4.2 About Section
**Content**:
- Giới thiệu ngắn về bản thân (2-3 câu)
- Education: Đại học Giao thông Vận tải TP.HCM (2022-2026)
- Timeline:
  - 2023: Bắt đầu học Backend với Node.js
  - 2024: Xây dựng Waterbase, tham gia Hackathon
  - 2025: Trưởng nhóm Java RAG project, bắt đầu thesis ARQ-RAG
  - 2026: Hoàn thành thesis ARQ-RAG

### 4.3 Skills Section
**Categories**:
1. **Languages**: Rust, Java, Node.js, Python, TypeScript
2. **Frameworks**: Spring Boot, Express.js, React, FastAPI
3. **AI/ML**: LangChain, PyTorch, Transformers, Vector DBs
4. **Databases**: MongoDB, PostgreSQL, Redis, Qdrant
5. **DevOps**: Docker, Nginx, CI/CD, Linux
6. **Tools**: Git, Jira, Figma

**Visualization**: 
- Icon grid với hover tooltip
- Progress bars cho proficiency level
- Animated skill tags

### 4.4 Projects Section

#### Project 1: ARQ-RAG (Thesis)
**Type**: Graduate Thesis | **Role**: Researcher & Developer
**Tech**: Rust, SIMD AVX2, Python, Vector Quantization

**Description**: 
ARQ-RAG (Adaptive Retrieval with Quantization for RAG) là hệ thống RAG hiệu năng cao sử dụng thuật toán lượng tử hóa vector TurboQuant để giảm dung lượng bộ nhớ 8-16 lần (Float32 → 2-4bit) trong khi duy trì độ chính xác truy xuất cao.

**Key Features**:
- TurboQuant engine viết bằng Rust với SIMD AVX2 optimization
- ITQ (Iterative Quantization) với Orthogonal Procrustes
- Max-Lloyd quantization với percentile clipping (P01-P99)
- ADC (Asymmetric Distance Computation) qua Lookup Tables
- Cluster-centric scan + SIMD Query Fusion cho throughput cao
- mmap support cho tập dữ liệu lớn hơn RAM vật lý

**Results**:
- Compression ratio: 8x (4-bit) đến 16x (2-bit)
- Recall@K: >95% so với Float32 baseline
- Throughput: Tăng 3-5x nhờ SIMD optimization

**Links**: 
- Demo: *(Coming Soon)*
- GitHub: *(Coming Soon)*
- Thesis PDF: *(Coming Soon)*

---

#### Project 2: Waterbase
**Type**: Personal Project | **Role**: Founder & Full-stack Developer
**Tech**: Node.js, MongoDB, Redis, RabbitMQ, Docker, Nginx, React
**Live**: [tttn-project-waterbase-mini-clone-f.vercel.app](https://tttn-project-waterbase-mini-clone-f.vercel.app/)

**Description**: 
Waterbase là nền tảng BaaS (Backend as a Service) tự host cho developers. Hệ thống bao gồm 7 microservices containerized, hỗ trợ authentication, real-time database, file storage, và declarative rule engine.

**Key Features**:
- Multi-tenant architecture với Database-per-Application isolation
- JWT-based authentication với refresh token rotation
- Real-time database qua WebSocket
- Declarative security rules engine (RBAC)
- Docker Compose orchestration triển khai trên VPS 1GB RAM / 1 vCPU
- Nginx API Gateway với SSL reverse proxy

**Architecture:**
- 7 Microservices: Auth, App, WaterDB, RTWaterDB, Storage, Rule Engine, Analytics
- Caching: Redis cho session và real-time data
- Database: MongoDB với mô hình Database-per-Application

**Links**:
- Live Demo: [tttn-project-waterbase-mini-clone-f.vercel.app](https://tttn-project-waterbase-mini-clone-f.vercel.app/)
- GitHub: *(Coming Soon)*

---

#### Project 3: Internal AI Assistant — Hackathon 2026
**Type**: Hackathon Project | **Role**: Team Leader & AI Backend Developer
**Tech**: Node.js, Express, Supabase (pgvector), Gemini API, n8n, Socket.io
**Result**: ⚡ Deployed fully working demo in 36 hours

**Description**: 
Xây dựng hệ thống AI assistant nội bộ cho doanh nghiệp trong 36 giờ, hỗ trợ nhân viên tra cứu chính sách và thực hiện hành động tự động (xin nghỉ phép, gửi email) chỉ bằng hội thoại tự nhiên.

**Key Features:**
- **RAG Pipeline**: Sử dụng Gemini Embedding + Supabase pgvector cho semantic search trên tài liệu nội bộ, kết hợp anti-hallucination prompting
- **Intent Parser**: 3-tier fallback system — TinyFish AI (primary, 4s timeout) → Gemini 2.5 Flash (secondary) → Keyword matching (tertiary)
- **Workflow Automation**: Tích hợp n8n webhooks để trigger tự động: tạo Google Sheet, gửi Gmail, thêm Calendar event
- **Multi-tenant**: Supabase với clientId isolation cho phép nhiều công ty sử dụng chung infrastructure
- **Content Moderation**: Gemini AI real-time detection để lọc nội dung độc hại

**My Contributions:**
- Thiết kế kiến trúc hệ thống và phân chia công việc cho 5 thành viên
- Xây dựng toàn bộ RAG pipeline và intent parsing system
- Tích hợp n8n workflow automation
- Deploy hệ thống lên cloud trong 36 giờ

**Links:**
- Demo Video: *(Coming Soon)*
- GitHub: *(Private - available upon request)*

---

#### Project 4: Enterprise Java RAG Chatbot (Team Leader)
**Type**: University Course Project | **Role**: Team Leader & Core Infrastructure Developer
**Tech**: Java 17, Spring Boot 3.x, Python, FastAPI, Supabase, Qdrant, LangChain4j, React
**Team**: 6 members | **Duration**: 5 weeks

**Description**: 
Hệ thống chatbot RAG (Retrieval-Augmented Generation) hỗ trợ sinh viên tra cứu tài liệu môn học bằng tiếng Việt. Đồng thời là công trình thực nghiệm để đối chứng, đánh giá và so sánh hiệu năng toàn diện giữa hai phương pháp: RAG và Fine-tuning.

**My Contributions as Team Leader (TV1):**
- **System Design**: Thiết kế kiến trúc tổng thể, viết tài liệu SRS đầy đủ
- **Core Infrastructure**: Xây dựng các lớp nền tảng dùng chung:
  - `ApiResponse`: Chuẩn hóa JSON response
  - `GlobalExceptionHandler`: Bắt exception tập trung
  - `BaseEntity`: JPA entity base với auto timestamps
  - `QdrantPayloadDTO`: Contract giữa các modules
- **DevOps**: Setup Docker Compose, CI/CD pipeline, Git workflow
- **Code Review**: Review và refactor code của các thành viên trước khi deploy Production
- **Benchmark Dataset**: Chuẩn bị bộ dữ liệu đánh giá cho so sánh RAG vs Fine-tuning

**System Features:**

| Feature | Description | Tech |
|---------|-------------|------|
| **RAG Pipeline** | Query rewriting + Qdrant ANN search + Context generation | LangChain4j, Groq API |
| **Fine-tuning Bridge** | Java-Python microservice cho LoRA fine-tuned models | WebClient, FastAPI |
| **A/B Testing** | Blind test: RAG vs Fine-tuning side-by-side | Custom implementation |
| **Auto Evaluation** | LLM-as-a-Judge với OpenRouter (Gemma) | Automated metrics |
| **Multi-subject** | Quản lý môn học, phân loại tài liệu | JPA, PostgreSQL |
| **Code-Aware Chat** | Nhận diện và xử lý code snippets trong chat | Regex, Syntax highlighting |

**Links:**
- SRS Document: [SR.md](./report_tex/SR.md)
- Demo: *(Coming Soon)*
- GitHub: *(Private - available upon request)*

---

## 📊 GitHub Stats

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=neshaki091&show_icons=true&theme=tokyonight&hide_border=true&bg_color=0D1117&title_color=00D9FF&icon_color=00D9FF" height="165" />
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=neshaki091&layout=compact&theme=tokyonight&hide_border=true&bg_color=0D1117&title_color=00D9FF" height="165" />
</p>

<p align="center">
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=neshaki091&theme=tokyonight&hide_border=true&background=0D1117&ring=00D9FF&fire=00D9FF&currStreakLabel=00D9FF" />
</p>

---

## 🎯 Current Focus

```
☑  ARQ-RAG Thesis — Rust core with SIMD AVX2 optimization
☑  TurboQuant Engine — 4-bit vector quantization with mmap
☑  Waterbase v2.0 — Refactoring to Repository Pattern + DI
☐  Nghiên cứu RAG advanced: HyDE, re-ranking, multi-hop reasoning
☐  Explore GPU-accelerated vector search
```

---

## 📫 Contact

<p align="center">
  <a href="https://github.com/neshaki091">
    <img src="https://img.shields.io/badge/GitHub-neshaki091-181717?style=for-the-badge&logo=github" />
  </a>
  <a href="https://tttn-project-waterbase-mini-clone-f.vercel.app/">
    <img src="https://img.shields.io/badge/Waterbase-Live_Demo-00D9FF?style=for-the-badge&logo=rocket" />
  </a>
</p>

---

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=00D9FF&height=80&section=footer" />
</p>

<p align="center">
  <i>"Build to learn. Deploy to prove. Optimize to scale."</i>
</p>
