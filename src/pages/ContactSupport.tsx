import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import PortalLayout from "@/components/PortalLayout";

const ContactSupport = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("repairbear_user");
    if (saved) {
      const user = JSON.parse(saved);
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Your message has been sent. We'll get back to you soon!");
    setMessage("");
  };

  return (
    <PortalLayout>
      <div className="max-w-lg">
        <h1 className="font-display font-bold text-2xl text-foreground mb-6">Contact Support</h1>
        <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} readOnly className="opacity-70" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} readOnly className="opacity-70" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">How can we help?</label>
            <Textarea
              placeholder="Describe your issue or question..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              required
            />
          </div>
          <Button variant="hero" size="lg" className="w-full" type="submit">
            Send Message
          </Button>
        </form>
      </div>
    </PortalLayout>
  );
};

export default ContactSupport;
