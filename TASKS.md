# TASKS.md - Oriki Project Sprint Tracker

## Architecture Overview

- **Backend**: FastAPI on Render (free tier)
- **Frontend**: Static HTML/CSS/JS on GitHub Pages
- **LLM/TTS**: OpenAI API
- **Budget**: ~$5/month (~50 generations)

---

## Completed Sprints

### Sprint 1: Backend Foundation (COMPLETE)
- [x] Project setup (folder structure, requirements.txt, config)
- [x] FastAPI skeleton with health check
- [x] Quiz config and Pydantic models
- [x] Theme Extractor agent
- [x] Poetry Composer agent (4 cultural modes)
- [x] Affirmation Generator agent
- [x] API endpoints (POST /generate, GET /quiz/questions, POST /audio)
- [x] Render deployment configuration

### Sprint 2: Frontend + Audio (COMPLETE)
- [x] HTML boilerplate with semantic structure
- [x] CSS design system (warm earth tones)
- [x] Quiz UI with state management
- [x] Results display (poem, affirmations)
- [x] Audio backend (OpenAI TTS)
- [x] Audio frontend (player, download)
- [x] Frontend-backend API integration
- [x] GitHub Pages deployment configuration

### Sprint 3: Polish + Cultural Respect (COMPLETE)
- [x] Cultural disclaimers for all 4 modes (Yoruba consultant approved)
- [x] Error handling with styled messages and retry
- [x] UX polish (transitions, loading messages)
- [x] Mobile responsiveness and accessibility
- [x] Focus/hover states, touch targets

---

## Current Sprint: Sprint 4 - Final Testing & Launch

### 4.1 End-to-End Testing
- [ ] Test all 4 cultural modes (Yoruba, Secular, Turkish, Biblical)
- [ ] Verify audio generation and playback
- [ ] Test error handling (disconnect backend, timeout)
- [ ] Test mobile experience on real device

### 4.2 Production Deployment
- [ ] Deploy backend to Render
- [ ] Update frontend API_BASE_URL to production
- [ ] Deploy frontend to GitHub Pages
- [ ] Verify CORS working in production

### 4.3 Final Checklist
- [ ] All cultural modes generate appropriate poetry
- [ ] Audio works across browsers (Chrome, Safari, Firefox)
- [ ] Mobile responsive and accessible
- [ ] Error states handled gracefully
- [ ] Start Over resets completely

---

## Next Sprint: Sprint 5 - Pronoun Support & Quiz UX

### 5.1 Backend: Pronoun Support
- [ ] Add pronoun question to `quiz_config.py` (options: he/him, she/her, they/them, name only)
- [ ] Add `pronouns` field to `QuizSubmission` model in `quiz.py`
- [ ] Update `poetry_composer.py` prompts to use pronouns in all 4 cultural modes

### 5.2 Frontend: Pronoun Question
- [ ] Add pronoun question to `app.js` quiz questions array
- [ ] Ensure pronoun is included in quiz submission payload

### 5.3 Quiz Flow Improvements
- [ ] Reorder quiz: move cultural mode to position 2 (sets context early)
- [ ] Reframe free-write question: "What words do you need spoken over your life right now?"
- [ ] Update question order in both frontend and backend

### 5.4 Testing
- [ ] Test pronoun integration end-to-end (all pronoun options)
- [ ] Verify poetry uses correct pronouns consistently
- [ ] Test quiz flow feels natural with new order

---

## Future Features (Post-MVP)

### Tier 1: Quick Wins
- [ ] Regenerate variations button
- [ ] Voice selection for TTS
- [ ] Copy poem to clipboard
- [ ] Ceremonial welcome screen with warm framing
- [ ] Micro-introductions before key questions

### Tier 2: Enhanced Experience
- [ ] "Who Sees You?" question (relational/communal)
- [ ] "Legacy" question (aspirational identity)
- [ ] Affirmative micro-responses after certain answers
- [ ] Ambient audio mixing
- [ ] Shareable links
- [ ] Animated visual background

### Tier 3: Growth Features
- [ ] User accounts
- [ ] Mode-specific quiz variations
- [ ] Additional cultural modes
- [ ] Multi-language support
