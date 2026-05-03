import connectDB from "@/lib/connectDB";
import { getMonthlyRequests } from "@/lib/db/requests";
import { NextResponse, NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/session";

connectDB();

export const revalidate = 0;

export async function GET(req: NextRequest, res: NextResponse) {
   const user = await getCurrentUser();

   if (user) {
      try {
         const requests = await getMonthlyRequests(user.id);
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
