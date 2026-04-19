import { Question } from "@/lib/data/questions";
import { OptionCard } from "./OptionCard";
import { motion } from "framer-motion";

interface QuestionCardProps {
  question: Question;
  selectedValue?: string | string[];
  onSelect: (value: string) => void;
}

export function QuestionCard({ question, selectedValue, onSelect }: QuestionCardProps) {
  const isSelected = (id: string) => {
    if (Array.isArray(selectedValue)) {
      return selectedValue.includes(id);
    }
    return selectedValue === id;
  };

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-xl mx-auto flex flex-col items-center"
    >
      <div className="mb-8 w-full text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-spa-dark)] mb-2">
          {question.title}
        </h2>
        {question.allowMultiple && (
          <p className="text-sm text-gray-500 font-medium">Select all that apply</p>
        )}
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
        {question.options.map((option) => (
          <OptionCard
            key={option.id}
            id={option.id}
            label={option.label}
            iconName={option.iconName}
            imageUrl={option.imageUrl}
            selected={isSelected(option.id)}
            allowMultiple={question.allowMultiple}
            onSelect={onSelect}
          />
        ))}
      </div>
    </motion.div>
  );
}
