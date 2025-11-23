import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import AthleteSetup from "@/pages/AthleteSetup";
import MatchInput from "@/pages/MatchInput";
import RoutineOutput from "@/pages/RoutineOutput";
import History from "@/pages/History";
import Knowledge from "@/pages/Knowledge";
import Profile from "@/pages/Profile";
import Article from "@/pages/Article";
import NotFound from "@/pages/not-found";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // Show Login page for logged-out users
  if (!isAuthenticated) {
    return (
      <Switch>
        <Route path="/" component={Login} />
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    );
  }

  // Logged-in users: check if they have an athlete profile
  return <AuthenticatedRouter />;
}

function AuthenticatedRouter() {
  const { data: profile, isLoading } = useQuery({
    queryKey: ["/api/athlete-profile"],
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // If no profile exists, redirect to setup
  if (!profile) {
    return (
      <Switch>
        <Route path="/setup" component={AthleteSetup} />
        <Route path="*">
          <Redirect to="/setup" />
        </Route>
      </Switch>
    );
  }

  // User has profile, show full app with sidebar
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/setup" component={AthleteSetup} />
          <Route path="/match-input" component={MatchInput} />
          <Route path="/routine/:id" component={RoutineOutput} />
          <Route path="/history" component={History} />
          <Route path="/knowledge" component={Knowledge} />
          <Route path="/profile" component={Profile} />
          <Route path="/article/:id" component={Article} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
