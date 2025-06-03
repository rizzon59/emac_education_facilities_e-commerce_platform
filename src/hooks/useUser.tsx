import { useState, useEffect, createContext, useContext } from "react";

// This file is no longer used for authentication and user management,
// but we're keeping it for reference or future use.
// The application now operates without user accounts.

export type User = {
  id: string;
  name: string;
  email: string;
  password?: string;
  wishlist: string[];
};

type UserContextType = {
  user: User | null;
  signup: (name: string, email: string, password: string) => void;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Load user from localStorage on mount
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const saveUser = (updatedUser: User | null) => {
    setUser(updatedUser);
    if (updatedUser) {
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } else {
      localStorage.removeItem("user");
    }
  };

  const signup = (name: string, email: string, password: string) => {
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      password,
      wishlist: []
    };
    saveUser(newUser);
  };

  const login = (email: string, password: string) => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      if (parsedUser.email === email && parsedUser.password === password) {
        setUser(parsedUser);
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    saveUser(null);
  };

  const addToWishlist = (productId: string) => {
    if (!user) return;
    
    const updatedWishlist = [...user.wishlist];
    if (!updatedWishlist.includes(productId)) {
      updatedWishlist.push(productId);
      const updatedUser = { ...user, wishlist: updatedWishlist };
      saveUser(updatedUser);
    }
  };

  const removeFromWishlist = (productId: string) => {
    if (!user) return;
    
    const updatedWishlist = user.wishlist.filter(id => id !== productId);
    const updatedUser = { ...user, wishlist: updatedWishlist };
    saveUser(updatedUser);
  };

  const isInWishlist = (productId: string) => {
    return user ? user.wishlist.includes(productId) : false;
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      signup, 
      login, 
      logout, 
      addToWishlist, 
      removeFromWishlist,
      isInWishlist
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
