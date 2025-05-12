
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CartItem } from "@/context/CartContext";

interface OrderData {
  orderNumber: string;
  items: CartItem[];
  totalPrice: number;
  institutionName: string;
  address: string;
  receiverName: string;
  phone: string;
  email: string;
}

const RequestConfirmation = () => {
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  
  useEffect(() => {
    const storedData = sessionStorage.getItem('orderData');
    if (storedData) {
      setOrderData(JSON.parse(storedData));
    }
  }, []);
  
  if (!orderData) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">No Order Information</h1>
        <p className="mb-6">No recent order information was found. Please submit a new request.</p>
        <Link to="/catalog">
          <Button>Browse Products</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2">Request Submitted Successfully!</h1>
          <p className="text-gray-600">
            Your order number is <span className="font-bold">{orderData.orderNumber}</span>
          </p>
        </div>
        
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Confirmation Message</h2>
                <div className="bg-gray-50 p-6 rounded-lg border">
                  <p className="mb-4">Subject: Confirmation of Your Order - {orderData.orderNumber}</p>
                  <p className="mb-2">Dear {orderData.institutionName},</p>
                  <p className="mb-4">
                    Thank you for your recent order with us at EMAC Organization. We confirm to you that your orders for{" "}
                    {orderData.items.map(item => item.name).join(", ")} has been received and is currently being processed.
                  </p>
                  <p className="mb-4">
                    We assure you that your order is scheduled for delivery as soon as possible and we will keep you updated on its status. 
                    We will notify you promptly of any changes or updates.
                  </p>
                  <p className="mb-4">
                    In case you have any questions or need further assistance, feel free to reach out to us at +255742777922. 
                    We truly value your business and look forward to serving you.
                  </p>
                  <p className="mb-2">Warm regards,</p>
                  <p className="mb-1">Morrice Morrice</p>
                  <p className="mb-1">Senior CEO</p>
                  <p className="mb-1">EMAC Organization</p>
                  <p>+255742777922</p>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  A confirmation email has been sent to {orderData.email} with these details.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Order Details</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium text-gray-500 mb-1">Institution Information</h3>
                      <p className="font-medium">{orderData.institutionName}</p>
                      <p>{orderData.address}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-500 mb-1">Contact Information</h3>
                      <p>{orderData.receiverName}</p>
                      <p>{orderData.phone}</p>
                      <p>{orderData.email}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-500 mb-2">Items Requested</h3>
                    <div className="border rounded-lg overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Product
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Quantity
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Price
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {orderData.items.map((item) => (
                            <tr key={item.id}>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="h-10 w-10 flex-shrink-0">
                                    <img
                                      className="h-10 w-10 rounded-md object-cover"
                                      src={item.imageUrl}
                                      alt={item.name}
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                    <div className="text-sm text-gray-500">{item.category}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                                {item.quantity}
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                                ${(item.price * item.quantity).toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot className="bg-gray-50">
                          <tr>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900" colSpan={2}>
                              Total
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-bold">
                              ${orderData.totalPrice.toFixed(2)}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center">
          <p className="text-gray-600 mb-6">
            Thank you for choosing EMAC Organization. A copy of this confirmation has been sent to your email address.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/">
              <Button variant="outline">Return to Home</Button>
            </Link>
            <Link to="/catalog">
              <Button>Browse More Products</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestConfirmation;
