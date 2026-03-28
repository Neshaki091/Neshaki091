<h1 align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=28&duration=3000&pause=1000&color=00D9FF&center=true&vCenter=true&width=700&lines=Hi+%F0%9F%91%8B%2C+I'm+Huy%E1%BB%B3nh+C%C3%B4ng+Luy%E1%BB%87n;Backend+%26+AI+Engineer;BaaS+Builder+%7C+RAG+Specialist" alt="Typing SVG" />
</h1>


---

## 🧑‍💻 About Me

Tôi là sinh viên **Đại học Giao thông Vận tải TP.HCM**, đam mê xây dựng hệ thống backend có kiến trúc rõ ràng và tích hợp AI thực tế.

- 🚀 Đang xây dựng **[Waterbase](https://web.waterbase.click)** — BaaS platform tự thiết kế và triển khai
- 🧠 Đã triển khai **RAG AI pipeline** trong môi trường hackathon 36h
- 📐 Quan tâm đến **Clean Architecture**, **SOLID principles**
- 📋 Quản lý dự án với **Jira** & phương pháp Agile
- 📱 Hiểu biết **Flutter** & **mobile-first development**
- 🌱 Đang học sâu hơn về **Prompt Engineering** & **LLM fine-tuning**
- 📫 Liên hệ tôi qua email hoặc GitHub

---

## 🛠️ Tech Stack

### 🔙 Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)

### 🗄️ Database & Infrastructure
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![RabbitMQ](https://img.shields.io/badge/RabbitMQ-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

### 🤖 AI & ML
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)
![LangChain](https://img.shields.io/badge/LangChain-1C3C3C?style=for-the-badge&logo=langchain&logoColor=white)
![pgvector](https://img.shields.io/badge/pgvector-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

### 🌐 Frontend & Mobile
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Flutter](https://img.shields.io/badge/Flutter-02569B?style=for-the-badge&logo=flutter&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML](https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)

### 🔧 Tools & Practices
![Jira](https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=jira&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![n8n](https://img.shields.io/badge/n8n-EA4B71?style=for-the-badge&logo=n8n&logoColor=white)

---

## 🏆 Featured Projects

### 🧠 Internal Assistant — Hackathon 2026 (Team Leader · RAG/AI Backend)

> *Built in 36 hours. Deployed. Working demo.*

**Vai trò:** Team Leader & chịu toàn bộ phần AI Backend — RAG pipeline, intent parsing, workflow automation.

Một nền tảng AI assistant dùng nội bộ doanh nghiệp, giúp nhân viên tra cứu chính sách và thực hiện hành động tự động (xin nghỉ phép, gửi email) chỉ bằng hội thoại tự nhiên.

**Điểm kỹ thuật nổi bật tôi xây dựng:**

| Thành phần | Công nghệ | Mô tả |
|---|---|---|
| **RAG Pipeline** | Gemini Embedding + Supabase pgvector | Chunk tài liệu nội bộ → embed → semantic search → anti-hallucination answer |
| **Intent Parser** | TinyFish AI → Gemini fallback → Keyword | 3-tier fallback system, phân loại intent có cấu trúc JSON |
| **Workflow Engine** | n8n Webhooks | Trigger tự động: Google Sheet, Gmail, Calendar |
| **Multi-tenant** | Supabase + clientId isolation | Hỗ trợ nhiều công ty trên cùng hạ tầng |
| **Content Moderation** | Gemini AI | Detect & lọc nội dung độc hại realtime |

```
RAG Flow: User Query → Gemini Embedding → pgvector Search → Gemini Summarize → Response
Intent Flow: TinyFish AI (4s timeout) → Gemini 2.5 Flash → Keyword fallback
```

**Tech:** `Node.js` · `Express` · `Supabase (pgvector)` · `Gemini API` · `n8n` · `Socket.io`

---

### 💧 Waterbase — Backend as a Service Platform (Dự án cá nhân)

> *Firebase alternative. Self-hosted. Production deployed.*

🌐 **Live:** [web.waterbase.click](https://web.waterbase.click) · API: [api.waterbase.click](https://api.waterbase.click)

Waterbase là dự án cá nhân tôi tự thiết kế kiến trúc và triển khai — một nền tảng BaaS tương tự Firebase, dành cho developer Việt Nam.

**Kiến trúc Microservices:**

```
                    ┌─────────────┐
                    │    Nginx    │  ← API Gateway
                    └──────┬──────┘
           ┌───────────────┼───────────────┐
    ┌──────▼──────┐ ┌─────▼─────┐ ┌──────▼──────┐
    │auth-services│ │app-services│ │waterdb-svc  │
    └─────────────┘ └───────────┘ └─────────────┘
    ┌─────────────┐ ┌─────────────┐ ┌───────────┐
    │storage-svc  │ │rule-services│ │rtwaterdb  │  ← WebSocket
    └─────────────┘ └─────────────┘ └───────────┘
         │               │               │
    ┌────▼───────────────▼───────────────▼────┐
    │     MongoDB + Redis + RabbitMQ          │
    └─────────────────────────────────────────┘
```

| Service | Mô tả |
|---|---|
| `auth-services` | Authentication, JWT, Owner management |
| `app-services` | App registry, API key management |
| `waterdb-services` | Database CRUD với security rules |
| `rtwaterdb-services` | Realtime database qua WebSocket |
| `storage-services` | File storage |
| `rule-services` | Security rules engine |
| `analytics-service` | Usage tracking & quotas |
| `rag-ai-service` | AI assistant tích hợp |

**Điều tôi học được từ dự án này:**
- ✅ Thiết kế **Clean Architecture** thực tế (đã tự phân tích & nhận ra điểm cần cải thiện)
- ✅ Áp dụng **SOLID**: SRP (tách Service/Controller/Repository), DIP (abstraction layer)
- ✅ **Docker Compose** orchestration với 9 services
- ✅ **VPS deployment** với Nginx reverse proxy + SSL
- ✅ **Prompt Engineering** cho RAG AI service (đang tiếp tục cải thiện)

**Tech:** `Node.js` · `MongoDB` · `Redis` · `RabbitMQ` · `Docker` · `Nginx` · `React` · `Socket.io` . `pgvector` . `RAG`

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

## 🎯 Hiện tại đang focus

```
☑  Waterbase v2.0 — Refactor backend theo Repository Pattern + DI
☑  Prompt Engineering — Tinh chỉnh RAG prompt cho tiếng Việt
☐  Flutter mobile SDK cho Waterbase
☐  Nghiên cứu RAG advanced: HyDE, re-ranking, multi-hop reasoning
```

---

## 📫 Liên hệ

<p align="center">
  <a href="https://github.com/neshaki091">
    <img src="https://img.shields.io/badge/GitHub-neshaki091-181717?style=for-the-badge&logo=github" />
  </a>
</p>

---

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=00D9FF&height=80&section=footer" />
</p>

<p align="center">
  <i>"Build to learn. Deploy to prove."</i>
</p>
