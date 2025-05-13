
import { useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

interface AdminLoginProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AdminLogin = ({ open, onOpenChange }: AdminLoginProps) => {
  const { login } = useAdmin();
  const { toast } = useToast();
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (login(password)) {
      toast({
        title: "Success",
        description: "You're now logged in as admin.",
        variant: "default",
      });
      onOpenChange(false);
    } else {
      toast({
        title: "Invalid password",
        description: "Please try again with the correct password.",
        variant: "destructive",
      });
    }
    setPassword("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Admin Login</DialogTitle>
          <DialogDescription>
            Enter your admin password to access the admin panel.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="col-span-3"
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
        </div>
        
        <DialogFooter>
          <Button onClick={handleLogin}>Login</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdminLogin;
