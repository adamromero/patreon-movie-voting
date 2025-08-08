import { Movie } from "./movie";

export interface StoreState {
   // movieDataSlice
   moviesList: Movie[];
   moviesMap: Record<string, Movie>;
   moviesByDateMap: Record<string, Movie>;
   rankedMovies: Record<string, number>;
   filteredMoviesList: Movie[];
   searchTitle: string;
   searchDirector: string;
   searchActor: string;
   searchComposer: string;
   filterOptions: {
      alphabetical: string;
      votes: string;
      rating: string;
      chronological: string;
      added: string;
      type: string;
      genre: string;
      requests: string;
      status: string;
      statusSort: string;
      published: string;
   };
   fetchMovies: () => Promise<void>;
   addRequestToList: (movie: any, currentUser: string) => Promise<Movie | null>;
   removeRequestFromList: (_id: string) => Promise<void>;
   setFilteredMoviesList: (movies: Movie[]) => void;
   setSearchTitle: (title: string) => void;
   setSearchDirector: (director: string) => void;
   setSearchActor: (actor: string) => void;
   setSearchComposer: (composer: string) => void;
   setFilterOptions: (options: Partial<StoreState["filterOptions"]>) => void;
   processUserRequestsByDate: (
      id: string,
      isCreator: boolean,
      isProducer: boolean
   ) => void;

   // votingSlice
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

   // requestMetaSlice
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
