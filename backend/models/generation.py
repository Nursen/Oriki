"""
Pydantic Model for Complete Generation Response

This model combines all outputs from the Oriki pipeline into a single response.
It's what the frontend receives after the complete generation process.
"""

from pydantic import BaseModel, Field

# Import all the component models that make up the complete response
from backend.models.poem import PoemOutput
from backend.models.affirmations import AffirmationsOutput
from backend.models.theme import ThemeData


class GenerationResponse(BaseModel):
    """
    Complete response from the Oriki generation pipeline.

    This model brings together all three agent outputs:
    1. The generated praise poem (from Poetry Composer)
    2. The daily affirmations (from Affirmation Generator)
    3. The extracted themes (from Theme Extractor - for transparency)

    The frontend receives this complete package and can display
    all components to the user.
    """

    # The generated praise poem in the user's chosen cultural mode
    poem: PoemOutput = Field(
        description="The generated praise poem with cultural styling"
    )

    # Psychologically-grounded daily affirmations
    affirmations: AffirmationsOutput = Field(
        description="CBT-based affirmations derived from user themes"
    )

    # The extracted themes (included for transparency and potential future features)
    # Users can see what themes the AI identified from their responses
    themes: ThemeData = Field(
        description="Extracted themes, values, and insights from the quiz"
    )

    # Which cultural mode was used (redundant with poem.cultural_mode, but convenient)
    cultural_mode: str = Field(
        description="The cultural mode used: yoruba_inspired, secular, turkish, or biblical"
    )

    # Pydantic v2 configuration with an example
    model_config = {
        "json_schema_extra": {
            "example": {
                "poem": {
                    "poem_lines": [
                        "The one who walks with purpose, steady as the mountain,",
                        "She whose voice lifts others, strong as the river's song,",
                        "The one who plants seeds of wisdom, patient as the oak,",
                        "She who transforms challenges into stepping stones,"
                    ],
                    "cultural_mode": "yoruba_inspired",
                    "style_notes": "Yoruba-inspired praise-naming with nature metaphors"
                },
                "affirmations": {
                    "affirmations": [
                        "I choose to embrace challenges as opportunities for growth",
                        "I honor my need for rest and reflection",
                        "I trust my ability to navigate uncertainty with resilience"
                    ],
                    "focus_areas": ["self-compassion", "growth mindset", "resilience"]
                },
                "themes": {
                    "values": ["integrity", "compassion", "wisdom"],
                    "emotional_tone": "hopeful and determined",
                    "metaphors": ["flowing river", "steady mountain"],
                    "identity_markers": ["healer", "learner"],
                    "aspirations": ["inspire change", "create connections"],
                    "strengths": ["empathy", "resilience"],
                    "key_themes": ["transformation through challenges", "service to others"]
                },
                "cultural_mode": "yoruba_inspired"
            }
        }
    }
