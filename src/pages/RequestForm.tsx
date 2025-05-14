
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/context/CartContext";
import CartSummary from "@/components/product/CartSummary";
import { toast } from "@/components/ui/use-toast";

const RequestForm = () => {
  const navigate = useNavigate();
  const { items, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    institution: "",
    address: "",
    phone: "",
    message: "",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.institution) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // Show success notification
    toast({
      title: "Request Submitted",
      description: "Your request has been received. We'll contact you shortly.",
    });
    
    // Clear cart and redirect
    clearCart();
    navigate("/confirmation");
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Request Form</h1>
      <p className="text-gray-600 mb-8">Please fill out this form to submit your product request</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Tell us about yourself and your institution</CardDescription>
            </CardHeader>
            <CardContent>
              <form id="requestForm" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input 
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="institution">Institution Name *</Label>
                  <Input 
                    id="institution"
                    name="institution"
                    placeholder="Enter your school or institution name"
                    value={formData.institution}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Delivery Address</Label>
                  <Input 
                    id="address"
                    name="address"
                    placeholder="Enter delivery address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Additional Information</Label>
                  <Textarea 
                    id="message"
                    name="message"
                    placeholder="Any special instructions or requirements"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <CartSummary />
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Complete Your Request</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                By submitting this form, we'll receive your request and contact you to confirm the details.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit"
                form="requestForm"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
                disabled={items.length === 0}
              >
                Submit Request
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RequestForm;
