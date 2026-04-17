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
  dependency?: { questionId: string; value: string };
}

export const questions: Question[] = [
  {
    id: "q1_gender",
    title: "How do you identify?",
    options: [
      { id: "female", label: "Female", iconName: "Venus" },
      { id: "male", label: "Male", iconName: "Mars" },
      { id: "other", label: "Other", iconName: "User" } // Map 'other' to standard flow if needed
    ]
  },
  {
    id: "q2_age",
    title: "What is your age range?",
    options: [
      { id: "under25", label: "Under 25", iconName: "BatteryFull" },
      { id: "25-35", label: "25 - 35", iconName: "BatteryMedium" },
      { id: "36-45", label: "36 - 45", iconName: "BatteryLow" },
      { id: "45+", label: "45+", iconName: "BatteryWarning" }
    ]
  },
  {
    id: "q3_skintype",
    title: "How does your skin instinctively feel by midday?",
    options: [
      { id: "oily", label: "Oily & Shiny", iconName: "Droplet" },
      { id: "dry", label: "Tight & Patchy", iconName: "Wind" },
      { id: "normal", label: "Balanced", iconName: "CheckCircle" },
      { id: "sensitive", label: "Red & Reactive", iconName: "AlertCircle" }
    ]
  },
  {
    id: "q4_female_skin_problem",
    title: "What is your primary clinical skin concern?",
    dependency: { questionId: "q1_gender", value: "female" },
    options: [
      { id: "hormonal_acne", label: "Hormonal Breakouts", iconName: "Target" },
      { id: "melasma", label: "Pigmentation / Melasma", iconName: "SunDim" },
      { id: "fine_lines", label: "Fine Lines & Laxity", iconName: "TrendingDown" },
      { id: "dullness", label: "Dullness & Uneven Tone", iconName: "CloudFog" }
    ]
  },
  {
    id: "q4_male_skin_problem",
    title: "What is your primary clinical skin or beard concern?",
    dependency: { questionId: "q1_gender", value: "male" },
    options: [
      { id: "razor_bumps", label: "Razor Bumps & Ingrowns", iconName: "Scissors" },
      { id: "oily_pores", label: "Oily T-Zone & Enlarged Pores", iconName: "Focus" },
      { id: "beard_dandruff", label: "Beard Dandruff / Itch", iconName: "Snowflake" },
      { id: "uneven_tone", label: "Uneven Tone & Tan", iconName: "Sun" }
    ]
  },
  {
    id: "q5_hair_concern",
    title: "How would you diagnose your hair health right now?",
    options: [
      { id: "hairfall", label: "Excessive Shedding / Fall", iconName: "TrendingDown" },
      { id: "thinning", label: "Pattern Thinning", iconName: "Minimize2" },
      { id: "damaged", label: "Brittle & Damaged", iconName: "Zap" },
      { id: "scalp_issues", label: "Scalp Sensitivities", iconName: "Activity" }
    ]
  },
  {
    id: "q6_past_treatments",
    title: "Have you recently undergone any clinical treatments?",
    options: [
      { id: "yes_skin", label: "Yes - Lasers or Chemical Peels", iconName: "Stethoscope" },
      { id: "yes_hair", label: "Yes - Chemical Hair Services", iconName: "FlaskConical" },
      { id: "none", label: "None Previously", iconName: "CircleSlash" },
      { id: "exploring", label: "No, but actively exploring", iconName: "Search" }
    ]
  },
  {
    id: "q7_lifestyle",
    title: "What represents your primary environmental stressor?",
    options: [
      { id: "sun_pollution", label: "High UV & Urban Pollution", iconName: "Smog" },
      { id: "ac_indoors", label: "Continuous A/C & Indoor Dryness", iconName: "ThermometerSnowflake" },
      { id: "screen_time", label: "High Screen Time (Blue Light)", iconName: "Monitor" },
      { id: "stress", label: "High Occupational Stress", iconName: "BrainCircuit" }
    ]
  },
  {
    id: "q8_goal",
    title: "What is the targeted objective for your next salon visit?",
    options: [
      { id: "clinical_correction", label: "Deep Clinical Correction", iconName: "Activity" },
      { id: "event_glow", label: "Pre-Event Radiance / Glow", iconName: "Sparkles" },
      { id: "deep_relaxation", label: "Detoxification & Relaxation", iconName: "Leaf" },
      { id: "maintenance", label: "Routine Maintenance", iconName: "Repeat" }
    ]
  },
    {
    id: "q9_scalp_type",
    title: "How would you describe your scalp type?",
    options: [
      { id: "oily_scalp", label: "Oily", iconName: "Droplet" },
      { id: "dry_scalp", label: "Dry", iconName: "Wind" },
      { id: "normal_scalp", label: "Normal", iconName: "CheckCircle" },
      { id: "sensitive_scalp", label: "Sensitive", iconName: "AlertCircle" }
    ]
  },
  {
    id: "q10_makeup_usage",
    title: "How often do you wear makeup?",
    options: [
      { id: "never_makeup", label: "Never", iconName: "CircleSlash" },
      { id: "occasionally_makeup", label: "Occasionally", iconName: "Brush" },
      { id: "frequently_makeup", label: "Frequently", iconName: "Palette" },
      { id: "daily_makeup", label: "Daily", iconName: "Sparkles" }
    ]
  },
  {
    id: "q11_beard_type",
    title: "What best describes your beard style?",
    dependency: { questionId: "q1_gender", value: "male" },
    options: [
      { id: "clean_shaven", label: "Clean Shaven", iconName: "Circle" },
      { id: "light_beard", label: "Light Beard", iconName: "Minus" },
      { id: "medium_beard", label: "Medium Beard", iconName: "AlignCenter" },
      { id: "thick_beard", label: "Thick Beard", iconName: "Layers3" }
    ]
  },
  {
    id: "q12_treatment_duration",
    title: "How much time can you usually dedicate to treatments?",
    options: [
      { id: "under_30", label: "Under 30 mins", iconName: "Timer" },
      { id: "30_60", label: "30–60 mins", iconName: "Clock3" },
      { id: "1_2_hours", label: "1–2 hours", iconName: "Clock6" },
      { id: "full_day", label: "Full Day", iconName: "CalendarDays" }
    ]
  },
  {
    id: "q13_ambience",
    title: "What kind of salon atmosphere do you prefer?",
    options: [
      { id: "luxury", label: "Luxury", iconName: "Gem" },
      { id: "relaxing", label: "Relaxing", iconName: "Leaf" },
      { id: "quick_service", label: "Quick Service", iconName: "Zap" },
      { id: "premium_clinical", label: "Premium Clinical", iconName: "Stethoscope" },
      { id: "budget_friendly", label: "Budget Friendly", iconName: "Wallet" }
    ]
  },
  {
    id: "q14_treatment_time",
    title: "When do you usually prefer salon appointments?",
    options: [
      { id: "morning", label: "Morning", iconName: "Sunrise" },
      { id: "afternoon", label: "Afternoon", iconName: "Sun" },
      { id: "evening", label: "Evening", iconName: "Moon" },
      { id: "weekend_only", label: "Weekend Only", iconName: "CalendarRange" }
    ]
  },
  {
    id: "q15_service_type",
    title: "Which service category interests you the most?",
    options: [
      { id: "skincare", label: "Skincare", iconName: "Sparkles" },
      { id: "haircare", label: "Haircare", iconName: "Scissors" },
      { id: "spa_massage", label: "Spa / Massage", iconName: "Flower2" },
      { id: "nail_care", label: "Nail Care", iconName: "Hand" },
      { id: "makeup", label: "Makeup", iconName: "Brush" },
      { id: "full_package", label: "Full Package", iconName: "Package" }
    ]
  },
  {
    id: "q16_membership",
    title: "Would you be interested in monthly salon memberships?",
    options: [
      { id: "membership_yes", label: "Yes", iconName: "BadgeCheck" },
      { id: "membership_no", label: "No", iconName: "CircleSlash" },
      { id: "membership_maybe", label: "Maybe", iconName: "HelpCircle" }
    ]
  }
];
