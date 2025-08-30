from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

# User schemas
class UserBase(BaseModel):
    name: str
    email: EmailStr
    institution: str
    address: str

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    name: Optional[str] = None
    institution: Optional[str] = None
    address: Optional[str] = None

class User(UserBase):
    id: str
    is_admin: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

# Category schemas
class CategoryBase(BaseModel):
    name: str
    parent_id: Optional[str] = None

class CategoryCreate(CategoryBase):
    id: str

class Category(CategoryBase):
    id: str
    created_at: datetime
    
    class Config:
        from_attributes = True

# Product schemas
class ProductBase(BaseModel):
    name: str
    description: str
    price: float
    category_id: str
    category_name: Optional[str] = None
    image_url: Optional[str] = None
    images: Optional[List[str]] = None
    stock: Optional[int] = 0

class ProductCreate(ProductBase):
    id: str

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    category_id: Optional[str] = None
    category_name: Optional[str] = None
    image_url: Optional[str] = None
    images: Optional[List[str]] = None
    stock: Optional[int] = None

class Product(ProductBase):
    id: str
    requested: int
    created_at: datetime
    updated_at: Optional[datetime]
    
    class Config:
        from_attributes = True

# Order schemas
class OrderItemCreate(BaseModel):
    product_id: str
    quantity: int
    price: float

class OrderItem(BaseModel):
    id: int
    product_id: str
    quantity: int
    price: float
    product: Optional[Product] = None
    
    class Config:
        from_attributes = True

class OrderCreate(BaseModel):
    items: List[OrderItemCreate]
    institution: str
    address: str

class OrderUpdate(BaseModel):
    status: Optional[str] = None

class Order(BaseModel):
    id: str
    user_id: str
    institution: str
    address: str
    status: str
    total: float
    created_at: datetime
    updated_at: Optional[datetime]
    items: List[OrderItem] = []
    user: Optional[User] = None
    
    class Config:
        from_attributes = True

# Auth schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

# Wishlist schemas
class WishlistItemCreate(BaseModel):
    product_id: str

class WishlistItem(BaseModel):
    id: int
    product_id: str
    created_at: datetime
    product: Optional[Product] = None
    
    class Config:
        from_attributes = True