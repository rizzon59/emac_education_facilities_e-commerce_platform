
import { useState } from "react";
import { Button } from "@/components/ui/button";
import AdminLogin from "./AdminLogin";
import { useAdmin } from "@/context/AdminContext";

const AdminTrigger = () => {
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const { isAuthenticated, toggleAdminMode, isAdminMode } = useAdmin();

  // The hidden admin button
  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        {isAuthenticated ? (
          <Button 
            variant={isAdminMode ? "default" : "outline"} 
            size="sm" 
            onClick={toggleAdminMode}
          >
            {isAdminMode ? "Exit Admin" : "Admin Mode"}
          </Button>
        ) : (
          <Button 
            variant="ghost" 
            size="sm" 
            className="opacity-20 hover:opacity-100"
            onClick={() => setShowLoginDialog(true)}
          >
            Admin
          </Button>
        )}
      </div>
      
      <AdminLogin open={showLoginDialog} onOpenChange={setShowLoginDialog} />
    </>
  );
};

export default AdminTrigger;
