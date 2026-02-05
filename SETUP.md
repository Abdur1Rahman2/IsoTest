# IsoTest AI - Development Setup Guide

> ?? **Follow this guide to set up the IsoTest AI project on your local machine**

## Prerequisites

Before you begin, ensure you have the following installed:

- ? **Git** - [Download](https://git-scm.com/downloads)
- ? **.NET 10 SDK** - [Download](https://dotnet.microsoft.com/download/dotnet/10.0)
- ? **Node.js 18+** - [Download](https://nodejs.org/)
- ? **Python 3.11+** - [Download](https://www.python.org/downloads/)
- ? **Docker Desktop** - [Download](https://www.docker.com/products/docker-desktop/) (Recommended)
- ? **Visual Studio 2022** or **VS Code** - [VS](https://visualstudio.microsoft.com/) | [VS Code](https://code.visualstudio.com/)

---

## ?? Quick Start (5 Minutes)

### 1?? Clone the Repository

```bash
git clone https://github.com/Abdur1Rahman2/IsoTest.git
cd IsoTest
```

### 2?? Set Up PostgreSQL Database (Docker - Easiest)

**Option A: Using Docker (Recommended)**

```bash
# Start PostgreSQL container
docker run --name isotest-postgres \
  -e POSTGRES_DB=isotestai \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  -d postgres:15-alpine

# Wait 5 seconds for container to start
# Then run the initialization script
docker exec -i isotest-postgres psql -U postgres -d isotestai < database/init.sql
```

**PowerShell (Windows):**
```powershell
docker run --name isotest-postgres `
  -e POSTGRES_DB=isotestai `
  -e POSTGRES_USER=postgres `
  -e POSTGRES_PASSWORD=postgres `
  -p 5432:5432 `
  -d postgres:15-alpine

# Wait 5 seconds, then:
Get-Content database\init.sql | docker exec -i isotest-postgres psql -U postgres -d isotestai
```

**Option B: Local PostgreSQL Installation**

If you prefer to install PostgreSQL locally:

1. Download and install [PostgreSQL 15+](https://www.postgresql.org/download/)
2. During installation, set password to `postgres` (or update `appsettings.json`)
3. Create database:
```bash
createdb -U postgres isotestai
psql -U postgres -d isotestai -f database/init.sql
```

### 3?? Verify Database Setup

```bash
# Connect to database
docker exec -it isotest-postgres psql -U postgres -d isotestai

# List tables (you should see 5 tables)
\dt

# Check sample data
SELECT * FROM users;

# Exit
\q
```

Expected output: You should see these tables:
- `users`
- `api_projects`
- `test_cases`
- `test_executions`
- `bug_reports`

### 4?? Start Backend API

```bash
cd backend
dotnet restore
dotnet build
cd src/IsoTestAI.Api
dotnet run
```

**Verify Backend:**
- API: https://localhost:5001
- Health Check: https://localhost:5001/api/health
- OpenAPI Spec: https://localhost:5001/openapi/v1.json

### 5?? Start AI Engine

```bash
cd ai-engine

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn app.main:app --reload
```

**Verify AI Engine:**
- API: http://localhost:8000
- Interactive Docs: http://localhost:8000/docs
- Health Check: http://localhost:8000/health

### 6?? Start Frontend

```bash
cd frontend
npm install
npm run dev
```

**Verify Frontend:**
- App: http://localhost:3000

---

## ?? Configuration

### Environment Variables

**Backend:** Create `backend/src/IsoTestAI.Api/appsettings.Development.json` (optional):
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=isotestai;Username=postgres;Password=postgres"
  }
}
```

**AI Engine:** Create `ai-engine/.env`:
```
OPENAI_API_KEY=your_openai_api_key_here
MODEL_NAME=gpt-4
```

> ?? **Note:** Never commit `.env` files! They're already in `.gitignore`

---

## ?? Docker Compose (All Services)

Run all services with one command:

```bash
docker-compose -f docker/docker-compose.yml up --build
```

This will start:
- PostgreSQL (port 5432)
- Backend API (port 5001)
- AI Engine (port 8000)
- Frontend (port 3000)

**Stop all services:**
```bash
docker-compose -f docker/docker-compose.yml down
```

---

## ?? Project Structure

```
IsoTest/
??? backend/              # .NET 10 Backend API
?   ??? src/
?   ?   ??? IsoTestAI.Api/           # Web API (Controllers, Middleware)
?   ?   ??? IsoTestAI.Application/   # Business Logic, DTOs
?   ?   ??? IsoTestAI.Domain/        # Entities, Interfaces
?   ?   ??? IsoTestAI.Infrastructure/# Data Access, External Services
?   ??? IsoTestAI.sln
?
??? ai-engine/            # Python FastAPI AI Service
?   ??? app/
?   ?   ??? test_generation/         # Test case generation
?   ?   ??? bug_report_generation/   # Bug report generation
?   ?   ??? main.py
?   ??? requirements.txt
?
??? frontend/             # React + Vite Dashboard
?   ??? src/
?   ??? package.json
?
??? database/             # PostgreSQL Scripts
?   ??? init.sql
?
??? docker/               # Docker Configuration
    ??? Dockerfile.backend
    ??? Dockerfile.ai
    ??? Dockerfile.frontend
    ??? docker-compose.yml
```

---

## ??? Common Tasks

### Database Management

**View PostgreSQL logs:**
```bash
docker logs isotest-postgres
```

**Restart database:**
```bash
docker restart isotest-postgres
```

**Reset database (clean start):**
```bash
docker rm -f isotest-postgres
# Then run the setup command again
```

**Connect to database:**
```bash
docker exec -it isotest-postgres psql -U postgres -d isotestai
```

**Backup database:**
```bash
docker exec isotest-postgres pg_dump -U postgres isotestai > backup.sql
```

**Restore database:**
```bash
docker exec -i isotest-postgres psql -U postgres -d isotestai < backup.sql
```

### Backend Development

**Run tests:**
```bash
cd backend
dotnet test
```

**Add NuGet package:**
```bash
dotnet add package PackageName
```

**Entity Framework migrations (when ready):**
```bash
cd backend/src/IsoTestAI.Api
dotnet ef migrations add InitialCreate --project ../IsoTestAI.Infrastructure
dotnet ef database update
```

### Frontend Development

**Install new package:**
```bash
cd frontend
npm install package-name
```

**Build for production:**
```bash
npm run build
```

### AI Engine Development

**Activate virtual environment:**
```bash
# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

**Install new package:**
```bash
pip install package-name
pip freeze > requirements.txt
```

**Run tests:**
```bash
pytest
```

---

## ?? Troubleshooting

### Database Connection Issues

**Problem:** "Connection refused" or "Could not connect to database"

**Solutions:**
1. Check if PostgreSQL is running:
   ```bash
   docker ps
   ```
2. Verify port 5432 is not in use:
   ```bash
   netstat -an | findstr 5432
   ```
3. Check connection string in `appsettings.json`

### Backend Build Errors

**Problem:** "Package not found" or "Framework not found"

**Solutions:**
1. Clean and restore:
   ```bash
   dotnet clean
   dotnet restore
   ```
2. Verify .NET 10 SDK is installed:
   ```bash
   dotnet --version
   ```

### AI Engine Import Errors

**Problem:** "ModuleNotFoundError"

**Solutions:**
1. Ensure virtual environment is activated
2. Reinstall dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Frontend NPM Errors

**Problem:** "Module not found" or version conflicts

**Solutions:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Docker Issues

**Problem:** "Port already in use"

**Solutions:**
```bash
# Find what's using the port
netstat -ano | findstr :5432

# Kill the process (replace PID)
taskkill /PID <process_id> /F

# Or use different port in docker command
docker run -p 5433:5432 ...
```

---

## ?? Security Notes

- ?? Default passwords are for **development only**
- ?? Change `postgres` password in production
- ?? Never commit `.env` files or API keys
- ?? Use environment variables for sensitive data

---

## ?? Additional Resources

- [Backend API Documentation](backend/README.md)
- [AI Engine Documentation](ai-engine/README.md)
- [Frontend Documentation](frontend/README.md)
- [Architecture Overview](docs/architecture.md)
- [API Testing Flow](docs/api-testing-flow.md)

---

## ?? Team Workflow

### Before Starting Work
```bash
git pull origin main
docker start isotest-postgres  # If using Docker
```

### After Making Changes
```bash
git add .
git commit -m "Descriptive message"
git push origin your-branch-name
```

### Creating a Pull Request
1. Push your branch to GitHub
2. Create Pull Request on GitHub
3. Request review from team members
4. Merge after approval

---

## ?? Getting Help

- **Issues:** Check existing issues on [GitHub Issues](https://github.com/Abdur1Rahman2/IsoTest/issues)
- **Questions:** Ask in team chat or create a discussion
- **Documentation:** Check the `docs/` folder

---

## ? Setup Checklist

After setup, verify everything works:

- [ ] Database running (Docker or local)
- [ ] Can see 5 tables in database
- [ ] Backend API responds at https://localhost:5001/api/health
- [ ] AI Engine responds at http://localhost:8000/health
- [ ] Frontend loads at http://localhost:3000
- [ ] All dependencies installed
- [ ] Environment variables configured

---

## ?? Team Members

Add team member names and roles here:
- **Your Name** - Team Lead / Backend
- **Member 2** - Frontend Developer
- **Member 3** - AI/ML Engineer

---

**Last Updated:** 2025-01-17

**Project:** IsoTest AI - Final Year Project

**University:** [Your University Name]
