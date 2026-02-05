# IsoTest AI - AI Engine

Python-based AI engine using **FastAPI** for intelligent test generation and bug reporting.

## Features

- ?? OpenAPI/Swagger specification parsing
- ?? AI-powered test case generation
- ?? Intelligent bug report generation
- ?? RESTful API interface

## Technology Stack

- Python 3.11+
- FastAPI
- LangChain
- OpenAI GPT

## Setup

```bash
cd ai-engine
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## Environment Variables

Create a `.env` file:
```
OPENAI_API_KEY=your_api_key_here
MODEL_NAME=gpt-4
```

## Run

```bash
uvicorn app.main:app --reload --port 8000
```

API will be available at: `http://localhost:8000`
API Docs: `http://localhost:8000/docs`

## Project Structure

```
ai-engine/
??? app/
?   ??? test_generation/       # Test case generation logic
?   ??? bug_report_generation/ # Bug report generation logic
?   ??? main.py                # FastAPI application
??? requirements.txt           # Python dependencies
```
