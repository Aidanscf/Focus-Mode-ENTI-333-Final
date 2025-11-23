import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function Article() {
  const [, params] = useRoute("/article/:id");

  //todo: remove mock functionality - replace with actual article content from backend/CMS
  const article = {
    title: "What is Visualization?",
    content: `
      <h2>Understanding Mental Imagery</h2>
      <p>Visualization, also known as mental imagery or mental rehearsal, is the practice of creating detailed mental images of successful performance. Elite athletes across all sports use this technique to prepare for competition and enhance their skills.</p>

      <h3>How Visualization Works</h3>
      <p>When you visualize, your brain activates many of the same neural pathways as when you physically perform the action. This mental practice helps strengthen the connections between your mind and body, making actual performance smoother and more automatic.</p>

      <h3>Key Principles</h3>
      <ul>
        <li><strong>Use all senses:</strong> Don't just see - feel, hear, and even smell your environment</li>
        <li><strong>Practice regularly:</strong> Daily visualization sessions of 10-15 minutes are ideal</li>
        <li><strong>Stay positive:</strong> Always visualize successful outcomes</li>
        <li><strong>Be specific:</strong> Include precise details about movements, opponents, and situations</li>
      </ul>

      <h3>Getting Started</h3>
      <p>Find a quiet space where you won't be disturbed. Close your eyes and take several deep breaths. Then, create a vivid mental movie of yourself performing at your best. Include details like:</p>
      <ul>
        <li>The feel of your equipment</li>
        <li>The sounds of the venue</li>
        <li>Your breathing rhythm</li>
        <li>The movements of your body</li>
        <li>Your emotional state - calm and confident</li>
      </ul>

      <h3>Integration with Pre-Match Routine</h3>
      <p>Visualization is most effective when combined with other preparation techniques like breathing exercises and strategic planning. Your FocusMode routine incorporates guided visualization to help you arrive at competition mentally ready.</p>
    `
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Link href="/knowledge">
        <Button variant="ghost" className="gap-2 mb-6" data-testid="button-back-knowledge">
          <ArrowLeft className="h-4 w-4" />
          Back to Knowledge Base
        </Button>
      </Link>

      <article className="prose prose-lg max-w-none">
        <h1 className="font-display font-bold text-4xl mb-6">{article.title}</h1>
        <div 
          className="space-y-4 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>
    </div>
  );
}
