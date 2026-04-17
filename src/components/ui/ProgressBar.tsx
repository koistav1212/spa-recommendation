import { motion, AnimatePresence } from "framer-motion";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const percentage = Math.min((currentStep / totalSteps) * 100, 100);

  return (
    <div className="w-full max-w-md mx-auto mb-8 px-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          Your Beauty Profile
        </span>
        <span className="text-sm font-medium text-gray-400">
          Step {currentStep} of {totalSteps}
        </span>
      </div>
      <div className="h-2 w-full bg-[var(--color-spa-border)] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[var(--color-spa-gold)]"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
