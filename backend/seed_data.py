"""
Script to seed the database with initial data
"""
from sqlalchemy.orm import Session
from app.database import SessionLocal, engine
from app import models, auth
import uuid

def create_categories(db: Session):
    """Create initial categories"""
    categories_data = [
        {"id": "all", "name": "All Products", "parent_id": None},
        {"id": "natural", "name": "Natural Science", "parent_id": None},
        {"id": "formal", "name": "Formal Science", "parent_id": None},
        {"id": "social", "name": "Social Science", "parent_id": None},
        
        # Natural Science subcategories
        {"id": "physics", "name": "Physics", "parent_id": "natural"},
        {"id": "chemistry", "name": "Chemistry", "parent_id": "natural"},
        {"id": "biology", "name": "Biology", "parent_id": "natural"},
        {"id": "earth", "name": "Earth Science", "parent_id": "natural"},
        {"id": "space", "name": "Space Science", "parent_id": "natural"},
        
        # Formal Science subcategories
        {"id": "statistics", "name": "Statistics", "parent_id": "formal"},
        {"id": "applied-math", "name": "Applied Mathematics", "parent_id": "formal"},
        {"id": "pure-math", "name": "Pure Mathematics", "parent_id": "formal"},
        {"id": "logic", "name": "Logic", "parent_id": "formal"},
        {"id": "system-science", "name": "Systems Science", "parent_id": "formal"},
        
        # Social Science subcategories
        {"id": "history", "name": "History", "parent_id": "social"},
        {"id": "geography", "name": "Geography", "parent_id": "social"},
        {"id": "economics", "name": "Economics", "parent_id": "social"},
        {"id": "ethics", "name": "Ethics", "parent_id": "social"},
    ]
    
    for cat_data in categories_data:
        category = models.Category(**cat_data)
        db.add(category)
    
    db.commit()

def create_products(db: Session):
    """Create initial products"""
    products_data = [
        {
            "id": "phys-001",
            "name": "Digital Electronic Scale",
            "description": "Precision digital scale for laboratory measurements with 0.01g accuracy.",
            "price": 299.99,
            "category_id": "physics",
            "category_name": "Physics",
            "image_url": "/placeholder.svg",
            "images": ["/placeholder.svg"] * 5,
            "stock": 25
        },
        {
            "id": "phys-002",
            "name": "Light Ray Box",
            "description": "Educational light ray box for demonstrating principles of optics and light behavior.",
            "price": 129.50,
            "category_id": "physics",
            "category_name": "Physics",
            "image_url": "/placeholder.svg",
            "images": ["/placeholder.svg"] * 5,
            "stock": 40
        },
        {
            "id": "chem-001",
            "name": "Laboratory Glassware Set",
            "description": "Complete set of borosilicate glass beakers, flasks, and cylinders for chemistry experiments.",
            "price": 249.99,
            "category_id": "chemistry",
            "category_name": "Chemistry",
            "image_url": "/placeholder.svg",
            "images": ["/placeholder.svg"] * 5,
            "stock": 35
        },
        {
            "id": "bio-001",
            "name": "Compound Microscope",
            "description": "High-quality compound microscope with 40x-1000x magnification for detailed specimen observation.",
            "price": 599.99,
            "category_id": "biology",
            "category_name": "Biology",
            "image_url": "/placeholder.svg",
            "images": ["/placeholder.svg"] * 5,
            "stock": 40
        }
    ]
    
    for prod_data in products_data:
        product = models.Product(**prod_data)
        db.add(product)
    
    db.commit()

def create_admin_user(db: Session):
    """Create an admin user"""
    admin_data = {
        "id": str(uuid.uuid4()),
        "name": "Admin User",
        "email": "admin@educational.com",
        "hashed_password": auth.get_password_hash("admin123"),
        "institution": "Platform Administration",
        "address": "Platform HQ",
        "is_admin": True
    }
    
    admin_user = models.User(**admin_data)
    db.add(admin_user)
    db.commit()

def seed_database():
    """Main function to seed the database"""
    # Create tables
    models.Base.metadata.create_all(bind=engine)
    
    # Create session
    db = SessionLocal()
    
    try:
        # Check if data already exists
        if db.query(models.Category).first():
            print("Database already seeded!")
            return
        
        print("Seeding categories...")
        create_categories(db)
        
        print("Seeding products...")
        create_products(db)
        
        print("Creating admin user...")
        create_admin_user(db)
        
        print("Database seeded successfully!")
        
    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()