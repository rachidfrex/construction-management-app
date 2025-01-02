import { motion } from 'framer-motion';
// import { useTranslation } from 'react-i18next';
import { useTranslationContext } from '../../../context/TranslationContext';

interface StepIndicatorProps {
  currentStep: number;
  steps: { id: number; title: string }[];
  onStepClick?: (step: number) => void;
}

const FormStepIndicator = ({ currentStep, steps }: StepIndicatorProps) => {
  const { direction } = useTranslationContext();
  // const { t } = useTranslation();

  return (
    <div className={`flex justify-between mb-8 `}>
      {steps.map((step) => (
        <div 
          key={step.id} 
          className={`flex items-center  ${
            currentStep === step.id ? 'text-green-600' : 'text-gray-400'
          }`}
        >
          <motion.div
            initial={false}
            animate={{
              backgroundColor: currentStep === step.id ? '#E5F7ED' : 'transparent',
              borderColor: currentStep === step.id ? '#059669' : '#D1D5DB',
            }}
            className="w-8 h-8 rounded-full flex items-center justify-center border-2"
          >
            {step.id}
          </motion.div>
          <span className={`${
            direction === 'rtl' ? 'mr-2' : 'ml-2'
          } font-medium text-sm hidden md:block`}>
            {step.title}
          </span>
        </div>
      ))}
    </div>
  );
};

export default FormStepIndicator;