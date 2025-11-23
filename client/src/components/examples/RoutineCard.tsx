import RoutineCard from '../RoutineCard'
import { Wind } from 'lucide-react'

export default function RoutineCardExample() {
  return (
    <RoutineCard 
      title="Breathing Exercise"
      content="Close your eyes. Inhale deeply for 4 counts, hold for 4 counts, exhale for 6 counts. Repeat 5 times. Feel your body settle into calm readiness."
      icon={Wind}
    />
  )
}
