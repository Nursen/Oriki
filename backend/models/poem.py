"""
Pydantic Model for Poetry Output

This model defines the structured output from the Poetry Composer agent.
It captures the generated poem along with metadata about the cultural mode used.
"""

from pydantic import BaseModel, Field


class PoemOutput(BaseModel):
    """
    Structured output from the Poetry Composer agent.

    This model ensures the LLM generates poetry in a consistent format
    with clear metadata about the cultural approach used.
    """

    # The actual lines of the poem (4-7 lines for focused impact)
    # Each line is a separate string in the list for easy formatting
    poem_lines: list[str] = Field(
        description="4-7 lines of praise poetry, each line as a separate string"
    )

    # Which of the 4 cultural modes was used to generate this poem
    # Options: "yoruba", "secular", "turkish", "biblical"
    cultural_mode: str = Field(
        description="The cultural mode used: yoruba, secular, turkish, or biblical"
    )

    # Brief explanation of the style and approach taken
    # Helps users understand the poetic choices made
    style_notes: str = Field(
        description="Brief description of the style, tone, and approach used (1-2 sentences)"
    )

    # Pydantic v2 configuration with an example
    model_config = {
        "json_schema_extra": {
            "example": {
                "poem_lines": [
                    "The one who walks with purpose, steady as the mountain,",
                    "She whose voice lifts others, strong as the river's song,",
                    "The one who plants seeds of wisdom, patient as the oak,",
                    "She who transforms challenges into stepping stones,",
                    "The builder of bridges, keeper of compassionate fire."
                ],
                "cultural_mode": "yoruba",
                "style_notes": "Yoruba-inspired praise-naming structure with anaphoric repetition and universal nature metaphors celebrating resilience and service."
            }
        }
    }
