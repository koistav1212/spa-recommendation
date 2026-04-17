import { useState, useMemo } from "react";
import { questions } from "@/lib/data/questions";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { QuestionCard } from "@/components/ui/QuestionCard";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ProfileBuilderProps {
  onComplete: (answers: Record<string, string>) => void;
}

export function ProfileBuilder({ onComplete }: ProfileBuilderProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Filter out dependencies dynamically based on answers
  const activeQuestions = useMemo(() => {
    return questions.filter(q => {
      if (!q.dependency) return true;
      return answers[q.dependency.questionId] === q.dependency.value;
    });
  }, [answers]);

  const currentQuestion = activeQuestions[currentStepIndex];

  const handleSelect = (optionId: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: optionId }));
    
    // Automatically advance after a short delay
    setTimeout(() => {
      handleNext();
    }, 400);
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

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] px-4 py-8 w-full max-w-4xl mx-auto">
      <ProgressBar currentStep={currentStepIndex + 1} totalSteps={activeQuestions.length} />
      
      <div className="w-full flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            selectedValue={answers[currentQuestion.id]}
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
          disabled={!answers[currentQuestion.id]}
          className="flex items-center bg-[var(--color-spa-dark)] text-white px-6 py-3 rounded-full font-medium hover:bg-black disabled:opacity-50 transition-colors"
        >
          {currentStepIndex === activeQuestions.length - 1 ? "Finish" : "Next"}
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
}
