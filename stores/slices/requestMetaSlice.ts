import { StateCreator } from "zustand";
import { Movie } from "../../app/types/movie";
import { StoreState } from "../../app/types/store";

export interface RequestMetaSlice {
   isUserUnderRequestLimit: boolean;
   requestsRemaining: number;
   requestsThisMonth: Movie[];
   requestWatchStatus: Record<
      string,
      "seen" | "unseen" | "reacted" | "rewatch"
   >;
   requestHolidayStatus: Record<string, "none" | "halloween" | "christmas">;
   onChannelRequestLinks: Record<string, { patreon: string; youtube: string }>;
   disableButton: boolean;
   isRankingOn: boolean;

   updateRequestLimits: (
      userId: string,
      movies: Movie[],
      limit: number
   ) => void;
   setWatchStatus: (
      movieId: string,
      status: "channel" | "seen" | "rewatch" | "unseen"
   ) => Promise<Movie | null>;
   setHolidayStatus: (
      movieId: string,
      status: "halloween" | "christmas"
   ) => Promise<Movie | null>;
   setReactionLink: (
      movieId: string,
      links: { patreon: string; youtube: string }
   ) => Promise<Movie | null>;
   toggleRanking: () => void;
   setDisableButton: (disabled: boolean) => void;
}

export const createRequestMetaSlice: StateCreator<
   StoreState,
   [],
   [],
   RequestMetaSlice
> = (set, get) => ({
   isUserUnderRequestLimit: true,
   requestsRemaining: 0,
   requestsThisMonth: [],
   requestWatchStatus: {},
   requestHolidayStatus: {},
   onChannelRequestLinks: {},
   disableButton: false,
   isRankingOn: false,

   updateRequestLimits: (userId, movies, limit) => {
      const currentDate = new Date();
      const currentMonthStart = new Date(
         currentDate.getFullYear(),
         currentDate.getMonth(),
         1
      );
      const requestsThisMonth = movies.filter(
         (movie) =>
            movie.requester === userId &&
            new Date(movie.createdAt) >= currentMonthStart
      );

      const remaining = limit - requestsThisMonth.length;
      const underLimit = remaining > 0;

      set({
         requestsThisMonth,
         requestsRemaining: remaining,
         isUserUnderRequestLimit: underLimit,
         disableButton: !underLimit,
      });
   },

   setWatchStatus: async (movieId, status) => {
      const { moviesList, moviesMap } = get();
      const selectedMovieVote = moviesList.find(
         (movie) => movie._id === movieId
      );
      if (!selectedMovieVote) return null;

      let channel = false,
         seen = false,
         rewatch = false;

      if (status === "channel") {
         channel = true;
      } else if (status === "seen") {
         seen = true;
      } else if (status === "rewatch") {
         rewatch = true;
      } else if (status === "unseen") {
         channel = false;
         seen = false;
         rewatch = false;
      }

      const updatedMovieVote = {
         ...selectedMovieVote,
         hasReacted: channel,
         hasSeen: seen,
         isRewatch: rewatch,
      };

      const config = {
         method: "PUT",
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
         },
         body: JSON.stringify(updatedMovieVote),
      };

      const updatedMoviesList = moviesList.map((movie) => {
         return movie._id === movieId ? updatedMovieVote : movie;
      });

      try {
         const response = await fetch(`/api/movies/${movieId}`, config);
         const data = await response.json();

         const updatedMoviesMap = {
            ...moviesMap,
            [`${updatedMovieVote.data.id}-${updatedMovieVote.data.Type}`]:
               updatedMovieVote,
         };

         set({
            moviesList: updatedMoviesList,
            moviesMap: updatedMoviesMap,
         });

         return data;
      } catch (e) {
         console.error("Error setting watch status:", e);
         return null;
      }
   },

   setHolidayStatus: async (movieId, status) => {
      const { moviesList, moviesMap } = get();
      const selectedMovieVote = moviesList.find(
         (movie) => movie._id === movieId
      );
      if (!selectedMovieVote) return null;

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
         method: "PUT",
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
         },
         body: JSON.stringify(updatedMovieVote),
      };

      const updatedMoviesList = moviesList.map((movie) => {
         return movie._id === movieId ? updatedMovieVote : movie;
      });

      try {
         const response = await fetch(`/api/movies/${movieId}`, config);
         const data = await response.json();

         const updatedMoviesMap = {
            ...moviesMap,
            [`${updatedMovieVote.data.id}-${updatedMovieVote.data.Type}`]:
               updatedMovieVote,
         };

         set({
            moviesList: updatedMoviesList,
            moviesMap: updatedMoviesMap,
         });

         return data;
      } catch (e) {
         console.error("Error setting holiday status:", e);
         return null;
      }
   },

   setReactionLink: async (movieId, links) => {
      const { moviesList, moviesMap } = get();
      const selectedMovieVote = moviesList.find(
         (movie) => movie._id === movieId
      );
      if (!selectedMovieVote) return null;

      const updatedMovieVote = {
         ...selectedMovieVote,
         links,
         publishedAt: selectedMovieVote.publishedAt
            ? selectedMovieVote.publishedAt
            : new Date().toISOString(),
      };

      const config = {
         method: "PUT",
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
         },
         body: JSON.stringify(updatedMovieVote),
      };

      const updatedMoviesList = moviesList.map((movie) => {
         return movie._id === movieId ? updatedMovieVote : movie;
      });

      try {
         const response = await fetch(`/api/movies/${movieId}`, config);
         const data = await response.json();

         const updatedMoviesMap = {
            ...moviesMap,
            [`${updatedMovieVote.data.id}-${updatedMovieVote.data.Type}`]:
               updatedMovieVote,
         };

         set({
            moviesList: updatedMoviesList,
            moviesMap: updatedMoviesMap,
         });

         return data;
      } catch (e) {
         console.error("Error setting reaction link:", e);
         return null;
      }
   },

   toggleRanking: () =>
      set((state) => ({
         isRankingOn: !state.isRankingOn,
      })),

   setDisableButton: (disabled: boolean) => {
      set({ disableButton: disabled });
   },
});
