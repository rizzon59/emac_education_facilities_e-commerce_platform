
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { orders } from "@/data/products";
import ProfileHeader from "@/components/profile/ProfileHeader";
import DashboardTab from "@/components/profile/DashboardTab";
import OrdersTab from "@/components/profile/OrdersTab";
import WishlistTab from "@/components/profile/WishlistTab";
import SettingsTab from "@/components/profile/SettingsTab";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Mock user data - in a real app, this would come from authentication context
  const user = {
    name: "John Educator",
    email: "john@scienceschool.edu",
    institution: "Science High School",
    address: "123 Education St, Science City",
    phone: "123-456-7890"
  };

  // Mock wishlist data - in a real app, this would come from a database or local storage
  const wishlist = [
    { id: "phys-001", name: "Digital Electronic Scale", price: 299.99 },
    { id: "chem-002", name: "Digital pH Meter", price: 159.95 }
  ];

  const pendingOrdersCount = orders.filter(o => o.status === 'pending').length;
  const completedOrdersCount = orders.filter(o => o.status === 'delivered').length;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">My Account</h1>
      <p className="text-gray-600 mb-8">Manage your account settings and view your order history</p>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-1/4">
          <ProfileHeader user={user} onEditProfile={() => setActiveTab("settings")} />
        </aside>

        <div className="flex-1">
          <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6 grid grid-cols-4 w-full">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="orders">Order History</TabsTrigger>
              <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <DashboardTab 
                orders={orders} 
                pendingOrdersCount={pendingOrdersCount}
                completedOrdersCount={completedOrdersCount}
                wishlistCount={wishlist.length}
                onViewAllOrders={() => setActiveTab("orders")}
              />
            </TabsContent>

            <TabsContent value="orders">
              <OrdersTab orders={orders} />
            </TabsContent>

            <TabsContent value="wishlist">
              <WishlistTab wishlist={wishlist} />
            </TabsContent>

            <TabsContent value="settings">
              <SettingsTab user={user} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
