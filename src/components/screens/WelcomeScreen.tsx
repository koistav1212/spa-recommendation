import { motion } from "framer-motion";
import { Sparkles, ArrowRight, PhoneCall, Calendar, Tag, ShieldCheck } from "lucide-react";
import Image from "next/image";

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="w-full flex flex-col min-h-screen bg-[var(--color-spa-beige)]">
      {/* Navigation Bar */}
      <header className="w-full py-4 px-6 md:px-12 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-[var(--color-spa-border)]">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[var(--color-spa-dark)] rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-[var(--color-spa-gold)]" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-[var(--color-spa-dark)]">LuxeSpa</span>
        </div>
        <div className="flex items-center gap-3 md:gap-6">
          <button className="hidden md:flex items-center text-sm font-semibold text-gray-600 hover:text-[var(--color-spa-dark)] transition-colors">
            <PhoneCall className="w-4 h-4 mr-2" /> Schedule Call
          </button>
          <button className="bg-[var(--color-spa-gold)] text-[var(--color-spa-dark)] px-5 py-2 md:px-6 md:py-2.5 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center">
            <Calendar className="w-4 h-4 mr-2" /> Book Appointment
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 md:py-20 text-center max-w-4xl mx-auto w-full relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-spa-blush)] text-[var(--color-spa-gold-dark)] font-bold text-xs uppercase tracking-widest mb-8 border border-[var(--color-spa-gold)]/30"
        >
          <ShieldCheck className="w-4 h-4" /> Personalized For Men & Women
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold text-[var(--color-spa-dark)] mb-6 leading-tight"
        >
          Discover Your Ultimate <br className="hidden md:block"/> Salon & Spa Routine
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
        >
          Take our 60-second beauty profile quiz and unlock curated treatments, home-care recommendations, and exclusive access to our premium hooks.
        </motion.p>
        
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="bg-[var(--color-spa-dark)] text-white px-8 py-5 rounded-full font-bold text-lg md:text-xl flex items-center shadow-[0_10px_40px_rgba(44,44,44,0.3)] hover:shadow-[0_15px_50px_rgba(44,44,44,0.4)] transition-all z-10"
        >
          Start My Beauty Profile
          <ArrowRight className="ml-2 w-6 h-6" />
        </motion.button>
      </div>

      {/* Engaging Promotional Banners */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="w-full max-w-6xl mx-auto px-4 pb-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Banner 1 */}
          <div className="relative h-64 rounded-3xl overflow-hidden group shadow-md cursor-pointer">
            <Image 
              src="https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?auto=format&fit=crop&q=80&w=800" 
              alt="Day Care Special" 
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-spa-dark)] via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 w-full">
              <div className="flex items-center gap-2 text-[var(--color-spa-gold)] mb-2">
                <Tag className="w-4 h-4" /> <span className="text-xs font-bold uppercase tracking-wider">Premium Package</span>
              </div>
              <h3 className="text-white text-xl font-bold mb-1">Luxury Day Care</h3>
              <p className="text-gray-200 text-sm">Full day pampering for flawless skin & hair.</p>
            </div>
          </div>

          {/* Banner 2 */}
          <div className="relative h-64 rounded-3xl overflow-hidden group shadow-md cursor-pointer">
            <Image 
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800" 
              alt="Weekend Special" 
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-spa-dark)] via-black/40 to-transparent"></div>
            <div className="absolute top-0 right-0 p-4">
              <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">New</span>
            </div>
            <div className="absolute bottom-0 left-0 p-6 w-full">
              <div className="flex items-center gap-2 text-[var(--color-spa-gold)] mb-2">
                <Calendar className="w-4 h-4" /> <span className="text-xs font-bold uppercase tracking-wider">Limited Time</span>
              </div>
              <h3 className="text-white text-xl font-bold mb-1">Weekend Special</h3>
              <p className="text-gray-200 text-sm">Special packages designed for men & women.</p>
            </div>
          </div>

          {/* Banner 3 */}
          <div className="relative h-64 rounded-3xl overflow-hidden group shadow-md bg-[var(--color-spa-blush)] flex flex-col justify-center items-center text-center p-8 border border-[var(--color-spa-gold)]/20 cursor-pointer hover:border-[var(--color-spa-gold)] transition-colors">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
              <Sparkles className="w-8 h-8 text-[var(--color-spa-gold-dark)]" />
            </div>
            <h3 className="text-[var(--color-spa-dark)] text-2xl font-extrabold mb-2">Unlock 20% Off</h3>
            <p className="text-gray-600 text-sm mb-6">Complete your beauty profile test to unlock your customized discounted hooks.</p>
            <button onClick={onStart} className="text-[var(--color-spa-gold-dark)] font-bold uppercase tracking-wide text-sm flex items-center group-hover:text-[var(--color-spa-dark)] transition-colors">
              Take The Quiz <ArrowRight className="ml-1 w-4 h-4" />
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
