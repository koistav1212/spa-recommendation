"use client";

import { useEffect, useState } from "react";
import { WelcomeScreen } from "@/components/screens/WelcomeScreen";
import { SkinAnalyzerScreen } from "@/components/screens/SkinAnalyzerScreen";
import { ProfileBuilder } from "@/components/screens/ProfileBuilder";
import { LeadCaptureScreen } from "@/components/screens/LeadCaptureScreen";
import { ResultScreen } from "@/components/screens/ResultScreen";
import { BookingModal } from "@/components/ui/BookingModal";
import { Chatbot } from "@/components/ui/Chatbot";
import { generateRecommendations, RecommendationResult, FaceAnalysisData } from "@/lib/engine";

type Step = "welcome" | "analyze" | "quiz" | "lead" | "result";

export default function Home() {
  const [currentStep, setCurrentStep] = useState<Step>("welcome");
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [faceData, setFaceData] = useState<FaceAnalysisData | null>(null);
  const [result, setResult] = useState<RecommendationResult | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [hasChatbotOpened, setHasChatbotOpened] = useState(false);

  useEffect(() => {
    const handleOpenBooking = () => setIsBookingOpen(true);
    window.addEventListener("open-booking-modal", handleOpenBooking);
    return () => window.removeEventListener("open-booking-modal", handleOpenBooking);
  }, []);

  const handleStart = () => setCurrentStep("analyze");

  const handleAnalysisComplete = (data: FaceAnalysisData | null) => {
    setFaceData(data);
    setCurrentStep("quiz");
  };

  const handleQuizComplete = (quizAnswers: Record<string, string | string[]>) => {
    setAnswers(quizAnswers);
    setCurrentStep("lead");
  };

  const handleLeadCaptureComplete = () => {
    const finalResult = generateRecommendations(answers, faceData);
    setResult(finalResult);
    setCurrentStep("result");
  };

  const handleReset = () => {
    setResult(null);
    setFaceData(null);
    setAnswers({});
    setCurrentStep("welcome");
    setIsChatbotOpen(false);
    setHasChatbotOpened(false);
  };

  return (
    <main className="min-h-screen bg-[var(--color-spa-beige)] font-sans antialiased text-[var(--color-spa-dark)] transition-colors duration-500 relative">
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      <Chatbot 
        result={result} 
        answers={answers} 
        isOpen={isChatbotOpen}
        setIsOpen={setIsChatbotOpen}
        hasOpened={hasChatbotOpened}
        setHasOpened={setHasChatbotOpened}
      />

      {currentStep === "welcome" && <WelcomeScreen onStart={handleStart} />}
      
      {currentStep === "analyze" && (
        <SkinAnalyzerScreen 
          onComplete={handleAnalysisComplete} 
          onSkip={() => handleAnalysisComplete(null)} 
        />
      )}
      
      {currentStep === "quiz" && (
        <ProfileBuilder onComplete={handleQuizComplete} />
      )}
      
      {currentStep === "lead" && (
        <LeadCaptureScreen answers={answers} onUnlock={handleLeadCaptureComplete} />
      )}
      
      {currentStep === "result" && result && (
        <ResultScreen 
          result={result} 
          answers={answers} 
          onReset={handleReset} 
          hasChatbotOpened={hasChatbotOpened}
          onOpenChatbot={() => {
            setIsChatbotOpen(true);
            setHasChatbotOpened(true);
          }}
        />
      )}
    </main>
  );
}
