"""
Theme Extractor Agent - LangChain Implementation

This agent analyzes quiz responses and free-write letters to extract
meaningful themes, values, and insights for poetry generation.

Uses LangChain with PydanticOutputParser to ensure
reliable, validated data extraction.
"""

from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain.output_parsers import PydanticOutputParser

# Import our models
from backend.models.theme import ThemeData
from backend.models.quiz import QuizSubmission

# Import settings for API key configuration
from backend.config import settings


# Initialize the parser with our ThemeData model
parser = PydanticOutputParser(pydantic_object=ThemeData)


# ============================================================================
# PROMPT TEMPLATE
# ============================================================================
# This prompt guides the LLM to extract themes thoughtfully and accurately

THEME_EXTRACTION_PROMPT = ChatPromptTemplate.from_template("""
You are a thoughtful analyst helping to extract meaningful themes from personal reflections.

Analyze the following quiz responses and free-write letter to identify core themes, values, and emotional patterns.

QUIZ RESPONSES:
- Top Values: {top_values}
- Greatest Strength: {greatest_strength}
- Aspirational Trait: {aspirational_trait}
- Metaphor/Archetype: {metaphor_archetype}
- Energy Style: {energy_style}
- Life Focus: {life_focus}
- Cultural Mode: {cultural_mode}

FREE-WRITE LETTER:
{free_write_letter}

Your task is to deeply analyze these responses and extract:

1. VALUES: Identify 3-7 core values that emerge from their responses. Look beyond the stated values to find implicit ones in the letter.

2. EMOTIONAL_TONE: Determine the primary emotional quality (1-3 words). Is it hopeful? Determined? Reflective? Resilient? Consider both the quiz and letter.

3. METAPHORS: Suggest 2-5 nature-based or universal metaphors that resonate with their journey and identity. Build on their chosen archetype but expand it.

4. IDENTITY_MARKERS: List 3-5 key identity descriptors - how they see themselves or aspire to be seen (e.g., "helper", "creator", "seeker").

5. ASPIRATIONS: Identify 2-5 future goals, dreams, or aspirations from the letter and quiz responses.

6. STRENGTHS: Recognize 3-5 strengths and positive qualities, including both stated and implied ones.

7. KEY_THEMES: Synthesize 3-5 overarching themes that tie together their values, strengths, and story. These should be brief phrases that capture the essence of their journey.

Be authentic and specific to this individual. Extract themes from both explicit statements and implicit patterns.

{format_instructions}
""").partial(format_instructions=parser.get_format_instructions())


# ============================================================================
# AGENT CREATION FUNCTION
# ============================================================================

def create_theme_extractor():
    """
    Creates a Theme Extractor agent with structured output.

    Returns:
        A LangChain chain that takes quiz data and returns ThemeData.

    The chain uses:
    - ChatOpenAI with gpt-4o-mini for cost-effective analysis
    - PydanticOutputParser to ensure data matches our ThemeData model
    - Temperature of 0.7 for balanced creativity and consistency
    """

    # Initialize the LLM
    llm = ChatOpenAI(
        model="gpt-4o-mini",  # Cost-effective model suitable for extraction tasks
        temperature=0.7,  # Balanced: creative insights but consistent structure
        api_key=settings.OPENAI_API_KEY  # Load API key from settings
    )

    # Create the chain: prompt -> LLM -> parser
    # The pipe operator (|) chains the components together
    chain = THEME_EXTRACTION_PROMPT | llm | parser

    return chain


# ============================================================================
# MAIN EXTRACTION FUNCTION
# ============================================================================

async def extract_themes(quiz: QuizSubmission) -> ThemeData:
    """
    Extracts themes from a completed quiz submission.

    This is the main function you'll call to analyze user responses.
    It takes the quiz data, sends it to the LLM, and returns structured themes.

    Args:
        quiz: A validated QuizSubmission object containing all user responses

    Returns:
        ThemeData: Structured themes, values, and insights extracted from the quiz

    Example:
        themes = await extract_themes(user_quiz)
        print(themes.emotional_tone)  # "hopeful and determined"
        print(themes.values)  # ["integrity", "compassion", "wisdom"]
    """

    # Create the theme extractor chain
    extractor = create_theme_extractor()

    # Prepare the input data by unpacking the quiz fields
    # This matches the variables in our prompt template
    input_data = {
        "top_values": ", ".join(quiz.top_values),
        "greatest_strength": quiz.greatest_strength,
        "aspirational_trait": quiz.aspirational_trait,
        "metaphor_archetype": quiz.metaphor_archetype,
        "energy_style": quiz.energy_style,
        "life_focus": quiz.life_focus,
        "cultural_mode": quiz.cultural_mode,
        "free_write_letter": quiz.free_write_letter
    }

    # Invoke the chain asynchronously
    # The LLM will analyze the input and return a validated ThemeData object
    result = await extractor.ainvoke(input_data)

    return result


# ============================================================================
# ALTERNATIVE: SYNCHRONOUS VERSION (if needed)
# ============================================================================

def extract_themes_sync(quiz: QuizSubmission) -> ThemeData:
    """
    Synchronous version of extract_themes.

    Use this if you're not in an async context.
    For FastAPI endpoints, prefer the async version above.

    Args:
        quiz: A validated QuizSubmission object

    Returns:
        ThemeData: Structured themes extracted from the quiz
    """

    extractor = create_theme_extractor()

    input_data = {
        "top_values": ", ".join(quiz.top_values),
        "greatest_strength": quiz.greatest_strength,
        "aspirational_trait": quiz.aspirational_trait,
        "metaphor_archetype": quiz.metaphor_archetype,
        "energy_style": quiz.energy_style,
        "life_focus": quiz.life_focus,
        "cultural_mode": quiz.cultural_mode,
        "free_write_letter": quiz.free_write_letter
    }

    # Use invoke() for synchronous execution
    result = extractor.invoke(input_data)

    return result
