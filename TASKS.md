# TASKS.md - Oriki Project Sprint Plan

## Architecture Overview

- **Backend**: FastAPI on Render (free tier)
- **Frontend**: Static HTML/CSS/JS on GitHub Pages
- **LLM/TTS**: OpenAI API
- **Budget**: ~$5/month (~50 generations)

---

## Current Sprint: Sprint 1 - Backend Foundation + Core Pipeline

**Goal**: Deploy a working backend API that accepts quiz data and returns personalized poetry + affirmations
**Target Completion**: 1 week

---

### Sprint Backlog

#### 1.1 Project Setup

- [ ] **Task 1.1.1**: Create project folder structure
  - Create: `backend/`, `backend/agents/`, `backend/api/`, `backend/models/`
  - Create empty `__init__.py` files in each Python package directory
  - Acceptance: Directory structure exists with proper Python packages

- [ ] **Task 1.1.2**: Initialize Python project with requirements.txt
  - File: `backend/requirements.txt`
  - Dependencies:
    ```
    fastapi==0.104.1
    uvicorn[standard]==0.24.0
    pydantic==2.5.2
    langchain==0.1.0
    langchain-openai==0.0.2
    python-dotenv==1.0.0
    ```
  - Acceptance: `pip install -r requirements.txt` succeeds

- [ ] **Task 1.1.3**: Configure environment variables
  - File: `backend/.env.example` (committed to git)
  - File: `backend/.env` (gitignored, local only)
  - Variables: `OPENAI_API_KEY=your-key-here`
  - Update `.gitignore` to include `backend/.env`
  - Acceptance: .env.example exists, .env is gitignored

- [ ] **Task 1.1.4**: Create FastAPI skeleton with health check
  - File: `backend/main.py`
  - Create FastAPI app with:
    - `GET /health` returning `{"status": "healthy"}`
    - Load environment variables using `python-dotenv`
  - Acceptance: `uvicorn main:app --reload` runs, `/health` returns 200

---

#### 1.2 Quiz Design

- [ ] **Task 1.2.1**: Create quiz questions config
  - File: `backend/models/quiz_config.py`
  - Define constants for all quiz options:
    - `VALUES_OPTIONS`: list of 10 values for Q1
    - `STRENGTHS_OPTIONS`: list of 8 strengths for Q2
    - `ASPIRATIONAL_OPTIONS`: list of 8 traits for Q3
    - `METAPHOR_OPTIONS`: list of 8 archetypes for Q4
    - `ENERGY_OPTIONS`: list of 6 energy styles for Q5
    - `FOCUS_OPTIONS`: list of 6 life focuses for Q6
    - `CULTURAL_MODES`: ["yoruba", "secular", "turkish", "biblical"]
  - Acceptance: All options defined as typed constants

- [ ] **Task 1.2.2**: Create Pydantic models for quiz input
  - File: `backend/models/quiz.py`
  - Create `QuizInput` model:
    - `values`: list[str] (3 items from VALUES_OPTIONS)
    - `strength`: str (from STRENGTHS_OPTIONS)
    - `aspiration`: str (from ASPIRATIONAL_OPTIONS)
    - `metaphor`: str (from METAPHOR_OPTIONS)
    - `energy`: str (from ENERGY_OPTIONS)
    - `focus`: str (from FOCUS_OPTIONS)
    - `cultural_mode`: str (from CULTURAL_MODES)
    - `letter`: str (max 2000 chars)
  - Add Pydantic validators for option validation
  - Acceptance: Invalid quiz data raises ValidationError

---

#### 1.3 Theme Extractor Agent

- [ ] **Task 1.3.1**: Create ThemeData output model
  - File: `backend/models/theme.py`
  - Create `ThemeData` Pydantic model:
    - `values`: list[str] (3-5 core values extracted)
    - `emotional_tone`: str (primary emotion)
    - `metaphors`: list[str] (2-4 symbols/images)
    - `identity_markers`: list[str] (2-3 identity statements)
    - `aspirations`: list[str] (2-3 goals/dreams)
    - `fears`: list[str] (1-2 concerns, optional)
    - `key_themes`: list[str] (3-5 central themes)
  - Acceptance: Model validates structured LLM output

- [ ] **Task 1.3.2**: Implement Theme Extractor agent
  - File: `backend/agents/theme_extractor.py`
  - Function: `extract_themes(quiz_input: QuizInput) -> ThemeData`
  - Use `ChatOpenAI` with `gpt-4o-mini`, temperature=0.7
  - Prompt template should:
    - Include quiz selections and free-write letter
    - Ask for structured analysis of values, emotions, metaphors
    - Return data matching ThemeData schema
  - Use `with_structured_output(ThemeData)` for validation
  - Acceptance: Returns valid ThemeData from sample input

- [ ] **Task 1.3.3**: Test Theme Extractor
  - File: `backend/agents/test_theme_extractor.py`
  - Create 2-3 sample QuizInput fixtures
  - Test that `extract_themes()` returns valid ThemeData
  - Run with: `python -m pytest backend/agents/test_theme_extractor.py -v`
  - Acceptance: Tests pass, output is coherent

---

#### 1.4 Poetry Composer Agent

- [ ] **Task 1.4.1**: Create PoemOutput model
  - File: `backend/models/poem.py`
  - Create `PoemOutput` Pydantic model:
    - `poem_lines`: list[str] (8-16 lines)
    - `cultural_mode`: str
    - `title`: str (optional, short evocative title)
  - Acceptance: Model enforces poem structure

- [ ] **Task 1.4.2**: Create cultural mode prompt templates
  - File: `backend/agents/prompts/poetry_prompts.py`
  - Create prompt strings for each mode:
    - `YORUBA_PROMPT`: Praise of qualities, nature metaphors, rhythm/repetition, honorific tone. EXPLICIT RULE: Never generate fake names, lineages, clans, or ancestry.
    - `SECULAR_PROMPT`: Psychological depth, universal human experience, grounded imagery
    - `TURKISH_PROMPT`: Alkis blessings, folkloric metaphors, nazar protection themes, natural imagery
    - `BIBLICAL_PROMPT`: Scriptural cadence, blessing language, covenant themes, pastoral imagery
  - Each prompt receives: `themes` (ThemeData), `quiz_input` (QuizInput)
  - Acceptance: 4 distinct prompt templates defined

- [ ] **Task 1.4.3**: Implement Poetry Composer agent
  - File: `backend/agents/poetry_composer.py`
  - Function: `compose_poem(themes: ThemeData, quiz_input: QuizInput) -> PoemOutput`
  - Route to correct prompt based on `quiz_input.cultural_mode`
  - Use `ChatOpenAI` with `gpt-4o-mini`, temperature=0.8
  - Use `with_structured_output(PoemOutput)` for validation
  - Acceptance: Generates culturally-appropriate poems

- [ ] **Task 1.4.4**: Test Poetry Composer (all 4 modes)
  - File: `backend/agents/test_poetry_composer.py`
  - Test each cultural mode produces valid PoemOutput
  - Verify Yoruba mode does NOT contain fake lineage/ancestry
  - Acceptance: All 4 modes produce appropriate poems

---

#### 1.5 Affirmation Generator Agent

- [ ] **Task 1.5.1**: Create AffirmationsOutput model
  - File: `backend/models/affirmations.py`
  - Create `AffirmationsOutput` Pydantic model:
    - `affirmations`: list[str] (5-7 affirmation statements)
  - Acceptance: Model validates list of strings

- [ ] **Task 1.5.2**: Implement Affirmation Generator agent
  - File: `backend/agents/affirmation_generator.py`
  - Function: `generate_affirmations(themes: ThemeData, quiz_input: QuizInput) -> AffirmationsOutput`
  - Prompt should:
    - Be grounded in CBT/positive psychology principles
    - Anchor affirmations in user's stated values
    - Avoid toxic positivity ("everything is fine")
    - Use "I am", "I can", "I choose" framing
    - Be specific to extracted themes, not generic
  - Use `ChatOpenAI` with `gpt-4o-mini`, temperature=0.7
  - Acceptance: Returns personalized, grounded affirmations

- [ ] **Task 1.5.3**: Test Affirmation Generator
  - File: `backend/agents/test_affirmation_generator.py`
  - Test output is valid AffirmationsOutput
  - Verify affirmations reference user values
  - Acceptance: Tests pass, affirmations are personalized

---

#### 1.6 API Endpoints

- [ ] **Task 1.6.1**: Create GenerationOutput response model
  - File: `backend/models/generation.py`
  - Create `GenerationOutput` Pydantic model:
    - `poem`: PoemOutput
    - `affirmations`: AffirmationsOutput
    - `themes`: ThemeData (for debugging/transparency)
  - Acceptance: Model combines all outputs

- [ ] **Task 1.6.2**: Implement POST /generate endpoint
  - File: `backend/api/routes.py`
  - Create APIRouter with:
    - `POST /generate` accepting `QuizInput`, returning `GenerationOutput`
    - Pipeline: QuizInput -> ThemeExtractor -> (PoetryComposer + AffirmationGenerator) -> GenerationOutput
  - Add error handling for OpenAI API errors
  - File: `backend/main.py` - include router
  - Acceptance: Endpoint returns poem + affirmations from quiz data

- [ ] **Task 1.6.3**: Add CORS middleware
  - File: `backend/main.py`
  - Add `CORSMiddleware` allowing:
    - Origins: `["*"]` for dev (restrict to GitHub Pages domain later)
    - Methods: `["GET", "POST"]`
    - Headers: `["*"]`
  - Acceptance: Frontend can call API without CORS errors

- [ ] **Task 1.6.4**: End-to-end test full pipeline
  - File: `backend/test_e2e.py`
  - Test full flow: quiz input -> /generate -> valid output
  - Use FastAPI TestClient
  - Acceptance: Full pipeline works, response < 30 seconds

---

#### 1.7 Deploy Backend

- [ ] **Task 1.7.1**: Create Render deployment config
  - File: `backend/render.yaml` (optional, or use Render dashboard)
  - File: `backend/Procfile` if needed: `web: uvicorn main:app --host 0.0.0.0 --port $PORT`
  - Ensure `requirements.txt` is complete
  - Acceptance: Config files ready for Render

- [ ] **Task 1.7.2**: Deploy to Render
  - Create Render account (if needed)
  - Create new Web Service, connect to GitHub repo
  - Set root directory to `backend/`
  - Add environment variable: `OPENAI_API_KEY`
  - Deploy and note the live URL
  - Acceptance: Live endpoint responds to /health

- [ ] **Task 1.7.3**: Test live deployment
  - Test `/health` endpoint on live URL
  - Test `/generate` with sample quiz data
  - Verify response time is acceptable (<30s)
  - Acceptance: Live API works end-to-end

---

### Completed Tasks

(Move completed tasks here)

---

## Sprint 2: Frontend + Audio (Future)

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

## Sprint 3: Polish + Launch (Future)

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
