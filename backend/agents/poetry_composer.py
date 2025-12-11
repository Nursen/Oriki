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

REQUIRED STRUCTURAL ELEMENTS:
- Praise-naming structure: "The one who...", "She whose...", "He who walks..."
- Anaphoric repetition: Repeat opening phrases across lines for rhythm
- Incremental intensification: Each line builds power
- Universal nature metaphors that anyone can understand
- Length: 4-7 lines (focused and powerful)
- Tone: Unapologetically celebratory, affirming, protective

USER'S THEMES (use these as your source material):
Values: {values}
Emotional Tone: {emotional_tone}
Metaphors: {metaphors}
Identity Markers: {identity_markers}
Aspirations: {aspirations}
Strengths: {strengths}
Key Themes: {key_themes}

PRONOUN USAGE:
Use {pronouns} pronouns consistently throughout the poem.

Create praise poetry that:
1. Uses "The one who..." or "She/He whose..." structure
2. Repeats opening phrases for rhythm (anaphora)
3. Uses universal nature metaphors (mountain, river, fire, lion, eagle)
4. Celebrates the user's actual values and strengths
5. Builds intensity with each line
6. Is 4-7 lines long
7. Uses {pronouns} pronouns consistently

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

STYLE GUIDELINES:
- Modern, grounded language (no religious or spiritual references)
- Focus on universal human experiences and emotions
- Affirmative and uplifting tone
- Contemporary imagery and metaphors
- Accessible, clear language
- Length: 4-7 lines

TONE:
- Warm and affirming
- Psychologically insightful
- Celebratory but realistic
- Empowering without being mystical

USER'S THEMES (use these as your source material):
Values: {values}
Emotional Tone: {emotional_tone}
Metaphors: {metaphors}
Identity Markers: {identity_markers}
Aspirations: {aspirations}
Strengths: {strengths}
Key Themes: {key_themes}

PRONOUN USAGE:
Use {pronouns} pronouns consistently throughout the poem.

Create praise poetry that:
1. Uses modern, accessible language
2. Celebrates real human qualities and achievements
3. Grounds metaphors in everyday experience
4. Affirms without spiritual or religious framing
5. Feels contemporary and psychologically resonant
6. Is 4-7 lines long
7. Uses {pronouns} pronouns consistently

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

STYLE GUIDELINES:
- Alkış (blessing) structure: "May you..." or "Let your..."
- Folkloric nature metaphors: mountains, rivers, eagles, stars, gardens
- Themes of protection, prosperity, and good fortune
- Warm, familial, protective tone
- Emphasis on blessings for the future
- Length: 4-7 lines

TONE:
- Protective and nurturing
- Warm and familial
- Hopeful and prosperous
- Grounded in nature and community

COMMON TURKISH FOLK METAPHORS:
- Mountains (strength, endurance)
- Rivers (flow, life, abundance)
- Eagles (freedom, vision)
- Stars (guidance, hope)
- Gardens (growth, beauty, cultivation)
- Light (wisdom, clarity)

USER'S THEMES (use these as your source material):
Values: {values}
Emotional Tone: {emotional_tone}
Metaphors: {metaphors}
Identity Markers: {identity_markers}
Aspirations: {aspirations}
Strengths: {strengths}
Key Themes: {key_themes}

PRONOUN USAGE:
Use {pronouns} pronouns consistently throughout the poem.

Create blessing poetry that:
1. Uses blessing structure: "May you..." or "Let your..."
2. Incorporates Turkish folk nature metaphors
3. Emphasizes protection and prosperity
4. Has a warm, familial, protective tone
5. Celebrates the user's path forward
6. Is 4-7 lines long
7. Uses {pronouns} pronouns consistently

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

STYLE GUIDELINES:
- Scriptural cadence and rhythm (like Psalms or Beatitudes)
- Blessing language: "Blessed are you who..." or "You are called..."
- Themes of covenant, purpose, and calling
- Dignified, reverent tone
- Affirmation of identity and purpose
- Length: 4-7 lines

TONE:
- Reverent and dignified
- Affirming and uplifting
- Prophetic and purposeful
- Timeless and grounded

STRUCTURAL PATTERNS:
- "Blessed are you who..." (Beatitudes style)
- "You are called to..." (covenant language)
- "Like [biblical metaphor], you..." (psalm-like comparison)
- Parallel structure and repetition

COMMON BIBLICAL METAPHORS:
- Light (guidance, truth)
- Salt (preservation, influence)
- Trees planted by water (stability, growth)
- Shepherd/sheep (care, guidance)
- Cornerstone (foundation, strength)
- Living water (renewal, life)

USER'S THEMES (use these as your source material):
Values: {values}
Emotional Tone: {emotional_tone}
Metaphors: {metaphors}
Identity Markers: {identity_markers}
Aspirations: {aspirations}
Strengths: {strengths}
Key Themes: {key_themes}

PRONOUN USAGE:
Use {pronouns} pronouns consistently throughout the poem.

Create biblical-style praise poetry that:
1. Uses scriptural cadence and blessing language
2. Incorporates biblical metaphors naturally
3. Emphasizes purpose, calling, and covenant
4. Has a reverent, dignified tone
5. Affirms the user's identity and mission
6. Is 4-7 lines long
7. Uses {pronouns} pronouns consistently

{format_instructions}"""

    return ChatPromptTemplate.from_template(template).partial(
        format_instructions=parser.get_format_instructions()
    ), parser


async def compose_poem(themes: ThemeData, cultural_mode: str, pronouns: str = "they_them", display_name: Optional[str] = None) -> PoemOutput:
    """
    Generates praise poetry in the specified cultural mode.

    This is the main function that orchestrates poetry generation. It selects
    the appropriate prompt template based on the cultural mode, then uses
    LangChain to generate structured poetic output.

    Args:
        themes: ThemeData object containing extracted themes from user's quiz
        cultural_mode: One of "yoruba", "secular", "turkish", or "biblical"
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
        "pronouns": pronoun_instruction
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
