"""
Test script for the Theme Extractor Agent

This demonstrates how to use the theme extractor with sample quiz data.
Run this to verify the agent is working correctly.

Prerequisites:
- OpenAI API key set in backend/.env
- Required packages: langchain-openai, pydantic
"""

import asyncio
from backend.models.quiz import QuizSubmission
from backend.agents.theme_extractor import extract_themes


# Sample quiz submission for testing
# This represents what a real user might submit
SAMPLE_QUIZ = {
    "top_values": ["integrity", "compassion", "wisdom"],
    "greatest_strength": "empathy",
    "aspirational_trait": "confidence",
    "metaphor_archetype": "river",
    "energy_style": "healer",
    "life_focus": "spirituality",
    "cultural_mode": "yoruba_inspired",
    "free_write_letter": """
    Dear future self,

    I hope you remember how far you've come. Right now, I'm learning to trust
    my own voice and embrace my unique gifts. Sometimes it feels like I'm swimming
    upstream, but I know that struggle builds strength.

    I want you to know that I'm committed to helping others find their light,
    even when mine feels dim. Every act of kindness creates ripples that extend
    far beyond what we can see. Keep being a bridge between people, keep listening
    deeply, and keep believing in the power of genuine connection.

    You are capable of more than you realize. Stay grounded in your values,
    trust your intuition, and never stop growing. The world needs your particular
    medicine - your empathy, your wisdom, your gentle strength.

    With love and hope,
    Your present self
    """
}


async def test_theme_extraction():
    """
    Test the theme extractor with sample data and print results.
    """

    print("=" * 70)
    print("THEME EXTRACTOR TEST")
    print("=" * 70)

    # Create a validated QuizSubmission object
    print("\n1. Creating quiz submission from sample data...")
    quiz = QuizSubmission(**SAMPLE_QUIZ)
    print("   Quiz validated successfully!")

    # Extract themes using the agent
    print("\n2. Extracting themes (this may take a few seconds)...")
    themes = await extract_themes(quiz)

    # Display the results
    print("\n" + "=" * 70)
    print("EXTRACTED THEMES")
    print("=" * 70)

    print(f"\nEmotional Tone: {themes.emotional_tone}")

    print(f"\nValues ({len(themes.values)}):")
    for value in themes.values:
        print(f"  - {value}")

    print(f"\nMetaphors ({len(themes.metaphors)}):")
    for metaphor in themes.metaphors:
        print(f"  - {metaphor}")

    print(f"\nIdentity Markers ({len(themes.identity_markers)}):")
    for marker in themes.identity_markers:
        print(f"  - {marker}")

    print(f"\nAspirations ({len(themes.aspirations)}):")
    for aspiration in themes.aspirations:
        print(f"  - {aspiration}")

    print(f"\nStrengths ({len(themes.strengths)}):")
    for strength in themes.strengths:
        print(f"  - {strength}")

    print(f"\nKey Themes ({len(themes.key_themes)}):")
    for i, theme in enumerate(themes.key_themes, 1):
        print(f"  {i}. {theme}")

    print("\n" + "=" * 70)
    print("TEST COMPLETED SUCCESSFULLY")
    print("=" * 70)

    return themes


# Main execution
if __name__ == "__main__":
    # Run the async test function
    asyncio.run(test_theme_extraction())
