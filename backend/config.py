"""
Configuration management for the Oriki backend application.

This module uses pydantic-settings to load environment variables from a .env file.
It provides a singleton Settings instance that can be imported throughout the app.
"""

from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional


class Settings(BaseSettings):
    """
    Application settings loaded from environment variables.

    Pydantic will automatically load values from:
    1. Environment variables
    2. .env file in the backend directory
    3. Default values defined below

    Required settings will raise an error if not provided.
    """

    # OpenAI Configuration - REQUIRED
    # This is the main API key needed for LLM functionality
    OPENAI_API_KEY: str

    # Application Settings
    # Debug mode enables detailed error messages and auto-reload
    DEBUG: bool = True

    # API Configuration
    # These control where the FastAPI server runs
    API_HOST: str = "0.0.0.0"
    API_PORT: int = 8000

    # Audio Generation Settings
    # Directory where audio files will be saved (relative to project root)
    AUDIO_OUTPUT_DIR: str = "audio_output"

    # Model Configuration
    # Default model to use for story generation
    OPENAI_MODEL: str = "gpt-4-turbo-preview"

    # Temperature controls creativity in text generation (0.0 to 1.0)
    # Lower values = more focused, Higher values = more creative
    MODEL_TEMPERATURE: float = 0.7

    # Pydantic settings configuration
    # This tells pydantic-settings where to find the .env file
    model_config = SettingsConfigDict(
        env_file=".env",  # Look for .env in the same directory
        env_file_encoding="utf-8",
        case_sensitive=True,  # Environment variables are case-sensitive
        extra="ignore"  # Ignore extra fields in .env that aren't defined here
    )


# Singleton instance - import this throughout your application
# Usage: from backend.config import settings
settings = Settings()
