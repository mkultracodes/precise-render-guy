import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ShopPortalLayout from "@/components/ShopPortalLayout";

const defaultProfile = {
  shopName: "FixIt Pro",
  ownerName: "Frank Peters",
  email: "shop@fixitpro.com",
  phone: "(512) 555-0199",
  address: "456 Commerce Blvd, Suite 12",
  city: "Austin",
  state: "TX",
  zip: "78702",
  website: "https://fixitpro.com",
  businessHours: "Mon–Sat 9am–7pm",
  specialties: "Phones, Tablets, Laptops",
};

const ShopSettings = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(defaultProfile);

  useEffect(() => {
    if (!localStorage.getItem("repairbear_shop_auth")) {
      navigate("/shop-login");
      return;
    }
    const saved = localStorage.getItem("repairbear_shop_settings");
    if (saved) setProfile(JSON.parse(saved));
  }, [navigate]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("repairbear_shop_settings", JSON.stringify(profile));
    toast.success("Changes saved successfully!");
  };

  const update = (field: string, value: string) =>
    setProfile((p) => ({ ...p, [field]: value }));

  const fields = [
    { label: "Business Name", field: "shopName", type: "text" },
    { label: "Owner / Manager Name", field: "ownerName", type: "text" },
    { label: "Email", field: "email", type: "email" },
    { label: "Phone Number", field: "phone", type: "tel" },
    { label: "Street Address", field: "address", type: "text" },
    { label: "City", field: "city", type: "text" },
    { label: "State", field: "state", type: "text" },
    { label: "ZIP Code", field: "zip", type: "text" },
    { label: "Website", field: "website", type: "url" },
    { label: "Business Hours", field: "businessHours", type: "text" },
    { label: "Specialties", field: "specialties", type: "text" },
  ];

  return (
    <ShopPortalLayout>
      <div className="max-w-lg">
        <h1 className="font-display font-bold text-2xl text-foreground mb-6">Provider Settings</h1>

        <form onSubmit={handleSave} className="glass-card rounded-2xl p-6 space-y-5">
          {fields.map((f) => (
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
    </ShopPortalLayout>
  );
};

export default ShopSettings;
