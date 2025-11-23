import ProgressSteps from '../ProgressSteps'

export default function ProgressStepsExample() {
  return (
    <ProgressSteps 
      steps={["Bio Info", "Sport Profile", "Habits", "Mental State"]} 
      currentStep={1} 
    />
  )
}
