
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">EMAC Organization</h3>
            <p className="text-sm text-gray-600">
              Your trusted supplier of quality educational materials for institutions across the region.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Product Catalog
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/catalog?category=physics" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Physics Lab
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=chemistry" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Chemistry Lab
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=biology" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Biology Lab
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=social" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Social Sciences
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-600">
                <strong>Phone:</strong> +255742777922
              </li>
              <li className="text-sm text-gray-600">
                <strong>Email:</strong> info@emacorg.com
              </li>
              <li className="text-sm text-gray-600">
                <strong>WhatsApp:</strong> +255742777922
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t">
          <p className="text-center text-sm text-gray-600">
            &copy; {new Date().getFullYear()} EMAC Organization. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
