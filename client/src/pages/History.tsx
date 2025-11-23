import HistoryCard from "@/components/HistoryCard";

export default function History() {
  //todo: remove mock functionality - replace with actual history from backend
  const routines = [
    {
      id: "1",
      date: "Nov 20, 2025",
      opponent: "Carlos Vega",
      preview: "Take deep breaths. Focus on your forehand. Remember to stay patient and play to your strengths. Control the pace with variety and exploit their weak backhand."
    },
    {
      id: "2",
      date: "Nov 18, 2025",
      opponent: "Sarah Chen",
      preview: "You are calm and focused. Use your strong serve to dominate. Stay aggressive on returns and don't let her settle into a rhythm."
    },
    {
      id: "3",
      date: "Nov 15, 2025",
      opponent: "Michael Torres",
      preview: "Trust your training. Your footwork is excellent. Keep the ball deep and move him around the court. Stay patient and wait for your opportunities."
    },
    {
      id: "4",
      date: "Nov 12, 2025",
      opponent: "Emma Wilson",
      preview: "This is your moment. Focus on placement over power. Mix up your shots to keep her guessing. Remember: calm mind, powerful game."
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="font-display font-bold text-4xl mb-2">Routine History</h1>
      <p className="text-muted-foreground mb-8">
        Review your past pre-match routines and track your preparation
      </p>

      {routines.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">No routines yet. Start your first pre-match routine!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {routines.map((routine) => (
            <HistoryCard key={routine.id} {...routine} />
          ))}
        </div>
      )}
    </div>
  );
}
