import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import CustomerPortal from "./pages/CustomerPortal.tsx";
import ShopPortal from "./pages/ShopPortal.tsx";
import ShopActiveJobs from "./pages/ShopActiveJobs.tsx";
import ShopCompleted from "./pages/ShopCompleted.tsx";
import ShopSettings from "./pages/ShopSettings.tsx";
import Corporate from "./pages/Corporate.tsx";
import Login from "./pages/Login.tsx";
import ShopLogin from "./pages/ShopLogin.tsx";
import ShopContactSupport from "./pages/ShopContactSupport.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import ProfileSettings from "./pages/ProfileSettings.tsx";
import ContactSupport from "./pages/ContactSupport.tsx";
import NewRepair from "./pages/NewRepair.tsx";
import RepairHistory from "./pages/RepairHistory.tsx";
import CreateAccount from "./pages/CreateAccount.tsx";
import Payment from "./pages/Payment.tsx";
import Contact from "./pages/Contact.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import Terms from "./pages/Terms.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/shop-login" element={<ShopLogin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/portal" element={<CustomerPortal />} />
          <Route path="/portal/support" element={<ContactSupport />} />
          <Route path="/portal/new-repair" element={<NewRepair />} />
          <Route path="/portal/history" element={<RepairHistory />} />
          <Route path="/profile" element={<ProfileSettings />} />
          <Route path="/shop" element={<ShopPortal />} />
          <Route path="/shop/active" element={<ShopActiveJobs />} />
          <Route path="/shop/completed" element={<ShopCompleted />} />
          <Route path="/shop/settings" element={<ShopSettings />} />
          <Route path="/shop/support" element={<ShopContactSupport />} />
          <Route path="/corporate" element={<Corporate />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
