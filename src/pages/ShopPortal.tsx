import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  Smartphone, MapPin, Check, X, Users, Timer,
} from "lucide-react";
import ShopPortalLayout from "@/components/ShopPortalLayout";

const incomingRequests = [
  { id: 1, device: "iPhone 15 Pro Max", issue: "Cracked screen", price: "$120 – $180", location: "2.3 mi away", urgency: "Urgent", time: "3 min ago", competitors: 3 },
  { id: 2, device: "Samsung Galaxy S24", issue: "Battery replacement", price: "$55 – $85", location: "1.1 mi away", urgency: "Normal", time: "12 min ago", competitors: 4 },
  { id: 3, device: "Google Pixel 8", issue: "Water damage", price: "$90 – $200", location: "4.7 mi away", urgency: "High", time: "25 min ago", competitors: 2 },
];

const ShopPortal = () => {
  const { ref: reqRef, isVisible: reqVisible } = useScrollReveal();

  return (
    <ShopPortalLayout>
      <div className="max-w-2xl">
        <div className="mb-8 animate-fade-up">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Welcome back, FixIt Pro
          </h1>
        </div>

        {/* Incoming Requests */}
        <section ref={reqRef}>
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            Incoming Requests
            <span className="w-6 h-6 rounded-full bg-destructive/10 text-destructive text-xs flex items-center justify-center font-bold animate-pulse">3</span>
          </h2>

          <div className="space-y-4">
            {incomingRequests.map((r, i) => (
              <div
                key={r.id}
                className={`glass-card rounded-2xl p-5 hover:shadow-xl transition-all duration-500 ${
                  reqVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{r.device}</p>
                      <p className="text-sm text-muted-foreground">{r.issue}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground text-sm">{r.price}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      r.urgency === "Urgent" ? "bg-destructive/10 text-destructive" :
                      r.urgency === "High" ? "bg-bear-gold/10 text-bear-gold" :
                      "bg-secondary text-muted-foreground"
                    }`}>
                      {r.urgency}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {r.location}</span>
                  <span className="flex items-center gap-1"><Timer className="w-3 h-3" /> {r.time}</span>
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {r.competitors} other shops</span>
                </div>

                <div className="flex gap-3">
                  <Button variant="hero" size="lg" className="flex-1 group/btn">
                    <Check className="w-4 h-4" /> Accept
                  </Button>
                  <Button variant="hero-outline" size="lg" className="flex-1">
                    <X className="w-4 h-4" /> Pass
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </ShopPortalLayout>
  );
};

export default ShopPortal;
