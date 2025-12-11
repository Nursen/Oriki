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
- [x] Fixed docs/backend quiz option mismatches
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

### Sprint 11: Poetry Quality & UX Improvements (COMPLETE)
- [x] Add {free_write_letter} to all 4 cultural mode prompts
- [x] Rewrite Yoruba prompt with narrative arc, examples, metaphor discipline
- [x] Rewrite Secular prompt with narrative arc and examples
- [x] Rewrite Turkish prompt with narrative arc and examples
- [x] Rewrite Biblical prompt with narrative arc and examples
- [x] Reduce line count from 4-7 to 3-5 across all modes
- [x] Reduce affirmation count from 5-10 to 3-5
- [x] Add "Try Another Tradition" buttons to results page
- [x] Cultural consultant review: APPROVED WITH NOTES (B+ to A- grades)
- [x] Refined metaphor discipline based on test feedback

---

### Sprint 12.5: Copy & Share Polish (COMPLETE)

**Goal**: Improve sharing experience so users can easily copy their full oriki and share with others.

- [x] 12.5.1 Fix Copy Button - Update copy functionality to include BOTH poem AND affirmations
- [x] 12.5.2 Add Social Share Buttons - WhatsApp, Twitter/X, and Facebook share buttons
- [x] 12.5.3 Add "Try It Yourself" Link - Include app link in all shared content
- [x] 12.5.4 Rename "Copy Poem" to "Copy Oriki" - Update button label for consistency

---

## Current Sprint: Sprint 12 - Production Deployment

**Goal**: Deploy MVP to production and verify all functionality works end-to-end.

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

## Next Sprint: Sprint 13 - Loading & Cinematic Reveal

**Goal**: Transform the generation wait and results reveal into a ceremonial experience.

### 13.1 Pulsing "Generating" Loading Animation
- [ ] Create orb/mandala pulsing animation with CSS
  - File: `docs/styles.css`
  - Details: Design a warm, glowing orb or mandala shape that pulses rhythmically. Use CSS keyframes for smooth animation. Colors should match the warm earth tone palette.
  - Acceptance: Loading state shows animated orb/mandala instead of plain text

- [ ] Add staged loading messages
  - File: `docs/app.js`
  - Details: Cycle through messages during generation: "Extracting your essence...", "Weaving your praise...", "Crafting your affirmations...". Each message displays for ~3-4 seconds. Messages appear below the animation.
  - Acceptance: Messages cycle smoothly during the generation wait

### 13.2 Ceremonial Screen Transition
- [ ] Implement screen dim/fade to dark before results
  - File: `docs/styles.css`, `docs/app.js`
  - Details: When generation completes, fade the loading state to near-black (0.5s transition). Create anticipation before reveal.
  - Acceptance: Screen smoothly fades to dark after generation completes

- [ ] Add golden ambient particle effect
  - File: `docs/styles.css`, `docs/app.js`
  - Details: Use CSS or lightweight canvas to create golden particles that gather/converge in the center during the dark moment. Keep it performant (< 50 particles).
  - Acceptance: Golden particles visible during transition, no performance issues on mobile

- [ ] Reveal with warm dawn/firelight gradient
  - File: `docs/styles.css`, `docs/app.js`
  - Details: After dark moment (~1.5s), background transitions to warm gradient (deep amber to soft gold). Results content fades in over this background.
  - Acceptance: Smooth gradient emergence that feels like sunrise/dawn

### 13.3 Cinematic Text Reveal with Kinetic Typography
- [ ] Implement line-by-line typewriter effect for poem
  - File: `docs/app.js`, `docs/styles.css`
  - Details: Each line of the poem appears one at a time with typewriter animation. Pace should match natural speaking cadence (~50-80ms per character). Brief pause between lines (~500ms).
  - Acceptance: Poem reveals line by line with typewriter effect

- [ ] Highlight key phrases and nature metaphors
  - File: `docs/app.js`, `docs/styles.css`
  - Details: Parse poem for key praise phrases (typically at line starts) and nature metaphors (lion, river, fire, etc.). Render these in larger/bolder weight. Nature metaphors get warm accent color highlight.
  - Acceptance: Key phrases visually emphasized, metaphors highlighted in accent color

- [ ] Add subtle glow effect on line appearance
  - File: `docs/styles.css`
  - Details: Each line gets a brief warm glow/bloom effect as it appears (CSS text-shadow animation). Glow fades after ~0.5s.
  - Acceptance: Lines glow briefly on appearance, effect is subtle not overwhelming

---

## Sprint 14: Atmosphere & Celebration

**Goal**: Immerse the user with personalized visuals, sound, and celebration.

### 14.1 Personalized Visual Metaphor Backgrounds
- [ ] Parse poem for nature metaphors
  - File: `docs/app.js`
  - Details: Create regex/keyword detection for nature metaphors: river, water, flow, mountain, earth, rock, fire, flame, burn, eagle, bird, sky, lion, strength, sun, light, tree, root, wind. Return list of detected metaphors.
  - Acceptance: Function returns array of detected metaphors from poem text

- [ ] Generate abstract animated CSS backgrounds per metaphor
  - File: `docs/styles.css`, `docs/app.js`
  - Details: Create CSS classes for each metaphor type: `.bg-river` (flowing blue gradients, wave animation), `.bg-fire` (warm red/orange gradients, flicker animation), `.bg-mountain` (earth tones, stable/grounded), `.bg-eagle` (sky blues, upward drift), `.bg-lion` (golden/amber, strength). Each should be abstract and non-distracting.
  - Acceptance: Each metaphor type has distinct animated background

- [ ] Combine dominant metaphors into cohesive background
  - File: `docs/app.js`
  - Details: Take top 2-3 detected metaphors and blend their background styles. Use CSS custom properties to mix colors. If conflicting metaphors (e.g., water + fire), prioritize the first mentioned.
  - Acceptance: Results page shows personalized background based on poem content

### 14.2 Ambient Soundscape System
- [ ] Add ambient audio tracks
  - Files: `docs/app.js`, add audio assets to `docs/audio/`
  - Details: Source or create short looping ambient tracks: heartbeat/drum loop (~10s), nature sounds loop (~15s), warm drone/pad (~20s). Use royalty-free sources. Keep files small (< 200KB each, MP3 format).
  - Acceptance: Audio files added and load without errors

- [ ] Layer ambient audio under TTS playback
  - File: `docs/app.js`
  - Details: When TTS plays, fade in ambient audio at ~20% volume underneath. Ambient should start 1s before TTS. Fade out ambient when TTS ends. Handle audio context properly for mobile browsers.
  - Acceptance: Ambient plays under TTS without overwhelming the voice

- [ ] Match ambient sounds to user's metaphors where possible
  - File: `docs/app.js`
  - Details: Select ambient track based on detected metaphors: water metaphors = nature/water sounds, fire/strength = drum/heartbeat, sky/spiritual = warm drone. Default to drone if no strong match.
  - Acceptance: Ambient sound selection responds to poem content

- [ ] Add ambiance toggle
  - File: `docs/index.html`, `docs/app.js`
  - Details: Add toggle switch near audio player: "Voice only" vs "With ambiance". Default to "With ambiance". Persist preference in localStorage.
  - Acceptance: Toggle controls ambient audio, preference remembered

### 14.3 Confetti/Particle Celebration Burst
- [ ] Implement gold dust particle effect on generation complete
  - File: `docs/app.js`, `docs/index.html`
  - Details: Use canvas-confetti library (~3KB) or custom lightweight canvas implementation. Trigger burst when results first appear. Use gold/amber particles. Duration ~2-3 seconds. Keep it elegant, not overwhelming (50-100 particles max).
  - Acceptance: Elegant particle burst on results reveal

- [ ] Match particle colors to cultural mode
  - File: `docs/app.js`
  - Details: Yoruba = gold/amber, Secular = soft gold/white, Turkish = turquoise/gold, Biblical = white/gold. Pass color palette to confetti function based on selected mode.
  - Acceptance: Particle colors reflect cultural mode selection

---

## Sprint 15: Social Shareability

**Goal**: Make it easy to share beautiful moments on social media.

### 15.1 Shareable Praise Name Social Cards
- [ ] Generate Instagram-story-sized image
  - File: `docs/app.js`, `docs/styles.css`
  - Details: Use html2canvas or dom-to-image library. Create a hidden div with social card layout (1080x1920 or 1080x1350). Include: personalized metaphor background, 1-2 most powerful praise lines extracted from poem, subtle decorative border.
  - Acceptance: Image generates at correct dimensions

- [ ] Extract most powerful praise lines
  - File: `docs/app.js`
  - Details: Parse poem to find lines with praise phrases (containing "you are", "child of", "one who", nature metaphors). Select top 1-2 lines by praise density. Truncate if needed for visual fit.
  - Acceptance: Card displays impactful, readable excerpt

- [ ] Add watermark and download button
  - File: `docs/app.js`, `docs/index.html`, `docs/styles.css`
  - Details: Add subtle "oriki.app" watermark in corner of generated image. Add "Download Card" button that triggers image download. Use descriptive filename: `my-oriki-card.png`.
  - Acceptance: Image downloads with watermark, filename is user-friendly

### 15.2 30-Second Cinematic Record Mode
- [ ] Add "Record Mode" button
  - File: `docs/index.html`, `docs/app.js`, `docs/styles.css`
  - Details: Add button on results page: "Record Mode" with video camera icon. Button should be clearly labeled as for screen recording.
  - Acceptance: Button visible and clearly communicates purpose

- [ ] Implement auto-advancing cinematic playback
  - File: `docs/app.js`
  - Details: When Record Mode activated: hide all UI chrome (buttons, nav), show clean fullscreen-like view, auto-play sequence: (1) Brief title card with cultural mode (~2s), (2) 1-2 quiz highlight moments (~5s), (3) Transition to results with poem reveal (~20s), (4) End card with app URL (~3s). Total ~30 seconds.
  - Acceptance: Playback runs ~30 seconds, clean visuals, no UI clutter

- [ ] Add dramatic timing and transitions
  - File: `docs/app.js`, `docs/styles.css`
  - Details: Smooth crossfades between sections. Kinetic typography on poem reveal (reuse from Sprint 13). Background music/ambient plays during sequence. Show countdown timer so user knows when to stop recording.
  - Acceptance: Sequence feels polished and shareable

---

## Sprint 16: Gift Mode

**Goal**: Enable users to create meaningful orikis for others.

### 16.1 Gift Mode Quiz Flow
- [ ] Add initial "Who is this for?" choice
  - File: `docs/app.js`, `docs/index.html`
  - Details: Before quiz begins, show choice screen: "Who is this Oriki for?" with two options: "For myself" (current flow) and "For someone I want to celebrate" (gift mode). Style as warm, inviting cards.
  - Acceptance: Choice screen appears before quiz, selection determines flow

- [ ] Create modified quiz for gift recipients
  - File: `docs/app.js`
  - Details: If gift mode selected, launch modified questions: "What values do you most admire in them?", "What challenges have you watched them overcome?", "If they were a force of nature, what would they be?", "What words do you wish they could hear about themselves?". Maintain same cultural mode and pronoun questions.
  - Acceptance: Gift mode has distinct, other-focused questions

- [ ] Add giver's name and optional message fields
  - File: `docs/app.js`, `docs/index.html`
  - Details: At end of gift quiz, ask: "Your name (as the giver)" (required) and "A personal message to include" (optional, 280 char max). Store these with submission.
  - Acceptance: Giver can add their name and message

### 16.2 Gift Mode Backend Support
- [ ] Add gift fields to QuizSubmission model
  - File: `backend/models/quiz.py`
  - Details: Add fields: `is_gift: bool = False`, `giver_name: Optional[str] = None`, `gift_message: Optional[str] = None`, `recipient_name: Optional[str] = None`. Update validation to require giver_name when is_gift is True.
  - Acceptance: Model accepts gift mode data, validates correctly

- [ ] Update poetry prompts for third-person perspective
  - File: `backend/agents/poetry_composer.py`
  - Details: When is_gift is True, modify prompts to generate third-person praise: "They are..." instead of "You are...". Include giver attribution: "This praise was composed by [giver_name] for [recipient_name]". Optionally incorporate gift_message themes.
  - Acceptance: Gift orikis read as praise about someone, not to them

### 16.3 Gift Delivery Experience
- [ ] Generate shareable gift link
  - File: `docs/app.js`, potentially `backend/api/routes.py`
  - Details: After gift oriki generated, create shareable link. For MVP: encode gift data in URL hash (no backend storage needed, but link will be long). Alternative: add simple backend endpoint to store/retrieve gift by ID.
  - Acceptance: Shareable link generated that opens gift oriki

- [ ] Create recipient landing page
  - File: `docs/app.js`, `docs/index.html`
  - Details: When opening gift link, show special landing: "[Giver Name] created an Oriki for you" with warm, inviting design. Subheading: "See how they see your strength." Button: "Receive Your Oriki" reveals the poem.
  - Acceptance: Gift recipients see personalized landing before poem

- [ ] Add "Create Your Own" prompt for recipients
  - File: `docs/app.js`
  - Details: After viewing gift oriki, show invitation: "Want to discover your own Oriki?" with button to start regular quiz flow. Track that user came from gift for analytics (localStorage flag).
  - Acceptance: Recipients can easily start their own oriki journey

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
- [ ] **Ambient Audio Mixing** - Enhanced audio experience: (1) Add pause/separation between oriki and affirmations in TTS audio, (2) Background music mixing that plays softly under TTS narration
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
