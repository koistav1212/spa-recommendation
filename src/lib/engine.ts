import { packages, upgrades, products, addons, memberships, SalonPackage, PremiumUpgrade, Product, AddOn, Membership, LimitedOffer } from "./data/recommendations";

export type UserProfile = Record<string, string | string[]>;

export type FaceAnalysisData = {
  imageUrl: string;
  skinType: string;
  darkCircles: boolean;
  eyePouch: boolean;
  acne: boolean;
  blackheads: boolean;
  foreheadWrinkles: boolean;
  crowFeet: boolean;
  eyeFineLines: boolean;
  glabellaWrinkle: boolean;
  nasolabialFold: boolean;
  pores: { forehead: boolean; leftCheek: boolean; rightCheek: boolean; jaw: boolean; };
  skinSpot: boolean;
  mole: boolean;
};

export type RecommendationResult = {
  salonPackage: SalonPackage;
  packageReason: string;
  premiumUpgrade: PremiumUpgrade;
  homeCareProducts: Product[];
  recommendedAddOn: AddOn;
  idealMembership: Membership;
  limitedTimeOffer: LimitedOffer;
  clinicalFindings?: FaceAnalysisData; // Pass this to the UI
};

export function generateRecommendations(answers: UserProfile, faceData?: FaceAnalysisData | null): RecommendationResult {
  // Helper to check if a single answer or array of answers includes a target keyword
  const hasKeyword = (answer: string | string[] | undefined, target: string) => {
    if (!answer) return false;
    if (Array.isArray(answer)) {
      return answer.some(a => a.toLowerCase().includes(target.toLowerCase()));
    }
    return answer.toLowerCase().includes(target.toLowerCase());
  };

  // Get raw answers for matching
  const goal = answers["q1_goal"];
  const frustrations = answers["q2_frustrations"];
  const event = answers["q9_event"];
  const motivation = answers["q13_motivate"];

  // --- Score Packages ---
  const scoredPackages = packages.map(pkg => {
    let score = 0;
    if (hasKeyword(goal, "frizz") && pkg.tags.includes("frizzy_hair")) score += 3;
    if (hasKeyword(frustrations, "frizzy") && pkg.tags.includes("frizzy_hair")) score += 3;
    
    // Manual acne checks
    if (hasKeyword(goal, "acne") && pkg.tags.includes("acne")) score += 3;
    if (hasKeyword(frustrations, "acne") && pkg.tags.includes("acne")) score += 3;
    
    // Automated acne priority
    if (faceData?.acne && pkg.tags.includes("acne")) score += 5; // Higher priority for clinical detection
    if (faceData?.darkCircles && pkg.tags.includes("glowing_skin")) score += 3;
    if (faceData?.skinSpot && pkg.tags.includes("glowing_skin")) score += 3;

    if (hasKeyword(goal, "bridal") && pkg.tags.includes("bridal")) score += 4;
    if (hasKeyword(event, "wedding") && pkg.tags.includes("wedding")) score += 4;
    if (hasKeyword(frustrations, "hair_fall") && pkg.tags.includes("hair_fall")) score += 3;
    return { ...pkg, score };
  });
  
  const recommendedPackage = scoredPackages.sort((a, b) => b.score - a.score)[0] || packages[0];

  // --- Generate Justification String ---
  // Combine all user selected frustration keys nicely. e.g "hair_fall" -> "hair fall"
  let frustrationText = "";
  if (Array.isArray(frustrations)) {
    frustrationText = frustrations.map(f => f.replace("_", " ")).join(", ");
  } else if (typeof frustrations === "string") {
    frustrationText = frustrations.replace("_", " ");
  }

  const packageReason = `Because you mentioned struggling with ${frustrationText || "maintenance"}, we recommend a targeted package designed to give you long-lasting clinical results safely and effectively.`;

  // --- Score Premium Upgrades ---
  const scoredUpgrades = upgrades.map(up => {
    let score = 0;
    if (hasKeyword(goal, "relaxation") && up.tags.includes("relaxation")) score += 3;
    if (hasKeyword(frustrations, "stress") && up.tags.includes("stress")) score += 3;
    if (hasKeyword(goal, "glowing") && up.tags.includes("glowing_skin")) score += 3;
    return { ...up, score };
  });
  const recommendedUpgrade = scoredUpgrades.sort((a, b) => b.score - a.score)[0] || upgrades[0];

  // --- Select Products ---
  // Just select top 3 matching products simply, or all if short
  const recommendedProducts = products.slice(0, 3); // using top 3 for brevity

  // --- Select Add On ---
  // If they mentioned wanting an exfoliant, give it to them
  const addonAns = answers["q12_addon"];
  let recommendedAddon = addons[0];
  if (hasKeyword(addonAns, "care_kit")) recommendedAddon = addons.find(a => a.id === "ao2") || addons[0];
  if (hasKeyword(addonAns, "silk_pillow")) recommendedAddon = addons.find(a => a.id === "ao3") || addons[0];

  // --- Select Membership ---
  const membershipAns = answers["q16_membership"];
  let recommendedMembership = memberships[0]; // default premium
  if (hasKeyword(membershipAns, "maintenance")) recommendedMembership = memberships[1];

  // --- Create Mock Limited Offer based on motivation ---
  let offerTitle = "15% Off First Visit";
  if (hasKeyword(motivation, "consult")) offerTitle = "Free Expert Consultation";
  if (hasKeyword(motivation, "addon")) offerTitle = "Complimentary Add-on Service";
  
  const limitedTimeOffer: LimitedOffer = {
    id: "offer1",
    title: offerTitle,
    description: "Valid for bookings made in the next 48 hours. Show this code at the salon.",
    code: "BEAUTY60"
  };

  return {
    salonPackage: recommendedPackage,
    packageReason,
    premiumUpgrade: recommendedUpgrade,
    homeCareProducts: recommendedProducts,
    recommendedAddOn: recommendedAddon,
    idealMembership: recommendedMembership,
    limitedTimeOffer,
    clinicalFindings: faceData || undefined,
  };
}
