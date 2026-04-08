import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { PortalSidebar } from "@/components/PortalSidebar";
import { LogOut, Menu } from "lucide-react";

import bearMascot from "@/assets/repair-bear-mascot.jpg";

interface PortalLayoutProps {
  children: React.ReactNode;
}

export default function PortalLayout({ children }: PortalLayoutProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("repairbear_auth")) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("repairbear_auth");
    navigate("/login");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <PortalSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <header className="h-16 flex items-center justify-between border-b border-border/50 bg-card/80 backdrop-blur-xl px-4 sticky top-0 z-40">
            <div className="flex items-center gap-3">
              {/* Hamburger on mobile */}
              <SidebarTrigger className="md:hidden" />
              {/* Logo on mobile */}
              <a href="/" className="flex items-center gap-2 md:hidden">
                <img src={bearMascot} alt="Repair Bear" className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20" />
                <span className="font-display font-bold text-lg text-foreground">
                  Repair <span className="text-gradient">Bear</span>
                </span>
              </a>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleLogout}
                className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-destructive/20 transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4 text-foreground" />
              </button>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
