from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import List, Optional
import uuid
from app import models, schemas, auth

# User CRUD operations
def get_user(db: Session, user_id: str):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = auth.get_password_hash(user.password)
    db_user = models.User(
        id=str(uuid.uuid4()),
        name=user.name,
        email=user.email,
        hashed_password=hashed_password,
        institution=user.institution,
        address=user.address
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user(db: Session, user_id: str, user_update: schemas.UserUpdate):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if db_user:
        for key, value in user_update.dict(exclude_unset=True).items():
            setattr(db_user, key, value)
        db.commit()
        db.refresh(db_user)
    return db_user

# Product CRUD operations
def get_products(db: Session, skip: int = 0, limit: int = 100, category: Optional[str] = None, search: Optional[str] = None):
    query = db.query(models.Product)
    
    if category and category != "all":
        query = query.filter(models.Product.category_id == category)
    
    if search:
        query = query.filter(
            or_(
                models.Product.name.ilike(f"%{search}%"),
                models.Product.description.ilike(f"%{search}%")
            )
        )
    
    return query.offset(skip).limit(limit).all()

def get_product(db: Session, product_id: str):
    return db.query(models.Product).filter(models.Product.id == product_id).first()

def create_product(db: Session, product: schemas.ProductCreate):
    db_product = models.Product(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

def update_product(db: Session, product_id: str, product_update: schemas.ProductUpdate):
    db_product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if db_product:
        for key, value in product_update.dict(exclude_unset=True).items():
            setattr(db_product, key, value)
        db.commit()
        db.refresh(db_product)
    return db_product

def delete_product(db: Session, product_id: str):
    db_product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if db_product:
        db.delete(db_product)
        db.commit()
    return db_product

# Category CRUD operations
def get_categories(db: Session):
    return db.query(models.Category).all()

def get_category(db: Session, category_id: str):
    return db.query(models.Category).filter(models.Category.id == category_id).first()

def create_category(db: Session, category: schemas.CategoryCreate):
    db_category = models.Category(**category.dict())
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

# Order CRUD operations
def create_order(db: Session, order: schemas.OrderCreate, user_id: str):
    total = sum(item.price * item.quantity for item in order.items)
    
    db_order = models.Order(
        id=str(uuid.uuid4()),
        user_id=user_id,
        institution=order.institution,
        address=order.address,
        total=total
    )
    db.add(db_order)
    db.flush()  # Get the order ID
    
    # Create order items
    for item in order.items:
        db_item = models.OrderItem(
            order_id=db_order.id,
            product_id=item.product_id,
            quantity=item.quantity,
            price=item.price
        )
        db.add(db_item)
    
    db.commit()
    db.refresh(db_order)
    return db_order

def get_orders(db: Session, skip: int = 0, limit: int = 100, user_id: Optional[str] = None):
    query = db.query(models.Order)
    if user_id:
        query = query.filter(models.Order.user_id == user_id)
    return query.offset(skip).limit(limit).all()

def get_order(db: Session, order_id: str):
    return db.query(models.Order).filter(models.Order.id == order_id).first()

def update_order_status(db: Session, order_id: str, status: str):
    db_order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if db_order:
        db_order.status = status
        db.commit()
        db.refresh(db_order)
    return db_order

# Wishlist CRUD operations
def add_to_wishlist(db: Session, user_id: str, product_id: str):
    # Check if already in wishlist
    existing = db.query(models.WishlistItem).filter(
        models.WishlistItem.user_id == user_id,
        models.WishlistItem.product_id == product_id
    ).first()
    
    if existing:
        return existing
    
    db_item = models.WishlistItem(user_id=user_id, product_id=product_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def remove_from_wishlist(db: Session, user_id: str, product_id: str):
    db_item = db.query(models.WishlistItem).filter(
        models.WishlistItem.user_id == user_id,
        models.WishlistItem.product_id == product_id
    ).first()
    
    if db_item:
        db.delete(db_item)
        db.commit()
    return db_item

def get_user_wishlist(db: Session, user_id: str):
    return db.query(models.WishlistItem).filter(models.WishlistItem.user_id == user_id).all()