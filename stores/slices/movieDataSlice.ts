// stores/slices/movieDataSlice.ts
import { StateCreator } from "zustand";
import { Movie, MovieData } from "../../app/types/movie";
import { StoreState } from "../../app/types/store";
import {
   genre,
   type,
   status,
   chronological,
   added,
   alphabetical,
   votes,
   requests,
   rating,
   statusSort,
   published,
} from "@/app/utils/filtersOptions";
import {
   fetchMoviesFromApi,
   createMovieRequest,
   deleteMovieRequest,
} from "@/lib/api/movies";

export interface MovieDataSlice {
   moviesList: Movie[];
   moviesMap: Record<string, Movie>;
   moviesByDateMap: Record<string, Movie>;
   rankedMovies: Record<string, number>;
   filteredMoviesList: Movie[];
   searchTitle: string;
   searchDirector: string;
   searchActor: string;
   searchComposer: string;
   filterOptions: {
      alphabetical: string;
      votes: string;
      rating: string;
      chronological: string;
      added: string;
      type: string;
      genre: string;
      requests: string;
      status: string;
      statusSort: string;
      published: string;
   };

   fetchMovies: () => Promise<void>;
   addRequestToList: (
      movie: MovieData,
      currentUser: string
   ) => Promise<Movie | null>;
   removeRequestFromList: (_id: string) => Promise<void>;
   setFilteredMoviesList: (movies: Movie[]) => void;
   setSearchTitle: (title: string) => void;
   setSearchDirector: (director: string) => void;
   setSearchActor: (actor: string) => void;
   setSearchComposer: (composer: string) => void;
   setFilterOptions: (
      options: Partial<MovieDataSlice["filterOptions"]>
   ) => void;
   processUserRequestsByDate: (
      id: string,
      isCreator: boolean,
      isProducer: boolean
   ) => void;
}

export const createMovieDataSlice: StateCreator<
   StoreState,
   [],
   [],
   MovieDataSlice
> = (set, get) => ({
   moviesList: [],
   moviesMap: {},
   moviesByDateMap: {},
   rankedMovies: {},
   filteredMoviesList: [],
   searchTitle: "",
   searchDirector: "",
   searchActor: "",
   searchComposer: "",
   filterOptions: {
      alphabetical: alphabetical.Default,
      votes: votes.Default,
      rating: rating.Default,
      chronological: chronological.Default,
      added: added.Default,
      type: type.Default,
      genre: genre.Default,
      requests: requests.Default,
      status: status.Default,
      statusSort: statusSort.Default,
      published: published.Default,
   },

   fetchMovies: async () => {
      try {
         const movies = await fetchMoviesFromApi();

         const moviesMap: Record<string, Movie> = {};
         const sortedMovies: Movie[] = [];
         const rankedMoviesObject: Record<string, number> = {};

         movies.forEach((movie: Movie) => {
            const key = `${movie.data.id}-${movie.data.Type}`;
            moviesMap[key] = movie;

            if (!movie.hasSeen && !movie.hasReacted) {
               sortedMovies.push(movie);
            }
         });

         sortedMovies.sort((a, b) => b.voters.length - a.voters.length);

         sortedMovies.forEach((movie, index) => {
            if (movie.data.imdbID) {
               rankedMoviesObject[movie.data.imdbID] = index + 1;
            }
         });

         set({
            moviesList: movies,
            moviesMap,
            rankedMovies: rankedMoviesObject,
         });
      } catch (error) {
         console.error("Failed to fetch movies:", error);
      }
   },

   addRequestToList: async (movie: MovieData, currentUser: string) => {
      const { moviesList, moviesMap } = get();

      let data: any,
         genres: string[] = [],
         title: string = "",
         year: string = "",
         release: string = "",
         director: string[] = [],
         composer: string[] = [],
         actors: string[] = [],
         runtime: number = 0,
         rated: string = "",
         imdbID: string = "",
         studio: string = "";

      if (movie.media_type === "movie") {
         const NEW_API_URL = `https://api.themoviedb.org/3/movie/${movie.id}?language=en-US&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
         const response = await fetch(NEW_API_URL);
         data = await response.json();

         genres = data.genres.map((genre: any) =>
            genre.name === "Science Fiction" ? "Sci-Fi" : genre.name
         );

         studio = data.production_companies
            .filter((company: any) => company.origin_country === "US")
            .map((company: any) => company.name)
            .join(", ");

         if (!studio.length && data.production_companies.length) {
            studio = data.production_companies[0]?.name;
         }

         title = data.title;
         year = data.release_date.split("-")[0];
         release = data.release_date;
         imdbID = data.imdb_id ? data.imdb_id : "";
         runtime = data.runtime;

         const creditUrl = `https://api.themoviedb.org/3/movie/${movie.id}/credits?language=en-US&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
         const creditResponse = await fetch(creditUrl);
         const creditData = await creditResponse.json();

         director = creditData.crew
            .filter((credit: any) => credit.job === "Director")
            .map((credit: any) => credit.name);

         const composerArray = creditData.crew
            .filter(
               (credit: any) =>
                  credit.job === "Original Music Composer" ||
                  credit.job === "Music" ||
                  credit.job === "Conductor"
            )
            .map((credit: any) => credit.name);
         composer = Array.from(new Set(composerArray));

         actors = creditData.cast.slice(0, 10).map((actor: any) => actor.name);

         const releaseUrl = `https://api.themoviedb.org/3/movie/${movie.id}/release_dates?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
         const releaseResponse = await fetch(releaseUrl);
         const releaseData = await releaseResponse.json();

         const usRelease = releaseData.results?.find(
            (release: any) => release.iso_3166_1 === "US"
         );

         if (usRelease) {
            const filteredDates = usRelease.release_dates?.filter(
               (dates: any) => dates.certification !== ""
            );

            if (filteredDates && filteredDates.length > 0) {
               rated = filteredDates[0].certification;
            }
         }
      } else if (movie.media_type === "tv") {
         const NEW_API_URL = `https://api.themoviedb.org/3/tv/${movie.id}?language=en-US&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
         const response = await fetch(NEW_API_URL);
         data = await response.json();

         genres = data.genres.map((genre: any) =>
            genre.name === "Science Fiction" ? "Sci-Fi" : genre.name
         );

         studio = data.production_companies
            .filter((company: any) => company.origin_country === "US")
            .map((company: any) => company.name)
            .join(", ");

         if (!studio.length && data.production_companies.length) {
            studio = data.production_companies[0]?.name;
         }

         title = data.name;
         year = data.first_air_date.split("-")[0];
         release = data.first_air_date;
         runtime = data.episode_run_time[0];
         director = data.created_by.map((credit: any) => credit.name);

         const externalIDUrl = `https://api.themoviedb.org/3/tv/${movie.id}/external_ids?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
         const externalIDResponse = await fetch(externalIDUrl);
         const externalIDData = await externalIDResponse.json();
         imdbID = externalIDData.imdb_id ? externalIDData.imdb_id : "";

         const creditUrl = `https://api.themoviedb.org/3/tv/${movie.id}/aggregate_credits?language=en-US&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
         const creditResponse = await fetch(creditUrl);
         const creditData = await creditResponse.json();

         const composerArray = creditData.crew
            .filter((person: any) =>
               person.jobs.some(
                  (credit: any) =>
                     credit.job === "Original Music Composer" ||
                     credit.job === "Music" ||
                     credit.job === "Conductor"
               )
            )
            .map((person: any) => person.name);

         composer = Array.from(new Set(composerArray));

         actors = creditData.cast.slice(0, 10).map((actor: any) => actor.name);

         const releaseUrl = `https://api.themoviedb.org/3/tv/${movie.id}/content_ratings?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
         const releaseResponse = await fetch(releaseUrl);
         const releaseData = await releaseResponse.json();

         const findUSRating = releaseData.results.find(
            (release: any) => release.iso_3166_1 === "US"
         );
         rated = findUSRating
            ? findUSRating.rating
            : releaseData?.results[0]?.rating;
      }

      const movieData = {
         id: data.id,
         Type: movie.media_type ? movie.media_type : "",
         Title: title,
         Year: year,
         Rated: rated,
         Genre: genres.join(", "),
         Director: director.join(", "),
         Actors: actors.join(", "),
         Poster: data.poster_path ? data.poster_path : "",
         Backdrop: data.backdrop_path ? data.backdrop_path : "",
         imdbID,
         Rating: data.vote_average ? data.vote_average : "",
         Release: release,
         Runtime: runtime,
         Composer: composer.join(", "),
         Studio: studio,
      };

      const newMovieVote = {
         data: movieData,
         voters: [currentUser],
         isHalloween: false,
         isChristmas: title.includes("Christmas"),
         hasReacted: false,
         hasSeen: false,
         links: { patreon: "", youtube: "" },
         requester: currentUser,
      };

      const config = {
         method: "POST",
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
         },
         body: JSON.stringify(newMovieVote),
      };

      try {
         const response = await fetch("/api/movies", config);
         const postedMovie = await response.json();
         const findMovie = moviesList.find(
            (movie) => movie.data.imdbID === postedMovie.data.imdbID
         );
         if (!postedMovie.error && !findMovie) {
            const updatedMoviesList = [...moviesList, postedMovie];
            const updatedMoviesMap = {
               ...moviesMap,
               [`${postedMovie.data.id}-${postedMovie.data.Type}`]: postedMovie,
            };
            set({
               moviesList: updatedMoviesList,
               moviesMap: updatedMoviesMap,
            });
         }

         return postedMovie;
      } catch (e) {
         return null;
      }
   },

   removeRequestFromList: async (_id: string) => {
      const { moviesList, moviesMap } = get();
      const movieToRemove = moviesList.find((movie) => movie._id === _id);
      if (!movieToRemove) return;

      try {
         const deletedMovie = await deleteMovieRequest(_id);

         const updatedMoviesList = moviesList.filter(
            (movie) => movie._id !== _id
         );
         const movieKey = `${movieToRemove.data.id}-${movieToRemove.data.Type}`;
         const { [movieKey]: _, ...updatedMoviesMap } = moviesMap;

         const sortedMovies = updatedMoviesList
            .filter((movie) => !movie.hasSeen && !movie.hasReacted)
            .sort((a, b) => b.voters.length - a.voters.length);

         const rankedMoviesObject = sortedMovies.reduce((acc, movie, index) => {
            if (movie.data.imdbID) {
               acc[movie.data.imdbID] = index + 1;
            }
            return acc;
         }, {} as Record<string, number>);

         set({
            moviesList: updatedMoviesList,
            moviesMap: updatedMoviesMap,
            rankedMovies: rankedMoviesObject,
         });
      } catch (err) {
         console.error("Error removing request:", err);
      }
   },

   setFilteredMoviesList: (movies: Movie[]) => {
      set({ filteredMoviesList: movies });
   },

   setSearchTitle: (title: string) => {
      set({ searchTitle: title });
   },

   setSearchDirector: (director: string) => {
      set({ searchDirector: director });
   },

   setSearchActor: (actor: string) => {
      set({ searchActor: actor });
   },

   setSearchComposer: (composer: string) => {
      set({ searchComposer: composer });
   },

   setFilterOptions: (options: Partial<MovieDataSlice["filterOptions"]>) => {
      set((state) => ({
         filterOptions: { ...state.filterOptions, ...options },
      }));
   },

   processUserRequestsByDate: (
      id: string,
      isCreator: boolean,
      isProducer: boolean
   ) => {
      const { moviesMap } = get();
      const currentDate = new Date();
      const startOfMonth = new Date(
         currentDate.getFullYear(),
         currentDate.getMonth(),
         1
      );
      const startOfNextMonth = new Date(
         currentDate.getFullYear(),
         currentDate.getMonth() + 1,
         1
      );

      const filteredMap: Record<string, Movie> = {};
      Object.entries(moviesMap).forEach(([key, value]) => {
         const createdAtDate = new Date(value.createdAt);
         if (
            createdAtDate >= startOfMonth &&
            createdAtDate < startOfNextMonth &&
            value.requester === id &&
            !value.hasSeen &&
            !value.hasReacted
         ) {
            filteredMap[key] = value;
         }
      });

      const requestLimit = isProducer ? 3 : 2;
      const isUnderLimit = isCreator
         ? true
         : Object.keys(filteredMap).length < requestLimit;

      set({
         moviesByDateMap: filteredMap,
         isUserUnderRequestLimit: isUnderLimit,
         requestsRemaining: requestLimit - Object.keys(filteredMap).length,
      });
   },
});
