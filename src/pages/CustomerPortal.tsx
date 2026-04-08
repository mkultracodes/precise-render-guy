import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import bearMascot from "@/assets/repair-bear-mascot.jpg";
import { ChevronRight, Plus, LogOut, Settings, MessageCircle, History } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const statusSteps = [
  { label: "Quote sent", done: true },
  { label: "Shop confirmed", done: true },
  { label: "In repair", active: true },
  { label: "Ready for pickup", done: false },
  { label: "Completed", done: false },
];

const CustomerPortal = () => {
  const navigate = useNavigate();
  const { ref: dashRef, isVisible: dashVisible } = useScrollReveal();

  useEffect(() => {
    if (!localStorage.getItem("repairbear_auth")) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("repairbear_auth");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/50 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={bearMascot} alt="Repair Bear" className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/20" />
            <span className="font-display font-bold text-xl text-foreground">
              Repair<span className="text-gradient">Bear</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link to="/profile" className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors">
              <Settings className="w-4 h-4 text-foreground" />
            </Link>
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
              MK
            </div>
            <button onClick={handleLogout} className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-destructive/20 transition-colors" title="Logout">
              <LogOut className="w-4 h-4 text-foreground" />
            </button>
          </div>
        </div>
      </div>

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Welcome */}
          <div className="mb-8 animate-fade-up">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Hi, MK — thanks for using RepairBear
            </h1>
          </div>

          {/* Active Repair Card */}
          <section ref={dashRef}>
            <h2 className="text-lg font-bold text-foreground mb-4">Active Repair</h2>
            <div
              className={`glass-card rounded-2xl p-6 glow-border transition-all duration-700 ${
                dashVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="font-display font-bold text-lg text-foreground">iPhone 14 Pro</p>
                  <p className="text-sm text-muted-foreground">Cracked screen replacement</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-bear-gold/10 text-bear-gold text-xs font-semibold animate-pulse">
                  In Repair
                </span>
              </div>

              {/* Progress timeline */}
              <div className="flex items-center gap-0 mb-6">
                {statusSteps.map((step, i) => (
                  <div key={step.label} className="flex-1 flex items-center">
                    <div className="flex flex-col items-center flex-1">
                      <div
                        className={`w-4 h-4 rounded-full border-2 transition-all duration-500 ${
                          step.done ? "bg-success border-success" :
                          step.active ? "bg-bear-gold border-bear-gold animate-pulse" :
                          "bg-secondary border-border"
                        }`}
                        style={{ transitionDelay: `${i * 100}ms` }}
                      />
                      <span className={`text-[10px] mt-1.5 text-center ${step.done || step.active ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                        {step.label}
                      </span>
                    </div>
                    {i < statusSteps.length - 1 && (
                      <div className={`h-0.5 flex-1 -mt-4 ${step.done ? "bg-success" : "bg-border"}`} />
                    )}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-secondary/50 rounded-xl p-3">
                  <p className="text-xs text-muted-foreground">Estimated</p>
                  <p className="font-bold text-foreground text-sm">$99 – $129</p>
                </div>
                <div className="bg-secondary/50 rounded-xl p-3">
                  <p className="text-xs text-muted-foreground">Shop</p>
                  <p className="font-bold text-foreground text-sm">FixIt Pro</p>
                </div>
              </div>

              <Button variant="hero" size="lg" className="w-full group/btn">
                View Details
                <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
              </Button>
            </div>
          </section>

          {/* Quick Actions */}
          <div className="grid grid-cols-3 gap-4 mt-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            {[
              { icon: Plus, label: "New Repair", color: "text-primary" },
              { icon: History, label: "History", color: "text-accent" },
              { icon: MessageCircle, label: "Contact Support", color: "text-success" },
            ].map((a) => (
              <button key={a.label} className="glass-card rounded-2xl p-4 flex flex-col items-center gap-2 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group">
                <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <a.icon className={`w-5 h-5 ${a.color}`} />
                </div>
                <span className="text-sm font-medium text-foreground">{a.label}</span>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerPortal;
