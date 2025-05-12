
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/context/CartContext";
import { Product } from "@/context/CartContext";
import { categories, getAllProducts, getProductsByCategory } from "@/data/products";
import { Minus, Plus } from "lucide-react";

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
          <TabsList className="bg-gray-100 p-1 mb-6 overflow-x-auto flex w-full rounded-xl">
            <TabsTrigger 
              value="all" 
              className="flex-1 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg"
            >
              All Categories
            </TabsTrigger>
            {categories.map(category => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="flex-1 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-primary mb-2">
              {activeTab === "all" 
                ? "All Products" 
                : categories.find(c => c.id === activeTab)?.name || "Products"}
            </h2>
            <div className="h-1 w-20 bg-accent mb-4"></div>
          </div>
          
          <TabsContent value="all">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  isSelected={!!selectedProducts[product.id]}
                  quantity={productQuantities[product.id] || 1}
                  onCheckboxChange={handleCheckboxChange}
                  onQuantityChange={(quantity) => handleQuantityChange(product.id, quantity)}
                />
              ))}
            </div>
          </TabsContent>
          
          {categories.map(category => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    isSelected={!!selectedProducts[product.id]}
                    quantity={productQuantities[product.id] || 1}
                    onCheckboxChange={handleCheckboxChange}
                    onQuantityChange={(quantity) => handleQuantityChange(product.id, quantity)}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      
      {itemCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-10">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-sm md:text-base">
              <span className="font-medium">{itemCount} items selected</span>
            </div>
            <Link to="/request">
              <Button className="bg-accent2 hover:bg-accent2-dark text-white">
                Proceed to Request
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  quantity: number;
  onCheckboxChange: (productId: string, checked: boolean) => void;
  onQuantityChange: (quantity: number) => void;
}

const ProductCard = ({ product, isSelected, quantity, onCheckboxChange, onQuantityChange }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-48 object-cover"
        />
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
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
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
              onClick={() => onQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
            >
              <Minus size={14} />
            </button>
            <input 
              type="number" 
              min="1" 
              value={quantity}
              onChange={(e) => onQuantityChange(parseInt(e.target.value) || 1)}
              className="w-12 text-center border-none focus:outline-none py-1"
            />
            <button 
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
              onClick={() => onQuantityChange(quantity + 1)}
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

export default ProductCatalog;
