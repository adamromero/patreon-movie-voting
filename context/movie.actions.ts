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
import {
   RequestsData,
   RequestVoteResponse,
   RequestRemoveVoteResponse,
} from "@/app/types/request";
import { fetchRequestsByParams } from "@/lib/api/requests";
import { useRequestQuery } from "@/app/hooks/useRequestQuery";

export interface AddRequestMovieInput {
   id: number;
   media_type?: "movie" | "tv";
}

export type MovieActions = {
   fetchRequests: () => Promise<void>;

   addRequestToList: (args: {
      tmdbId: number;
      mediaType: "movie" | "tv";
   }) => Promise<Movie | null>;

   addVoteToRequest: (movieId: string) => Promise<RequestVoteResponse>;

   removeRequestFromList: (movieId: string) => Promise<unknown>;

   removeVoteFromRequest: (
      movieId: string,
   ) => Promise<RequestRemoveVoteResponse>;

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
   requestsData,
   setRequestsData,
   setSummary,
   isLoading,
   setIsLoading,
}: {
   requestsData: RequestsData | undefined;
   setSummary: React.Dispatch<React.SetStateAction<Summary | null>>;
   setRequestsData: React.Dispatch<
      React.SetStateAction<RequestsData | undefined>
   >;
   isLoading: boolean;
   setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
   const query = useRequestQuery();

   const fetchRequests = useCallback(async () => {
      try {
         //setIsLoading(true);
         const data = await fetchRequestsByParams(query);
         setRequestsData(data);
      } catch (err) {
      } finally {
         //setIsLoading(false);
      }
   }, [query]);

   const addRequestToList = async ({
      tmdbId,
      mediaType,
   }: {
      tmdbId: number;
      mediaType: "movie" | "tv";
   }) => {
      try {
         const data = await addRequestApi({ id: tmdbId, mediaType });
         await fetchRequests();
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
         await fetchRequests();
         setSummary(data.summary);
         return {
            deleted: data.deleted,
            tmdbId: data.tmdbId,
            mediaType: data.mediaType,
         };
      }

      if (!data.request) return;

      await fetchRequests();
      setSummary(data.summary);
      return data;
   };

   const addVoteToRequest = async (movieId: string) => {
      const data = await addRequestVote(movieId);
      await fetchRequests();
      return data;
   };

   const removeRequestFromList = async (movieId: string) => {
      const summary = await deleteRequestApi(movieId);

      await fetchRequests();
      setSummary(summary);
   };

   const setWatchStatus = async (
      movieId: string,
      status: "channel" | "seen" | "rewatch" | "rewatchFriend" | "unseen",
   ) => {
      const data = await updateRequestWatchStatus(movieId, status);

      await fetchRequests();
      setSummary(data.summary);
   };

   const setHolidayStatus = async (
      movieId: string,
      holiday: "halloween" | "christmas",
   ) => {
      const request = await updateRequestHolidayStatus(movieId, holiday);

      await fetchRequests();
   };

   const setReactionLink = async (
      movieId: string,
      links: { patreon: string; youtube: string },
   ) => {
      const request = await updateRequestLink(movieId, links);

      await fetchRequests();
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
