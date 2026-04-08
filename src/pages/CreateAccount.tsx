import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import bearMascot from "@/assets/repair-bear-mascot.jpg";
import { toast } from "sonner";

const CreateAccount = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const update = (field: string, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (form.password.length < 4) {
      toast.error("Password must be at least 4 characters");
      return;
    }
    localStorage.setItem("repairbear_auth", "true");
    localStorage.setItem("repairbear_user", JSON.stringify({
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address,
      payment: "",
    }));
    toast.success("Account created!");
    navigate("/portal");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col px-4">
      <div className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/50 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={bearMascot} alt="Repair Bear" className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/20" />
            <span className="font-display font-bold text-xl text-foreground">
              Repair <span className="text-gradient">Bear</span>
            </span>
          </Link>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center pt-20 pb-8">
        <div className="w-full max-w-sm">
          <div className="flex flex-col items-center mb-6">
            <img src={bearMascot} alt="Repair Bear" className="w-20 h-20 rounded-full object-cover ring-4 ring-primary/20 mb-3" />
            <h1 className="font-display font-bold text-2xl text-foreground">
              Create Account
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Join Repair Bear</p>
          </div>

          <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Full Name *</label>
              <Input
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email *</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Phone Number *</label>
              <Input
                type="tel"
                placeholder="(555) 123-4567"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Address *</label>
              <Input
                placeholder="123 Main St, City, ST 00000"
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Password *</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Confirm Password *</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={(e) => update("confirmPassword", e.target.value)}
                required
              />
            </div>

            <Button variant="hero" size="lg" className="w-full" type="submit">
              Create Account
            </Button>

            <div className="text-center text-sm pt-2">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
