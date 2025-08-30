from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app import schemas, crud, auth

router = APIRouter()

@router.get("/profile", response_model=schemas.User)
def read_user_profile(current_user: schemas.User = Depends(auth.get_current_user)):
    return current_user

@router.put("/profile", response_model=schemas.User)
def update_user_profile(
    user_update: schemas.UserUpdate,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(auth.get_current_user)
):
    return crud.update_user(db, user_id=current_user.id, user_update=user_update)

@router.post("/wishlist/{product_id}", response_model=schemas.WishlistItem)
def add_to_wishlist(
    product_id: str,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(auth.get_current_user)
):
    # Check if product exists
    product = crud.get_product(db, product_id=product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    return crud.add_to_wishlist(db, user_id=current_user.id, product_id=product_id)

@router.delete("/wishlist/{product_id}")
def remove_from_wishlist(
    product_id: str,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(auth.get_current_user)
):
    db_item = crud.remove_from_wishlist(db, user_id=current_user.id, product_id=product_id)
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found in wishlist")
    return {"message": "Item removed from wishlist"}

@router.get("/wishlist", response_model=List[schemas.WishlistItem])
def get_user_wishlist(
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(auth.get_current_user)
):
    return crud.get_user_wishlist(db, user_id=current_user.id)