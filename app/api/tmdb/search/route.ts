import { NextResponse } from "next/server";
import { searchTitles } from "@/lib/external/tmdb/search";
import { getCurrentUser } from "@/lib/session";

export async function GET(req: Request) {
   const user = await getCurrentUser();

   if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   }

   const { searchParams } = new URL(req.url);

   const query = searchParams.get("query") || undefined;
   const year = searchParams.get("year") || undefined;
   const imdbId = searchParams.get("imdbId") || undefined;

   try {
      const results = await searchTitles({
         query,
         year,
         imdbId,
      });

      return Response.json(results);
   } catch (err: any) {
      return Response.json({ error: err.message }, { status: 400 });
   }
}
