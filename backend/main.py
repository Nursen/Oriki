"""
Oriki API - Main FastAPI Application

This is the entry point for the Oriki API backend.
It sets up the FastAPI app with basic endpoints and middleware.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# Import our configuration settings
from backend.config import settings

# Import our API routes
from backend.api.routes import router as api_router

# Initialize the FastAPI application
app = FastAPI(
    title="Oriki API",
    description="Backend API for Oriki - A platform for Yoruba cultural heritage and storytelling",
    version="0.1.0"
)

# Configure CORS middleware to allow frontend to communicate with backend
# DEPLOYMENT CONFIGURATION:
# This allows both local development and GitHub Pages production deployment
# to communicate with the backend API
#
# ALLOWED ORIGINS:
# - http://localhost:* - For local development (any port)
# - https://*.github.io - For GitHub Pages deployment
# - https://nursen.github.io - Your specific GitHub Pages domain
#
# After deploying to GitHub Pages, your frontend URL will be:
# https://YOUR_USERNAME.github.io/Oriki/
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",        # Local frontend development
        "http://localhost:8080",        # Alternative local port
        "http://127.0.0.1:3000",        # Local development alternative
        "http://127.0.0.1:8080",        # Alternative local port
        "https://nursen.github.io"      # Your GitHub Pages domain
    ],
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)


# Include our API routes
# This connects all the generation endpoints (poem, affirmations, themes)
# to the main FastAPI application at the /api/v1 prefix
app.include_router(api_router)


# Root endpoint - provides basic information about the API
@app.get("/")
async def root():
    """
    Root endpoint that returns basic API information.
    This is helpful for confirming the API is running.
    """
    return {
        "message": "Welcome to Oriki API",
        "version": "0.1.0",
        "docs": "/docs",  # Link to interactive API documentation
    }


# Health check endpoint - used to verify the API is running properly
@app.get("/health")
async def health_check():
    """
    Health check endpoint.
    Used by monitoring tools and deployment systems to verify the API is operational.
    """
    return {"status": "healthy"}


# Run the application using uvicorn when this file is executed directly
# This is for local development only
if __name__ == "__main__":
    # Start the uvicorn server
    # - host: "0.0.0.0" allows connections from outside localhost
    # - port: taken from our settings configuration
    # - reload: automatically restarts server when code changes (development only)
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=settings.API_PORT,
        reload=True
    )
