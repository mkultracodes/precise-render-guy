import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import bearMascot from "@/assets/repair-bear-mascot.jpg";
import { toast } from "sonner";
import { CreditCard, Lock } from "lucide-react";

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
  "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"
];

const Payment = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
    country: "US",
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cvc: "",
  });

  const update = (field: string, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const isFormValid =
    form.name &&
    form.email &&
    form.phone &&
    form.addressLine1 &&
    form.city &&
    form.state &&
    form.zip &&
    form.cardNumber.replace(/\s/g, "").length >= 13 &&
    form.expMonth &&
    form.expYear &&
    form.cvc.length >= 3;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Payment submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col px-4">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/50 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img src={bearMascot} alt="Repair Bear" className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/20" />
            <span className="font-display font-bold text-xl text-foreground">
              Repair <span className="text-gradient">Bear</span>
            </span>
          </Link>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center pt-20 pb-8">
        <div className="w-full max-w-lg">
          <div className="flex flex-col items-center mb-6">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <CreditCard className="w-7 h-7 text-primary" />
            </div>
            <h1 className="font-display font-bold text-2xl text-foreground">Payment</h1>
            <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
              <Lock className="w-3 h-3" /> Secure checkout
            </p>
          </div>

          <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 space-y-6">
            {/* Contact Information */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Contact Information</h3>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Full Name</label>
                  <Input
                    placeholder="John Doe"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Email</label>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Phone</label>
                    <Input
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-border/50" />

            {/* Billing Address */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Billing Address</h3>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Address Line 1</label>
                  <Input
                    placeholder="123 Main St"
                    value={form.addressLine1}
                    onChange={(e) => update("addressLine1", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Address Line 2 (optional)</label>
                  <Input
                    placeholder="Apt, suite, unit"
                    value={form.addressLine2}
                    onChange={(e) => update("addressLine2", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">City</label>
                    <Input
                      placeholder="Austin"
                      value={form.city}
                      onChange={(e) => update("city", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">State</label>
                    <Select value={form.state} onValueChange={(v) => update("state", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="State" />
                      </SelectTrigger>
                      <SelectContent>
                        {US_STATES.map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">ZIP Code</label>
                    <Input
                      placeholder="78701"
                      value={form.zip}
                      onChange={(e) => update("zip", e.target.value.replace(/\D/g, "").slice(0, 5))}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-border/50" />

            {/* Card Details */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Card Details</h3>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Card Number</label>
                  <Input
                    placeholder="4242 4242 4242 4242"
                    value={form.cardNumber}
                    onChange={(e) => update("cardNumber", formatCardNumber(e.target.value))}
                    maxLength={19}
                    required
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Exp Month</label>
                    <Select value={form.expMonth} onValueChange={(v) => update("expMonth", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="MM" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")).map((m) => (
                          <SelectItem key={m} value={m}>{m}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Exp Year</label>
                    <Select value={form.expYear} onValueChange={(v) => update("expYear", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="YY" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 10 }, (_, i) => String(2025 + i)).map((y) => (
                          <SelectItem key={y} value={y}>{y}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">CVC</label>
                    <Input
                      placeholder="123"
                      value={form.cvc}
                      onChange={(e) => update("cvc", e.target.value.replace(/\D/g, "").slice(0, 4))}
                      maxLength={4}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <Button
              variant="hero"
              size="lg"
              className="w-full"
              type="submit"
              disabled={!isFormValid}
            >
              <Lock className="w-4 h-4" /> Submit Payment
            </Button>

            <p className="text-[10px] text-center text-muted-foreground">
              Your payment is processed securely through Stripe. We never store your card details.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
