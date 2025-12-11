"""
Poetry Composer Agent - Generates praise poetry in 4 cultural modes.

This is the most culturally sensitive agent in the Oriki system. It creates
personalized praise poetry using one of four distinct cultural approaches,
each with its own tone, structure, and metaphorical language.

CRITICAL: This agent strictly follows CULTURAL_GUIDELINES.md to avoid
cultural appropriation and respect living traditions.
"""

from typing import Optional

from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain.output_parsers import PydanticOutputParser

from backend.models.theme import ThemeData
from backend.models.poem import PoemOutput
from backend.config import settings


# Initialize the LLM with structured output capabilities
# Using temperature 0.7 for balanced creativity with cultural safety
llm = ChatOpenAI(
    model=settings.OPENAI_MODEL,
    temperature=0.7,  # Balanced creativity with cultural safety constraints
    api_key=settings.OPENAI_API_KEY
)


def _create_yoruba_prompt() -> ChatPromptTemplate:
    """
    Creates the prompt template for YORUBA-INSPIRED praise poetry.

    This mode uses the aesthetic structure of traditional Yoruba Oríkì
    but NEVER invents cultural elements like names, clan identities, or
    spiritual references. It celebrates the user through universal metaphors.

    STRICT CULTURAL CONSTRAINTS:
    - NO invented Yoruba names or clan names
    - NO references to Òrìṣà (Ṣàngó, Òṣun, Ògún, etc.)
    - NO fabricated Yoruba proverbs
    - NO Yoruba diacritical marks
    - USE ONLY universal nature metaphors
    """
    parser = PydanticOutputParser(pydantic_object=PoemOutput)

    template = """You are composing Yoruba-inspired praise poetry (Oríkì-inspired).

CRITICAL CULTURAL CONSTRAINTS - FOLLOW EXACTLY:
1. DO NOT invent Yoruba names, clan names, or place-based lineages
2. DO NOT reference Òrìṣà deities (Ṣàngó, Òṣun, Ògún, Ọya, etc.)
3. DO NOT fabricate Yoruba proverbs or ancestral sayings
4. DO NOT use Yoruba diacritical marks at all (ọ, ẹ, ṣ, etc.)
5. USE ONLY universal nature metaphors: lion, river, mountain, fire, eagle, sun, tree, wind
6. DO NOT attempt spiritual associations even with approved metaphors

YOUR PRIMARY SOURCE MATERIAL:
The user wrote this letter to their future self:
{free_write_letter}

Read this letter carefully. This is YOUR MAIN SOURCE for understanding who they are, what they value, and what they dream of. The themes below are extracted from this letter, but always return to the actual letter for authentic language and emotional truth.

EXTRACTED THEMES (supporting material):
Values: {values}
Emotional Tone: {emotional_tone}
Metaphors: {metaphors}
Identity Markers: {identity_markers}
Aspirations: {aspirations}
Strengths: {strengths}
Key Themes: {key_themes}

STRUCTURAL GUIDANCE FOR NARRATIVE FLOW:
Create a 3-5 line poem with emotional arc and narrative progression:

Line 1: GROUNDING - Establish who they are NOW (use their actual words/context from letter)
Line 2: MOVEMENT - Show their journey, struggle, or growth (weave in their aspirations)
Line 3: TRANSFORMATION - Celebrate their strength emerging or vision realized
Line 4 (optional): AFFIRMATION - Seal their identity with power and protection
Line 5 (optional): FUTURE BLESSING - Point toward their continuing path

METAPHOR DISCIPLINE:
- Select 2-3 core nature metaphors that align with the user's emotional journey
- Develop each metaphor across multiple lines, showing transformation
- Avoid listing many metaphors rapidly; deepen fewer for coherent arcs
- Ensure metaphors connect logically (fire becomes light, river feeds tree)
- When using metaphors, show specific actions: not "like a mountain" but "standing unshaken as the mountain weathering storms"

VARY YOUR LINE OPENINGS. Mix structures like:
- "The one who [action]..."
- "She/He whose [quality]..."
- "With [metaphor], she/he..."
- "Through [struggle], they..."
- Direct address: "You are [metaphor]"

NOT every line should start "The one who..." - create rhythm through varied repetition.

WEAVING USER'S WORDS:
- Quote or paraphrase 1-3 phrases directly from their letter
- Use their actual language when possible (their dreams, fears, hopes)
- Let their authentic voice shine through the praise structure

EXAMPLE STRUCTURE (adapt to user's content):
She who walks through doubt with hands still open,
The river that carves mountains with patient faith,
You are the fire that learns to warm without burning—
Blessed in becoming, strong in the unfinished work.

PRONOUN USAGE:
Use {pronouns} pronouns consistently throughout the poem.

LENGTH: 3-5 lines (focused and powerful)

TONE: Unapologetically celebratory, affirming, protective

{format_instructions}

Remember: This is INSPIRED by Yoruba tradition, not claiming to be authentic Oríkì.
Celebrate the aesthetic structure while respecting cultural boundaries."""

    return ChatPromptTemplate.from_template(template).partial(
        format_instructions=parser.get_format_instructions()
    ), parser


def _create_secular_prompt() -> ChatPromptTemplate:
    """
    Creates the prompt template for SECULAR praise poetry.

    This mode uses modern, psychological language grounded in universal
    human experiences. It's affirmative without being spiritual, using
    contemporary imagery and accessible metaphors.
    """
    parser = PydanticOutputParser(pydantic_object=PoemOutput)

    template = """You are composing secular praise poetry with modern, psychological depth.

YOUR PRIMARY SOURCE MATERIAL:
The user wrote this letter to their future self:
{free_write_letter}

Read this letter carefully. This is YOUR MAIN SOURCE for understanding who they are, what they value, and what they dream of. The themes below are extracted from this letter, but always return to the actual letter for authentic language and emotional truth.

EXTRACTED THEMES (supporting material):
Values: {values}
Emotional Tone: {emotional_tone}
Metaphors: {metaphors}
Identity Markers: {identity_markers}
Aspirations: {aspirations}
Strengths: {strengths}
Key Themes: {key_themes}

STRUCTURAL GUIDANCE FOR NARRATIVE FLOW:
Create a 3-5 line poem with emotional arc and narrative progression:

Line 1: RECOGNITION - Name who they are now, their current reality (use their words)
Line 2: HONORING STRUGGLE - Acknowledge their journey, challenges, or growth
Line 3: CELEBRATING STRENGTH - Affirm their resilience or emerging power
Line 4 (optional): FUTURE VISION - Point toward their aspirations or continuing path
Line 5 (optional): GROUNDED BLESSING - Seal with realistic, empowering affirmation

VARY YOUR LINE STRUCTURE. Mix openings like:
- "You are the one who..."
- "In you lives..."
- "Through [challenge], you..."
- "Your [quality] is..."
- "You carry [metaphor]..."

Avoid formulaic repetition - create rhythm through varied patterns, not identical openings.

WEAVING USER'S WORDS:
- Quote or paraphrase 1-3 phrases directly from their letter
- Use their actual language for dreams, fears, hopes, values
- Mirror their emotional tone while elevating it to celebration
- Let their authentic voice be the foundation

EXAMPLE STRUCTURE (adapt to user's content):
You are the architect of small, brave mornings,
Building trust in yourself one choice at a time.
In you lives the permission to grow imperfectly—
Your courage is not in certainty, but in continuing.

STYLE GUIDELINES:
- Modern, grounded language (no religious or spiritual references)
- Focus on universal human experiences and emotions
- Contemporary imagery from everyday life
- Accessible, clear, psychologically insightful language

TONE:
- Warm and affirming
- Psychologically resonant
- Celebratory but realistic
- Empowering without being mystical

PRONOUN USAGE:
Use {pronouns} pronouns consistently throughout the poem.

LENGTH: 3-5 lines (focused and powerful)

{format_instructions}"""

    return ChatPromptTemplate.from_template(template).partial(
        format_instructions=parser.get_format_instructions()
    ), parser


def _create_turkish_prompt() -> ChatPromptTemplate:
    """
    Creates the prompt template for TURKISH blessing poetry.

    This mode uses the Alkış (blessing) structure from Turkish folklore,
    with protective, prosperous themes and warm, familial tone. It draws
    on nature metaphors common in Anatolian folk tradition.
    """
    parser = PydanticOutputParser(pydantic_object=PoemOutput)

    template = """You are composing Turkish-style blessing poetry (Alkış).

YOUR PRIMARY SOURCE MATERIAL:
The user wrote this letter to their future self:
{free_write_letter}

Read this letter carefully. This is YOUR MAIN SOURCE for understanding who they are, what they value, and what they dream of. The themes below are extracted from this letter, but always return to the actual letter for authentic language and emotional truth.

EXTRACTED THEMES (supporting material):
Values: {values}
Emotional Tone: {emotional_tone}
Metaphors: {metaphors}
Identity Markers: {identity_markers}
Aspirations: {aspirations}
Strengths: {strengths}
Key Themes: {key_themes}

STRUCTURAL GUIDANCE FOR NARRATIVE FLOW:
Create a 3-5 line blessing poem with emotional arc and progression:

Line 1: BLESSING THEIR PRESENT - Acknowledge who they are now (use their words)
Line 2: BLESSING THEIR JOURNEY - Bless their path, struggle, or growth
Line 3: BLESSING THEIR FUTURE - Affirm their aspirations with protective hope
Line 4 (optional): BLESSING THEIR STRENGTH - Seal their resilience with natural metaphor
Line 5 (optional): BLESSING THEIR BECOMING - Point toward continuing grace

VARY YOUR BLESSING STRUCTURES. Mix patterns like:
- "May you..."
- "Let your [quality]..."
- "May your path be..."
- "Like the [metaphor], may you..."
- "Blessed be your [journey/quality]..."

Avoid repetitive openings - create rhythm through varied blessing language.

WEAVING USER'S WORDS:
- Quote or paraphrase 1-3 phrases directly from their letter
- Bless their actual stated dreams and aspirations
- Use their emotional tone as foundation for blessings
- Let their authentic voice guide the nature of protection offered

EXAMPLE STRUCTURE (adapt to user's content):
May you find yourself in the morning light you spoke of,
Your roots deepening like gardens after rain.
Let courage flow through you, steady as mountain rivers—
Blessed in the becoming, held in the growing.

COMMON TURKISH FOLK METAPHORS:
- Mountains (strength, endurance)
- Rivers (flow, life, abundance)
- Eagles (freedom, vision)
- Stars (guidance, hope)
- Gardens (growth, beauty, cultivation)
- Light (wisdom, clarity)

TONE:
- Protective and nurturing
- Warm and familial
- Hopeful and prosperous
- Grounded in nature and community

PRONOUN USAGE:
Use {pronouns} pronouns consistently throughout the poem.

LENGTH: 3-5 lines (focused and powerful)

{format_instructions}"""

    return ChatPromptTemplate.from_template(template).partial(
        format_instructions=parser.get_format_instructions()
    ), parser


def _create_biblical_prompt() -> ChatPromptTemplate:
    """
    Creates the prompt template for BIBLICAL praise poetry.

    This mode uses scriptural cadence and rhythm, with blessing language
    and themes of covenant, purpose, and divine affirmation. It draws on
    the poetic structures found in Psalms and Beatitudes.
    """
    parser = PydanticOutputParser(pydantic_object=PoemOutput)

    template = """You are composing Biblical-style praise poetry.

YOUR PRIMARY SOURCE MATERIAL:
The user wrote this letter to their future self:
{free_write_letter}

Read this letter carefully. This is YOUR MAIN SOURCE for understanding who they are, what they value, and what they dream of. The themes below are extracted from this letter, but always return to the actual letter for authentic language and emotional truth.

EXTRACTED THEMES (supporting material):
Values: {values}
Emotional Tone: {emotional_tone}
Metaphors: {metaphors}
Identity Markers: {identity_markers}
Aspirations: {aspirations}
Strengths: {strengths}
Key Themes: {key_themes}

STRUCTURAL GUIDANCE FOR NARRATIVE FLOW:
Create a 3-5 line biblical poem with emotional arc and covenant progression:

Line 1: NAMING THEIR IDENTITY - Who they are in truth (use their actual words)
Line 2: HONORING THEIR JOURNEY - Acknowledge their path or trials with dignity
Line 3: AFFIRMING THEIR CALLING - Speak to their purpose or aspirations
Line 4 (optional): SEALING THE BLESSING - Affirm their strength with biblical metaphor
Line 5 (optional): COVENANT PROMISE - Point toward their continuing mission

VARY YOUR STRUCTURAL PATTERNS. Mix openings like:
- "Blessed are you who..."
- "You are called to..."
- "Like the [biblical metaphor], you..."
- "In you dwells..."
- "You are as [metaphor]..."

Avoid repetitive formulaic openings - create rhythm through parallel structure, not identical phrases.

WEAVING USER'S WORDS:
- Quote or paraphrase 1-3 phrases directly from their letter
- Frame their actual aspirations as divine calling or purpose
- Use their emotional tone as foundation for blessing language
- Let their authentic voice be sanctified through the scriptural frame

EXAMPLE STRUCTURE (adapt to user's content):
Blessed are you who carry questions like lanterns,
Called to seek truth even when the path turns dark.
Like a tree planted by living water, your roots deepen—
In you dwells courage that does not fear the wilderness.

COMMON BIBLICAL METAPHORS:
- Light (guidance, truth)
- Salt (preservation, influence)
- Trees planted by water (stability, growth)
- Shepherd/sheep (care, guidance)
- Cornerstone (foundation, strength)
- Living water (renewal, life)

TONE:
- Reverent and dignified
- Affirming and uplifting
- Prophetic and purposeful
- Timeless and grounded

PRONOUN USAGE:
Use {pronouns} pronouns consistently throughout the poem.

LENGTH: 3-5 lines (focused and powerful)

{format_instructions}"""

    return ChatPromptTemplate.from_template(template).partial(
        format_instructions=parser.get_format_instructions()
    ), parser


async def compose_poem(themes: ThemeData, cultural_mode: str, free_write_letter: str = "", pronouns: str = "they_them", display_name: Optional[str] = None) -> PoemOutput:
    """
    Generates praise poetry in the specified cultural mode.

    This is the main function that orchestrates poetry generation. It selects
    the appropriate prompt template based on the cultural mode, then uses
    LangChain to generate structured poetic output.

    Args:
        themes: ThemeData object containing extracted themes from user's quiz
        cultural_mode: One of "yoruba", "secular", "turkish", or "biblical"
        free_write_letter: The user's original free-write letter for personalization
        pronouns: One of "he_him", "she_her", "they_them", or "name_only"
        display_name: Name to use when pronouns is "name_only" (optional for other modes)

    Returns:
        PoemOutput: Structured poem with lines, mode, and style notes

    Raises:
        ValueError: If cultural_mode is not one of the four supported modes
    """

    # Select the appropriate prompt template based on cultural mode
    mode = cultural_mode.lower()

    if mode == "yoruba":
        prompt, parser = _create_yoruba_prompt()
    elif mode == "secular":
        prompt, parser = _create_secular_prompt()
    elif mode == "turkish":
        prompt, parser = _create_turkish_prompt()
    elif mode == "biblical":
        prompt, parser = _create_biblical_prompt()
    else:
        raise ValueError(
            f"Invalid cultural_mode: {cultural_mode}. "
            f"Must be one of: yoruba, secular, turkish, biblical"
        )

    # Build the LangChain chain: prompt -> LLM -> parser
    chain = prompt | llm | parser

    # Convert pronouns to readable format for the prompt
    # For name_only, use the actual name if provided
    if pronouns == "name_only" and display_name:
        pronoun_instruction = f"the name '{display_name}' (no pronouns, just use the name)"
    else:
        pronoun_map = {
            "he_him": "he/him",
            "she_her": "she/her",
            "they_them": "they/them",
            "name_only": "no pronouns (use 'The one who...' style instead)"
        }
        pronoun_instruction = pronoun_map.get(pronouns, "they/them")

    # Prepare the input variables from the ThemeData object
    # We convert the ThemeData fields into a dictionary for the prompt
    input_vars = {
        "values": ", ".join(themes.values),
        "emotional_tone": themes.emotional_tone,
        "metaphors": ", ".join(themes.metaphors),
        "identity_markers": ", ".join(themes.identity_markers),
        "aspirations": ", ".join(themes.aspirations),
        "strengths": ", ".join(themes.strengths),
        "key_themes": ", ".join(themes.key_themes),
        "pronouns": pronoun_instruction,
        "free_write_letter": free_write_letter or "No letter provided."
    }

    # Invoke the chain and get the structured PoemOutput
    poem = await chain.ainvoke(input_vars)

    return poem


# Example usage for testing (commented out for production)
"""
# To test this agent directly:
import asyncio
from backend.models.theme import ThemeData

async def test_poetry_composer():
    # Create sample theme data
    sample_themes = ThemeData(
        values=["integrity", "compassion", "wisdom"],
        emotional_tone="hopeful and determined",
        metaphors=["flowing river", "steady mountain", "growing oak"],
        identity_markers=["healer", "learner", "bridge-builder"],
        aspirations=["inspire change", "create connections"],
        strengths=["empathy", "resilience", "creativity"],
        key_themes=["transformation through challenges", "service to others"]
    )

    # Test each cultural mode
    for mode in ["yoruba", "secular", "turkish", "biblical"]:
        print(f"\n{'='*60}")
        print(f"{mode.upper()} MODE")
        print('='*60)
        poem = await compose_poem(sample_themes, mode)
        print(f"\n{poem.style_notes}\n")
        for line in poem.poem_lines:
            print(line)

# Run the test
asyncio.run(test_poetry_composer())
"""
