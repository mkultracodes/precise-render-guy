import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ChevronRight, Wrench } from "lucide-react";
import ShopPortalLayout from "@/components/ShopPortalLayout";

const activeJobs = [
  { customer: "Sarah", device: "iPhone 14 Pro", status: "In Repair", statusColor: "bg-bear-gold" },
  { customer: "James", device: "iPad Air 5", status: "Device Received", statusColor: "bg-primary" },
  { customer: "Maria", device: "MacBook Pro", status: "Ready for Pickup", statusColor: "bg-success" },
];

const ShopActiveJobs = () => {
  const { ref: jobsRef, isVisible: jobsVisible } = useScrollReveal();

  return (
    <ShopPortalLayout>
      <div className="max-w-2xl">
        <div className="mb-8 animate-fade-up">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Active Jobs
          </h1>
        </div>

        <section ref={jobsRef}>
          <div className="space-y-3 mb-6">
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

        {/* No other active jobs */}
        <div className="glass-card rounded-2xl p-8 text-center">
          <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
            <Wrench className="w-7 h-7 text-muted-foreground" />
          </div>
          <p className="text-lg font-medium text-foreground mb-2">No other active jobs</p>
          <p className="text-sm text-muted-foreground">
            Additional jobs will appear here when accepted.
          </p>
        </div>
      </div>
    </ShopPortalLayout>
  );
};

export default ShopActiveJobs;
