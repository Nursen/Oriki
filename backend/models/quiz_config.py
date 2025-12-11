"""
Quiz Configuration for Oriki Name Generator

This module defines all quiz questions, their options, and validation rules.
Each question helps generate a personalized Oriki (Yoruba praise name).
"""

from dataclasses import dataclass
from typing import List, Optional


@dataclass
class QuestionOption:
    """Represents a single option for a quiz question"""
    value: str  # Internal identifier (e.g., "integrity")
    label: str  # User-facing text (e.g., "Integrity")


@dataclass
class QuizQuestion:
    """Represents a complete quiz question with all its metadata"""
    id: str  # Unique identifier for the question
    text: str  # The question text shown to users
    options: List[QuestionOption]  # Available choices
    is_multi_select: bool  # True if user can select multiple options
    max_selections: Optional[int] = None  # Maximum selections for multi-select questions


# Question 1: Top 3 Core Values (multi-select)
VALUES_QUESTION = QuizQuestion(
    id="top_values",
    text="Select your top 3 core values:",
    is_multi_select=True,
    max_selections=3,
    options=[
        QuestionOption("integrity", "Integrity"),
        QuestionOption("creativity", "Creativity"),
        QuestionOption("family", "Family"),
        QuestionOption("growth", "Growth"),
        QuestionOption("freedom", "Freedom"),
        QuestionOption("compassion", "Compassion"),
        QuestionOption("achievement", "Achievement"),
        QuestionOption("wisdom", "Wisdom"),
        QuestionOption("connection", "Connection"),
        QuestionOption("courage", "Courage"),
    ]
)


# Question 2: Greatest Strength (single select)
STRENGTH_QUESTION = QuizQuestion(
    id="greatest_strength",
    text="What is your greatest strength?",
    is_multi_select=False,
    options=[
        QuestionOption("leadership", "Leadership"),
        QuestionOption("empathy", "Empathy"),
        QuestionOption("resilience", "Resilience"),
        QuestionOption("creativity", "Creativity"),
        QuestionOption("analytical_thinking", "Analytical Thinking"),
        QuestionOption("communication", "Communication"),
        QuestionOption("patience", "Patience"),
        QuestionOption("adaptability", "Adaptability"),
    ]
)


# Question 3: Aspirational Trait (single select)
ASPIRATION_QUESTION = QuizQuestion(
    id="aspirational_trait",
    text="What quality do you aspire to embody more?",
    is_multi_select=False,
    options=[
        QuestionOption("confidence", "Confidence"),
        QuestionOption("peace", "Peace"),
        QuestionOption("boldness", "Boldness"),
        QuestionOption("wisdom", "Wisdom"),
        QuestionOption("joy", "Joy"),
        QuestionOption("influence", "Influence"),
        QuestionOption("authenticity", "Authenticity"),
        QuestionOption("discipline", "Discipline"),
    ]
)


# Question 4: Metaphor/Archetype (single select)
METAPHOR_QUESTION = QuizQuestion(
    id="metaphor",
    text="Which metaphor resonates most with you?",
    is_multi_select=False,
    options=[
        QuestionOption("mountain", "The Mountain"),
        QuestionOption("river", "The River"),
        QuestionOption("flame", "The Flame"),
        QuestionOption("tree", "The Tree"),
        QuestionOption("storm", "The Storm"),
        QuestionOption("sun", "The Sun"),
        QuestionOption("bridge", "The Bridge"),
        QuestionOption("garden", "The Garden"),
    ]
)


# Question 5: Energy Style (single select)
ENERGY_QUESTION = QuizQuestion(
    id="energy_style",
    text="How would you describe your energy?",
    is_multi_select=False,
    options=[
        QuestionOption("charismatic", "Charismatic"),
        QuestionOption("grounded", "Grounded/Natural"),
        QuestionOption("visionary", "Visionary"),
        QuestionOption("healer", "Healer"),
        QuestionOption("warrior", "Warrior"),
        QuestionOption("sage", "Sage"),
    ]
)


# Question 6: Life Focus (single select)
LIFE_FOCUS_QUESTION = QuizQuestion(
    id="life_focus",
    text="What is your primary life focus right now?",
    is_multi_select=False,
    options=[
        QuestionOption("career", "Career"),
        QuestionOption("parenting", "Parenting"),
        QuestionOption("relationships", "Love/Relationships"),
        QuestionOption("health", "Health"),
        QuestionOption("spirituality", "Spirituality"),
        QuestionOption("creative_expression", "Creative Expression"),
    ]
)


# Question 7: Cultural Mode (single select)
CULTURAL_MODE_QUESTION = QuizQuestion(
    id="cultural_mode",
    text="Which cultural/spiritual lens would you like for your Oriki?",
    is_multi_select=False,
    options=[
        QuestionOption("yoruba_inspired", "Yoruba-Inspired"),
        QuestionOption("secular", "Secular"),
        QuestionOption("turkish", "Turkish"),
        QuestionOption("biblical", "Biblical"),
    ]
)


# Question 8: Pronouns (single select)
PRONOUN_QUESTION = QuizQuestion(
    id="pronouns",
    text="In your praise poetry, you will be celebrated as:",
    is_multi_select=False,
    options=[
        QuestionOption("he_him", "He/Him"),
        QuestionOption("she_her", "She/Her"),
        QuestionOption("they_them", "They/Them"),
        QuestionOption("name_only", "Name Only (we'll ask for your name next)"),
    ]
)


# Question 9: Free-Write Letter (text input, not multiple choice)
LETTER_QUESTION = QuizQuestion(
    id="letter",
    text="What words do you need spoken over your life right now?",
    is_multi_select=False,
    options=[]  # No options - this is a free-text field
)


# Master list of all quiz questions in order
# Ordered for optimal user experience:
# 1. top_values - sets foundation
# 2. cultural_mode - sets lens for the experience
# 3. pronouns - foundational identity
# 4-7. middle questions - explore identity and aspirations
# 8. free_write_letter - most vulnerable/personal (last)
ALL_QUESTIONS = [
    VALUES_QUESTION,           # 1. Top values (foundation)
    CULTURAL_MODE_QUESTION,    # 2. Cultural lens (sets tone)
    PRONOUN_QUESTION,          # 3. Pronouns (identity)
    STRENGTH_QUESTION,         # 4. Greatest strength
    ASPIRATION_QUESTION,       # 5. Aspirational trait
    METAPHOR_QUESTION,         # 6. Metaphor/archetype
    ENERGY_QUESTION,           # 7. Energy style
    LIFE_FOCUS_QUESTION,       # 8. Life focus
    LETTER_QUESTION,           # 9. Free-write (most personal)
]


# Helper function to get a question by ID
def get_question_by_id(question_id: str) -> Optional[QuizQuestion]:
    """
    Retrieve a specific question by its ID.

    Args:
        question_id: The unique identifier for the question

    Returns:
        QuizQuestion object if found, None otherwise
    """
    for question in ALL_QUESTIONS:
        if question.id == question_id:
            return question
    return None


# Helper function to validate an answer
def validate_answer(question_id: str, answer) -> bool:
    """
    Validate a user's answer to a question.

    Args:
        question_id: The ID of the question being answered
        answer: The user's answer (can be string, list, or other type)

    Returns:
        True if answer is valid, False otherwise
    """
    question = get_question_by_id(question_id)
    if not question:
        return False

    # For the letter question (free text), just check it's not empty
    if question_id == "letter":
        return isinstance(answer, str) and len(answer.strip()) > 0

    # For multi-select questions
    if question.is_multi_select:
        if not isinstance(answer, list):
            return False

        # Check maximum selections constraint
        if question.max_selections and len(answer) > question.max_selections:
            return False

        # Verify all selected values are valid options
        valid_values = [opt.value for opt in question.options]
        return all(ans in valid_values for ans in answer)

    # For single-select questions
    else:
        if not isinstance(answer, str):
            return False

        valid_values = [opt.value for opt in question.options]
        return answer in valid_values


# Export commonly used items
__all__ = [
    'QuestionOption',
    'QuizQuestion',
    'VALUES_QUESTION',
    'STRENGTH_QUESTION',
    'ASPIRATION_QUESTION',
    'METAPHOR_QUESTION',
    'ENERGY_QUESTION',
    'LIFE_FOCUS_QUESTION',
    'CULTURAL_MODE_QUESTION',
    'PRONOUN_QUESTION',
    'LETTER_QUESTION',
    'ALL_QUESTIONS',
    'get_question_by_id',
    'validate_answer',
]
