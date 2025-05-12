
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import ProductCard from "./ProductCard";
import { Product } from "@/context/CartContext";

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
  return (
    <TabsContent value={categoryId}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            isSelected={!!selectedProducts[product.id]}
            quantity={productQuantities[product.id] || 1}
            onCheckboxChange={onCheckboxChange}
            onQuantityChange={(quantity) => onQuantityChange(product.id, quantity)}
          />
        ))}
      </div>
    </TabsContent>
  );
};

export default ProductCategoryContent;
