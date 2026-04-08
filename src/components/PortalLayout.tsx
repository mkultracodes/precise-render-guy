import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { PortalSidebar } from "@/components/PortalSidebar";
import { LogOut } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

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
        <div className="flex-1 flex flex-col">
          {/* Top bar */}
          <header className="h-16 flex items-center justify-between border-b border-border/50 bg-card/80 backdrop-blur-xl px-4 sticky top-0 z-40">
            <div />
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button
                onClick={handleLogout}
                className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-destructive/20 transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4 text-foreground" />
              </button>
            </div>
          </header>
          <main className="flex-1 p-6 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
