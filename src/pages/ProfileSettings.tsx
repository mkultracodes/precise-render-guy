import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import bearMascot from "@/assets/repair-bear-mascot.jpg";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import ThemeToggle from "@/components/ThemeToggle";

const defaultProfile = {
  name: "MK Hemingway",
  email: "mkhemingway.retpair@gmail.com",
  phone: "(555) 123-4567",
  address: "123 Main St, Austin, TX 78701",
  payment: "**** **** **** 4242",
};

const ProfileSettings = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(defaultProfile);

  useEffect(() => {
    if (!localStorage.getItem("repairbear_auth")) {
      navigate("/login");
      return;
    }
    const saved = localStorage.getItem("repairbear_user");
    if (saved) setProfile(JSON.parse(saved));
  }, [navigate]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("repairbear_user", JSON.stringify(profile));
    toast.success("Profile updated");
  };

  const update = (field: string, value: string) =>
    setProfile((p) => ({ ...p, [field]: value }));

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/50 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/portal" className="flex items-center gap-2.5">
            <img src={bearMascot} alt="Repair Bear" className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/20" />
            <span className="font-display font-bold text-xl text-foreground">
              Repair<span className="text-gradient">Bear</span>
            </span>
          </Link>
          <ThemeToggle />
        </div>
      </div>

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-lg">
          <Link to="/portal" className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Portal
          </Link>

          <h1 className="font-display font-bold text-2xl text-foreground mb-6">Profile Settings</h1>

          <form onSubmit={handleSave} className="glass-card rounded-2xl p-6 space-y-5">
            {[
              { label: "Name", field: "name", type: "text" },
              { label: "Email", field: "email", type: "email" },
              { label: "Phone Number", field: "phone", type: "tel" },
              { label: "Address", field: "address", type: "text" },
              { label: "Payment Method", field: "payment", type: "text" },
            ].map((f) => (
              <div key={f.field} className="space-y-2">
                <label className="text-sm font-medium text-foreground">{f.label}</label>
                <Input
                  type={f.type}
                  value={(profile as any)[f.field]}
                  onChange={(e) => update(f.field, e.target.value)}
                />
              </div>
            ))}

            <Button variant="hero" size="lg" className="w-full" type="submit">
              Save Changes
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ProfileSettings;
