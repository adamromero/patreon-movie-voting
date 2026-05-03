"use client";

import React, { createContext, useContext, useEffect } from "react";
import { useMovieState, MovieState } from "./movie.state";
import { useMovieActions, MovieActions } from "./movie.actions";
import { Summary } from "@/app/types/summary";
import { User } from "@/app/types/user";

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
   initialSummary: Summary | null;
   initialUser: User | undefined;
}

export const MovieProvider = ({
   children,
   initialSummary,
   initialUser,
}: MovieProviderProps) => {
   const state = useMovieState(initialSummary, initialUser);

   const actions = useMovieActions({
      setMoviesList: state.setMoviesList,
      setSummary: state.setSummary,
   });

   useEffect(() => {
      actions.fetchRequests();
   }, []);

   const value: MovieContextValue = {
      ...state,
      ...actions,
   };

   return (
      <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
   );
};
