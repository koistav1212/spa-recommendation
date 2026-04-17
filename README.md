# Beauty Profile Builder + Personalized Recommendation Tool

A premium, mobile-first Next.js lead magnet web application tailored for salons, spas, and wellness brands. It guides users through an Apple-style multi-step questionnaire and provides specialized treatment/product recommendations while capturing leads directly into Google Forms.

## Tech Stack
- Next.js (App Router)
- React Hooks for state management
- Tailwind CSS (v4)
- Framer Motion (Animations)
- Lucide React (Icons)
- Vercel (Deployment Ready)
- Google Forms (Backend-less submission)

## File Structure Highlights
- `/src/app/globals.css`: Contains CSS variables for the global brand aesthetic.
- `/src/components/screens/`: Represents the 4 key stages of the flow.
- `/src/lib/data/`: `questions.ts` defines all dynamic form steps; `recommendations.ts` contains your inventory mock images and specs.
- `/src/lib/engine.ts`: Holds the ranking algorithm matching quizzes to products.
- `/src/lib/utils.ts`: Utility for integrating Google Form logic.

## Configuration & Customization 

### Google Forms Setup (No Backend Needed!)
This application uses a hidden Google Form submission route.
1. Create a Google Form with three short response fields: `Name`, `Phone`, `Email` and optionally an `Answers` paragraph field.
2. View your live form, right click and select "Inspect". 
3. Search for `<form action="...formResponse">`. Copy the URL.
4. Search for the `name=` attribute of your input fields (e.g., `entry.1234567`). 
5. Open `/src/lib/utils.ts` in your codebase.
6. Replace `GOOGLE_FORM_ACTION_URL` and `FORM_ENTRY_IDS` with your exact values.

### WhatsApp Customization
1. Open `/src/components/ui/WhatsAppCTA.tsx`.
2. Find `phone="919876543210"` inside `ResultScreen.tsx` usage, or the default string, and replace it with your business's WhatsApp number.

### Aesthetics & Brand Kit
- Update `/src/app/globals.css` with your `var(--color-spa-...)` variables to shift from beige/gold to another palette.
- Replace placeholder images in `src/lib/data/recommendations.ts` with real asset URLs from your CMS or local `/public` folder.

## Running Locally

1. `npm install`
2. `npm run dev`
3. Visit `http://localhost:3000`

## Deployment

Simply connect this repository to your Vercel account and click "Deploy". Zero backend environment variables require initial configuration unless you extract the Google Form ids to an `.env` file for best practices.
