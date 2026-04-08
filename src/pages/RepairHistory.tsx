import { useRef } from "react";
import PortalLayout from "@/components/PortalLayout";
import { Button } from "@/components/ui/button";
import { History as HistoryIcon, ChevronRight, MapPin, Phone, Clock, Printer, Receipt } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const pastRepair = {
  device: "MacBook Air M2",
  type: "Battery Replacement",
  status: "Completed",
  submittedDate: "January 3, 2026",
  completedDate: "January 8, 2026",
  shop: "TechCare",
  estimatedCost: "$89.00",
  orderNumber: "RB-2026-00312",
  issue: "Battery draining rapidly — drops from 100% to 20% in under 2 hours with light use",
  description: "Full battery replacement with OEM-equivalent cell. Includes battery health calibration and post-repair diagnostics.",
  parts: [
    { name: "MacBook Air M2 Battery Cell", qty: 1, price: 59.0 },
    { name: "Adhesive Strips", qty: 1, price: 5.0 },
    { name: "Labor — Battery Replacement", qty: 1, price: 25.0 },
  ],
};

const estimateTotal = pastRepair.parts.reduce((sum, p) => sum + p.price, 0);

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
      .line-item:last-child { border-bottom: none; }
      .total { display: flex; justify-content: space-between; padding: 12px 0; font-weight: 700; font-size: 16px; border-top: 2px solid #1a1a1a; margin-top: 8px; }
    </style></head><body>
    <div class="print-content">${ref.current.innerHTML}</div>
    </body></html>
  `);
  printWindow.document.close();
  printWindow.print();
};

const RepairHistory = () => {
  const orderPrintRef = useRef<HTMLDivElement>(null);
  const receiptPrintRef = useRef<HTMLDivElement>(null);

  const receiptDetails = {
    receiptNumber: "RB-REC-00312",
    date: pastRepair.completedDate,
    description: "Repair Bear coordination fee",
    amount: "$25.00",
    paymentMethod: "Visa ending in 4242",
    status: "Paid",
  };

  return (
    <PortalLayout>
      <div className="max-w-2xl">
        <h1 className="font-display font-bold text-2xl text-foreground mb-6">Repair History</h1>

        {/* Completed repair card */}
        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="font-display font-bold text-lg text-foreground">{pastRepair.device}</p>
              <p className="text-sm text-muted-foreground">{pastRepair.type}</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-success/10 text-success text-xs font-semibold">
              Completed
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-secondary/50 rounded-xl p-3">
              <p className="text-xs text-muted-foreground">Estimated</p>
              <p className="font-bold text-foreground text-sm">{pastRepair.estimatedCost}</p>
            </div>
            <div className="bg-secondary/50 rounded-xl p-3">
              <p className="text-xs text-muted-foreground">Shop</p>
              <p className="font-bold text-foreground text-sm">{pastRepair.shop}</p>
            </div>
            <div className="bg-secondary/50 rounded-xl p-3">
              <p className="text-xs text-muted-foreground">Completed</p>
              <p className="font-bold text-foreground text-sm">{pastRepair.completedDate}</p>
            </div>
          </div>

          {/* View Details */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="hero" size="lg" className="w-full group/btn">
                View Details
                <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-display text-xl">Repair Order</DialogTitle>
              </DialogHeader>
              <div ref={orderPrintRef} className="space-y-5 pt-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-muted-foreground">Order #</p>
                    <p className="font-bold text-foreground">{pastRepair.orderNumber}</p>
                  </div>
                  <div className="text-right">
                    <span className="px-3 py-1 rounded-full bg-success/10 text-success text-xs font-semibold">
                      Completed
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-secondary/50 rounded-xl p-3">
                    <p className="text-xs text-muted-foreground">Submitted</p>
                    <p className="font-bold text-foreground text-sm">{pastRepair.submittedDate}</p>
                  </div>
                  <div className="bg-secondary/50 rounded-xl p-3">
                    <p className="text-xs text-muted-foreground">Completed</p>
                    <p className="font-bold text-foreground text-sm">{pastRepair.completedDate}</p>
                  </div>
                </div>

                <div className="border-t border-border/50" />

                <div>
                  <p className="text-xs text-muted-foreground mb-1">Device</p>
                  <p className="font-semibold text-foreground">{pastRepair.device}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Reported Issue</p>
                  <p className="text-sm text-foreground">{pastRepair.issue}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Description of Work</p>
                  <p className="text-sm text-foreground">{pastRepair.description}</p>
                </div>

                <div className="border-t border-border/50" />

                <div>
                  <p className="text-xs text-muted-foreground mb-2">Estimate Breakdown</p>
                  <div className="space-y-2">
                    {pastRepair.parts.map((part) => (
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
              </div>
              <button
                onClick={() => handlePrint(orderPrintRef)}
                className="w-full flex items-center justify-center gap-2 mt-2 py-2 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors text-sm font-medium text-foreground"
              >
                <Printer className="w-4 h-4" /> Print Order
              </button>
            </DialogContent>
          </Dialog>
        </div>

        {/* No more past repairs */}
        <div className="glass-card rounded-2xl p-8 text-center">
          <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
            <HistoryIcon className="w-7 h-7 text-muted-foreground" />
          </div>
          <p className="text-lg font-medium text-foreground mb-2">No more past repairs</p>
          <p className="text-sm text-muted-foreground">
            Additional completed repairs will appear here.
          </p>
        </div>
      </div>
    </PortalLayout>
  );
};

export default RepairHistory;
