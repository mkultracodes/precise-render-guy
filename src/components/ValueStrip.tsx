import { Zap, MapPin, Clock } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const values = [
  { icon: Zap, label: "Instant price range", color: "text-bear-gold" },
  { icon: MapPin, label: "Real local repair providers", color: "text-primary" },
  { icon: Clock, label: "Providers respond fast", color: "text-success" },
];

const ValueStrip = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-4 md:py-8 bg-secondary/30 border-y border-border/50 relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-40" />
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-center md:gap-16">
          {values.map((v, i) => (
            <div
              key={v.label}
              className={`flex items-center gap-2 md:gap-3 md:justify-center transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="w-7 h-7 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-card border border-border/50 flex items-center justify-center shrink-0 shadow-sm">
                <v.icon className={`w-3.5 h-3.5 md:w-5 md:h-5 ${v.color}`} />
              </div>
              <span className="text-xs md:text-sm font-medium text-foreground">{v.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueStrip;