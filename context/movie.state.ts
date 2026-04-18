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
   moviesList: Movie[];
   filteredMoviesList: Movie[];

   filterOptions: MovieFilterOptions;
   sortOptions: MovieSortOptions;
   setSortOptions: React.Dispatch<React.SetStateAction<MovieSortOptions>>;
   statusSortOption: MovieStatusSortOption;

   searchTitle: string;
   searchDirector: string;
   searchActor: string;
   searchComposer: string;

   isRankingOn: boolean;

   isUserUnderRequestLimit: boolean;
   requestsRemaining: number | undefined;
   requestsThisMonth: Movie[];
};

export function useMovieState() {
   const [moviesList, setMoviesList] = useState<Movie[]>([]);

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

   const [searchTitle, setSearchTitle] = useState("");
   const [searchDirector, setSearchDirector] = useState("");
   const [searchActor, setSearchActor] = useState("");
   const [searchComposer, setSearchComposer] = useState("");

   const [isRankingOn, setIsRankingOn] = useState(false);

   const [isUserUnderRequestLimit, setIsUserUnderRequestLimit] = useState(true);
   const [requestsRemaining, setRequestsRemaining] = useState<
      number | undefined
   >();

   const [requestsThisMonth, setRequestsThisMonth] = useState<Movie[]>([]);

   return {
      moviesList,
      setMoviesList,

      filterOptions,
      setFilterOptions,

      sortOptions,
      setSortOptions,

      statusSortOption,
      setStatusSortOption,

      searchTitle,
      setSearchTitle,
      searchDirector,
      setSearchDirector,
      searchActor,
      setSearchActor,
      searchComposer,
      setSearchComposer,

      isRankingOn,
      setIsRankingOn,

      isUserUnderRequestLimit,
      setIsUserUnderRequestLimit,

      requestsRemaining,
      setRequestsRemaining,

      requestsThisMonth,
      setRequestsThisMonth,
   };
}
