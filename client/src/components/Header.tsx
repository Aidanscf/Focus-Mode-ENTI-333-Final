import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Brain, User, History, BookOpen } from "lucide-react";

export default function Header() {
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" data-testid="link-home">
          <a className="flex items-center gap-2 hover-elevate active-elevate-2 rounded-md px-3 py-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="font-display font-semibold text-xl">FocusMode</span>
          </a>
        </Link>

        <nav className="flex items-center gap-2">
          <Link href="/history" data-testid="link-history">
            <Button 
              variant={location === "/history" ? "secondary" : "ghost"} 
              size="sm"
              className="gap-2"
            >
              <History className="h-4 w-4" />
              <span className="hidden sm:inline">History</span>
            </Button>
          </Link>
          <Link href="/knowledge" data-testid="link-knowledge">
            <Button 
              variant={location === "/knowledge" ? "secondary" : "ghost"} 
              size="sm"
              className="gap-2"
            >
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Knowledge</span>
            </Button>
          </Link>
          <Link href="/profile" data-testid="link-profile">
            <Button 
              variant={location === "/profile" ? "secondary" : "ghost"} 
              size="sm"
              className="gap-2"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
