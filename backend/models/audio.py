"""
Pydantic Models for Audio Generation

This module defines the request and response models for converting
text (poem + affirmations) into audio using OpenAI's Text-to-Speech API.
"""

from pydantic import BaseModel, Field


class AudioRequest(BaseModel):
    """
    Request model for audio generation endpoint.

    This model accepts text (usually a combined poem + affirmations)
    and specifies which voice to use for the text-to-speech conversion.
    """

    # The text content to convert to speech
    # This is typically the poem lines joined together plus affirmations
    text: str = Field(
        description="The text to convert to audio (poem + affirmations combined)"
    )

    # OpenAI TTS voice selection
    # Each voice has a different character and tone
    voice: str = Field(
        default="nova",
        description="OpenAI TTS voice: alloy, echo, fable, onyx, nova, or shimmer"
    )

    # Pydantic v2 configuration with example
    model_config = {
        "json_schema_extra": {
            "example": {
                "text": "The one who walks with purpose, steady as the mountain. You are worthy of kindness and compassion.",
                "voice": "nova"
            }
        }
    }


class AudioResponse(BaseModel):
    """
    Response model for audio generation endpoint.

    Returns the generated audio as a base64-encoded string, which can be
    easily transmitted via JSON and decoded by the frontend for playback.
    """

    # Base64-encoded MP3 audio data
    # The frontend can decode this and create an audio player
    audio_base64: str = Field(
        description="Base64-encoded MP3 audio file"
    )

    # Approximate duration in seconds
    # Helps frontend set up progress bars or estimate playback time
    # Note: This is estimated since we don't decode the MP3 to get exact duration
    duration_seconds: float = Field(
        description="Approximate audio duration in seconds"
    )

    # Pydantic v2 configuration with example
    model_config = {
        "json_schema_extra": {
            "example": {
                "audio_base64": "SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAA...",
                "duration_seconds": 12.5
            }
        }
    }
