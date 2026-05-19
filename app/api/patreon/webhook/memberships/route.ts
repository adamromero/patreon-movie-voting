import handlePledge from "@/lib/services/requests/handlePledge";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
   try {
      const event = req.headers.get("x-patreon-event");
      const request = await req.json();
      const result = await handlePledge(event, request);
      return NextResponse.json(result);
   } catch (error) {
      console.error("Patreon webhook error:", error);
      return NextResponse.json(
         { error: "Internal server error" },
         { status: 500 },
      );
   }
}
