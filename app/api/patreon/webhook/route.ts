import { setOnChannel } from "@/lib/services/requests/setOnChannel";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
   try {
      const response = await req.json();
      const result = await setOnChannel(response);
      console.log(result);
   } catch (error) {
      return NextResponse.json({
         error: "Unable to update request status to on channel in the database.",
      });
   }
}
