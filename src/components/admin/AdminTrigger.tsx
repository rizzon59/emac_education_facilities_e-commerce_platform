
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import AdminLogin from "./AdminLogin";
import { useAdmin } from "@/context/AdminContext";

const AdminTrigger = () => {
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const { isAuthenticated, toggleAdminMode, isAdminMode } = useAdmin();

  return (
    <>
      <div className="flex items-center">
        {isAuthenticated ? (
          <Button 
            variant={isAdminMode ? "default" : "outline"} 
            size="icon"
            onClick={toggleAdminMode}
            className="relative"
          >
            <User className="h-5 w-5" />
            {isAdminMode && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                •
              </span>
            )}
          </Button>
        ) : (
          <Button 
            variant="ghost" 
            size="icon" 
            className="opacity-30 hover:opacity-100"
            onClick={() => setShowLoginDialog(true)}
          >
            <User className="h-5 w-5" />
          </Button>
        )}
      </div>
      
      <AdminLogin open={showLoginDialog} onOpenChange={setShowLoginDialog} />
    </>
  );
};

export default AdminTrigger;
