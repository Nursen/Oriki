# Oriki - Personalized Praise Poetry Generator

An LLM-powered web application that generates culturally-inspired praise poetry, daily affirmations, and audio recordings based on a personalized values quiz.

## Tech Stack

- **Backend**: FastAPI + LangChain + OpenAI API
- **Frontend**: Static HTML/CSS/JS (GitHub Pages)
- **Deployment**: Render (backend), GitHub Pages (frontend)

## Quick Start

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Add your OPENAI_API_KEY to .env
uvicorn main:app --reload
```

Visit http://localhost:8000/docs to see interactive API documentation.

## API Endpoints

- `GET /health` - Health check
- `GET /api/v1/quiz/questions` - Get quiz configuration
- `POST /api/v1/generate` - Generate poem + affirmations from quiz input

## Cultural Modes

- **Yoruba-inspired** - Oríkì praise poetry aesthetic (with cultural guardrails)
- **Secular** - Psychological, grounded, modern
- **Turkish** - Alkış blessing tradition
- **Biblical** - Scriptural cadence and blessing language

## Project Structure

```
Oriki/
├── backend/
│   ├── agents/      # LangChain agents (theme extractor, poetry, affirmations)
│   ├── api/         # FastAPI routes
│   ├── models/      # Pydantic models
│   └── main.py      # FastAPI app entry point
├── frontend/        # Static HTML/CSS/JS (Sprint 2)
└── tests/           # Test files
```

## Cultural Note

This project is inspired by the Yoruba tradition of Oríkì (praise poetry). We honor this tradition by:
- Using only the aesthetic structure (praise-naming, nature metaphors, rhythm)
- Never fabricating Yoruba names, clan identities, or spiritual references
- Being transparent that generated content is "inspired by" not "authentic"

See `CULTURAL_GUIDELINES.md` for detailed guidance.

## License

MIT
