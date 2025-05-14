
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/context/CartContext";
import { ProductImageCarousel } from "@/components/product/ProductImageCarousel";

interface ProductImagesProps {
  product: Product;
}

const ProductImages = ({ product }: ProductImagesProps) => {
  return (
    <div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-auto object-contain rounded-md"
        />
      </div>
      
      {product.images && product.images.length > 0 && (
        <div className="mt-4">
          <ProductImageCarousel 
            images={product.images} 
            productName={product.name} 
          />
        </div>
      )}
      
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
  );
};

export default ProductImages;
