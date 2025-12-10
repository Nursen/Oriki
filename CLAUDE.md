# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Oriki is an LLM-powered web application that generates personalized praise poetry and daily affirmations. Users complete a values/identity quiz, write a letter to their future self, and receive an Oriki-inspired praise poem, daily affirmations, and an audio recording.

## Tech Stack

- **Frontend**: Static HTML/CSS/JS (hosted on GitHub Pages)
- **Backend**: FastAPI (hosted on Render free tier)
- **LLM/TTS**: OpenAI API
- **Storage**: Session-only (no persistent user data)

## Architecture

3-agent pipeline + TTS:
1. **Theme Extractor**: Quiz + free-write -> values, emotional tone, metaphors, identity markers
2. **Poetry Composer**: Generates praise poetry per user's cultural mode (Yoruba-inspired, Secular, Turkish, Biblical)
3. **Affirmation Generator**: CBT/positive psychology-grounded affirmations
4. **Audio**: OpenAI TTS (basic, no ambient mixing for MVP)

## Project Structure

```
Oriki/
├── backend/
│   ├── agents/          # LangChain agents (extractor, composer, affirmations)
│   ├── api/             # FastAPI routes
│   ├── models/          # Pydantic models
│   └── main.py          # FastAPI app entry point
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── TASKS.md             # Sprint plan and task tracking
└── CLAUDE.md
```

## Commands

```bash
# Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend (local dev)
cd frontend
python -m http.server 8000
```

## Cultural Mode Rules

**Yoruba-inspired mode:**
- Use praise of qualities, nature metaphors, rhythm/repetition, honorific tone
- NEVER generate fake Yoruba names, clans, lineages, totems, or ancestry

**Other modes:** Turkish blessings, African American spiritual uplift, Sufi poetic, Secular psychological

## Content Guidelines

- No pathologizing language or prescriptive spiritual directives
- Grounded affirmations (avoid toxic positivity)
- Display cultural disclaimer
- Target: all generation < 20 seconds
