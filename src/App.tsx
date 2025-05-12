
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
import Layout from "./components/Layout";
import { CartProvider } from "./context/CartContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="catalog" element={<ProductCatalog />} />
              <Route path="product/:id" element={<ProductDetail />} />
              <Route path="request" element={<RequestForm />} />
              <Route path="confirmation" element={<RequestConfirmation />} />
              <Route path="about" element={<AboutUs />} />
              <Route path="support" element={<Support />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
