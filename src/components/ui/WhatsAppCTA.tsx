import { MessageCircle } from "lucide-react";
import { UserProfile } from "@/lib/engine";

interface WhatsAppCTAProps {
  answers: UserProfile;
  phone: string; // The salon's phone number
}

export function WhatsAppCTA({ answers, phone }: WhatsAppCTAProps) {
  const handleBooking = () => {
    // Generate pre-filled message
    // If we wanted to, we could attach the top recommended treatment here.
    const message = `Hi! I completed the Beauty Profile quiz on your website and want to book my personalized recommendation.`;
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${phone}?text=${encoded}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-[var(--color-spa-border)] z-50 animate-slide-up">
      <div className="max-w-xl mx-auto">
        <button
          onClick={handleBooking}
          className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-lg py-4 px-8 rounded-full flex items-center justify-center gap-3 transition-colors shadow-lg hover:shadow-xl"
        >
          <MessageCircle className="w-6 h-6" />
          Book on WhatsApp Now
        </button>
      </div>
    </div>
  );
}
