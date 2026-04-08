import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import bearMascot from "@/assets/repair-bear-mascot.jpg";
import { CheckCircle, Mail } from "lucide-react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col px-4">
      <div className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/50 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img src={bearMascot} alt="Repair Bear" className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/20" />
            <span className="font-display font-bold text-xl text-foreground">
              Repair <span className="text-gradient">Bear</span>
            </span>
          </Link>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center pt-20 pb-8">
        <div className="w-full max-w-lg">
          {submitted ? (
            <div className="glass-card rounded-2xl p-10 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto">
                <CheckCircle className="w-9 h-9 text-success" />
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
              <div className="flex gap-3 pt-2">
                <Button
                  variant="hero-outline"
                  size="lg"
                  className="flex-1"
                  onClick={() => {
                    setSubmitted(false);
                    setMessage("");
                    setSubject("");
                  }}
                >
                  Send Another Message
                </Button>
                <Link to="/" className="flex-1">
                  <Button variant="hero" size="lg" className="w-full">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center mb-6">
                <img src={bearMascot} alt="Repair Bear" className="w-20 h-20 rounded-full object-cover ring-4 ring-primary/20 mb-3" />
                <h1 className="font-display font-bold text-2xl text-foreground">Contact Us</h1>
                <p className="text-sm text-muted-foreground mt-1">We'd love to hear from you</p>
              </div>

              <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Name</label>
                    <Input
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
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
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Subject</label>
                  <Input
                    placeholder="How can we help?"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Message</label>
                  <Textarea
                    placeholder="Tell us more..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    required
                  />
                </div>
                <Button
                  variant="hero"
                  size="lg"
                  className="w-full"
                  type="submit"
                  disabled={!name || !email || !subject || !message}
                >
                  Send Message
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
