"""
Pydantic Model for Theme Extraction Output

This model defines the structured output from the Theme Extractor agent.
It captures the key themes, emotions, and insights extracted from quiz responses.
"""

from pydantic import BaseModel, Field


class ThemeData(BaseModel):
    """
    Structured output from the Theme Extractor agent.

    This model captures the meaningful themes and patterns identified
    from a user's quiz responses and free-write letter. The LLM will
    populate these fields based on its analysis of the user's input.
    """

    # Core values identified from the user's responses
    # Examples: ["integrity", "compassion", "creativity"]
    values: list[str] = Field(
        description="Core values and principles identified from user responses (3-7 items)"
    )

    # The primary emotional quality or mood of the responses
    # Examples: "hopeful", "determined", "reflective", "resilient"
    emotional_tone: str = Field(
        description="Primary emotional tone or quality (e.g., hopeful, determined, resilient)"
    )

    # Nature-based or universal metaphors that resonate with the user
    # Examples: ["flowing river", "growing tree", "rising sun"]
    metaphors: list[str] = Field(
        description="Nature-based or universal metaphors suggested by the responses (2-5 items)"
    )

    # Key identity markers and self-descriptors
    # Examples: ["helper", "learner", "creative spirit", "bridge-builder"]
    identity_markers: list[str] = Field(
        description="Key identity descriptors and self-concepts (3-5 items)"
    )

    # Future goals, dreams, and aspirations
    # Examples: ["inspire others", "build meaningful connections", "achieve mastery"]
    aspirations: list[str] = Field(
        description="Future goals, dreams, and aspirations (2-5 items)"
    )

    # Recognized personal strengths and capabilities
    # Examples: ["empathy", "perseverance", "vision", "adaptability"]
    strengths: list[str] = Field(
        description="Recognized strengths and positive qualities (3-5 items)"
    )

    # Overarching themes that tie everything together
    # Examples: ["transformation through adversity", "service to community", "authentic self-expression"]
    key_themes: list[str] = Field(
        description="3-5 overarching themes that synthesize the user's story and values"
    )

    # Pydantic v2 configuration with an example
    model_config = {
        "json_schema_extra": {
            "example": {
                "values": ["integrity", "compassion", "wisdom"],
                "emotional_tone": "hopeful and determined",
                "metaphors": ["flowing river", "steady mountain", "growing oak tree"],
                "identity_markers": ["healer", "learner", "bridge-builder"],
                "aspirations": ["inspire positive change", "create meaningful connections"],
                "strengths": ["empathy", "resilience", "creativity"],
                "key_themes": [
                    "transformation through challenges",
                    "service to others",
                    "continuous growth and learning"
                ]
            }
        }
    }
