import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Bell, User, Play, Clock, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function Home() {
  //todo: remove mock functionality - replace with actual user data
  const athleteName = "Jordan Mitchell";
  
  //todo: remove mock functionality - replace with actual routines
  const activeRoutines = [
    { 
      id: "1", 
      title: "Championship Final Prep", 
      opponent: "vs Carlos Vega",
      progress: 75,
      color: "from-blue-500 to-blue-600",
      status: "In Progress"
    },
    { 
      id: "2", 
      title: "Semi-Final Mental Reset", 
      opponent: "vs Sarah Chen",
      progress: 100,
      color: "from-orange-500 to-red-500",
      status: "Completed"
    },
    { 
      id: "3", 
      title: "Quarter-Final Focus", 
      opponent: "vs Mike Torres",
      progress: 45,
      color: "from-purple-500 to-purple-600",
      status: "In Progress"
    },
  ];

  const upcomingMatches = [
    { title: "Pre-Match Breathing Exercise", coach: "Alex Chen", duration: "5 min" },
    { title: "Strategy Visualization", coach: "Mia Roberts", duration: "8 min" },
    { title: "Performance Meditation", coach: "Priya Kapoor", duration: "10 min" },
    { title: "Mental Rehearsal Session", coach: "Samuel Wright", duration: "12 min" },
  ];

  const categories = ["All Routines", "Mental", "Physical", "Strategy", "Recovery"];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search routines..." 
                className="pl-10 bg-background"
                data-testid="input-search"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button size="icon" variant="ghost" className="rounded-full" data-testid="button-notifications">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-primary text-primary-foreground">JM</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-semibold">{athleteName}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* Category Filters */}
        <div className="flex items-center gap-3 mb-6">
          {categories.map((cat, i) => (
            <Button
              key={cat}
              variant={i === 0 ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              data-testid={`button-category-${cat.toLowerCase().replace(' ', '-')}`}
            >
              {cat}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* My Routines */}
            <div>
              <h2 className="font-display font-bold text-2xl mb-4">My Routines</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {activeRoutines.map((routine) => (
                  <Link key={routine.id} href={`/routine/${routine.id}`}>
                    <Card 
                      className={`p-5 bg-gradient-to-br ${routine.color} text-white hover-elevate cursor-pointer overflow-hidden relative`}
                      data-testid={`card-routine-${routine.id}`}
                    >
                      <div className="relative z-10">
                        <Badge variant="secondary" className="mb-3 bg-white/20 text-white border-0">
                          {routine.status}
                        </Badge>
                        <h3 className="font-semibold text-lg mb-1">{routine.title}</h3>
                        <p className="text-sm text-white/90 mb-4">{routine.opponent}</p>
                        <div className="space-y-2">
                          <Progress value={routine.progress} className="h-2 bg-white/20" />
                          <div className="flex items-center justify-between text-xs">
                            <span>{routine.progress}% Complete</span>
                            <Button size="sm" variant="secondary" className="h-7 rounded-full bg-lime-400 text-black hover:bg-lime-500">
                              {routine.progress === 100 ? "Review" : "Continue"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            {/* Upcoming Sessions */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-2xl">My Next Sessions</h2>
                <Button variant="ghost" className="text-primary" data-testid="button-view-all">
                  View all sessions
                </Button>
              </div>
              <Card className="divide-y">
                {upcomingMatches.map((match, i) => (
                  <div 
                    key={i} 
                    className="flex items-center justify-between p-4 hover-elevate cursor-pointer"
                    data-testid={`session-${i}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-red-500' : 'bg-muted'}`} />
                      <div>
                        <h4 className="font-medium">{match.title}</h4>
                        <p className="text-sm text-muted-foreground">{match.coach}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{match.duration}</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </Card>
            </div>
          </div>

          {/* Right Sidebar - Recommended */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Recommended for You</h3>
            <Card className="p-6 bg-gradient-to-br from-lime-400 to-lime-500 text-black">
              <Badge className="mb-4 bg-black text-white">New</Badge>
              <h3 className="font-display font-bold text-2xl mb-2">
                Advanced Visualization for Competition
              </h3>
              <p className="text-sm mb-4 text-black/80">
                Master elite-level mental imagery techniques
              </p>
              <div className="flex items-center gap-2 mb-6">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-black/10">AC</AvatarFallback>
                </Avatar>
                <Avatar className="h-8 w-8 -ml-3">
                  <AvatarFallback className="bg-black/10">MR</AvatarFallback>
                </Avatar>
                <Avatar className="h-8 w-8 -ml-3">
                  <AvatarFallback className="bg-black/10">PK</AvatarFallback>
                </Avatar>
              </div>
              <Link href="/knowledge">
                <Button 
                  className="w-full bg-red-500 hover:bg-red-600 text-white"
                  data-testid="button-view-details"
                >
                  View details
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
