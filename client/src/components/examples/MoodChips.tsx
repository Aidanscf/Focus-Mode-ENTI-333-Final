import { useState } from 'react'
import MoodChips from '../MoodChips'

export default function MoodChipsExample() {
  const [selected, setSelected] = useState("Focused")
  
  return (
    <MoodChips 
      moods={["Anxious", "Focused", "Flat", "Energized", "Nervous", "Confident"]} 
      selected={selected}
      onSelect={setSelected}
    />
  )
}
