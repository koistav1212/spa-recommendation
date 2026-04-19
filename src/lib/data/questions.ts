export type Option = {
  id: string;
  label: string;
  iconName?: string;
  imageUrl?: string;
}

export type Question = {
  id: string;
  title: string;
  options: Option[];
  allowMultiple?: boolean;
}

export const questions: Question[] = [
  {
    id: "q1_goal",
    title: "1. What’s your dream beauty result?",
    options: [
      { id: "frizz_free", label: "Frizz-free & smooth hair", iconName: "Sparkles" },
      { id: "thicker_hair", label: "Thicker, fuller hair", iconName: "Layers" },
      { id: "healthier_hair", label: "Healthier, shinier hair", iconName: "Sun" },
      { id: "glowing_skin", label: "Glowing skin", iconName: "SunDim" },
      { id: "acne_free", label: "Acne-free skin", iconName: "CloudSun" },
      { id: "younger_skin", label: "Younger-looking skin", iconName: "Clock" },
      { id: "relaxation", label: "Relaxation & stress relief", iconName: "Leaf" },
      { id: "bridal", label: "Bridal / event-ready look", iconName: "Camera" },
      { id: "low_maintenance", label: "Low-maintenance routine", iconName: "Coffee" }
    ]
  },
  {
    id: "q2_frustrations",
    title: "2. What’s frustrating you the most right now?",
    allowMultiple: true,
    options: [
      { id: "frizzy_hair", label: "Frizzy hair", iconName: "CloudLightning" },
      { id: "hair_fall", label: "Hair fall / thinning", iconName: "TrendingDown" },
      { id: "damaged_hair", label: "Dry or damaged hair", iconName: "Zap" },
      { id: "split_ends", label: "Split ends", iconName: "Scissors" },
      { id: "oily_scalp", label: "Oily scalp", iconName: "Droplet" },
      { id: "dull_skin", label: "Dull skin", iconName: "CloudFog" },
      { id: "acne", label: "Acne / breakouts", iconName: "AlertCircle" },
      { id: "dark_circles", label: "Dark circles", iconName: "Eye" },
      { id: "pigmentation", label: "Pigmentation", iconName: "Target" },
      { id: "stress", label: "Stress / body pain", iconName: "Activity" },
      { id: "brittle_nails", label: "Brittle nails", iconName: "Hand" },
      { id: "no_time", label: "Lack of time for self-care", iconName: "TimerOff" }
    ]
  },
  {
    id: "q3_hair_type",
    title: "3. What type of hair do you have?",
    options: [
      { id: "straight", label: "Straight", iconName: "AlignJustify" },
      { id: "wavy", label: "Wavy", iconName: "Waves" },
      { id: "curly", label: "Curly", iconName: "Infinity" },
      { id: "coily", label: "Coily", iconName: "CircleDot" },
      { id: "fine", label: "Fine / Thin", iconName: "Minus" },
      { id: "thick", label: "Thick / Dense", iconName: "Layers3" },
      { id: "chemically_treated", label: "Chemically treated", iconName: "FlaskConical" },
      { id: "color_treated", label: "Color-treated", iconName: "Palette" }
    ]
  },
  {
    id: "q4_skin_type",
    title: "4. What type of skin do you have?",
    options: [
      { id: "dry", label: "Dry", iconName: "Wind" },
      { id: "oily", label: "Oily", iconName: "Droplet" },
      { id: "combination", label: "Combination", iconName: "CircleDashed" },
      { id: "sensitive", label: "Sensitive", iconName: "AlertCircle" },
      { id: "acne_prone", label: "Acne-prone", iconName: "Target" },
      { id: "mature", label: "Mature / Aging", iconName: "History" }
    ]
  },
  {
    id: "q5_time",
    title: "5. How much time do you spend getting ready each day?",
    options: [
      { id: "under_10", label: "Under 10 minutes", iconName: "Clock1" },
      { id: "10_20", label: "10–20 minutes", iconName: "Clock3" },
      { id: "20_40", label: "20–40 minutes", iconName: "Clock6" },
      { id: "over_40", label: "Over 40 minutes", iconName: "Clock9" }
    ]
  },
  {
    id: "q6_experience",
    title: "6. What kind of salon experience are you looking for?",
    options: [
      { id: "quick_maintenance", label: "Quick maintenance", iconName: "Zap" },
      { id: "problem_solving", label: "Problem-solving treatment", iconName: "Stethoscope" },
      { id: "luxury", label: "Luxury self-care day", iconName: "Gem" },
      { id: "bridal_prep", label: "Bridal / special event prep", iconName: "Camera" },
      { id: "trendy", label: "Trendy new look", iconName: "Star" },
      { id: "relaxing", label: "Relaxing spa visit", iconName: "Leaf" }
    ]
  },
  {
    id: "q7_services",
    title: "7. Which services are you most interested in?",
    allowMultiple: true,
    options: [
      { id: "hair_spa", label: "Hair Spa", iconName: "Droplet" },
      { id: "hair_botox", label: "Hair Botox", iconName: "Sparkles" },
      { id: "keratin", label: "Keratin / Smoothing", iconName: "Scissors" },
      { id: "scalp", label: "Scalp Treatment", iconName: "Activity" },
      { id: "hair_color", label: "Hair Color", iconName: "Palette" },
      { id: "facial", label: "Facial", iconName: "SunDim" },
      { id: "hydrafacial", label: "HydraFacial", iconName: "Droplets" },
      { id: "mani_pedi", label: "Manicure / Pedicure", iconName: "Hand" },
      { id: "massage", label: "Massage Therapy", iconName: "Flower2" },
      { id: "makeup", label: "Bridal Makeup", iconName: "Brush" },
      { id: "lashes", label: "Lash Extensions", iconName: "Eye" },
      { id: "brows", label: "Brow Shaping", iconName: "Minus" }
    ]
  },
  {
    id: "q8_premium",
    title: "8. Which premium experience would you love to try?",
    options: [
      { id: "japanese_spa", label: "Japanese Head Spa", iconName: "Flower2" },
      { id: "hair_botox_premium", label: "Hair Botox", iconName: "Sparkles" },
      { id: "glass_skin", label: "Glass Skin Facial", iconName: "Sun" },
      { id: "luxury_pedicure", label: "Luxury Pedicure", iconName: "Hand" },
      { id: "cbd_massage", label: "CBD Massage", iconName: "Leaf" },
      { id: "aroma_massage", label: "Aromatherapy Massage", iconName: "Wind" },
      { id: "led_therapy", label: "LED Light Therapy", iconName: "SunMedium" },
      { id: "cryo_facial", label: "Cryotherapy Facial", iconName: "Snowflake" },
      { id: "scalp_detox", label: "Scalp Detox Treatment", iconName: "RefreshCcw" }
    ]
  },
  {
    id: "q9_event",
    title: "9. Do you have a special event coming up?",
    options: [
      { id: "wedding", label: "Wedding", iconName: "Heart" },
      { id: "vacation", label: "Vacation", iconName: "Plane" },
      { id: "birthday", label: "Birthday", iconName: "Cake" },
      { id: "festival", label: "Festival / Party", iconName: "Music" },
      { id: "date", label: "Date night", iconName: "GlassWater" },
      { id: "office", label: "Office event", iconName: "Briefcase" },
      { id: "none", label: "No special event", iconName: "CircleSlash" }
    ]
  },
  {
    id: "q10_budget",
    title: "10. What’s your budget for your ideal salon visit?",
    options: [
      { id: "under_1000", label: "Under ₹1,000", iconName: "Wallet" },
      { id: "1000_2500", label: "₹1,000–₹2,500", iconName: "CreditCard" },
      { id: "2500_5000", label: "₹2,500–₹5,000", iconName: "IndianRupee" },
      { id: "5000_10000", label: "₹5,000–₹10,000", iconName: "Banknote" },
      { id: "over_10000", label: "₹10,000+", iconName: "Gem" }
    ]
  },
  {
    id: "q11_perk",
    title: "11. Which extra perk would make your salon visit even better?",
    allowMultiple: true,
    options: [
      { id: "massage", label: "Complimentary scalp massage", iconName: "Hand" },
      { id: "skin_analysis", label: "Free skin analysis", iconName: "Search" },
      { id: "loyalty", label: "Loyalty rewards", iconName: "Gift" },
      { id: "membership", label: "Membership discounts", iconName: "Percent" },
      { id: "coffee", label: "Free coffee / refreshments", iconName: "Coffee" },
      { id: "products", label: "Product recommendations", iconName: "Package" },
      { id: "home_kit", label: "At-home care kit", iconName: "Home" },
      { id: "photos", label: "Before & after photos", iconName: "Camera" },
      { id: "vip", label: "VIP priority booking", iconName: "Star" }
    ]
  },
  {
    id: "q12_addon",
    title: "12. Which add-on would you most likely buy after your appointment?",
    options: [
      { id: "hair_care_kit", label: "Hair care kit after smoothing", iconName: "Package" },
      { id: "hair_serum", label: "Hair growth serum", iconName: "Droplet" },
      { id: "exfoliant", label: "Exfoliant after facial", iconName: "Sparkles" },
      { id: "nail_kit", label: "Nail care set after manicure", iconName: "Hand" },
      { id: "home_spa", label: "Home spa kit", iconName: "Home" },
      { id: "silk_pillow", label: "Silk pillowcase", iconName: "Moon" },
      { id: "travel", label: "Travel-size beauty essentials", iconName: "Plane" },
      { id: "membership", label: "Premium spa membership", iconName: "BadgeCheck" },
      { id: "membership_plus", label: "Premium membership + branded bathing suit", iconName: "Gem" }
    ]
  },
  {
    id: "q13_motivate",
    title: "13. What would motivate you to book today?",
    options: [
      { id: "free_consult", label: "Free consultation", iconName: "MessageCircle" },
      { id: "first_visit", label: "First visit discount", iconName: "Percent" },
      { id: "free_addon", label: "Free add-on service", iconName: "Gift" },
      { id: "personalized", label: "Personalized recommendation", iconName: "Star" },
      { id: "vip_offer", label: "VIP membership offer", iconName: "Crown" },
      { id: "limited_time", label: "Limited-time package", iconName: "Clock" },
      { id: "free_sample", label: "Free product sample", iconName: "PackageOpen" }
    ]
  }
];
