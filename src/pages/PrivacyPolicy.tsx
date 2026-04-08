import { Link } from "react-router-dom";
import bearMascot from "@/assets/repair-bear-mascot.jpg";
import { ScrollArea } from "@/components/ui/scroll-area";

const PrivacyPolicy = () => (
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

    <div className="flex-1 flex justify-center pt-20 pb-8">
      <div className="w-full max-w-2xl">
        <h1 className="font-display font-bold text-3xl text-foreground mb-6">Privacy Policy</h1>
        <div className="glass-card rounded-2xl p-6 space-y-4 text-sm text-muted-foreground">
          <p><strong className="text-foreground">Effective Date:</strong> January 1, 2025</p>
          <p>Repair Bear ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.</p>
          <h3 className="font-semibold text-foreground text-base">1. Information We Collect</h3>
          <p>We collect personal information you provide when creating an account, including your name, email address, phone number, and device repair details. We may also collect usage data such as pages visited and features used.</p>
          <h3 className="font-semibold text-foreground text-base">2. How We Use Your Information</h3>
          <p>We use your information to facilitate device repair coordination, communicate with you about your repairs, improve our services, and send relevant notifications about your account and repair status.</p>
          <h3 className="font-semibold text-foreground text-base">3. Data Sharing</h3>
          <p>We share your device and contact information with repair providers you select through our platform. We do not sell your personal data to third parties.</p>
          <h3 className="font-semibold text-foreground text-base">4. Data Security</h3>
          <p>We implement industry-standard security measures to protect your information. However, no method of electronic transmission or storage is 100% secure.</p>
          <h3 className="font-semibold text-foreground text-base">5. Your Rights</h3>
          <p>You have the right to access, update, or delete your personal information at any time through your account settings. You may also contact us to exercise these rights.</p>
          <h3 className="font-semibold text-foreground text-base">6. Cookies & Tracking</h3>
          <p>We may use cookies and similar tracking technologies to enhance your experience. You can manage cookie preferences through your browser settings.</p>
          <h3 className="font-semibold text-foreground text-base">7. Contact Us</h3>
          <p>If you have questions about this Privacy Policy, please contact us through the <Link to="/contact" className="text-primary hover:underline">Contact page</Link> or the support section of your account portal.</p>
        </div>
      </div>
    </div>
  </div>
);

export default PrivacyPolicy;
