
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/CartContext";

const RequestForm = () => {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } = useCart();
  const [formData, setFormData] = useState({
    institutionName: "",
    address: "",
    receiverName: "",
    phone: "",
    email: ""
  });
  const [formErrors, setFormErrors] = useState({
    institutionName: false,
    address: false,
    receiverName: false,
    phone: false,
    email: false
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };
  
  const validateForm = () => {
    const errors = {
      institutionName: formData.institutionName.trim() === "",
      address: formData.address.trim() === "",
      receiverName: formData.receiverName.trim() === "",
      phone: formData.phone.trim() === "",
      email: formData.email.trim() === "" || !formData.email.includes("@")
    };
    
    setFormErrors(errors);
    return !Object.values(errors).some(error => error);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (items.length === 0) {
      toast({
        title: "No Items Selected",
        description: "Please select at least one item before submitting your request.",
        variant: "destructive"
      });
      return;
    }
    
    if (!validateForm()) {
      toast({
        title: "Incomplete Form",
        description: "Please fill all required fields correctly.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real implementation, you would send the order to your backend/API
    // Here we're simulating a successful order
    
    // Generate order number (in a real app this would come from the backend)
    const orderNumber = `EMC-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    
    // Store order data in session storage to display in confirmation
    sessionStorage.setItem('orderData', JSON.stringify({
      orderNumber,
      items,
      totalPrice: getTotalPrice(),
      ...formData
    }));
    
    // Clear cart and navigate to confirmation page
    clearCart();
    navigate("/confirmation");
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Request Form</h1>
      <p className="text-gray-600 mb-8">Complete your request details below</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Institution Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <Label htmlFor="institutionName" className={formErrors.institutionName ? "text-red-500" : ""}>
                      Institution Name *
                    </Label>
                    <Input
                      id="institutionName"
                      name="institutionName"
                      value={formData.institutionName}
                      onChange={handleInputChange}
                      className={formErrors.institutionName ? "border-red-500" : ""}
                    />
                    {formErrors.institutionName && (
                      <p className="text-red-500 text-sm mt-1">Institution name is required</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="address" className={formErrors.address ? "text-red-500" : ""}>
                      Address *
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={formErrors.address ? "border-red-500" : ""}
                    />
                    {formErrors.address && (
                      <p className="text-red-500 text-sm mt-1">Address is required</p>
                    )}
                  </div>
                </div>
                
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="receiverName" className={formErrors.receiverName ? "text-red-500" : ""}>
                      Receiver's Name *
                    </Label>
                    <Input
                      id="receiverName"
                      name="receiverName"
                      value={formData.receiverName}
                      onChange={handleInputChange}
                      className={formErrors.receiverName ? "border-red-500" : ""}
                    />
                    {formErrors.receiverName && (
                      <p className="text-red-500 text-sm mt-1">Receiver's name is required</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className={formErrors.phone ? "text-red-500" : ""}>
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={formErrors.phone ? "border-red-500" : ""}
                    />
                    {formErrors.phone && (
                      <p className="text-red-500 text-sm mt-1">Phone number is required</p>
                    )}
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="email" className={formErrors.email ? "text-red-500" : ""}>
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={formErrors.email ? "border-red-500" : ""}
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-sm mt-1">Valid email address is required</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-between">
              <Link to="/catalog">
                <Button variant="outline">Continue Shopping</Button>
              </Link>
              <Button type="submit" className="bg-accent2 hover:bg-accent2-dark text-white">
                Submit Request
              </Button>
            </div>
          </form>
        </div>
        
        <div>
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              {items.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No items in your selection</p>
                  <Link to="/catalog">
                    <Button variant="outline">Browse Products</Button>
                  </Link>
                </div>
              ) : (
                <>
                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                    {items.map(item => (
                      <div key={item.id} className="flex items-start border-b pb-4">
                        <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 mr-4">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-medium">{item.name}</h3>
                          <div className="flex items-center justify-between mt-1">
                            <div className="flex items-center">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-6 h-6 rounded-full border flex items-center justify-center"
                              >
                                -
                              </button>
                              <span className="mx-2">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-6 h-6 rounded-full border flex items-center justify-center"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                          <p className="text-gray-600 text-sm mt-1">
                            ${item.price.toFixed(2)} each
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t mt-4 pt-4">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total:</span>
                      <span>${getTotalPrice().toFixed(2)}</span>
                    </div>
                    <p className="text-gray-500 text-sm mt-2">
                      * Prices are subject to confirmation and may vary based on your location and quantity.
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RequestForm;
