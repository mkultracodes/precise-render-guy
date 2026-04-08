import { Button } from "@/components/ui/button";
import bearMascot from "@/assets/repair-bear-mascot.jpg";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-card/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-primary/5"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5 group cursor-pointer">
          <div className="relative">
            <img
              src={bearMascot}
              alt="Repair Bear"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all duration-300"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-success border-2 border-card animate-pulse" />
          </div>
          <span className="font-display font-bold text-xl text-foreground">
            Repair<span className="text-gradient">Bear</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {[
            { href: "#how-it-works", label: "How It Works" },
            { href: "#pricing", label: "Pricing" },
            { href: "#trust", label: "Why Us" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-muted-foreground hover:text-foreground transition-colors text-sm font-medium group/link"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover/link:w-full" />
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="outline" size="sm">
              Customer Login
            </Button>
          </Link>
          <Link to="/shop-login">
            <Button variant="hero" size="sm">
              Shop Login
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
