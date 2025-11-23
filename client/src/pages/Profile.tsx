import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Activity, Droplet, Brain } from "lucide-react";
import { Link } from "wouter";

export default function Profile() {
  //todo: remove mock functionality - replace with actual profile data from backend
  const profile = {
    name: "Alex Thompson",
    height: 180,
    weight: 75,
    age: 22,
    sport: "Squash",
    position: "N/A",
    preferredMatchTime: "Evening",
    hydrationHabits: "2L/day",
    dietType: "Omnivore",
    mentalTendencies: "I tend to get anxious before matches and overthink my strategy",
    performsBestWhen: "I perform best when I feel calm, focused, and confident in my preparation"
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-4xl mb-2">Athlete Profile</h1>
          <p className="text-muted-foreground">
            Your personalized information for routine generation
          </p>
        </div>
        <Link href="/setup">
          <Button variant="outline" data-testid="button-edit-profile">
            Edit Profile
          </Button>
        </Link>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <User className="h-5 w-5 text-primary" />
              </div>
              Bio Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Height</p>
              <p className="font-semibold">{profile.height} cm</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Weight</p>
              <p className="font-semibold">{profile.weight} kg</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Age</p>
              <p className="font-semibold">{profile.age} years</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Activity className="h-5 w-5 text-primary" />
              </div>
              Sport Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Sport</p>
              <p className="font-semibold">{profile.sport}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Position/Role</p>
              <p className="font-semibold">{profile.position}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-muted-foreground">Preferred Match Time</p>
              <p className="font-semibold capitalize">{profile.preferredMatchTime}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Droplet className="h-5 w-5 text-primary" />
              </div>
              Nutrition & Hydration
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Daily Hydration</p>
              <p className="font-semibold">{profile.hydrationHabits}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Diet Type</p>
              <p className="font-semibold">{profile.dietType}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Brain className="h-5 w-5 text-primary" />
              </div>
              Mental Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Before matches, I usually feel...</p>
              <p className="leading-relaxed">{profile.mentalTendencies}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">I perform best when I feel...</p>
              <p className="leading-relaxed">{profile.performsBestWhen}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
