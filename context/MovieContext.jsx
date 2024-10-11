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
   requests,
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
   const [searchComposer, setSearchComposer] = useState("");
   const [filterOptions, setFilterOptions] = useState({
      alphabetical: alphabetical.Default,
      votes: votes.Ascending,
      rating: rating.Default,
      chronological: chronological.Default,
      added: added.Default,
      type: type.Default,
      genre: genre.Default,
      requests: requests.Default,
      status: status.Default,
      watched: watched.Default,
   });
   const [isUserUnderRequestLimit, setIsUserUnderRequestLimit] = useState(true);
   const [requestsRemaining, setRequestsRemaining] = useState();
   const [disableButton, setDisableButton] = useState(false);
   const [isRankingOn, setIsRankingOn] = useState(false);
   const [rankedMovies, setRankedMovies] = useState([]);
   const [requestsThisMonth, setRequestsThisMonth] = useState([]);
   const [moviesMap, setMoviesMap] = useState(new Map());
   const [moviesByDateMap, setMoviesByDateMap] = useState(new Map());

   const fetchMovies = async () => {
      try {
         const response = await fetch(`/api/movies`);
         const movies = await response.json();

         const moviesMap = new Map();
         const sortedMovies = [];
         const rankedMoviesObject = {};

         movies.forEach((movie) => {
            const key = `${movie.data.id}-${movie.data.Type}`;
            moviesMap.set(key, movie);

            if (!movie.hasSeen && !movie.hasReacted) {
               sortedMovies.push(movie);
            }
         });

         sortedMovies.sort((a, b) => b.voters.length - a.voters.length);

         sortedMovies.forEach((movie, index) => {
            rankedMoviesObject[movie.data.imdbID] = index + 1;
         });

         setMoviesList(movies);
         setMoviesMap(moviesMap);
         setRankedMovies(rankedMoviesObject);
      } catch (error) {
         console.error("Failed to fetch movies:", error);
      }
   };

   const processUserRequestsByDate = (id, isCreator, isProducer) => {
      const currentDate = new Date();
      const startOfMonth = new Date(
         currentDate.getFullYear(),
         currentDate.getMonth(),
         1
      );
      const startOfNextMonth = new Date(
         currentDate.getFullYear(),
         currentDate.getMonth() + 1,
         1
      );

      const filteredMap = new Map();
      for (const [key, value] of moviesMap) {
         const createdAtDate = new Date(value.createdAt);
         if (
            createdAtDate >= startOfMonth &&
            createdAtDate < startOfNextMonth &&
            value.requester === id &&
            !value.hasSeen &&
            !value.hasReacted
         ) {
            filteredMap.set(key, value);
         }
      }

      const requestLimit = isProducer ? 3 : 2;
      const isUnderLimit = isCreator ? true : filteredMap.size < requestLimit;

      setMoviesByDateMap(filteredMap);
      setIsUserUnderRequestLimit(isUnderLimit);
      setRequestsRemaining(requestLimit - filteredMap.size);
   };

   const addRequestToList = async (movie, currentUser) => {
      setDisableButton(true);

      let data,
         genres,
         title,
         year,
         release,
         director,
         composer,
         actors,
         runtime,
         rated,
         imdbID,
         studio;

      if (movie.media_type === "movie") {
         const NEW_API_URL = `https://api.themoviedb.org/3/movie/${movie.id}?language=en-US&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
         const response = await fetch(NEW_API_URL);
         data = await response.json();

         genres = data.genres.map((genre) =>
            genre.name === "Science Fiction" ? "Sci-Fi" : genre.name
         );

         studio = data.production_companies
            .filter((company) => company.origin_country === "US")
            .map((company) => company.name)
            .join(", ");

         if (!studio.length && data.production_companies.length) {
            studio = data.production_companies[0]?.name;
         }

         title = data.title;
         year = data.release_date.split("-")[0];
         release = data.release_date;
         imdbID = data.imdb_id ? data.imdb_id : "";
         runtime = data.runtime;

         const creditUrl = `https://api.themoviedb.org/3/movie/${movie.id}/credits?language=en-US&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
         const creditResponse = await fetch(creditUrl);
         const creditData = await creditResponse.json();

         director = creditData.crew
            .filter((credit) => credit.job === "Director")
            .map((credit) => credit.name);

         const composerArray = creditData.crew
            .filter(
               (credit) =>
                  credit.job === "Original Music Composer" ||
                  credit.job === "Music" ||
                  credit.job === "Conductor"
            )
            .map((credit) => credit.name);
         composer = [...new Set(composerArray)];

         actors = creditData.cast.slice(0, 10).map((actor) => actor.name);

         const releaseUrl = `https://api.themoviedb.org/3/movie/${movie.id}/release_dates?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
         const releaseResponse = await fetch(releaseUrl);
         const releaseData = await releaseResponse.json();

         const usRelease = releaseData.results?.find(
            (release) => release.iso_3166_1 === "US"
         );

         if (usRelease) {
            const filteredDates = usRelease.release_dates?.filter(
               (dates) => dates.certification !== ""
            );

            if (filteredDates && filteredDates.length > 0) {
               rated = filteredDates[0].certification;
            }
         }
      } else if (movie.media_type === "tv") {
         const NEW_API_URL = `https://api.themoviedb.org/3/tv/${movie.id}?language=en-US&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
         const response = await fetch(NEW_API_URL);
         data = await response.json();

         genres = data.genres.map((genre) =>
            genre.name === "Science Fiction" ? "Sci-Fi" : genre.name
         );

         studio = data.production_companies
            .filter((company) => company.origin_country === "US")
            .map((company) => company.name)
            .join(", ");

         if (!studio.length && data.production_companies.length) {
            studio = data.production_companies[0]?.name;
         }

         title = data.name;
         year = data.first_air_date.split("-")[0];
         release = data.first_air_date;
         runtime = data.episode_run_time[0];
         director = data.created_by.map((credit) => credit.name);

         const externalIDUrl = `https://api.themoviedb.org/3/tv/${movie.id}/external_ids?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
         const externalIDResponse = await fetch(externalIDUrl);
         const externalIDData = await externalIDResponse.json();
         imdbID = externalIDData.imdb_id ? externalIDData.imdb_id : "";

         const creditUrl = `https://api.themoviedb.org/3/tv/${movie.id}/aggregate_credits?language=en-US&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
         const creditResponse = await fetch(creditUrl);
         const creditData = await creditResponse.json();

         const composerArray = creditData.crew
            .filter((person) =>
               person.jobs.some(
                  (credit) =>
                     credit.job === "Original Music Composer" ||
                     credit.job === "Music" ||
                     credit.job === "Conductor"
               )
            )
            .map((person) => person.name);

         composer = [...new Set(composerArray)];

         actors = creditData.cast.slice(0, 10).map((actor) => actor.name);

         const releaseUrl = `https://api.themoviedb.org/3/tv/${movie.id}/content_ratings?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
         const releaseResponse = await fetch(releaseUrl);
         const releaseData = await releaseResponse.json();

         const findUSRating = releaseData.results.find(
            (release) => release.iso_3166_1 === "US"
         );
         rated = findUSRating
            ? findUSRating.rating
            : releaseData?.results[0]?.rating;
      }

      const movieData = {
         id: data.id,
         Type: movie.media_type ? movie.media_type : "",
         Title: title,
         Year: year,
         Rated: rated,
         Genre: genres.join(", "),
         Director: director.join(", "),
         Actors: actors.join(", "),
         Poster: data.poster_path ? data.poster_path : "",
         Backdrop: data.backdrop_path ? data.backdrop_path : "",
         imdbID,
         Rating: data.vote_average ? data.vote_average : "",
         Release: release,
         Runtime: runtime,
         Composer: composer.join(", "),
         Studio: studio,
      };

      const newMovieVote = {
         data: movieData,
         voters: [currentUser],
         isHalloween: false,
         isChristmas: title.includes("Christmas"),
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
            setMoviesMap((prevMap) => {
               const newMap = new Map(prevMap);
               newMap.set(
                  `${postedMovie.data.id}-${postedMovie.data.Type}`,
                  postedMovie
               );
               return newMap;
            });
         }

         return postedMovie;
      } catch (e) {
         return null;
      } finally {
         setDisableButton(false);
      }
   };

   const addVoteToRequest = async (movieId, voters, currentUser) => {
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

         setMoviesMap((prevMap) => {
            const newMap = new Map(prevMap);
            newMap.set(
               `${updatedMovieVote.data.id}-${updatedMovieVote.data.Type}`,
               updatedMovieVote
            );
            return newMap;
         });

         const sortedMovies = updatedMoviesList
            .filter((movie) => !movie.hasSeen && !movie.hasReacted)
            .sort((a, b) => b.voters.length - a.voters.length);

         const rankedMoviesObject = sortedMovies.reduce((acc, movie, index) => {
            acc[movie.data.imdbID] = index + 1;
            return acc;
         }, {});

         setRankedMovies(rankedMoviesObject);

         return data;
      } catch (e) {
         return e;
      }
   };

   const removeRequestFromList = async (movieId) => {
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

         setMoviesMap((prevMap) => {
            const newMap = new Map(prevMap);
            newMap.delete(`${deletedMovie.data.id}-${deletedMovie.data.Type}`);
            return newMap;
         });

         const sortedMovies = updatedMoviesList
            .filter((movie) => !movie.hasSeen && !movie.hasReacted)
            .sort((a, b) => b.voters.length - a.voters.length);

         const rankedMoviesObject = sortedMovies.reduce((acc, movie, index) => {
            acc[movie.data.imdbID] = index + 1;
            return acc;
         }, {});

         setRankedMovies(rankedMoviesObject);
      } catch (e) {
         return e;
      }
   };

   const removeVoteFromRequest = async (movieId, voters, currentUser) => {
      const newVoters = voters.filter((voter) => voter !== currentUser);
      const removeVoteFromRequest = moviesList.find(
         (movie) => movie._id === movieId
      );
      const updatedMovieVote = { ...removeVoteFromRequest, voters: newVoters };

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
            setMoviesMap((prevMap) => {
               const newMap = new Map(prevMap);
               newMap.delete(
                  `${deletedMovie.data.id}-${deletedMovie.data.Type}`
               );
               return newMap;
            });
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

            setMoviesMap((prevMap) => {
               const newMap = new Map(prevMap);
               newMap.set(
                  `${updatedMovieVote.data.id}-${updatedMovieVote.data.Type}`,
                  updatedMovieVote
               );
               return newMap;
            });

            const sortedMovies = updatedMoviesList
               .filter((movie) => !movie.hasSeen && !movie.hasReacted)
               .sort((a, b) => b.voters.length - a.voters.length);

            const rankedMoviesObject = sortedMovies.reduce(
               (acc, movie, index) => {
                  acc[movie.data.imdbID] = index + 1;
                  return acc;
               },
               {}
            );

            setRankedMovies(rankedMoviesObject);

            return data;
         } catch (e) {
            return e;
         }
      }
   };

   const setRequestHolidayStatus = async (movieId, status) => {
      const selectedMovieVote = moviesList.find(
         (movie) => movie._id === movieId
      );

      let halloween = selectedMovieVote.isHalloween,
         christmas = selectedMovieVote.isChristmas;
      if (status === "halloween") {
         halloween = !selectedMovieVote.isHalloween;
      } else if (status === "christmas") {
         christmas = !selectedMovieVote.isChristmas;
      }

      const updatedMovieVote = {
         ...selectedMovieVote,
         isHalloween: halloween,
         isChristmas: christmas,
      };

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

         setMoviesMap((prevMap) => {
            const newMap = new Map(prevMap);
            newMap.set(
               `${updatedMovieVote.data.id}-${updatedMovieVote.data.Type}`,
               updatedMovieVote
            );
            return newMap;
         });

         return data;
      } catch (e) {
         return e;
      }
   };

   const setRequestWatchStatus = async (movieId, status) => {
      const selectedMovieVote = moviesList.find(
         (movie) => movie._id === movieId
      );

      let channel = false,
         seen = false,
         rewatch = false;

      if (status === "channel") {
         channel = true;
      } else if (status === "seen") {
         seen = true;
      } else if (status === "rewatch") {
         rewatch = true;
      } else if (status === "unseen") {
         channel = false;
         seen = false;
         rewatch = false;
      }

      const updatedMovieVote = {
         ...selectedMovieVote,
         hasReacted: channel,
         hasSeen: seen,
         isRewatch: rewatch,
      };

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

         setMoviesMap((prevMap) => {
            const newMap = new Map(prevMap);
            newMap.set(
               `${updatedMovieVote.data.id}-${updatedMovieVote.data.Type}`,
               updatedMovieVote
            );
            return newMap;
         });

         return data;
      } catch (e) {
         return e;
      }
   };

   const setOnChannelRequestLinks = async (movieId, links) => {
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

         setMoviesMap((prevMap) => {
            const newMap = new Map(prevMap);
            newMap.set(
               `${updatedMovieVote.data.id}-${updatedMovieVote.data.Type}`,
               updatedMovieVote
            );
            return newMap;
         });

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
            fetchMovies,
            isRankingOn,
            setIsRankingOn,
            rankedMovies,
            addRequestToList,
            addVoteToRequest,
            removeVoteFromRequest,
            filterOptions,
            setFilterOptions,
            setRequestWatchStatus,
            setRequestHolidayStatus,
            setOnChannelRequestLinks,
            searchTitle,
            setSearchTitle,
            searchDirector,
            setSearchDirector,
            searchActor,
            setSearchActor,
            searchComposer,
            setSearchComposer,
            removeRequestFromList,
            isUserUnderRequestLimit,
            setIsUserUnderRequestLimit,
            requestsRemaining,
            disableButton,
            requestsThisMonth,
            moviesMap,
            moviesByDateMap,
            processUserRequestsByDate,
            moviesByDateMap,
         }}
      >
         {children}
      </MovieContext.Provider>
   );
};
