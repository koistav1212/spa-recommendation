import { Question } from "@/lib/data/questions";
import { OptionCard } from "./OptionCard";
import { motion } from "framer-motion";

interface QuestionCardProps {
  question: Question;
  selectedValue?: string;
  onSelect: (value: string) => void;
}

export function QuestionCard({ question, selectedValue, onSelect }: QuestionCardProps) {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-xl mx-auto flex flex-col items-center"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[var(--color-spa-dark)]">
        {question.title}
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
        {question.options.map((option) => (
          <OptionCard
            key={option.id}
            id={option.id}
            label={option.label}
            iconName={option.iconName}
            imageUrl={option.imageUrl}
            selected={selectedValue === option.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </motion.div>
  );
}
