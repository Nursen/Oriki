"""
API Routes for Oriki Generation Pipeline

This module defines the FastAPI endpoints that orchestrate the complete
Oriki generation process, tying together all three agents in sequence.
"""

from fastapi import APIRouter, HTTPException, status
from typing import Dict, Any

# Import all our models
from backend.models.quiz import QuizSubmission
from backend.models.generation import GenerationResponse
from backend.models.quiz_config import ALL_QUESTIONS

# Import all three agents
from backend.agents.theme_extractor import extract_themes
from backend.agents.poetry_composer import compose_poem
from backend.agents.affirmation_generator import generate_affirmations


# Create the APIRouter - this will be included in the main FastAPI app
router = APIRouter(
    prefix="/api/v1",  # All routes will be prefixed with /api/v1
    tags=["generation"]  # Groups endpoints in the auto-generated docs
)


# ============================================================================
# HELPER FUNCTION: Cultural Mode Mapping
# ============================================================================

def map_cultural_mode(quiz_cultural_mode: str) -> str:
    """
    Maps the quiz cultural_mode values to the poetry composer's expected values.

    The quiz uses "yoruba_inspired" for clarity, but the poetry composer
    expects "yoruba". This function handles that translation.

    Args:
        quiz_cultural_mode: The cultural mode from QuizSubmission
                          (yoruba_inspired, secular, turkish, biblical)

    Returns:
        The mapped mode for the poetry composer
        (yoruba, secular, turkish, biblical)
    """
    mode_mapping = {
        "yoruba_inspired": "yoruba",
        "secular": "secular",
        "turkish": "turkish",
        "biblical": "biblical"
    }

    return mode_mapping.get(quiz_cultural_mode, quiz_cultural_mode)


# ============================================================================
# MAIN GENERATION ENDPOINT
# ============================================================================

@router.post(
    "/generate",
    response_model=GenerationResponse,
    status_code=status.HTTP_200_OK,
    summary="Generate complete Oriki package",
    description="Accepts quiz submission and returns poem, affirmations, and themes"
)
async def generate_oriki(submission: QuizSubmission) -> GenerationResponse:
    """
    Main endpoint that orchestrates the complete Oriki generation pipeline.

    This endpoint coordinates all three agents in sequence:
    1. Theme Extractor: Analyzes quiz responses to extract themes
    2. Poetry Composer: Creates praise poetry in the chosen cultural mode
    3. Affirmation Generator: Produces CBT-based daily affirmations

    Args:
        submission: Validated quiz submission from the user

    Returns:
        GenerationResponse: Complete package with poem, affirmations, and themes

    Raises:
        HTTPException: If any step in the pipeline fails
    """

    try:
        # STEP 1: Extract themes from the quiz submission
        # This analyzes all quiz responses and the free-write letter
        # to identify values, strengths, aspirations, and emotional tone
        themes = await extract_themes(submission)

    except Exception as e:
        # If theme extraction fails, return a 500 error with details
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Theme extraction failed: {str(e)}"
        )

    try:
        # STEP 2: Generate the praise poem
        # Map the cultural mode from quiz format to poetry composer format
        poetry_cultural_mode = map_cultural_mode(submission.cultural_mode)

        # Generate the poem using the extracted themes and cultural mode
        poem = await compose_poem(themes, poetry_cultural_mode)

    except ValueError as e:
        # If cultural mode is invalid, return a 400 error
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid cultural mode: {str(e)}"
        )
    except Exception as e:
        # If poem generation fails for other reasons, return 500 error
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Poetry generation failed: {str(e)}"
        )

    try:
        # STEP 3: Generate daily affirmations
        # These are grounded in the extracted themes and user's values
        affirmations = await generate_affirmations(themes)

    except Exception as e:
        # If affirmation generation fails, return a 500 error
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Affirmation generation failed: {str(e)}"
        )

    # STEP 4: Combine all results into the complete response
    # Return everything together so the frontend has the full package
    return GenerationResponse(
        poem=poem,
        affirmations=affirmations,
        themes=themes,
        cultural_mode=submission.cultural_mode  # Use original format for consistency
    )


# ============================================================================
# QUIZ CONFIGURATION ENDPOINT
# ============================================================================

@router.get(
    "/quiz/questions",
    response_model=Dict[str, Any],
    status_code=status.HTTP_200_OK,
    summary="Get quiz questions configuration",
    description="Returns all quiz questions with their options for frontend rendering"
)
async def get_quiz_questions() -> Dict[str, Any]:
    """
    Returns the quiz configuration for the frontend.

    This endpoint provides all the quiz questions, their options,
    and validation rules so the frontend can render the quiz correctly.

    The frontend can use this to:
    - Display questions in the correct order
    - Show the right options for each question
    - Apply proper validation (multi-select vs single-select)
    - Enforce constraints (e.g., max 3 selections for values)

    Returns:
        Dict containing all quiz questions and metadata
    """

    # Convert the quiz questions to a JSON-friendly format
    # We need to serialize the dataclass objects into dictionaries
    questions = []

    for q in ALL_QUESTIONS:
        question_data = {
            "id": q.id,
            "text": q.text,
            "is_multi_select": q.is_multi_select,
            "max_selections": q.max_selections,
            # Convert options list to dictionaries
            "options": [
                {"value": opt.value, "label": opt.label}
                for opt in q.options
            ]
        }
        questions.append(question_data)

    return {
        "questions": questions,
        "total_questions": len(questions),
        "version": "1.0"  # Version number for future compatibility
    }


# ============================================================================
# HEALTH CHECK ENDPOINT (for this router)
# ============================================================================

@router.get(
    "/health",
    status_code=status.HTTP_200_OK,
    summary="Health check for generation API",
    description="Verifies that the generation routes are accessible"
)
async def generation_health_check() -> Dict[str, str]:
    """
    Simple health check endpoint for the generation routes.

    This is separate from the main app health check and specifically
    verifies that the generation API routes are working.

    Returns:
        Dict with status message
    """
    return {
        "status": "healthy",
        "service": "oriki-generation-api",
        "version": "1.0"
    }
