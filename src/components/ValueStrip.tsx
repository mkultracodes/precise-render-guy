import { Zap, MapPin, Clock, Smartphone } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const values = [
  { icon: Zap, label: "Instant price range", color: "text-bear-gold" },
  { icon: MapPin, label: "Real local repair providers", color: "text-primary" },
  { icon: Clock, label: "Providers respond fast", color: "text-success" },
];

const ValueStrip = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-8 bg-secondary/30 border-y border-border/50 relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-40" />
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <div
              key={v.label}
              className={`flex items-center gap-3 justify-center transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="w-10 h-10 rounded-xl bg-card border border-border/50 flex items-center justify-center shrink-0 shadow-sm hover:shadow-md hover:scale-110 transition-all duration-300">
                <v.icon className={`w-5 h-5 ${v.color}`} />
              </div>
              <span className="text-sm font-medium text-foreground">{v.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueStrip;
