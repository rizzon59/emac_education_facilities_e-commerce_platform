from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app import schemas, crud, auth

router = APIRouter()

@router.get("/orders", response_model=List[schemas.Order])
def read_all_orders(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(auth.get_current_admin_user)
):
    return crud.get_orders(db, skip=skip, limit=limit)

@router.put("/orders/{order_id}/status")
def update_order_status(
    order_id: str,
    order_update: schemas.OrderUpdate,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(auth.get_current_admin_user)
):
    db_order = crud.update_order_status(db, order_id=order_id, status=order_update.status)
    if db_order is None:
        raise HTTPException(status_code=404, detail="Order not found")
    return {"message": "Order status updated successfully"}

@router.get("/users", response_model=List[schemas.User])
def read_all_users(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(auth.get_current_admin_user)
):
    return db.query(auth.models.User).offset(skip).limit(limit).all()

@router.get("/stats")
def get_admin_stats(
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(auth.get_current_admin_user)
):
    total_products = db.query(auth.models.Product).count()
    total_orders = db.query(auth.models.Order).count()
    total_users = db.query(auth.models.User).count()
    pending_orders = db.query(auth.models.Order).filter(auth.models.Order.status == "pending").count()
    
    return {
        "total_products": total_products,
        "total_orders": total_orders,
        "total_users": total_users,
        "pending_orders": pending_orders
    }