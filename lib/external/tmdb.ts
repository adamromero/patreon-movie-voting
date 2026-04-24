const TMDB_BASE = "https://api.themoviedb.org/3";

export async function fetchTMDBBySearch(search: string) {
   const res = await fetch(
      `${TMDB_BASE}/search/multi?query=${search}&include_adult=false&language=en-US&page=1&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
   );

   if (!res.ok) {
      throw new Error("Failed to fetch TMDB movie");
   }

   const data = await res.json();

   const titles = data.results.filter(
      (title: any) => title.media_type === "movie" || title.media_type === "tv",
   );

   return titles;

   // normalize shape for your DB
   //    return {
   //       tmdbId: data.id,
   //       title: data.title,
   //       overview: data.overview,
   //       posterPath: data.poster_path,
   //       releaseDate: data.release_date,
   //    };
}

export async function fetchTMDBById(id: string) {
   const res = await fetch(
      `${TMDB_BASE}/find/${id}?external_source=imdb_id&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
   );
   if (!res.ok) {
      throw new Error("Failed to fetch TMDB movie");
   }

   return await res.json();
}

export async function fetchTMDBByMovie(title: string, year: string) {
   const res = await fetch(
      `${TMDB_BASE}/search/movie?query=${title}&include_adult=false&language=en-US&primary_release_year=${year}&page=1&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
   );
   if (!res.ok) {
      throw new Error("Failed to fetch TMDB movie");
   }

   return await res.json();
}

export async function fetchTMDBBySeries(title: string, year: string) {
   const res = await fetch(
      `${TMDB_BASE}/search/tv?query=${title}&include_adult=false&language=en-US&page=1&year=${year}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
   );
   if (!res.ok) {
      throw new Error("Failed to fetch TMDB movie");
   }

   return await res.json();
}
