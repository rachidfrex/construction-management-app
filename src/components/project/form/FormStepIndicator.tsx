// src/components/project/form/FormStepIndicator.tsx
import { motion } from 'framer-motion';

interface StepIndicatorProps {
  currentStep: number;
  steps: { id: number; title: string }[];
}

const FormStepIndicator = ({ currentStep, steps }: StepIndicatorProps) => {
  return (
    <div className="flex justify-between mb-8">
      {steps.map((step) => (
        <div 
          key={step.id} 
          className={`flex items-center ${currentStep === step.id ? 'text-green-600' : 'text-gray-400'}`}
        >
          <motion.div
            initial={false}
            animate={{
              backgroundColor: currentStep === step.id ? '#E5F7ED' : 'transparent',
              borderColor: currentStep === step.id ? '#059669' : '#D1D5DB',
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center border-2`}
          >
            {step.id}
          </motion.div>
          <span className="ml-2 font-medium text-sm hidden md:block">{step.title}</span>
        </div>
      ))}
    </div>
  );
};

export default FormStepIndicator;