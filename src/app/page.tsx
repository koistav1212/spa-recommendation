"use client";

import { useState } from "react";
import { WelcomeScreen } from "@/components/screens/WelcomeScreen";
import { ProfileBuilder } from "@/components/screens/ProfileBuilder";
import { LeadCaptureScreen } from "@/components/screens/LeadCaptureScreen";
import { ResultScreen } from "@/components/screens/ResultScreen";
import { generateRecommendations, RecommendationResult } from "@/lib/engine";

type Step = "welcome" | "quiz" | "lead" | "result";

export default function Home() {
  const [currentStep, setCurrentStep] = useState<Step>("welcome");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<RecommendationResult | null>(null);

  const handleStart = () => setCurrentStep("quiz");

  const handleQuizComplete = (quizAnswers: Record<string, string>) => {
    setAnswers(quizAnswers);
    setCurrentStep("lead");
  };

  const handleLeadCaptureComplete = () => {
    const finalResult = generateRecommendations(answers);
    setResult(finalResult);
    setCurrentStep("result");
  };

  return (
    <main className="min-h-screen bg-[var(--color-spa-beige)] font-sans antialiased text-[var(--color-spa-dark)] transition-colors duration-500">
      {currentStep === "welcome" && <WelcomeScreen onStart={handleStart} />}
      
      {currentStep === "quiz" && (
        <ProfileBuilder onComplete={handleQuizComplete} />
      )}
      
      {currentStep === "lead" && (
        <LeadCaptureScreen answers={answers} onUnlock={handleLeadCaptureComplete} />
      )}
      
      {currentStep === "result" && result && (
        <ResultScreen result={result} answers={answers} />
      )}
    </main>
  );
}
