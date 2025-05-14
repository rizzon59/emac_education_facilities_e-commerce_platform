
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const ProductRequestForm = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!productName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a product name",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would connect to a backend service
    // For now, we'll just show a success message
    toast({
      title: "Request Submitted",
      description: "Thank you! We'll review your product request.",
    });
    
    // Reset form
    setProductName("");
    setProductDescription("");
    
    // Navigate to the request form page
    navigate("/request");
  };
  
  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Mail className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-medium">Request a Product</h3>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        Can't find what you're looking for? Let us know and we'll try to source it for you.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            placeholder="Product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        
        <div>
          <Textarea
            placeholder="Product description (optional)"
            className="h-24"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </div>
        
        <div>
          <Button type="submit" className="w-full">Submit Request</Button>
        </div>
      </form>
    </div>
  );
};

export default ProductRequestForm;
