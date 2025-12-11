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

### Sprint 4: Final Testing & Launch (COMPLETE)
- [x] Test all 4 cultural modes (Yoruba, Secular, Turkish, Biblical)
- [x] Fixed LangChain import issues (PydanticOutputParser)
- [x] Fixed CORS configuration with explicit origins
- [x] Fixed frontend/backend quiz option mismatches
- [x] End-to-end generation working locally

### Sprint 5: Pronoun Support & Quiz UX (COMPLETE)
- [x] Add pronoun question to `quiz_config.py` (he/him, she/her, they/them, name only)
- [x] Add `pronouns` field to `QuizSubmission` model in `quiz.py`
- [x] Update `poetry_composer.py` prompts to use pronouns in all 4 cultural modes
- [x] Add pronoun question to `app.js` quiz questions array
- [x] Ensure pronoun is included in quiz submission payload
- [x] Reorder quiz: cultural mode to position 2, pronouns to position 3
- [x] Reframe free-write question: "What words do you need spoken over your life right now?"
- [x] Center quiz on screen (CSS fix)
- [x] Cultural consultant approved pronoun implementation

### Sprint 7: Name Input for Name Only (COMPLETE)
- [x] Add `display_name` field to backend quiz model
- [x] Update poetry composer to use display name in prompts
- [x] Add conditional name input field in frontend when "name_only" selected
- [x] Validation requires name when name_only is chosen

### Sprint 8: Copy & Regenerate (COMPLETE)
- [x] Add "Copy Poem" button with clipboard API and fallback
- [x] Add "Generate New Variation" button to regenerate with same inputs
- [x] Store last submission in state for regeneration
- [x] Visual feedback for copy success

### Sprint 9: Keyboard Navigation (COMPLETE)
- [x] Number keys (1-9) select quiz options
- [x] Enter advances to next question / submits
- [x] Backspace goes back to previous question
- [x] Visual focus indicators for keyboard selection
- [x] Skip keyboard nav when in text inputs

### Sprint 10: LocalStorage Persistence (COMPLETE)
- [x] Save oriki results to localStorage after generation
- [x] Check for saved oriki on app load
- [x] Show "Welcome back" prompt for returning users
- [x] "View Last Oriki" and "Start Fresh" options
- [x] Clear saved data on "Start Over"

---

## Current Sprint: Sprint 11 - Poetry Quality & UX Improvements

**Goal**: Fix disjointed, impersonal poetry by integrating the user's free-write letter, improving prompt narrative flow, and adding quick tradition-switching.

**User Feedback Being Addressed**:
1. "The Orikis generated still feel so disjointed and impersonal. They don't really flow."
2. "There are too many affirmations"
3. "There should be an easy way to try the other traditions when one is generated"

**Root Cause Analysis** (from Yoruba Cultural Consultant):
- The free_write_letter (most personal input) is NOT being used in poetry prompts
- Current prompts create disconnected, formulaic lines with no narrative arc
- Need to weave user's actual words into the poem
- Line count should be reduced from 4-7 to 3-5 for focus

### Task 11.1: Complete free_write_letter Integration in Prompts
- [ ] **Add {free_write_letter} to all 4 cultural mode prompts**
  - File: `backend/agents/poetry_composer.py`
  - Details: The parameter is already passed to `compose_poem()` and added to `input_vars` (line 348), but none of the 4 prompt templates actually reference `{free_write_letter}`. Add a section to each prompt template that instructs the LLM to draw from the user's letter.
  - Acceptance: All 4 prompts (Yoruba, Secular, Turkish, Biblical) include `{free_write_letter}` and instruct LLM to weave user's words into the poem.

### Task 11.2: Rewrite Yoruba-Inspired Prompt for Narrative Flow
- [ ] **Restructure Yoruba prompt for flowing, personal poetry**
  - File: `backend/agents/poetry_composer.py` (function `_create_yoruba_prompt`)
  - Details:
    - Add instruction to create a narrative arc (beginning, middle, end)
    - Include 1-2 few-shot examples of flowing Yoruba-inspired poetry
    - Change line count from "4-7 lines" to "3-5 lines"
    - Add instruction to incorporate user's actual phrases/words from their letter
    - Emphasize emotional continuity between lines
  - Acceptance: Generated Yoruba poems feel connected, personal, and flow naturally. Consultant approval required.

### Task 11.3: Rewrite Secular Prompt for Narrative Flow
- [ ] **Restructure Secular prompt for flowing, personal poetry**
  - File: `backend/agents/poetry_composer.py` (function `_create_secular_prompt`)
  - Details:
    - Add narrative arc instruction
    - Include 1-2 few-shot examples of flowing secular praise poetry
    - Change line count from "4-7 lines" to "3-5 lines"
    - Add instruction to weave user's own words from their letter
  - Acceptance: Generated secular poems feel cohesive and personally resonant.

### Task 11.4: Rewrite Turkish Prompt for Narrative Flow
- [ ] **Restructure Turkish prompt for flowing, personal poetry**
  - File: `backend/agents/poetry_composer.py` (function `_create_turkish_prompt`)
  - Details:
    - Add narrative arc instruction for blessing progression
    - Include 1-2 few-shot examples of flowing Turkish-style blessings
    - Change line count from "4-7 lines" to "3-5 lines"
    - Add instruction to incorporate user's words from their letter
  - Acceptance: Generated Turkish blessings flow naturally with emotional progression.

### Task 11.5: Rewrite Biblical Prompt for Narrative Flow
- [ ] **Restructure Biblical prompt for flowing, personal poetry**
  - File: `backend/agents/poetry_composer.py` (function `_create_biblical_prompt`)
  - Details:
    - Add narrative arc instruction (covenant-style progression)
    - Include 1-2 few-shot examples of flowing biblical-style poetry
    - Change line count from "4-7 lines" to "3-5 lines"
    - Add instruction to weave user's words from their letter
  - Acceptance: Generated biblical poetry has scriptural flow and personal resonance.

### Task 11.6: Reduce Affirmation Count
- [ ] **Change affirmation count from 5-10 to 3-5**
  - File: `backend/agents/affirmation_generator.py`
  - Details:
    - Line ~70: Change "Generate 5-10 affirmations" to "Generate 3-5 affirmations"
    - Line ~77: Change "identify 3-5 focus areas" to "identify 2-3 focus areas"
  - Acceptance: Generated affirmations are 3-5 items (not more), with 2-3 focus areas.

### Task 11.7: Add "Try Another Tradition" Buttons to Results
- [ ] **Add tradition-switching buttons to results page**
  - File: `frontend/index.html`
  - Details: Add a new section after the poem container with 4 buttons (one per cultural mode, hiding the current mode). Label: "Try Another Tradition"
  - Acceptance: 4 tradition buttons visible on results page (current mode hidden or disabled).

- [ ] **Implement tradition-switching logic**
  - File: `frontend/app.js`
  - Details:
    - Store last quiz submission in state (already done for regenerate)
    - When tradition button clicked: update `cultural_mode` in stored submission, call generate API, display new results
    - Show loading state during regeneration
    - Update cultural disclaimer for new mode
  - Acceptance: Clicking a tradition button regenerates the poem in that tradition without retaking the quiz. Loading state shown. Disclaimer updates.

### Completed Tasks
(Move tasks here as they're finished)

---

## Deferred: Production Deployment (Sprint 12)

### 12.1 Production Deployment
- [ ] Deploy backend to Render
- [ ] Update frontend API_BASE_URL to production
- [ ] Deploy frontend to GitHub Pages
- [ ] Verify CORS working in production

### 12.2 Final Checklist
- [ ] All cultural modes generate appropriate poetry
- [ ] Audio works across browsers (Chrome, Safari, Firefox)
- [ ] Mobile responsive and accessible
- [ ] Error states handled gracefully
- [ ] Start Over resets completely

---

## Future Features (Post-MVP)

### Infrastructure (Post-Deployment Priority)
Items to implement after MVP is live and stable.

- [ ] **Environment-Specific Config** - `.env.development` / `.env.production` pattern for safe local dev vs production switching
- [ ] **Retry Logic with Fallback** - Auto-retry on LLM parse failures (max 2 retries, temperature +0.1 each retry)
- [ ] **Prompt Caching** - Enable OpenAI prompt caching for 50-90% cost reduction on repeated system prompts
- [ ] **Pre-commit Hooks** - Black, isort, flake8 (skip mypy - overkill for this project size)
- [ ] **Deployment Verification Script** - `scripts/verify_deployment.sh` to test health, CORS, and generation endpoint

### Tier 1: Quick Wins (High Impact, Low Effort)
Each item completable in 2-4 hours.

- [x] **Name Input for "Name Only" Pronouns** - Show name input field when user selects "name_only" option. Use name in poetry generation. *(Sprint 7)*
- [x] **Regenerate Variations Button** - Button on results page to generate a new variation with same inputs. *(Sprint 8)*
- [x] **Copy Poem to Clipboard** - Copy button with "Copied!" feedback. *(Sprint 8)*
- [x] **Keyboard Navigation for Quiz** - Full keyboard accessibility: number keys (1-9) select options, Enter advances, Backspace goes back. *(Sprint 9)*
- [x] **Offline Save via LocalStorage** - Save generated oriki to localStorage. On return, prompt to revisit or start fresh. *(Sprint 10)*
- [ ] **Pre-Generation Reflection Pause** - 15-second breathing moment with ambient sound before results appear. "Take a breath. Your oriki is being composed..."
- [ ] **Ritual Framing for Audio Playback** - "Create Sacred Space" button that dims UI, centers audio player, creates focused listening experience
- [ ] **Few-Shot Examples in Prompts** - Add 2-3 exemplar poems per cultural mode to `poetry_composer.py` for consistent quality
- [ ] **Voice Selection for TTS** - Dropdown to choose OpenAI voice (alloy, echo, fable, onyx, nova, shimmer)
- [ ] **Ceremonial Welcome Screen** - Warm framing on landing page explaining the sacred nature of praise poetry

### Tier 2: Enhanced Experience (Medium Effort)
Features that deepen the experience. 4-8 hours each.

- [ ] **Micro-introductions Before Key Questions** - Brief contextual text before important quiz questions
- [ ] **Contextual Metaphor Expansion** - Optional "Learn more" that shows brief poetic story explaining metaphor meanings in generated poetry
- [ ] **Spoken Pronunciation Guide** - Audio clips of traditional Yoruba sounds/words for Yoruba mode (requires authentic recordings)
- [ ] **"Who Sees You?" Question** - Relational/communal question: "Who in your life truly sees you?"
- [ ] **"Legacy" Question** - Aspirational identity: "What do you hope to be remembered for?"
- [ ] **Affirmative Micro-responses** - Warm acknowledgments after certain quiz answers
- [ ] **Ambient Audio Mixing** - Background audio that plays with TTS narration
- [ ] **Shareable Links** - Generate unique link to share your oriki (requires backend storage)
- [ ] **Animated Visual Background** - Subtle, culturally-appropriate animations during results
- [ ] **"Gift An Oriki" Mode** - Toggle at start: "Is this for you, or someone you want to celebrate?" If gifting, launch a separate quiz about the recipient: "What values do you admire in them?", "What metaphor captures their spirit?", etc. Include giver's name and optional message. Final output: "This Oriki was created for [recipient] by [giver]." Culturally authentic (oriki are traditionally spoken over others by their community).
- [ ] **"Emotional Weather" Progress Indicator** - Progress bar evolves visually based on user's answers. If someone selects "warrior" energy + "flame" metaphor, colors shift warm. Creates anticipation and emotional continuity throughout the quiz.

### Tier 3: Growth Features (High Effort, Future Vision)
Major features for if/when the project grows. Not planned.

- [ ] User accounts and saved orikis
- [ ] Mode-specific quiz variations (different questions per cultural mode)
- [ ] Additional cultural modes (after consultation with cultural experts)
- [ ] Multi-language support

---

## Excluded Suggestions (With Reasoning)

The following were evaluated and intentionally excluded:

| Suggestion | Reason for Exclusion |
|------------|---------------------|
| Lineage Acknowledgment Question | Appropriation risk too high without extensive cultural consultation. Heritage questions are fraught territory. |
| 70%+ Test Coverage | Overkill for ~$5/month project. Current manual testing sufficient for scope. |
| Consolidate Docs to `docs/` | Premature optimization. Documentation sprawl isn't a problem yet. |
| Semantic Similarity Validator | Over-engineering. No evidence of theme drift issues. Adds latency and embedding costs. |
| Poetic Coherence Scorer | Doubles LLM cost and latency. Users can regenerate if unhappy. |
| Sentry Monitoring | Overkill for hobby project. Console logging is sufficient. |
| Seasonal/Occasion Framing Options | Scope creep. Complicates quiz flow. The free-write question already lets users express context. Revisit if Gift Mode proves popular. |
| Token/Cost Display for Transparency | Breaks the emotional spell of the experience. Users don't need to think about API costs during their sacred moment. Better for FAQ page. |
