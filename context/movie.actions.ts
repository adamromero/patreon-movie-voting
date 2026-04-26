import { useCallback } from "react";
import { Movie } from "@/app/types/movie";
import {
   addRequestApi,
   deleteRequestApi,
   addRequestVote,
   removeRequestVote,
} from "@/lib/api/requests";
import { Summary } from "@/app/types/summary";

export interface AddRequestMovieInput {
   id: number;
   media_type?: "movie" | "tv";
}

export type MovieActions = {
   fetchMovies: () => Promise<void>;

   addRequestToList: (args: {
      tmdbId: number;
      mediaType: "movie" | "tv";
   }) => Promise<Movie | null>;

   addVoteToRequest: (movieId: string) => Promise<Movie | unknown>;

   removeRequestFromList: (movieId: string) => Promise<unknown>;

   removeVoteFromRequest: (movieId: string) => Promise<unknown>;

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
};

export function useMovieActions({
   moviesList,
   setMoviesList,
   setDisableAddButton,
   setSummary,
}: {
   moviesList: Movie[];
   setMoviesList: React.Dispatch<React.SetStateAction<Movie[]>>;
   setDisableAddButton: React.Dispatch<React.SetStateAction<boolean>>;
   setSummary: React.Dispatch<React.SetStateAction<Summary>>;
}) {
   const fetchMovies = useCallback(async () => {
      const res = await fetch("/api/requests");
      const movies: Movie[] = await res.json();
      setMoviesList(movies);
   }, [setMoviesList]);

   const addRequestToList = async ({
      tmdbId,
      mediaType,
   }: {
      tmdbId: number;
      mediaType: "movie" | "tv";
   }) => {
      const data = await addRequestApi({ id: tmdbId, mediaType });

      setMoviesList((prev) => [data.request, ...prev]);
      setSummary(data.summary);
   };

   const removeVoteFromRequest = async (movieId: string) => {
      const data = await removeRequestVote(movieId);

      if (data.deleted) {
         setMoviesList((prev) => prev.filter((movie) => movie._id !== movieId));
         setSummary(data.summary);
      } else {
         setMoviesList((prev) =>
            prev.map((movie) => (movie._id === movieId ? data.request : movie)),
         );
      }
   };

   const addVoteToRequest = async (movieId: string) => {
      const data = await addRequestVote(movieId);

      setMoviesList((prev) =>
         prev.map((movie) => (movie._id === movieId ? data.request : movie)),
      );
   };

   const removeRequestFromList = async (movieId: string) => {
      //const data = await deleteRequestApi(movieId);
      //console.log(data)
   };

   // previous functions

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

         return data;
      } catch (e) {
         return e;
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
   };

   // const addRequestToList = async (
   //    movie: AddRequestMovieInput,
   //    currentUser: string,
   // ): Promise<Movie | null> => {
   //    setDisableAddButton(true);

   //    let data: {
   //       id: number;
   //       poster_path?: string;
   //       backdrop_path?: string;
   //       vote_average?: number;
   //       genres: { name: string }[];
   //       production_companies: { name: string; origin_country: string }[];
   //       release_date?: string;
   //       first_air_date?: string;
   //       title?: string;
   //       name?: string;
   //       imdb_id?: string;
   //       runtime?: number;
   //       episode_run_time?: number[];
   //       created_by?: { name: string }[];
   //    };
   //    let genres: string[],
   //       title: string,
   //       year: string,
   //       release: string,
   //       director: string[],
   //       composer: string[],
   //       actors: string[],
   //       runtime: number | undefined,
   //       rated: string | undefined,
   //       imdbID: string,
   //       studio: string;

   //    if (movie.media_type === "movie") {
   //       const NEW_API_URL = `https://api.themoviedb.org/3/movie/${movie.id}?language=en-US&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
   //       const response = await fetch(NEW_API_URL);
   //       data = await response.json();

   //       genres = data.genres.map((g) =>
   //          g.name === "Science Fiction" ? "Sci-Fi" : g.name,
   //       );

   //       studio = data.production_companies
   //          .filter((company) => company.origin_country === "US")
   //          .map((company) => company.name)
   //          .join(", ");

   //       if (!studio.length && data.production_companies.length) {
   //          studio = data.production_companies[0]?.name ?? "";
   //       }

   //       title = data.title ?? "";
   //       year = (data.release_date ?? "").split("-")[0];
   //       release = data.release_date ?? "";
   //       imdbID = data.imdb_id ? data.imdb_id : "";
   //       runtime = data.runtime;

   //       const creditUrl = `https://api.themoviedb.org/3/movie/${movie.id}/credits?language=en-US&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
   //       const creditResponse = await fetch(creditUrl);
   //       const creditData = await creditResponse.json();

   //       director = creditData.crew
   //          .filter((credit: { job: string }) => credit.job === "Director")
   //          .map((credit: { name: string }) => credit.name);

   //       const composerArray = creditData.crew
   //          .filter(
   //             (credit: { job: string }) =>
   //                credit.job === "Original Music Composer" ||
   //                credit.job === "Music" ||
   //                credit.job === "Conductor",
   //          )
   //          .map((credit: { name: string }) => credit.name);
   //       composer = Array.from(new Set(composerArray));

   //       actors = creditData.cast
   //          .slice(0, 10)
   //          .map((actor: { name: string }) => actor.name);

   //       const releaseUrl = `https://api.themoviedb.org/3/movie/${movie.id}/release_dates?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
   //       const releaseResponse = await fetch(releaseUrl);
   //       const releaseData = await releaseResponse.json();

   //       const usRelease = releaseData.results?.find(
   //          (r: { iso_3166_1: string }) => r.iso_3166_1 === "US",
   //       );

   //       if (usRelease) {
   //          const filteredDates = usRelease.release_dates?.filter(
   //             (dates: { certification: string }) => dates.certification !== "",
   //          );

   //          if (filteredDates && filteredDates.length > 0) {
   //             rated = filteredDates[0].certification;
   //          }
   //       }
   //    } else if (movie.media_type === "tv") {
   //       const NEW_API_URL = `https://api.themoviedb.org/3/tv/${movie.id}?language=en-US&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
   //       const response = await fetch(NEW_API_URL);
   //       data = await response.json();

   //       genres = data.genres.map((g: { name: string }) =>
   //          g.name === "Science Fiction" ? "Sci-Fi" : g.name,
   //       );

   //       studio = data.production_companies
   //          .filter(
   //             (company: { origin_country: string }) =>
   //                company.origin_country === "US",
   //          )
   //          .map((company: { name: string }) => company.name)
   //          .join(", ");

   //       if (!studio.length && data.production_companies.length) {
   //          studio = data.production_companies[0]?.name ?? "";
   //       }

   //       title = data.name ?? "";
   //       year = (data.first_air_date ?? "").split("-")[0];
   //       release = data.first_air_date ?? "";
   //       runtime = data.episode_run_time?.[0];
   //       director = (data.created_by ?? []).map(
   //          (credit: { name: string }) => credit.name,
   //       );

   //       const externalIDUrl = `https://api.themoviedb.org/3/tv/${movie.id}/external_ids?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
   //       const externalIDResponse = await fetch(externalIDUrl);
   //       const externalIDData = await externalIDResponse.json();
   //       imdbID = externalIDData.imdb_id ? externalIDData.imdb_id : "";

   //       const creditUrl = `https://api.themoviedb.org/3/tv/${movie.id}/aggregate_credits?language=en-US&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
   //       const creditResponse = await fetch(creditUrl);
   //       const creditData = await creditResponse.json();

   //       const composerArray = creditData.crew
   //          .filter((person: { jobs: { job: string }[] }) =>
   //             person.jobs.some(
   //                (credit: { job: string }) =>
   //                   credit.job === "Original Music Composer" ||
   //                   credit.job === "Music" ||
   //                   credit.job === "Conductor",
   //             ),
   //          )
   //          .map((person: { name: string }) => person.name);

   //       composer = Array.from(new Set(composerArray));

   //       actors = creditData.cast
   //          .slice(0, 10)
   //          .map((actor: { name: string }) => actor.name);

   //       const releaseUrl = `https://api.themoviedb.org/3/tv/${movie.id}/content_ratings?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
   //       const releaseResponse = await fetch(releaseUrl);
   //       const releaseData = await releaseResponse.json();

   //       const findUSRating = releaseData.results.find(
   //          (r: { iso_3166_1: string }) => r.iso_3166_1 === "US",
   //       );
   //       rated = findUSRating
   //          ? findUSRating.rating
   //          : releaseData?.results[0]?.rating;
   //    } else {
   //       setDisableAddButton(false);
   //       return null;
   //    }

   //    const movieData = {
   //       id: data.id,
   //       Type: movie.media_type ? movie.media_type : "",
   //       Title: title,
   //       Year: year,
   //       Rated: rated ?? "",
   //       Genre: genres.join(", "),
   //       Director: director.join(", "),
   //       Actors: actors.join(", "),
   //       Poster: data.poster_path ? data.poster_path : "",
   //       Backdrop: data.backdrop_path ? data.backdrop_path : "",
   //       imdbID,
   //       Rating: data.vote_average ?? undefined,
   //       Release: release,
   //       Runtime: runtime,
   //       Composer: composer.join(", "),
   //       Studio: studio,
   //    };

   //    const newMovieVote: Omit<Movie, "_id" | "createdAt" | "publishedAt"> & {
   //       createdAt?: string;
   //       publishedAt?: string | null;
   //    } = {
   //       data: movieData,
   //       voters: [currentUser],
   //       isHalloween: false,
   //       isChristmas: title.includes("Christmas"),
   //       hasReacted: false,
   //       hasSeen: false,
   //       isRewatch: false,
   //       isRewatchFriend: false,
   //       links: { patreon: "", youtube: "" },
   //       requester: currentUser,
   //    };

   //    const config = {
   //       method: "POST" as const,
   //       headers: {
   //          Accept: "application/json",
   //          "Content-Type": "application/json",
   //       },
   //       body: JSON.stringify(newMovieVote),
   //    };

   //    try {
   //       const response = await fetch("/api/movies", config);
   //       const postedMovie: Movie = await response.json();
   //       const findMovie = moviesList.find(
   //          (m) => m.data.imdbID === postedMovie.data.imdbID,
   //       );
   //       if (
   //          !(postedMovie as unknown as { error?: unknown }).error &&
   //          !findMovie
   //       ) {
   //          setMoviesList((movies) => [...movies, postedMovie]);
   //       }

   //       return postedMovie;
   //    } catch (e) {
   //       return null;
   //    } finally {
   //       setDisableAddButton(false);
   //    }
   // };

   return {
      fetchMovies,
      addVoteToRequest,
      removeRequestFromList,
      removeVoteFromRequest,
      setWatchStatus,
      setHolidayStatus,
      setReactionLink,
      addRequestToList,
   };
}
