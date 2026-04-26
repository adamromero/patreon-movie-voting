"use client";

import React, { useState, useRef } from "react";
import ReactedState from "./SearchTitles/SearchStates/ReactedState";
import SeenState from "./SearchTitles/SearchStates/SeenState";
import UnReactedState from "./SearchTitles/SearchStates/UnReactedState";
import LimitReachedState from "./SearchTitles/SearchStates/LimitReachedState";
import UnderLimitState from "./SearchTitles/SearchStates/UnderLimitState";
import SearchFields from "./SearchTitles/SearchFields";
import { useMovieContext } from "@/context/MovieContext";

import { searchTitlesApi } from "@/lib/api/tmdb/search";
import { parseInput } from "@/lib/external/tmdb/parse";

import { APIMovieData } from "../types/movie";
import { useMoviesMap } from "../hooks/useMoviesMap";

interface SearchTitlesModalProps {
   user: { id: string };
}

type MovieData = APIMovieData;

const SearchTitlesModal: React.FC<SearchTitlesModalProps> = ({ user }) => {
   const [input, setInput] = useState("");
   const [titlesFromAPI, setTitlesFromAPI] = useState<MovieData[]>([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");
   const currentUser = user.id;

   const {
      addRequestToList,
      addVoteToRequest,
      removeVoteFromRequest,
      isUserUnderRequestLimit,
      disableAddButton,
   } = useMovieContext();

   const moviesMap = useMoviesMap();

   const inputRef = useRef<HTMLInputElement>(null);
   const [movieIDCollection, setMovieIDCollection] = useState<
      Record<string | number, boolean>
   >({});
   const [disabledButtonStates, setDisabledButtonStates] = useState<
      Record<string | number, boolean>
   >({});

   const getMovieData = (selectedMovie: APIMovieData) => {
      const key = `${selectedMovie?.id}-${selectedMovie?.mediaType}`;
      return moviesMap.get(key);
   };

   const clearSearchState = (data: MovieData) => {
      setTitlesFromAPI([data]);
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

   const handleTitleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (input) {
         const parsedInput = parseInput(input.trim());
         const results = await searchTitlesApi(parsedInput);
         setTitlesFromAPI(results);
      }
   };

   const handleMovieSelection = async (movie: MovieData) => {
      if (!movie.mediaType) return;

      setMovieIDCollection({ [movie?.id]: true });
      setDisabledButtonStates({ [movie?.id]: true });

      addRequestToList({
         tmdbId: movie.id,
         mediaType: movie.mediaType,
      });
   };

   const isMovieVotedByUser = (selectedMovie: APIMovieData) => {
      const key = `${selectedMovie?.id}-${selectedMovie?.mediaType}`;
      const movie = moviesMap.get(key);
      return movie ? movie.voters.includes(currentUser) : false;
   };

   const handleRemoveVote = (selectedMovie: APIMovieData) => {
      const movie = getMovieData(selectedMovie);
      if (movie) {
         removeVoteFromRequest(movie._id);
         setDisabledButtonStates({ [selectedMovie?.id]: false });
      }
   };

   const handleCastVote = (selectedMovie: APIMovieData) => {
      const movie = getMovieData(selectedMovie);
      if (movie) {
         addVoteToRequest(movie._id);
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
         disableAddButton,
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
      input,
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
