
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface CartSummaryProps {
  itemCount: number;
}

const CartSummary = ({ itemCount }: CartSummaryProps) => {
  if (itemCount <= 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-sm md:text-base">
          <span className="font-medium">{itemCount} items selected</span>
        </div>
        <Link to="/request">
          <Button className="bg-accent2 hover:bg-accent2-dark text-white">
            Proceed to Request
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;
