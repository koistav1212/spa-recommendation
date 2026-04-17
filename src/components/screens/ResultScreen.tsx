import { motion } from "framer-motion";
import { RecommendationResult, UserProfile } from "@/lib/engine";
import { RecommendationCard } from "@/components/ui/RecommendationCard";
import { ProductCard } from "@/components/ui/ProductCard";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { Sparkles, Sun, Moon, Calendar, Gift } from "lucide-react";

interface ResultScreenProps {
  result: RecommendationResult;
  answers: UserProfile;
}

export function ResultScreen({ result, answers }: ResultScreenProps) {
  // We recommend using 'react-confetti' for real confetti, but for here we can simulate 
  // or just fade in beautifully.

  return (
    <div className="min-h-screen bg-[var(--color-spa-beige)] pb-32">
      {/* Header Banner */}
      <div className="bg-[var(--color-spa-dark)] text-white pt-16 pb-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Sparkles className="w-48 h-48" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
            <span className="bg-[var(--color-spa-gold)] text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
              Your Beauty Profile
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Your Personalized Masterplan</h1>
            <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
              {result.personalizedMessage}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-10 relative z-20 space-y-12">
        {/* Recommended Treatments Section */}
        <motion.section initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
          <div className="flex items-center mb-6">
            <h2 className="text-2xl font-bold text-[var(--color-spa-dark)]">Top Recommended Treatments</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {result.topTreatments.map((t) => (
              <RecommendationCard key={t.id} treatment={t} />
            ))}
          </div>
        </motion.section>

        {/* Personalized Offer Section */}
        <motion.section initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
          <div className="bg-gradient-to-r from-[var(--color-spa-blush)] to-[var(--color-spa-beige)] p-8 rounded-3xl border border-[var(--color-spa-gold)]/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center text-[var(--color-spa-gold-dark)] font-bold mb-2">
                <Gift className="w-5 h-5 mr-2" /> Unlocked Offer
              </div>
              <h3 className="text-xl font-bold text-[var(--color-spa-dark)] mb-2">15% Off Your First Booking</h3>
              <p className="text-sm text-gray-600">
                Book any recommended treatment within the next 48 hours to claim your specialized new-client rate.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Daily Routine Section */}
        <motion.section initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
          <h2 className="text-2xl font-bold text-[var(--color-spa-dark)] mb-6">Your Personalized Beauty Routine</h2>
          
          <div className="space-y-6">
            {result.routine.morning.length > 0 && (
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex items-center text-amber-500 font-bold mb-4">
                  <Sun className="w-6 h-6 mr-2" /> Morning
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {result.routine.morning.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
              </div>
            )}

            {result.routine.evening.length > 0 && (
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex items-center text-indigo-500 font-bold mb-4">
                  <Moon className="w-6 h-6 mr-2" /> Evening
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {result.routine.evening.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
              </div>
            )}

            {result.routine.weekly.length > 0 && (
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex items-center text-teal-600 font-bold mb-4">
                  <Calendar className="w-6 h-6 mr-2" /> Weekly
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {result.routine.weekly.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
              </div>
            )}
          </div>
        </motion.section>

        {/* Similar Services Section */}
        {result.similarTreatments && result.similarTreatments.length > 0 && (
          <motion.section initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
            <div className="flex items-center mb-6 mt-12">
              <h2 className="text-2xl font-bold text-[var(--color-spa-dark)]">People Similar To You Also Chose</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {result.similarTreatments.map((t) => (
                <RecommendationCard key={t.id + '_sim'} treatment={t} />
              ))}
            </div>
          </motion.section>
        )}
        
        {/* Urgency hook */}
        <div className="text-center text-sm font-semibold text-gray-500 pb-8 pt-4">
           Best results if started within the next 7 days.
        </div>
      </div>

      <WhatsAppCTA answers={answers} phone="919876543210" />
    </div>
  );
}
