import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ChevronRight, MapPin, Phone, Clock, X } from "lucide-react";
import PortalLayout from "@/components/PortalLayout";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const statusSteps = [
  { label: "Quote sent", done: true },
  { label: "Shop confirmed", done: true },
  { label: "In repair", active: true },
  { label: "Ready for pickup", done: false },
  { label: "Completed", done: false },
];

const shopInfo = {
  name: "FixIt Pro",
  address: "456 Commerce Blvd, Suite 12, Austin, TX 78702",
  phone: "(512) 555-0199",
  hours: "Mon–Sat 9am–7pm",
  rating: "4.8 ★",
};

const orderDetails = {
  orderNumber: "RB-2026-00417",
  date: "April 5, 2026",
  device: "iPhone 14 Pro",
  issue: "Cracked screen — front display shattered, touch partially unresponsive",
  description: "Full OLED display assembly replacement with OEM-quality part. Includes digitizer, front glass, and frame re-seal. Device diagnostics pre- and post-repair.",
  parts: [
    { name: "iPhone 14 Pro OLED Display Assembly", qty: 1, price: "$89.00" },
    { name: "Adhesive Seal Kit", qty: 1, price: "$5.00" },
    { name: "Labor — Screen Replacement", qty: 1, price: "$35.00" },
  ],
  estimateLow: "$99.00",
  estimateHigh: "$129.00",
  shop: shopInfo.name,
  technician: "Marcus R.",
  warranty: "90-day repair warranty",
};

const CustomerPortal = () => {
  const { ref: dashRef, isVisible: dashVisible } = useScrollReveal();

  return (
    <PortalLayout>
      <div className="max-w-2xl">
        {/* Welcome */}
        <div className="mb-8 animate-fade-up">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Hi, MK — thanks for using Repair Bear
          </h1>
        </div>

        {/* Active Repair Card */}
        <section ref={dashRef}>
          <h2 className="text-lg font-bold text-foreground mb-4">Active Repairs</h2>
          <div
            className={`glass-card rounded-2xl p-6 glow-border transition-all duration-700 ${
              dashVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="font-display font-bold text-lg text-foreground">iPhone 14 Pro</p>
                <p className="text-sm text-muted-foreground">Cracked screen replacement</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-bear-gold/10 text-bear-gold text-xs font-semibold animate-pulse">
                In Repair
              </span>
            </div>

            {/* Progress timeline */}
            <div className="flex items-center gap-0 mb-6">
              {statusSteps.map((step, i) => (
                <div key={step.label} className="flex-1 flex items-center">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-4 h-4 rounded-full border-2 transition-all duration-500 ${
                        step.done ? "bg-success border-success" :
                        step.active ? "bg-bear-gold border-bear-gold animate-pulse" :
                        "bg-secondary border-border"
                      }`}
                      style={{ transitionDelay: `${i * 100}ms` }}
                    />
                    <span className={`text-[10px] mt-1.5 text-center ${step.done || step.active ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                      {step.label}
                    </span>
                  </div>
                  {i < statusSteps.length - 1 && (
                    <div className={`h-0.5 flex-1 -mt-4 ${step.done ? "bg-success" : "bg-border"}`} />
                  )}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-secondary/50 rounded-xl p-3">
                <p className="text-xs text-muted-foreground">Estimated</p>
                <p className="font-bold text-foreground text-sm">$99 – $129</p>
              </div>

              {/* Shop — clickable dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <button className="bg-secondary/50 rounded-xl p-3 text-left hover:bg-secondary/70 transition-colors cursor-pointer">
                    <p className="text-xs text-muted-foreground">Shop</p>
                    <p className="font-bold text-foreground text-sm underline decoration-primary/40">FixIt Pro</p>
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="font-display text-xl">{shopInfo.name}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-2">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Address</p>
                        <p className="text-sm text-muted-foreground">{shopInfo.address}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Phone</p>
                        <p className="text-sm text-muted-foreground">{shopInfo.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Hours</p>
                        <p className="text-sm text-muted-foreground">{shopInfo.hours}</p>
                      </div>
                    </div>
                    <div className="bg-secondary/50 rounded-xl p-3 text-center">
                      <p className="text-sm text-muted-foreground">Customer Rating</p>
                      <p className="font-bold text-foreground text-lg">{shopInfo.rating}</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* View Details — order popup */}
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
                <div className="space-y-5 pt-2">
                  {/* Order header */}
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs text-muted-foreground">Order #</p>
                      <p className="font-bold text-foreground">{orderDetails.orderNumber}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Date</p>
                      <p className="font-bold text-foreground">{orderDetails.date}</p>
                    </div>
                  </div>

                  <div className="border-t border-border/50" />

                  {/* Device & Issue */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Device</p>
                    <p className="font-semibold text-foreground">{orderDetails.device}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Reported Issue</p>
                    <p className="text-sm text-foreground">{orderDetails.issue}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Description of Work</p>
                    <p className="text-sm text-foreground">{orderDetails.description}</p>
                  </div>

                  <div className="border-t border-border/50" />

                  {/* Line items */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Estimate Breakdown</p>
                    <div className="space-y-2">
                      {orderDetails.parts.map((part) => (
                        <div key={part.name} className="flex justify-between items-center bg-secondary/30 rounded-lg px-3 py-2">
                          <div>
                            <p className="text-sm font-medium text-foreground">{part.name}</p>
                            <p className="text-xs text-muted-foreground">Qty: {part.qty}</p>
                          </div>
                          <p className="text-sm font-bold text-foreground">{part.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-border/50" />

                  {/* Totals & info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-secondary/50 rounded-xl p-3">
                      <p className="text-xs text-muted-foreground">Estimate Range</p>
                      <p className="font-bold text-foreground">{orderDetails.estimateLow} – {orderDetails.estimateHigh}</p>
                    </div>
                    <div className="bg-secondary/50 rounded-xl p-3">
                      <p className="text-xs text-muted-foreground">Technician</p>
                      <p className="font-bold text-foreground">{orderDetails.technician}</p>
                    </div>
                  </div>
                  <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 text-center">
                    <p className="text-sm font-medium text-primary">{orderDetails.warranty}</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </section>
      </div>
    </PortalLayout>
  );
};

export default CustomerPortal;
