import { useState } from "react";
import {
   genre,
   type,
   status,
   chronological,
   added,
   alphabetical,
   votes,
   requests,
   rating,
   statusSort,
   published,
} from "@/app/utils/filtersOptions";
import { Movie } from "@/app/types/movie";
import { Summary } from "@/app/types/summary";
import { User } from "@/app/types/user";
import { RequestsData } from "@/app/types/request";

export interface MovieFilterOptions {
   type: string;
   genre: string;
   requests: string;
   status: string;
}

export interface MovieSortOptions {
   alphabetical: string;
   votes: string;
   rating: string;
   chronological: string;
   added: string;
   published: string;
}

export interface MovieStatusSortOption {
   statusSort: string;
}

export type MovieState = {
   user: User | undefined;

   requestsData: RequestsData | undefined;
   setRequestsData: React.Dispatch<
      React.SetStateAction<RequestsData | undefined>
   >;

   filterOptions: MovieFilterOptions;
   setFilterOptions: React.Dispatch<React.SetStateAction<MovieFilterOptions>>;

   sortOptions: MovieSortOptions;
   setSortOptions: React.Dispatch<React.SetStateAction<MovieSortOptions>>;
   statusSortOption: MovieStatusSortOption;
   setStatusSortOption: React.Dispatch<
      React.SetStateAction<MovieStatusSortOption>
   >;

   isRankingOn: boolean;

   disableAddButton: boolean;

   requestsRemaining: number | undefined;
   requestsThisMonth: Movie[];

   summary: Summary | null;
   setSummary: React.Dispatch<React.SetStateAction<Summary | null>>;

   isLoading: boolean;
   setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useMovieState(
   initialSummary: Summary | null = null,
   initialUser?: User,
) {
   const [user] = useState<User | undefined>(initialUser);

   const [requestsData, setRequestsData] = useState<RequestsData>();

   const [filterOptions, setFilterOptions] = useState<MovieFilterOptions>({
      type: type.Default,
      genre: genre.Default,
      requests: requests.Default,
      status: status.Default,
   });
   const [sortOptions, setSortOptions] = useState<MovieSortOptions>({
      alphabetical: alphabetical.Default,
      votes: votes.Ascending,
      rating: rating.Default,
      chronological: chronological.Default,
      added: added.Default,
      published: published.Default,
   });
   const [statusSortOption, setStatusSortOption] =
      useState<MovieStatusSortOption>({
         statusSort: statusSort.Unwatched,
      });

   const [isRankingOn, setIsRankingOn] = useState(false);

   const [disableAddButton, setDisableAddButton] = useState(false);

   const [requestsRemaining, setRequestsRemaining] = useState<
      number | undefined
   >(initialSummary?.remaining ?? undefined);

   const [requestsThisMonth, setRequestsThisMonth] = useState<Movie[]>([]);

   const [summary, setSummary] = useState<Summary | null>(initialSummary);

   const [isLoading, setIsLoading] = useState(false);

   return {
      user,

      requestsData,
      setRequestsData,

      filterOptions,
      setFilterOptions,

      sortOptions,
      setSortOptions,

      statusSortOption,
      setStatusSortOption,

      isRankingOn,
      setIsRankingOn,

      requestsRemaining,
      setRequestsRemaining,

      requestsThisMonth,
      setRequestsThisMonth,

      disableAddButton,
      setDisableAddButton,

      summary,
      setSummary,

      isLoading,
      setIsLoading,
   };
}
