"""
Audio Renderer Agent - Converts text to speech using OpenAI TTS.

This agent takes text (poem + affirmations) and converts it to MP3 audio
using OpenAI's Text-to-Speech API. It's designed for simplicity and
provides high-quality audio output suitable for meditation and reflection.
"""

import base64
from openai import AsyncOpenAI
from backend.config import settings


# Initialize the OpenAI client with API key from settings
# Using AsyncOpenAI for non-blocking audio generation
client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)


async def generate_audio(text: str, voice: str = "nova") -> bytes:
    """
    Converts text to speech using OpenAI's TTS API.

    This function takes text input and generates MP3 audio using one of
    OpenAI's six available voices. The audio is returned as raw bytes
    that can be encoded to base64 for JSON transmission.

    Args:
        text: The text to convert to speech (poem + affirmations)
        voice: OpenAI TTS voice name. Options are:
               - alloy: Neutral and balanced
               - echo: Male-sounding, clear
               - fable: British accent, expressive
               - onyx: Deep, authoritative
               - nova: Female-sounding, warm (default)
               - shimmer: Soft, gentle

    Returns:
        bytes: MP3 audio data as raw bytes

    Raises:
        Exception: If the OpenAI API call fails

    Example:
        >>> audio_bytes = await generate_audio("You are strong", "nova")
        >>> audio_base64 = base64.b64encode(audio_bytes).decode('utf-8')
    """

    # Call OpenAI's Text-to-Speech API
    # - model: "tts-1" is faster, "tts-1-hd" is higher quality
    # - voice: One of the six available voices
    # - input: The text to convert to speech
    response = await client.audio.speech.create(
        model="tts-1",  # Using standard model for speed (good for education/demos)
        voice=voice,     # Voice selection from function parameter
        input=text       # The text to speak
    )

    # The response has a read() method that returns audio bytes
    # We read the entire audio content into memory
    audio_bytes = response.read()

    return audio_bytes


def estimate_duration(text: str) -> float:
    """
    Estimates audio duration based on text length.

    This is a rough estimation based on average speaking speed.
    The actual duration will vary based on the voice, pauses, and
    the specific TTS model's pacing.

    Average speaking speed: ~150 words per minute = 2.5 words per second

    Args:
        text: The text that will be converted to speech

    Returns:
        float: Estimated duration in seconds

    Example:
        >>> estimate_duration("Hello world this is a test")
        >>> 2.4  # 6 words / 2.5 words per second
    """

    # Count words by splitting on whitespace
    word_count = len(text.split())

    # Average speaking speed: 2.5 words per second (150 words/minute)
    # This is a conservative estimate - actual may be slightly different
    estimated_seconds = word_count / 2.5

    return round(estimated_seconds, 1)


# Example usage for testing (commented out for production)
"""
# To test this agent directly:
import asyncio

async def test_audio_renderer():
    # Sample text (would normally come from poem + affirmations)
    sample_text = '''
    The one who walks with purpose, steady as the mountain,
    She whose voice lifts others, strong as the river's song.
    You are worthy of kindness and compassion.
    You have the strength to face challenges with grace.
    '''

    print("Generating audio...")
    audio_bytes = await generate_audio(sample_text, voice="nova")

    print(f"Audio generated: {len(audio_bytes)} bytes")

    # Estimate duration
    duration = estimate_duration(sample_text)
    print(f"Estimated duration: {duration} seconds")

    # Save to file for testing
    with open("test_audio.mp3", "wb") as f:
        f.write(audio_bytes)
    print("Saved to test_audio.mp3")

# Run the test
asyncio.run(test_audio_renderer())
"""
