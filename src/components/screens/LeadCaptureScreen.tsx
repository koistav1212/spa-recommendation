import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Lock } from "lucide-react";
import { submitToGoogleForm } from "@/lib/utils";

interface LeadCaptureScreenProps {
  answers: Record<string, string | string[]>;
  onUnlock: () => void;
}

export function LeadCaptureScreen({ answers, onUnlock }: LeadCaptureScreenProps) {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Call our Google Form submission utility
    await submitToGoogleForm({
      ...formData,
      answers
    });

    setLoading(false);
    onUnlock(); // Proceed to results regardless of success to ensure user gets value
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] px-4 py-8 w-full max-w-lg mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-[var(--color-spa-border)] w-full relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[var(--color-spa-gold)] to-[var(--color-spa-blush-dark)]"></div>
        
        <div className="w-16 h-16 bg-[var(--color-spa-beige)] rounded-full flex items-center justify-center mb-6 mx-auto">
          <Lock className="w-8 h-8 text-[var(--color-spa-gold-dark)]" />
        </div>
        
        <h2 className="text-2xl font-bold text-center text-[var(--color-spa-dark)] mb-2">
          Unlock Your Personalized Beauty Plan
        </h2>
        <p className="text-gray-500 text-center text-sm mb-8">
          Enter your email and phone number to see your recommended treatments, premium add-ons, home-care products, and exclusive offers.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              required
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-[var(--color-spa-border)] focus:border-[var(--color-spa-gold)] focus:ring-[var(--color-spa-gold)] bg-gray-50 focus:bg-white transition-all outline-none"
              placeholder="Emma Watson"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
            <input
              required
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-[var(--color-spa-border)] focus:border-[var(--color-spa-gold)] focus:ring-[var(--color-spa-gold)] bg-gray-50 focus:bg-white transition-all outline-none"
              placeholder="+91 98765 43210"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address (Optional)</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-[var(--color-spa-border)] focus:border-[var(--color-spa-gold)] focus:ring-[var(--color-spa-gold)] bg-gray-50 focus:bg-white transition-all outline-none"
              placeholder="emma@example.com"
            />
          </div>

          <p className="text-xs text-center text-gray-400 mt-4 px-4">
            By continuing, you agree to receive recommendations and offers on WhatsApp.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--color-spa-dark)] text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center hover:bg-black transition-colors mt-6 disabled:opacity-70"
          >
            {loading ? "Unlocking..." : "Unlock My Personalized Plan"}
            {!loading && <ArrowRight className="ml-2 w-5 h-5" />}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
