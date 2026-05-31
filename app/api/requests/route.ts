import { getRequests, addRequest, getMonthlySummary } from "@/lib/db/requests";
import { NextResponse, NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { buildRequestPayload } from "@/lib/services/requests/buildRequest";

export async function GET(req: NextRequest, res: NextResponse) {
   const { searchParams } = new URL(req.url);

   const page = Number(searchParams.get("page") || 1);
   const limit = Number(searchParams.get("limit") || 50);

   //const search = searchParams.get("search");
   const genre = searchParams.get("genre");
   const type = searchParams.get("type");
   const status = searchParams.get("status");
   const requests = searchParams.get("requests");

   const sort = searchParams.get("sort") || "votes";
   const order = searchParams.get("order") || "newer";

   const title = searchParams.get("title");
   const director = searchParams.get("director");
   const actor = searchParams.get("actor");
   const composer = searchParams.get("composer");

   try {
      const requests = await getRequests({
         page,
         limit,
         sort,
         order,
         genre,
         type,
         status,
         title,
         actor,
         director,
         composer,
      });
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
