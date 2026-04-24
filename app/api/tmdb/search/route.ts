import { NextResponse } from "next/server";
import { fetchTMDBBySearch, fetchTMDBById } from "@/lib/external/tmdb";
import { getCurrentUser } from "@/lib/session";

export async function GET(req: Request) {
   const user = await getCurrentUser();

   if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   }

   const { searchParams } = new URL(req.url);
   const query = searchParams.get("query");
   const year = searchParams.get("year");
   const imdbId = searchParams.get("imdbId");

   if (!query) {
      return Response.json({ error: "Missing query" }, { status: 400 });
   }

   let results = "";
   if (query) {
      results = await fetchTMDBBySearch(query);
   }

   if (year) {
      //results = await fetchTMDBSearch(year);
   }

   if (imdbId) {
      results = await fetchTMDBById(imdbId);
   }

   return Response.json(results);
}
