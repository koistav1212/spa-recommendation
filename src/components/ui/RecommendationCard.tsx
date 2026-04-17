import { Treatment } from "@/lib/data/recommendations";
import { Clock, IndianRupee } from "lucide-react";
import Image from "next/image";

export function RecommendationCard({ treatment }: { treatment: Treatment }) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[var(--color-spa-border)] group hover:shadow-md transition-shadow duration-300">
      <div className="relative h-48 w-full overflow-hidden">
        <Image 
          src={treatment.imageUrl} 
          alt={treatment.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {treatment.badge && (
          <div className="absolute top-4 left-4 bg-[var(--color-spa-dark)] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
            {treatment.badge}
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="text-xs font-semibold text-[var(--color-spa-gold-dark)] uppercase tracking-wider mb-1">
          Best for: {treatment.bestFor}
        </div>
        <h3 className="text-lg font-bold text-[var(--color-spa-dark)] mb-2">{treatment.name}</h3>
        <p className="text-sm text-gray-500 mb-4">{treatment.benefit}</p>
        
        <div className="flex items-center justify-between pt-4 border-t border-[var(--color-spa-border)]">
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-1 text-[var(--color-spa-gold)]" />
            {treatment.duration}
          </div>
          <div className="flex items-center text-sm font-semibold text-[var(--color-spa-dark)]">
            <IndianRupee className="w-4 h-4 mr-1" />
            {treatment.price}
          </div>
        </div>
      </div>
    </div>
  );
}
