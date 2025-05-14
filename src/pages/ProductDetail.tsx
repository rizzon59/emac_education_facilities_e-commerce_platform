
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart, Product } from "@/context/CartContext";
import { getProductById } from "@/data/products";
import ProductDetailLayout from "@/components/product/ProductDetailLayout";
import ProductImages from "@/components/product/ProductImages";
import ProductInfo from "@/components/product/ProductInfo";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { items } = useCart();
  
  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
      }
      setLoading(false);
    }
  }, [id]);
  
  // Calculate initial quantity if this product is already in the cart
  const getInitialQuantity = () => {
    if (!product) return 1;
    const cartItem = items.find(item => item.id === product.id);
    return cartItem ? cartItem.quantity : 1;
  };
  
  return (
    <ProductDetailLayout 
      loading={loading} 
      productFound={product !== null} 
      productName={product?.name}
    >
      {product && (
        <>
          <ProductImages product={product} />
          <ProductInfo product={product} initialQuantity={getInitialQuantity()} />
        </>
      )}
    </ProductDetailLayout>
  );
};

export default ProductDetail;
