import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PortalLayout from "@/components/PortalLayout";
import { CheckCircle, Mail } from "lucide-react";

const ContactSupport = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

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
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <PortalLayout>
        <div className="max-w-lg">
          <div className="glass-card rounded-2xl p-10 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
              <CheckCircle className="w-9 h-9 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="font-display font-bold text-2xl text-foreground">Message Sent!</h1>
            <p className="text-muted-foreground">
              Thank you for reaching out. A follow-up email will be sent to{" "}
              <span className="font-medium text-foreground">{email}</span> shortly.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-2">
              <Mail className="w-4 h-4" />
              <span>Check your inbox for a confirmation</span>
            </div>
            <Button
              variant="hero"
              size="lg"
              className="w-full mt-4"
              onClick={() => {
                setSubmitted(false);
                setMessage("");
              }}
            >
              Send Another Message
            </Button>
          </div>
        </div>
      </PortalLayout>
    );
  }

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
