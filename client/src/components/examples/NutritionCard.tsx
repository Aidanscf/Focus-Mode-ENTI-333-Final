import NutritionCard from '../NutritionCard'
import { Droplet } from 'lucide-react'

export default function NutritionCardExample() {
  return (
    <NutritionCard 
      title="Hydration"
      value="375"
      unit="ml"
      icon={Droplet}
      description="Drink 2 hours before match"
    />
  )
}
