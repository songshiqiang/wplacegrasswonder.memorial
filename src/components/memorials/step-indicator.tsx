/**
 * Step Indicator Component
 * 显示创建纪念页的步骤进度
 */

import { Check } from 'lucide-react'

interface Step {
  number: number
  name: string
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          {/* Step Circle */}
          <div className="flex flex-col items-center">
            <div
              className={`
                flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all
                ${
                  step.number < currentStep
                    ? 'border-primary-600 bg-primary-600 text-white'
                    : step.number === currentStep
                    ? 'border-primary-600 bg-white text-primary-600'
                    : 'border-neutral-300 bg-white text-neutral-400'
                }
              `}
            >
              {step.number < currentStep ? (
                <Check className="h-5 w-5" />
              ) : (
                <span className="text-sm font-semibold">{step.number}</span>
              )}
            </div>
            <span
              className={`
                mt-2 text-xs font-medium
                ${
                  step.number <= currentStep
                    ? 'text-neutral-800'
                    : 'text-neutral-400'
                }
              `}
            >
              {step.name}
            </span>
          </div>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div
              className={`
                mx-4 h-0.5 w-16 transition-all sm:w-24
                ${
                  step.number < currentStep
                    ? 'bg-primary-600'
                    : 'bg-neutral-300'
                }
              `}
            />
          )}
        </div>
      ))}
    </div>
  )
}
