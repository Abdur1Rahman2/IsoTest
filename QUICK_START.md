# Quick Reference for Team Members

## ?? First Time Setup (5 Steps)

### 1. Clone Repository
```bash
git clone https://github.com/Abdur1Rahman2/IsoTest.git
cd IsoTest
```

### 2. Start Database (Docker)
```bash
docker run --name isotest-postgres -e POSTGRES_DB=isotestai -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:15-alpine
```

Wait 5 seconds, then:
```bash
docker exec -i isotest-postgres psql -U postgres -d isotestai < database/init.sql
```

### 3. Start Backend
```bash
cd backend/src/IsoTestAI.Api
dotnet run
```
Open: https://localhost:5001/api/health

### 4. Start AI Engine
```bash
cd ai-engine
python -m venv venv
venv\Scripts\activate     # Windows
source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
uvicorn app.main:app --reload
```
Open: http://localhost:8000/docs

### 5. Start Frontend
```bash
cd frontend
npm install
npm run dev
```
Open: http://localhost:3000

---

## ?? Daily Workflow

### Start Your Day
```bash
git pull origin main
docker start isotest-postgres
```

### Work on Feature
```bash
git checkout -b feature/my-feature
# Make changes...
git add .
git commit -m "Add: feature description"
git push origin feature/my-feature
```

### End Your Day
```bash
docker stop isotest-postgres  # Optional
```

---

## ?? Common Issues

### "Database connection failed"
```bash
docker start isotest-postgres
```

### "Port already in use"
```bash
# Kill process on port 5432 (Windows)
netstat -ano | findstr :5432
taskkill /PID <process_id> /F
```

### "Module not found" (Backend)
```bash
cd backend
dotnet clean
dotnet restore
dotnet build
```

### "Module not found" (Python)
```bash
cd ai-engine
venv\Scripts\activate
pip install -r requirements.txt
```

### "Package not found" (Frontend)
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

---

## ?? Get Help

- Read [SETUP.md](SETUP.md) for detailed instructions
- Check [GitHub Issues](https://github.com/Abdur1Rahman2/IsoTest/issues)
- Ask team members in chat

---

## ? Verify Setup

All should return success:
- [ ] https://localhost:5001/api/health ? `{"status":"Healthy"}`
- [ ] http://localhost:8000/health ? `{"status":"healthy"}`
- [ ] http://localhost:3000 ? Dashboard loads
- [ ] `docker ps` ? Shows isotest-postgres running
