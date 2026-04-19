import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, CheckCircle2, User, Phone, Mail, Sparkles, ChevronRight, AlertCircle } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTreatment?: string; // If passed from chatbot
}

type Step = "datetime" | "details" | "success";

const treatments = [
  "Acne Clearing + Detox Facial",
  "Signature HydraFacial",
  "Glass Skin Rejuvenation",
  "Anti-Aging Collagen Boost",
  "Keratin Frizz Control",
  "Japanese Head Spa",
  "Luxury Hair Botox",
  "Scalp Detox & Balance",
  "Premium Full Body Massage",
  "Ultimate Bridal Prep"
];

// Generate next 14 days
const generateDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push(d);
  }
  return dates;
};

const DATES = generateDates();

// Time Slots Configuration
const MORNING_SLOTS = ["10:00 AM", "11:00 AM"];
const AFTERNOON_SLOTS = ["12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM"];
const EVENING_SLOTS = ["4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM"];

// Simulated Pre-booked slots to show some "red static" slots as requested
const MOCK_BOOKED_SLOTS = ["12:00 PM", "5:00 PM"];

export function BookingModal({ isOpen, onClose, initialTreatment = "" }: BookingModalProps) {
  const [step, setStep] = useState<Step>("datetime");
  
  // Form State
  const [selectedDate, setSelectedDate] = useState<Date>(DATES[0]);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [treatment, setTreatment] = useState(initialTreatment || treatments[0]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setStep("datetime");
      setSelectedDate(DATES[0]);
      setSelectedTime("");
      setName("");
      setPhone("");
      setEmail("");
      setTreatment(initialTreatment || treatments[0]);
      setErrorMsg("");
    }
  }, [isOpen, initialTreatment]);

  if (!isOpen) return null;

  const handleNextToDetails = () => {
    if (!selectedTime) {
      setErrorMsg("Please select a time slot first.");
      return;
    }
    setErrorMsg("");
    setStep("details");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Validation
    if (!name.trim()) return setErrorMsg("Name is required");
    if (!/^([6-9]\d{9})$/.test(phone.trim())) {
      return setErrorMsg("Please enter a valid 10-digit Indian phone number.");
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return setErrorMsg("Please enter a valid email address.");
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          treatment,
          date: selectedDate.toDateString(),
          timeSlot: selectedTime
        })
      });

      if (!response.ok) throw new Error("Failed to book");

      setStep("success");
    } catch (err) {
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // UI Renderer for Time slot
  const TimeSlotButton = ({ time }: { time: string }) => {
    const isBooked = MOCK_BOOKED_SLOTS.includes(time);
    const isSelected = selectedTime === time;

    return (
      <button
        onClick={() => !isBooked && setSelectedTime(time)}
        disabled={isBooked}
        className={`px-3 py-2 text-sm font-semibold rounded-xl border flex-1 whitespace-nowrap transition-all duration-300 ${
          isBooked 
            ? "bg-red-50 text-red-400 border-red-100 cursor-not-allowed line-through opacity-60" 
            : isSelected 
              ? "bg-green-500 text-white border-green-500 shadow-md shadow-green-500/30 scale-105 z-10" 
              : "bg-white text-[var(--color-spa-dark)] border-gray-200 hover:border-green-400 hover:text-green-600"
        }`}
      >
        {time}
      </button>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm transition-opacity">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-[500px] bg-[#fcfbf9] rounded-[2rem] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="bg-[var(--color-spa-dark)] px-6 py-5 flex items-center justify-between text-white flex-shrink-0">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-[var(--color-spa-gold)]/20 flex items-center justify-center border border-[var(--color-spa-gold)]/50">
                <Calendar className="w-5 h-5 text-[var(--color-spa-gold)]" />
             </div>
             <div>
               <h2 className="font-bold text-lg text-[var(--color-spa-gold)]">Book Appointment</h2>
               {step !== "success" && <p className="text-xs text-gray-300">Step {step === "datetime" ? "1" : "2"} of 2</p>}
             </div>
          </div>
          <button onClick={onClose} className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar relative">
           <AnimatePresence mode="wait">
              
              {/* STEP 1: DATE & TIME */}
              {step === "datetime" && (
                <motion.div 
                  key="datetime"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <p className="text-gray-600 font-medium">Select your preferred date and time slot.</p>
                  
                  {/* Date Selector */}
                  <div>
                    <h3 className="text-sm font-bold text-[var(--color-spa-dark)] mb-3 flex items-center gap-2 uppercase tracking-wider">
                       <Calendar className="w-4 h-4 text-[var(--color-spa-gold-dark)]" /> Select Date
                    </h3>
                    <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar snap-x">
                      {DATES.map((date, i) => {
                         const isSelected = selectedDate.toDateString() === date.toDateString();
                         return (
                           <button
                             key={i}
                             onClick={() => setSelectedDate(date)}
                             className={`snap-start flex-shrink-0 w-16 h-20 rounded-2xl flex flex-col items-center justify-center border transition-all duration-300 ${
                               isSelected 
                                ? "bg-[var(--color-spa-dark)] text-[var(--color-spa-gold)] border-[var(--color-spa-dark)] shadow-lg scale-105" 
                                : "bg-white text-gray-500 border-gray-200 hover:border-[var(--color-spa-gold)]"
                             }`}
                           >
                             <span className="text-[10px] uppercase font-bold tracking-widest">{date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                             <span className={`text-2xl font-black mt-1 ${isSelected ? "text-white" : "text-[var(--color-spa-dark)]"}`}>{date.getDate()}</span>
                           </button>
                         )
                      })}
                    </div>
                  </div>

                  {/* Time Selector */}
                  <div>
                    <h3 className="text-sm font-bold text-[var(--color-spa-dark)] mb-3 flex items-center gap-2 uppercase tracking-wider">
                       <Clock className="w-4 h-4 text-[var(--color-spa-gold-dark)]" /> Select Slot
                    </h3>
                    
                    <div className="space-y-4">
                      {/* Morning */}
                      <div>
                        <p className="text-xs text-gray-500 mb-2 font-medium">Morning</p>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                          {MORNING_SLOTS.map(t => <TimeSlotButton key={t} time={t} />)}
                        </div>
                      </div>
                      
                      {/* Afternoon */}
                      <div>
                        <p className="text-xs text-gray-500 mb-2 font-medium">Afternoon</p>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                          {AFTERNOON_SLOTS.map(t => <TimeSlotButton key={t} time={t} />)}
                        </div>
                      </div>

                      {/* Evening */}
                      <div>
                        <p className="text-xs text-gray-500 mb-2 font-medium">Evening</p>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                          {EVENING_SLOTS.map(t => <TimeSlotButton key={t} time={t} />)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center gap-2 font-medium">
                      <AlertCircle className="w-4 h-4" /> {errorMsg}
                    </div>
                  )}

                  <button
                    onClick={handleNextToDetails}
                    className="w-full mt-4 bg-[var(--color-spa-gold)] text-[var(--color-spa-dark)] font-extrabold py-4 rounded-full shadow-lg hover:bg-[var(--color-spa-gold-dark)] transition-colors flex justify-center items-center gap-2 uppercase tracking-wide"
                  >
                    Next Step <ChevronRight className="w-5 h-5" />
                  </button>
                </motion.div>
              )}


              {/* STEP 2: DETAILS */}
              {step === "details" && (
                <motion.form 
                  key="details"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-5"
                >
                   <div className="bg-gray-50 rounded-2xl p-4 flex justify-between items-center border border-gray-100">
                     <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-[var(--color-spa-dark)] rounded-full flex items-center justify-center">
                         <Calendar className="w-5 h-5 text-[var(--color-spa-gold)]" />
                       </div>
                       <div>
                         <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Confirmed Slot</p>
                         <p className="font-bold text-[var(--color-spa-dark)]">{selectedDate.toDateString()} at {selectedTime}</p>
                       </div>
                     </div>
                     <button type="button" onClick={() => setStep("datetime")} className="text-xs font-bold text-blue-600 underline">Change</button>
                   </div>

                   <hr className="border-gray-200" />

                   <div>
                     <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Service Context</label>
                     <div className="relative">
                       <select
                         required
                         value={treatment}
                         onChange={(e) => setTreatment(e.target.value)}
                         className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[var(--color-spa-dark)] font-medium appearance-none outline-none focus:border-[var(--color-spa-gold)] transition-colors"
                       >
                         {treatments.map((t) => (
                           <option key={t} value={t}>{t}</option>
                         ))}
                       </select>
                       <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 rotate-90 pointer-events-none" />
                     </div>
                   </div>

                   <div>
                     <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Full Name *</label>
                     <div className="relative">
                       <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                       <input 
                         required
                         type="text" 
                         value={name}
                         onChange={(e) => setName(e.target.value)}
                         placeholder="John Doe"
                         className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-[var(--color-spa-dark)] font-medium outline-none focus:border-[var(--color-spa-gold)] transition-colors"
                       />
                     </div>
                   </div>

                   <div>
                     <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Phone Number *</label>
                     <div className="relative">
                       <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold">+91</span>
                       <input 
                         required
                         type="tel"
                         maxLength={10}
                         value={phone}
                         onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                         placeholder="9876543210"
                         className="w-full bg-white border border-gray-200 rounded-xl pl-12 pr-4 py-3 text-[var(--color-spa-dark)] font-medium outline-none focus:border-[var(--color-spa-gold)] transition-colors"
                       />
                     </div>
                   </div>

                   <div>
                     <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Email Address</label>
                     <div className="relative">
                       <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                       <input 
                         type="email" 
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                         placeholder="john@example.com (Optional)"
                         className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-[var(--color-spa-dark)] font-medium outline-none focus:border-[var(--color-spa-gold)] transition-colors"
                       />
                     </div>
                   </div>

                   {errorMsg && (
                    <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center gap-2 font-medium">
                      <AlertCircle className="w-4 h-4" /> {errorMsg}
                    </div>
                   )}

                   <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 bg-[var(--color-spa-dark)] text-white font-extrabold py-4 rounded-full shadow-lg hover:shadow-xl transition-all flex justify-center items-center gap-2 uppercase tracking-wide disabled:opacity-70"
                   >
                     {isSubmitting ? "Confirming..." : "Confirm Booking"} 
                     {!isSubmitting && <Sparkles className="w-5 h-5 text-[var(--color-spa-gold)]" />}
                   </button>
                </motion.form>
              )}


              {/* STEP 3: SUCCESS */}
              {step === "success" && (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-12"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: [1.2, 1] }}
                    transition={{ type: "spring", duration: 0.6 }}
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6"
                  >
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </motion.div>
                  <h2 className="text-2xl font-black text-[var(--color-spa-dark)] mb-2">Yeah! Your appointment has been booked.</h2>
                  <p className="text-gray-500 mb-8 max-w-[280px]">Our concierge team will reach out to you shortly to confirm the final details.</p>
                  
                  <button
                    onClick={onClose}
                    className="w-full bg-[var(--color-spa-gold)] text-[var(--color-spa-dark)] font-extrabold py-4 rounded-full shadow hover:bg-[var(--color-spa-gold-dark)] transition-colors uppercase tracking-wide"
                  >
                    Back to Dashboard
                  </button>
                </motion.div>
              )}

           </AnimatePresence>
        </div>

      </motion.div>
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}}/>
    </div>
  );
}
