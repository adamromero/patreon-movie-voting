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

   moviesList: Movie[];
   filteredMoviesList: Movie[];

   filterOptions: MovieFilterOptions;
   setFilterOptions: React.Dispatch<React.SetStateAction<MovieFilterOptions>>;

   sortOptions: MovieSortOptions;
   setSortOptions: React.Dispatch<React.SetStateAction<MovieSortOptions>>;
   statusSortOption: MovieStatusSortOption;
   setStatusSortOption: React.Dispatch<
      React.SetStateAction<MovieStatusSortOption>
   >;

   searchTitle: string;
   setSearchTitle: React.Dispatch<React.SetStateAction<string>>;
   searchDirector: string;
   setSearchDirector: React.Dispatch<React.SetStateAction<string>>;
   searchActor: string;
   setSearchActor: React.Dispatch<React.SetStateAction<string>>;
   searchComposer: string;
   setSearchComposer: React.Dispatch<React.SetStateAction<string>>;

   isRankingOn: boolean;

   disableAddButton: boolean;

   isUserUnderRequestLimit: boolean;
   requestsRemaining: number | undefined;
   requestsThisMonth: Movie[];

   summary: Summary | null;
   setSummary: React.Dispatch<React.SetStateAction<Summary | null>>;
};

export function useMovieState(
   initialSummary: Summary | null = null,
   initialUser?: User,
) {
   const [user] = useState<User | undefined>(initialUser);

   const [moviesList, setMoviesList] = useState<Movie[]>([]);
   const [filteredMoviesList, setFilteredMoviesList] = useState<Movie[]>([]);

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

   const [disableAddButton, setDisableAddButton] = useState(false);

   const [isUserUnderRequestLimit, setIsUserUnderRequestLimit] = useState(true);
   const [requestsRemaining, setRequestsRemaining] = useState<
      number | undefined
   >();

   const [requestsThisMonth, setRequestsThisMonth] = useState<Movie[]>([]);

   const [summary, setSummary] = useState<Summary | null>(initialSummary);

   return {
      user,

      moviesList,
      setMoviesList,

      filteredMoviesList,

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

      disableAddButton,
      setDisableAddButton,

      summary,
      setSummary,
   };
}
