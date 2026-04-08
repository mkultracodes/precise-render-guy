import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import bearMascot from "@/assets/repair-bear-mascot.jpg";
import { toast } from "sonner";

const VALID_EMAIL = "mkhemingway.retpair@gmail.com";
const VALID_PASS = "1234";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === VALID_EMAIL && password === VALID_PASS) {
      localStorage.setItem("repairbear_auth", "true");
      localStorage.setItem("repairbear_user", JSON.stringify({
        name: "MK Hemingway",
        email: VALID_EMAIL,
        phone: "(555) 123-4567",
        address: "123 Main St, Austin, TX 78701",
        payment: "**** **** **** 4242",
      }));
      navigate("/portal");
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <img src={bearMascot} alt="Repair Bear" className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/20 mb-4" />
          <h1 className="font-display font-bold text-2xl text-foreground">
            Repair<span className="text-gradient">Bear</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin} className="glass-card rounded-2xl p-6 space-y-4">
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
  );
};

export default Login;
