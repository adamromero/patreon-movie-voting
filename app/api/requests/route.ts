import { getRequests, addRequest, getMonthlySummary } from "@/lib/db/requests";
import { NextResponse, NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { buildRequestPayload } from "@/lib/services/requests/buildRequest";

export async function GET(req: NextRequest, res: NextResponse) {
   try {
      const requests = await getRequests();
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
}

export async function POST(req: NextRequest, res: NextResponse) {
   const user = await getCurrentUser();

   if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   }

   const body = await req.json();

   const payload = await buildRequestPayload({
      request: body,
      userId: user.id,
   });

   try {
      const request = await addRequest(user, payload);
      const summary = await getMonthlySummary(user);
      return NextResponse.json({ request, summary });
   } catch (err: any) {
      return NextResponse.json(
         {
            error: err.message,
         },
         { status: 400 },
      );
   }
}
