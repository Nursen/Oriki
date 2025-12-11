"""
Affirmation Generator Agent - LangChain Implementation

This agent creates psychologically-grounded daily affirmations based on
CBT (Cognitive Behavioral Therapy) and positive psychology principles.

The affirmations are anchored in the user's values and aspirations,
avoiding toxic positivity while promoting realistic growth and self-compassion.
"""

from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain.output_parsers import PydanticOutputParser

# Import our models
from backend.models.affirmations import AffirmationsOutput
from backend.models.theme import ThemeData

# Import settings for API key configuration
from backend.config import settings


# Initialize the parser with our AffirmationsOutput model
parser = PydanticOutputParser(pydantic_object=AffirmationsOutput)


# ============================================================================
# PROMPT TEMPLATE
# ============================================================================
# This prompt guides the LLM to create affirmations grounded in CBT and
# positive psychology, avoiding toxic positivity

AFFIRMATION_PROMPT = ChatPromptTemplate.from_template("""
You are a compassionate psychologist specializing in CBT and positive psychology.
Your task is to create realistic, psychologically-grounded daily affirmations.

USER'S THEMES AND VALUES:
- Core Values: {values}
- Emotional Tone: {emotional_tone}
- Metaphors: {metaphors}
- Identity Markers: {identity_markers}
- Aspirations: {aspirations}
- Strengths: {strengths}
- Key Themes: {key_themes}

PRINCIPLES FOR AFFIRMATION CREATION:

1. GROUNDED IN REALITY: Avoid toxic positivity. Don't claim "everything is perfect."
   Instead, acknowledge challenges while affirming strength and growth.

2. PROCESS-ORIENTED: Focus on actions and choices, not just outcomes.
   Example: "I choose to approach challenges with curiosity" rather than "I never fail."

3. SELF-COMPASSION: Include affirmations that promote kindness toward oneself,
   especially during difficulties.

4. GROWTH MINDSET: Emphasize learning, progress, and development rather than
   fixed states of perfection.

5. VALUES-ANCHORED: Each affirmation should connect to the user's stated values,
   strengths, or aspirations.

6. PRESENT TENSE: Use present tense to make affirmations feel current and actionable.

7. FIRST PERSON: All affirmations must start with "I" (I am, I choose, I embrace,
   I honor, I trust, I recognize, I allow, etc.)

STRUCTURE YOUR OUTPUT:

Generate 3-5 affirmations that:
- Are specific to this user's themes and values
- Acknowledge the real challenges of growth
- Promote self-compassion and realistic optimism
- Support their aspirations in an achievable way
- Use varied sentence structures (I am, I choose, I embrace, I honor, etc.)

Also identify 2-3 focus areas that these affirmations address (e.g., "self-compassion",
"resilience", "authentic expression", "personal growth").

Remember: These affirmations should feel authentic and achievable, not like empty platitudes.
They should support the user's psychological wellbeing through realistic self-talk.

{format_instructions}
""").partial(format_instructions=parser.get_format_instructions())


# ============================================================================
# AGENT CREATION FUNCTION
# ============================================================================

def create_affirmation_generator():
    """
    Creates an Affirmation Generator agent with structured output.

    Returns:
        A LangChain chain that takes ThemeData and returns AffirmationsOutput.

    The chain uses:
    - ChatOpenAI with gpt-4o-mini for cost-effective generation
    - PydanticOutputParser to ensure data matches our AffirmationsOutput model
    - Temperature of 0.6 for consistent, grounded output with some variation
    """

    # Initialize the LLM
    llm = ChatOpenAI(
        model="gpt-4o-mini",  # Cost-effective model suitable for affirmation generation
        temperature=0.6,  # Lower temp for consistency while allowing some creative variation
        api_key=settings.OPENAI_API_KEY  # Load API key from settings
    )

    # Create the chain: prompt -> LLM -> parser
    # The pipe operator (|) chains the components together
    chain = AFFIRMATION_PROMPT | llm | parser

    return chain


# ============================================================================
# MAIN GENERATION FUNCTION
# ============================================================================

async def generate_affirmations(themes: ThemeData) -> AffirmationsOutput:
    """
    Generates psychologically-grounded affirmations from extracted themes.

    This is the main function you'll call to create daily affirmations.
    It takes the theme data and returns structured affirmations based on
    CBT and positive psychology principles.

    Args:
        themes: A ThemeData object containing the user's values, strengths, and aspirations

    Returns:
        AffirmationsOutput: Structured affirmations and their focus areas

    Example:
        affirmations = await generate_affirmations(user_themes)
        print(affirmations.affirmations[0])  # "I choose to embrace challenges..."
        print(affirmations.focus_areas)  # ["self-compassion", "growth mindset"]
    """

    # Create the affirmation generator chain
    generator = create_affirmation_generator()

    # Prepare the input data by unpacking the theme fields
    # This matches the variables in our prompt template
    input_data = {
        "values": ", ".join(themes.values),
        "emotional_tone": themes.emotional_tone,
        "metaphors": ", ".join(themes.metaphors),
        "identity_markers": ", ".join(themes.identity_markers),
        "aspirations": ", ".join(themes.aspirations),
        "strengths": ", ".join(themes.strengths),
        "key_themes": ", ".join(themes.key_themes)
    }

    # Invoke the chain asynchronously
    # The LLM will analyze the themes and return a validated AffirmationsOutput object
    result = await generator.ainvoke(input_data)

    return result


# ============================================================================
# ALTERNATIVE: SYNCHRONOUS VERSION (if needed)
# ============================================================================

def generate_affirmations_sync(themes: ThemeData) -> AffirmationsOutput:
    """
    Synchronous version of generate_affirmations.

    Use this if you're not in an async context.
    For FastAPI endpoints, prefer the async version above.

    Args:
        themes: A ThemeData object containing user themes and values

    Returns:
        AffirmationsOutput: Structured affirmations and focus areas
    """

    generator = create_affirmation_generator()

    input_data = {
        "values": ", ".join(themes.values),
        "emotional_tone": themes.emotional_tone,
        "metaphors": ", ".join(themes.metaphors),
        "identity_markers": ", ".join(themes.identity_markers),
        "aspirations": ", ".join(themes.aspirations),
        "strengths": ", ".join(themes.strengths),
        "key_themes": ", ".join(themes.key_themes)
    }

    # Use invoke() for synchronous execution
    result = generator.invoke(input_data)

    return result
