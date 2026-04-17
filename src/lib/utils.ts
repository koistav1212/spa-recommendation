import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// REPLACE THESE VALUES WITH YOUR GOOGLE FORM DETAILS
// 1. Get the action URL from your form's HTML source (it ends with formResponse)
const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/d/e/YOUR_FORM_ID_HERE/formResponse";

// 2. Map your form's entry IDs to the data keys.
// To find these, inspect the Google form or view source and look for 'entry.123456789'
const FORM_ENTRY_IDS = {
  name: "entry.123456789", // Replace with actual entry ID for Name
  phone: "entry.234567890", // Replace with actual entry ID for Phone
  email: "entry.345678901", // Replace with actual entry ID for Email
  answers: "entry.456789012" // Replace with actual entry ID for Answers dump (optional)
};

export async function submitToGoogleForm(data: { name: string; phone: string; email: string; answers: Record<string, string> }) {
  // If you don't have a backend, you can POST directly to Google Forms using no-cors
  const formData = new FormData();
  
  formData.append(FORM_ENTRY_IDS.name, data.name);
  formData.append(FORM_ENTRY_IDS.phone, data.phone);
  if (data.email) formData.append(FORM_ENTRY_IDS.email, data.email);
  
  // Format answers for a single text field, or map to individual entry IDs if you created a field for each
  const answersString = Object.entries(data.answers)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
  formData.append(FORM_ENTRY_IDS.answers, answersString);

  try {
    await fetch(GOOGLE_FORM_ACTION_URL, {
      method: "POST",
      mode: "no-cors", // Required to avoid CORS issues on frontend
      body: formData,
    });
    // Since it's no-cors, we won't get a readable response back, but it usually succeeds
    return true;
  } catch (error) {
    console.error("Google Forms submission failed:", error);
    // Optional: Return true anyway to not block the user if analytics fail
    return false;
  }
}
