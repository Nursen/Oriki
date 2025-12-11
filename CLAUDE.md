# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Oriki is an LLM-powered web application that generates personalized praise poetry and daily affirmations. Users complete a values/identity quiz, write a letter to their future self, and receive an Oriki-inspired praise poem, daily affirmations, and an audio recording.

## Tech Stack

- **Frontend**: Static HTML/CSS/JS (hosted on GitHub Pages)
- **Backend**: FastAPI (hosted on Render free tier)
- **LLM/TTS**: OpenAI API (gpt-4o-mini, TTS)
- **Storage**: Session-only (no persistent user data)
- **Budget**: ~$5/month (~50 generations)

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
│   ├── agents/          # LangChain agents (extractor, composer, affirmations, audio)
│   ├── api/             # FastAPI routes
│   ├── models/          # Pydantic models
│   ├── config.py        # Settings (loads .env)
│   └── main.py          # FastAPI app entry point
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── TASKS.md             # Sprint plan and task tracking
├── CULTURAL_GUIDELINES.md
└── CLAUDE.md
```

## Development Commands

```bash
# Start backend (from project root)
cd /path/to/Oriki
python3.11 -m uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000

# Start frontend
cd frontend
python3.11 -m http.server 3000

# Access
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

## Cultural Mode Rules (CRITICAL)

**Yoruba-inspired mode:**
- Use praise of qualities, nature metaphors, rhythm/repetition, honorific tone
- NEVER generate fake Yoruba names, clans, lineages, totems, or ancestry
- NO references to Orisa deities (Sango, Osun, Ogun, etc.)
- NO fabricated Yoruba proverbs
- NO Yoruba diacritical marks (use plain English)
- USE ONLY universal nature metaphors (lion, river, mountain, fire, eagle, sun, tree, wind)

**Other modes:** Turkish blessings (Alkis tradition), Biblical (Psalms/Beatitudes), Secular (positive psychology)

## Content Guidelines

- No pathologizing language or prescriptive spiritual directives
- Grounded affirmations (avoid toxic positivity)
- Display cultural disclaimer for each mode
- Target: all generation < 20 seconds

---

## Sprint Workflow Process

### Agent Roles
1. **@agent-sprint-planner**: Plans sprints, updates TASKS.md
2. **@agent-llm-teaching-coder**: Implements tasks one at a time, commits after each
3. **@agent-yoruba-cultural-consultant**: Reviews anything touching Yoruba culture or Oriki
4. **@agent-git-hygiene-advisor**: Reviews before commits, cleanup between sprints

### Sprint Execution Process

```
1. SPRINT PLANNING
   └─ @agent-sprint-planner creates sprint plan
   └─ Updates TASKS.md with new sprint tasks

2. TASK IMPLEMENTATION (repeat for each task)
   └─ @agent-llm-teaching-coder implements one task
   └─ If task touches Yoruba/cultural content:
      └─ @agent-yoruba-cultural-consultant reviews
   └─ @agent-git-hygiene-advisor reviews changes
   └─ Commit if approved

3. SPRINT CLEANUP (after all tasks complete)
   └─ @agent-git-hygiene-advisor reviews full codebase
   └─ Cleanup/organize if needed
   └─ @agent-llm-teaching-coder refactors if needed
   └─ Final commit

4. NEXT SPRINT
   └─ @agent-sprint-planner plans next sprint
   └─ Repeat process
```

### Commit Guidelines
- Commit after each completed task (not batched)
- Use descriptive commit messages
- Check with @agent-git-hygiene-advisor before committing

### Quick Sprint Iteration
To run multiple iterations with consistent cleanup:
1. Have @agent-llm-teaching-coder implement tasks (committing after each)
2. After sprint complete: @agent-git-hygiene-advisor reviews and cleans up
3. @agent-llm-teaching-coder refactors if needed
4. @agent-sprint-planner plans next sprint

## Current Status
- Sprints 1-4: Complete (MVP working)
- Sprint 5: In progress (Pronoun support + Quiz UX)
- See TASKS.md for detailed task tracking
