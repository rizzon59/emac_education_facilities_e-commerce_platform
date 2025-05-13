
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Category } from "@/types/product";

interface ProductCategoryTabsProps {
  categories: Category[];
  activeTab: string;
  onTabChange: (value: string) => void;
}

const ProductCategoryTabs = ({ categories, activeTab, onTabChange }: ProductCategoryTabsProps) => {
  // Filter only parent categories
  const parentCategories = categories.filter(cat => !cat.parentId);
  
  return (
    <div className="mb-6">
      <TabsList className="bg-gray-100 p-1 mb-2 overflow-x-auto flex w-full rounded-xl">
        {parentCategories.map(category => (
          <TabsTrigger 
            key={category.id} 
            value={category.id}
            onClick={() => onTabChange(category.id)}
            className="flex-1 py-3 px-4 min-w-[150px] data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg font-medium"
          >
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {activeTab !== "all" && (
        <div className="flex overflow-x-auto py-2 px-1 gap-2">
          {categories
            .filter(cat => cat.parentId === activeTab)
            .map(subcategory => (
              <button
                key={subcategory.id}
                onClick={() => onTabChange(subcategory.id)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                  activeTab === subcategory.id
                    ? "bg-primary text-white" 
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {subcategory.name}
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default ProductCategoryTabs;
