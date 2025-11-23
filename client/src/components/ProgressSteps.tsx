import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressStepsProps {
  steps: string[];
  currentStep: number;
}

export default function ProgressSteps({ steps, currentStep }: ProgressStepsProps) {
  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="flex items-center w-full">
              {index > 0 && (
                <div className={cn(
                  "flex-1 h-0.5",
                  index <= currentStep ? "bg-primary" : "bg-muted"
                )} />
              )}
              <div className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all",
                index < currentStep && "bg-primary border-primary text-primary-foreground",
                index === currentStep && "border-primary text-primary bg-background",
                index > currentStep && "border-muted text-muted-foreground"
              )} data-testid={`step-indicator-${index}`}>
                {index < currentStep ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="font-semibold">{index + 1}</span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={cn(
                  "flex-1 h-0.5",
                  index < currentStep ? "bg-primary" : "bg-muted"
                )} />
              )}
            </div>
            <span className={cn(
              "text-xs mt-2 text-center hidden sm:block",
              index <= currentStep ? "text-foreground font-medium" : "text-muted-foreground"
            )}>
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
