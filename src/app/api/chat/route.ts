// src/app/api/chat/route.ts

import { NextResponse } from "next/server";

async function getOpenRouterReply(messages: any[]) {
 const models = [
    "openrouter/free",
    "google/gemma-3-4b-it:free",
    "google/gemma-3-12b-it:free",
    "mistralai/mistral-small-3.1-24b-instruct:free",
    "meta-llama/llama-3.1-8b-instruct",
    "meta-llama/llama-3-8b-instruct"
  ];


  for (const model of models) {
    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://luxespa.com", 
            "X-Title": "Ayura Spa Concierge",
          },
          body: JSON.stringify({
            model: model,
            messages: messages,
            temperature: 0.7,
            max_tokens: 300,
          }),
        }
      );

      const data = await response.json();

      // If successful response and contains content, return it
      if (response.ok && data.choices?.[0]?.message?.content) {
        return data.choices[0].message.content;
      }

      console.error(`Model ${model} failed/returned empty:`, data);
    } catch (error) {
      console.error(`Network error for model ${model}:`, error);
    }
  }

  // If all models in the fallback loop fail, return null
  return null;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { message, answers, result } = body;

    const slimContext = {
      gender: answers?.q1_gender,
      ageGroup: answers?.q2_age_group,
      confidenceGoal: answers?.q3_confidence,
      frustrations: answers?.q2_frustrations,
      skinType: result?.clinicalFindings?.skinType,
      acne: result?.clinicalFindings?.acne,
      darkCircles: result?.clinicalFindings?.darkCircles,
      pores: result?.clinicalFindings?.pores,
      wrinkles: result?.clinicalFindings?.foreheadWrinkles,
      recommendedPackage: result?.salonPackage?.name,
      recommendedAddOn: result?.recommendedAddOn?.name,
      recommendedMembership: result?.idealMembership?.name,
      limitedOffer: result?.limitedTimeOffer?.title,
    };

    const messages = [
      {
        role: "system",
        content: `
You are AI Ayura, a premium spa and salon concierge.

Your tone:
- Friendly
- Luxurious
- Helpful
- Personalized
- Short and conversational

You only answer questions related to:
- Salon services
- Haircare
- Skincare
- Spa treatments
- Memberships
- Offers
- Home care
- Appointments

Never diagnose medical conditions.
If the user asks something medical, tell them to consult a dermatologist.

If the user asks how to book:
"You can use the Book Appointment button on the home screen or contact us on WhatsApp / call at +91 9876543021."

User context:
${JSON.stringify(slimContext, null, 2)}
        `,
      },
      {
        role: "user",
        content: message,
      },
    ];

    const replyContent = await getOpenRouterReply(messages);

    if (!replyContent) {
      return NextResponse.json({
        reply: "Sorry, I am unavailable right now due to high traffic. Please try again later or contact us directly.",
      });
    }

    return NextResponse.json({
      reply: replyContent,
    });
  } catch (error) {
    console.error("Endpoint crash:", error);

    return NextResponse.json({
      reply: "Something went wrong processing your request. Please try again.",
    });
  }
}
