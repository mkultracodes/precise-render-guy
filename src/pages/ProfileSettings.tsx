import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PortalLayout from "@/components/PortalLayout";

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
    <PortalLayout>
      <div className="max-w-lg">
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
    </PortalLayout>
  );
};

export default ProfileSettings;
