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

   if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error);
   }

   return res.json();
}
