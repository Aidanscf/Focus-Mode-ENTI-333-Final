import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import HistoryCard from "@/components/HistoryCard";
import type { Routine } from "@shared/types";

export default function History() {
  const { data: routines, isLoading } = useQuery<Routine[]>({
    queryKey: ["/api/routines"],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  const formattedRoutines = routines?.map((routine) => ({
    id: routine.id,
    date: format(new Date(routine.createdAt), "MMM dd, yyyy"),
    opponent: routine.opponentName,
    preview: routine.routineText.substring(0, 200),
    audioUrl: routine.routineAudioUrl,
  })) || [];

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="font-display font-semibold text-4xl mb-3 tracking-tight">Routine History</h1>
        <p className="text-muted-foreground text-lg">
          Review your past pre-match routines and track your preparation
        </p>
      </div>

      {formattedRoutines.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">No routines yet. Start your first pre-match routine!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formattedRoutines.map((routine) => (
            <HistoryCard key={routine.id} {...routine} />
          ))}
        </div>
      )}
    </div>
  );
}
