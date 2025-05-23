
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import AdminLogin from "./admin/AdminLogin";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ProfileIcon = () => {
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const { isAuthenticated, toggleAdminMode, isAdminMode, logout } = useAdmin();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant={isAdminMode ? "default" : "outline"} 
            size="icon"
            className="relative"
          >
            <User className="h-5 w-5" />
            {isAdminMode && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                •
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          {!isAuthenticated ? (
            <DropdownMenuItem onClick={() => setShowLoginDialog(true)}>
              Admin Login
            </DropdownMenuItem>
          ) : (
            <>
              <DropdownMenuItem onClick={toggleAdminMode}>
                {isAdminMode ? "Exit Admin Mode" : "Enter Admin Mode"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                Logout
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      
      <AdminLogin open={showLoginDialog} onOpenChange={setShowLoginDialog} />
    </>
  );
};

export default ProfileIcon;
