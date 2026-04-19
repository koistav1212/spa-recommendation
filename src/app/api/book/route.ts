import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, phone, treatment, date, timeSlot } = body;

    // VERY rudimentary validation for the backend
    if (!name || !phone || !date || !timeSlot) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Connect to Google Sheets here. Example implementation pseudo-code:
    /*
      const { GoogleSpreadsheet } = require('google-spreadsheet');
      const doc = new GoogleSpreadsheet('YOUR_SPREADSHEET_ID');
      await doc.useServiceAccountAuth(require('./credentials.json'));
      await doc.loadInfo(); 
      const sheet = doc.sheetsByIndex[0];
      await sheet.addRow({
         Timestamp: new Date().toISOString(),
         Name: name, 
         Email: email || 'N/A', 
         Phone: phone, 
         Treatment: treatment, 
         Date: date, 
         Time: timeSlot 
      });
    */

    console.log("✅ SUCCESS: Mocking Data Upload to Google Sheets:");
    console.table({ name, email, phone, treatment, date, timeSlot });

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    return NextResponse.json({ success: true, message: "Appointment booked!" }, { status: 200 });

  } catch (error) {
    console.error("Booking Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
