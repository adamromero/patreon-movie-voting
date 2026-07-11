"use client";

import React, { createContext, useContext, useEffect } from "react";
import { useMovieState, MovieState } from "./movie.state";
import { useMovieActions, MovieActions } from "./movie.actions";
import { Summary } from "@/app/types/summary";
import { User } from "@/app/types/user";

import { useSearchParams, useRouter } from "next/navigation";

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

   const searchParams = useSearchParams();
   const params = new URLSearchParams(searchParams);
   const router = useRouter();

   // useEffect(() => {
   //    if (!params.get("sort")) {
   //       params.set("sort", "va");
   //       router.push(`?${params.toString()}`, { scroll: false });
   //    }
   // }, []);

   const actions = useMovieActions({
      requestsData: state.requestsData,
      setRequestsData: state.setRequestsData,
      setSummary: state.setSummary,
      isLoading: state.isLoading,
      setIsLoading: state.setIsLoading,
      params,
   });

   const value: MovieContextValue = {
      ...state,
      ...actions,
   };

   return (
      <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
   );
};
