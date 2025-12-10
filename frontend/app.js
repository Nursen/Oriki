// ============================================================================
// ORIKI QUIZ APPLICATION - Frontend JavaScript
// ============================================================================
// This file handles the quiz UI, state management, and user interactions.
// It's designed to be educational and easy to understand for beginners.

// ============================================================================
// API CONFIGURATION - Backend API endpoint
// ============================================================================
// DEPLOYMENT GUIDE:
// 1. For LOCAL DEVELOPMENT: Use localhost (current setting)
// 2. For PRODUCTION: Replace with your Render backend URL after deploying
//    Example: const API_BASE_URL = 'https://oriki-api.onrender.com';
//
// IMPORTANT: Update this URL after deploying backend to Render!
const API_BASE_URL = 'http://localhost:8000';
// Production: const API_BASE_URL = 'https://oriki-api.onrender.com';

// ============================================================================
// QUIZ DATA - Hardcoded questions (will fetch from API later)
// ============================================================================
const quizQuestions = [
    {
        id: 'top_values',
        type: 'multi-select',
        maxSelections: 3,
        question: 'What values matter most to you? (Select up to 3)',
        options: [
            { value: 'wisdom', label: 'Wisdom' },
            { value: 'courage', label: 'Courage' },
            { value: 'compassion', label: 'Compassion' },
            { value: 'integrity', label: 'Integrity' },
            { value: 'creativity', label: 'Creativity' },
            { value: 'community', label: 'Community' },
            { value: 'leadership', label: 'Leadership' },
            { value: 'spirituality', label: 'Spirituality' }
        ]
    },
    {
        id: 'greatest_strength',
        type: 'single-select',
        question: 'What is your greatest strength?',
        options: [
            { value: 'resilience', label: 'Resilience - I bounce back from challenges' },
            { value: 'insight', label: 'Insight - I see what others miss' },
            { value: 'empathy', label: 'Empathy - I understand and feel with others' },
            { value: 'determination', label: 'Determination - I never give up' },
            { value: 'vision', label: 'Vision - I see possibilities and future paths' }
        ]
    },
    {
        id: 'aspirational_trait',
        type: 'single-select',
        question: 'What quality do you most aspire to develop?',
        options: [
            { value: 'patience', label: 'Patience' },
            { value: 'boldness', label: 'Boldness' },
            { value: 'wisdom', label: 'Wisdom' },
            { value: 'grace', label: 'Grace' },
            { value: 'strength', label: 'Strength' }
        ]
    },
    {
        id: 'metaphor_archetype',
        type: 'single-select',
        question: 'Which natural element resonates with you most?',
        options: [
            { value: 'mountain', label: 'Mountain - Steadfast and enduring' },
            { value: 'river', label: 'River - Flowing and adaptive' },
            { value: 'fire', label: 'Fire - Passionate and transformative' },
            { value: 'tree', label: 'Tree - Rooted and growing' },
            { value: 'wind', label: 'Wind - Free and influential' }
        ]
    },
    {
        id: 'energy_style',
        type: 'single-select',
        question: 'How do you approach challenges?',
        options: [
            { value: 'contemplative', label: 'I reflect deeply before acting' },
            { value: 'assertive', label: 'I take direct, decisive action' },
            { value: 'collaborative', label: 'I gather others and work together' },
            { value: 'innovative', label: 'I find creative, new solutions' }
        ]
    },
    {
        id: 'life_focus',
        type: 'single-select',
        question: 'What brings you the most fulfillment?',
        options: [
            { value: 'learning', label: 'Learning and growing in knowledge' },
            { value: 'creating', label: 'Creating and building things' },
            { value: 'serving', label: 'Serving and helping others' },
            { value: 'exploring', label: 'Exploring and experiencing life' },
            { value: 'connecting', label: 'Connecting deeply with others' }
        ]
    },
    {
        id: 'cultural_mode',
        type: 'single-select',
        question: 'How do you relate to tradition and innovation?',
        options: [
            { value: 'traditional', label: 'I honor and preserve what came before' },
            { value: 'balanced', label: 'I blend the old with the new' },
            { value: 'progressive', label: 'I forge new paths forward' }
        ]
    },
    {
        id: 'free_write_letter',
        type: 'textarea',
        maxLength: 2000,
        question: 'In your own words, what do you hope your legacy will be? What do you want to be remembered for?',
        placeholder: 'Share your thoughts about how you want to impact the world and be remembered...'
    }
];

// ============================================================================
// STATE MANAGEMENT - Store quiz state in a simple object
// ============================================================================
const quizState = {
    currentQuestionIndex: 0,  // Which question we're on (0-based)
    answers: {},               // Object to store all user answers
    totalQuestions: quizQuestions.length
};

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

    // Quiz elements
    questionText: document.getElementById('question-text'),
    answerOptions: document.getElementById('answer-options'),
    currentQuestionSpan: document.getElementById('current-question'),
    totalQuestionsSpan: document.getElementById('total-questions'),
    progressFill: document.getElementById('progress-fill'),

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

    // Attach audio player event listeners
    elements.generateAudioBtn.addEventListener('click', handleGenerateAudio);
    elements.playPauseBtn.addEventListener('click', togglePlayPause);
    elements.downloadAudioBtn.addEventListener('click', downloadAudio);

    console.log('Oriki Quiz app initialized successfully');
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

// Restart the quiz - called when user clicks "Take Quiz Again"
function restartQuiz() {
    // Reset everything and go back to welcome
    quizState.currentQuestionIndex = 0;
    quizState.answers = {};

    // Reset audio player state
    resetAudioPlayer();

    showSection(elements.welcomeSection);
}

// ============================================================================
// QUESTION RENDERING - Display questions based on their type
// ============================================================================
function renderQuestion(index) {
    // Get the current question data
    const question = quizQuestions[index];

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

        const labelText = document.createElement('span');
        labelText.textContent = option.label;

        label.appendChild(radio);
        label.appendChild(labelText);
        container.appendChild(label);
    });

    elements.answerOptions.appendChild(container);
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

        // Show a helpful message
        alert(`You can only select up to ${maxSelections} options.`);
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

    // Update navigation buttons
    updateNavigationButtons();
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
        return answer !== undefined && answer !== '';
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
        errorMessage = 'Please select an option.';
    } else if (currentQuestion.type === 'textarea') {
        errorMessage = 'Please write at least 10 characters.';
    }

    // Simple alert for now (could be styled better later)
    alert(errorMessage);
}

// ============================================================================
// API SERVICE FUNCTIONS - Connect to the backend
// ============================================================================

/**
 * Submit quiz data to the backend API for Oriki generation
 * @param {Object} quizData - The quiz submission matching QuizSubmission schema
 * @returns {Promise<Object>} - API response with poem, affirmations, and themes
 */
async function submitQuizToAPI(quizData) {
    try {
        // Make POST request to the /generate endpoint
        const response = await fetch(`${API_BASE_URL}/api/v1/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(quizData)
        });

        // Check if the request was successful
        if (!response.ok) {
            // Try to get error message from response
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || `API error: ${response.status}`);
        }

        // Parse and return the JSON response
        const data = await response.json();
        return data;

    } catch (error) {
        // Log the error for debugging
        console.error('Error submitting quiz to API:', error);

        // Check for network errors vs API errors
        if (error.message.includes('Failed to fetch')) {
            throw new Error('Cannot connect to the server. Please make sure the backend is running.');
        }

        // Re-throw the error to be handled by the caller
        throw error;
    }
}

/**
 * Generate audio from text using the backend TTS API
 * @param {string} text - The text to convert to speech
 * @param {string} voice - The voice to use (default: 'alloy')
 * @returns {Promise<Object>} - API response with audio_base64 and duration_seconds
 */
async function generateAudioFromAPI(text, voice = 'alloy') {
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
            })
        });

        // Check if the request was successful
        if (!response.ok) {
            // Try to get error message from response
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || `API error: ${response.status}`);
        }

        // Parse and return the JSON response
        const data = await response.json();
        return data;

    } catch (error) {
        // Log the error for debugging
        console.error('Error generating audio from API:', error);

        // Check for network errors vs API errors
        if (error.message.includes('Failed to fetch')) {
            throw new Error('Cannot connect to the server. Please make sure the backend is running.');
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
            free_write_letter: quizState.answers.free_write_letter || ''
        };

        console.log('Sending quiz data to API:', quizSubmission);

        // Call the API to generate the Oriki
        const response = await submitQuizToAPI(quizSubmission);

        console.log('Received response from API:', response);

        // Display the results
        displayResults(response);

    } catch (error) {
        // Hide loading state
        hideLoadingState();

        // Show user-friendly error message
        const errorMessage = error.message || 'An unexpected error occurred. Please try again.';
        alert(`Error: ${errorMessage}`);

        console.error('Failed to submit quiz:', error);

        // Optionally, go back to the last question so user can try again
        // Or stay on results page with an error message
    }
}

// ============================================================================
// LOADING STATE - Show/hide loading overlay
// ============================================================================
function showLoadingState() {
    // Show the loading overlay
    elements.loadingOverlay.classList.remove('hidden');
    elements.loadingOverlay.classList.add('active');
}

function hideLoadingState() {
    // Hide the loading overlay with a smooth transition
    elements.loadingOverlay.classList.remove('active');
    elements.loadingOverlay.classList.add('hidden');
}

// ============================================================================
// RESULTS DISPLAY - Populate and show the generated Oriki results
// ============================================================================
function displayResults(data) {
    // Hide the loading state
    hideLoadingState();

    // Extract data from the API response
    const poemLines = data.poem.poem_lines;
    const culturalMode = data.poem.cultural_mode;
    const affirmations = data.affirmations.affirmations;

    // Populate poem lines
    elements.poemLines.innerHTML = ''; // Clear any existing content
    poemLines.forEach(line => {
        const lineElement = document.createElement('p');
        lineElement.className = 'poem-line';
        lineElement.textContent = line;
        elements.poemLines.appendChild(lineElement);
    });

    // Populate affirmations list
    elements.affirmationsList.innerHTML = ''; // Clear any existing content
    affirmations.forEach(affirmation => {
        const listItem = document.createElement('li');
        listItem.className = 'affirmation-item';
        listItem.textContent = affirmation;
        elements.affirmationsList.appendChild(listItem);
    });

    // Show cultural disclaimer if in Yoruba mode
    if (culturalMode === 'yoruba') {
        elements.culturalDisclaimer.classList.remove('hidden');
    } else {
        elements.culturalDisclaimer.classList.add('hidden');
    }

    // Log results for debugging
    console.log('Results displayed:', {
        poemLineCount: poemLines.length,
        affirmationCount: affirmations.length,
        culturalMode: culturalMode
    });
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

        // Show user-friendly error message
        const errorMessage = error.message || 'Failed to generate audio. Please try again.';
        alert(`Error: ${errorMessage}`);
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
        alert('No audio available to download.');
        return;
    }

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
        alert('Oriki copied to clipboard! Share it with your friends.');
    } catch (err) {
        console.error('Failed to copy:', err);
        alert('Unable to copy. Please manually copy your Oriki.');
    }

    document.body.removeChild(textarea);
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
