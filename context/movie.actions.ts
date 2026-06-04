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
   fetchMonthlySummary,
} from "@/lib/api/requests";
import { Summary } from "@/app/types/summary";
import { RequestsData } from "@/app/types/request";
import { fetchRequestsApi, fetchRequestsServer } from "@/lib/api/requests";
import { useRequestQuery } from "@/app/hooks/useRequestQuery";

export interface AddRequestMovieInput {
   id: number;
   media_type?: "movie" | "tv";
}

export type MovieActions = {
   fetchRequests: (query: any) => Promise<void>;

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
   setRequestsData,
   setSummary,
   isLoading,
   setIsLoading,
}: {
   setSummary: React.Dispatch<React.SetStateAction<Summary | null>>;
   setRequestsData: React.Dispatch<
      React.SetStateAction<RequestsData | undefined>
   >;
   isLoading: boolean;
   setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
   const fetchRequests = useCallback(async (query: any) => {
      try {
         //setIsLoading(true);
         const data = await fetchRequestsServer(query);
         setRequestsData(data);
      } catch (err) {
      } finally {
         //setIsLoading(false);
      }
   }, []);

   const addRequestToList = async ({
      tmdbId,
      mediaType,
   }: {
      tmdbId: number;
      mediaType: "movie" | "tv";
   }) => {
      try {
         const data = await addRequestApi({ id: tmdbId, mediaType });
         //setMoviesList((prev) => [data.request, ...prev]);
         setSummary(data.summary);

         return data.request;
      } catch (err) {
         const summary = await fetchMonthlySummary();
         setSummary(summary);
         throw err;
      }
   };

   const removeVoteFromRequest = async (movieId: string) => {
      const data = await removeRequestVote(movieId);

      if (data.deleted) {
         //setMoviesList((prev) => prev.filter((movie) => movie._id !== movieId));
         setSummary(data.summary);
         return;
      }

      if (!data.request) return;

      // setMoviesList((prev) =>
      //    prev.map((movie) => (movie._id === movieId ? data.request : movie)),
      // );
      setSummary(data.summary);
   };

   const addVoteToRequest = async (movieId: string) => {
      const data = await addRequestVote(movieId);

      // setMoviesList((prev) =>
      //    prev.map((movie) => (movie._id === movieId ? data.request : movie)),
      // );
   };

   const removeRequestFromList = async (movieId: string) => {
      const summary = await deleteRequestApi(movieId);

      // setMoviesList((prev) => prev.filter((movie) => movie._id !== movieId));
      setSummary(summary);
   };

   const setWatchStatus = async (
      movieId: string,
      status: "channel" | "seen" | "rewatch" | "rewatchFriend" | "unseen",
   ) => {
      const data = await updateRequestWatchStatus(movieId, status);

      // setMoviesList((prev) =>
      //    prev.map((movie) => (movie._id === movieId ? data.request : movie)),
      // );
      setSummary(data.summary);
   };

   const setHolidayStatus = async (
      movieId: string,
      holiday: "halloween" | "christmas",
   ) => {
      const request = await updateRequestHolidayStatus(movieId, holiday);

      // setMoviesList((prev) =>
      //    prev.map((movie) => (movie._id === movieId ? request : movie)),
      // );
   };

   const setReactionLink = async (
      movieId: string,
      links: { patreon: string; youtube: string },
   ) => {
      const request = await updateRequestLink(movieId, links);

      // setMoviesList((prev) =>
      //    prev.map((movie) => (movie._id === movieId ? request : movie)),
      // );
   };

   return {
      fetchRequests,
      addVoteToRequest,
      removeRequestFromList,
      removeVoteFromRequest,
      setWatchStatus,
      setHolidayStatus,
      setReactionLink,
      addRequestToList,
   };
}
