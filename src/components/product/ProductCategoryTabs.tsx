
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Category } from "@/types/product";

interface ProductCategoryTabsProps {
  categories: Category[];
  activeTab: string;
}

const ProductCategoryTabs = ({ categories, activeTab }: ProductCategoryTabsProps) => {
  return (
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
  );
};

export default ProductCategoryTabs;
