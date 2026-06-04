import { useMovieContext } from "@/context/MovieContext";
import { useMemo } from "react";
import { Movie } from "../types/movie";

export const useMoviesMap = (input: string) => {
   // TODO: need to query the request data based on what gets searched for in the modal
   const { requestsData } = useMovieContext();

   return useMemo(() => {
      const map = new Map<string, Movie>();

      (requestsData?.requests ?? []).forEach((request) => {
         const key = `${request.data.id}-${request.data.Type}`;
         map.set(key, request);
      });

      return map;
   }, [requestsData?.requests]);
};
