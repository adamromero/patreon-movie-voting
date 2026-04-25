export function normalizeMovies(results: any[]) {
   return results.map((m) => ({
      id: m.id,
      tmdbId: m.id,
      mediaType: "movie",
      title: m.title,
      overview: m.overview,
      posterPath: m.poster_path,
      releaseDate: m.release_date,
   }));
}

export function normalizeTV(results: any[]) {
   return results.map((t) => ({
      id: t.id,
      tmdbId: t.id,
      mediaType: "tv",
      title: t.name,
      overview: t.overview,
      posterPath: t.poster_path,
      releaseDate: t.first_air_date,
   }));
}

export function normalizeMovieDetails(
   details: any,
   credits: any,
   release: any,
) {
   const genres = details.genres.map((g: any) =>
      g.name === "Science Fiction" ? "Sci-Fi" : g.name,
   );

   const director = credits.crew
      .filter((c: any) => c.job === "Director")
      .map((c: any) => c.name);

   const actors = credits.cast.slice(0, 10).map((a: any) => a.name);

   let rated = "";
   const usRelease = release.results?.find(
      (r: { iso_3166_1: string }) => r.iso_3166_1 === "US",
   );

   if (usRelease) {
      const filteredDates = usRelease.release_dates?.filter(
         (dates: { certification: string }) => dates.certification !== "",
      );

      if (filteredDates && filteredDates.length > 0) {
         rated = filteredDates[0].certification;
      }
   }

   type CrewMember = {
      job: string;
      name: string;
   };

   const musicJobs = new Set(["Original Music Composer", "Music", "Conductor"]);

   const composer = Array.from(
      new Set(
         credits.crew
            .filter((person: CrewMember) => musicJobs.has(person.job))
            .map((person: CrewMember) => person.name),
      ),
   );

   let studio = details.production_companies
      .filter((company: any) => company.origin_country === "US")
      .map((company: any) => company.name)
      .join(", ");

   if (!studio.length && details.production_companies.length) {
      studio = details.production_companies[0]?.name ?? "";
   }

   return {
      id: details.id,
      Type: "movie",
      Title: details.title ?? "",
      Year: (details.release_date ?? "").split("-")[0],
      Rated: rated,
      Genre: genres.join(", "),
      Director: director.join(", "),
      Actors: actors.join(", "),
      Poster: details.poster_path ?? "",
      Backdrop: details.backdrop_path ?? "",
      imdbID: details.imdb_id ?? "",
      Rating: details.vote_average ?? 0,
      Release: details.release_date ?? "",
      Runtime: details.runtime,
      Composer: composer.join(", "),
      Studio: studio,
   };
}

export function normalizeTVDetails(
   details: any,
   credits: any,
   ratings: any,
   externalIds: any,
) {
   const genres = details.genres.map((g: any) =>
      g.name === "Science Fiction" ? "Sci-Fi" : g.name,
   );

   const directors = credits.crew
      .filter((c: any) => c.job === "Director" || c.job === "Series Director")
      .map((c: any) => c.name);

   const creators = details.created_by?.map((c: any) => c.name) || [];

   const actors = credits.cast.slice(0, 10).map((a: any) => a.name);

   const imdbID = externalIds.imdb_id ?? "";

   const findUSRating = ratings.results.find(
      (r: { iso_3166_1: string }) => r.iso_3166_1 === "US",
   );
   const rated = findUSRating
      ? findUSRating.rating
      : ratings?.results[0]?.rating;

   type Job = {
      job: string;
   };

   type CrewMember =
      | { name: string; job: string; jobs?: never }
      | { name: string; jobs: Job[]; job?: never };

   const validJobs = new Set(["Original Music Composer", "Music", "Conductor"]);

   const composer = Array.from(
      new Set(
         credits.crew
            .filter((person: CrewMember) =>
               Array.isArray(person.jobs)
                  ? person.jobs.some((j) => validJobs.has(j.job))
                  : person.job !== undefined && validJobs.has(person.job),
            )
            .map((person: CrewMember) => person.name),
      ),
   );

   console.log(composer);

   const runtime =
      details.episode_run_time?.length > 0 ? details.episode_run_time[0] : null;

   const firstAirDate = details.first_air_date ?? "";
   const year = firstAirDate.split("-")[0];

   let studio = details.production_companies
      .filter(
         (company: { origin_country: string }) =>
            company.origin_country === "US",
      )
      .map((company: { name: string }) => company.name)
      .join(", ");

   if (!studio.length && details.production_companies.length) {
      studio = details.production_companies[0]?.name ?? "";
   }

   return {
      id: details.id,
      Type: "tv",
      Title: details.name ?? "",
      Year: year,
      Rated: rated,
      Genre: genres.join(", "),
      Director:
         creators.length > 0 ? creators.join(", ") : directors.join(", "),
      Actors: actors.join(", "),
      Poster: details.poster_path,
      Backdrop: details.backdrop_path ?? "",
      imdbID: imdbID,
      Rating: details.vote_average ?? 0,
      Release: firstAirDate,
      Runtime: runtime,
      Composer: composer.join(", "),
      Studio: studio,
   };
}
