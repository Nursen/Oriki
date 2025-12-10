"""
Theme Extractor Agent - Educational Example
Demonstrates structured output from LangChain with OpenAI
"""

from pydantic import BaseModel, Field
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
import json

# ============================================================================
# STEP 1: Define the output structure
# ============================================================================
# We use Pydantic models to enforce structured output from the LLM
# This ensures we always get the data format we expect

class ThemeData(BaseModel):
    """The structured output from our Theme Extractor agent"""

    values: list[str] = Field(
        description="Core values or themes identified (3-5 items)"
    )
    emotional_tone: str = Field(
        description="Primary emotional tone (e.g., hopeful, resilient, joyful)"
    )
    metaphors: list[str] = Field(
        description="Key metaphors or symbols suggested by the input"
    )
    core_message: str = Field(
        description="One-sentence summary of the central theme"
    )


# ============================================================================
# STEP 2: Create the agent
# ============================================================================
# We keep it simple: prompt template + LLM with structured output

def create_theme_extractor():
    """
    Creates a Theme Extractor agent that analyzes user input and
    returns structured theme data.

    No complex chains or agents needed - just a well-designed prompt
    that the LLM can work with.
    """

    # Initialize the LLM with structured output enabled
    # ChatOpenAI handles the conversion to our Pydantic model
    llm = ChatOpenAI(
        model="gpt-4o-mini",
        temperature=0.7  # Some creativity, but consistent structure
    )

    # Create the prompt template
    # Clear instructions help the LLM understand what we want
    prompt = ChatPromptTemplate.from_template("""
    Analyze this personal story or reflection and extract its core themes.

    User input:
    {user_input}

    Think about:
    - What values or principles does this reveal?
    - What emotional tone does it convey?
    - What metaphors or symbols appear (explicit or implied)?
    - What is the single most important message?

    Return structured data matching this format.
    """)

    # Create the chain: prompt -> LLM with structured output
    # with_structured_output() automatically validates against our schema
    chain = prompt | llm.with_structured_output(ThemeData)

    return chain


# ============================================================================
# STEP 3: Simple usage example
# ============================================================================

if __name__ == "__main__":
    # Initialize the agent
    theme_extractor = create_theme_extractor()

    # Example input - a simple personal reflection
    user_story = """
    I've always felt drawn to helping others, even when it's difficult.
    Last year, I volunteered at a local shelter and realized that small
    acts of kindness create ripples of change. It reminded me that we're
    all connected, and that my actions matter.
    """

    # Run the agent
    print("Extracting themes...")
    result = theme_extractor.invoke({"user_input": user_story})

    # The result is a ThemeData object with validated fields
    print("\n--- Theme Extraction Results ---")
    print(f"Core Message: {result.core_message}")
    print(f"Emotional Tone: {result.emotional_tone}")
    print(f"Values: {', '.join(result.values)}")
    print(f"Metaphors: {', '.join(result.metaphors)}")
