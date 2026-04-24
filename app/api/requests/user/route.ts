import connectDB from "@/lib/connectDB";
import { getUserRequests } from "@/lib/db/requests";
import { NextResponse, NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/session";

connectDB();

export async function GET(req: NextRequest, res: NextResponse) {
   const user = await getCurrentUser();

   if (user) {
      try {
         const requests = await getUserRequests(user.id);
         return NextResponse.json(requests);
      } catch (error) {
         let message = "Unknown error";

         if (error instanceof Error) {
            message = error.message;
         }
         return NextResponse.json({
            error: "Unable to fetch movie votes from the database.",
            details: message,
         });
      }
   } else {
      return NextResponse.json({
         error: "Unable to fetch movie votes from the database.",
      });
   }
}
