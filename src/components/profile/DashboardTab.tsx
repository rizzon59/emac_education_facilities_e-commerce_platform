
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { orders } from "@/data/products";
import { Order } from "@/types/product";

interface DashboardTabProps {
  onViewAllOrders: () => void;
  orders: Order[];
  pendingOrdersCount: number;
  completedOrdersCount: number;
  wishlistCount: number;
}

const DashboardTab = ({
  onViewAllOrders,
  orders,
  pendingOrdersCount,
  completedOrdersCount,
  wishlistCount,
}: DashboardTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Overview</CardTitle>
        <CardDescription>Summary of your recent activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-sm text-gray-500">Pending Orders</h3>
            <p className="text-2xl font-bold">{pendingOrdersCount}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-sm text-gray-500">Completed Orders</h3>
            <p className="text-2xl font-bold">{completedOrdersCount}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-sm text-gray-500">Wishlist Items</h3>
            <p className="text-2xl font-bold">{wishlistCount}</p>
          </div>
        </div>

        <h3 className="font-semibold mb-2">Recent Orders</h3>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.slice(0, 3).map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'shipped' ? 'bg-indigo-100 text-indigo-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <Button variant="link" className="mt-4 p-0" onClick={onViewAllOrders}>
          View all orders
        </Button>
      </CardContent>
    </Card>
  );
};

export default DashboardTab;
