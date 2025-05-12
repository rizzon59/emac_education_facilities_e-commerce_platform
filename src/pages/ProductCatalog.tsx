
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

const ProductCatalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  
  const [activeTab, setActiveTab] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Record<string, boolean>>({});
  
  const { addItem, getItemCount } = useCart();
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
  }, [activeTab, searchTerm]);
  
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
    
    if (checked) {
      const product = filteredProducts.find(p => p.id === productId);
      if (product) {
        addItem(product, 1);
      }
    }
  };
  
  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
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
        <Tabs defaultValue={activeTab} onValueChange={handleTabChange}>
          <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-4">
            <TabsTrigger value="all">All Categories</TabsTrigger>
            {categories.map(category => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="all">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  isSelected={!!selectedProducts[product.id]}
                  onCheckboxChange={handleCheckboxChange}
                  onAddToCart={handleAddToCart}
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
                    onCheckboxChange={handleCheckboxChange}
                    onAddToCart={handleAddToCart}
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
  onCheckboxChange: (productId: string, checked: boolean) => void;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, isSelected, onCheckboxChange, onAddToCart }: ProductCardProps) => {
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
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{product.name}</CardTitle>
      </CardHeader>
      
      <CardContent className="pb-4">
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
        <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-0">
        <Link to={`/product/${product.id}`}>
          <Button variant="outline" size="sm">Info</Button>
        </Link>
        <Button 
          size="sm" 
          onClick={() => onAddToCart(product)}
          className="bg-accent hover:bg-accent1-dark"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCatalog;
