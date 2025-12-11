// ============================================================================
// ORIKI QUIZ APPLICATION - Frontend JavaScript
// ============================================================================
// This file handles the quiz UI, state management, and user interactions.
// It's designed to be educational and easy to understand for beginners.

// ============================================================================
// API CONFIGURATION - Backend API endpoint
// ============================================================================
// DEPLOYMENT GUIDE:
// The API URL is automatically detected based on the environment.
// - localhost: Uses local backend (http://localhost:8000)
// - production: Uses Render backend (update the URL below after deploying)
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:8000'
    : 'https://oriki-api.onrender.com';  // UPDATE THIS after Render deployment

// ============================================================================
// QUIZ DATA - Hardcoded questions (will fetch from API later)
// ============================================================================
// Questions are ordered for optimal user experience:
// 1. top_values - sets foundation
// 2. cultural_mode - sets lens for the experience
// 3. pronouns - foundational identity
// 4-8. middle questions - explore identity and aspirations
// 9. free_write_letter - most vulnerable/personal (last)
const quizQuestions = [
    {
        id: 'top_values',
        type: 'multi-select',
        maxSelections: 3,
        question: 'Select your top 3 core values:',
        options: [
            { value: 'integrity', label: 'Integrity' },
            { value: 'creativity', label: 'Creativity' },
            { value: 'family', label: 'Family' },
            { value: 'growth', label: 'Growth' },
            { value: 'freedom', label: 'Freedom' },
            { value: 'compassion', label: 'Compassion' },
            { value: 'achievement', label: 'Achievement' },
            { value: 'wisdom', label: 'Wisdom' },
            { value: 'connection', label: 'Connection' },
            { value: 'courage', label: 'Courage' }
        ]
    },
    {
        id: 'cultural_mode',
        type: 'single-select',
        question: 'Which cultural/spiritual lens would you like for your praise poetry?',
        options: [
            {
                value: 'yoruba_inspired',
                label: 'Yoruba-Inspired',
                description: 'Uses the aesthetic structure of Oríkì (traditional Yoruba praise poetry) with rhythmic repetition and nature metaphors. Inspired by, not claiming to be authentic.'
            },
            {
                value: 'secular',
                label: 'Secular',
                description: 'Modern psychological approach grounded in positive psychology and universal human experiences, without religious or spiritual references.'
            },
            {
                value: 'turkish',
                label: 'Turkish',
                description: 'Alkış blessing tradition from Turkish folklore, emphasizing protection, prosperity, and warm family blessings with nature imagery.'
            },
            {
                value: 'biblical',
                label: 'Biblical',
                description: 'Scriptural cadence inspired by Psalms and Beatitudes, with themes of covenant, purpose, and calling using biblical metaphors.'
            }
        ]
    },
    {
        id: 'pronouns',
        type: 'single-select',
        question: 'In your praise poetry, you will be celebrated as:',
        options: [
            { value: 'he_him', label: 'He/Him' },
            { value: 'she_her', label: 'She/Her' },
            { value: 'they_them', label: 'They/Them' },
            { value: 'name_only', label: "Name Only (we'll ask for your name next)" }
        ]
    },
    {
        id: 'greatest_strength',
        type: 'single-select',
        question: 'What is your greatest strength?',
        options: [
            { value: 'leadership', label: 'Leadership' },
            { value: 'empathy', label: 'Empathy' },
            { value: 'resilience', label: 'Resilience' },
            { value: 'creativity', label: 'Creativity' },
            { value: 'analytical_thinking', label: 'Analytical Thinking' },
            { value: 'communication', label: 'Communication' },
            { value: 'patience', label: 'Patience' },
            { value: 'adaptability', label: 'Adaptability' }
        ]
    },
    {
        id: 'aspirational_trait',
        type: 'single-select',
        question: 'What quality do you aspire to embody more?',
        options: [
            { value: 'confidence', label: 'Confidence' },
            { value: 'peace', label: 'Peace' },
            { value: 'boldness', label: 'Boldness' },
            { value: 'wisdom', label: 'Wisdom' },
            { value: 'joy', label: 'Joy' },
            { value: 'influence', label: 'Influence' },
            { value: 'authenticity', label: 'Authenticity' },
            { value: 'discipline', label: 'Discipline' }
        ]
    },
    {
        id: 'metaphor_archetype',
        type: 'single-select',
        question: 'Which metaphor resonates most with you?',
        options: [
            { value: 'mountain', label: 'The Mountain' },
            { value: 'river', label: 'The River' },
            { value: 'flame', label: 'The Flame' },
            { value: 'tree', label: 'The Tree' },
            { value: 'storm', label: 'The Storm' },
            { value: 'sun', label: 'The Sun' },
            { value: 'bridge', label: 'The Bridge' },
            { value: 'garden', label: 'The Garden' }
        ]
    },
    {
        id: 'energy_style',
        type: 'single-select',
        question: 'How would you describe your energy?',
        options: [
            { value: 'charismatic', label: 'Charismatic' },
            { value: 'grounded', label: 'Grounded/Natural' },
            { value: 'visionary', label: 'Visionary' },
            { value: 'healer', label: 'Healer' },
            { value: 'warrior', label: 'Warrior' },
            { value: 'sage', label: 'Sage' }
        ]
    },
    {
        id: 'life_focus',
        type: 'single-select',
        question: 'What is your primary life focus right now?',
        options: [
            { value: 'career', label: 'Career' },
            { value: 'parenting', label: 'Parenting' },
            { value: 'relationships', label: 'Love/Relationships' },
            { value: 'health', label: 'Health' },
            { value: 'spirituality', label: 'Spirituality' },
            { value: 'creative_expression', label: 'Creative Expression' }
        ]
    },
    {
        id: 'free_write_letter',
        type: 'textarea',
        maxLength: 2000,
        question: 'What words do you need spoken over your life right now?',
        placeholder: 'Share what you need to hear, what truths you need affirmed, or what encouragement speaks to your current season...'
    }
];

// ============================================================================
// CULTURAL MODE DESCRIPTIONS AND DISCLAIMERS
// ============================================================================
// These descriptions explain each cultural mode and provide appropriate context
const culturalModeInfo = {
    yoruba_inspired: {
        title: 'About Yoruba-Inspired Praise Poetry',
        description: 'The poetry you receive is inspired by the Yoruba tradition of Oríkì—a centuries-old form of praise poetry that celebrates identity, lineage, and character through rhythmic, metaphor-rich verse.',
        whatItIs: 'This app uses the aesthetic structure of Oríkì (praise-naming, nature metaphors, rhythmic repetition) to celebrate your unique heritage and accomplishments.',
        whatItIsNot: [
            'Not traditional Yoruba Oríkì performed by a skilled practitioner',
            'Not a claim of Yoruba ancestry unless you have shared that heritage',
            'Does not replace consultation with cultural knowledge-keepers'
        ],
        commitment: 'We will NEVER fabricate Yoruba names, clan identities, or spiritual relationships that are not part of your confirmed heritage. We celebrate Yoruba tradition by respecting its boundaries.'
    },
    secular: {
        title: 'About Secular Praise Poetry',
        description: 'Your praise poetry uses a modern, psychological approach grounded in positive psychology and universal human experiences.',
        whatItIs: 'This poetry celebrates your strengths, values, and aspirations using contemporary language and accessible metaphors that anyone can relate to, regardless of spiritual background.',
        whatItIsNot: [
            'Not religious or spiritual in nature',
            'Not claiming any particular cultural tradition'
        ],
        commitment: 'We use evidence-based positive psychology principles to create affirming, empowering poetry that celebrates your authentic self.'
    },
    turkish: {
        title: 'About Turkish Blessing Poetry (Alkış)',
        description: 'Your blessing poetry is inspired by the Turkish folk tradition of Alkış—protective blessings passed down through generations in Anatolian culture.',
        whatItIs: 'This poetry uses the blessing structure and warm, familial tone characteristic of Turkish folklore, with nature metaphors common in traditional Alkış.',
        whatItIsNot: [
            'Not traditional folk Alkış performed by cultural practitioners',
            'Not a claim of Turkish heritage unless you have shared that background'
        ],
        commitment: 'We honor Turkish folk tradition by using its aesthetic structure while celebrating your personal journey and values.'
    },
    biblical: {
        title: 'About Biblical-Style Praise Poetry',
        description: 'Your praise poetry uses scriptural cadence and structure inspired by the Psalms and Beatitudes.',
        whatItIs: 'This poetry employs the rhythmic patterns, blessing language, and metaphors found in biblical literature to affirm your purpose and calling.',
        whatItIsNot: [
            'Not direct scripture or biblical text',
            'Not claiming divine revelation or prophecy'
        ],
        commitment: 'We use biblical literary patterns to create uplifting, purpose-centered poetry that celebrates your identity and mission.'
    }
};

// ============================================================================
// STATE MANAGEMENT - Store quiz state in a simple object
// ============================================================================
const quizState = {
    currentQuestionIndex: 0,  // Which question we're on (0-based)
    answers: {},               // Object to store all user answers
    displayName: null,         // Store display name for name_only pronouns
    totalQuestions: quizQuestions.length,
    lastSubmission: null       // Store last quiz submission for regeneration
};

// ============================================================================
// API REQUEST MANAGEMENT - Track ongoing requests for timeout/cancellation
// ============================================================================
// Store the current AbortController to allow request cancellation
let currentAbortController = null;
let timeoutWarningShown = false;

// ============================================================================
// LOADING MESSAGES - Calming messages that rotate during generation
// ============================================================================
const loadingMessages = [
    "Creating your personalized Oriki...",
    "Honoring your journey...",
    "Weaving your story...",
    "Finding the right words...",
    "Celebrating your essence...",
    "Crafting your praise poetry...",
    "Gathering wisdom for your words..."
];

// Variable to store the message rotation interval
let loadingMessageInterval = null;

// ============================================================================
// DOM ELEMENT REFERENCES - Cache DOM elements for better performance
// ============================================================================
// We get these once at the start and reuse them throughout the app
const elements = {
    // Sections
    welcomeSection: document.getElementById('welcome-section'),
    quizSection: document.getElementById('quiz-section'),
    resultsSection: document.getElementById('results-section'),

    // Buttons
    startQuizBtn: document.getElementById('start-quiz-btn'),
    prevBtn: document.getElementById('prev-btn'),
    nextBtn: document.getElementById('next-btn'),
    startOverBtn: document.getElementById('start-over-btn'),
    shareBtn: document.getElementById('share-btn'),
    copyPoemBtn: document.getElementById('copy-poem-btn'),
    regenerateBtn: document.getElementById('regenerate-btn'),

    // Quiz elements
    questionText: document.getElementById('question-text'),
    answerOptions: document.getElementById('answer-options'),
    currentQuestionSpan: document.getElementById('current-question'),
    totalQuestionsSpan: document.getElementById('total-questions'),
    progressFill: document.getElementById('progress-fill'),

    // Error elements
    errorContainer: document.getElementById('error-container'),
    errorMessage: document.getElementById('error-message'),
    errorDismissBtn: document.getElementById('error-dismiss-btn'),

    // Results error elements
    resultsError: document.getElementById('results-error'),
    resultsErrorMessage: document.getElementById('results-error-message'),
    tryAgainBtn: document.getElementById('try-again-btn'),
    backToQuizBtn: document.getElementById('back-to-quiz-btn'),
    cancelLoadingBtn: document.getElementById('cancel-loading-btn'),

    // Results elements - updated for new structure
    loadingOverlay: document.getElementById('loading-overlay'),
    poemLines: document.getElementById('poem-lines'),
    affirmationsList: document.getElementById('affirmations-list'),
    audioPlayer: document.getElementById('audio-player'),
    culturalDisclaimer: document.getElementById('cultural-disclaimer'),

    // Audio player elements
    generateAudioBtn: document.getElementById('generate-audio-btn'),
    audioLoading: document.getElementById('audio-loading'),
    audioElement: document.getElementById('audio-element'),
    playPauseBtn: document.getElementById('play-pause-btn'),
    downloadAudioBtn: document.getElementById('download-audio-btn')
};

// ============================================================================
// INITIALIZATION - Set up the app when the page loads
// ============================================================================
function initializeApp() {
    // Set the total number of questions in the UI
    elements.totalQuestionsSpan.textContent = quizState.totalQuestions;

    // Attach event listeners to buttons
    elements.startQuizBtn.addEventListener('click', startQuiz);
    elements.prevBtn.addEventListener('click', previousQuestion);
    elements.nextBtn.addEventListener('click', nextQuestion);
    elements.startOverBtn.addEventListener('click', restartQuiz);
    elements.shareBtn.addEventListener('click', shareOriki);
    elements.copyPoemBtn.addEventListener('click', copyPoemToClipboard);
    elements.regenerateBtn.addEventListener('click', regenerateOriki);

    // Attach error handling event listeners
    elements.errorDismissBtn.addEventListener('click', hideError);
    elements.tryAgainBtn.addEventListener('click', retryQuizSubmission);
    elements.backToQuizBtn.addEventListener('click', goBackToQuiz);
    elements.cancelLoadingBtn.addEventListener('click', cancelAPIRequest);

    // Attach audio player event listeners
    elements.generateAudioBtn.addEventListener('click', handleGenerateAudio);
    elements.playPauseBtn.addEventListener('click', togglePlayPause);
    elements.downloadAudioBtn.addEventListener('click', downloadAudio);

    // Attach tradition switcher event listeners
    attachTraditionSwitcherListeners();

    // Set up keyboard navigation for quiz accessibility
    setupKeyboardNavigation();

    // Check for saved Oriki from previous visit
    checkForSavedOriki();

    console.log('Oriki Quiz app initialized successfully');
}

// ============================================================================
// LOCALSTORAGE PERSISTENCE - Save and load Oriki for returning users
// ============================================================================

// Storage key for saved Oriki data
const STORAGE_KEY = 'oriki_saved_results';

/**
 * Check if there's a saved Oriki from a previous visit
 * If found, show the return user prompt
 */
function checkForSavedOriki() {
    const savedOriki = loadOrikiFromStorage();

    if (savedOriki) {
        console.log('Found saved Oriki from previous visit');
        showReturnUserPrompt(savedOriki);
    }
}

/**
 * Save generated Oriki to localStorage
 * @param {Object} results - The API response containing poem, affirmations, etc.
 */
function saveOrikiToStorage(results) {
    try {
        // Extract the data we want to save
        const dataToSave = {
            poem: results.poem.poem_lines || [],
            affirmations: results.affirmations.affirmations || [],
            culturalMode: results.poem.cultural_mode || 'secular',
            themes: results.themes || {},
            savedAt: new Date().toISOString()
        };

        // Save to localStorage as JSON string
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));

        console.log('Oriki saved to localStorage');
    } catch (error) {
        // localStorage might be disabled or full - fail silently
        console.warn('Failed to save Oriki to localStorage:', error);
    }
}

/**
 * Load saved Oriki from localStorage
 * @returns {Object|null} - Saved Oriki data or null if none exists
 */
function loadOrikiFromStorage() {
    try {
        const savedData = localStorage.getItem(STORAGE_KEY);

        if (!savedData) {
            return null;
        }

        // Parse the JSON data
        const parsedData = JSON.parse(savedData);

        // Validate that we have the required data
        if (!parsedData.poem || !parsedData.affirmations) {
            console.warn('Saved Oriki data is incomplete');
            return null;
        }

        return parsedData;
    } catch (error) {
        // Invalid JSON or other error - fail silently
        console.warn('Failed to load Oriki from localStorage:', error);
        return null;
    }
}

/**
 * Clear saved Oriki from localStorage
 */
function clearSavedOriki() {
    try {
        localStorage.removeItem(STORAGE_KEY);
        console.log('Saved Oriki cleared from localStorage');
    } catch (error) {
        console.warn('Failed to clear saved Oriki:', error);
    }
}

/**
 * Show the return user prompt when saved Oriki is found
 * @param {Object} savedOriki - The saved Oriki data
 */
function showReturnUserPrompt(savedOriki) {
    // Hide the normal welcome content
    const welcomeContent = document.querySelector('.welcome-content');
    if (welcomeContent) {
        welcomeContent.style.display = 'none';
    }

    // Create the return user prompt container
    const returnUserContainer = document.createElement('div');
    returnUserContainer.id = 'return-user-container';
    returnUserContainer.className = 'return-user-container';

    // Format the saved date nicely
    const savedDate = new Date(savedOriki.savedAt);
    const formattedDate = savedDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    // Build the HTML for the prompt
    returnUserContainer.innerHTML = `
        <h2>Welcome Back</h2>
        <p class="return-user-message">
            You have a saved Oriki from ${formattedDate}.
            Would you like to revisit it, or start fresh with a new journey?
        </p>
        <div class="return-user-actions">
            <button id="view-saved-oriki-btn" class="btn btn-primary">View Last Oriki</button>
            <button id="start-fresh-btn" class="btn btn-secondary">Start Fresh</button>
        </div>
    `;

    // Add to welcome section
    elements.welcomeSection.appendChild(returnUserContainer);

    // Attach event listeners to the new buttons
    document.getElementById('view-saved-oriki-btn').addEventListener('click', () => {
        viewSavedOriki(savedOriki);
    });

    document.getElementById('start-fresh-btn').addEventListener('click', () => {
        startFreshJourney();
    });
}

/**
 * Display the saved Oriki in the results section
 * @param {Object} savedOriki - The saved Oriki data
 */
function viewSavedOriki(savedOriki) {
    console.log('Displaying saved Oriki');

    // Hide welcome section, show results section
    showSection(elements.resultsSection);

    // Reconstruct the API response format for displayResults
    const reconstructedResponse = {
        poem: {
            poem_lines: savedOriki.poem,
            cultural_mode: savedOriki.culturalMode
        },
        affirmations: {
            affirmations: savedOriki.affirmations
        },
        themes: savedOriki.themes
    };

    // Use the existing displayResults function
    displayResults(reconstructedResponse);
}

/**
 * Start a fresh quiz journey, clearing saved data
 */
function startFreshJourney() {
    console.log('Starting fresh journey');

    // Clear the saved Oriki from localStorage
    clearSavedOriki();

    // Remove the return user prompt
    const returnUserContainer = document.getElementById('return-user-container');
    if (returnUserContainer) {
        returnUserContainer.remove();
    }

    // Show the normal welcome content again
    const welcomeContent = document.querySelector('.welcome-content');
    if (welcomeContent) {
        welcomeContent.style.display = 'flex';
    }
}

// ============================================================================
// KEYBOARD NAVIGATION - Full keyboard accessibility for quiz
// ============================================================================

/**
 * Set up keyboard navigation for the quiz
 * Enables number keys (1-9), Enter, and Backspace for better accessibility
 */
function setupKeyboardNavigation() {
    // Listen for keydown events on the document
    document.addEventListener('keydown', handleKeyboardNavigation);
}

/**
 * Handle keyboard navigation for quiz questions
 * - Number keys (1-9): Select corresponding option
 * - Enter: Advance to next question or submit
 * - Backspace: Go back to previous question
 */
function handleKeyboardNavigation(event) {
    // Only activate keyboard navigation when quiz section is active
    if (!elements.quizSection.classList.contains('active')) {
        return;
    }

    // Get the current question to determine its type
    const currentQuestion = quizQuestions[quizState.currentQuestionIndex];

    // Don't interfere with text input fields (free-write question, name input)
    const activeElement = document.activeElement;
    const isTextInput = activeElement.tagName === 'TEXTAREA' ||
                       (activeElement.tagName === 'INPUT' && activeElement.type === 'text');

    // For textarea questions, only handle Backspace for navigation if not focused on textarea
    if (currentQuestion.type === 'textarea' && !isTextInput) {
        // Allow Backspace to go back when not in text input
        if (event.key === 'Backspace') {
            event.preventDefault();
            previousQuestion();
            return;
        }
        // Allow Enter to advance if question is valid
        if (event.key === 'Enter' && isCurrentQuestionValid()) {
            event.preventDefault();
            nextQuestion();
            return;
        }
        return;
    }

    // If user is in a text input field, don't intercept their typing
    if (isTextInput) {
        return;
    }

    // Handle number keys (1-9) for option selection
    if (event.key >= '1' && event.key <= '9') {
        event.preventDefault();
        const optionIndex = parseInt(event.key) - 1; // Convert to 0-based index
        selectOptionByIndex(optionIndex);
        return;
    }

    // Handle Enter key to advance to next question or submit
    if (event.key === 'Enter') {
        event.preventDefault();
        if (isCurrentQuestionValid()) {
            nextQuestion();
        }
        return;
    }

    // Handle Backspace key to go back to previous question
    if (event.key === 'Backspace') {
        event.preventDefault();
        previousQuestion();
        return;
    }
}

/**
 * Select an option by its index using keyboard navigation
 * Handles both single-select (radio) and multi-select (checkbox) questions
 */
function selectOptionByIndex(index) {
    const currentQuestion = quizQuestions[quizState.currentQuestionIndex];

    // Get all option cards
    const optionCards = document.querySelectorAll('.option-card');

    // Check if the index is valid
    if (index >= optionCards.length) {
        return; // Index out of range, do nothing
    }

    // Get the corresponding option card and input
    const optionCard = optionCards[index];
    const input = optionCard.querySelector('input[type="radio"], input[type="checkbox"]');

    if (!input) {
        return; // No input found
    }

    // Add visual keyboard focus indicator
    // Remove existing keyboard focus from all cards
    optionCards.forEach(card => card.classList.remove('keyboard-focused'));
    // Add keyboard focus to selected card
    optionCard.classList.add('keyboard-focused');

    // Handle based on question type
    if (currentQuestion.type === 'single-select') {
        // For radio buttons, select this option
        input.checked = true;
        // Trigger the change event to update state
        handleSingleSelectChange(currentQuestion.id, input.value);
    } else if (currentQuestion.type === 'multi-select') {
        // For checkboxes, toggle the selection
        input.checked = !input.checked;
        // Trigger the change event to update state
        handleMultiSelectChange(currentQuestion.id, currentQuestion.maxSelections);
    }

    // Remove keyboard focus after a brief moment for visual feedback
    setTimeout(() => {
        optionCard.classList.remove('keyboard-focused');
    }, 300);
}

// ============================================================================
// SECTION NAVIGATION - Show/hide different sections of the app
// ============================================================================
function showSection(sectionToShow) {
    // Hide all sections first
    const allSections = [
        elements.welcomeSection,
        elements.quizSection,
        elements.resultsSection
    ];

    allSections.forEach(section => {
        section.classList.remove('active');
        section.classList.add('hidden');
    });

    // Show the requested section
    sectionToShow.classList.remove('hidden');
    sectionToShow.classList.add('active');
}

// ============================================================================
// QUIZ FLOW FUNCTIONS
// ============================================================================

// Track navigation direction for animations
let navigationDirection = 'next'; // 'next' or 'prev'

// Start the quiz - called when user clicks "Begin Your Journey"
function startQuiz() {
    // Reset quiz state for a fresh start
    quizState.currentQuestionIndex = 0;
    quizState.answers = {};

    // Show the quiz section
    showSection(elements.quizSection);

    // Render the first question
    renderQuestion(0);
}

// Restart the quiz - called when user clicks "Start Over"
function restartQuiz() {
    // Reset quiz state completely
    quizState.currentQuestionIndex = 0;
    quizState.answers = {};
    quizState.displayName = null;
    navigationDirection = 'next';

    // Reset audio player state
    resetAudioPlayer();

    // Clear any error states
    hideError();
    hideResultsError();

    // Clear loading intervals if any are running
    if (loadingMessageInterval) {
        clearInterval(loadingMessageInterval);
        loadingMessageInterval = null;
    }

    // Cancel any ongoing API requests
    if (currentAbortController) {
        currentAbortController.abort();
        currentAbortController = null;
    }

    // Reset timeout warning flag
    timeoutWarningShown = false;

    // Hide loading overlay if visible
    hideLoadingState();

    // Clear results content
    if (elements.poemLines) {
        elements.poemLines.innerHTML = '';
    }
    if (elements.affirmationsList) {
        elements.affirmationsList.innerHTML = '';
    }

    // Clear saved Oriki from localStorage
    clearSavedOriki();

    // Remove return user prompt if it exists
    const returnUserContainer = document.getElementById('return-user-container');
    if (returnUserContainer) {
        returnUserContainer.remove();
    }

    // Ensure normal welcome content is visible
    const welcomeContent = document.querySelector('.welcome-content');
    if (welcomeContent) {
        welcomeContent.style.display = 'flex';
    }

    // Return to welcome section with smooth transition
    showSection(elements.welcomeSection);

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });

    console.log('Quiz reset complete - returning to welcome screen');
}

// ============================================================================
// QUESTION RENDERING - Display questions based on their type
// ============================================================================
function renderQuestion(index) {
    // Get the current question data
    const question = quizQuestions[index];

    // Add transition animation class based on navigation direction
    const questionContainer = elements.quizSection.querySelector('.question-container');
    if (questionContainer) {
        // Remove any existing animation classes
        questionContainer.classList.remove('question-enter-next', 'question-enter-prev');

        // Add new animation class based on direction
        const animationClass = navigationDirection === 'next' ? 'question-enter-next' : 'question-enter-prev';
        questionContainer.classList.add(animationClass);
    }

    // Update the progress indicators
    updateProgress();

    // Update the question text
    elements.questionText.textContent = question.question;

    // Clear previous answer options
    elements.answerOptions.innerHTML = '';

    // Render different UI based on question type
    if (question.type === 'multi-select') {
        renderMultiSelectQuestion(question);
    } else if (question.type === 'single-select') {
        renderSingleSelectQuestion(question);
    } else if (question.type === 'textarea') {
        renderTextareaQuestion(question);
    }

    // Update navigation button states
    updateNavigationButtons();
}

// Render a multi-select question (checkboxes with max selection limit)
function renderMultiSelectQuestion(question) {
    // Create a container for the checkboxes
    const container = document.createElement('div');
    container.className = 'options-grid';

    // Add instruction text about max selections
    const instruction = document.createElement('p');
    instruction.className = 'selection-instruction';
    instruction.textContent = `Select up to ${question.maxSelections} options`;
    elements.answerOptions.appendChild(instruction);

    // Get previously selected answers (if user is going back)
    const selectedValues = quizState.answers[question.id] || [];

    // Create a checkbox for each option
    question.options.forEach(option => {
        const label = document.createElement('label');
        label.className = 'option-card';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = question.id;
        checkbox.value = option.value;
        checkbox.checked = selectedValues.includes(option.value);

        // Handle checkbox selection with max limit enforcement
        checkbox.addEventListener('change', (e) => {
            handleMultiSelectChange(question.id, question.maxSelections);
        });

        const labelText = document.createElement('span');
        labelText.textContent = option.label;

        label.appendChild(checkbox);
        label.appendChild(labelText);
        container.appendChild(label);
    });

    elements.answerOptions.appendChild(container);
}

// Render a single-select question (radio buttons styled as cards)
function renderSingleSelectQuestion(question) {
    // Create a container for the radio buttons
    const container = document.createElement('div');
    container.className = 'options-grid';

    // Get previously selected answer (if user is going back)
    const selectedValue = quizState.answers[question.id];

    // Create a radio button for each option
    question.options.forEach(option => {
        const label = document.createElement('label');
        label.className = 'option-card';

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = question.id;
        radio.value = option.value;
        radio.checked = selectedValue === option.value;

        // Handle radio button selection
        radio.addEventListener('change', (e) => {
            handleSingleSelectChange(question.id, e.target.value);
        });

        // Create a container for label text and optional description
        const textContainer = document.createElement('span');
        textContainer.className = 'option-text-container';

        const labelText = document.createElement('span');
        labelText.className = 'option-label';
        labelText.textContent = option.label;
        textContainer.appendChild(labelText);

        // Add description if it exists (for cultural_mode question)
        if (option.description) {
            const descText = document.createElement('span');
            descText.className = 'option-description';
            descText.textContent = option.description;
            textContainer.appendChild(descText);
        }

        label.appendChild(radio);
        label.appendChild(textContainer);
        container.appendChild(label);
    });

    elements.answerOptions.appendChild(container);

    // If this is the pronouns question and "name_only" is selected, show name input
    if (question.id === 'pronouns' && selectedValue === 'name_only') {
        renderNameInput();
    }
}

// Render a textarea question (free-form text with character counter)
function renderTextareaQuestion(question) {
    // Create container for textarea and counter
    const container = document.createElement('div');
    container.className = 'textarea-container';

    // Create the textarea element
    const textarea = document.createElement('textarea');
    textarea.id = question.id;
    textarea.name = question.id;
    textarea.placeholder = question.placeholder || '';
    textarea.maxLength = question.maxLength;
    textarea.rows = 8;
    textarea.className = 'free-text-input';

    // Set existing value if user is going back
    textarea.value = quizState.answers[question.id] || '';

    // Create character counter
    const counter = document.createElement('div');
    counter.className = 'character-counter';
    counter.textContent = `${textarea.value.length} / ${question.maxLength} characters`;

    // Update counter and state as user types
    textarea.addEventListener('input', (e) => {
        const currentLength = e.target.value.length;
        counter.textContent = `${currentLength} / ${question.maxLength} characters`;

        // Save the answer to state
        quizState.answers[question.id] = e.target.value;

        // Update navigation buttons (enable/disable Next based on input)
        updateNavigationButtons();
    });

    container.appendChild(textarea);
    container.appendChild(counter);
    elements.answerOptions.appendChild(container);
}

// ============================================================================
// ANSWER HANDLING - Store user selections
// ============================================================================

// Handle multi-select checkbox changes (enforce max selection limit)
function handleMultiSelectChange(questionId, maxSelections) {
    // Get all checked checkboxes for this question
    const checkboxes = document.querySelectorAll(`input[name="${questionId}"]`);
    const selectedValues = [];

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedValues.push(checkbox.value);
        }
    });

    // If user exceeds max selections, uncheck the last one
    if (selectedValues.length > maxSelections) {
        // Find the checkbox that was just checked and uncheck it
        checkboxes.forEach(checkbox => {
            if (checkbox.checked && !selectedValues.slice(0, maxSelections).includes(checkbox.value)) {
                checkbox.checked = false;
            }
        });

        // Update selectedValues to only include allowed selections
        selectedValues.splice(maxSelections);

        // Show a helpful message using styled error
        showError(`You can only select up to ${maxSelections} options.`);
    }

    // Save the selected values to state
    quizState.answers[questionId] = selectedValues;

    // Update navigation buttons
    updateNavigationButtons();
}

// Handle single-select radio button changes
function handleSingleSelectChange(questionId, value) {
    // Save the selected value to state
    quizState.answers[questionId] = value;

    // If this is the pronouns question, handle the name input visibility
    if (questionId === 'pronouns') {
        // Remove existing name input if it exists
        const existingNameInput = document.getElementById('name-only-input-container');
        if (existingNameInput) {
            existingNameInput.remove();
        }

        // If user selected "name_only", show the name input
        if (value === 'name_only') {
            renderNameInput();
        } else {
            // Clear the display name if they changed to a different pronoun option
            quizState.displayName = null;
        }
    }

    // Update navigation buttons
    updateNavigationButtons();
}

// Render the name input field for "name_only" pronoun option
function renderNameInput() {
    // Check if name input already exists to avoid duplicates
    if (document.getElementById('name-only-input-container')) {
        return;
    }

    // Create a container for the name input
    const nameInputContainer = document.createElement('div');
    nameInputContainer.id = 'name-only-input-container';
    nameInputContainer.className = 'name-input-container';

    // Add a label
    const label = document.createElement('label');
    label.htmlFor = 'display-name-input';
    label.textContent = 'What name should we use to celebrate you?';
    label.className = 'name-input-label';

    // Create the text input
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'display-name-input';
    input.name = 'display_name';
    input.placeholder = 'Enter your preferred name';
    input.maxLength = 50;
    input.className = 'name-input-field';

    // Set existing value if user is going back
    if (quizState.displayName) {
        input.value = quizState.displayName;
    }

    // Update state as user types
    input.addEventListener('input', (e) => {
        quizState.displayName = e.target.value.trim();
        // Update navigation buttons (enable/disable Next based on input)
        updateNavigationButtons();
    });

    // Add label and input to container
    nameInputContainer.appendChild(label);
    nameInputContainer.appendChild(input);

    // Add the container to the answer options area
    elements.answerOptions.appendChild(nameInputContainer);

    // Focus the input for better UX
    setTimeout(() => input.focus(), 100);
}

// ============================================================================
// VALIDATION - Check if current question is answered
// ============================================================================
function isCurrentQuestionValid() {
    const currentQuestion = quizQuestions[quizState.currentQuestionIndex];
    const answer = quizState.answers[currentQuestion.id];

    // Check based on question type
    if (currentQuestion.type === 'multi-select') {
        // Must have at least one selection
        return answer && answer.length > 0;
    } else if (currentQuestion.type === 'single-select') {
        // Must have a selection
        const hasSelection = answer !== undefined && answer !== '';

        // If this is the pronouns question and "name_only" is selected,
        // also check that a name has been provided
        if (currentQuestion.id === 'pronouns' && answer === 'name_only') {
            return hasSelection && quizState.displayName && quizState.displayName.length > 0;
        }

        return hasSelection;
    } else if (currentQuestion.type === 'textarea') {
        // Must have some text (at least 10 characters for meaningful input)
        return answer && answer.trim().length >= 10;
    }

    return false;
}

// ============================================================================
// NAVIGATION FUNCTIONS - Move between questions
// ============================================================================

// Move to the next question
function nextQuestion() {
    // Validate current question before proceeding
    if (!isCurrentQuestionValid()) {
        showValidationError();
        return;
    }

    // Set navigation direction for animation
    navigationDirection = 'next';

    // Check if this is the last question
    if (quizState.currentQuestionIndex === quizState.totalQuestions - 1) {
        // Submit the quiz
        submitQuiz();
    } else {
        // Move to next question
        quizState.currentQuestionIndex++;
        renderQuestion(quizState.currentQuestionIndex);
    }
}

// Move to the previous question
function previousQuestion() {
    if (quizState.currentQuestionIndex > 0) {
        // Set navigation direction for animation
        navigationDirection = 'prev';

        quizState.currentQuestionIndex--;
        renderQuestion(quizState.currentQuestionIndex);
    }
}

// ============================================================================
// UI UPDATES - Progress bar and button states
// ============================================================================

// Update the progress bar and question counter
function updateProgress() {
    const current = quizState.currentQuestionIndex + 1; // +1 for display (1-based)
    elements.currentQuestionSpan.textContent = current;

    // Calculate percentage for progress bar
    const percentage = (current / quizState.totalQuestions) * 100;
    elements.progressFill.style.width = `${percentage}%`;
}

// Update navigation button states (enabled/disabled)
function updateNavigationButtons() {
    // Previous button: disabled on first question
    if (quizState.currentQuestionIndex === 0) {
        elements.prevBtn.disabled = true;
    } else {
        elements.prevBtn.disabled = false;
    }

    // Next button: disabled if current question not answered
    if (isCurrentQuestionValid()) {
        elements.nextBtn.disabled = false;

        // Change button text on last question
        if (quizState.currentQuestionIndex === quizState.totalQuestions - 1) {
            elements.nextBtn.textContent = 'Submit';
        } else {
            elements.nextBtn.textContent = 'Next';
        }
    } else {
        elements.nextBtn.disabled = true;
    }
}

// ============================================================================
// VALIDATION ERROR DISPLAY
// ============================================================================
function showValidationError() {
    const currentQuestion = quizQuestions[quizState.currentQuestionIndex];
    let errorMessage = '';

    if (currentQuestion.type === 'multi-select') {
        errorMessage = 'Please select at least one option.';
    } else if (currentQuestion.type === 'single-select') {
        // Check if it's the pronoun question with name_only selected
        if (currentQuestion.id === 'pronouns' && quizState.answers[currentQuestion.id] === 'name_only') {
            errorMessage = 'Please enter your name.';
        } else {
            errorMessage = 'Please select an option.';
        }
    } else if (currentQuestion.type === 'textarea') {
        errorMessage = 'Please write at least 10 characters.';
    }

    // Use styled error message instead of alert
    showError(errorMessage);
}

// ============================================================================
// ERROR HANDLING FUNCTIONS - Show/hide styled error messages
// ============================================================================

/**
 * Show an inline error message at the top of the page
 * This replaces the use of alert() for better UX
 */
function showError(message) {
    // Set the error message text
    elements.errorMessage.textContent = message;

    // Show the error container
    elements.errorContainer.classList.remove('hidden');

    // Scroll to top so user can see the error
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Auto-dismiss after 8 seconds (but user can dismiss earlier)
    setTimeout(() => {
        hideError();
    }, 8000);
}

/**
 * Hide the inline error message
 */
function hideError() {
    elements.errorContainer.classList.add('hidden');
}

/**
 * Show an error in the results section when API calls fail
 * This allows users to retry without losing their quiz progress
 */
function showResultsError(message) {
    // Hide loading overlay
    hideLoadingState();

    // Set the error message
    elements.resultsErrorMessage.textContent = message;

    // Show the error display
    elements.resultsError.classList.remove('hidden');

    // Hide the results content
    elements.resultsSection.querySelector('.results-content').classList.add('hidden');
}

/**
 * Hide the results error and show results content
 */
function hideResultsError() {
    elements.resultsError.classList.add('hidden');
    elements.resultsSection.querySelector('.results-content').classList.remove('hidden');
}

// ============================================================================
// API SERVICE FUNCTIONS - Connect to the backend
// ============================================================================

/**
 * Submit quiz data to the backend API for Oriki generation
 * Includes timeout handling (60 seconds) and cancellation support
 * @param {Object} quizData - The quiz submission matching QuizSubmission schema
 * @returns {Promise<Object>} - API response with poem, affirmations, and themes
 */
async function submitQuizToAPI(quizData) {
    // Create an AbortController to allow request cancellation
    currentAbortController = new AbortController();
    const signal = currentAbortController.signal;

    // Set up timeout (60 seconds)
    const TIMEOUT_MS = 60000;
    const WARNING_MS = 15000; // Show warning after 15 seconds

    // Show cancel button and warning message after 15 seconds
    const warningTimeout = setTimeout(() => {
        if (!timeoutWarningShown) {
            const loadingMessage = elements.loadingOverlay.querySelector('.loading-message');
            if (loadingMessage) {
                loadingMessage.textContent = 'This is taking longer than expected...';
            }
            elements.cancelLoadingBtn.classList.remove('hidden');
            timeoutWarningShown = true;
        }
    }, WARNING_MS);

    // Set up the actual timeout (60 seconds)
    const timeoutId = setTimeout(() => {
        if (currentAbortController) {
            currentAbortController.abort();
        }
    }, TIMEOUT_MS);

    try {
        // Make POST request to the /generate endpoint with timeout signal
        const response = await fetch(`${API_BASE_URL}/api/v1/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(quizData),
            signal: signal
        });

        // Clear the timeout since we got a response
        clearTimeout(timeoutId);
        clearTimeout(warningTimeout);

        // Check if the request was successful
        if (!response.ok) {
            // Try to get error message from response
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || `Server error: ${response.status}. Please try again.`);
        }

        // Parse and return the JSON response
        const data = await response.json();
        return data;

    } catch (error) {
        // Clear timeouts
        clearTimeout(timeoutId);
        clearTimeout(warningTimeout);

        // Log the error for debugging
        console.error('Error submitting quiz to API:', error);

        // Handle different error types
        if (error.name === 'AbortError') {
            throw new Error('Request timed out. The server is taking too long to respond. Please try again.');
        } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
            throw new Error('Cannot connect to the server. Please check your internet connection and try again.');
        }

        // Re-throw the error to be handled by the caller
        throw error;
    } finally {
        // Reset timeout warning flag
        timeoutWarningShown = false;
        elements.cancelLoadingBtn.classList.add('hidden');
    }
}

/**
 * Generate audio from text using the backend TTS API
 * Includes timeout handling (60 seconds)
 * @param {string} text - The text to convert to speech
 * @param {string} voice - The voice to use (default: 'alloy')
 * @returns {Promise<Object>} - API response with audio_base64 and duration_seconds
 */
async function generateAudioFromAPI(text, voice = 'alloy') {
    // Create an AbortController for timeout
    const abortController = new AbortController();
    const signal = abortController.signal;

    // Set up timeout (60 seconds for audio generation)
    const TIMEOUT_MS = 60000;
    const timeoutId = setTimeout(() => {
        abortController.abort();
    }, TIMEOUT_MS);

    try {
        // Make POST request to the /audio endpoint
        const response = await fetch(`${API_BASE_URL}/api/v1/audio`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: text,
                voice: voice
            }),
            signal: signal
        });

        // Clear the timeout
        clearTimeout(timeoutId);

        // Check if the request was successful
        if (!response.ok) {
            // Try to get error message from response
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || `Audio generation failed: ${response.status}`);
        }

        // Parse and return the JSON response
        const data = await response.json();
        return data;

    } catch (error) {
        // Clear timeout
        clearTimeout(timeoutId);

        // Log the error for debugging
        console.error('Error generating audio from API:', error);

        // Handle different error types
        if (error.name === 'AbortError') {
            throw new Error('Audio generation timed out. Please try again.');
        } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
            throw new Error('Cannot connect to the server. Please check your internet connection.');
        }

        // Re-throw the error to be handled by the caller
        throw error;
    }
}

// ============================================================================
// QUIZ SUBMISSION - Collect answers and submit
// ============================================================================
async function submitQuiz() {
    console.log('Quiz submitted! Answers:', quizState.answers);

    // Show the results section with loading state
    showSection(elements.resultsSection);
    showLoadingState();

    // Hide any previous errors
    hideResultsError();

    try {
        // Build the quiz submission object matching the QuizSubmission schema
        // This structure matches what the backend API expects
        const quizSubmission = {
            top_values: quizState.answers.top_values || [],
            greatest_strength: quizState.answers.greatest_strength || '',
            aspirational_trait: quizState.answers.aspirational_trait || '',
            metaphor_archetype: quizState.answers.metaphor_archetype || '',
            energy_style: quizState.answers.energy_style || '',
            life_focus: quizState.answers.life_focus || '',
            cultural_mode: quizState.answers.cultural_mode || '',
            pronouns: quizState.answers.pronouns || '',
            display_name: quizState.displayName || null,
            free_write_letter: quizState.answers.free_write_letter || ''
        };

        // Store the submission for potential regeneration
        quizState.lastSubmission = quizSubmission;

        console.log('Sending quiz data to API:', quizSubmission);

        // Call the API to generate the Oriki
        const response = await submitQuizToAPI(quizSubmission);

        console.log('Received response from API:', response);

        // Display the results
        displayResults(response);

    } catch (error) {
        console.error('Failed to submit quiz:', error);

        // Show user-friendly error message in results section
        const errorMessage = error.message || 'An unexpected error occurred. Please try again.';
        showResultsError(errorMessage);
    }
}

// ============================================================================
// LOADING STATE - Show/hide loading overlay with rotating messages
// ============================================================================
function showLoadingState() {
    // Show the loading overlay
    elements.loadingOverlay.classList.remove('hidden');
    elements.loadingOverlay.classList.add('active');

    // Start with the first message
    const loadingMessageElement = elements.loadingOverlay.querySelector('.loading-message');
    let currentMessageIndex = 0;
    if (loadingMessageElement) {
        loadingMessageElement.textContent = loadingMessages[currentMessageIndex];
    }

    // Rotate through messages every 3.5 seconds
    loadingMessageInterval = setInterval(() => {
        currentMessageIndex = (currentMessageIndex + 1) % loadingMessages.length;
        if (loadingMessageElement) {
            // Add a subtle fade effect when changing messages
            loadingMessageElement.style.opacity = '0.5';
            setTimeout(() => {
                loadingMessageElement.textContent = loadingMessages[currentMessageIndex];
                loadingMessageElement.style.opacity = '1';
            }, 200);
        }
    }, 3500); // Change message every 3.5 seconds
}

function hideLoadingState() {
    // Clear the message rotation interval
    if (loadingMessageInterval) {
        clearInterval(loadingMessageInterval);
        loadingMessageInterval = null;
    }

    // Reset message opacity
    const loadingMessageElement = elements.loadingOverlay.querySelector('.loading-message');
    if (loadingMessageElement) {
        loadingMessageElement.style.opacity = '1';
    }

    // Hide the loading overlay with a smooth transition
    elements.loadingOverlay.classList.remove('active');
    elements.loadingOverlay.classList.add('hidden');
}

// ============================================================================
// RESULTS DISPLAY - Populate and show the generated Oriki results
// ============================================================================
function displayResults(data) {
    try {
        // Validate the API response structure
        if (!data || typeof data !== 'object') {
            throw new Error('Invalid response from server. Please try again.');
        }

        if (!data.poem || !data.affirmations) {
            throw new Error('Incomplete response from server. Please try again.');
        }

        // Extract data from the API response with validation
        const poemLines = data.poem.poem_lines || [];
        const culturalMode = data.poem.cultural_mode || 'secular';
        const affirmations = data.affirmations.affirmations || [];

        // Validate that we have content
        if (poemLines.length === 0) {
            throw new Error('No poem was generated. Please try again.');
        }

        if (affirmations.length === 0) {
            console.warn('No affirmations were generated');
        }

        // Hide the loading state
        hideLoadingState();

        // Make sure results content is visible
        hideResultsError();

        // Populate poem lines
        elements.poemLines.innerHTML = ''; // Clear any existing content
        poemLines.forEach(line => {
            // Skip empty lines
            if (!line || line.trim() === '') {
                return;
            }

            const lineElement = document.createElement('p');
            lineElement.className = 'poem-line';
            lineElement.textContent = line;
            elements.poemLines.appendChild(lineElement);
        });

        // Populate affirmations list
        elements.affirmationsList.innerHTML = ''; // Clear any existing content
        if (affirmations.length > 0) {
            affirmations.forEach(affirmation => {
                // Skip empty affirmations
                if (!affirmation || affirmation.trim() === '') {
                    return;
                }

                const listItem = document.createElement('li');
                listItem.className = 'affirmation-item';
                listItem.textContent = affirmation;
                elements.affirmationsList.appendChild(listItem);
            });
        } else {
            // Show a message if no affirmations
            const noAffirmationsMessage = document.createElement('li');
            noAffirmationsMessage.className = 'affirmation-item';
            noAffirmationsMessage.textContent = 'Your Oriki speaks for itself. Let its words guide you.';
            elements.affirmationsList.appendChild(noAffirmationsMessage);
        }

        // Display cultural disclaimer based on cultural mode
        displayCulturalInfo(culturalMode);

        // Update tradition button states to highlight the current tradition
        updateTraditionButtonStates(culturalMode);

        // Save the Oriki to localStorage for returning users
        saveOrikiToStorage(data);

        // Log results for debugging
        console.log('Results displayed:', {
            poemLineCount: poemLines.length,
            affirmationCount: affirmations.length,
            culturalMode: culturalMode
        });

    } catch (error) {
        console.error('Error displaying results:', error);
        // Show error in results section
        showResultsError(error.message || 'Failed to display your Oriki. Please try again.');
    }
}

// ============================================================================
// CULTURAL INFO DISPLAY - Show appropriate context based on cultural mode
// ============================================================================
function displayCulturalInfo(culturalMode) {
    // Get the cultural info for this mode
    const modeInfo = culturalModeInfo[culturalMode];

    if (!modeInfo) {
        // If mode info doesn't exist, hide the disclaimer
        elements.culturalDisclaimer.classList.add('hidden');
        console.warn('No cultural info found for mode:', culturalMode);
        return;
    }

    // Build the cultural disclaimer HTML
    let disclaimerHTML = `<h4>${modeInfo.title}</h4>`;

    // Add description
    disclaimerHTML += `<p class="cultural-description">${modeInfo.description}</p>`;

    // Add "What This Is" section
    disclaimerHTML += `<p class="cultural-section"><strong>What This Is:</strong><br>${modeInfo.whatItIs}</p>`;

    // Add "What This Is NOT" section
    if (modeInfo.whatItIsNot && modeInfo.whatItIsNot.length > 0) {
        disclaimerHTML += `<p class="cultural-section"><strong>What This Is NOT:</strong></p>`;
        disclaimerHTML += '<ul class="cultural-list">';
        modeInfo.whatItIsNot.forEach(item => {
            disclaimerHTML += `<li>${item}</li>`;
        });
        disclaimerHTML += '</ul>';
    }

    // Add commitment section
    disclaimerHTML += `<p class="cultural-commitment"><strong>Our Cultural Commitment:</strong><br>${modeInfo.commitment}</p>`;

    // Set the HTML content
    elements.culturalDisclaimer.innerHTML = disclaimerHTML;

    // Always show the disclaimer (it's now contextual for all modes)
    elements.culturalDisclaimer.classList.remove('hidden');
}

// ============================================================================
// AUDIO PLAYER FUNCTIONALITY
// ============================================================================

// Global variable to store current poem and affirmations for audio generation
let currentPoemText = '';
let currentAffirmationsText = '';

// Handle the Generate Audio button click
function handleGenerateAudio() {
    // Get the current poem lines
    const poemLines = Array.from(elements.poemLines.children)
        .map(el => el.textContent)
        .join('\n');

    // Get the current affirmations
    const affirmations = Array.from(elements.affirmationsList.children)
        .map(el => el.textContent)
        .join('\n');

    // Call the main generate audio function
    generateAudio(poemLines, affirmations);
}

// Main function to generate audio from poem and affirmations
async function generateAudio(poemLines, affirmations) {
    // Validate inputs
    if (!poemLines || poemLines.trim() === '') {
        showError('No poem text available for audio generation.');
        return;
    }

    // Store the text for later use
    currentPoemText = poemLines;
    currentAffirmationsText = affirmations;

    // Combine poem and affirmations into a single text
    const fullText = `${poemLines}\n\n${affirmations}`;

    // Hide the generate button and show loading state
    elements.generateAudioBtn.classList.add('hidden');
    elements.audioLoading.classList.remove('hidden');

    try {
        // Call the API to generate audio from the text
        // Using the 'alloy' voice which is warm and pleasant
        const response = await generateAudioFromAPI(fullText, 'alloy');

        console.log('Audio generated successfully. Duration:', response.duration_seconds, 'seconds');

        // Validate the response
        if (!response.audio_base64) {
            throw new Error('No audio data received from server.');
        }

        // Convert base64 audio to a data URL and set it as the audio source
        const audioDataUrl = `data:audio/mpeg;base64,${response.audio_base64}`;
        elements.audioElement.src = audioDataUrl;

        // Hide loading state
        elements.audioLoading.classList.add('hidden');

        // Show the audio player
        elements.audioPlayer.classList.remove('hidden');

        console.log('Audio player ready');

    } catch (error) {
        console.error('Error generating audio:', error);

        // Hide loading and show generate button again
        elements.audioLoading.classList.add('hidden');
        elements.generateAudioBtn.classList.remove('hidden');

        // Show user-friendly error message using styled error
        const errorMessage = error.message || 'Failed to generate audio. Please try again.';
        showError(errorMessage);
    }
}

// Toggle play/pause for the audio
function togglePlayPause() {
    const audio = elements.audioElement;
    const playIcon = elements.playPauseBtn.querySelector('.play-icon');
    const pauseIcon = elements.playPauseBtn.querySelector('.pause-icon');

    // Check if audio is currently playing
    if (audio.paused) {
        // Play the audio
        audio.play();

        // Swap icons: hide play, show pause
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');

        console.log('Audio playing');
    } else {
        // Pause the audio
        audio.pause();

        // Swap icons: show play, hide pause
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');

        console.log('Audio paused');
    }
}

// Download the audio file
function downloadAudio() {
    const audio = elements.audioElement;

    // Check if audio source is available
    if (!audio.src) {
        showError('No audio available to download. Please generate audio first.');
        return;
    }

    try {
        // Create a temporary link element to trigger download
        const link = document.createElement('a');
        link.href = audio.src;
        link.download = 'my-oriki-audio.mp3'; // Default filename
        link.style.display = 'none';

        // Append to body, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        console.log('Audio download triggered');
    } catch (error) {
        console.error('Error downloading audio:', error);
        showError('Failed to download audio. Please try again.');
    }
}

// Reset audio player when starting over
function resetAudioPlayer() {
    // Hide audio player and show generate button
    elements.audioPlayer.classList.add('hidden');
    elements.audioLoading.classList.add('hidden');
    elements.generateAudioBtn.classList.remove('hidden');

    // Stop and reset audio
    const audio = elements.audioElement;
    audio.pause();
    audio.currentTime = 0;
    audio.src = '';

    // Reset play/pause icons
    const playIcon = elements.playPauseBtn.querySelector('.play-icon');
    const pauseIcon = elements.playPauseBtn.querySelector('.pause-icon');
    playIcon.classList.remove('hidden');
    pauseIcon.classList.add('hidden');

    // Clear stored text
    currentPoemText = '';
    currentAffirmationsText = '';
}

// ============================================================================
// SHARE FUNCTIONALITY - Share the Oriki (placeholder)
// ============================================================================
function shareOriki() {
    // Get the poem lines and first affirmation
    const poemLines = Array.from(elements.poemLines.children)
        .map(el => el.textContent)
        .join('\n');

    const firstAffirmation = elements.affirmationsList.children[0]?.textContent || '';

    // Create share text with poem and a sample affirmation
    const shareText = `My Oriki (Praise Poetry):\n\n${poemLines}\n\n"${firstAffirmation}"`;

    // Try to use the Web Share API if available (modern browsers)
    if (navigator.share) {
        navigator.share({
            title: 'My Oriki',
            text: shareText,
            url: window.location.href
        }).then(() => {
            console.log('Shared successfully');
        }).catch((error) => {
            console.log('Error sharing:', error);
            fallbackShare(shareText);
        });
    } else {
        // Fallback: copy to clipboard
        fallbackShare(shareText);
    }
}

// Fallback share function - copy to clipboard
function fallbackShare(text) {
    // Create a temporary textarea to copy text
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();

    try {
        document.execCommand('copy');
        showError('Oriki copied to clipboard! Share it with your friends.');
    } catch (err) {
        console.error('Failed to copy:', err);
        showError('Unable to copy. Please manually select and copy your Oriki text.');
    }

    document.body.removeChild(textarea);
}

// ============================================================================
// COPY POEM TO CLIPBOARD - Copy the generated poem text
// ============================================================================

/**
 * Copy the poem text to the user's clipboard
 * Shows a temporary "Copied!" feedback message
 */
async function copyPoemToClipboard() {
    // Get all poem lines from the DOM
    const poemLines = Array.from(elements.poemLines.children)
        .map(el => el.textContent)
        .join('\n');

    // Check if there's actually poem content to copy
    if (!poemLines || poemLines.trim() === '') {
        showError('No poem available to copy.');
        return;
    }

    try {
        // Use the modern Clipboard API to copy text
        await navigator.clipboard.writeText(poemLines);

        // Show success feedback by temporarily changing the button text
        const originalText = elements.copyPoemBtn.textContent;
        elements.copyPoemBtn.textContent = 'Copied!';
        elements.copyPoemBtn.disabled = true;

        // Reset the button after 2 seconds
        setTimeout(() => {
            elements.copyPoemBtn.textContent = originalText;
            elements.copyPoemBtn.disabled = false;
        }, 2000);

        console.log('Poem copied to clipboard');

    } catch (error) {
        console.error('Failed to copy poem:', error);

        // Fallback to the older execCommand method if Clipboard API fails
        fallbackCopyPoem(poemLines);
    }
}

/**
 * Fallback method for copying poem text (for older browsers)
 * Uses the deprecated but widely-supported execCommand
 */
function fallbackCopyPoem(text) {
    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();

    try {
        // Execute the copy command
        document.execCommand('copy');

        // Show success feedback
        const originalText = elements.copyPoemBtn.textContent;
        elements.copyPoemBtn.textContent = 'Copied!';
        elements.copyPoemBtn.disabled = true;

        setTimeout(() => {
            elements.copyPoemBtn.textContent = originalText;
            elements.copyPoemBtn.disabled = false;
        }, 2000);

        console.log('Poem copied using fallback method');
    } catch (err) {
        console.error('Fallback copy failed:', err);
        showError('Unable to copy. Please manually select and copy your poem.');
    }

    // Remove the temporary textarea
    document.body.removeChild(textarea);
}

// ============================================================================
// REGENERATE ORIKI - Generate a new variation with same quiz answers
// ============================================================================

/**
 * Regenerate the Oriki using the same quiz answers
 * This gives users a fresh variation without retaking the quiz
 */
async function regenerateOriki() {
    console.log('Regenerating Oriki with same answers...');

    // Check if we have a previous submission stored
    if (!quizState.lastSubmission) {
        showError('No quiz data available to regenerate. Please take the quiz first.');
        return;
    }

    // Show loading state
    showLoadingState();

    // Hide any previous errors
    hideResultsError();

    // Reset audio player before regenerating
    resetAudioPlayer();

    try {
        // Re-submit the same quiz data to get a new variation
        const response = await submitQuizToAPI(quizState.lastSubmission);

        console.log('Received regenerated response from API:', response);

        // Display the new results
        displayResults(response);

    } catch (error) {
        console.error('Failed to regenerate Oriki:', error);

        // Show user-friendly error message
        const errorMessage = error.message || 'Failed to regenerate your Oriki. Please try again.';
        showResultsError(errorMessage);
    }
}

// ============================================================================
// TRADITION SWITCHER - Switch between cultural modes
// ============================================================================

/**
 * Attach click handlers to all tradition switcher buttons
 * This is called once during initialization
 */
function attachTraditionSwitcherListeners() {
    // Get all tradition buttons
    const traditionButtons = document.querySelectorAll('.tradition-btn');

    // Attach click handler to each button
    traditionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const newMode = button.getAttribute('data-mode');
            switchTradition(newMode);
        });
    });
}

/**
 * Switch to a different cultural tradition without retaking the quiz
 * @param {string} newMode - The new cultural mode to switch to
 */
async function switchTradition(newMode) {
    console.log('Switching to tradition:', newMode);

    // Check if we have a previous submission stored
    if (!quizState.lastSubmission) {
        showError('No quiz data available. Please take the quiz first.');
        return;
    }

    // Check if the user is already viewing this tradition
    if (quizState.lastSubmission.cultural_mode === newMode) {
        console.log('Already viewing this tradition');
        return;
    }

    // Show loading state
    showLoadingState();

    // Hide any previous errors
    hideResultsError();

    // Reset audio player before switching traditions
    resetAudioPlayer();

    try {
        // Create a new submission with the updated cultural mode
        const updatedSubmission = {
            ...quizState.lastSubmission,
            cultural_mode: newMode
        };

        // Store the updated submission for future regenerations
        quizState.lastSubmission = updatedSubmission;

        // Call the API to generate the Oriki in the new tradition
        const response = await submitQuizToAPI(updatedSubmission);

        console.log('Received response for new tradition:', response);

        // Display the new results
        displayResults(response);

        // Update the active button state
        updateTraditionButtonStates(newMode);

    } catch (error) {
        console.error('Failed to switch tradition:', error);

        // Show user-friendly error message
        const errorMessage = error.message || 'Failed to switch tradition. Please try again.';
        showResultsError(errorMessage);
    }
}

/**
 * Update the visual state of tradition buttons
 * Mark the current tradition as active and disable it
 * @param {string} currentMode - The currently displayed cultural mode
 */
function updateTraditionButtonStates(currentMode) {
    // Get all tradition buttons
    const traditionButtons = document.querySelectorAll('.tradition-btn');

    // Update each button
    traditionButtons.forEach(button => {
        const buttonMode = button.getAttribute('data-mode');

        if (buttonMode === currentMode) {
            // Mark this button as active (current tradition)
            button.classList.add('active');
        } else {
            // Remove active state from other buttons
            button.classList.remove('active');
        }
    });
}

// ============================================================================
// ERROR RECOVERY FUNCTIONS - Allow users to retry after errors
// ============================================================================

/**
 * Retry the quiz submission after an error
 * This keeps the user's answers and just retries the API call
 */
function retryQuizSubmission() {
    console.log('Retrying quiz submission...');

    // Hide the error display
    hideResultsError();

    // Show loading state
    showLoadingState();

    // Resubmit the quiz with existing answers
    submitQuiz();
}

/**
 * Go back to the quiz after an error
 * This allows users to review/change their answers
 */
function goBackToQuiz() {
    console.log('Going back to quiz...');

    // Go back to the last question
    quizState.currentQuestionIndex = quizState.totalQuestions - 1;

    // Show quiz section
    showSection(elements.quizSection);

    // Render the last question
    renderQuestion(quizState.currentQuestionIndex);
}

/**
 * Cancel the current API request
 * This allows users to stop a long-running request
 */
function cancelAPIRequest() {
    console.log('Cancelling API request...');

    // Abort the current request
    if (currentAbortController) {
        currentAbortController.abort();
        currentAbortController = null;
    }

    // Hide loading overlay
    hideLoadingState();

    // Show error message
    showResultsError('Request cancelled. You can try again when you\'re ready.');
}

// ============================================================================
// START THE APP - Run initialization when page loads
// ============================================================================
// This ensures the DOM is fully loaded before we try to access elements
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    // DOM is already loaded
    initializeApp();
}
