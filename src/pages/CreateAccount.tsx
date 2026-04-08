import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import bearMascot from "@/assets/repair-bear-mascot.jpg";
import { toast } from "sonner";

const PrivacyPolicyContent = () => (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p><strong className="text-foreground">Effective Date:</strong> January 1, 2025</p>
    <p>Repair Bear ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.</p>
    <h3 className="font-semibold text-foreground">1. Information We Collect</h3>
    <p>We collect personal information you provide when creating an account, including your name, email address, phone number, and device repair details. We may also collect usage data such as pages visited and features used.</p>
    <h3 className="font-semibold text-foreground">2. How We Use Your Information</h3>
    <p>We use your information to facilitate device repair coordination, communicate with you about your repairs, improve our services, and send relevant notifications about your account and repair status.</p>
    <h3 className="font-semibold text-foreground">3. Data Sharing</h3>
    <p>We share your device and contact information with repair shops you select through our platform. We do not sell your personal data to third parties.</p>
    <h3 className="font-semibold text-foreground">4. Data Security</h3>
    <p>We implement industry-standard security measures to protect your information. However, no method of electronic transmission or storage is 100% secure.</p>
    <h3 className="font-semibold text-foreground">5. Contact Us</h3>
    <p>If you have questions about this Privacy Policy, please contact us through the support section of your account portal.</p>
  </div>
);

const TermsContent = () => (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p><strong className="text-foreground">Effective Date:</strong> January 1, 2025</p>
    <p>Welcome to Repair Bear. By creating an account and using our services, you agree to the following Terms & Conditions.</p>
    <h3 className="font-semibold text-foreground">1. Services</h3>
    <p>Repair Bear is a device repair coordination platform that connects customers with local repair shops. We facilitate communication, estimates, and tracking but do not perform repairs directly.</p>
    <h3 className="font-semibold text-foreground">2. User Accounts</h3>
    <p>You are responsible for maintaining the confidentiality of your account credentials. You agree to provide accurate and complete information when creating your account.</p>
    <h3 className="font-semibold text-foreground">3. Fees</h3>
    <p>Repair Bear charges a coordination fee per repair submission. Repair costs are determined by and paid directly to the repair shop. All Repair Bear fees are non-refundable once a repair has been matched with a shop.</p>
    <h3 className="font-semibold text-foreground">4. Limitation of Liability</h3>
    <p>Repair Bear is not responsible for the quality, timeliness, or outcome of repairs performed by third-party repair shops. We act solely as a coordination platform.</p>
    <h3 className="font-semibold text-foreground">5. Termination</h3>
    <p>We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent activity.</p>
    <h3 className="font-semibold text-foreground">6. Changes to Terms</h3>
    <p>We may update these terms from time to time. Continued use of the platform after changes constitutes acceptance of the updated terms.</p>
  </div>
);

const CreateAccount = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [agreed, setAgreed] = useState(false);

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
      address: "",
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
              <label className="text-sm font-medium text-foreground">Full Name</label>
              <Input
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Phone Number</label>
              <Input
                type="tel"
                placeholder="(555) 123-4567"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Confirm Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={(e) => update("confirmPassword", e.target.value)}
                required
              />
            </div>

            <div className="flex items-start gap-2 pt-1">
              <Checkbox
                id="agree"
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(checked === true)}
                className="mt-0.5"
              />
              <label htmlFor="agree" className="text-sm text-muted-foreground leading-snug">
                I agree to the{" "}
                <Dialog>
                  <DialogTrigger asChild>
                    <button type="button" className="text-primary font-medium hover:underline">Terms & Conditions</button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle className="font-display">Terms & Conditions</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="max-h-[60vh] pr-4">
                      <TermsContent />
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
                {" "}and{" "}
                <Dialog>
                  <DialogTrigger asChild>
                    <button type="button" className="text-primary font-medium hover:underline">Privacy Policy</button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle className="font-display">Privacy Policy</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="max-h-[60vh] pr-4">
                      <PrivacyPolicyContent />
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </label>
            </div>

            <Button variant="hero" size="lg" className="w-full" type="submit" disabled={!agreed}>
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