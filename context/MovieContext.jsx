"use client";
import React, { createContext, useState } from "react";
import {
   genre,
   type,
   status,
   chronological,
   added,
   alphabetical,
   votes,
   rating,
   watched,
} from "@/app/utils/filtersOptions";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
   const [moviesList, setMoviesList] = useState([]);
   const [filteredMoviesList, setFilteredMoviesList] = useState([]);
   const [searchTitle, setSearchTitle] = useState("");
   const [searchDirector, setSearchDirector] = useState("");
   const [searchActor, setSearchActor] = useState("");
   const [filterOptions, setFilterOptions] = useState({
      alphabetical: alphabetical.Default,
      votes: votes.Ascending,
      rating: rating.Default,
      chronological: chronological.Default,
      added: added.Default,
      type: type.Default,
      genre: genre.Default,
      status: status.Unseen,
      watched: watched.Default,
   });
   const [isUserUnderRequestLimit, setIsUserUnderRequestLimit] = useState(true);
   const [disableButton, setDisableButton] = useState(false);

   const checkIfUserUnderRequestLimit = async (id, isProducer) => {
      const response = await fetch("/api/moviesbydate");
      const requestedMoviesThisMonth = await response.json();

      const currentUsersMonthlyRequests = requestedMoviesThisMonth.filter(
         (movie) =>
            movie.requester === id && !movie.hasReacted && !movie.hasSeen
      );

      const requestLimit = isProducer ? 3 : 2;
      setIsUserUnderRequestLimit(
         currentUsersMonthlyRequests.length < requestLimit
      );
   };

   const getMovieVotes = async () => {
      const response = await fetch(`/api/movies`);
      const movies = await response.json();
      setMoviesList(movies);
   };

   const createMovieVote = async (movie, currentUser) => {
      setDisableButton(true);
      const API_URL = `https://www.omdbapi.com/?apikey=${
         process.env.NEXT_PUBLIC_OMDB_API_KEY
      }&t=${encodeURIComponent(movie.Title)}&y=${movie.Year}`;
      const response = await fetch(API_URL);
      const movieData = await response.json();

      const newMovieVote = {
         data: movieData,
         voters: [currentUser],
         hasReacted: false,
         hasSeen: false,
         links: { patreon: "", youtube: "" },
         requester: currentUser,
      };

      const config = {
         method: "POST",
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
         },
         body: JSON.stringify(newMovieVote),
      };

      try {
         const response = await fetch("/api/movies", config);
         const postedMovie = await response.json();
         const findMovie = moviesList.find(
            (movie) => movie.data.imdbID === postedMovie.data.imdbID
         );

         if (!postedMovie.error && !findMovie) {
            setMoviesList((movies) => [...movies, postedMovie]);
         }

         return postedMovie;
      } catch (e) {
         return null;
      } finally {
         setDisableButton(false);
      }
   };

   const castMovieVote = async (movieId, voters, currentUser) => {
      const newVoters = [...voters, currentUser];
      const votedMovie = moviesList.find((movie) => movie._id === movieId);
      const updatedMovieVote = { ...votedMovie, voters: newVoters };

      const config = {
         method: "PUT",
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
         },
         body: JSON.stringify(updatedMovieVote),
      };

      const updatedMoviesList = moviesList.map((movie) => {
         return movie._id === movieId ? updatedMovieVote : movie;
      });

      try {
         const response = await fetch(`/api/movies/${movieId}`, config);
         const data = await response.json();
         setMoviesList(updatedMoviesList);
         return data;
      } catch (e) {
         return e;
      }
   };

   const removeMovieVoteOverride = async (movieId) => {
      try {
         const response = await fetch(`/api/movies/${movieId}`, {
            method: "DELETE",
            headers: {
               Accept: "application/json",
               "Content-Type": "application/json",
            },
            body: JSON.stringify(movieId),
         });
         const deletedMovie = await response.json();
         const updatedMoviesList = moviesList.filter(
            (movie) => movie._id !== deletedMovie._id
         );
         setMoviesList(updatedMoviesList);
      } catch (e) {
         return e;
      }
   };

   const removeMovieVote = async (movieId, voters, currentUser) => {
      const newVoters = voters.filter((voter) => voter !== currentUser);
      const removeMovieVote = moviesList.find((movie) => movie._id === movieId);
      const updatedMovieVote = { ...removeMovieVote, voters: newVoters };

      if (voters.length === 1) {
         try {
            const response = await fetch(`/api/movies/${movieId}`, {
               method: "DELETE",
               headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
               },
               body: JSON.stringify(movieId),
            });

            const deletedMovie = await response.json();
            const updatedMoviesList = moviesList.filter(
               (movie) => movie._id !== deletedMovie._id
            );

            setMoviesList(updatedMoviesList);
         } catch (e) {
            return e;
         }
      } else {
         const config = {
            method: "PUT",
            headers: {
               Accept: "application/json",
               "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedMovieVote),
         };

         const updatedMoviesList = moviesList.map((movie) => {
            return movie._id === movieId ? updatedMovieVote : movie;
         });

         try {
            const response = await fetch(`/api/movies/${movieId}`, config);
            const data = await response.json();
            setMoviesList(updatedMoviesList);
            return data;
         } catch (e) {
            return e;
         }
      }
   };

   const setMovieVoteToWatched = async (movieId, isChecked) => {
      const selectedMovieVote = moviesList.find(
         (movie) => movie._id === movieId
      );
      const updatedMovieVote = { ...selectedMovieVote, hasReacted: isChecked };

      const config = {
         method: "PUT",
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
         },
         body: JSON.stringify(updatedMovieVote),
      };

      const updatedMoviesList = moviesList.map((movie) => {
         return movie._id === movieId ? updatedMovieVote : movie;
      });

      try {
         const response = await fetch(`/api/movies/${movieId}`, config);
         const data = await response.json();
         setMoviesList(updatedMoviesList);
         return data;
      } catch (e) {
         return e;
      }
   };

   const setMovieVoteToSeen = async (movieId, isChecked) => {
      const selectedMovieVote = moviesList.find(
         (movie) => movie._id === movieId
      );
      const updatedMovieVote = { ...selectedMovieVote, hasSeen: isChecked };

      const config = {
         method: "PUT",
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
         },
         body: JSON.stringify(updatedMovieVote),
      };

      const updatedMoviesList = moviesList.map((movie) => {
         return movie._id === movieId ? updatedMovieVote : movie;
      });

      try {
         const response = await fetch(`/api/movies/${movieId}`, config);
         const data = await response.json();
         setMoviesList(updatedMoviesList);
         return data;
      } catch (e) {
         return e;
      }
   };

   const setWatchedMovieLinks = async (movieId, links) => {
      const selectedMovieVote = moviesList.find(
         (movie) => movie._id === movieId
      );
      const updatedMovieVote = { ...selectedMovieVote, links };

      const config = {
         method: "PUT",
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
         },
         body: JSON.stringify(updatedMovieVote),
      };

      const updatedMoviesList = moviesList.map((movie) => {
         return movie._id === movieId ? updatedMovieVote : movie;
      });

      try {
         const response = await fetch(`/api/movies/${movieId}`, config);
         const data = await response.json();
         setMoviesList(updatedMoviesList);
         return data;
      } catch (e) {
         return e;
      }
   };

   return (
      <MovieContext.Provider
         value={{
            moviesList,
            filteredMoviesList,
            setFilteredMoviesList,
            getMovieVotes,
            createMovieVote,
            castMovieVote,
            removeMovieVote,
            filterOptions,
            setFilterOptions,
            setMovieVoteToWatched,
            setMovieVoteToSeen,
            setWatchedMovieLinks,
            searchTitle,
            setSearchTitle,
            searchDirector,
            setSearchDirector,
            searchActor,
            setSearchActor,
            removeMovieVoteOverride,
            checkIfUserUnderRequestLimit,
            isUserUnderRequestLimit,
            setIsUserUnderRequestLimit,
            disableButton,
         }}
      >
         {children}
      </MovieContext.Provider>
   );
};
