import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Check, ChevronRight, Wrench } from "lucide-react";
import ShopPortalLayout from "@/components/ShopPortalLayout";

const completedJobs = [
  { customer: "David", device: "iPhone 13", status: "Completed", completedDate: "April 3, 2026", submittedDate: "April 1, 2026" },
  { customer: "Emma", device: "Samsung Galaxy S23", status: "Completed", completedDate: "March 30, 2026", submittedDate: "March 28, 2026" },
  { customer: "Alex", device: "iPad Pro 12.9\"", status: "Completed", completedDate: "March 25, 2026", submittedDate: "March 22, 2026" },
];

const ShopCompleted = () => {
  const { ref: jobsRef, isVisible: jobsVisible } = useScrollReveal();

  return (
    <ShopPortalLayout>
      <div className="max-w-2xl">
        <div className="mb-8 animate-fade-up">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Completed Jobs
          </h1>
        </div>

        <section ref={jobsRef}>
          <div className="space-y-3 mb-6">
            {completedJobs.map((j, i) => (
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
                      <span className="w-2 h-2 rounded-full bg-success" />
                      <span className="text-xs text-muted-foreground">{j.status}</span>
                    </div>
                    <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
                      <span>Submitted: {j.submittedDate}</span>
                      <span>Completed: {j.completedDate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* No other completed jobs */}
        <div className="glass-card rounded-2xl p-8 text-center">
          <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
            <Check className="w-7 h-7 text-muted-foreground" />
          </div>
          <p className="text-lg font-medium text-foreground mb-2">No other completed jobs</p>
          <p className="text-sm text-muted-foreground">
            Completed repairs will appear here.
          </p>
        </div>
      </div>
    </ShopPortalLayout>
  );
};

export default ShopCompleted;
