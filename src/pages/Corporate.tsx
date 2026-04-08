import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import bearMascot from "@/assets/repair-bear-mascot.jpg";
import {
  TrendingUp, DollarSign, Users, Globe, ArrowRight,
  Smartphone, Wrench, Truck, ChevronRight, Sparkles,
  BarChart3, Target, Layers, Building2, Zap
} from "lucide-react";


const metrics = [
  { label: "Repairs Completed", value: "10,000+", icon: Wrench },
  { label: "Partner Shops", value: "500+", icon: Building2 },
  { label: "Cities Covered", value: "50+", icon: Globe },
  { label: "Customer Satisfaction", value: "4.9/5", icon: TrendingUp },
];

const revenueStreams = [
  { title: "Lead Referral Fees", desc: "Per-repair commission from partner shops", icon: DollarSign, amount: "$15–$30/lead" },
  { title: "Consumer Subscriptions", desc: "Repair Bear+ monthly memberships", icon: Users, amount: "$2.99/mo" },
  { title: "Concierge Fees", desc: "Service coordination fee, returned as credit", icon: Zap, amount: "$20–$25" },
  { title: "Upsells & Expansion", desc: "Priority service, warranties, new categories", icon: Layers, amount: "Growing" },
];

const marketData = [
  { label: "US Phone Repair TAM", value: "$4.2B" },
  { label: "Annual Growth Rate", value: "6.1%" },
  { label: "Devices per Household", value: "8.4" },
  { label: "Category Expansion", value: "Phones → Laptops → Appliances" },
];

const Corporate = () => {
  const { ref: metricsRef, isVisible: metricsVisible } = useScrollReveal();
  const { ref: revenueRef, isVisible: revenueVisible } = useScrollReveal();
  const { ref: marketRef, isVisible: marketVisible } = useScrollReveal();
  const { ref: systemRef, isVisible: systemVisible } = useScrollReveal();

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/50 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={bearMascot} alt="Repair Bear" className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/20" />
            <span className="font-display font-bold text-xl text-foreground">
              Repair<span className="text-gradient">Bear</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <a href="#metrics" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Metrics</a>
            <a href="#business-model" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Business Model</a>
            <a href="#market" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Market</a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="hero" className="group/btn">
              Contact Us
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
            </Button>
          </div>
        </div>
      </nav>

      <main className="pt-28 pb-16">
        {/* Hero */}
        <section className="pb-20 relative overflow-hidden">
          <div className="absolute inset-0 tech-grid opacity-40" />
          <div className="absolute top-20 -right-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-float" />
          <div className="container mx-auto px-4 relative text-center">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Sparkles className="w-3.5 h-3.5" /> For Investors & Partners
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 max-w-3xl mx-auto leading-tight">
                The repair coordination{" "}
                <span className="text-gradient">platform scaling nationwide</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
                Repair Bear is a dispatch-first platform connecting consumers to trusted local repair shops — generating revenue through lead fees, subscriptions, and service expansion.
              </p>
              <div className="flex justify-center gap-4">
                <Button variant="hero" size="lg" className="h-14 px-8 text-lg group/btn relative overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    Get in Touch
                    <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 shimmer" />
                </Button>
                <Button variant="hero-outline" size="lg" className="h-14 px-8 text-lg">
                  View Deck
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Key Metrics */}
        <section id="metrics" className="py-16 bg-secondary/30 border-y border-border/50">
          <div ref={metricsRef} className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {metrics.map((m, i) => (
                <div
                  key={m.label}
                  className={`text-center transition-all duration-700 ${
                    metricsVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-card border border-border/50 shadow-sm flex items-center justify-center mx-auto mb-3 hover:shadow-md hover:scale-105 transition-all duration-300">
                    <m.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="font-display font-bold text-2xl md:text-3xl text-gradient">{m.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Business Model */}
        <section id="business-model" className="py-20 relative">
          <div className="absolute inset-0 dot-pattern opacity-30" />
          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-bear-gold/10 text-bear-gold text-sm font-medium mb-4">
                💰 Revenue Streams
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Business Model</h2>
              <p className="text-muted-foreground text-lg max-w-lg mx-auto">
                Multiple revenue streams with strong unit economics
              </p>
            </div>
            <div ref={revenueRef} className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {revenueStreams.map((r, i) => (
                <div
                  key={r.title}
                  className={`glass-card rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ${
                    revenueVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center">
                      <r.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">{r.amount}</span>
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-1">{r.title}</h3>
                  <p className="text-sm text-muted-foreground">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Market Opportunity */}
        <section id="market" className="py-20 bg-secondary/20 relative">
          <div className="absolute inset-0 tech-grid opacity-20" />
          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-success/10 text-success text-sm font-medium mb-4">
                📊 Market Size
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Market Opportunity</h2>
              <p className="text-muted-foreground text-lg max-w-lg mx-auto">
                A massive, fragmented market ready for coordination
              </p>
            </div>
            <div ref={marketRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {marketData.map((m, i) => (
                <div
                  key={m.label}
                  className={`glass-card rounded-2xl p-5 text-center hover:shadow-lg transition-all duration-500 ${
                    marketVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <p className="font-display font-bold text-xl text-gradient mb-1">{m.value}</p>
                  <p className="text-xs text-muted-foreground">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Product System */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                🔧 Product System
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Two-Sided Platform</h2>
              <p className="text-muted-foreground text-lg max-w-lg mx-auto">
                Seamless experiences for both consumers and repair shops
              </p>
            </div>
            <div ref={systemRef} className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                { title: "Customer Portal", desc: "Dashboard, repair tracking, device management, history & receipts, subscription value", link: "/portal", icon: Smartphone, color: "from-primary/10 to-primary/5" },
                { title: "Shop Portal", desc: "Incoming requests, active jobs, status updates, photo workflow, shop subscription tiers", link: "/shop", icon: Building2, color: "from-accent/10 to-accent/5" },
              ].map((p, i) => (
                <Link
                  to={p.link}
                  key={p.title}
                  className={`bg-gradient-to-b ${p.color} glass-card rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group ${
                    systemVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-card border border-border/50 flex items-center justify-center mb-4 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300 shadow-sm">
                    <p.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{p.desc}</p>
                  <span className="text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Portal <ChevronRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-primary/8 to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl animate-glow-pulse" />
          <div className="container mx-auto px-4 text-center relative">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Let's build the future of <span className="text-gradient">repair together</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-md mx-auto mb-8">
              Interested in partnering, investing, or learning more? We'd love to connect.
            </p>
            <Button variant="hero" size="lg" className="h-14 px-10 text-lg group/btn relative overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                Contact Us
                <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
              </span>
              <div className="absolute inset-0 shimmer" />
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Corporate;
