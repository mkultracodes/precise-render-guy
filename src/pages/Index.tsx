import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ValueStrip from "@/components/ValueStrip";
import HowItWorks from "@/components/HowItWorks";
import PricingSection from "@/components/PricingSection";
import TrustSection from "@/components/TrustSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    localStorage.removeItem("repairbear_auth");
    localStorage.removeItem("repairbear_user");
    localStorage.removeItem("repairbear_shop_auth");
    localStorage.removeItem("repairbear_shop_user");
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ValueStrip />
      <HowItWorks />
      <PricingSection />
      <TrustSection />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
