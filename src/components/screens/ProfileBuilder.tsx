import { useState } from "react";
import { questions } from "@/lib/data/questions";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { QuestionCard } from "@/components/ui/QuestionCard";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ProfileBuilderProps {
  onComplete: (answers: Record<string, string | string[]>) => void;
}

export function ProfileBuilder({ onComplete }: ProfileBuilderProps) {
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // All questions are active in the new 13-step flow
  const activeQuestions = questions;

  const currentQuestion = activeQuestions[currentStepIndex];

  const handleSelect = (optionId: string) => {
    if (currentQuestion.allowMultiple) {
      setAnswers(prev => {
        const currentAnswer = Array.isArray(prev[currentQuestion.id]) 
          ? (prev[currentQuestion.id] as string[]) 
          : [];
        
        const newAnswer = currentAnswer.includes(optionId)
          ? currentAnswer.filter(id => id !== optionId)
          : [...currentAnswer, optionId];
          
        return { ...prev, [currentQuestion.id]: newAnswer };
      });
    } else {
      setAnswers(prev => ({ ...prev, [currentQuestion.id]: optionId }));
      
      // Automatically advance after a short delay for single choice
      setTimeout(() => {
        handleNext();
      }, 400);
    }
  };

  const handleNext = () => {
    if (currentStepIndex < activeQuestions.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      onComplete(answers);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  if (!currentQuestion) return null;

  const currentAnswer = answers[currentQuestion.id];
  const isNextDisabled = currentQuestion.allowMultiple 
    ? !Array.isArray(currentAnswer) || currentAnswer.length === 0
    : !currentAnswer;

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] px-4 py-8 w-full max-w-4xl mx-auto">
      <ProgressBar currentStep={currentStepIndex + 1} totalSteps={activeQuestions.length} />
      
      <div className="w-full flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            selectedValue={currentAnswer}
            onSelect={handleSelect}
          />
        </AnimatePresence>
      </div>

      <div className="w-full max-w-xl mx-auto mt-12 flex justify-between items-center">
        <button
          onClick={handlePrev}
          disabled={currentStepIndex === 0}
          className="flex items-center text-gray-500 hover:text-[var(--color-spa-dark)] disabled:opacity-30 disabled:hover:text-gray-500 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </button>
        
        <button
          onClick={handleNext}
          disabled={isNextDisabled}
          className="flex items-center bg-[var(--color-spa-dark)] text-white px-6 py-3 rounded-full font-medium hover:bg-black disabled:opacity-50 transition-colors"
        >
          {currentStepIndex === activeQuestions.length - 1 ? "Finish" : "Next"}
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
}
