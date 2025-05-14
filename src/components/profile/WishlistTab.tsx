
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";

interface WishlistItem {
  id: string;
  name: string;
  price: number;
}

interface WishlistTabProps {
  wishlist: WishlistItem[];
}

const WishlistTab = ({ wishlist }: WishlistTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Wishlist</CardTitle>
        <CardDescription>Products you've saved for later</CardDescription>
      </CardHeader>
      <CardContent>
        {wishlist.length > 0 ? (
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {wishlist.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Link to={`/product/${item.id}`} className="font-medium hover:underline">
                        {item.name}
                      </Link>
                    </TableCell>
                    <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">Add to Cart</Button>
                        <Button variant="ghost" size="sm">Remove</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Your wishlist is empty</p>
            <Link to="/catalog">
              <Button>Browse Products</Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WishlistTab;
