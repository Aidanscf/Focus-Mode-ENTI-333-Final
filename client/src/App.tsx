import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header";
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
  return (
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
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Router />
          </main>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
