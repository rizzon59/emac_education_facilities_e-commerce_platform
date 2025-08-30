#!/bin/bash
# Setup script for the Educational Platform Backend

echo "Setting up Educational Platform Backend..."

# Create virtual environment
echo "Creating virtual environment..."
python -m venv venv

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# Copy environment file
echo "Setting up environment file..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "Please edit .env file with your database credentials and secret key"
fi

# Initialize database
echo "Initializing database..."
alembic init alembic
alembic revision --autogenerate -m "Initial migration"
alembic upgrade head

# Seed database
echo "Seeding database with initial data..."
python seed_data.py

echo "Setup complete!"
echo "Run 'python run.py' to start the development server"