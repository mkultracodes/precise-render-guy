import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Check, ChevronRight, Printer } from "lucide-react";
import ShopPortalLayout from "@/components/ShopPortalLayout";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const completedJobs = [
  {
    customer: "David", device: "iPhone 13", status: "Completed",
    completedDate: "April 3, 2026", submittedDate: "April 1, 2026",
    orderNumber: "RB-2026-00410", issue: "Cracked back glass",
    description: "Rear glass panel replacement with laser removal. Includes new adhesive and water-resistance re-seal.",
    parts: [
      { name: "iPhone 13 Back Glass Panel", qty: 1, price: 65.0 },
      { name: "Adhesive & Seal Kit", qty: 1, price: 5.0 },
      { name: "Labor — Back Glass Replacement", qty: 1, price: 40.0 },
    ],
  },
  {
    customer: "Emma", device: "Samsung Galaxy S23", status: "Completed",
    completedDate: "March 30, 2026", submittedDate: "March 28, 2026",
    orderNumber: "RB-2026-00405", issue: "Charging port not working",
    description: "USB-C charging port module replacement. Includes flex cable and microphone sub-assembly.",
    parts: [
      { name: "Galaxy S23 Charging Port Module", qty: 1, price: 35.0 },
      { name: "Labor — Port Replacement", qty: 1, price: 25.0 },
    ],
  },
  {
    customer: "Alex", device: "iPad Pro 12.9\"", status: "Completed",
    completedDate: "March 25, 2026", submittedDate: "March 22, 2026",
    orderNumber: "RB-2026-00398", issue: "Screen flickering and ghost touch",
    description: "Full LCD display assembly replacement. Includes digitizer recalibration and frame re-seal.",
    parts: [
      { name: "iPad Pro 12.9\" LCD Assembly", qty: 1, price: 195.0 },
      { name: "Adhesive Seal Kit", qty: 1, price: 6.0 },
      { name: "Labor — Screen Replacement", qty: 1, price: 55.0 },
    ],
  },
];

const handlePrint = (ref: React.RefObject<HTMLDivElement | null>) => {
  if (!ref.current) return;
  const printWindow = window.open("", "_blank");
  if (!printWindow) return;
  printWindow.document.write(`
    <html><head><title>Print</title>
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 40px; color: #1a1a1a; }
      .print-content { max-width: 600px; margin: 0 auto; }
      .label { font-size: 11px; color: #888; margin-bottom: 2px; }
      .divider { border-top: 1px solid #e5e5e5; margin: 16px 0; }
      .line-item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f0f0f0; }
      .total { display: flex; justify-content: space-between; padding: 12px 0; font-weight: 700; font-size: 16px; border-top: 2px solid #1a1a1a; margin-top: 8px; }
    </style></head><body>
    <div class="print-content">${ref.current.innerHTML}</div>
    </body></html>
  `);
  printWindow.document.close();
  printWindow.print();
};

const ShopCompleted = () => {
  const { ref: jobsRef, isVisible: jobsVisible } = useScrollReveal();
  const printRefs = useRef<(HTMLDivElement | null)[]>([]);

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
            {completedJobs.map((j, i) => {
              const estimateTotal = j.parts.reduce((sum, p) => sum + p.price, 0);
              return (
                <div
                  key={j.orderNumber}
                  className={`glass-card rounded-2xl p-5 transition-all duration-500 ${
                    jobsVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="flex items-center gap-4 mb-3">
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

                  {/* View Details */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="hero-outline" size="sm" className="w-full group/btn">
                        View Order Receipt
                        <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="font-display text-xl">Order Receipt</DialogTitle>
                      </DialogHeader>
                      <div ref={(el) => { printRefs.current[i] = el; }} className="space-y-5 pt-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-xs text-muted-foreground">Order #</p>
                            <p className="font-bold text-foreground">{j.orderNumber}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">Completed</p>
                            <p className="font-bold text-foreground">{j.completedDate}</p>
                          </div>
                        </div>
                        <div className="border-t border-border/50" />
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Customer</p>
                            <p className="font-semibold text-foreground">{j.customer}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Device</p>
                            <p className="font-semibold text-foreground">{j.device}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Reported Issue</p>
                          <p className="text-sm text-foreground">{j.issue}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Description of Work</p>
                          <p className="text-sm text-foreground">{j.description}</p>
                        </div>
                        <div className="border-t border-border/50" />
                        <div>
                          <p className="text-xs text-muted-foreground mb-2">Breakdown</p>
                          <div className="space-y-2">
                            {j.parts.map((part) => (
                              <div key={part.name} className="flex justify-between items-center bg-secondary/30 rounded-lg px-3 py-2">
                                <div>
                                  <p className="text-sm font-medium text-foreground">{part.name}</p>
                                  <p className="text-xs text-muted-foreground">Qty: {part.qty}</p>
                                </div>
                                <p className="text-sm font-bold text-foreground">${part.price.toFixed(2)}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-between items-center border-t-2 border-foreground pt-3">
                          <p className="font-bold text-foreground">Total</p>
                          <p className="font-bold text-lg text-foreground">${estimateTotal.toFixed(2)}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-secondary/50 rounded-xl p-3">
                            <p className="text-xs text-muted-foreground">Submitted</p>
                            <p className="font-bold text-foreground text-sm">{j.submittedDate}</p>
                          </div>
                          <div className="bg-secondary/50 rounded-xl p-3">
                            <p className="text-xs text-muted-foreground">Status</p>
                            <p className="font-bold text-success text-sm">{j.status}</p>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handlePrint({ current: printRefs.current[i] })}
                        className="w-full flex items-center justify-center gap-2 mt-2 py-2 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors text-sm font-medium text-foreground"
                      >
                        <Printer className="w-4 h-4" /> Print Receipt
                      </button>
                    </DialogContent>
                  </Dialog>
                </div>
              );
            })}
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
