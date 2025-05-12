
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Tabs } from "@/components/ui/tabs";
import { useCart } from "@/context/CartContext";
import { Product } from "@/context/CartContext";
import { categories, getAllProducts, getProductsByCategory } from "@/data/products";

import ProductCategoryTabs from "@/components/product/ProductCategoryTabs";
import ProductCategoryContent from "@/components/product/ProductCategoryContent";
import CartSummary from "@/components/product/CartSummary";

const ProductCatalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  
  const [activeTab, setActiveTab] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Record<string, boolean>>({});
  const [productQuantities, setProductQuantities] = useState<Record<string, number>>({});
  
  const { addItem, removeItem, items, getItemCount } = useCart();
  const itemCount = getItemCount();
  
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setActiveTab(categoryParam);
    }
  }, [searchParams]);
  
  useEffect(() => {
    let products: Product[];
    
    if (activeTab === "all") {
      products = getAllProducts();
    } else {
      products = getProductsByCategory(activeTab);
    }
    
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      products = products.filter(product => 
        product.name.toLowerCase().includes(term) || 
        product.description.toLowerCase().includes(term)
      );
    }
    
    setFilteredProducts(products);
    
    // Initialize quantities for all products
    const initialQuantities: Record<string, number> = {};
    products.forEach(product => {
      if (!productQuantities[product.id]) {
        initialQuantities[product.id] = 1;
      }
    });
    
    setProductQuantities(prev => ({...prev, ...initialQuantities}));
    
    // Check if any selected products are in the cart
    const cartSelectedState: Record<string, boolean> = {};
    items.forEach(item => {
      cartSelectedState[item.id] = true;
    });
    setSelectedProducts(prev => ({...prev, ...cartSelectedState}));
    
  }, [activeTab, searchTerm, items]);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", value);
    }
    setSearchParams(searchParams);
  };
  
  const handleCheckboxChange = (productId: string, checked: boolean) => {
    setSelectedProducts(prev => ({
      ...prev,
      [productId]: checked
    }));
    
    const product = filteredProducts.find(p => p.id === productId);
    if (product) {
      if (checked) {
        addItem(product, productQuantities[productId] || 1);
      } else {
        removeItem(productId);
      }
    }
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setProductQuantities(prev => ({
      ...prev,
      [productId]: newQuantity
    }));
    
    // If product is selected, update cart quantity
    if (selectedProducts[productId]) {
      const product = filteredProducts.find(p => p.id === productId);
      if (product) {
        addItem(product, newQuantity);
      }
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Product Catalog</h1>
          <p className="text-gray-600 mb-4">Browse our selection of quality educational materials</p>
        </div>
        
        <div className="w-full md:w-auto">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full md:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <Tabs defaultValue={activeTab} onValueChange={handleTabChange} className="w-full">
          <ProductCategoryTabs categories={categories} activeTab={activeTab} />
          
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-primary mb-2">
              {activeTab === "all" 
                ? "All Products" 
                : categories.find(c => c.id === activeTab)?.name || "Products"}
            </h2>
            <div className="h-1 w-20 bg-accent mb-4"></div>
          </div>
          
          <ProductCategoryContent
            categoryId="all"
            products={filteredProducts}
            selectedProducts={selectedProducts}
            productQuantities={productQuantities}
            onCheckboxChange={handleCheckboxChange}
            onQuantityChange={handleQuantityChange}
          />
          
          {categories.map(category => (
            <ProductCategoryContent
              key={category.id}
              categoryId={category.id}
              products={filteredProducts}
              selectedProducts={selectedProducts}
              productQuantities={productQuantities}
              onCheckboxChange={handleCheckboxChange}
              onQuantityChange={handleQuantityChange}
            />
          ))}
        </Tabs>
      </div>
      
      <CartSummary itemCount={itemCount} />
    </div>
  );
};

export default ProductCatalog;
