// stores/slices/votingSlice.ts
import { StateCreator } from "zustand";
import { Movie } from "../../app/types/movie";
import { StoreState } from "../../app/types/store";
import { updateMovieVotes } from "@/lib/api/movies";

export interface VotingSlice {
   addVoteToRequest: (
      movieId: string,
      voters: string[],
      currentUser: string
   ) => Promise<void>;
   removeVoteFromRequest: (
      movieId: string,
      voters: string[],
      currentUser: string
   ) => Promise<void>;
}

export const createVotingSlice: StateCreator<
   StoreState,
   [],
   [],
   VotingSlice
> = (set, get) => ({
   addVoteToRequest: async (
      movieId: string,
      voters: string[],
      currentUser: string
   ) => {
      const { moviesList, moviesMap } = get();

      // Prevent duplicate vote
      if (voters.includes(currentUser)) return;

      const newVoters = [...voters, currentUser];
      const votedMovie = moviesList.find((movie) => movie._id === movieId);
      if (!votedMovie) return;

      const updatedMovieVote = { ...votedMovie, voters: newVoters };

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

         return data;
      } catch (e) {
         console.error("Error adding vote:", e);
      }
   },

   removeVoteFromRequest: async (
      movieId: string,
      voters: string[],
      currentUser: string
   ) => {
      const { moviesList, moviesMap } = get();
      const newVoters = voters.filter((voter) => voter !== currentUser);
      const removeVoteFromRequest = moviesList.find(
         (movie) => movie._id === movieId
      );
      if (!removeVoteFromRequest) return;

      const updatedMovieVote = { ...removeVoteFromRequest, voters: newVoters };

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

            const deletedMovie = await response.json();
            const updatedMoviesList = moviesList.filter(
               (movie) => movie._id !== deletedMovie._id
            );

            const updatedMoviesMap = { ...moviesMap };
            delete updatedMoviesMap[
               `${deletedMovie.data.id}-${deletedMovie.data.Type}`
            ];

            const sortedMovies = updatedMoviesList
               .filter((movie) => !movie.hasSeen && !movie.hasReacted)
               .sort((a, b) => b.voters.length - a.voters.length);

            const rankedMoviesObject = sortedMovies.reduce(
               (acc, movie, index) => {
                  if (movie.data.imdbID) {
                     acc[movie.data.imdbID] = index + 1;
                  }
                  return acc;
               },
               {} as Record<string, number>
            );

            set({
               moviesList: updatedMoviesList,
               moviesMap: updatedMoviesMap,
               rankedMovies: rankedMoviesObject,
            });
         } catch (e) {
            console.error("Error removing vote:", e);
         }
      } else {
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

            const sortedMovies = updatedMoviesList
               .filter((movie) => !movie.hasSeen && !movie.hasReacted)
               .sort((a, b) => b.voters.length - a.voters.length);

            const rankedMoviesObject = sortedMovies.reduce(
               (acc, movie, index) => {
                  if (movie.data.imdbID) {
                     acc[movie.data.imdbID] = index + 1;
                  }
                  return acc;
               },
               {} as Record<string, number>
            );

            set({
               moviesList: updatedMoviesList,
               moviesMap: updatedMoviesMap,
               rankedMovies: rankedMoviesObject,
            });

            return data;
         } catch (e) {
            console.error("Error removing vote:", e);
         }
      }
   },
});
