import sessionCleanup from "@/lib/services/requests/sessionCleanup";
import { NextResponse } from "next/server";

export async function GET() {
   try {
      const result = await sessionCleanup();
      return NextResponse.json(result);
   } catch (error) {
      return NextResponse.json({
         error: (error as Error).message,
      });
   }
}
