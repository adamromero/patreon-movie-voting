"use client";

import React, { createContext, useContext, useEffect } from "react";
import { useMovieState, MovieState } from "./movie.state";
import { useMovieActions, MovieActions } from "./movie.actions";

type MovieContextValue = MovieState & MovieActions;

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
   const state = useMovieState();

   const actions = useMovieActions({
      moviesList: state.moviesList,
      setMoviesList: state.setMoviesList,
   });

   useEffect(() => {
      actions.fetchMovies();
   }, [actions.fetchMovies]);

   const value: MovieContextValue = {
      ...state,
      ...actions,
   };

   return (
      <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
   );
};
