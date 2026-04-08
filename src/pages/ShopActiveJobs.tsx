import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ChevronRight, Wrench, Printer } from "lucide-react";
import ShopPortalLayout from "@/components/ShopPortalLayout";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const initialJobs = [
  {
    customer: "Sarah", device: "iPhone 14 Pro", status: "In Repair", statusColor: "bg-bear-gold",
    orderNumber: "RB-2026-00417", date: "April 5, 2026",
    issue: "Cracked screen — front display shattered, touch partially unresponsive",
    description: "Full OLED display assembly replacement with OEM-quality part. Includes digitizer, front glass, and frame re-seal.",
    parts: [
      { name: "iPhone 14 Pro OLED Display Assembly", qty: 1, price: 89.0 },
      { name: "Adhesive Seal Kit", qty: 1, price: 5.0 },
      { name: "Labor — Screen Replacement", qty: 1, price: 35.0 },
    ],
  },
  {
    customer: "James", device: "iPad Air 5", status: "Device Received", statusColor: "bg-primary",
    orderNumber: "RB-2026-00418", date: "April 6, 2026",
    issue: "Battery draining rapidly, device overheating",
    description: "Battery replacement with OEM-equivalent cell. Includes adhesive removal, battery swap, and full diagnostics.",
    parts: [
      { name: "iPad Air 5 Battery", qty: 1, price: 55.0 },
      { name: "Adhesive Strips", qty: 1, price: 4.0 },
      { name: "Labor — Battery Replacement", qty: 1, price: 30.0 },
    ],
  },
  {
    customer: "Maria", device: "MacBook Pro", status: "Ready for Pickup", statusColor: "bg-success",
    orderNumber: "RB-2026-00419", date: "April 4, 2026",
    issue: "Keyboard keys sticking, trackpad unresponsive",
    description: "Top case replacement including keyboard and trackpad. Full cleaning and component test post-repair.",
    parts: [
      { name: "MacBook Pro Top Case Assembly", qty: 1, price: 180.0 },
      { name: "Labor — Top Case Replacement", qty: 1, price: 60.0 },
    ],
  },
];

const statusOptions = [
  { label: "Received", color: "bg-primary" },
  { label: "In Progress", color: "bg-bear-gold" },
  { label: "Completed", color: "bg-success" },
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
      .value { font-weight: 600; font-size: 14px; }
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

const ShopActiveJobs = () => {
  const { ref: jobsRef, isVisible: jobsVisible } = useScrollReveal();
  const printRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [jobs, setJobs] = useState(initialJobs);

  const updateStatus = (index: number, newStatus: string, newColor: string) => {
    setJobs((prev) =>
      prev.map((j, i) => (i === index ? { ...j, status: newStatus, statusColor: newColor } : j))
    );
    toast.success(`Status updated to "${newStatus}"`);
  };

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
            {jobs.map((j, i) => {
              const estimateTotal = j.parts.reduce((sum, p) => sum + p.price, 0);
              return (
                <div
                  key={j.orderNumber}
                  className={`glass-card rounded-2xl p-5 transition-all duration-500 ${
                    jobsVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="flex items-center justify-between mb-3">
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

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-xs">
                          Update Status
                          <ChevronRight className="w-3 h-3 ml-1" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {statusOptions.map((opt) => (
                          <DropdownMenuItem
                            key={opt.label}
                            onClick={() => updateStatus(i, opt.label, opt.color)}
                            className="flex items-center gap-2 text-sm"
                          >
                            <span className={`w-2 h-2 rounded-full ${opt.color}`} />
                            {opt.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* View Details */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="hero-outline" size="sm" className="w-full group/btn">
                        View Details
                        <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="font-display text-xl">Repair Order</DialogTitle>
                      </DialogHeader>
                      <div ref={(el) => { printRefs.current[i] = el; }} className="space-y-5 pt-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-xs text-muted-foreground">Order #</p>
                            <p className="font-bold text-foreground">{j.orderNumber}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">Date</p>
                            <p className="font-bold text-foreground">{j.date}</p>
                          </div>
                        </div>
                        <div className="border-t border-border/50" />
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Device</p>
                          <p className="font-semibold text-foreground">{j.device}</p>
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
                          <p className="text-xs text-muted-foreground mb-2">Estimate Breakdown</p>
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
                          <p className="font-bold text-foreground">Estimated Total</p>
                          <p className="font-bold text-lg text-foreground">${estimateTotal.toFixed(2)}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handlePrint({ current: printRefs.current[i] })}
                        className="w-full flex items-center justify-center gap-2 mt-2 py-2 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors text-sm font-medium text-foreground"
                      >
                        <Printer className="w-4 h-4" /> Print Order
                      </button>
                    </DialogContent>
                  </Dialog>
                </div>
              );
            })}
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
