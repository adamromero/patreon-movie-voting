export async function searchTitlesApi(params: {
   query?: string;
   year?: string;
   imdbId?: string;
}) {
   const url = new URL("/api/tmdb/search", window.location.origin);

   if (params.query) url.searchParams.set("query", params.query);
   if (params.year) url.searchParams.set("year", params.year);
   if (params.imdbId) url.searchParams.set("imdbId", params.imdbId);

   const res = await fetch(url.toString());
   const payload = await res.json().catch(() => null);

   if (!res.ok) {
      throw new Error(payload?.error || "Failed to return any search results");
   }

   return payload;
}
