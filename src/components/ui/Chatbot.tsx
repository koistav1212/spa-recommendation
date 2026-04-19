import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, User, Sparkles } from "lucide-react";
import { RecommendationResult, UserProfile } from "@/lib/engine";

export const salonChatbotFaqs = [
  {
    keywords: ["book", "appointment", "schedule", "reserve"],
    question: "How can I book an appointment?",
    answer: "You can book an appointment directly using the 'Book Appointment' button on the home screen, or contact us on WhatsApp / call at +91 9876543021."
  },
  {
    keywords: ["whatsapp", "contact", "phone"],
    question: "How can I contact the salon?",
    answer: "You can reach us anytime on WhatsApp or call us at +91 9876543021."
  },
  {
    keywords: ["working hours", "timing", "open", "close"],
    question: "What are your salon timings?",
    answer: "We are open every day from 10:00 AM to 8:00 PM."
  },
  {
    keywords: ["walk in", "walkin", "without appointment"],
    question: "Do you accept walk-ins?",
    answer: "Yes, we accept walk-ins based on stylist availability, but we recommend booking in advance for faster service."
  },
  {
    keywords: ["cancel", "reschedule"],
    question: "Can I cancel or reschedule my appointment?",
    answer: "Yes, you can cancel or reschedule your appointment through WhatsApp or by calling us at least 2 hours before your booking."
  },
  {
    keywords: ["late", "arrive late"],
    question: "What happens if I arrive late?",
    answer: "If you arrive late, we may need to shorten or reschedule your appointment depending on availability."
  },
  {
    keywords: ["payment", "upi", "card", "cash"],
    question: "What payment methods do you accept?",
    answer: "We accept UPI, cards, cash, net banking, and digital wallets."
  },
  {
    keywords: ["parking"],
    question: "Is parking available?",
    answer: "Yes, parking is available near the salon."
  },
  {
    keywords: ["hair botox", "botox"],
    question: "What is Hair Botox?",
    answer: "Hair Botox is a deep-conditioning treatment that helps repair damaged hair, reduce frizz, and make hair smoother and shinier."
  },
  {
    keywords: ["keratin"],
    question: "What does Keratin treatment do?",
    answer: "Keratin treatment helps reduce frizz, smooth hair, improve shine, and make styling easier."
  },
  {
    keywords: ["difference botox keratin", "hair botox vs keratin"],
    question: "What is the difference between Hair Botox and Keratin?",
    answer: "Hair Botox focuses more on repair and nourishment, while Keratin focuses more on smoothing and frizz reduction."
  },
  {
    keywords: ["hair fall"],
    question: "Which treatment is best for hair fall?",
    answer: "Scalp treatments, hair growth serums, Japanese Head Spa, and nourishing hair rituals are usually best for hair fall concerns."
  },
  {
    keywords: ["oily scalp"],
    question: "What treatment is good for oily scalp?",
    answer: "Scalp detox treatments, Japanese Head Spa, and oil-balancing scalp therapies work well for oily scalp."
  },
  {
    keywords: ["dry hair", "damaged hair"],
    question: "What treatment is best for dry or damaged hair?",
    answer: "Hair Botox, hair spa, keratin, and deep repair masks are ideal for dry and damaged hair."
  },
  {
    keywords: ["colored hair", "coloured hair"],
    question: "Can I do Keratin on colored hair?",
    answer: "Yes, Keratin can usually be done on colored hair, but we recommend waiting at least 1–2 weeks after coloring."
  },
  {
    keywords: ["smooth hair", "frizz"],
    question: "Which treatment is best for frizzy hair?",
    answer: "Keratin, smoothing, Hair Botox, and deep-conditioning rituals are the best options for frizzy hair."
  },
  {
    keywords: ["hydrafacial"],
    question: "What is HydraFacial?",
    answer: "HydraFacial is a deep-cleansing facial that exfoliates, hydrates, removes impurities, and improves skin glow."
  },
  {
    keywords: ["hydrafacial oily skin"],
    question: "Is HydraFacial good for oily skin?",
    answer: "Yes, HydraFacial is excellent for oily and combination skin because it deeply cleans pores while keeping skin hydrated."
  },
  {
    keywords: ["hydrafacial acne"],
    question: "Can I get a HydraFacial if I have acne?",
    answer: "Yes, HydraFacial can be customized for acne-prone skin and may include calming or LED add-ons for better results."
  },
  {
    keywords: ["hydrafacial side effects"],
    question: "Are there any side effects of HydraFacial?",
    answer: "Most people only experience slight redness for a few minutes after treatment. There is usually no downtime." 
  },
  {
    keywords: ["sensitive skin"],
    question: "Do you have treatments for sensitive skin?",
    answer: "Yes, we offer gentle facials, calming masks, and skin barrier treatments specially designed for sensitive skin."
  },
  {
    keywords: ["dark circles"],
    question: "What treatment is best for dark circles?",
    answer: "Under-eye masks, cooling therapy, hydrating facials, and LED light therapy are commonly recommended for dark circles."
  },
  {
    keywords: ["pores"],
    question: "How can I reduce large pores?",
    answer: "HydraFacial, exfoliating facials, oil-control treatments, and proper home-care routines can help minimize the appearance of pores."
  },
  {
    keywords: ["aging", "wrinkles", "fine lines"],
    question: "What treatment is best for wrinkles and fine lines?",
    answer: "Anti-aging facials, collagen treatments, LED therapy, and hydrating masks are commonly recommended for wrinkles and fine lines."
  },
  {
    keywords: ["glow"],
    question: "What treatment is best for glowing skin?",
    answer: "HydraFacial, Glass Skin Facial, Vitamin C therapy, and LED glow treatments are excellent for glowing skin."
  },
  {
    keywords: ["bridal"],
    question: "Do you offer bridal packages?",
    answer: "Yes, we offer bridal packages including hair, makeup, skin prep, nails, spa treatments, and trial sessions."
  },
  {
    keywords: ["bridal when"],
    question: "How early should I book bridal services?",
    answer: "We recommend booking bridal services at least 1–2 months in advance."
  },
  {
    keywords: ["massage"],
    question: "What massage therapies do you offer?",
    answer: "We offer aromatherapy massage, deep tissue massage, CBD massage, and relaxing spa therapies."
  },
  {
    keywords: ["japanese head spa"],
    question: "What is Japanese Head Spa?",
    answer: "Japanese Head Spa is a scalp-focused relaxation treatment that deeply cleanses the scalp, improves circulation, and reduces stress."
  },
  {
    keywords: ["head spa benefits"],
    question: "What are the benefits of Japanese Head Spa?",
    answer: "It can help with oily scalp, scalp buildup, mild hair fall, stress relief, and overall scalp health."
  },
  {
    keywords: ["membership"],
    question: "Do you offer memberships?",
    answer: "Yes, we offer monthly and premium memberships with discounts, priority booking, and complimentary services."
  },
  {
    keywords: ["discount", "offer"],
    question: "Do you have any offers right now?",
    answer: "We often run first-visit discounts, limited-time package offers, and membership deals. You can ask us on WhatsApp for the latest offers."
  },
  {
    keywords: ["aftercare"],
    question: "Do you provide aftercare advice?",
    answer: "Yes, after every treatment we provide personalized aftercare instructions and product recommendations."
  },
  {
    keywords: ["products"],
    question: "Do you recommend products after treatments?",
    answer: "Yes, we recommend home-care products based on your hair type, skin type, and treatment history."
  },
  {
    keywords: ["home care"],
    question: "What home care should I follow after a facial?",
    answer: "After a facial, use sunscreen, stay hydrated, avoid harsh scrubs, and follow the product routine recommended by your therapist."
  },
  {
    keywords: ["after keratin"],
    question: "What should I avoid after Keratin treatment?",
    answer: "Avoid washing your hair for 48–72 hours, avoid tying it tightly, and use sulfate-free shampoo."
  },
  {
    keywords: ["after hydrafacial"],
    question: "What should I avoid after HydraFacial?",
    answer: "Avoid exfoliating, heavy workouts, and direct sun exposure for 24–48 hours after your HydraFacial." 
  },
  {
    keywords: ["consultation"],
    question: "Do you provide free consultation?",
    answer: "Yes, we offer free consultation for selected services. You can book one through WhatsApp or the home screen."
  },
  {
    keywords: ["male", "men"],
    question: "Do you offer services for men?",
    answer: "Yes, we offer haircuts, beard grooming, facials, scalp treatments, massages, and hair spa services for men."
  },
  {
    keywords: ["kids", "children"],
    question: "Do you offer services for kids?",
    answer: "Yes, we offer selected grooming and haircut services for children."
  },
  {
    keywords: ["lashes"],
    question: "Do you do lash extensions?",
    answer: "Yes, we offer lash extensions, lash lifting, and lash tinting services."
  },
  {
    keywords: ["brows"],
    question: "Do you offer brow shaping?",
    answer: "Yes, we offer brow shaping, threading, tinting, and brow lamination."
  },
  {
    keywords: ["nails", "manicure", "pedicure"],
    question: "Do you offer manicure and pedicure?",
    answer: "Yes, we offer classic manicure, luxury manicure, gel polish, pedicure, and spa pedicure services."
  },
  {
    keywords: ["hair color"],
    question: "Do you offer hair coloring?",
    answer: "Yes, we offer global hair color, highlights, balayage, root touch-up, and fashion color services."
  },
  {
    keywords: ["allergy", "patch test"],
    question: "Do you do patch tests?",
    answer: "Yes, we recommend patch tests before color, bleach, or chemical treatments."
  },
  {
    keywords: ["privacy", "photo"],
    question: "Will my uploaded photo stay private?",
    answer: "Yes, your uploaded photo is only used for skin analysis and is not shared publicly."
  },
  {
    keywords: ["results", "sessions"],
    question: "How many sessions will I need?",
    answer: "Most people see visible results after 1–3 sessions, depending on their skin, hair, and treatment goals."
  }
];

interface ChatMessage {
  id: string;
  type: "bot" | "user";
  text: string;
}

interface ChatbotProps {
  result?: RecommendationResult | null;
  answers?: UserProfile | Record<string, string | string[]>;
}

export function Chatbot({ result = null, answers = {} }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false); // Track if ever opened to render floating pill when closed
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggested questions state (dynamically updates)
  const [suggestedQuestions, setSuggestedQuestions] = useState<Array<{question: string, answer: string, keywords?: string[]}>>([]);

  const dynamicFaqsContent = result ? [
    {
      question: "Why was this package recommended to me?",
      answer: `Based on your concerns, goals, and skin/hair profile, we recommended ${result.salonPackage?.name} because ${result.packageReason}.`
    },
    {
      question: `What add-on would work best for me?`,
      answer: `The best add-on for you is ${result.recommendedAddOn?.name} because it complements your main package and helps improve results faster.`
    },
    {
      question: `Which products should I use at home?`,
      answer: `We recommend ${result.homeCareProducts?.map((p) => p.name).join(", ")} for your home-care routine.`
    },
    {
      question: `What membership suits me best?`,
      answer: `The best membership for you is ${result.idealMembership?.name} because it matches your budget and treatment frequency.`
    }
  ] : [];

  // Setup the initial list of suggested questions based on answers & result
  useEffect(() => {
    if (suggestedQuestions.length === 0 && messages.length === 0) {
      const getContextualFaqs = () => {
        let contextual: any[] = [];
        if (result?.clinicalFindings?.acne) {
          const matched = salonChatbotFaqs.find(f => f.keywords.includes("hydrafacial acne"));
          if(matched) contextual.push(matched);
        }
        if (answers) {
          const flatAnswers = Object.values(answers).flat().join(" ").toLowerCase();
          for (const faq of salonChatbotFaqs) {
            if (faq.keywords.some(k => flatAnswers.includes(k) && !["book", "appointment"].includes(k))) {
              contextual.push(faq);
              if (contextual.length > 2) break; // Get a couple static ones
            }
          }
        }
        return contextual;
      };

      const bookingFaq = salonChatbotFaqs.find(f => f.keywords.includes("book")) || salonChatbotFaqs[0];
      const contextList = getContextualFaqs();

      // Ensure booking is first, then dynamics, then context
      const allQs = [bookingFaq, ...dynamicFaqsContent, ...contextList]
        .filter((v, i, a) => a.findIndex(t => (t.question === v.question)) === i);
      
      setSuggestedQuestions(allQs);
    }
  }, [answers, result, messages.length, suggestedQuestions.length]);

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: Date.now().toString(),
          type: "bot",
          text: "Hi there! I'm AI Ayura, your personal spa expert. I can explain your recommendations or answer any salon questions. How can I assist you?"
        }
      ]);
    }
  }, [messages.length]);

  // Auto-scroll
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isTyping]);

  const handleUserMessage = async (userText: string, specificAnswer?: string) => {
    if (!userText.trim()) return;
    
    // Add User message
    const userMsgId = Date.now().toString() + "q";
    setMessages(prev => [...prev, { id: userMsgId, type: "user", text: userText }]);
    setInputText("");
    setIsTyping(true);

    // Remove from suggested if it was clicked
    setSuggestedQuestions(prev => prev.filter(q => q.question !== userText));

    // Refill suggested questions slightly faster asynchronously so UI doesn't lag
    setTimeout(() => {
      setSuggestedQuestions(prev => {
        if (prev.length < 5) {
          const unused = salonChatbotFaqs.filter(faq => 
             !prev.some(p => p.question === faq.question) && 
             !messages.some(m => m.text === faq.question) &&
             faq.question !== userText
          );
          if(unused.length > 0) {
            const random = unused[Math.floor(Math.random() * unused.length)];
            return [...prev, random].slice(0, 5); 
          }
        }
        return prev;
      });
    }, 100);

    // 1. Intercept Booking completely
    if (userText.toLowerCase() === "how can i book an appointment?" || (specificAnswer && specificAnswer.includes("button on the home screen"))) {
      setTimeout(() => {
        setMessages(prev => [...prev, { id: Date.now().toString() + "a", type: "bot", text: "I can help with that right now! Launching the scheduling calendar for you..." }]);
        setIsTyping(false);
        setTimeout(() => window.dispatchEvent(new Event('open-booking-modal')), 1000);
      }, 500); 
      return;
    }

    // 2. If it's a fixed button click from UI
    if (specificAnswer) {
      setTimeout(() => {
        setMessages(prev => [...prev, { id: Date.now().toString() + "a", type: "bot", text: specificAnswer }]);
        setIsTyping(false);
      }, 500); 
      return;
    }

    // 3. If it exactly matches a dynamic FAQ (in case they typed it perfectly)
    const exactDynamicMatch = dynamicFaqsContent.find(q => q.question.toLowerCase().trim() === userText.toLowerCase().trim());
    if (exactDynamicMatch) {
       setTimeout(() => {
        setMessages(prev => [...prev, { id: Date.now().toString() + "a", type: "bot", text: exactDynamicMatch.answer }]);
        setIsTyping(false);
      }, 500); 
      return;
    }

    // 4. Hit the Gemini API!
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userText,
          answers,
          result,
        }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "a",
          type: "bot",
          text: data.reply || "Sorry, I couldn't get an answer.",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "e",
          type: "bot",
          text: "Sorry, I'm experiencing technical difficulty. You can contact us on WhatsApp directly!",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    setHasOpened(true);
  };

  return (
    <>
      {/* INLINE PILL BUTTON (If never opened) */}
      <AnimatePresence>
        {!isOpen && !hasOpened && result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full my-4"
          >
            <button
              onClick={handleOpen}
              className="w-full bg-[var(--color-spa-dark)] text-white py-4 px-6 rounded-[2rem] shadow-lg flex items-center justify-between hover:bg-black transition-all border border-[var(--color-spa-gold)]/20 overflow-hidden relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
              <div className="flex items-center gap-4 relative z-10">
                <div className="relative">
                  <MessageCircle className="w-6 h-6 text-[var(--color-spa-gold)]" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[var(--color-spa-dark)]" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-sm leading-tight text-[var(--color-spa-gold)]">Ask AI Ayura</h3>
                  <p className="text-xs text-gray-300">Got questions about your diagnosis?</p>
                </div>
              </div>
              <div className="bg-[var(--color-spa-gold)]/20 text-[var(--color-spa-gold)] px-4 py-1.5 rounded-full text-xs font-bold leading-none backdrop-blur-sm relative z-10">
                Chat Now
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING PILL BUTTON (If was opened and then minimized OR if no result yet) */}
      <AnimatePresence>
        {!isOpen && (hasOpened || !result) && (
          <motion.button
            onClick={() => setIsOpen(true)}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="fixed bottom-[100px] right-6 sm:right-8 bg-[var(--color-spa-dark)] text-white py-3 px-6 rounded-full shadow-2xl flex items-center gap-3 hover:scale-105 transition-transform z-50 border border-[var(--color-spa-gold)]/30"
          >
             <MessageCircle className="w-5 h-5 text-[var(--color-spa-gold)]" />
             <span className="font-bold text-sm tracking-wide text-[var(--color-spa-gold)]">AI Ayura</span>
             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse ml-1" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* CHAT WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-[100px] right-6 sm:right-8 w-[90vw] max-w-[400px] h-[600px] max-h-[75vh] bg-white rounded-[2rem] shadow-2xl z-50 flex flex-col overflow-hidden border border-[var(--color-spa-gold)]/20"
          >
            {/* Header */}
            <div className="bg-[var(--color-spa-dark)] text-white px-6 py-5 flex items-center justify-between relative overflow-hidden flex-shrink-0">
               <div className="absolute opacity-[0.03] -right-4 top-0 pointer-events-none">
                 <Sparkles className="w-32 h-32" />
               </div>
               <div className="flex items-center gap-3 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-spa-gold)]/20 flex items-center justify-center border border-[var(--color-spa-gold)]/50">
                    <Sparkles className="w-5 h-5 text-[var(--color-spa-gold)]" />
                  </div>
                  <div>
                    <h3 className="font-bold flex items-center gap-2 tracking-wide text-[var(--color-spa-gold)]">
                      AI Ayura
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    </h3>
                    <p className="text-xs text-gray-300 font-medium">Beauty Concierge</p>
                  </div>
               </div>
               <button 
                onClick={() => setIsOpen(false)}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors relative z-10 backdrop-blur-md"
               >
                 <X className="w-5 h-5" />
               </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#fcfbf9] custom-scrollbar">
              {messages.map((msg) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id} 
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"} items-end gap-2`}
                >
                  {msg.type === "bot" && (
                    <div className="w-6 h-6 rounded-full bg-[var(--color-spa-gold)] flex-shrink-0 flex items-center justify-center mb-1">
                      <Sparkles className="w-3 h-3 text-[var(--color-spa-dark)]" />
                    </div>
                  )}
                  <div 
                    className={`max-w-[80%] px-4 py-3 text-sm shadow-sm leading-relaxed ${
                      msg.type === "user" 
                        ? "bg-[var(--color-spa-dark)] text-white rounded-2xl rounded-br-sm" 
                        : "bg-white border border-[var(--color-spa-gold)]/20 text-[var(--color-spa-dark)] rounded-2xl rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start items-end gap-2"
                >
                  <div className="w-6 h-6 rounded-full bg-[var(--color-spa-gold)] flex-shrink-0 flex items-center justify-center mb-1">
                    <Sparkles className="w-3 h-3 text-[var(--color-spa-dark)]" />
                  </div>
                  <div className="bg-white border border-[var(--color-spa-gold)]/20 rounded-2xl rounded-bl-sm px-4 py-4 flex items-center gap-1.5 shadow-sm">
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0 }} className="w-1.5 h-1.5 bg-[var(--color-spa-dark)]/40 rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} className="w-1.5 h-1.5 bg-[var(--color-spa-dark)]/40 rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} className="w-1.5 h-1.5 bg-[var(--color-spa-dark)]/40 rounded-full" />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} className="h-2" />
            </div>

            {/* Suggestions & Input */}
            <div className="bg-white border-t border-[var(--color-spa-gold)]/10 shadow-[0_-4px_15px_-5px_rgba(0,0,0,0.05)] pb-4 flex-shrink-0">
               <div className="p-4 overflow-x-auto whitespace-nowrap hide-scrollbar flex gap-2">
                  {/* Mandatory booking question is always present if it hasn't been asked yet */}
                  {suggestedQuestions.some(q => q.keywords?.includes("book")) && (
                    <button
                      onClick={() => {
                        const bq = suggestedQuestions.find(q => q.keywords?.includes("book"));
                        if (bq) handleUserMessage(bq.question, bq.answer);
                      }}
                      disabled={isTyping}
                      className="inline-block text-xs font-bold bg-[var(--color-spa-gold)]/20 text-[var(--color-spa-dark)] py-2 px-4 rounded-full border border-[var(--color-spa-gold)] transition-colors disabled:opacity-50 flex-shrink-0"
                    >
                      How can I book an appointment?
                    </button>
                  )}
                  {suggestedQuestions.filter(q => !q.keywords?.includes("book")).map((faq, i) => (
                    <button
                      key={i}
                      onClick={() => handleUserMessage(faq.question, faq.answer)}
                      disabled={isTyping}
                      className="inline-block text-xs bg-gray-50 text-[var(--color-spa-dark)] font-medium py-2 px-4 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors disabled:opacity-50 flex-shrink-0"
                    >
                      {faq.question}
                    </button>
                  ))}
               </div>

               {/* Chat Input */}
               <form 
                 onSubmit={(e) => { e.preventDefault(); handleUserMessage(inputText); }}
                 className="px-4 pb-2"
               >
                 <div className="relative flex items-center bg-gray-50 rounded-full border border-gray-200 focus-within:border-[var(--color-spa-gold)] transition-colors pr-1">
                   <input
                     type="text"
                     value={inputText}
                     onChange={(e) => setInputText(e.target.value)}
                     disabled={isTyping}
                     placeholder="Type your message..."
                     className="w-full bg-transparent py-3 pl-4 pr-12 text-sm text-[var(--color-spa-dark)] outline-none placeholder-gray-400"
                   />
                   <button 
                     type="submit"
                     disabled={!inputText.trim() || isTyping}
                     className="absolute right-1 w-9 h-9 rounded-full bg-[var(--color-spa-dark)] text-[var(--color-spa-gold)] flex items-center justify-center disabled:opacity-50 hover:bg-black transition-colors"
                   >
                     <Send className="w-4 h-4 ml-0.5" />
                   </button>
                 </div>
               </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #dcdcd1; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
    </>
  );
}
