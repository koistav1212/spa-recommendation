import { put } from "@vercel/blob";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No image uploaded" },
        { status: 400 }
      );
    }

    const allowedTypes = ["image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Only JPG images are allowed" },
        { status: 400 }
      );
    }

    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Image must be under 2MB" },
        { status: 400 }
      );
    }

    // Upload to Vercel Blob
    const blob = await put(`skin-analysis/${Date.now()}-${file.name}`, file, {
      access: "public",
      addRandomSuffix: true,
    });

    // Call Face++ API
    const faceForm = new FormData();
    faceForm.append("api_key", process.env.FACEPP_API_KEY!);
    faceForm.append("api_secret", process.env.FACEPP_API_SECRET!);
    faceForm.append("image_url", blob.url);

    const response = await axios.post(
      "https://api-us.faceplusplus.com/facepp/v1/skinanalyze",
      faceForm,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const result = response.data?.result || {};

    const parsedResult = {
      imageUrl: blob.url,
      skinType:
        result.skin_type === 0
          ? "Oily"
          : result.skin_type === 1
          ? "Dry"
          : result.skin_type === 2
          ? "Normal"
          : "Combination",

      darkCircles: result.dark_circle?.value === "1",
      eyePouch: result.eye_pouch?.value === "1",
      acne: result.acne?.value === 1,
      blackheads: result.blackhead?.value === "1",
      foreheadWrinkles: result.forehead_wrinkle?.value === "1",
      crowFeet: result.crows_feet?.value === "1",
      eyeFineLines: result.eye_finelines?.value === "1",
      glabellaWrinkle: result.glabella_wrinkle?.value === "1",
      nasolabialFold: result.nasolabial_fold?.value === "1",

      pores: {
        forehead: result.pores_forehead?.value === "1",
        leftCheek: result.pores_left_cheek?.value === "1",
        rightCheek: result.pores_right_cheek?.value === "1",
        jaw: result.pores_jaw?.value === "1",
      },

      skinSpot: result.skin_spot?.value === 1,
      mole: result.mole?.value === 1,

      warnings: response.data?.warning || [],
      faceRectangle: response.data?.face_rectangle || null,
    };

    return NextResponse.json(parsedResult);
  } catch (error: any) {
    console.error(error?.response?.data || error);

    return NextResponse.json(
      {
        error: "Failed to analyze skin",
        details: error?.response?.data || null,
      },
      { status: 500 }
    );
  }
}
