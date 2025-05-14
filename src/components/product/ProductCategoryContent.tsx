
import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product";

interface ProductCategoryContentProps {
  categoryId: string;
  products: Product[];
  selectedProducts: Record<string, boolean>;
  productQuantities: Record<string, number>;
  onCheckboxChange: (productId: string, checked: boolean) => void;
  onQuantityChange: (productId: string, quantity: number) => void;
}

const ProductCategoryContent = ({
  categoryId,
  products,
  selectedProducts,
  productQuantities,
  onCheckboxChange,
  onQuantityChange,
}: ProductCategoryContentProps) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No products found in this category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          isSelected={!!selectedProducts[product.id]}
          quantity={productQuantities[product.id] || 1}
          onCheckboxChange={onCheckboxChange}
          onQuantityChange={(quantity: number) => onQuantityChange(product.id, quantity)}
        />
      ))}
    </div>
  );
};

export default ProductCategoryContent;
