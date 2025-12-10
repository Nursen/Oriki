"""
Pydantic Model for Affirmation Generator Output

This model defines the structured output from the Affirmation Generator agent.
It contains psychologically-grounded affirmations based on CBT and positive psychology.
"""

from pydantic import BaseModel, Field


class AffirmationsOutput(BaseModel):
    """
    Structured output from the Affirmation Generator agent.

    This model captures affirmations rooted in the user's themes, values,
    and aspirations. Affirmations are based on CBT and positive psychology
    principles, avoiding toxic positivity while promoting growth mindset.
    """

    # List of 5-10 affirmation statements
    # Each should be first-person, present tense, and specific to user's themes
    # Examples: ["I am growing stronger through my challenges",
    #            "I choose to honor my value of compassion today"]
    affirmations: list[str] = Field(
        description="5-10 psychologically-grounded affirmation statements in first person, present tense"
    )

    # The core focus areas these affirmations address
    # Examples: ["self-compassion", "resilience", "authentic expression", "personal growth"]
    focus_areas: list[str] = Field(
        description="Key themes and psychological areas these affirmations address (3-5 items)"
    )

    # Pydantic v2 configuration with an example
    model_config = {
        "json_schema_extra": {
            "example": {
                "affirmations": [
                    "I am worthy of compassion, especially from myself",
                    "I choose to embrace challenges as opportunities for growth",
                    "I honor my need for rest and reflection",
                    "I am building meaningful connections through authenticity",
                    "I trust my ability to navigate uncertainty with resilience"
                ],
                "focus_areas": [
                    "self-compassion",
                    "growth mindset",
                    "authentic connection",
                    "resilience"
                ]
            }
        }
    }
