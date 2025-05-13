
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types/product";
import { categories, getAllProducts, getProductsByCategory } from "@/data/products";
import { useAdmin } from "@/context/AdminContext";

import ProductCategoryTabs from "@/components/product/ProductCategoryTabs";
import ProductCategoryContent from "@/components/product/ProductCategoryContent";
import CartSummary from "@/components/product/CartSummary";
import AdminPanel from "@/components/admin/AdminPanel";

const ProductCatalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "natural";
  const initialSearch = searchParams.get("search") || "";
  const { isAdminMode } = useAdmin();
  
  const [activeTab, setActiveTab] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
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

    const searchParam = searchParams.get("search");
    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, [searchParams]);
  
  useEffect(() => {
    let products: Product[];
    
    // Get products based on the active tab
    products = getProductsByCategory(activeTab);
    
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      products = products.filter(product => 
        product.name.toLowerCase().includes(term) || 
        product.description.toLowerCase().includes(term)
      );
    }
    
    // Limit to 20 products per discipline as requested
    products = products.slice(0, 20);
    
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
    searchParams.set("category", value);
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
  
  // Find current category object
  const currentCategory = categories.find(c => c.id === activeTab);
  const currentCategoryName = currentCategory ? currentCategory.name : "Products";
  
  return (
    <div className="container mx-auto px-4 py-8">
      {isAdminMode && <AdminPanel />}
      
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
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={handleTabChange} className="w-full">
          <ProductCategoryTabs 
            categories={categories} 
            activeTab={activeTab} 
            onTabChange={handleTabChange}
          />
          
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-primary mb-2">
              {currentCategoryName}
            </h2>
            <div className="h-1 w-20 bg-accent mb-4"></div>
          </div>
          
          <TabsContent value={activeTab}>
            <ProductCategoryContent
              categoryId={activeTab}
              products={filteredProducts}
              selectedProducts={selectedProducts}
              productQuantities={productQuantities}
              onCheckboxChange={handleCheckboxChange}
              onQuantityChange={handleQuantityChange}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      <CartSummary itemCount={itemCount} />
    </div>
  );
};

export default ProductCatalog;
