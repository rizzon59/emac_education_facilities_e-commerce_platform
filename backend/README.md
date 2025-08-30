# Educational Platform Backend

FastAPI backend for the educational equipment platform.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database URL and secret key
```

3. Set up database:
```bash
# Create database
createdb educational_platform

# Initialize Alembic
alembic init alembic

# Generate first migration
alembic revision --autogenerate -m "Initial migration"

# Apply migration
alembic upgrade head
```

4. Run the server:
```bash
uvicorn app.main:app --reload
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user

### Products
- `GET /products/` - List products (with optional filters)
- `GET /products/{id}` - Get product by ID
- `POST /products/` - Create product (admin only)
- `PUT /products/{id}` - Update product (admin only)
- `DELETE /products/{id}` - Delete product (admin only)
- `GET /products/categories/` - List categories
- `POST /products/categories/` - Create category (admin only)

### Users
- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update user profile
- `GET /users/wishlist` - Get user wishlist
- `POST /users/wishlist/{product_id}` - Add to wishlist
- `DELETE /users/wishlist/{product_id}` - Remove from wishlist

### Orders
- `POST /orders/` - Create order
- `GET /orders/` - Get user orders
- `GET /orders/{id}` - Get specific order

### Admin
- `GET /admin/orders` - Get all orders
- `PUT /admin/orders/{id}/status` - Update order status
- `GET /admin/users` - Get all users
- `GET /admin/stats` - Get platform statistics

## Database Schema

The database includes the following tables:
- `users` - User accounts and profiles
- `categories` - Product categories (hierarchical)
- `products` - Product catalog
- `orders` - Customer orders
- `order_items` - Items within orders
- `wishlist_items` - User wishlist items

## Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Running in Production

1. Set `DEBUG=False` in environment
2. Use a proper WSGI server like Gunicorn:
```bash
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker
```

3. Set up proper database with connection pooling
4. Configure CORS for your frontend domain
5. Use environment variables for all sensitive configuration