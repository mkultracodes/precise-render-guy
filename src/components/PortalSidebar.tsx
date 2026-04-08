import { Wrench, Plus, History, MessageCircle, Settings } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import bearMascot from "@/assets/repair-bear-mascot.jpg";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Active Repairs", url: "/portal", icon: Wrench },
  { title: "Start a New Repair", url: "/portal/new-repair", icon: Plus },
  { title: "History", url: "/portal/history", icon: History },
  { title: "Contact Support", url: "/portal/support", icon: MessageCircle },
  { title: "Settings", url: "/profile", icon: Settings },
];

export function PortalSidebar() {
  const location = useLocation();

  return (
    <Sidebar collapsible="offcanvas" className="border-r border-border/50">
      <div className="h-16 flex items-center px-4 border-b border-border/50">
        <a href="/" className="flex items-center gap-2.5">
          <img src={bearMascot} alt="Repair Bear" className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/20 shrink-0" />
          {(
            <span className="font-display font-bold text-xl text-foreground">
              Repair <span className="text-gradient">Bear</span>
            </span>
          )}
        </a>
      </div>
      <SidebarContent className="pt-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end
                        className={`hover:bg-muted/50 ${isActive ? "bg-muted text-primary font-medium" : ""}`}
                        activeClassName="bg-muted text-primary font-medium"
                      >
                        <item.icon className="mr-2 h-4 w-4 shrink-0" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
