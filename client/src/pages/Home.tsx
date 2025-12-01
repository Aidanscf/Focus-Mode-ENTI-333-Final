import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Bell, Target, Loader2, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import type { AthleteProfile, Routine } from "@shared/types";

export default function Home() {
  const { data: profile } = useQuery<AthleteProfile>({
    queryKey: ["/api/athlete-profile"],
  });

  const { data: routines, isLoading: routinesLoading } = useQuery<Routine[]>({
    queryKey: ["/api/routines"],
  });

  const athleteName = profile?.name || "Athlete";
  const initials = athleteName
    .trim()
    .split(/\s+/)
    .filter(n => n.length > 0)
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || "AT";

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-glass border-b border-border/50 px-8 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search routines..." 
                className="pl-10 bg-card/80 border-border/50"
                data-testid="input-search"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button size="icon" variant="ghost" className="rounded-full" data-testid="button-notifications">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 ring-2 ring-primary/20">
                <AvatarFallback className="bg-primary text-primary-foreground" data-testid="avatar-initials">{initials}</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-semibold" data-testid="text-username">{athleteName}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 text-center py-6">
            <h2 className="font-display font-semibold text-4xl mb-3 tracking-tight">Welcome back, {athleteName}</h2>
            <p className="text-muted-foreground text-lg">Track your mental preparation and build winning routines</p>
          </div>

          {/* My Routines */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-bold text-2xl">My Routines</h3>
              <Link href="/history">
                <Button variant="ghost" className="text-primary" data-testid="button-view-all-routines">
                  View all
                </Button>
              </Link>
            </div>

            {routinesLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : routines && routines.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {routines.slice(0, 3).map((routine) => (
                  <Link key={routine.id} href={`/routine/${routine.id}`}>
                    <Card className="p-6 hover-elevate cursor-pointer bg-card/90 backdrop-blur-sm shadow-lg shadow-primary/5 border-border/50" data-testid={`card-routine-${routine.id}`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                          <Target className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">{format(new Date(routine.createdAt), 'MMM dd, yyyy')}</p>
                        </div>
                      </div>
                      <h4 className="font-semibold text-lg mb-2">vs {routine.opponentName}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">{routine.routineText.substring(0, 100)}...</p>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center bg-card/90 backdrop-blur-sm shadow-lg shadow-primary/5 border-border/50" data-testid="empty-state-routines">
                <div className="max-w-md mx-auto space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center mx-auto">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-xl">No routines yet</h3>
                  <p className="text-muted-foreground">Create your first pre-match mental preparation routine to get started</p>
                  <Link href="/match-input">
                    <Button size="lg" className="mt-4 shadow-lg shadow-primary/20" data-testid="button-create-first-routine">
                      Create Your First Routine
                    </Button>
                  </Link>
                </div>
              </Card>
            )}
          </div>

          {/* Quick Action */}
          <div className="mb-8">
            <Card className="overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 border-primary/20 shadow-xl shadow-primary/10">
              <div className="p-10 text-center space-y-5">
                <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-2">
                  <Sparkles className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-2xl">Ready for your next match?</h3>
                <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
                  Generate a personalized mental preparation routine tailored to your opponent and current state
                </p>
                <Link href="/match-input">
                  <Button size="lg" className="shadow-lg shadow-primary/20 px-8" data-testid="button-start-routine">
                    Start New Routine
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
