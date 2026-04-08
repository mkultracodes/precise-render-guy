import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const FinalCTA = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-12 md:py-28 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-primary/8 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl animate-glow-pulse" />
      <div className="absolute inset-0 tech-grid opacity-20" />

      <div
        ref={ref}
        className={`container mx-auto px-4 text-center relative transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          Takes under 60 seconds
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
          Start your repair{" "}
          <span className="text-gradient">in under 60 seconds</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-md mx-auto mb-8">
          No accounts, no phone calls, no hassle. Just tell us what's broken.
        </p>
        <Button variant="hero" size="lg" className="h-14 px-10 text-lg group/cta relative overflow-hidden">
          <span className="relative z-10 flex items-center gap-2">
            Get My Repair Quote
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/cta:translate-x-1" />
          </span>
          <div className="absolute inset-0 shimmer" />
        </Button>
        <p className="text-xs text-muted-foreground mt-6 flex items-center justify-center gap-3">
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-success" /> Up to 5 providers respond</span>
          <span className="text-border">•</span>
          <span>Same-day connections</span>
          <span className="text-border">•</span>
          <span>You choose</span>
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;
