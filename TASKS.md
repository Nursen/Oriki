# TASKS.md - Oriki Project Sprint Plan

## Architecture Overview

- **Backend**: FastAPI on Render (free tier)
- **Frontend**: Static HTML/CSS/JS on GitHub Pages
- **LLM/TTS**: OpenAI API
- **Budget**: ~$5/month (~50 generations)

---

## Sprint 1: Backend Foundation + Core Pipeline

### 1.1 Project Setup
- [ ] Initialize Python project with `pyproject.toml` or `requirements.txt`
- [ ] Set up FastAPI skeleton with health check endpoint
- [ ] Configure environment variables (.env) for OpenAI API key
- [ ] Create project folder structure (agents/, api/, models/)

### 1.2 Quiz Design
- [ ] Define quiz questions and options:
  - Q1: Top 3 values (multi-select: integrity, creativity, family, growth, freedom, compassion, achievement, wisdom, connection, courage)
  - Q2: Greatest strength (single: leadership, empathy, resilience, creativity, analytical thinking, communication, patience, adaptability)
  - Q3: Aspirational trait (single: confidence, peace, boldness, wisdom, joy, influence, authenticity, discipline)
  - Q4: Metaphor/archetype (single: the mountain, the river, the flame, the tree, the storm, the sun, the bridge, the garden)
  - Q5: Energy style (single: charismatic, grounded/natural, visionary, healer, warrior, sage)
  - Q6: Life focus (single: career, parenting, love/relationships, health, spirituality, creative expression)
  - Q7: Cultural mode (single: Yoruba-inspired, Secular, Turkish, Biblical)
  - Q8: Free-write letter (textarea, 2000 char max)
- [ ] Create Pydantic models for quiz input validation

### 1.3 Theme Extractor Agent
- [ ] Create Pydantic output model (values, emotional_tone, metaphors, identity_markers, aspirations, fears, key_themes)
- [ ] Write extraction prompt template
- [ ] Implement LangChain agent with structured output
- [ ] Test with sample inputs

### 1.4 Poetry Composer Agent
- [ ] Create Pydantic output model (poem_lines, cultural_mode, style_notes)
- [ ] Write prompt templates for each cultural mode:
  - [ ] Yoruba-inspired (praise of qualities, nature metaphors, rhythm/repetition, honorific tone - NO fake genealogy)
  - [ ] Secular (psychological, grounded, universal)
  - [ ] Turkish (alkış blessings, folkloric metaphors, nazar protection themes)
  - [ ] Biblical (scriptural cadence, blessing language, covenant themes)
- [ ] Implement agent with cultural mode routing
- [ ] Test each cultural mode

### 1.5 Affirmation Generator Agent
- [ ] Create Pydantic output model (affirmations: list of 5-10 strings)
- [ ] Write prompt template (CBT/positive psychology grounded, anchored in user values, avoid toxic positivity)
- [ ] Implement agent with structured output
- [ ] Test output quality

### 1.6 API Endpoints
- [ ] POST `/generate` - accepts quiz data, returns poem + affirmations
- [ ] Add CORS middleware for GitHub Pages frontend
- [ ] Add basic error handling and validation
- [ ] Test full pipeline end-to-end

### 1.7 Deploy Backend
- [ ] Create Render account and new web service
- [ ] Configure environment variables on Render
- [ ] Deploy and test live endpoint

---

## Sprint 2: Frontend + Audio

### 2.1 Frontend Setup
- [ ] Create GitHub Pages repository (or gh-pages branch)
- [ ] Set up basic HTML structure with CSS
- [ ] Design warm, ritual-like aesthetic (earth tones, gold accents, clean typography)

### 2.2 Quiz UI
- [ ] Build multi-step quiz form (one question per screen or scrolling single page)
- [ ] Implement value multi-select (Q1)
- [ ] Implement single-select for Q2-Q7
- [ ] Implement free-write textarea with character counter (Q8)
- [ ] Add form validation
- [ ] Add "Generate" submit button

### 2.3 Results Display
- [ ] Create results page/section layout
- [ ] Display poem with poetic formatting (line breaks, emphasis)
- [ ] Display affirmations as a styled list
- [ ] Add loading state during generation (~10-20 seconds)

### 2.4 Audio Integration (Backend)
- [ ] Add OpenAI TTS endpoint to FastAPI
- [ ] POST `/audio` - accepts text (poem + affirmations), returns audio file
- [ ] Choose voice (alloy, echo, fable, onyx, nova, shimmer)
- [ ] Return audio as base64 or file download

### 2.5 Audio Integration (Frontend)
- [ ] Add audio player to results page
- [ ] Implement play/pause controls
- [ ] Add download button for audio file

### 2.6 Connect Frontend to Backend
- [ ] Wire up quiz submission to `/generate` endpoint
- [ ] Handle loading and error states
- [ ] Wire up audio generation and playback
- [ ] Test full flow

### 2.7 Deploy Frontend
- [ ] Push to GitHub Pages
- [ ] Test live site with production backend
- [ ] Verify CORS and API connectivity

---

## Sprint 3: Polish + Launch

### 3.1 Cultural Respect & Disclaimers
- [ ] Add cultural acknowledgment for Oriki (Yoruba tradition disclaimer)
- [ ] Add brief explanation of each cultural mode on selection
- [ ] Review all generated content for cultural sensitivity

### 3.2 Error Handling & Edge Cases
- [ ] Handle API failures gracefully (user-friendly error messages)
- [ ] Handle empty/invalid quiz responses
- [ ] Add timeout handling for slow generations
- [ ] Test with edge case inputs

### 3.3 UX Polish
- [ ] Add smooth transitions between quiz steps
- [ ] Improve loading state (progress indicator or calming message)
- [ ] Add "Start Over" option from results
- [ ] Mobile responsiveness testing and fixes

### 3.4 Final Styling
- [ ] Typography refinement (meaningful lines emphasized)
- [ ] Color palette finalization (warm neutrals, clay/red earth, gold)
- [ ] Spacing and layout polish
- [ ] Test on multiple browsers

### 3.5 Launch Checklist
- [ ] End-to-end test all cultural modes
- [ ] Verify audio works across browsers
- [ ] Check Render free tier limits and set alerts if needed
- [ ] Final deploy of both frontend and backend
- [ ] Share link!

---

## Future Features (Post-MVP, High Impact)

### Tier 1: Quick Wins
- [ ] **Regenerate variations** - button to get new poem/affirmations with same input
- [ ] **Voice selection** - let users pick TTS voice
- [ ] **Copy to clipboard** - easy sharing of poem text

### Tier 2: Enhanced Experience
- [ ] **Ambient audio mixing** - soft background music/nature sounds under TTS
- [ ] **Animated visual background** - subtle motion during audio playback
- [ ] **Shareable links** - unique URL to share results (requires backend storage)

### Tier 3: Growth Features
- [ ] **User accounts** - save multiple generations, journaling over time
- [ ] **Additional cultural modes** - Sufi, African American spiritual, Hindu, etc.
- [ ] **Multi-language support** - generate in user's native language
- [ ] **Image upload** - mood-based analysis from photo

### Tier 4: Platform Evolution
- [ ] **Mobile app** - native iOS/Android experience
- [ ] **Email delivery** - send daily affirmation reminders
- [ ] **Community gallery** - opt-in sharing of anonymized poems
