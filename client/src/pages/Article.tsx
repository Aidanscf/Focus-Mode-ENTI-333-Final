import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { knowledgeArticles } from "./Knowledge";

export default function Article() {
  const [, params] = useRoute("/article/:id");
  const articleId = params?.id;
  
  const article = knowledgeArticles.find(a => a.id === articleId);

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Link href="/knowledge">
          <Button variant="ghost" className="gap-2 mb-6" data-testid="button-back-knowledge">
            <ArrowLeft className="h-4 w-4" />
            Back to Knowledge Base
          </Button>
        </Link>
        <div className="text-center py-12">
          <h1 className="font-display font-semibold text-2xl mb-4">Article Not Found</h1>
          <p className="text-muted-foreground">The article you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const Icon = article.icon;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Link href="/knowledge">
        <Button variant="ghost" className="gap-2 mb-6" data-testid="button-back-knowledge">
          <ArrowLeft className="h-4 w-4" />
          Back to Knowledge Base
        </Button>
      </Link>

      <article>
        <div className={`h-40 ${article.gradient} rounded-xl flex items-center justify-center mb-8 shadow-lg`}>
          <Icon className="h-16 w-16 text-white" />
        </div>
        
        <h1 className="font-display font-semibold text-4xl mb-4 tracking-tight" data-testid="article-title">
          {article.title}
        </h1>
        
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed" data-testid="article-description">
          {article.description}
        </p>
        
        <div 
          className="prose prose-lg max-w-none text-foreground"
          dangerouslySetInnerHTML={{ __html: article.content }}
          data-testid="article-content"
        />
      </article>
    </div>
  );
}
