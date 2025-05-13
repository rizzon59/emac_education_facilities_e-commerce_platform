
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Product } from "@/types/product";
import { Minus, Plus } from "lucide-react";
import ProductImageCarousel from "./ProductImageCarousel";

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  quantity: number;
  onCheckboxChange: (productId: string, checked: boolean) => void;
  onQuantityChange: (productId: string, quantity: number) => void;
}

const ProductCard = ({ product, isSelected, quantity, onCheckboxChange, onQuantityChange }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative">
        <ProductImageCarousel images={product.images} productName={product.name} />
        <div className="absolute top-2 right-2">
          <div className="flex items-center space-x-2 bg-white p-1 rounded-md shadow">
            <Checkbox 
              id={`select-${product.id}`} 
              checked={isSelected}
              onCheckedChange={(checked) => onCheckboxChange(product.id, checked as boolean)}
            />
            <Label htmlFor={`select-${product.id}`} className="text-xs">
              Select
            </Label>
          </div>
        </div>
        <div className="absolute bottom-2 left-2 bg-primary text-white px-2 py-1 rounded text-xs font-medium">
          {product.categoryName || product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{product.name}</CardTitle>
      </CardHeader>
      
      <CardContent className="pb-4">
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
        <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
        
        {isSelected && (
          <div className="flex items-center mt-3 border rounded-md overflow-hidden">
            <button 
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
              onClick={() => onQuantityChange(product.id, quantity - 1)}
              disabled={quantity <= 1}
            >
              <Minus size={14} />
            </button>
            <input 
              type="number" 
              min="1" 
              value={quantity}
              onChange={(e) => onQuantityChange(product.id, parseInt(e.target.value) || 1)}
              className="w-12 text-center border-none focus:outline-none py-1"
            />
            <button 
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
              onClick={() => onQuantityChange(product.id, quantity + 1)}
            >
              <Plus size={14} />
            </button>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between pt-0">
        <Link to={`/product/${product.id}`}>
          <Button variant="outline" size="sm">Info</Button>
        </Link>
        {!isSelected && (
          <Button 
            size="sm" 
            onClick={() => onCheckboxChange(product.id, true)}
            className="bg-accent hover:bg-accent1-dark"
          >
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
