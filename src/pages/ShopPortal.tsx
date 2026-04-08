import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  Smartphone, Check, X, ChevronRight, Printer,
} from "lucide-react";
import ShopPortalLayout from "@/components/ShopPortalLayout";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const incomingRequests = [
  {
    id: 1, device: "iPhone 15 Pro Max", issue: "Cracked screen", price: "$120 – $180", urgency: "Urgent",
    orderNumber: "RB-2026-00420", date: "April 7, 2026",
    description: "Front glass shattered, touch partially unresponsive. Full OLED display assembly replacement requested.",
    parts: [
      { name: "iPhone 15 Pro Max OLED Display", qty: 1, price: 140.0 },
      { name: "Adhesive Seal Kit", qty: 1, price: 5.0 },
      { name: "Labor — Screen Replacement", qty: 1, price: 35.0 },
    ],
  },
  {
    id: 2, device: "Samsung Galaxy S24", issue: "Battery replacement", price: "$55 – $85", urgency: "Normal",
    orderNumber: "RB-2026-00421", date: "April 7, 2026",
    description: "Battery draining rapidly, device shutting off at 30%. Full battery swap with OEM-equivalent cell.",
    parts: [
      { name: "Samsung Galaxy S24 Battery", qty: 1, price: 45.0 },
      { name: "Adhesive Strips", qty: 1, price: 3.0 },
      { name: "Labor — Battery Replacement", qty: 1, price: 25.0 },
    ],
  },
  {
    id: 3, device: "Google Pixel 8", issue: "Water damage", price: "$90 – $200", urgency: "High",
    orderNumber: "RB-2026-00422", date: "April 6, 2026",
    description: "Device submerged briefly. Corrosion check, ultrasonic cleaning, and component-level diagnostics required.",
    parts: [
      { name: "Ultrasonic Cleaning Service", qty: 1, price: 60.0 },
      { name: "Diagnostic & Component Check", qty: 1, price: 40.0 },
      { name: "Labor — Water Damage Repair", qty: 1, price: 50.0 },
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

const ShopPortal = () => {
  const { ref: reqRef, isVisible: reqVisible } = useScrollReveal();
  const printRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <ShopPortalLayout>
      <div className="max-w-2xl">
        <div className="mb-8 animate-fade-up">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Welcome back, FixIt Pro
          </h1>
        </div>

        <section ref={reqRef}>
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            Incoming Requests
            <span className="w-6 h-6 rounded-full bg-destructive/10 text-destructive text-xs flex items-center justify-center font-bold animate-pulse">3</span>
          </h2>

          <div className="space-y-4">
            {incomingRequests.map((r, i) => {
              const estimateTotal = r.parts.reduce((sum, p) => sum + p.price, 0);
              return (
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

                  {/* View Details */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="hero-outline" size="lg" className="w-full mb-3 group/btn">
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
                            <p className="font-bold text-foreground">{r.orderNumber}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">Date</p>
                            <p className="font-bold text-foreground">{r.date}</p>
                          </div>
                        </div>
                        <div className="border-t border-border/50" />
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Device</p>
                          <p className="font-semibold text-foreground">{r.device}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Reported Issue</p>
                          <p className="text-sm text-foreground">{r.issue}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Description of Work</p>
                          <p className="text-sm text-foreground">{r.description}</p>
                        </div>
                        <div className="border-t border-border/50" />
                        <div>
                          <p className="text-xs text-muted-foreground mb-2">Estimate Breakdown</p>
                          <div className="space-y-2">
                            {r.parts.map((part) => (
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

                  <div className="flex gap-3">
                    <Button variant="hero" size="lg" className="flex-1 group/btn">
                      <Check className="w-4 h-4" /> Accept
                    </Button>
                    <Button variant="hero-outline" size="lg" className="flex-1">
                      <X className="w-4 h-4" /> Pass
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </ShopPortalLayout>
  );
};

export default ShopPortal;
