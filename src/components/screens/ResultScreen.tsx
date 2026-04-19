import { motion } from "framer-motion";
import { RecommendationResult, UserProfile } from "@/lib/engine";
import { ProductCard } from "@/components/ui/ProductCard";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { Chatbot } from "@/components/ui/Chatbot";
import { Sparkles, Gift, Crown, Package, Plus, CheckCircle2, Clock, ScanFace, Home, Calendar, MessageCircle } from "lucide-react";
import Image from "next/image";

interface ResultScreenProps {
  result: RecommendationResult;
  answers: UserProfile;
  onReset: () => void;
  hasChatbotOpened?: boolean;
  onOpenChatbot?: () => void;
}

export function ResultScreen({ result, answers, onReset, hasChatbotOpened, onOpenChatbot }: ResultScreenProps) {
  return (
    <div className="min-h-screen bg-[var(--color-spa-beige)] pb-32">
      {/* Header Banner */}
      <div className="bg-[var(--color-spa-dark)] text-white pt-24 pb-20 px-4 relative overflow-hidden">
        
        {/* Navigation Bar */}
        <div className="absolute top-0 left-0 w-full p-4 md:px-8 z-50 flex justify-between items-center bg-white/5 backdrop-blur-md border-b border-white/10">
          <button 
            onClick={onReset} 
            className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-full shadow-sm flex items-center gap-2 text-sm font-bold transition-all"
          >
            <Home className="w-4 h-4" /> <span className="hidden sm:inline">Home</span>
          </button>
          
          <button 
            onClick={() => window.dispatchEvent(new Event('open-booking-modal'))}
            className="bg-[var(--color-spa-gold)] text-[var(--color-spa-dark)] px-4 sm:px-5 py-2 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center"
          >
            <Calendar className="w-4 h-4 mr-0 sm:mr-2" /> <span className="hidden sm:inline">Book Appointment</span>
            <span className="inline sm:hidden">Book</span>
          </button>
        </div>

        <div className="absolute top-0 right-0 p-8 opacity-10 pt-20">
          <Sparkles className="w-48 h-48" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
            <span className="bg-[var(--color-spa-gold)] text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-6 inline-block">
              Your Beauty Profile
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Your best match is {result.salonPackage.name} + {result.premiumUpgrade.name}</h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              {result.packageReason}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 -mt-10 relative z-20 space-y-8">

        {/* 0. Clinical Skin Report (If available) */}
        {result.clinicalFindings && (
          <motion.section initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 }}>
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-[var(--color-spa-blue)]/30 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-5">
                 <ScanFace className="w-24 h-24" />
               </div>
               <div className="text-[var(--color-spa-blue)] text-xs font-bold uppercase tracking-wider mb-4 flex items-center">
                  <ScanFace className="w-4 h-4 mr-1 text-[var(--color-spa-blue)]" /> Clinical Skin Analysis
               </div>
               
               <h3 className="text-xl font-bold text-[var(--color-spa-dark)] mb-4">Your AI Diagnostic Results</h3>
               
               <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-100">
                    <div className="text-xs text-gray-500 mb-1">Skin Type</div>
                    <div className="font-bold text-[var(--color-spa-dark)]">{result.clinicalFindings.skinType}</div>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-100">
                    <div className="text-xs text-gray-500 mb-1">Acne Detected</div>
                    <div className={`font-bold ${result.clinicalFindings.acne ? 'text-red-500' : 'text-green-600'}`}>
                      {result.clinicalFindings.acne ? "Yes" : "Clear"}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-100">
                    <div className="text-xs text-gray-500 mb-1">Dark Circles</div>
                    <div className={`font-bold ${result.clinicalFindings.darkCircles ? 'text-amber-500' : 'text-green-600'}`}>
                      {result.clinicalFindings.darkCircles ? "Present" : "Minimal"}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-100">
                    <div className="text-xs text-gray-500 mb-1">Pores / Spots</div>
                    <div className={`font-bold ${result.clinicalFindings.skinSpot ? 'text-amber-500' : 'text-green-600'}`}>
                      {result.clinicalFindings.skinSpot ? "Detected" : "Clear"}
                    </div>
                  </div>
               </div>
            </div>
          </motion.section>
        )}

        {/* INLINE CHATBOT PILL - Shows before it's been opened */}
        {!hasChatbotOpened && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
          >
            <button
              onClick={onOpenChatbot}
              className="w-full bg-[var(--color-spa-dark)] text-white py-4 px-6 rounded-[2rem] shadow-lg flex items-center justify-between hover:bg-black transition-all border border-[var(--color-spa-gold)]/20 overflow-hidden relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
              <div className="flex items-center gap-4 relative z-10">
                <div className="relative">
                  <MessageCircle className="w-6 h-6 text-[var(--color-spa-gold)]" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[var(--color-spa-dark)]" />
                </div>
                <div className="text-left hidden sm:block">
                  <h3 className="font-bold text-sm leading-tight text-[var(--color-spa-gold)]">Ask AI Ayura</h3>
                  <p className="text-xs text-gray-300">Got questions about your diagnosis?</p>
                </div>
                <div className="text-left sm:hidden">
                  <h3 className="font-bold text-sm leading-tight text-[var(--color-spa-gold)]">Ask AI Ayura</h3>
                </div>
              </div>
              <div className="bg-[var(--color-spa-gold)]/20 text-[var(--color-spa-gold)] px-4 py-1.5 rounded-full text-xs font-bold leading-none backdrop-blur-sm relative z-10">
                Chat Now
              </div>
            </button>
          </motion.div>
        )}

        {/* 1. Recommended Package */}
        <motion.section initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
          <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-[var(--color-spa-border)]">
            <div className="relative h-64 w-full">
              <Image src={result.salonPackage.imageUrl} alt={result.salonPackage.name} fill className="object-cover" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-[var(--color-spa-dark)] text-xs font-bold px-3 py-1.5 rounded-full flex items-center shadow-sm">
                <Package className="w-4 h-4 mr-1 text-[var(--color-spa-gold-dark)]" /> Recommended Package
              </div>
            </div>
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-[var(--color-spa-dark)] mb-2">{result.salonPackage.name}</h2>
              <p className="text-gray-600 mb-6">{result.salonPackage.subtitle}</p>
              <div className="flex items-center justify-between border-t border-[var(--color-spa-border)] pt-4">
                <div className="flex items-center text-sm font-semibold text-gray-600">
                  <Clock className="w-4 h-4 mr-2" /> {result.salonPackage.duration}
                </div>
                <div className="text-lg font-bold text-[var(--color-spa-dark)]">{result.salonPackage.price}</div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 2. Premium Upgrade */}
        <motion.section initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-6 md:p-8 border border-[var(--color-spa-gold)]/30 flex flex-col sm:flex-row items-center gap-6 shadow-sm">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden flex-shrink-0 border-2 border-white shadow-md">
              <Image src={result.premiumUpgrade.imageUrl} alt={result.premiumUpgrade.name} fill className="object-cover" />
            </div>
            <div className="text-center sm:text-left flex-1">
              <div className="text-[var(--color-spa-gold-dark)] text-xs font-bold uppercase tracking-wider mb-1 flex items-center justify-center sm:justify-start">
                <Crown className="w-3 h-3 mr-1" /> Premium Upgrade
              </div>
              <h3 className="text-xl font-bold text-[var(--color-spa-dark)] mb-2">{result.premiumUpgrade.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{result.premiumUpgrade.benefit}</p>
              <div className="text-sm font-semibold text-[var(--color-spa-dark)]">+{result.premiumUpgrade.price}</div>
            </div>
          </div>
        </motion.section>

        {/* 3. At-Home Care */}
        <motion.section initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
          <h3 className="text-xl font-bold text-[var(--color-spa-dark)] mb-4 px-2">Your Best At-Home Care Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.homeCareProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </motion.section>

        {/* 4. Recommended Add-On & 5. Ideal Membership */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Add-On */}
          <motion.section initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
             <div className="bg-white rounded-3xl p-6 border border-[var(--color-spa-border)] h-full flex flex-col hover:border-[var(--color-spa-blush-dark)] transition-colors relative overflow-hidden">
                <div className="text-[var(--color-spa-gold-dark)] text-xs font-bold uppercase tracking-wider mb-4 flex items-center">
                  <Plus className="w-4 h-4 mr-1" /> Recommended Add-On
                </div>
                <h3 className="text-lg font-bold text-[var(--color-spa-dark)] mb-2">{result.recommendedAddOn.name}</h3>
                <p className="text-sm text-gray-600 flex-1">{result.recommendedAddOn.benefit}</p>
                <div className="mt-4 pt-4 border-t border-[var(--color-spa-border)] font-semibold text-sm">
                  {result.recommendedAddOn.price}
                </div>
             </div>
          </motion.section>

          {/* Membership */}
          <motion.section initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
             <div className="bg-[var(--color-spa-dark)] text-white rounded-3xl p-6 h-full flex flex-col relative overflow-hidden">
                <div className="absolute -right-4 -top-4 opacity-10">
                  <Crown className="w-24 h-24 text-[var(--color-spa-gold)]" />
                </div>
                <div className="text-[var(--color-spa-gold)] text-xs font-bold uppercase tracking-wider mb-4 relative z-10">
                  Suggested Membership
                </div>
                <h3 className="text-lg font-bold mb-2 relative z-10">{result.idealMembership.name}</h3>
                <p className="text-sm text-gray-300 flex-1 relative z-10 mb-4">{result.idealMembership.description}</p>
                <ul className="space-y-2 mb-4 relative z-10 flex-1">
                  {result.idealMembership.perks.slice(0, 2).map((perk, i) => (
                    <li key={i} className="text-xs text-gray-300 flex items-start">
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-[var(--color-spa-gold)] mt-0.5 flex-shrink-0" />
                      {perk}
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-gray-700 font-semibold text-sm text-[var(--color-spa-gold)] relative z-10">
                  {result.idealMembership.price}
                </div>
             </div>
          </motion.section>
        </div>

        {/* 6. Limited-Time Offer */}
        <motion.section initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
          <div className="bg-[var(--color-spa-blush)] rounded-3xl p-6 md:p-8 border border-[var(--color-spa-gold)]/20 text-center">
             <Gift className="w-8 h-8 text-[var(--color-spa-gold-dark)] mx-auto mb-3" />
             <h3 className="text-xl font-bold text-[var(--color-spa-dark)] mb-2">{result.limitedTimeOffer.title}</h3>
             <p className="text-sm text-gray-700 mb-4 max-w-md mx-auto">{result.limitedTimeOffer.description}</p>
             <div className="inline-block bg-white px-6 py-3 rounded-xl border-2 border-dashed border-[var(--color-spa-gold)] font-mono font-bold text-[var(--color-spa-dark)] tracking-wider">
               {result.limitedTimeOffer.code}
             </div>
          </div>
        </motion.section>

      </div>

      <WhatsAppCTA answers={answers} phone="919876543210" />
    </div>
  );
}
