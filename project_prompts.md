# LuxeSpa: Reverse Engineering the Generative Prompts

If a developer wanted to build the exact same **LuxeSpa AI-Recommendation Engine** from an empty folder using an LLM, here are the 10 master prompts they would use. These prompts highlight the structured architectural thinking, strict data boundaries, and UX constraints utilized in this project.

---

### Prompt 1: Core Architecture & State Management
**Directive:** "We are building a highly interactive, 5-step React application using Next.js (App Router), TailwindCSS, and Framer Motion. Create a centralized controller in \`src/app/page.tsx\` that manages an absolute state machine with the following steps: \`welcome > analyze > quiz > lead > result\`. Ensure state transitions only occur linearly. Use a shared state context to store global \`answers\` (Record<string, string[]>), \`faceData\` (FaceAnalysisData), and \`result\` (RecommendationResult). Ensure the UI does not use native browser routing to maintain a seamless single-page application experience."

### Prompt 2: Design System & Luxury Welcome Screen
**Directive:** "Design a premium, luxury-focused \`WelcomeScreen\` component mimicking top brands like L'Oreal. Establish a CSS token system (\`--color-spa-dark\`, \`--color-spa-gold\`, \`--color-spa-beige\`). The entire screen must be strictly locked to \`100dvh\` utilizing \`overflow-hidden\` to prevent vertical scrolling. Feature a large hero section with glassmorphism styling, and implement exactly 3 promotional banners at the bottom. On mobile views, these 3 banners must morph from a grid into a \`flex overflow-x-auto snap-x\` horizontal swiper so they do not break the 100vh boundary."

### Prompt 3: Face++ API & Cloud Blob Integration
**Directive:** "Build a Next.js backend API route (\`/api/skin-analyze/route.ts\`). Wait for the frontend to submit a \`FormData\` image file. Before parsing, push the file to Vercel Blob Storage using \`@vercel/blob\` and return its public URL. Immediately pipe that generated URL to the Face++ \`/facepp/v1/skinanalyze\` API endpoint using \`axios.post\`. Extract specific markers from the response JSON: \`skinType\`, \`acne\`, \`dark_circle\`, and \`pores\`. Map these results to a custom frontend \`FaceAnalysisData\` interface. Implement try/catch blocks with graceful degrading if Face++ throws a 403 authorization error."

### Prompt 4: Diagnostic Quiz & Branching Logic
**Directive:** "Build a highly responsive \`ProfileBuilder\` questionnaire component. It must use intelligent branching logic based on the first question (Gender: Male vs Female), rendering entirely different sets of questions downstream. Allow multiple active selection states per question. Store answers dynamically locally, and expose a final \`onComplete\` callback that packages the answers into an optimized payload array. Use minimalist iconography (Lucide react) for each card option and smooth Framer Motion transitions between questions."

### Prompt 5: Hardcoded Algorithmic Recommendation Engine
**Directive:** "Create a strict rules engine in \`src/lib/engine.ts\` that intakes the user's \`answers\` and \`FaceAnalysisData\`. Build conditional logic that outputs a unified \`RecommendationResult\` object consisting of 6 parts: 1) \`salonPackage\`, 2) \`premiumUpgrade\`, 3) \`homeCareProducts\`, 4) \`recommendedAddOn\`, 5) \`idealMembership\`, and 6) \`limitedTimeOffer\`. Ensure that if a user has 'Oily' skin with 'Acne', the engine specifically targets the 'Acne Clearing + Detox Facial', but if they have 'Dry' skin, it routes to 'Glass Skin Rejuvenation'. Every branch must have a unique, highly personalized textual \`packageReason\` explaining *why* it was selected."

### Prompt 6: Dashboard Dashboard Assembly
**Directive:** "Construct a \`ResultScreen\` component that visually renders the \`RecommendationResult\` payload. It must feature a dark \`overflow-hidden\` header banner showcasing the main reason for recommendation. Underneath, construct a bento-box style CSS grid mapping out the clinical skin diagnostic scores, the recommended core package (with duration and price), the premium upgrade, and iterate over the \`homeCareProducts\` array to render separate product cards. Include a sticky CTA 'Book on WhatsApp Now' locked to the bottom of the viewport."

### Prompt 7: AI Chatbot UI Component Architecture
**Directive:** "Design a globally persistent AI Chatbot interface (\`Chatbot.tsx\`). When unopened, it should cleanly render as a floating pill button positioned at \`bottom-[100px]\` to avoid overlapping the WhatsApp CTA. When \`isOpen\` state is triggered, expand into a 400x600px overlay modal. Implement a smart suggestion queue that always prioritizes a 'How can I book an appointment?' button, followed by dynamically curated FAQ chips customized by assessing the user's \`result\` (e.g., if they were recommended 'HydraFacial', inject a relevant 'What is HydraFacial' FAQ into the initial mount array)."

### Prompt 8: LLM API Handlers with OpenRouter Fallbacks
**Directive:** "Create a chatbot backend route \`/api/chat/route.ts\`. Construct a \`slimContext\` payload containing critical user diagnosis flags (acne, skin type, recommended package). Build an asynchronous function \`getOpenRouterReply\` that loops sequentially through an array of models: \`meta-llama/llama-3.3-70b-instruct\`, \`qwen/qwen-3.6-plus\`, \`nvidia/nemotron-3-super\`. Fetch against the OpenRouter completions endpoint. The moment a model successfully returns a \`response.ok\`, immediately break the loop and return the content. Force a strict system prompt overriding the AI's persona to act as a luxury spa concierge and absolutely forbidding medical diagnosis."

### Prompt 9: Event-Driven UI Bypassing
**Directive:** "Architect an event-driven flow to avoid massive prop drilling across the app steps. Instantiate a global \`useEffect()\` listener in \`page.tsx\` listening for a custom event named \`open-booking-modal\`. Update both the \`WelcomeScreen\` header 'Book Appointment' button AND a specific \`Chatbot\` intent watcher (when the user asks 'how do I book') to execute \`window.dispatchEvent(new Event('open-booking-modal'))\`. This must immediately hijack the user's screen context no matter where they are in the application."

### Prompt 10: Multi-Step Interactive Booking Engine Modal
**Directive:** "Design a multi-step \`BookingModal.tsx\` overlay utilizing Framer Motion. 
**Step 1:** Generate a horizontal Javascript slider for the next 14 dynamic dates. Map time slots strictly into Morning, Afternoon, and Evening grids. Hardcode simulated 'red' booked-out unavailable slots. 
**Step 2:** Form entry. Require a Name, Email, and rigidly test the Phone input against an Indian Regex (\`^[6-9]\d{9}$\`). Implement a dropdown selector with 10 premium salon treatments. 
Submit this payload to \`/api/book/route.ts\`, which must console log the mapped data resembling a downstream Google Sheets service account integration, delayed by an 800ms timeout for UI authenticity, followed by a 'Success' checkmark animation frame."
