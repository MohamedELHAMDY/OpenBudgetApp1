import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  MessageSquare,
  PieChart,
  BookOpen,
  LogOut,
} from "lucide-react";
import { Link } from "wouter";

export function Sidebar() {
  const { logoutMutation } = useAuth();

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/",
    },
    {
      icon: MessageSquare,
      label: "Forum",
      href: "/forum",
    },
    {
      icon: PieChart,
      label: "Budget Analysis",
      href: "/analysis",
    },
    {
      icon: BookOpen,
      label: "Education",
      href: "/education",
    },
  ];

  return (
    <div className="w-64 bg-sidebar border-r border-border flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold text-sidebar-foreground">
          Mizaniyatona
        </h1>
      </div>

      <nav className="flex-1 px-4">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <div className="flex items-center gap-3 px-4 py-2 text-sidebar-foreground hover:bg-sidebar-accent rounded-md cursor-pointer">
              <item.icon className="h-5 w-5" />
              {item.label}
            </div>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => logoutMutation.mutate()}
        >
          <LogOut className="mr-2 h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  );
}