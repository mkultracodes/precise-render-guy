import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  Smartphone, Clock, MapPin, Check, X,
  Users, Wrench, Sparkles, Timer, ArrowRight, ChevronRight,
} from "lucide-react";
import ShopPortalLayout from "@/components/ShopPortalLayout";

const incomingRequests = [
  { id: 1, device: "iPhone 15 Pro Max", issue: "Cracked screen", price: "$120 – $180", location: "2.3 mi away", urgency: "Urgent", time: "3 min ago", competitors: 3 },
  { id: 2, device: "Samsung Galaxy S24", issue: "Battery replacement", price: "$55 – $85", location: "1.1 mi away", urgency: "Normal", time: "12 min ago", competitors: 4 },
  { id: 3, device: "Google Pixel 8", issue: "Water damage", price: "$90 – $200", location: "4.7 mi away", urgency: "High", time: "25 min ago", competitors: 2 },
];

const activeJobs = [
  { customer: "Sarah", device: "iPhone 14 Pro", status: "In Repair", statusColor: "bg-bear-gold" },
  { customer: "James", device: "iPad Air 5", status: "Device Received", statusColor: "bg-primary" },
  { customer: "Maria", device: "MacBook Pro", status: "Ready for Pickup", statusColor: "bg-success" },
];

const ShopPortal = () => {
  const { ref: reqRef, isVisible: reqVisible } = useScrollReveal();
  const { ref: jobsRef, isVisible: jobsVisible } = useScrollReveal();

  return (
    <ShopPortalLayout>
      <div className="max-w-2xl">
        {/* Welcome */}
        <div className="mb-8 animate-fade-up">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Welcome back, FixIt Pro
          </h1>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-4 mb-8 animate-fade-up">
          {[
            { label: "Pending", value: "3", icon: Clock, color: "text-bear-gold" },
            { label: "Active Jobs", value: "5", icon: Wrench, color: "text-primary" },
            { label: "Completed Today", value: "2", icon: Check, color: "text-success" },
          ].map((s) => (
            <div key={s.label} className="glass-card rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div>
                <p className="font-display font-bold text-xl text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Incoming Requests */}
        <section ref={reqRef}>
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            Incoming Requests
            <span className="w-6 h-6 rounded-full bg-destructive/10 text-destructive text-xs flex items-center justify-center font-bold animate-pulse">3</span>
          </h2>

          <div className="space-y-4 mb-10">
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

        {/* Active Jobs */}
        <section ref={jobsRef}>
          <h2 className="text-lg font-bold text-foreground mb-4">Active Jobs</h2>
          <div className="space-y-3 mb-10">
            {activeJobs.map((j, i) => (
              <div
                key={j.customer}
                className={`glass-card rounded-2xl p-5 flex items-center justify-between hover:shadow-lg transition-all duration-500 cursor-pointer ${
                  jobsVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-sm font-bold text-foreground">
                    {j.customer[0]}
                  </div>
                  <div>
                    <p className="font-medium text-sm text-foreground">{j.customer} — {j.device}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className={`w-2 h-2 rounded-full ${j.statusColor}`} />
                      <span className="text-xs text-muted-foreground">{j.status}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="text-xs">
                    Update Status
                  </Button>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* No more active jobs */}
        <div className="glass-card rounded-2xl p-8 text-center">
          <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
            <Wrench className="w-7 h-7 text-muted-foreground" />
          </div>
          <p className="text-lg font-medium text-foreground mb-2">No other active jobs</p>
          <p className="text-sm text-muted-foreground">
            Additional jobs will appear here when accepted.
          </p>
        </div>

        {/* Upgrade Banner */}
        <div className="glass-card rounded-2xl p-6 glow-border relative overflow-hidden mt-6">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-bear-gold to-accent bg-[length:200%_100%] animate-shimmer" />
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-bear-gold" />
                <h3 className="font-display font-bold text-lg text-foreground">Get More Jobs</h3>
              </div>
              <p className="text-sm text-muted-foreground">Premium shops get 2x more requests and priority placement</p>
            </div>
            <Button variant="hero" className="group/btn">
              Upgrade Shop Plan
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
            </Button>
          </div>
        </div>
      </div>
    </ShopPortalLayout>
  );
};

export default ShopPortal;
