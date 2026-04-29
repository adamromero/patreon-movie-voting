import { useCallback } from "react";
import { Movie } from "@/app/types/movie";
import {
   addRequestApi,
   deleteRequestApi,
   addRequestVote,
   removeRequestVote,
   updateRequestWatchStatus,
   updateRequestHolidayStatus,
   updateRequestLink,
} from "@/lib/api/requests";
import { Summary } from "@/app/types/summary";
import { User } from "@/app/types/user";

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
   setMoviesList,
   setSummary,
}: {
   setMoviesList: React.Dispatch<React.SetStateAction<Movie[]>>;
   setSummary: React.Dispatch<React.SetStateAction<Summary | null>>;
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
      try {
         const data = await addRequestApi({ id: tmdbId, mediaType });

         setMoviesList((prev) => [data.request, ...prev]);
         setSummary(data.summary);

         return data.request;
      } catch (err) {
         throw err;
      }
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
      const data = await deleteRequestApi(movieId);

      setMoviesList((prev) => prev.filter((movie) => movie._id !== movieId));
      setSummary(data.summary);
   };

   const setWatchStatus = async (
      movieId: string,
      status: "channel" | "seen" | "rewatch" | "rewatchFriend" | "unseen",
   ) => {
      const request = await updateRequestWatchStatus(movieId, status);

      setMoviesList((prev) =>
         prev.map((movie) => (movie._id === movieId ? request : movie)),
      );
   };

   const setHolidayStatus = async (
      movieId: string,
      holiday: "halloween" | "christmas",
   ) => {
      const request = await updateRequestHolidayStatus(movieId, holiday);

      setMoviesList((prev) =>
         prev.map((movie) => (movie._id === movieId ? request : movie)),
      );
   };

   const setReactionLink = async (
      movieId: string,
      links: { patreon: string; youtube: string },
   ) => {
      const request = await updateRequestLink(movieId, links);

      setMoviesList((prev) =>
         prev.map((movie) => (movie._id === movieId ? request : movie)),
      );
   };

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
