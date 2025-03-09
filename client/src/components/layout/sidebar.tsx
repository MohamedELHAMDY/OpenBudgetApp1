import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  LayoutDashboard,
  MessageSquare,
  PieChart,
  BookOpen,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";
import { Link } from "wouter";
import { useTheme } from "@/hooks/use-theme";

export function Sidebar() {
  const { logoutMutation } = useAuth();
  const { theme, setTheme } = useTheme();

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Tableau de Bord",
      href: "/",
    },
    {
      icon: MessageSquare,
      label: "Forum",
      href: "/forum",
    },
    {
      icon: PieChart,
      label: "Analyse Budgétaire",
      href: "/analysis",
    },
    {
      icon: BookOpen,
      label: "Éducation",
      href: "/education",
    },
  ];

  return (
    <div className="w-64 bg-sidebar border-r border-border flex flex-col">
      <div className="p-6 flex items-center gap-3">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Flag_of_Morocco.svg"
          alt="Drapeau du Maroc"
          className="h-6 w-auto"
        />
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

      <div className="p-4 border-t border-border space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4" />
            <Label>Mode Sombre</Label>
            <Moon className="h-4 w-4" />
          </div>
          <Switch
            checked={theme === "dark"}
            onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
          />
        </div>

        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => logoutMutation.mutate()}
        >
          <LogOut className="mr-2 h-5 w-5" />
          Déconnexion
        </Button>
      </div>
    </div>
  );
}