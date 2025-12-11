"""
Pydantic Models for Quiz Input Validation

This module defines validation models for the Oriki quiz submission.
Uses Pydantic v2 to validate user responses against the quiz configuration.
"""

from typing import List, Literal
from pydantic import BaseModel, Field, field_validator

# Import the quiz configuration to access valid options
from .quiz_config import (
    VALUES_QUESTION,
    STRENGTH_QUESTION,
    ASPIRATION_QUESTION,
    METAPHOR_QUESTION,
    ENERGY_QUESTION,
    LIFE_FOCUS_QUESTION,
)


# Extract valid option values from quiz_config for validation
# These will be used to check that submitted answers are valid
VALID_VALUES = [opt.value for opt in VALUES_QUESTION.options]
VALID_STRENGTHS = [opt.value for opt in STRENGTH_QUESTION.options]
VALID_ASPIRATIONS = [opt.value for opt in ASPIRATION_QUESTION.options]
VALID_METAPHORS = [opt.value for opt in METAPHOR_QUESTION.options]
VALID_ENERGY_STYLES = [opt.value for opt in ENERGY_QUESTION.options]
VALID_LIFE_FOCUSES = [opt.value for opt in LIFE_FOCUS_QUESTION.options]


class QuizSubmission(BaseModel):
    """
    Validates the complete quiz submission from a user.

    All fields correspond to the questions in quiz_config.py.
    Validators ensure that submitted answers match the allowed options.
    """

    # Question 1: Top 3 Core Values (multi-select, 1-3 selections required)
    top_values: List[str] = Field(
        ...,
        min_length=1,
        max_length=3,
        description="User's top 1-3 core values"
    )

    # Question 2: Greatest Strength (single select)
    greatest_strength: str = Field(
        ...,
        description="User's greatest strength"
    )

    # Question 3: Aspirational Trait (single select)
    aspirational_trait: str = Field(
        ...,
        description="Quality the user aspires to embody"
    )

    # Question 4: Metaphor/Archetype (single select)
    metaphor_archetype: str = Field(
        ...,
        description="Metaphor that resonates with the user"
    )

    # Question 5: Energy Style (single select)
    energy_style: str = Field(
        ...,
        description="User's energy style"
    )

    # Question 6: Life Focus (single select)
    life_focus: str = Field(
        ...,
        description="User's primary life focus"
    )

    # Question 7: Cultural Mode (single select, specific options)
    cultural_mode: Literal["yoruba_inspired", "secular", "turkish", "biblical"] = Field(
        ...,
        description="Cultural/spiritual lens for the Oriki"
    )

    # Question 8: Pronouns (single select, specific options)
    pronouns: Literal["he_him", "she_her", "they_them", "name_only"] = Field(
        ...,
        description="Pronouns to use in the praise poetry"
    )

    # Question 9: Free-Write Letter (text input, max 2000 characters)
    free_write_letter: str = Field(
        ...,
        max_length=2000,
        description="Letter to future self"
    )

    # Validator for top_values: Check each value is in the allowed list
    @field_validator('top_values')
    @classmethod
    def validate_top_values(cls, values: List[str]) -> List[str]:
        """Ensure all selected values are valid options"""
        for value in values:
            if value not in VALID_VALUES:
                raise ValueError(
                    f"Invalid value '{value}'. Must be one of: {', '.join(VALID_VALUES)}"
                )
        return values

    # Validator for greatest_strength: Check it's a valid option
    @field_validator('greatest_strength')
    @classmethod
    def validate_strength(cls, value: str) -> str:
        """Ensure selected strength is a valid option"""
        if value not in VALID_STRENGTHS:
            raise ValueError(
                f"Invalid strength '{value}'. Must be one of: {', '.join(VALID_STRENGTHS)}"
            )
        return value

    # Validator for aspirational_trait: Check it's a valid option
    @field_validator('aspirational_trait')
    @classmethod
    def validate_aspiration(cls, value: str) -> str:
        """Ensure selected aspiration is a valid option"""
        if value not in VALID_ASPIRATIONS:
            raise ValueError(
                f"Invalid aspiration '{value}'. Must be one of: {', '.join(VALID_ASPIRATIONS)}"
            )
        return value

    # Validator for metaphor_archetype: Check it's a valid option
    @field_validator('metaphor_archetype')
    @classmethod
    def validate_metaphor(cls, value: str) -> str:
        """Ensure selected metaphor is a valid option"""
        if value not in VALID_METAPHORS:
            raise ValueError(
                f"Invalid metaphor '{value}'. Must be one of: {', '.join(VALID_METAPHORS)}"
            )
        return value

    # Validator for energy_style: Check it's a valid option
    @field_validator('energy_style')
    @classmethod
    def validate_energy(cls, value: str) -> str:
        """Ensure selected energy style is a valid option"""
        if value not in VALID_ENERGY_STYLES:
            raise ValueError(
                f"Invalid energy style '{value}'. Must be one of: {', '.join(VALID_ENERGY_STYLES)}"
            )
        return value

    # Validator for life_focus: Check it's a valid option
    @field_validator('life_focus')
    @classmethod
    def validate_life_focus(cls, value: str) -> str:
        """Ensure selected life focus is a valid option"""
        if value not in VALID_LIFE_FOCUSES:
            raise ValueError(
                f"Invalid life focus '{value}'. Must be one of: {', '.join(VALID_LIFE_FOCUSES)}"
            )
        return value

    # Validator for free_write_letter: Ensure it's not empty
    @field_validator('free_write_letter')
    @classmethod
    def validate_letter(cls, value: str) -> str:
        """Ensure the letter is not empty or just whitespace"""
        if not value or not value.strip():
            raise ValueError("Letter cannot be empty")
        return value.strip()

    # Pydantic v2 configuration
    model_config = {
        "json_schema_extra": {
            "example": {
                "top_values": ["integrity", "creativity", "wisdom"],
                "greatest_strength": "empathy",
                "aspirational_trait": "confidence",
                "metaphor_archetype": "river",
                "energy_style": "healer",
                "life_focus": "spirituality",
                "cultural_mode": "yoruba_inspired",
                "pronouns": "she_her",
                "free_write_letter": "Dear future self, remember that you are strong and capable..."
            }
        }
    }
