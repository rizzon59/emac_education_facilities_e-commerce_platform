import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCart, Product } from "@/context/CartContext";
import { getProductById } from "@/data/products";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
      }
      setLoading(false);
    }
  }, [id]);
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };
  
  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      navigate("/catalog");
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 h-96 bg-gray-200 rounded"></div>
            <div className="w-full md:w-1/2">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-8"></div>
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/catalog">
          <Button>Return to Catalog</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/catalog" className="text-primary hover:underline flex items-center">
          &larr; Back to Catalog
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-auto object-contain rounded-md"
            />
          </div>
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Product Details</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-700 mb-4">
                  {product.description}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Category:</strong> {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Product ID:</strong> {product.id}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-2xl font-bold text-primary mb-6">${product.price.toFixed(2)}</p>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>
          
          <div className="mb-8">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
              Quantity
            </label>
            <div className="flex items-center">
              <Input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-24 mr-4"
              />
              <Button
                onClick={handleAddToCart}
                className="bg-accent hover:bg-accent1-dark text-white"
              >
                Add to Cart
              </Button>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
            <h3 className="font-semibold mb-2">Ordering Information</h3>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              <li>Available for bulk ordering</li>
              <li>Add to your selection and complete the request form</li>
              <li>We'll contact you to confirm your order</li>
              <li>For urgent inquiries, contact us directly</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Need Help?</h3>
            <p className="text-gray-700 text-sm mb-4">
              Contact our support team for any questions about this product.
            </p>
            <div className="flex space-x-4">
              <Link to="/support">
                <Button variant="outline">Support</Button>
              </Link>
              <a href="https://wa.me/255742777922" target="_blank" rel="noopener noreferrer">
                <Button variant="outline">WhatsApp</Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
