
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useAdmin } from "@/context/AdminContext";
import { ShoppingCart } from "lucide-react";
import ProfileIcon from "./ProfileIcon";

const Navbar = () => {
  const { getItemCount } = useCart();
  const { isAdminMode } = useAdmin();
  const itemCount = getItemCount();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary">EMAC</span>
              <span className="text-sm font-medium">Educational Materials</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/catalog" className="text-sm font-medium hover:text-primary transition-colors">
              Products
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About Us
            </Link>
            <Link to="/support" className="text-sm font-medium hover:text-primary transition-colors">
              Support
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            {!isAdminMode && (
              <Link to="/request" className="relative">
                <Button variant="outline" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-accent2 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </Button>
              </Link>
            )}
            <ProfileIcon />
            <Link to="/catalog">
              <Button variant="default" className="hidden sm:flex">
                Browse Catalog
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
