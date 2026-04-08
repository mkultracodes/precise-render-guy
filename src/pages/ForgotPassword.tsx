import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import bearMascot from "@/assets/repair-bear-mascot.jpg";
import { Mail, ArrowLeft } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <img src={bearMascot} alt="Repair Bear" className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/20 mb-4" />
          <h1 className="font-display font-bold text-2xl text-foreground">
            Repair <span className="text-gradient">Bear</span>
          </h1>
        </div>

        <div className="glass-card rounded-2xl p-6">
          {sent ? (
            <div className="text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Mail className="w-7 h-7 text-primary" />
              </div>
              <h2 className="font-display font-bold text-xl text-foreground">Email Sent</h2>
              <p className="text-sm text-muted-foreground">
                If an account exists for <span className="font-medium text-foreground">{email}</span>, you'll receive a password reset link.
              </p>
              <Link to="/login" className="inline-flex items-center gap-2 text-sm text-primary hover:underline mt-4">
                <ArrowLeft className="w-4 h-4" /> Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="font-display font-bold text-xl text-foreground text-center">Forgot Password</h2>
              <p className="text-sm text-muted-foreground text-center">Enter your email and we'll send you a reset link.</p>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email</label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button variant="hero" size="lg" className="w-full" type="submit">
                Send Reset Link
              </Button>
              <div className="text-center">
                <Link to="/login" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
                  <ArrowLeft className="w-4 h-4" /> Back to Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
