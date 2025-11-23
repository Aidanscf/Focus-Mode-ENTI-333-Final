import KnowledgeArticleCard from '../KnowledgeArticleCard'
import { Eye } from 'lucide-react'

export default function KnowledgeArticleCardExample() {
  return (
    <KnowledgeArticleCard 
      id="visualization"
      title="What is Visualization?"
      description="Learn how to use mental imagery to improve your performance and prepare for competition. Visualization is a powerful tool used by elite athletes worldwide."
      icon={Eye}
      gradient="bg-gradient-to-br from-blue-500 to-purple-600"
    />
  )
}
