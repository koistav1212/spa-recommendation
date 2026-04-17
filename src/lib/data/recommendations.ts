export type Treatment = {
  id: string;
  name: string;
  benefit: string;
  duration: string;
  price: string;
  bestFor: string;
  badge?: string;
  imageUrl: string;
  tags: string[]; // For engine matching: e.g. "acne", "hair fall", etc.
}

export type Product = {
  id: string;
  name: string;
  benefit: string;
  bestFor: string;
  price: string;
  imageUrl: string;
  routine: "morning" | "evening" | "weekly";
}

// Guaranteed valid Unsplash IDs for a luxury spa theme
export const treatments: Treatment[] = [
  {
    id: "t1",
    name: "Hydra Glow Facial",
    benefit: "Deep hydration and luminous glow",
    duration: "45 mins",
    price: "₹2,500",
    bestFor: "Dry / Dull Skin",
    badge: "Popular",
    imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800",
    tags: ["glowingskin", "dry", "dullness", "party"]
  },
  {
    id: "t2",
    name: "Acne Control Facial",
    benefit: "Professional acne clearing session",
    duration: "60 mins",
    price: "₹3,000",
    bestFor: "Oily / Acne-prone Skin",
    badge: "Recommended For You",
    imageUrl: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800",
    tags: ["acne", "oily", "sensitive", "hormonal_acne", "oily_pores"]
  },
  {
    id: "t3",
    name: "Bridal Glow Package",
    benefit: "Complete bridal skincare prep",
    duration: "3 hours",
    price: "₹12,000",
    bestFor: "Brides-to-be",
    imageUrl: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=800",
    tags: ["wedding", "bridal", "makeover"]
  },
  {
    id: "t4",
    name: "Keratin Hair Spa",
    benefit: "Smooth, frizz-free shiny hair",
    duration: "90 mins",
    price: "₹4,500",
    bestFor: "Frizzy / Damaged Hair",
    badge: "Popular",
    imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800",
    tags: ["frizz", "smoothhair", "dryhair", "damaged"]
  },
  {
    id: "t5",
    name: "Hair Strengthening Therapy",
    benefit: "Reduces hair fall and nourishes scalp",
    duration: "60 mins",
    price: "₹2,800",
    bestFor: "Thinning / Weak Hair",
    imageUrl: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&q=80&w=800",
    tags: ["hairfall", "thinning", "dandruff", "scalp_issues"]
  },
  {
    id: "t6",
    name: "Detan Cleanup",
    benefit: "Instantly brightens and removes sun tan",
    duration: "30 mins",
    price: "₹1,500",
    bestFor: "Sun Damaged Skin",
    imageUrl: "https://images.unsplash.com/photo-1521590832167-7bfcfaa6362f?auto=format&fit=crop&q=80&w=800",
    tags: ["tan", "dullness", "pigmentation", "sun_pollution"]
  },
  {
    id: "t7",
    name: "Aroma Therapy Massage",
    benefit: "Deep relaxation with essential oils",
    duration: "60 mins",
    price: "₹3,500",
    bestFor: "Stress Relief",
    badge: "Highest Rated",
    imageUrl: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800",
    tags: ["relaxation", "spa", "deep_relaxation"]
  },
  {
    id: "t8",
    name: "Anti-Aging Therapy",
    benefit: "Firms skin and reduces fine lines",
    duration: "75 mins",
    price: "₹4,200",
    bestFor: "Mature Skin",
    imageUrl: "https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&q=80&w=800",
    tags: ["antiaging", "finelines", "fine_lines"]
  },
  {
    id: "t9",
    name: "Nail Spa + Manicure",
    benefit: "Luxury hand and nail care",
    duration: "45 mins",
    price: "₹1,200",
    bestFor: "Grooming",
    imageUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=800",
    tags: ["nail", "party"]
  }
];

export const products: Product[] = [
  {
    id: "p1",
    name: "Vitamin C Serum",
    benefit: "Brightens and evens skin tone",
    bestFor: "Dull Skin & Pigmentation",
    price: "₹1,850",
    imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600",
    routine: "morning"
  },
  {
    id: "p2",
    name: "Sunscreen SPF 50",
    benefit: "Broad spectrum protection",
    bestFor: "All Skin Types",
    price: "₹850",
    imageUrl: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600",
    routine: "morning"
  },
  {
    id: "p3",
    name: "Anti-Acne Face Wash",
    benefit: "Cleanses pores and removes excess oil",
    bestFor: "Oily & Acne-Prone Skin",
    price: "₹650",
    imageUrl: "https://images.unsplash.com/photo-1556228720-192a6af4e865?auto=format&fit=crop&q=80&w=600",
    routine: "morning"
  },
  {
    id: "p4",
    name: "Hydrating Moisturizer",
    benefit: "Nightly moisture lock for barrier repair",
    bestFor: "Dry & Normal Skin",
    price: "₹1,200",
    imageUrl: "https://images.unsplash.com/photo-1615397323190-67a98eb3d4d3?auto=format&fit=crop&q=80&w=600",
    routine: "evening"
  },
  {
    id: "p5",
    name: "Under Eye Cream",
    benefit: "Reduces dark circles & puffiness",
    bestFor: "Tired/Stressed Eyes",
    price: "₹900",
    imageUrl: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=600",
    routine: "evening"
  },
  {
    id: "p6",
    name: "Scalp Serum",
    benefit: "Nourishes follicles to promote growth",
    bestFor: "Thinning & Dry Scalps",
    price: "₹1,650",
    imageUrl: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=600",
    routine: "evening"
  },
  {
    id: "p7",
    name: "Hair Fall Control Shampoo",
    benefit: "Strengthens roots and reduces shedding",
    bestFor: "Thinning Hair",
    price: "₹950",
    imageUrl: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4a2d?auto=format&fit=crop&q=80&w=600",
    routine: "weekly"
  },
  {
    id: "p8",
    name: "Keratin Hair Mask",
    benefit: "Deep conditioning weekly repair",
    bestFor: "Frizzy Hair",
    price: "₹1,500",
    imageUrl: "https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80&w=600",
    routine: "weekly"
  }
];
