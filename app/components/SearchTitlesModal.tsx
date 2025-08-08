"use client";

import React, { useState, useEffect, useRef } from "react";
import ReactedState from "./SearchTitles/SearchStates/ReactedState";
import SeenState from "./SearchTitles/SearchStates/SeenState";
import UnReactedState from "./SearchTitles/SearchStates/UnReactedState";
import LimitReachedState from "./SearchTitles/SearchStates/LimitReachedState";
import UnderLimitState from "./SearchTitles/SearchStates/UnderLimitState";
import SearchFields from "./SearchTitles/SearchFields";
import { useBoundStore } from "@/stores/useBoundStore";

import { APIMovieData } from "../types/movie";

interface SearchTitlesModalProps {
   user: { id: string };
}

type MovieData = APIMovieData;

const SearchTitlesModal: React.FC<SearchTitlesModalProps> = ({ user }) => {
   const [input, setInput] = useState("");
   const [title, setTitle] = useState("");
   const [inputTitle, setInputTitle] = useState("");
   const [inputYear, setInputYear] = useState("");
   const [inputImdbID, setInputImdbID] = useState("");
   const [searchTitle, setSearchTitle] = useState("");
   const [searchYear, setSearchYear] = useState("");
   const [searchImdbID, setSearchImdbID] = useState("");
   const [titlesFromAPI, setTitlesFromAPI] = useState<MovieData[]>([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");
   const currentUser = user.id;

   const {
      addRequestToList,
      addVoteToRequest,
      removeVoteFromRequest,
      isUserUnderRequestLimit,
      disableButton,
      moviesMap,
   } = useBoundStore();

   const inputRef = useRef<HTMLInputElement>(null);
   const [movieIDCollection, setMovieIDCollection] = useState<
      Record<string | number, boolean>
   >({});
   const [disabledButtonStates, setDisabledButtonStates] = useState<
      Record<string | number, boolean>
   >({});

   const API_URL = `https://api.themoviedb.org/3/search/multi?query=${title}&include_adult=false&language=en-US&page=1&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;

   useEffect(() => {
      const fetchMovieTitles = async () => {
         if (title) {
            setLoading(true);
            inputRef.current?.blur();

            const response = await fetch(API_URL);
            const data = await response.json();

            if (data.results.length) {
               const titles = data.results.filter(
                  (title: any) =>
                     title.media_type === "movie" || title.media_type === "tv"
               );
               setTitlesFromAPI(titles);
               const ids = data.results.map((entry: any) => entry.id);
               const result = ids.reduce(
                  (
                     obj: Record<string | number, boolean>,
                     num: string | number
                  ) => {
                     obj[num] = false;
                     return obj;
                  },
                  {} as Record<string | number, boolean>
               );

               setMovieIDCollection(result);
               setDisabledButtonStates(result);
               setInput("");
            } else {
               setTitlesFromAPI([]);
               setError("Title not found!");
            }

            setLoading(false);
         }
      };
      if (inputRef.current) {
         inputRef.current.focus();
      }
      fetchMovieTitles();
   }, [title]);

   useEffect(() => {
      const fetchTitleByYear = async () => {
         if (searchTitle && searchYear) {
            const API_URL_FILM = `https://api.themoviedb.org/3/search/movie?query=${searchTitle}&include_adult=false&language=en-US&primary_release_year=${searchYear}&page=1&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
            const responseFilm = await fetch(API_URL_FILM);
            const dataFilm = await responseFilm.json();

            if (dataFilm.total_results) {
               clearSearchState({
                  ...dataFilm.results[0],
                  media_type: "movie",
               });
            } else {
               const API_URL_TV = `https://api.themoviedb.org/3/search/tv?query=${searchTitle}&include_adult=false&language=en-US&page=1&year=${searchYear}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
               const responseTV = await fetch(API_URL_TV);
               const dataTV = await responseTV.json();

               if (dataTV.total_results) {
                  clearSearchState({
                     ...dataTV.results[0],
                     media_type: "tv",
                  });
               } else {
                  setTitlesFromAPI([]);
                  setError("Title not found!");
               }
            }

            setLoading(false);
         }
      };

      fetchTitleByYear();
   }, [searchTitle, searchYear]);

   useEffect(() => {
      const fetchByImdbID = async () => {
         if (searchImdbID) {
            const API_URL = `https://api.themoviedb.org/3/find/${searchImdbID}?external_source=imdb_id&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
            const response = await fetch(API_URL);
            const data = await response.json();
            const { movie_results, tv_results } = data;

            if (movie_results.length) {
               const results = movie_results[0];
               clearSearchState({ ...results, media_type: "movie" });
            } else if (tv_results.length) {
               const results = tv_results[0];
               clearSearchState({ ...results, media_type: "tv" });
            } else {
               setTitlesFromAPI([]);
               setError("Title not found!");
            }

            setLoading(false);
         }
      };

      fetchByImdbID();
   }, [searchImdbID]);

   const getMovieData = (selectedMovie: APIMovieData) => {
      const key = `${selectedMovie?.id}-${selectedMovie?.media_type}`;
      return moviesMap[key];
   };

   const clearSearchState = (data: MovieData) => {
      setTitlesFromAPI([data]);
      setInputTitle("");
      setInputYear("");
      setInputImdbID("");
      setSearchTitle("");
      setSearchYear("");
      setSearchImdbID("");
   };

   const isMovieInList = (selectedMovie: APIMovieData) => {
      return !!getMovieData(selectedMovie);
   };

   const isMovieReacted = (selectedMovie: APIMovieData) => {
      const movie = getMovieData(selectedMovie);
      return movie ? movie.hasReacted : false;
   };

   const isMovieSeen = (selectedMovie: APIMovieData) => {
      const movie = getMovieData(selectedMovie);
      return movie ? movie.hasSeen : false;
   };

   const isMovieRewatch = (selectedMovie: APIMovieData) => {
      const movie = getMovieData(selectedMovie);
      return movie ? movie.isRewatch : false;
   };

   const getMovieVoteTotal = (selectedMovie: APIMovieData) => {
      const movie = getMovieData(selectedMovie);
      return movie ? movie.voters.length : 0;
   };

   const getPatreonLink = (selectedMovie: APIMovieData) => {
      const movie = getMovieData(selectedMovie);
      return movie ? movie.links.patreon : "";
   };

   const getYouTubeLink = (selectedMovie: APIMovieData) => {
      const movie = getMovieData(selectedMovie);
      return movie ? movie.links.youtube : "";
   };

   const handleTitleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (input) {
         setTitle(encodeURIComponent(input.trim()));
      }
   };

   const handleImdbIDSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const regex = /^[t0-9]+$/;
      if (inputImdbID) {
         const inputImdbIDTrimmed = inputImdbID.trim();
         setSearchImdbID(
            regex.test(inputImdbIDTrimmed) ? inputImdbIDTrimmed : ""
         );
      }
   };

   const handleTitleYearSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (inputTitle) setSearchTitle(encodeURIComponent(inputTitle.trim()));
      if (inputYear) setSearchYear(inputYear);
   };

   const handleMovieSelection = async (movie: MovieData) => {
      setMovieIDCollection({ [movie?.id]: true });
      setDisabledButtonStates({ [movie?.id]: true });
      addRequestToList(movie, currentUser);
   };

   const isMovieVotedByUser = (selectedMovie: APIMovieData) => {
      const key = `${selectedMovie?.id}-${selectedMovie?.media_type}`;
      const movie = moviesMap[key];
      return movie ? movie.voters.includes(currentUser) : false;
   };

   const handleRemoveVote = (selectedMovie: APIMovieData) => {
      const movie = getMovieData(selectedMovie);
      if (movie) {
         removeVoteFromRequest(movie._id, movie.voters, currentUser);
         setDisabledButtonStates({ [selectedMovie?.id]: false });
      }
   };

   const handleCastVote = (selectedMovie: APIMovieData) => {
      const movie = getMovieData(selectedMovie);
      if (movie) {
         addVoteToRequest(movie._id, movie.voters, currentUser);
      }
   };

   const renderMovieStatus = (movie: MovieData) => {
      //props for search state components
      const sharedMovieProps = { movie, movieIDCollection };

      const reactedProps = {
         ...sharedMovieProps,
         getPatreonLink,
         getYouTubeLink,
      };

      const unseenProps = {
         ...sharedMovieProps,
         isMovieRewatch,
         getMovieVoteTotal,
         isMovieVotedByUser,
         handleRemoveVote,
         handleCastVote,
      };

      const underLimitProps = {
         ...sharedMovieProps,
         handleMovieSelection,
         disabledButtonStates,
         disableButton,
      };

      if (isMovieInList(movie)) {
         if (isMovieSeen(movie)) return <SeenState {...sharedMovieProps} />;
         return isMovieReacted(movie) ? (
            <ReactedState {...reactedProps} />
         ) : (
            <UnReactedState {...unseenProps} />
         );
      } else {
         return isUserUnderRequestLimit ? (
            <UnderLimitState {...underLimitProps} />
         ) : (
            <LimitReachedState {...sharedMovieProps} />
         );
      }
   };

   const searchFieldsProps = {
      handleTitleSubmit,
      setInput,
      handleTitleYearSubmit,
      setInputTitle,
      setInputYear,
      handleImdbIDSubmit,
      setInputImdbID,
      input,
      inputTitle,
      inputYear,
      inputImdbID,
      inputRef,
   };

   return (
      <div>
         <div className="flex flex-col md:flex-row gap-2 items-center pb-[16px] mt-[35px] md:mt-0 mr-0 md:mr-[35px]">
            <div className="flex flex-col md:flex-row gap-[10px]">
               <SearchFields {...searchFieldsProps} />
            </div>
         </div>
         <div className="overflow-auto h-[75vh] relative no-scrollbar">
            {loading ? (
               <div className="loader absolute"></div>
            ) : (
               <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-[20px] gap-y-[32px]">
                  {titlesFromAPI.length ? (
                     titlesFromAPI.map((movie: MovieData) => (
                        <div className="mx-auto" key={movie?.id}>
                           {renderMovieStatus(movie)}
                        </div>
                     ))
                  ) : (
                     <div className="text-white">{error}</div>
                  )}
               </div>
            )}
         </div>
      </div>
   );
};

export default SearchTitlesModal;
