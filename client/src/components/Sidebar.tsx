import { Link, useLocation } from "wouter";
import { Brain, Home, History, BookOpen, User, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const [location] = useLocation();

  const navItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: Zap, label: "Start Routine", path: "/match-input" },
    { icon: History, label: "History", path: "/history" },
    { icon: BookOpen, label: "Knowledge", path: "/knowledge" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <aside className="w-20 bg-card border-r flex flex-col items-center py-6 gap-6">
      <Link href="/">
        <a className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary hover-elevate active-elevate-2">
          <Brain className="h-6 w-6 text-primary-foreground" />
        </a>
      </Link>

      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = location === item.path;
          return (
            <Link key={item.path} href={item.path}>
              <a
                className={cn(
                  "flex flex-col items-center justify-center w-14 h-14 rounded-xl transition-all hover-elevate active-elevate-2",
                  isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                )}
                data-testid={`nav-${item.label.toLowerCase().replace(' ', '-')}`}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-[10px] mt-1">{item.label.split(' ')[0]}</span>
              </a>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
