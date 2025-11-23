import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon, ArrowRight } from "lucide-react";
import { Link } from "wouter";

interface KnowledgeArticleCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
}

export default function KnowledgeArticleCard({ 
  id, 
  title, 
  description, 
  icon: Icon, 
  gradient 
}: KnowledgeArticleCardProps) {
  return (
    <Card className="overflow-hidden hover-elevate transition-all">
      <div className={`h-32 ${gradient} flex items-center justify-center`}>
        <Icon className="h-12 w-12 text-white" />
      </div>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
        <Link href={`/article/${id}`}>
          <Button variant="ghost" size="sm" className="gap-2 px-0" data-testid={`button-read-${id}`}>
            Read More
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
