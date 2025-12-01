import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface NutritionCardProps {
  title: string;
  value: string;
  unit: string;
  icon: LucideIcon;
  description: string;
}

export default function NutritionCard({ title, value, unit, icon: Icon, description }: NutritionCardProps) {
  return (
    <Card className="bg-card/90 backdrop-blur-sm shadow-lg shadow-primary/5 border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/15">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-semibold text-primary">{value}</span>
          <span className="text-lg text-muted-foreground">{unit}</span>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
