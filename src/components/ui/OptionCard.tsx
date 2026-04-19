import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";
import Image from "next/image";
import { CheckSquare, Square } from "lucide-react";

interface OptionCardProps {
  id: string;
  label: string;
  iconName?: string;
  imageUrl?: string;
  selected: boolean;
  allowMultiple?: boolean;
  onSelect: (id: string) => void;
}

export function OptionCard({ id, label, iconName, imageUrl, selected, allowMultiple, onSelect }: OptionCardProps) {
  // Dynamically pull icon with a thin, minimal 1.5 stroke width for pure elegance
  const IconComponent = iconName ? (Icons[iconName as keyof typeof Icons] as React.ElementType) : null;

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(id)}
      className={cn(
        "relative flex flex-col items-center justify-center p-6 rounded-2xl w-full border transition-all duration-300 min-h-[140px]",
        selected 
          ? "border-[var(--color-spa-dark)] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] scale-[1.02]"
          : "border-gray-200 bg-gray-50 hover:bg-white hover:border-gray-300 hover:shadow-sm"
      )}
    >
      {imageUrl ? (
        <div className="w-16 h-16 rounded-full overflow-hidden mb-4 ring-1 ring-gray-100">
          <Image src={imageUrl} alt={label} width={64} height={64} className="object-cover" />
        </div>
      ) : IconComponent ? (
        <IconComponent 
          strokeWidth={1.5} 
          className={cn(
            "w-8 h-8 mb-4 transition-colors duration-500", 
            selected ? "text-[var(--color-spa-dark)]" : "text-gray-400"
          )} 
        />
      ) : null}
      
      <span className={cn(
        "text-sm font-semibold text-center tracking-wide",
        selected ? "text-[var(--color-spa-dark)]" : "text-gray-500"
      )}>
        {label}
      </span>
      
      {allowMultiple ? (
        <div className={cn(
          "absolute top-3 right-3 transition-colors duration-300",
          selected ? "text-[var(--color-spa-gold-dark)]" : "text-gray-300"
        )}>
           {selected ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
        </div>
      ) : (
        <div className={cn(
          "absolute top-3 right-3 w-2 h-2 rounded-full transition-opacity duration-300",
          selected ? "bg-[var(--color-spa-gold-dark)] opacity-100" : "opacity-0"
        )} />
      )}
      
    </motion.button>
  );
}
