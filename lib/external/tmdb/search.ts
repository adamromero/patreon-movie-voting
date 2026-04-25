import { normalizeMovies, normalizeTV } from "./normalize";

export async function searchTmdbTitles(query: string) {
   const url = new URL("https://api.themoviedb.org/3/search/multi");

   url.searchParams.set("api_key", process.env.TMDB_API_KEY!);
   url.searchParams.set("query", query);

   const res = await fetch(url.toString());

   if (!res.ok) throw new Error("TMDB search failed");

   const data = await res.json();

   return data.results
      .filter((r: any) => r.media_type === "movie" || r.media_type === "tv")
      .map((r: any) => ({
         id: r.id,
         tmdbId: r.id,
         mediaType: r.media_type,
         title: r.title || r.name,
         overview: r.overview,
         posterPath: r.poster_path,
         releaseDate: r.release_date || r.first_air_date,
      }));
}

export async function findByImdbId(imdbId: string) {
   const url = `https://api.themoviedb.org/3/find/${imdbId}?api_key=${process.env.TMDB_API_KEY}&external_source=imdb_id`;

   const res = await fetch(url);

   if (!res.ok) throw new Error("TMDB IMDb lookup failed");

   const data = await res.json();
   return [
      ...normalizeMovies(data.movie_results),
      ...normalizeTV(data.tv_results),
   ];
}

export async function searchTmdbTitleYear(query: string, year: string) {
   const movieUrl = new URL("https://api.themoviedb.org/3/search/movie");
   const tvUrl = new URL("https://api.themoviedb.org/3/search/tv");

   const apiKey = process.env.TMDB_API_KEY!;

   movieUrl.searchParams.set("api_key", apiKey);
   movieUrl.searchParams.set("query", query);
   movieUrl.searchParams.set("primary_release_year", year);

   tvUrl.searchParams.set("api_key", apiKey);
   tvUrl.searchParams.set("query", query);
   tvUrl.searchParams.set("first_air_date_year", year);

   const [movieRes, tvRes] = await Promise.all([
      fetch(movieUrl.toString()),
      fetch(tvUrl.toString()),
   ]);

   if (!movieRes.ok || !tvRes.ok) {
      throw new Error("TMDB title+year search failed");
   }

   const [movieData, tvData] = await Promise.all([
      movieRes.json(),
      tvRes.json(),
   ]);

   return [
      ...normalizeMovies(movieData.results),
      ...normalizeTV(tvData.results),
   ];
}

export async function searchTitles({
   query,
   year,
   imdbId,
}: {
   query?: string;
   year?: string;
   imdbId?: string;
}) {
   if (imdbId) {
      return findByImdbId(imdbId);
   }

   if (query && year) {
      return searchTmdbTitleYear(query, year);
   }

   if (query) {
      return searchTmdbTitles(query);
   }

   throw new Error("No valid search parameters provided");
}
