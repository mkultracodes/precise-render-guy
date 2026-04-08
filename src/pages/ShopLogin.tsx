import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import bearMascot from "@/assets/repair-bear-mascot.jpg";
import { toast } from "sonner";

const VALID_EMAIL = "mkhemingway.retpair@gmail.com";
const VALID_PASS = "1234";

const ShopLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === VALID_EMAIL && password === VALID_PASS) {
      localStorage.setItem("repairbear_shop_auth", "true");
      localStorage.setItem("repairbear_shop_user", JSON.stringify({
        shopName: "FixIt Pro",
        email: VALID_EMAIL,
        phone: "(512) 555-0199",
        address: "456 Commerce Blvd, Suite 12, Austin, TX 78702",
      }));
      navigate("/shop");
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col px-4">
      <div className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/50 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img src={bearMascot} alt="Repair Bear" className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/20" />
            <span className="font-display font-bold text-xl text-foreground flex items-center gap-1.5">
              Repair <span className="text-gradient">Bear</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent font-semibold">Shop</span>
            </span>
          </Link>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center pt-16">
        <div className="w-full max-w-sm">
          <div className="flex flex-col items-center mb-8">
            <img src={bearMascot} alt="Repair Bear" className="w-28 h-28 rounded-full object-cover ring-4 ring-primary/20 mb-4" />
            <h1 className="font-display font-bold text-3xl text-foreground">
              Repair <span className="text-gradient">Bear</span>
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-accent/10 text-accent font-semibold">Shop</span>
              <p className="text-sm text-muted-foreground">Sign in to your shop account</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="glass-card rounded-2xl p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <Input
                type="email"
                placeholder="shop@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <Input
                type="password"
                placeholder="••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button variant="hero" size="lg" className="w-full" type="submit">
              Sign In
            </Button>

            <div className="flex justify-between text-sm pt-2">
              <Link to="/forgot-password" className="text-primary hover:underline">Forgot Password?</Link>
              <Link to="/reset-password" className="text-primary hover:underline">Reset Password</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopLogin;
