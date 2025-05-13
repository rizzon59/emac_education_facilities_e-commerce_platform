
import React, { useState } from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Category } from "@/types/product";

interface ProductCategoryTabsProps {
  categories: Category[];
  activeTab: string;
  onTabChange: (value: string) => void;
}

const ProductCategoryTabs = ({ categories, activeTab, onTabChange }: ProductCategoryTabsProps) => {
  // Only the three main parent categories
  const mainCategories = categories.filter(cat => 
    cat.id === "natural" || cat.id === "formal" || cat.id === "social"
  );
  
  // Get subcategories of the active tab
  const getActiveSubcategories = () => {
    if (activeTab === "natural" || activeTab === "formal" || activeTab === "social") {
      return categories.filter(cat => cat.parentId === activeTab);
    } else {
      // Find the parent of the current active tab
      const currentCategory = categories.find(cat => cat.id === activeTab);
      if (currentCategory?.parentId) {
        return categories.filter(cat => cat.parentId === currentCategory.parentId);
      }
    }
    return [];
  };
  
  const subcategories = getActiveSubcategories();
  
  return (
    <div className="mb-6">
      <TabsList className="bg-gray-100 p-1 mb-2 overflow-x-auto flex w-full rounded-xl justify-between">
        {mainCategories.map(category => (
          <TabsTrigger 
            key={category.id} 
            value={category.id}
            onClick={() => onTabChange(category.id)}
            className="py-3 px-4 flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg font-medium text-center"
          >
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {subcategories && subcategories.length > 0 && (
        <div className="flex overflow-x-auto py-2 px-1 gap-2">
          {subcategories.map(subcategory => (
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
