import connectDB from "@/lib/connectDB";
import { lookupRequestsByTmdbIds } from "@/lib/services/requests/lookupRequest";
import { NextResponse, NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/session";

connectDB();

export async function POST(req: NextRequest, res: NextResponse) {
   const user = await getCurrentUser();

   if (user) {
      try {
         const { items } = await req.json();
         const requests = await lookupRequestsByTmdbIds(items);
         return NextResponse.json(requests);
      } catch (error) {
         let message = "Unknown error";

         if (error instanceof Error) {
            message = error.message;
         }
         return NextResponse.json({
            error: "Unable to fetch requests from the database.",
            details: message,
         });
      }
   } else {
      return NextResponse.json({
         error: "Unable to fetch requests from the database.",
      });
   }
}
