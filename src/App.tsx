import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Process from "./pages/Process";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import Cart from "./pages/Cart";
import OrderReview from "./pages/OrderReview";
import CustomerInfo from "./pages/CustomerInfo";
import OrderConfirm from "./pages/OrderConfirm";
import OrderSuccess from "./pages/OrderSuccess";
import Workspace from "./pages/Workspace";
import CartButton from "./components/order/CartButton";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:categoryId" element={<Products />} />
              <Route path="/product/:productId" element={<ProductDetail />} />
              <Route path="/process" element={<Process />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/order-review" element={<OrderReview />} />
              <Route path="/customer-info" element={<CustomerInfo />} />
              <Route path="/order-confirm" element={<OrderConfirm />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="/workspace" element={<Workspace />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <CartButton />
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
