import { Button } from "@/components/ui/button";
import { Check, Star, Sparkles } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const PricingSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="pricing" className="py-12 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/3 blur-3xl" />

      <div className="container mx-auto px-4 relative">
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Simple, Fair Pricing
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Pay once. Get it back. Our concierge fee comes back as credit toward your repair.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Free tier */}
          <div
            className={`glass-card rounded-2xl p-8 flex flex-col hover:shadow-xl transition-all duration-700 hover:-translate-y-1 ${
              cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h3 className="font-display font-bold text-xl text-foreground mb-1">Free</h3>
            <p className="text-muted-foreground text-sm mb-6">No commitment needed</p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-foreground">$25</span>
              <span className="text-muted-foreground ml-2">concierge fee</span>
            </div>
            <p className="text-sm text-success font-medium mb-6 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-success" />
              Comes back as repair credit
            </p>
            <ul className="space-y-3 mb-8 flex-1">
              {["Instant price range", "Up to 5 shop quotes", "Full repair tracking", "Receipt & history"].map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-foreground">
                  <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-success" />
                  </div>
                  {f}
                </li>
              ))}
            </ul>
            <Button variant="hero-outline" size="lg" className="w-full">
              Start Free
            </Button>
          </div>

          {/* Member tier */}
          <div
            className={`glass-card rounded-2xl p-8 flex flex-col relative overflow-hidden glow-border hover:shadow-xl transition-all duration-700 hover:-translate-y-1 ${
              cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "120ms" }}
          >
            {/* Shimmer accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-bear-gold to-primary bg-[length:200%_100%] animate-shimmer" />
            <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
              <Sparkles className="w-3 h-3" /> Best Value
            </div>
            <h3 className="font-display font-bold text-xl text-foreground mb-1">Repair Bear+</h3>
            <p className="text-muted-foreground text-sm mb-6">For people who fix things</p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gradient">$2.99</span>
              <span className="text-muted-foreground ml-2">/month</span>
            </div>
            <p className="text-sm text-primary font-medium mb-6 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Only $20 concierge (also comes back as credit)
            </p>
            <ul className="space-y-3 mb-8 flex-1">
              {["Everything in Free", "Lower concierge fee", "Priority repair matching", "Faster shop confirmations", "Device health alerts", "Warranty assistance"].map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-foreground">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  {f}
                </li>
              ))}
            </ul>
            <Button variant="hero" size="lg" className="w-full relative overflow-hidden group/btn">
              <span className="relative z-10">Join Repair Bear+</span>
              <div className="absolute inset-0 shimmer" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
