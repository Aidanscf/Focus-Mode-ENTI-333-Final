import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User as UserIcon } from "lucide-react";
import { Link } from "wouter";

interface HistoryCardProps {
  id: string;
  date: string;
  opponent: string;
  preview: string;
}

export default function HistoryCard({ id, date, opponent, preview }: HistoryCardProps) {
  return (
    <Card className="hover-elevate transition-all">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Calendar className="h-4 w-4 text-primary" />
          {date}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <UserIcon className="h-4 w-4" />
          <span>vs {opponent}</span>
        </div>
        <p className="text-sm line-clamp-3">{preview}</p>
        <Link href={`/routine/${id}`}>
          <Button variant="outline" size="sm" className="w-full" data-testid={`button-view-${id}`}>
            View Routine
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
