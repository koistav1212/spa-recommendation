export type SalonPackage = {
  id: string;
  name: string;
  subtitle: string;
  duration: string;
  price: string;
  imageUrl: string;
  tags: string[];
};

export type PremiumUpgrade = {
  id: string;
  name: string;
  benefit: string;
  price: string;
  imageUrl: string;
  tags: string[];
};

export type Product = {
  id: string;
  name: string;
  benefit: string;
  bestFor: string;
  price: string;
  imageUrl: string;
  tags: string[];
};

export type AddOn = {
  id: string;
  name: string;
  benefit: string;
  price: string;
  imageUrl: string;
  tags: string[];
};

export type Membership = {
  id: string;
  name: string;
  description: string;
  price: string;
  perks: string[];
  imageUrl: string;
};

export type LimitedOffer = {
  id: string;
  title: string;
  description: string;
  code: string;
};

// Guaranteed valid Unsplash IDs for a luxury spa theme
export const packages: SalonPackage[] = [
  {
    id: "pkg1",
    name: "Hair Botox + Keratin Ritual",
    subtitle: "Complete frizz-control and smoothing restoration",
    duration: "2.5 hours",
    price: "₹6,500",
    imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800",
    tags: ["frizzy_hair", "damaged_hair", "frizz_free"]
  },
  {
    id: "pkg2",
    name: "Acne Clearing + Detox Facial",
    subtitle: "Deep pore extraction, led therapy, and hydration",
    duration: "1.5 hours",
    price: "₹4,200",
    imageUrl: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800",
    tags: ["acne", "oily_scalp", "acne_free", "acne_prone"]
  },
  {
    id: "pkg3",
    name: "Ultimate Bridal Makeover",
    subtitle: "Pre-wedding glowing skin & glossy hair treatment",
    duration: "4 hours",
    price: "₹15,000",
    imageUrl: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=800",
    tags: ["wedding", "bridal", "glowing_skin"]
  },
  {
    id: "pkg4",
    name: "Scalp Renewal & Hair Growth",
    subtitle: "Nourishing therapy for fuller, thicker hair",
    duration: "90 mins",
    price: "₹3,500",
    imageUrl: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&q=80&w=800",
    tags: ["hair_fall", "thicker_hair", "thin"]
  }
];

export const upgrades: PremiumUpgrade[] = [
  {
    id: "up1",
    name: "Japanese Head Spa",
    benefit: "Deep scalp detox and stress relief",
    price: "₹2,500",
    imageUrl: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800",
    tags: ["japanese_spa", "relaxation", "stress", "hair_fall"]
  },
  {
    id: "up2",
    name: "Glass Skin Facial",
    benefit: "Korean multi-step hydration for ultimate glow",
    price: "₹3,500",
    imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800",
    tags: ["glass_skin", "glowing_skin", "dull_skin", "pigmentation"]
  },
  {
    id: "up3",
    name: "CBD Aromatherapy Massage",
    benefit: "Maximum pain relief and muscle relaxation",
    price: "₹4,000",
    imageUrl: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800",
    tags: ["cbd_massage", "stress", "aroma_massage"]
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
    tags: ["dull_skin", "pigmentation"]
  },
  {
    id: "p2",
    name: "Hair Growth Serum",
    benefit: "Nourishes follicles to promote growth",
    bestFor: "Thinning & Dry Scalps",
    price: "₹1,650",
    imageUrl: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=600",
    tags: ["hair_fall", "hair_serum"]
  },
  {
    id: "p3",
    name: "Keratin Hair Mask",
    benefit: "Deep conditioning weekly repair",
    bestFor: "Frizzy & Damaged Hair",
    price: "₹1,500",
    imageUrl: "https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80&w=600",
    tags: ["frizzy_hair", "damaged_hair", "hair_care_kit"]
  },
  {
    id: "p4",
    name: "Anti-Acne Face Wash",
    benefit: "Cleanses pores and removes excess oil",
    bestFor: "Oily & Acne-Prone Skin",
    price: "₹650",
    imageUrl: "https://images.unsplash.com/photo-1556228720-192a6af4e865?auto=format&fit=crop&q=80&w=600",
    tags: ["acne", "oily", "acne_prone"]
  }
];

export const addons: AddOn[] = [
  {
    id: "ao1",
    name: "Post-Facial Exfoliant",
    benefit: "Maintain your clear skin at home",
    price: "₹900",
    imageUrl: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=600",
    tags: ["exfoliant", "facial"]
  },
  {
    id: "ao2",
    name: "Nourishing Hair Care Kit",
    benefit: "Prolong your smoothing treatment",
    price: "₹2,200",
    imageUrl: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4a2d?auto=format&fit=crop&q=80&w=600",
    tags: ["hair_care_kit", "keratin", "hair_botox"]
  },
  {
    id: "ao3",
    name: "Luxury Silk Pillowcase",
    benefit: "Reduces frizz and prevents fine lines",
    price: "₹1,800",
    imageUrl: "https://images.unsplash.com/photo-1615397323190-67a98eb3d4d3?auto=format&fit=crop&q=80&w=600",
    tags: ["silk_pillow", "frizzy_hair", "fine_lines"]
  }
];

export const memberships: Membership[] = [
  {
    id: "mem1",
    name: "Premium Spa Membership",
    description: "Unlimited relaxation and VIP perks designed for the ultimate self-care routine.",
    price: "₹4,999 / month",
    perks: [
      "1 Signature facial or massage per month",
      "20% off all retail products",
      "Priority booking",
      "Free branded luxury bathing suit"
    ],
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "mem2",
    name: "Essential Maintenance Plan",
    description: "Perfect for busy professionals who need quick, consistent upkeep.",
    price: "₹2,499 / month",
    perks: [
      "2 Blowouts or quick trims per month",
      "10% off all clinical treatments",
      "Complimentary scalp massage with every visit"
    ],
    imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800"
  }
];
