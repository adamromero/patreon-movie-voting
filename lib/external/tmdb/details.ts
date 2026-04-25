import { normalizeMovieDetails, normalizeTVDetails } from "./normalize";

export async function fetchMovieDetails(tmdbId: number) {
   const apiKey = process.env.TMDB_API_KEY;

   const [detailsRes, creditsRes, releaseRes] = await Promise.all([
      fetch(`https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${apiKey}`),
      fetch(
         `https://api.themoviedb.org/3/movie/${tmdbId}/credits?api_key=${apiKey}`,
      ),
      fetch(
         `https://api.themoviedb.org/3/movie/${tmdbId}/release_dates?api_key=${apiKey}`,
      ),
   ]);

   if (!detailsRes.ok || !creditsRes.ok || !releaseRes.ok) {
      throw new Error("Failed to fetch TMDB movie details");
   }

   const [details, credits, release] = await Promise.all([
      detailsRes.json(),
      creditsRes.json(),
      releaseRes.json(),
   ]);

   return normalizeMovieDetails(details, credits, release);
}

export async function fetchTVDetails(tmdbId: number) {
   const apiKey = process.env.TMDB_API_KEY!;
   const [detailsRes, creditsRes, ratingsRes, externalIdRes] =
      await Promise.all([
         fetch(`https://api.themoviedb.org/3/tv/${tmdbId}?api_key=${apiKey}`),
         fetch(
            `https://api.themoviedb.org/3/tv/${tmdbId}/aggregate_credits?api_key=${apiKey}`,
         ),
         fetch(
            `https://api.themoviedb.org/3/tv/${tmdbId}/content_ratings?api_key=${apiKey}`,
         ),
         fetch(
            `https://api.themoviedb.org/3/tv/${tmdbId}/external_ids?api_key=${apiKey}`,
         ),
      ]);

   if (
      !detailsRes.ok ||
      !creditsRes.ok ||
      !ratingsRes.ok ||
      !externalIdRes.ok
   ) {
      throw new Error("Failed to fetch TMDB TV details");
   }

   const [details, credits, ratings, externalIds] = await Promise.all([
      detailsRes.json(),
      creditsRes.json(),
      ratingsRes.json(),
      externalIdRes.json(),
   ]);

   return normalizeTVDetails(details, credits, ratings, externalIds);
}
