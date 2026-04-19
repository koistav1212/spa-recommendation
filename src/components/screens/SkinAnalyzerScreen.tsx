import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, ScanFace, UploadCloud, AlertCircle } from "lucide-react";
import { FaceAnalysisData } from "@/lib/engine";

interface SkinAnalyzerScreenProps {
  onComplete: (data: FaceAnalysisData | null) => void;
  onSkip: () => void;
}

export function SkinAnalyzerScreen({ onComplete, onSkip }: SkinAnalyzerScreenProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setError("Please select an image smaller than 2MB.");
      return;
    }

    const allowedTypes = ["image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      setError("Only JPG/JPEG images are allowed.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const response = await fetch("/api/skin-analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze image");
      }

      // Small delay for smooth UI transition
      setTimeout(() => {
        onComplete(data);
      }, 1000);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen pt-12 pb-24 px-4 items-center justify-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <ScanFace className="w-64 h-64" />
      </div>

      <motion.div 
        className="max-w-md w-full relative z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-spa-dark)] text-[var(--color-spa-gold)] mb-6 shadow-xl">
            <Camera className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold mb-3">Clinical Skin Analysis</h2>
          <p className="text-gray-600">
            For the most accurate recommendations, allow our clinical AI engine to analyze your facial profile.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
             <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl p-10 border border-[var(--color-spa-gold)]/30 text-center shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-[var(--color-spa-beige)]">
                <motion.div 
                  className="h-full bg-[var(--color-spa-gold)]" 
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3, ease: "easeInOut" }}
                />
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 mx-auto border-2 border-[var(--color-spa-gold)] border-t-transparent rounded-full mb-6 relative flex items-center justify-center"
              >
                <ScanFace className="w-8 h-8 text-[var(--color-spa-gold-dark)] animate-pulse" />
              </motion.div>
              <h3 className="text-xl font-bold text-[var(--color-spa-dark)] mb-2">Analyzing Face Matrix...</h3>
              <p className="text-sm text-gray-500">Scanning for pores, fine lines, and moisture levels.</p>
            </motion.div>
          ) : (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div 
                className="bg-white rounded-3xl p-8 border-2 border-dashed border-[var(--color-spa-gold)]/50 hover:border-[var(--color-spa-gold)] transition-colors text-center cursor-pointer shadow-lg mb-6 group"
                onClick={() => fileInputRef.current?.click()}
              >
                <UploadCloud className="w-12 h-12 mx-auto text-[var(--color-spa-gold)] mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold text-[var(--color-spa-dark)] mb-1">Upload a Selfie</h3>
                <p className="text-xs text-gray-500 mb-4">JPEG sizes under 2MB. Ensure bright lighting.</p>
                <button className="bg-[var(--color-spa-dark)] text-white px-6 py-2 rounded-full font-semibold text-sm hover:bg-black transition-colors">
                  Select Photo
                </button>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm flex items-start mb-6 border border-red-100">
                  <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                  <p>{error}</p>
                </div>
              )}

              <div className="text-center">
                <button 
                  onClick={onSkip}
                  className="text-sm font-semibold text-gray-500 hover:text-[var(--color-spa-dark)] transition-colors underline underline-offset-4"
                >
                  Skip this step
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <input 
          type="file"
          ref={fileInputRef}
          accept="image/jpeg, image/jpg"
          className="hidden"
          onChange={handleUpload}
        />
      </motion.div>
    </div>
  );
}
