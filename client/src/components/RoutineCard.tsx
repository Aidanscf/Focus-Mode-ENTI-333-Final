import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface RoutineCardProps {
  title: string;
  content: string | string[];
  icon: LucideIcon;
  variant?: "default" | "highlight";
}

export default function RoutineCard({ title, content, icon: Icon, variant = "default" }: RoutineCardProps) {
  const renderContent = () => {
    if (Array.isArray(content)) {
      return (
        <ul className="space-y-2">
          {content.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span className="flex-1">{item}</span>
            </li>
          ))}
        </ul>
      );
    }
    
    const lines = content.split('\n').filter(line => line.trim());
    
    if (variant === "highlight" || lines.length > 3) {
      return (
        <ul className="space-y-3">
          {lines.map((line, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="text-primary mt-0.5">•</span>
              <span className="flex-1 leading-relaxed">{line}</span>
            </li>
          ))}
        </ul>
      );
    }
    
    return (
      <div className="space-y-4">
        {lines.map((line, index) => (
          <p key={index} className="text-muted-foreground leading-relaxed">{line}</p>
        ))}
      </div>
    );
  };

  return (
    <Card className={
      variant === "highlight" 
        ? "border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent shadow-lg shadow-primary/10" 
        : "bg-card/90 backdrop-blur-sm shadow-lg shadow-primary/5 border-border/50"
    }>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="p-2.5 rounded-xl bg-primary/15">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {renderContent()}
      </CardContent>
    </Card>
  );
}
