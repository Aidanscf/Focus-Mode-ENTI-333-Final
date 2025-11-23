import KnowledgeArticleCard from "@/components/KnowledgeArticleCard";
import { Eye, Brain, Heart, Target, Zap, Wind } from "lucide-react";

export default function Knowledge() {
  //todo: remove mock functionality - replace with actual articles from backend or CMS
  const articles = [
    {
      id: "visualization",
      title: "What is Visualization?",
      description: "Learn how to use mental imagery to improve your performance and prepare for competition. Visualization is a powerful tool used by elite athletes worldwide.",
      icon: Eye,
      gradient: "bg-gradient-to-br from-blue-500 to-purple-600"
    },
    {
      id: "pre-performance",
      title: "Developing a Pre-Performance Routine",
      description: "Discover the science behind consistent pre-match routines and how they help athletes achieve peak performance under pressure.",
      icon: Target,
      gradient: "bg-gradient-to-br from-purple-500 to-pink-600"
    },
    {
      id: "anxiety",
      title: "Handling Pre-Match Anxiety",
      description: "Practical strategies to transform nervousness into focused energy. Learn breathing techniques and mental frameworks that work.",
      icon: Heart,
      gradient: "bg-gradient-to-br from-pink-500 to-red-600"
    },
    {
      id: "focus",
      title: "Building Mental Focus",
      description: "Train your mind to stay present and focused during high-pressure moments. Techniques from sports psychology research.",
      icon: Brain,
      gradient: "bg-gradient-to-br from-indigo-500 to-blue-600"
    },
    {
      id: "activation",
      title: "Optimal Activation Levels",
      description: "Find your personal sweet spot between too relaxed and too anxious. Learn to regulate your mental and physical energy.",
      icon: Zap,
      gradient: "bg-gradient-to-br from-yellow-500 to-orange-600"
    },
    {
      id: "breathing",
      title: "Breathing for Performance",
      description: "Master breathing techniques that calm your nervous system and enhance focus. Simple methods with powerful effects.",
      icon: Wind,
      gradient: "bg-gradient-to-br from-teal-500 to-green-600"
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="font-display font-bold text-4xl mb-2">Knowledge Base</h1>
      <p className="text-muted-foreground mb-8">
        Learn about sports psychology and mental preparation techniques
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <KnowledgeArticleCard key={article.id} {...article} />
        ))}
      </div>
    </div>
  );
}
