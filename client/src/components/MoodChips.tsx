import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface MoodChipsProps {
  moods: string[];
  selected?: string;
  onSelect?: (mood: string) => void;
}

export default function MoodChips({ moods, selected, onSelect }: MoodChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {moods.map((mood) => (
        <Badge
          key={mood}
          variant={selected === mood ? "default" : "outline"}
          className={cn(
            "cursor-pointer px-4 py-2 text-sm transition-all",
            selected === mood && "ring-2 ring-primary ring-offset-2"
          )}
          onClick={() => onSelect?.(mood)}
          data-testid={`mood-chip-${mood.toLowerCase()}`}
        >
          {mood}
        </Badge>
      ))}
    </div>
  );
}
