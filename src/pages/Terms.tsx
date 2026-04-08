import { Link } from "react-router-dom";
import bearMascot from "@/assets/repair-bear-mascot.jpg";

const Terms = () => (
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
        <h1 className="font-display font-bold text-3xl text-foreground mb-6">Terms & Conditions</h1>
        <div className="glass-card rounded-2xl p-6 space-y-4 text-sm text-muted-foreground">
          <p><strong className="text-foreground">Effective Date:</strong> January 1, 2025</p>
          <p>Welcome to Repair Bear. By creating an account and using our services, you agree to the following Terms & Conditions.</p>
          <h3 className="font-semibold text-foreground text-base">1. Services</h3>
          <p>Repair Bear is a device repair coordination platform that connects customers with local repair shops. We facilitate communication, estimates, and tracking but do not perform repairs directly.</p>
          <h3 className="font-semibold text-foreground text-base">2. User Accounts</h3>
          <p>You are responsible for maintaining the confidentiality of your account credentials. You agree to provide accurate and complete information when creating your account.</p>
          <h3 className="font-semibold text-foreground text-base">3. Fees</h3>
          <p>Repair Bear charges a coordination fee per repair submission. Repair costs are determined by and paid directly to the repair shop. All Repair Bear fees are non-refundable once a repair has been matched with a shop.</p>
          <h3 className="font-semibold text-foreground text-base">4. Limitation of Liability</h3>
          <p>Repair Bear is not responsible for the quality, timeliness, or outcome of repairs performed by third-party repair shops. We act solely as a coordination platform.</p>
          <h3 className="font-semibold text-foreground text-base">5. Intellectual Property</h3>
          <p>All content, trademarks, and materials on the Repair Bear platform are owned by Repair Bear and may not be reproduced without written permission.</p>
          <h3 className="font-semibold text-foreground text-base">6. Termination</h3>
          <p>We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent activity.</p>
          <h3 className="font-semibold text-foreground text-base">7. Changes to Terms</h3>
          <p>We may update these terms from time to time. Continued use of the platform after changes constitutes acceptance of the updated terms.</p>
          <h3 className="font-semibold text-foreground text-base">8. Governing Law</h3>
          <p>These terms are governed by the laws of the State of Texas, United States. Any disputes shall be resolved in the courts of Travis County, Texas.</p>
        </div>
      </div>
    </div>
  </div>
);

export default Terms;
