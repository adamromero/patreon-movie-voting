"use client";

import React, { createContext, useContext, useState } from "react";
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
import { Movie } from "@/app/types/movie";

export interface MovieFilterOptions {
   type: string;
   genre: string;
   requests: string;
   status: string;
}

export interface MovieSortOptions {
   alphabetical: string;
   votes: string;
   rating: string;
   chronological: string;
   added: string;
   published: string;
}

export interface MovieStatusSortOption {
   statusSort: string;
}

/** Minimal TMDB search result shape passed when adding a request */
export interface AddRequestMovieInput {
   id: number;
   media_type?: "movie" | "tv";
}

export interface MovieContextValue {
   moviesList: Movie[];
   filteredMoviesList: Movie[];
   setFilteredMoviesList: React.Dispatch<React.SetStateAction<Movie[]>>;
   fetchMovies: () => Promise<void>;
   isRankingOn: boolean;
   setIsRankingOn: React.Dispatch<React.SetStateAction<boolean>>;
   rankedMovies: Record<string, number>;
   addRequestToList: (
      movie: AddRequestMovieInput,
      currentUser: string,
   ) => Promise<Movie | null>;
   addVoteToRequest: (
      movieId: string,
      voters: string[],
      currentUser: string,
   ) => Promise<Movie | unknown>;
   removeRequestFromList: (movieId: string) => Promise<unknown>;
   filterOptions: MovieFilterOptions;
   setFilterOptions: React.Dispatch<React.SetStateAction<MovieFilterOptions>>;
   sortOptions: MovieSortOptions;
   setSortOptions: React.Dispatch<React.SetStateAction<MovieSortOptions>>;
   statusSortOption: MovieStatusSortOption;
   setStatusSortOption: React.Dispatch<
      React.SetStateAction<MovieStatusSortOption>
   >;
   setWatchStatus: (
      movieId: string,
      status: "channel" | "seen" | "rewatch" | "rewatchFriend" | "unseen",
   ) => Promise<Movie | unknown>;
   setHolidayStatus: (
      movieId: string,
      status: "halloween" | "christmas",
   ) => Promise<Movie | unknown>;
   setReactionLink: (
      movieId: string,
      links: { patreon: string; youtube: string },
   ) => Promise<Movie | unknown>;
   searchTitle: string;
   setSearchTitle: React.Dispatch<React.SetStateAction<string>>;
   searchDirector: string;
   setSearchDirector: React.Dispatch<React.SetStateAction<string>>;
   searchActor: string;
   setSearchActor: React.Dispatch<React.SetStateAction<string>>;
   searchComposer: string;
   setSearchComposer: React.Dispatch<React.SetStateAction<string>>;
   removeVoteFromRequest: (
      movieId: string,
      voters: string[],
      currentUser: string,
   ) => Promise<unknown>;
   isUserUnderRequestLimit: boolean;
   setIsUserUnderRequestLimit: React.Dispatch<React.SetStateAction<boolean>>;
   requestsRemaining: number | undefined;
   disableButton: boolean;
   requestsThisMonth: Movie[];
   moviesMap: Map<string, Movie>;
   processUserRequestsByDate: (
      id: string,
      isCreator: boolean,
      isProducer: boolean,
   ) => void;
   moviesByDateMap: Map<string, Movie>;
}

export const MovieContext = createContext<MovieContextValue | undefined>(
   undefined,
);

export function useMovieContext(): MovieContextValue {
   const value = useContext(MovieContext);
   if (value === undefined) {
      throw new Error("useMovieContext must be used within MovieProvider");
   }
   return value;
}

interface MovieProviderProps {
   children: React.ReactNode;
}

export const MovieProvider = ({ children }: MovieProviderProps) => {
   const [moviesList, setMoviesList] = useState<Movie[]>([]);
   const [filteredMoviesList, setFilteredMoviesList] = useState<Movie[]>([]);
   const [searchTitle, setSearchTitle] = useState("");
   const [searchDirector, setSearchDirector] = useState("");
   const [searchActor, setSearchActor] = useState("");
   const [searchComposer, setSearchComposer] = useState("");
   const [filterOptions, setFilterOptions] = useState<MovieFilterOptions>({
      type: type.Default,
      genre: genre.Default,
      requests: requests.Default,
      status: status.Default,
   });
   const [sortOptions, setSortOptions] = useState<MovieSortOptions>({
      alphabetical: alphabetical.Default,
      votes: votes.Ascending,
      rating: rating.Default,
      chronological: chronological.Default,
      added: added.Default,
      published: published.Default,
   });
   const [statusSortOption, setStatusSortOption] =
      useState<MovieStatusSortOption>({
         statusSort: statusSort.Unwatched,
      });
   const [isUserUnderRequestLimit, setIsUserUnderRequestLimit] = useState(true);
   const [requestsRemaining, setRequestsRemaining] = useState<
      number | undefined
   >();
   const [disableButton, setDisableButton] = useState(false);
   const [isRankingOn, setIsRankingOn] = useState(false);
   const [rankedMovies, setRankedMovies] = useState<Record<string, number>>({});
   const [requestsThisMonth, setRequestsThisMonth] = useState<Movie[]>([]);
   const [moviesMap, setMoviesMap] = useState(new Map<string, Movie>());
   const [moviesByDateMap, setMoviesByDateMap] = useState(
      new Map<string, Movie>(),
   );

   const fetchMovies = async () => {
      try {
         const response = await fetch(`/api/movies`);
         const movies: Movie[] = await response.json();

         const moviesMap = new Map<string, Movie>();
         const sortedMovies: Movie[] = [];
         const rankedMoviesObject: Record<string, number> = {};

         movies.forEach((movie) => {
            const key = `${movie.data.id}-${movie.data.Type}`;
            moviesMap.set(key, movie);

            if (!movie.hasSeen && !movie.hasReacted) {
               sortedMovies.push(movie);
            }
         });

         sortedMovies.sort((a, b) => b.voters.length - a.voters.length);

         sortedMovies.forEach((movie, index) => {
            rankedMoviesObject[movie.data.imdbID ?? ""] = index + 1;
         });

         setMoviesList(movies);
         setMoviesMap(moviesMap);
         setRankedMovies(rankedMoviesObject);
      } catch (error) {
         console.error("Failed to fetch movies:", error);
      }
   };

   const processUserRequestsByDate = (
      id: string,
      isCreator: boolean,
      isProducer: boolean,
   ) => {
      const currentDate = new Date();
      const startOfMonth = new Date(
         currentDate.getFullYear(),
         currentDate.getMonth(),
         1,
      );
      const startOfNextMonth = new Date(
         currentDate.getFullYear(),
         currentDate.getMonth() + 1,
         1,
      );

      const filteredMap = new Map<string, Movie>();
      moviesMap.forEach((value, key) => {
         const createdAtDate = new Date(value.createdAt);
         if (
            createdAtDate >= startOfMonth &&
            createdAtDate < startOfNextMonth &&
            value.requester === id &&
            !value.hasSeen &&
            !value.hasReacted
         ) {
            filteredMap.set(key, value);
         }
      });

      const requestLimit = isProducer ? 3 : 2;
      const isUnderLimit = isCreator ? true : filteredMap.size < requestLimit;

      setMoviesByDateMap(filteredMap);
      setIsUserUnderRequestLimit(isUnderLimit);
      setRequestsRemaining(requestLimit - filteredMap.size);
   };

   const addRequestToList = async (
      movie: AddRequestMovieInput,
      currentUser: string,
   ): Promise<Movie | null> => {
      setDisableButton(true);

      let data: {
         id: number;
         poster_path?: string;
         backdrop_path?: string;
         vote_average?: number;
         genres: { name: string }[];
         production_companies: { name: string; origin_country: string }[];
         release_date?: string;
         first_air_date?: string;
         title?: string;
         name?: string;
         imdb_id?: string;
         runtime?: number;
         episode_run_time?: number[];
         created_by?: { name: string }[];
      };
      let genres: string[],
         title: string,
         year: string,
         release: string,
         director: string[],
         composer: string[],
         actors: string[],
         runtime: number | undefined,
         rated: string | undefined,
         imdbID: string,
         studio: string;

      if (movie.media_type === "movie") {
         const NEW_API_URL = `https://api.themoviedb.org/3/movie/${movie.id}?language=en-US&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
         const response = await fetch(NEW_API_URL);
         data = await response.json();

         genres = data.genres.map((g) =>
            g.name === "Science Fiction" ? "Sci-Fi" : g.name,
         );

         studio = data.production_companies
            .filter((company) => company.origin_country === "US")
            .map((company) => company.name)
            .join(", ");

         if (!studio.length && data.production_companies.length) {
            studio = data.production_companies[0]?.name ?? "";
         }

         title = data.title ?? "";
         year = (data.release_date ?? "").split("-")[0];
         release = data.release_date ?? "";
         imdbID = data.imdb_id ? data.imdb_id : "";
         runtime = data.runtime;

         const creditUrl = `https://api.themoviedb.org/3/movie/${movie.id}/credits?language=en-US&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
         const creditResponse = await fetch(creditUrl);
         const creditData = await creditResponse.json();

         director = creditData.crew
            .filter((credit: { job: string }) => credit.job === "Director")
            .map((credit: { name: string }) => credit.name);

         const composerArray = creditData.crew
            .filter(
               (credit: { job: string }) =>
                  credit.job === "Original Music Composer" ||
                  credit.job === "Music" ||
                  credit.job === "Conductor",
            )
            .map((credit: { name: string }) => credit.name);
         composer = Array.from(new Set(composerArray));

         actors = creditData.cast
            .slice(0, 10)
            .map((actor: { name: string }) => actor.name);

         const releaseUrl = `https://api.themoviedb.org/3/movie/${movie.id}/release_dates?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
         const releaseResponse = await fetch(releaseUrl);
         const releaseData = await releaseResponse.json();

         const usRelease = releaseData.results?.find(
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
      } else if (movie.media_type === "tv") {
         const NEW_API_URL = `https://api.themoviedb.org/3/tv/${movie.id}?language=en-US&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
         const response = await fetch(NEW_API_URL);
         data = await response.json();

         genres = data.genres.map((g: { name: string }) =>
            g.name === "Science Fiction" ? "Sci-Fi" : g.name,
         );

         studio = data.production_companies
            .filter(
               (company: { origin_country: string }) =>
                  company.origin_country === "US",
            )
            .map((company: { name: string }) => company.name)
            .join(", ");

         if (!studio.length && data.production_companies.length) {
            studio = data.production_companies[0]?.name ?? "";
         }

         title = data.name ?? "";
         year = (data.first_air_date ?? "").split("-")[0];
         release = data.first_air_date ?? "";
         runtime = data.episode_run_time?.[0];
         director = (data.created_by ?? []).map(
            (credit: { name: string }) => credit.name,
         );

         const externalIDUrl = `https://api.themoviedb.org/3/tv/${movie.id}/external_ids?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
         const externalIDResponse = await fetch(externalIDUrl);
         const externalIDData = await externalIDResponse.json();
         imdbID = externalIDData.imdb_id ? externalIDData.imdb_id : "";

         const creditUrl = `https://api.themoviedb.org/3/tv/${movie.id}/aggregate_credits?language=en-US&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
         const creditResponse = await fetch(creditUrl);
         const creditData = await creditResponse.json();

         const composerArray = creditData.crew
            .filter((person: { jobs: { job: string }[] }) =>
               person.jobs.some(
                  (credit: { job: string }) =>
                     credit.job === "Original Music Composer" ||
                     credit.job === "Music" ||
                     credit.job === "Conductor",
               ),
            )
            .map((person: { name: string }) => person.name);

         composer = Array.from(new Set(composerArray));

         actors = creditData.cast
            .slice(0, 10)
            .map((actor: { name: string }) => actor.name);

         const releaseUrl = `https://api.themoviedb.org/3/tv/${movie.id}/content_ratings?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
         const releaseResponse = await fetch(releaseUrl);
         const releaseData = await releaseResponse.json();

         const findUSRating = releaseData.results.find(
            (r: { iso_3166_1: string }) => r.iso_3166_1 === "US",
         );
         rated = findUSRating
            ? findUSRating.rating
            : releaseData?.results[0]?.rating;
      } else {
         setDisableButton(false);
         return null;
      }

      const movieData = {
         id: data.id,
         Type: movie.media_type ? movie.media_type : "",
         Title: title,
         Year: year,
         Rated: rated ?? "",
         Genre: genres.join(", "),
         Director: director.join(", "),
         Actors: actors.join(", "),
         Poster: data.poster_path ? data.poster_path : "",
         Backdrop: data.backdrop_path ? data.backdrop_path : "",
         imdbID,
         Rating: data.vote_average ?? undefined,
         Release: release,
         Runtime: runtime,
         Composer: composer.join(", "),
         Studio: studio,
      };

      const newMovieVote: Omit<Movie, "_id" | "createdAt" | "publishedAt"> & {
         createdAt?: string;
         publishedAt?: string | null;
      } = {
         data: movieData,
         voters: [currentUser],
         isHalloween: false,
         isChristmas: title.includes("Christmas"),
         hasReacted: false,
         hasSeen: false,
         isRewatch: false,
         isRewatchFriend: false,
         links: { patreon: "", youtube: "" },
         requester: currentUser,
      };

      const config = {
         method: "POST" as const,
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
         },
         body: JSON.stringify(newMovieVote),
      };

      try {
         const response = await fetch("/api/movies", config);
         const postedMovie: Movie = await response.json();
         const findMovie = moviesList.find(
            (m) => m.data.imdbID === postedMovie.data.imdbID,
         );
         if (
            !(postedMovie as unknown as { error?: unknown }).error &&
            !findMovie
         ) {
            setMoviesList((movies) => [...movies, postedMovie]);
            setMoviesMap((prevMap) => {
               const newMap = new Map(prevMap);
               newMap.set(
                  `${postedMovie.data.id}-${postedMovie.data.Type}`,
                  postedMovie,
               );
               return newMap;
            });
         }

         return postedMovie;
      } catch (e) {
         return null;
      } finally {
         setDisableButton(false);
      }
   };

   const addVoteToRequest = async (
      movieId: string,
      voters: string[],
      currentUser: string,
   ) => {
      const newVoters = [...voters, currentUser];
      const votedMovie = moviesList.find((movie) => movie._id === movieId);
      if (!votedMovie) return;
      const updatedMovieVote = { ...votedMovie, voters: newVoters };

      const config = {
         method: "PUT" as const,
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
         },
         body: JSON.stringify(updatedMovieVote),
      };

      const updatedMoviesList = moviesList.map((movie) =>
         movie._id === movieId ? updatedMovieVote : movie,
      );

      try {
         const response = await fetch(`/api/movies/${movieId}`, config);
         const data = await response.json();
         setMoviesList(updatedMoviesList);

         setMoviesMap((prevMap) => {
            const newMap = new Map(prevMap);
            newMap.set(
               `${updatedMovieVote.data.id}-${updatedMovieVote.data.Type}`,
               updatedMovieVote,
            );
            return newMap;
         });

         const sortedMovies = updatedMoviesList
            .filter((movie) => !movie.hasSeen && !movie.hasReacted)
            .sort((a, b) => b.voters.length - a.voters.length);

         const rankedMoviesObject = sortedMovies.reduce(
            (acc, movie, index) => {
               acc[movie.data.imdbID ?? ""] = index + 1;
               return acc;
            },
            {} as Record<string, number>,
         );

         setRankedMovies(rankedMoviesObject);

         return data;
      } catch (e) {
         return e;
      }
   };

   const removeRequestFromList = async (movieId: string) => {
      try {
         const response = await fetch(`/api/movies/${movieId}`, {
            method: "DELETE",
            headers: {
               Accept: "application/json",
               "Content-Type": "application/json",
            },
            body: JSON.stringify(movieId),
         });
         const deletedMovie: Movie = await response.json();
         const updatedMoviesList = moviesList.filter(
            (movie) => movie._id !== deletedMovie._id,
         );
         setMoviesList(updatedMoviesList);

         setMoviesMap((prevMap) => {
            const newMap = new Map(prevMap);
            newMap.delete(`${deletedMovie.data.id}-${deletedMovie.data.Type}`);
            return newMap;
         });

         const sortedMovies = updatedMoviesList
            .filter((movie) => !movie.hasSeen && !movie.hasReacted)
            .sort((a, b) => b.voters.length - a.voters.length);

         const rankedMoviesObject = sortedMovies.reduce(
            (acc, movie, index) => {
               acc[movie.data.imdbID ?? ""] = index + 1;
               return acc;
            },
            {} as Record<string, number>,
         );

         setRankedMovies(rankedMoviesObject);
      } catch (e) {
         return e;
      }
   };

   const removeVoteFromRequest = async (
      movieId: string,
      voters: string[],
      currentUser: string,
   ) => {
      const newVoters = voters.filter((voter) => voter !== currentUser);
      const movieToUpdate = moviesList.find((movie) => movie._id === movieId);
      if (!movieToUpdate) return;
      const updatedMovieVote = { ...movieToUpdate, voters: newVoters };

      if (voters.length === 1) {
         try {
            const response = await fetch(`/api/movies/${movieId}`, {
               method: "DELETE",
               headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
               },
               body: JSON.stringify(movieId),
            });

            const deletedMovie: Movie = await response.json();
            const updatedMoviesList = moviesList.filter(
               (movie) => movie._id !== deletedMovie._id,
            );

            setMoviesList(updatedMoviesList);
            setMoviesMap((prevMap) => {
               const newMap = new Map(prevMap);
               newMap.delete(
                  `${deletedMovie.data.id}-${deletedMovie.data.Type}`,
               );
               return newMap;
            });
         } catch (e) {
            return e;
         }
      } else {
         const config = {
            method: "PUT" as const,
            headers: {
               Accept: "application/json",
               "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedMovieVote),
         };

         const updatedMoviesList = moviesList.map((movie) =>
            movie._id === movieId ? updatedMovieVote : movie,
         );

         try {
            const response = await fetch(`/api/movies/${movieId}`, config);
            const data = await response.json();
            setMoviesList(updatedMoviesList);

            setMoviesMap((prevMap) => {
               const newMap = new Map(prevMap);
               newMap.set(
                  `${updatedMovieVote.data.id}-${updatedMovieVote.data.Type}`,
                  updatedMovieVote,
               );
               return newMap;
            });

            const sortedMovies = updatedMoviesList
               .filter((movie) => !movie.hasSeen && !movie.hasReacted)
               .sort((a, b) => b.voters.length - a.voters.length);

            const rankedMoviesObject = sortedMovies.reduce(
               (acc, movie, index) => {
                  acc[movie.data.imdbID ?? ""] = index + 1;
                  return acc;
               },
               {} as Record<string, number>,
            );

            setRankedMovies(rankedMoviesObject);

            return data;
         } catch (e) {
            return e;
         }
      }
   };

   const setHolidayStatus = async (
      movieId: string,
      status: "halloween" | "christmas",
   ) => {
      const selectedMovieVote = moviesList.find(
         (movie) => movie._id === movieId,
      );
      if (!selectedMovieVote) return;

      let halloween = selectedMovieVote.isHalloween,
         christmas = selectedMovieVote.isChristmas;
      if (status === "halloween") {
         halloween = !selectedMovieVote.isHalloween;
      } else if (status === "christmas") {
         christmas = !selectedMovieVote.isChristmas;
      }

      const updatedMovieVote = {
         ...selectedMovieVote,
         isHalloween: halloween,
         isChristmas: christmas,
      };

      const config = {
         method: "PUT" as const,
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
         },
         body: JSON.stringify(updatedMovieVote),
      };

      const updatedMoviesList = moviesList.map((movie) =>
         movie._id === movieId ? updatedMovieVote : movie,
      );

      try {
         const response = await fetch(`/api/movies/${movieId}`, config);
         const data = await response.json();
         setMoviesList(updatedMoviesList);

         setMoviesMap((prevMap) => {
            const newMap = new Map(prevMap);
            newMap.set(
               `${updatedMovieVote.data.id}-${updatedMovieVote.data.Type}`,
               updatedMovieVote,
            );
            return newMap;
         });

         return data;
      } catch (e) {
         return e;
      }
   };

   const setWatchStatus = async (
      movieId: string,
      status: "channel" | "seen" | "rewatch" | "rewatchFriend" | "unseen",
   ) => {
      const selectedMovieVote = moviesList.find(
         (movie) => movie._id === movieId,
      );
      if (!selectedMovieVote) return;

      const channel = status === "channel";
      const seen = status === "seen";
      const rewatch = status === "rewatch";
      const rewatchFriend = status === "rewatchFriend";
      const unseen = status === "unseen";

      const updatedMovieVote = {
         ...selectedMovieVote,
         hasReacted: unseen ? false : channel,
         hasSeen: unseen ? false : seen,
         isRewatch: unseen ? false : rewatch,
         isRewatchFriend: unseen ? false : rewatchFriend,
      };

      const config = {
         method: "PUT" as const,
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
         },
         body: JSON.stringify(updatedMovieVote),
      };

      const updatedMoviesList = moviesList.map((movie) =>
         movie._id === movieId ? updatedMovieVote : movie,
      );

      try {
         const response = await fetch(`/api/movies/${movieId}`, config);
         const data = await response.json();
         setMoviesList(updatedMoviesList);

         setMoviesMap((prevMap) => {
            const newMap = new Map(prevMap);
            newMap.set(
               `${updatedMovieVote.data.id}-${updatedMovieVote.data.Type}`,
               updatedMovieVote,
            );
            return newMap;
         });

         return data;
      } catch (e) {
         return e;
      }
   };

   const setReactionLink = async (
      movieId: string,
      links: { patreon: string; youtube: string },
   ) => {
      const selectedMovieVote = moviesList.find(
         (movie) => movie._id === movieId,
      );
      if (!selectedMovieVote) return;
      const updatedMovieVote = { ...selectedMovieVote, links };

      const config = {
         method: "PUT" as const,
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
         },
         body: JSON.stringify(updatedMovieVote),
      };

      const updatedMoviesList = moviesList.map((movie) =>
         movie._id === movieId ? updatedMovieVote : movie,
      );

      try {
         const response = await fetch(`/api/movies/${movieId}`, config);
         const data = await response.json();
         setMoviesList(updatedMoviesList);

         setMoviesMap((prevMap) => {
            const newMap = new Map(prevMap);
            newMap.set(
               `${updatedMovieVote.data.id}-${updatedMovieVote.data.Type}`,
               updatedMovieVote,
            );
            return newMap;
         });

         return data;
      } catch (e) {
         return e;
      }
   };

   return (
      <MovieContext.Provider
         value={{
            moviesList,
            filteredMoviesList,
            setFilteredMoviesList,
            fetchMovies,
            isRankingOn,
            setIsRankingOn,
            rankedMovies,
            addRequestToList,
            addVoteToRequest,
            removeVoteFromRequest,
            filterOptions,
            setFilterOptions,
            sortOptions,
            setSortOptions,
            statusSortOption,
            setStatusSortOption,
            setWatchStatus,
            setHolidayStatus,
            setReactionLink,
            searchTitle,
            setSearchTitle,
            searchDirector,
            setSearchDirector,
            searchActor,
            setSearchActor,
            searchComposer,
            setSearchComposer,
            removeRequestFromList,
            isUserUnderRequestLimit,
            setIsUserUnderRequestLimit,
            requestsRemaining,
            disableButton,
            requestsThisMonth,
            moviesMap,
            processUserRequestsByDate,
            moviesByDateMap,
         }}
      >
         {children}
      </MovieContext.Provider>
   );
};
