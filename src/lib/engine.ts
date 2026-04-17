import { treatments, products, Treatment, Product } from "./data/recommendations";

export type UserProfile = Record<string, string>;

export type RecommendationResult = {
  topTreatments: Treatment[];
  similarTreatments: Treatment[];
  topProducts: Product[];
  routine: {
    morning: Product[];
    evening: Product[];
    weekly: Product[];
  };
  visitFrequency: string;
  personalizedMessage: string;
};

export function generateRecommendations(answers: UserProfile): RecommendationResult {
  // Extract key answers from the new 9-question scientific logic
  const gender = answers["q1_gender"];
  const age = answers["q2_age"];
  const skinFeel = answers["q3_skintype"];
  const femaleSkinCore = answers["q4_female_skin_problem"];
  const maleSkinCore = answers["q4_male_skin_problem"];
  const hairHealth = answers["q5_hair_concern"];
  const pastTreatments = answers["q6_past_treatments"];
  const environment = answers["q7_lifestyle"];
  const goal = answers["q8_goal"];
  
  // Condense the core skin problem based on gender dependency
  const primarySkinConcern = gender === "male" ? maleSkinCore : femaleSkinCore;

  // Score treatments based on keyword matching
  const scoredTreatments = treatments.map(t => {
    let score = 0;
    const tagMatch = (target: string | undefined) => {
      if (target && t.tags.includes(target)) score += 2;
    };

    tagMatch(skinFeel);
    tagMatch(primarySkinConcern);
    tagMatch(hairHealth);
    tagMatch(goal);
    
    if (environment === "sun_pollution" && t.tags.includes("tan")) score += 3;
    if (goal === "deep_relaxation" && t.tags.includes("relaxation")) score += 3;

    return { ...t, score };
  });

  const sortedTreatments = scoredTreatments.sort((a, b) => b.score - a.score);
  const topTreatments = sortedTreatments.slice(0, 2); // Show top 2 exclusively
  const similarTreatments = sortedTreatments.slice(2, 5); // 3 for "People Also Chose"
  
  // Advanced Products recommendation parsing
  // Let's just recommend everything from our explicit 8-product database if they match routines
  const routine = {
    morning: products.filter(p => p.routine === "morning"),
    evening: products.filter(p => p.routine === "evening"),
    weekly: products.filter(p => p.routine === "weekly")
  };

  // Generate hyper-personalized copy
  let skinCopy = "balanced";
  if (skinFeel === "oily") skinCopy = "reactive oily";
  if (skinFeel === "dry") skinCopy = "dry and patchy";
  if (skinFeel === "sensitive") skinCopy = "highly sensitive";

  const message = `Based on your clinical profile, you possess ${skinCopy} skin with primary indicators of ${primarySkinConcern ? primarySkinConcern.replace('_', ' ') : 'stress'}. We've algorithmically curated a protocol exactly tailored for your needs.`;

  return {
    topTreatments,
    similarTreatments,
    topProducts: products, // Return all for the full routine mapping
    routine,
    visitFrequency: "Monthly",
    personalizedMessage: message
  };
}
