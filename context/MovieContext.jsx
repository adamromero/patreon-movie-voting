"use client";

import React, { createContext, useState } from "react";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
   const [moviesList, setMoviesList] = useState([]);
   //const [voteFilter, setVoteFilter] = useState("all");

   const [filterOptions, setFilterOptions] = useState({
      votes: "most",
      alphabetical: "ascend",
      chronological: "",
      type: "movie",
      genre: "all",
      status: "unwatched",
   });

   const getMovieVotes = async () => {
      const response = await fetch(`/api/movies`);
      const movies = await response.json();
      setMoviesList(movies);
   };

   const createMovieVote = async (movie, currentUser) => {
      const API_URL = `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&t=${movie.Title}&y=${movie.Year}`;
      const response = await fetch(API_URL);
      const movieData = await response.json();

      const newMovieVote = {
         data: movieData,
         voters: [currentUser],
         isWatched: false,
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
         const response = await fetch(`/api/movies`, config);
         const data = await response.json();
         setMoviesList((movies) => [...movies, data]);
         return data;
      } catch (e) {
         return e;
      }
   };

   const castMovieVote = async (movieId, voters, currentUser) => {
      console.log("cast movie vote in context");
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

   const removeMovieVote = async (movieId, voters, currentUser) => {
      const newVoters = voters.filter((voter) => voter !== currentUser);
      const removeMovieVote = moviesList.find((movie) => movie._id === movieId);
      const updatedMovieVote = { ...removeMovieVote, voters: newVoters };

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

   const setMovieVoteToWatched = async (movieId, isChecked) => {
      const selectedMovieVote = moviesList.find(
         (movie) => movie._id === movieId
      );
      const updatedMovieVote = { ...selectedMovieVote, isWatched: isChecked };

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
            getMovieVotes,
            createMovieVote,
            castMovieVote,
            removeMovieVote,
            filterOptions,
            setFilterOptions,
            setMovieVoteToWatched,
         }}
      >
         {children}
      </MovieContext.Provider>
   );
};
