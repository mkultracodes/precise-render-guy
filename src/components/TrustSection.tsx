import { Shield, Users, ThumbsUp } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState, useEffect, useCallback } from "react";

const testimonials = [
  {
    name: "Sarah M.",
    text: "Got my phone fixed in 2 hours. No calling around, no stress. This is how it should work.",
    device: "iPhone 14 Pro",
  },
  {
    name: "James K.",
    text: "The price range was spot-on and the provider was amazing. Tracking my repair was so reassuring.",
    device: "Samsung Galaxy S23",
  },
  {
    name: "Maria L.",
    text: "I was quoted $300 elsewhere. Repair Bear found me a provider that did it for $120. Incredible.",
    device: "iPad Air",
  },
  {
    name: "David R.",
    text: "Super easy process. Described my issue, got quotes in minutes, and my phone was fixed same day.",
    device: "Google Pixel 8",
  },
  {
    name: "Lisa T.",
    text: "The tracking feature gave me peace of mind. I knew exactly when my laptop would be ready.",
    device: "MacBook Air",
  },
  {
    name: "Chris P.",
    text: "Found a great local provider I never knew existed. Way cheaper than the big box stores.",
    device: "Samsung Galaxy Tab",
  },
];

const stats = [
  { icon: Shield, label: "Verified providers only", value: "100%" },
  { icon: Users, label: "Happy customers", value: "10,000+" },
  { icon: ThumbsUp, label: "Avg satisfaction", value: "4.9/5" },
];

const TrustSection = () => {
  const { ref: statsRef, isVisible: statsVisible } = useScrollReveal();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal({ threshold: 0.1 });
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-scroll testimonials every 4 seconds
  useEffect(() => {
    if (!cardsVisible) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % (testimonials.length - 2));
    }, 4000);
    return () => clearInterval(timer);
  }, [cardsVisible]);

  const visibleTestimonials = testimonials.slice(activeIndex, activeIndex + 3);

  return (
    <section id="trust" className="py-12 md:py-28 relative">
      <div className="absolute inset-0 tech-grid opacity-20" />
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-success/10 text-success text-sm font-medium mb-4">
            ⭐ Social proof
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Real people, real repairs, real results.
          </p>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-3 gap-3 md:gap-6 max-w-2xl mx-auto mb-10 md:mb-16">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`text-center transition-all duration-700 ${
                statsVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-card border border-border/50 shadow-sm flex items-center justify-center mx-auto mb-3 hover:shadow-md hover:scale-105 transition-all duration-300">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="font-display font-bold text-2xl md:text-3xl text-gradient">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials — auto-scrolling, 3 visible */}
        <div ref={cardsRef} className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {visibleTestimonials.map((t) => (
              <div
                key={t.name}
                className={`glass-card rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ${
                  cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-bear-gold text-sm">★</span>
                  ))}
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-medium text-sm text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.device}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-1.5 mt-6">
            {Array.from({ length: testimonials.length - 2 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "bg-primary w-5" : "bg-border hover:bg-muted-foreground"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;