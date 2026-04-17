import { Product } from "@/lib/data/recommendations";
import { IndianRupee } from "lucide-react";
import Image from "next/image";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex items-center p-4 bg-white rounded-2xl shadow-sm border border-[var(--color-spa-border)] hover:border-[var(--color-spa-blush-dark)] transition-colors">
      <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-50 border border-gray-100">
        <Image 
          src={product.imageUrl} 
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="ml-4 flex-1">
        <h4 className="text-sm font-bold text-[var(--color-spa-dark)]">{product.name}</h4>
        <p className="text-xs text-gray-500 mt-1 mb-2 line-clamp-2">{product.benefit}</p>
        <div className="flex justify-between items-center text-xs font-semibold text-[var(--color-spa-dark)]">
          <span className="text-[var(--color-spa-gold-dark)]">{product.bestFor}</span>
          <div className="flex items-center">
             {product.price}
          </div>
        </div>
      </div>
    </div>
  );
}
