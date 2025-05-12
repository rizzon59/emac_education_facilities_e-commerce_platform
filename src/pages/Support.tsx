
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";

const Support = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const { toast } = useToast();
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // In a real application, you would send this data to your backend
    toast({
      title: "Message Sent",
      description: "We've received your message and will get back to you soon.",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };
  
  const faqs = [
    {
      question: "How do I place an order?",
      answer: "To place an order, browse our product catalog, select the items you wish to purchase, and add them to your cart. Once you've selected all desired items, proceed to the request form where you'll fill in your institution's details and submit your request. We'll then review your order and contact you for confirmation."
    },
    {
      question: "Can I order multiple quantities of the same product?",
      answer: "Yes, you can order multiple quantities of any product. In the product catalog, you can specify the quantity for each item before adding it to your cart, or adjust quantities in the cart before submitting your request."
    },
    {
      question: "What are the payment options?",
      answer: "We currently offer several payment options including bank transfer, mobile money, and check payments. Payment details will be provided after your order is confirmed. We do not require payment at the time of placing your request."
    },
    {
      question: "How long does delivery take?",
      answer: "Delivery times vary depending on your location and the items ordered. Typically, deliveries within major cities take 3-5 business days, while deliveries to remote areas may take 7-10 business days. Large or specialized orders may require additional time."
    },
    {
      question: "Do you offer discounts for bulk orders?",
      answer: "Yes, we offer discounts for bulk orders. The discount rate depends on the total order value and the specific products ordered. Please contact us directly for a customized quote for your bulk order."
    },
    {
      question: "What is your return policy?",
      answer: "We accept returns for damaged or defective products within 14 days of delivery. Please contact our customer service team with your order number and details of the issue. Note that custom or specialized orders may have different return policies."
    },
    {
      question: "Do you serve international customers?",
      answer: "Yes, we serve international customers, primarily within East Africa. International shipping costs and delivery times vary. Please contact us directly for international order inquiries."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is shipped, we'll provide you with tracking information via email. You can use this information to track your order's progress. For any specific tracking queries, please contact our customer service team with your order number."
    }
  ];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Support & Assistance</h1>
          <p className="text-xl text-gray-600">
            We're here to help with any questions or concerns
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl mb-4">📞</div>
              <h3 className="text-xl font-semibold mb-2">Phone Support</h3>
              <p className="text-gray-700 mb-4">
                Speak directly with our customer service team
              </p>
              <p className="font-medium">+255742777922</p>
              <p className="text-sm text-gray-500 mt-2">
                Available during business hours
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl mb-4">✉️</div>
              <h3 className="text-xl font-semibold mb-2">Email Support</h3>
              <p className="text-gray-700 mb-4">
                Send us a message anytime
              </p>
              <p className="font-medium">info@emacorg.com</p>
              <p className="text-sm text-gray-500 mt-2">
                We respond within 24 hours
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl mb-4">💬</div>
              <h3 className="text-xl font-semibold mb-2">WhatsApp</h3>
              <p className="text-gray-700 mb-4">
                Quick responses via WhatsApp
              </p>
              <p className="font-medium">+255742777922</p>
              <div className="mt-4">
                <a 
                  href="https://wa.me/255742777922" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                >
                  Chat Now
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
          
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Your Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <Label htmlFor="message">Your Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full md:w-auto">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-6">Using Our Platform</h2>
          
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Browsing Products</h3>
              <p className="text-gray-700 mb-4">
                Use our product catalog to browse through different categories of educational materials. 
                You can filter products by category and use the search function to find specific items quickly.
              </p>
              <ul className="list-disc pl-5 text-gray-700">
                <li>Browse by category using the tabs at the top of the catalog</li>
                <li>Use the search bar to find specific products</li>
                <li>Click "Info" to see detailed information about a product</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Selecting Items</h3>
              <p className="text-gray-700 mb-4">
                You can select multiple items by using the checkboxes or the "Add to Cart" buttons. 
                Your selected items will appear in the cart summary at the bottom of the page.
              </p>
              <ul className="list-disc pl-5 text-gray-700">
                <li>Check the box next to products you want to select</li>
                <li>Click "Add to Cart" to add individual items</li>
                <li>Adjust quantities in your cart as needed</li>
                <li>Review your selection before proceeding to request</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Placing Requests</h3>
              <p className="text-gray-700 mb-4">
                After selecting your items, proceed to the request form where you'll enter your institution's 
                information and contact details. Once submitted, you'll receive a confirmation of your request.
              </p>
              <ul className="list-disc pl-5 text-gray-700">
                <li>Fill in all required information in the request form</li>
                <li>Review your order summary before submitting</li>
                <li>Submit your request to receive a confirmation</li>
                <li>Keep your order number for reference</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
