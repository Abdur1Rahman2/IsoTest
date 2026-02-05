# IsoTest AI

> ?? AI-driven automated API testing and reporting platform

[![.NET 10](https://img.shields.io/badge/.NET-10-blue)](https://dotnet.microsoft.com/)
[![Python 3.11](https://img.shields.io/badge/Python-3.11-blue)](https://www.python.org/)
[![React 18](https://img.shields.io/badge/React-18-blue)](https://react.dev/)
[![PostgreSQL 15](https://img.shields.io/badge/PostgreSQL-15-blue)](https://www.postgresql.org/)

An AI-driven automated API testing and reporting platform that generates intelligent test cases from OpenAPI/Swagger specifications.

## ?? Quick Start

**New to the project? Start here:** ?? **[SETUP.md](SETUP.md)** ??

```bash
# 1. Clone the repository
git clone https://github.com/Abdur1Rahman2/IsoTest.git
cd IsoTest

# 2. Start PostgreSQL
docker run --name isotest-postgres \
  -e POSTGRES_DB=isotestai \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  -d postgres:15-alpine

# 3. Initialize database
docker exec -i isotest-postgres psql -U postgres -d isotestai < database/init.sql

# 4. Run backend
cd backend/src/IsoTestAI.Api
dotnet run

# 5. Run AI engine
cd ai-engine
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload

# 6. Run frontend
cd frontend
npm install
npm run dev
```

**Full setup instructions:** See [SETUP.md](SETUP.md)

---

## ??? Architecture

- **Backend**: ASP.NET Core (.NET 10) - Clean Architecture
- **AI Engine**: Python (FastAPI + LLMs) - Test generation & bug reporting
- **Frontend**: React.js - Analytics dashboard
- **Database**: PostgreSQL 15
- **Infrastructure**: Docker + GitHub Actions CI/CD

```
???????????????      ????????????????      ???????????????
?   React     ????????  ASP.NET API ???????? PostgreSQL  ?
?  Frontend   ?      ?   (Backend)  ?      ?  Database   ?
???????????????      ????????????????      ???????????????
                             ?
                             ?
                     ?????????????????
                     ?  FastAPI      ?
                     ?  AI Engine    ?
                     ?  (Python)     ?
                     ?????????????????
                             ?
                             ?
                     ?????????????????
                     ?   OpenAI      ?
                     ?   GPT-4       ?
                     ?????????????????
```

---

## ?? Project Structure

```
IsoTest/
??? backend/              # ASP.NET Core API (Clean Architecture)
?   ??? src/
?   ?   ??? IsoTestAI.Api/              # Web API entry point
?   ?   ??? IsoTestAI.Application/      # Business logic & DTOs
?   ?   ??? IsoTestAI.Domain/           # Domain entities & interfaces
?   ?   ??? IsoTestAI.Infrastructure/   # Data access & external services
?   ??? IsoTestAI.sln
?
??? ai-engine/            # Python AI services (FastAPI)
?   ??? app/
?   ?   ??? test_generation/            # Test case generation
?   ?   ??? bug_report_generation/      # Bug report generation
?   ?   ??? main.py
?   ??? requirements.txt
?
??? frontend/             # React.js dashboard
?   ??? src/
?   ??? package.json
?
??? database/             # PostgreSQL initialization scripts
?   ??? init.sql
?
??? docker/               # Docker configuration
?   ??? Dockerfile.backend
?   ??? Dockerfile.ai
?   ??? Dockerfile.frontend
?   ??? docker-compose.yml
?
??? .github/              # CI/CD workflows
?   ??? workflows/
?       ??? ci.yml
?
??? docs/                 # Architecture & documentation
    ??? architecture.md
    ??? api-testing-flow.md
```

---

## ?? Features

- ? OpenAPI/Swagger specification parsing
- ? AI-powered test case generation
- ? Isolated test execution environments
- ? Intelligent bug report generation
- ? Real-time analytics dashboard
- ? Automated CI/CD pipeline

---

## ??? Technology Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Backend API | ASP.NET Core 10 | RESTful API, business logic |
| AI Engine | Python 3.11 + FastAPI | AI test generation |
| Frontend | React 18 + Vite | User interface |
| Database | PostgreSQL 15 | Data persistence |
| LLM | OpenAI GPT-4 | Test & report generation |
| Containerization | Docker | Deployment |
| CI/CD | GitHub Actions | Automation |

---

## ?? Documentation

- ?? [Setup Guide](SETUP.md) - **Start here for installation**
- ?? [Architecture Overview](docs/architecture.md)
- ?? [API Testing Flow](docs/api-testing-flow.md)
- ?? [Backend README](backend/README.md)
- ?? [AI Engine README](ai-engine/README.md)
- ?? [Frontend README](frontend/README.md)

---

## ?? Docker Deployment

Run all services with Docker Compose:

```bash
docker-compose -f docker/docker-compose.yml up --build
```

Services will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5001
- **AI Engine**: http://localhost:8000
- **PostgreSQL**: localhost:5432

---

## ?? Development

### Running Tests

```bash
# Backend
cd backend
dotnet test

# AI Engine
cd ai-engine
pytest

# Frontend
cd frontend
npm test
```

### Code Quality

```bash
# Backend - Format code
dotnet format

# Python - Linting
flake8 ai-engine/app/

# Frontend - Linting
npm run lint
```

---

## ?? Contributing

### Team Workflow

1. **Clone the repository** (first time only)
2. **Create a feature branch**: `git checkout -b feature/your-feature-name`
3. **Make your changes** and commit: `git commit -m "Add feature"`
4. **Push to GitHub**: `git push origin feature/your-feature-name`
5. **Create a Pull Request** for review
6. **Merge after approval**

### Branch Naming Convention

- `feature/` - New features
- `bugfix/` - Bug fixes
- `hotfix/` - Urgent fixes
- `docs/` - Documentation updates

---

## ?? Environment Variables

Create these files (they're in `.gitignore`):

**Backend:** `backend/src/IsoTestAI.Api/appsettings.Development.json`
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=isotestai;Username=postgres;Password=yourpassword"
  }
}
```

**AI Engine:** `ai-engine/.env`
```
OPENAI_API_KEY=your_openai_api_key
MODEL_NAME=gpt-4
```

---

## ?? License

See [LICENSE](LICENSE) file for details.

---

## ?? Team

**Final Year Project - 2025**

- Abdur Rahman - Project Lead
- [Add team members]

---

## ?? Support

- **Issues**: [GitHub Issues](https://github.com/Abdur1Rahman2/IsoTest/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Abdur1Rahman2/IsoTest/discussions)

---

## ?? Project Status

?? **In Development** - Active development for Final Year Project

### Current Sprint
- [x] Project structure setup
- [x] Database schema design
- [x] Backend API scaffolding
- [x] AI Engine setup
- [x] Frontend initialization
- [ ] Domain entities implementation
- [ ] API endpoints (CRUD)
- [ ] AI integration
- [ ] Dashboard UI

---

**Made with ?? for Final Year Project**
