import { getRequests, addRequest, getMonthlySummary } from "@/lib/db/requests";
import { NextResponse, NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { buildRequestPayload } from "@/lib/services/requests/buildRequest";

export async function GET(req: NextRequest, res: NextResponse) {
   const user = await getCurrentUser();
   const userId = user ? user.id : null;

   const { searchParams } = new URL(req.url);

   const page = Number(searchParams.get("page") || 1);
   const limit = Number(searchParams.get("limit") || 50);

   const genre = searchParams.get("genre");
   const type = searchParams.get("type");
   const status = searchParams.get("status");
   const myrequests = searchParams.get("myrequests");

   const sort = searchParams.get("sort") || "va";
   const sortstatus = searchParams.get("sortstatus");

   const title = searchParams.get("title");
   const director = searchParams.get("director");
   const actor = searchParams.get("actor");
   const composer = searchParams.get("composer");

   try {
      const options = {
         page,
         limit,
         sort,
         sortstatus,
         genre,
         type,
         status,
         myrequests,
         title,
         actor,
         director,
         composer,
      };

      const requests = await getRequests(options, userId);

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
