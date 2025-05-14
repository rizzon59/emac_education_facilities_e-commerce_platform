
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Minus, Plus } from "lucide-react";
import { useCart, Product } from "@/context/CartContext";
import { useUser } from "@/hooks/useUser";
import { toast } from "@/components/ui/use-toast";

interface ProductInfoProps {
  product: Product;
  initialQuantity?: number;
}

const ProductInfo = ({ product, initialQuantity = 1 }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { user, addToWishlist, removeFromWishlist, isInWishlist } = useUser();
  const inWishlist = isInWishlist(product.id);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };
  
  const handleAddToCart = () => {
    addItem(product, quantity);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
    navigate("/catalog");
  };

  const handleWishlistToggle = () => {
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to be logged in to add items to your wishlist",
      });
      return;
    }
    
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist`,
      });
    } else {
      addToWishlist(product.id);
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist`,
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-start">
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <Button 
          variant="ghost" 
          size="icon"
          className={inWishlist ? 'text-red-500' : 'text-gray-400'}
          onClick={handleWishlistToggle}
        >
          <Heart className={`h-5 w-5 ${inWishlist ? 'fill-current' : ''}`} />
        </Button>
      </div>
      <div className="inline-block bg-primary text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
        {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
      </div>
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
          <div className="flex border border-gray-300 rounded-md overflow-hidden">
            <button 
              type="button"
              onClick={decrementQuantity}
              className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
              disabled={quantity <= 1}
            >
              <Minus size={16} />
            </button>
            <Input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-20 border-none text-center"
            />
            <button 
              type="button"
              onClick={incrementQuantity}
              className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>
          <Button
            onClick={handleAddToCart}
            className="ml-4 bg-accent hover:bg-accent1-dark text-white"
          >
            Add to Cart
          </Button>
        </div>
      </div>
      
      <ProductAdditionalInfo />
    </div>
  );
};

const ProductAdditionalInfo = () => {
  return (
    <>
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
    </>
  );
};

export default ProductInfo;
