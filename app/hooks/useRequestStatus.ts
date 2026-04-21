import { useMemo } from "react";
import { useMovieContext } from "@/context/MovieContext";

export const useRequestStatus = (
   userId: string,
   isCreator: boolean,
   isProducer: boolean,
) => {
   const { moviesList } = useMovieContext();

   return useMemo(() => {
      const currentDate = new Date();

      const startOfMonth = new Date(
         currentDate.getFullYear(),
         currentDate.getMonth(),
         1,
      );

      const startOfNextMonth = new Date(
         currentDate.getFullYear(),
         currentDate.getMonth() + 1,
         1,
      );

      const filtered = moviesList.filter((movie) => {
         const createdAtDate = new Date(movie.createdAt);

         return (
            createdAtDate >= startOfMonth &&
            createdAtDate < startOfNextMonth &&
            movie.requester === userId &&
            !movie.hasSeen &&
            !movie.hasReacted
         );
      });

      const requestLimit = isProducer ? 3 : 2;

      const isUserUnderRequestLimit = isCreator
         ? true
         : filtered.length < requestLimit;

      return {
         moviesThisMonth: filtered,
         isUserUnderRequestLimit,
         requestsRemaining: requestLimit - filtered.length,
      };
   }, [moviesList, userId, isCreator, isProducer]);
};
