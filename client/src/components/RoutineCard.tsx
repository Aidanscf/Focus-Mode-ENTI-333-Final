import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface RoutineCardProps {
  title: string;
  content: string | string[];
  icon: LucideIcon;
  variant?: "default" | "highlight";
}

export default function RoutineCard({ title, content, icon: Icon, variant = "default" }: RoutineCardProps) {
  return (
    <Card className={variant === "highlight" ? "border-primary bg-primary/5" : ""}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {Array.isArray(content) ? (
          <ul className="space-y-2">
            {content.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span className="flex-1">{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground leading-relaxed">{content}</p>
        )}
      </CardContent>
    </Card>
  );
}
