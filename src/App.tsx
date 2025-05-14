
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductCatalog from "./pages/ProductCatalog";
import ProductDetail from "./pages/ProductDetail";
import RequestForm from "./pages/RequestForm";
import RequestConfirmation from "./pages/RequestConfirmation";
import AboutUs from "./pages/AboutUs";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";
import UserProfile from "./pages/UserProfile";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Layout from "./components/Layout";
import { CartProvider } from "./context/CartContext";
import { AdminProvider } from "./context/AdminContext";
import { UserProvider } from "./hooks/useUser";
import AdminTrigger from "./components/admin/AdminTrigger";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AdminProvider>
        <UserProvider>
          <CartProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AdminTrigger />
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<HomePage />} />
                  <Route path="catalog" element={<ProductCatalog />} />
                  <Route path="product/:id" element={<ProductDetail />} />
                  <Route path="request" element={<RequestForm />} />
                  <Route path="confirmation" element={<RequestConfirmation />} />
                  <Route path="about" element={<AboutUs />} />
                  <Route path="support" element={<Support />} />
                  <Route path="profile" element={<UserProfile />} />
                  <Route path="login" element={<LoginPage />} />
                  <Route path="signup" element={<SignupPage />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </UserProvider>
      </AdminProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
