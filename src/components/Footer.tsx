import { Link } from "react-router-dom";
import bearMascot from "@/assets/repair-bear-mascot.jpg";

const Footer = () => {
  return (
    <footer className="py-16 border-t border-border/50 relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={bearMascot} alt="Repair Bear" className="w-8 h-8 rounded-full object-cover" />
              <span className="font-display font-bold text-lg text-foreground">
                Repair <span className="text-gradient">Bear</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The easiest way to get your device repaired. No calls, no guesswork.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm">Product</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="/#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="/#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/#trust" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Why Us
                </a>
              </li>
            </ul>
          </div>

          {/* Portals */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm">Portals</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/portal" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Customer Portal
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Shop Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm">Company</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/corporate" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Investors
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border/50 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Repair Bear. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
