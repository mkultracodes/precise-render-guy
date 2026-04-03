import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import bearMascot from "@/assets/repair-bear-mascot.jpg";
import {
  Smartphone, Battery, Wrench, Clock, MessageCircle,
  ChevronRight, Shield, Bell, CreditCard, History,
  Plus, ArrowRight, Sparkles, Star
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const statusSteps = [
  { label: "Quote sent", done: true },
  { label: "Shop confirmed", done: true },
  { label: "In repair", active: true },
  { label: "Ready for pickup", done: false },
  { label: "Completed", done: false },
];

const devices = [
  { name: "iPhone 14 Pro", status: "Healthy", statusColor: "bg-success", lastRepair: "Mar 2026", icon: Smartphone },
  { name: "MacBook Air M2", status: "Needs attention", statusColor: "bg-bear-gold", lastRepair: "Jan 2026", icon: Smartphone },
  { name: "iPad Air 5th Gen", status: "Recently repaired", statusColor: "bg-primary", lastRepair: "Feb 2026", icon: Smartphone },
];

const repairs = [
  { device: "iPhone 14 Pro", type: "Screen Replacement", date: "Mar 15, 2026", cost: "$109", shop: "FixIt Pro" },
  { device: "MacBook Air M2", type: "Battery Replacement", date: "Jan 8, 2026", cost: "$89", shop: "TechCare" },
  { device: "iPad Air", type: "Charging Port", date: "Feb 20, 2026", cost: "$65", shop: "iRepair Hub" },
];

const CustomerPortal = () => {
  const { ref: dashRef, isVisible: dashVisible } = useScrollReveal();
  const { ref: devicesRef, isVisible: devicesVisible } = useScrollReveal();
  const { ref: historyRef, isVisible: historyVisible } = useScrollReveal();

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/50 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img src={bearMascot} alt="Repair Bear" className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/20" />
            <span className="font-display font-bold text-xl text-foreground">
              Repair<span className="text-gradient">Bear</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <a href="#dashboard" className="text-sm font-medium text-foreground">Dashboard</a>
            <a href="#devices" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Devices</a>
            <a href="#history" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">History</a>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors">
              <Bell className="w-4 h-4 text-foreground" />
            </button>
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
              JD
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Greeting */}
          <div className="mb-8 animate-fade-up">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
              Hi John, here's your repair status 🐻
            </h1>
            <p className="text-muted-foreground">Everything's on track. We'll notify you of any updates.</p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-3 gap-4 mb-10 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            {[
              { icon: Plus, label: "New Repair", color: "text-primary" },
              { icon: MessageCircle, label: "Support", color: "text-success" },
              { icon: History, label: "Receipts", color: "text-accent" },
            ].map((a) => (
              <button key={a.label} className="glass-card rounded-2xl p-4 flex flex-col items-center gap-2 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group">
                <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <a.icon className={`w-5 h-5 ${a.color}`} />
                </div>
                <span className="text-sm font-medium text-foreground">{a.label}</span>
              </button>
            ))}
          </div>

          {/* Active Repair Card */}
          <section id="dashboard" ref={dashRef}>
            <h2 className="text-lg font-bold text-foreground mb-4">Active Repair</h2>
            <div
              className={`glass-card rounded-2xl p-6 mb-10 glow-border transition-all duration-700 ${
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

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-secondary/50 rounded-xl p-3">
                  <p className="text-xs text-muted-foreground">Estimated</p>
                  <p className="font-bold text-foreground text-sm">$99 – $129</p>
                </div>
                <div className="bg-secondary/50 rounded-xl p-3">
                  <p className="text-xs text-muted-foreground">Shop</p>
                  <p className="font-bold text-foreground text-sm">FixIt Pro</p>
                </div>
                <div className="bg-secondary/50 rounded-xl p-3">
                  <p className="text-xs text-muted-foreground">ETA</p>
                  <p className="font-bold text-foreground text-sm">Today, 4pm</p>
                </div>
              </div>

              <Button variant="hero" size="lg" className="w-full group/btn">
                View Details
                <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
              </Button>
            </div>
          </section>

          {/* Devices */}
          <section id="devices" ref={devicesRef}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">My Devices</h2>
              <button className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
                <Plus className="w-4 h-4" /> Add Device
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mb-10">
              {devices.map((d, i) => (
                <div
                  key={d.name}
                  className={`glass-card rounded-2xl p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-500 cursor-pointer ${
                    devicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                      <d.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">{d.name}</p>
                      <p className="text-xs text-muted-foreground">Last repair: {d.lastRepair}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${d.statusColor}`} />
                    <span className="text-xs font-medium text-foreground">{d.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* History */}
          <section id="history" ref={historyRef}>
            <h2 className="text-lg font-bold text-foreground mb-4">Repair History</h2>
            <div className="glass-card rounded-2xl overflow-hidden">
              {repairs.map((r, i) => (
                <div
                  key={r.date}
                  className={`flex items-center justify-between p-4 border-b border-border/50 last:border-b-0 hover:bg-secondary/30 transition-all duration-500 cursor-pointer ${
                    historyVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  }`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Wrench className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-foreground">{r.device} — {r.type}</p>
                      <p className="text-xs text-muted-foreground">{r.date} • {r.shop}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-sm text-foreground">{r.cost}</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Subscription Banner */}
          <div className="mt-10 glass-card rounded-2xl p-6 glow-border relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-bear-gold to-primary bg-[length:200%_100%] animate-shimmer" />
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-bear-gold" />
                  <h3 className="font-display font-bold text-lg text-foreground">Repair Bear+</h3>
                </div>
                <p className="text-sm text-muted-foreground">Lower fees, priority matching, device alerts — $2.99/mo</p>
              </div>
              <Button variant="hero" className="group/btn">
                Upgrade
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerPortal;
