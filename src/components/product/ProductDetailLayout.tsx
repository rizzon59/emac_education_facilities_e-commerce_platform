
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface ProductDetailLayoutProps {
  loading: boolean;
  productFound: boolean;
  productName?: string;
  children: ReactNode;
}

const ProductDetailLayout = ({ loading, productFound, productName, children }: ProductDetailLayoutProps) => {
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
  
  if (!productFound) {
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
        {children}
      </div>
    </div>
  );
};

export default ProductDetailLayout;
