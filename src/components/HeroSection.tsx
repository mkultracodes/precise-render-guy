import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import PhoneAnimation from "@/components/PhoneAnimation";

const HeroSection = () => {
  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden relative">
      {/* Tech grid background */}
      <div className="absolute inset-0 tech-grid opacity-50" />
      {/* Gradient orbs */}
      <div className="absolute top-20 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-float" />
      <div className="absolute bottom-0 -right-32 w-80 h-80 rounded-full bg-bear-gold/10 blur-3xl animate-float-delayed" />

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left: Copy */}
          <div className="space-y-6">

            <h1 className="font-bold text-foreground animate-fade-up" style={{ lineHeight: 1.2 }}>
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                Broken phone?
              </span>
              <span
                className="block text-gradient text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-1 pb-1"
              >
                We've got you covered
                <span className="relative inline-flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ml-3 sm:ml-4" style={{ verticalAlign: 'middle', marginBottom: '0.15em' }}>
                  <span className="absolute inset-0 rounded-full bg-success" />
                  <span className="absolute inset-0 rounded-full bg-success animate-green-glow" />
                  <svg className="relative z-10 w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="checkmark-draw" />
                  </svg>
                </span>
              </span>
            </h1>

            <p
              className="text-lg text-muted-foreground max-w-lg leading-relaxed animate-fade-up"
              style={{ animationDelay: "0.15s" }}
            >
              Get an instant price range and we'll connect you with a trusted local repair shop — no waiting, no guesswork.
            </p>

            <div
              className="flex flex-wrap gap-4 pt-2 animate-fade-up"
              style={{ animationDelay: "0.3s" }}
            >
              <Button variant="hero" size="lg" className="h-14 px-8 text-lg group/cta relative overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  Get My Repair Quote
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/cta:translate-x-1" />
                </span>
                <div className="absolute inset-0 shimmer" />
              </Button>
              <Button variant="hero-outline" size="lg" className="h-14 px-8 text-lg hover:border-primary/40 transition-all duration-300">
                See How It Works
              </Button>
            </div>

            {/* Mini social proof */}
            <div
              className="flex items-center gap-3 pt-2 animate-fade-up"
              style={{ animationDelay: "0.45s" }}
            >
              <div className="flex -space-x-2">
                {["RL", "MH", "CT"].map((initials, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-secondary border-2 border-card flex items-center justify-center text-xs font-bold text-primary"
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">10,000+</span> devices repaired
              </p>
            </div>
          </div>

          {/* Right: Animated Phone */}
          <PhoneAnimation />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
