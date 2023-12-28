"use client";

import React, { useState, useEffect, useContext, useRef } from "react";
import { MovieContext } from "@/context/MovieContext";
import { IoMdAddCircleOutline } from "react-icons/io";
import { BiLogoPatreon } from "react-icons/bi";
import { AiFillYoutube } from "react-icons/ai";
import { BiSolidUpvote } from "react-icons/bi";
import { BiSolidDownvote } from "react-icons/bi";
import useRetrieveMovies from "../hooks/useRetrieveMovies";

const SearchTitlesModal = ({ user }) => {
   const [input, setInput] = useState("");
   const [title, setTitle] = useState("");
   const [inputTitle, setInputTitle] = useState("");
   const [inputYear, setInputYear] = useState("");
   const [inputImdbID, setInputImdbID] = useState("");
   const [searchTitle, setSearchTitle] = useState("");
   const [searchYear, setSearchYear] = useState("");
   const [searchImdbID, setSearchImdbID] = useState("");
   const [movies, setMovies] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");
   const moviesList = useRetrieveMovies();
   const currentUser = user.id;
   const { isCreator, isProducer } = user;

   const {
      createMovieVote,
      castMovieVote,
      removeMovieVote,
      checkIfUserUnderRequestLimit,
      isUserUnderRequestLimit,
      disableButton,
   } = useContext(MovieContext);

   const inputRef = useRef(null);
   const [movieIDCollection, setMovieIDCollection] = useState({});
   const [disabledButtonStates, setDisabledButtonStates] = useState({});

   const API_URL = `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&s=${title}`;

   const NEW_API_URL = `https://api.themoviedb.org/3/search/multi?query=${title}&include_adult=false&language=en-US&page=1&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;

   useEffect(() => {
      if (!isCreator) {
         checkIfUserUnderRequestLimit(currentUser, isProducer);
      }
   }, [moviesList]);

   useEffect(() => {
      const fetchMovieTitles = async () => {
         if (title) {
            setLoading(true);
            inputRef.current.blur();

            const response = await fetch(NEW_API_URL);
            const data = await response.json();
            // if (data.Response === "True") {
            //    const titles = data.Search.filter(
            //       (title) => title.Type === "movie" || title.Type === "series"
            //    );
            //    setMovies(titles);

            //    const ids = data.Search.map((entry) => entry.imdbID);
            //    const result = ids.reduce((obj, num) => {
            //       obj[num] = false;
            //       return obj;
            //    }, {});

            //    setMovieIDCollection(result);
            //    setDisabledButtonStates(result);
            //    setInput("");
            // } else {
            //    setMovies([]);
            //    setError(data.Error);
            // }

            if (data.results.length) {
               const titles = data.results.filter(
                  (title) =>
                     title.release_date !== "" &&
                     (title.media_type === "movie" || title.media_type === "tv")
               );
               //console.log(titles);
               setMovies(titles);
               const ids = data.results.map((entry) => entry.imdbID);
               const result = ids.reduce((obj, num) => {
                  obj[num] = false;
                  return obj;
               }, {});

               setMovieIDCollection(result);
               setDisabledButtonStates(result);
               setInput("");
            } else {
               setMovies([]);
               setError("Movie not found!");
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
         if (searchImdbID) {
            const API_URL = `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&i=${searchImdbID}`;
            const response = await fetch(API_URL);
            const data = await response.json();

            if (data.Response === "True") {
               if (data.Type === "movie" || data.Type === "series") {
                  clearSearchState(data);
               }
            } else {
               setMovies([]);
               setError(data.Error);
            }
            setLoading(false);
         } else if (searchTitle && searchYear) {
            const API_URL = `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&t=${searchTitle}&y=${searchYear}`;
            const response = await fetch(API_URL);
            const data = await response.json();

            if (data.Response === "True") {
               if (data.Type === "movie" || data.Type === "series") {
                  clearSearchState(data);
               }
            } else {
               setMovies([]);
               setError(data.Error);
            }
            setLoading(false);
         }
      };

      fetchTitleByYear();
   }, [searchTitle, searchYear, searchImdbID]);

   useEffect(() => {
      const fetchByImdbID = async () => {
         if (searchImdbID) {
            const API_URL = `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&i=${searchImdbID}`;
            const response = await fetch(API_URL);
            const data = await response.json();

            if (data.Response === "True") {
               if (data.Type === "movie" || data.Type === "series") {
                  clearSearchState(data);
               }
            } else {
               setMovies([]);
               setError(data.Error);
            }
            setLoading(false);
         }
      };

      fetchByImdbID();
   }, [searchImdbID]);

   const clearSearchState = (data) => {
      setMovies([data]);
      setInputTitle("");
      setInputYear("");
      setInputImdbID("");
      setSearchTitle("");
      setSearchYear("");
      setSearchImdbID("");
   };

   const isMovieInList = (selectedMovie) => {
      return moviesList.filter(
         (movie) =>
            movie?.data?.id === selectedMovie.id &&
            movie?.data?.Type === selectedMovie.media_type
      ).length;
   };

   const isMovieReacted = (selectedMovie) => {
      return moviesList.find(
         (movie) =>
            movie.data.id === selectedMovie.id &&
            movie?.data?.Type === selectedMovie.media_type
      ).hasReacted;
   };

   const isMovieSeen = (selectedMovie) => {
      return moviesList.find(
         (movie) =>
            movie.data.id === selectedMovie.id &&
            movie?.data?.Type === selectedMovie.media_type
      ).hasSeen;
   };

   const getMovieVoteTotal = (selectedMovie) => {
      return moviesList.find(
         (movie) =>
            movie.data.id === selectedMovie.id &&
            movie?.data?.Type === selectedMovie.media_type
      ).voters.length;
   };

   const getPatreonLink = (selectedMovie) => {
      return moviesList.find(
         (movie) =>
            movie.data.id === selectedMovie.id &&
            movie?.data?.Type === selectedMovie.media_type
      ).links.patreon;
   };

   const getYouTubeLink = (selectedMovie) => {
      return moviesList.find(
         (movie) =>
            movie.data.id === selectedMovie.id &&
            movie?.data?.Type === selectedMovie.media_type
      ).links.youtube;
   };

   const handleTitleSubmit = (e) => {
      e.preventDefault();
      if (input) {
         setTitle(encodeURIComponent(input.trim()));
      }
   };

   const handleImdbIDSubmit = (e) => {
      e.preventDefault();
      const regex = /^[t0-9]+$/;
      if (inputImdbID) {
         const inputImdbIDTrimmed = inputImdbID.trim();
         setSearchImdbID(
            regex.test(inputImdbIDTrimmed) ? inputImdbIDTrimmed : ""
         );
      }
   };

   const handleTitleYearSubmit = (e) => {
      e.preventDefault();
      if (inputTitle) setSearchTitle(encodeURIComponent(inputTitle.trim()));
      if (inputYear) setSearchYear(inputYear);
   };

   const handleMovieSelection = async (movie) => {
      setMovieIDCollection({ [movie.id]: true });
      setDisabledButtonStates({ [movie.id]: true });
      createMovieVote(movie, currentUser);
   };

   const isMovieVotedByUser = (selectedMovie) => {
      return moviesList.find((movie) => {
         if (
            movie.data.id === selectedMovie.id &&
            movie?.data?.Type === selectedMovie.media_type
         ) {
            return movie.voters.filter((voter) => voter === currentUser).length;
         }
      });
   };

   const handleRemoveVote = (selectedMovie) => {
      return moviesList.find((movie) => {
         if (
            movie.data.id === selectedMovie.id &&
            movie?.data?.Type === selectedMovie.media_type
         ) {
            removeMovieVote(movie._id, movie.voters, currentUser);
            setDisabledButtonStates({ [selectedMovie.id]: false });
         }
      });
   };

   const handleCastVote = (selectedMovie) => {
      return moviesList.find((movie) => {
         if (
            movie.data.id === selectedMovie.id &&
            movie?.data?.Type === selectedMovie.media_type
         ) {
            castMovieVote(movie._id, movie.voters, currentUser);
         }
      });
   };

   return (
      <div>
         <div className="flex flex-col md:flex-row gap-2 items-center pb-[16px] mt-[35px] md:mt-0 mr-0 md:mr-[35px]">
            <div className="flex flex-col md:flex-row gap-[10px]">
               <div className="flex flex-col sm:flex-row flex gap-[10px]">
                  <form
                     className="flex flex-1 gap-2 w-full"
                     onSubmit={(e) => handleTitleSubmit(e)}
                  >
                     <input
                        className="text-black w-full py-[5px] px-[10px]"
                        type="text"
                        name=""
                        id=""
                        placeholder="Search titles"
                        value={input}
                        ref={inputRef}
                        onChange={(e) => setInput(e.target.value)}
                     />
                     <input
                        className="bg-[#830483] hover:bg-[#a300a3] focus-visible:bg-[#a300a3] transition-colors duration-300 ease-in-out text-white cursor-pointer py-1 px-3"
                        type="submit"
                        value="Search"
                     />
                  </form>
                  <form
                     onSubmit={(e) => handleTitleYearSubmit(e)}
                     className="flex flex-1 gap-2 w-full "
                  >
                     <div className="flex w-full gap-[5px]">
                        <input
                           className="flex-[2_2_0%] w-full text-black py-[5px] px-[10px]"
                           type="text"
                           placeholder="Title"
                           value={inputTitle}
                           onChange={(e) => setInputTitle(e.target.value)}
                        />
                        <input
                           className="text-black flex-1 w-full sm:max-w-[80px] py-[5px] px-[10px]"
                           type="text"
                           placeholder="Year"
                           value={inputYear}
                           maxLength="4"
                           onChange={(e) => setInputYear(e.target.value)}
                        />
                     </div>
                     <input
                        className="bg-[#830483] hover:bg-[#a300a3] focus-visible:bg-[#a300a3] transition-colors duration-300 ease-in-out text-white cursor-pointer py-1 px-3"
                        type="submit"
                        value="Search"
                     />
                  </form>
               </div>
               <div>
                  <form
                     onSubmit={(e) => handleImdbIDSubmit(e)}
                     className="flex flex-1 gap-2 w-full"
                  >
                     <div className="flex w-full gap-[5px]">
                        <input
                           className="text-black w-[80px] py-[5px] px-[10px] w-full"
                           type="text"
                           placeholder="IMDB ID"
                           value={inputImdbID}
                           onChange={(e) => setInputImdbID(e.target.value)}
                        />
                     </div>
                     <input
                        className="bg-[#830483] hover:bg-[#a300a3] focus-visible:bg-[#a300a3] transition-colors duration-300 ease-in-out text-white cursor-pointer py-1 px-3"
                        type="submit"
                        value="Search"
                     />
                  </form>
               </div>
            </div>
         </div>
         <div className="overflow-auto h-[75vh] relative no-scrollbar">
            {loading ? (
               <div className="loader absolute"></div>
            ) : (
               <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-[20px] gap-y-[32px]">
                  {movies.length ? (
                     movies.map((movie) => (
                        <div className="mx-auto" key={movie.id}>
                           {isMovieInList(movie) ? (
                              <>
                                 {isMovieReacted(movie) ? (
                                    <div className="relative flex justify-center items-center w-[175px] h-[285px] overflow-hidden">
                                       <div>
                                          {!movie.poster_path ? (
                                             <div className="w-[175px] h-[285px] bg-[#858585] flex items-center justify-center mx-auto">
                                                Missing Image
                                             </div>
                                          ) : (
                                             <img
                                                src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`}
                                                alt={
                                                   movie.media_type === "movie"
                                                      ? movie.title
                                                      : movie.name
                                                }
                                                width="175"
                                                height="285"
                                                className="w-full h-full object-cover mx-auto"
                                             />
                                          )}
                                          <div
                                             className="absolute bg-black/50 top-0 left-0 right-0 h-[100%] font-black text-[25px] flex items-center justify-center"
                                             style={{
                                                textShadow: "1px 1px 3px black",
                                             }}
                                          >
                                             <div
                                                className={`flex flex-col ${
                                                   getPatreonLink(movie) ||
                                                   getYouTubeLink(movie)
                                                      ? "mt-[67px]"
                                                      : ""
                                                } items-center z-10`}
                                             >
                                                <IoMdAddCircleOutline
                                                   className={`text-[50px] rotate-45 ${
                                                      movieIDCollection[
                                                         movie.id
                                                      ]
                                                         ? "animate-rotation"
                                                         : ""
                                                   }`}
                                                />
                                                <div>On Channel</div>
                                                <div className="flex flex-col gap-[4px] max-w-[80px] w-full">
                                                   {getYouTubeLink(movie) && (
                                                      <a
                                                         className="bg-[red] text-[white] flex justify-center p-[2px]"
                                                         href={getYouTubeLink(
                                                            movie
                                                         )}
                                                         title="Watch on YouTube"
                                                         target="_blank"
                                                      >
                                                         <AiFillYoutube />
                                                      </a>
                                                   )}
                                                   {getPatreonLink(movie) && (
                                                      <a
                                                         className="bg-[black] text-[white] flex justify-center p-[2px] border-[#585858] border-[1px]"
                                                         href={getPatreonLink(
                                                            movie
                                                         )}
                                                         title="Watch Full Length"
                                                         target="_blank"
                                                      >
                                                         <BiLogoPatreon />
                                                      </a>
                                                   )}
                                                </div>
                                             </div>
                                          </div>
                                          <div
                                             className="absolute top-0 left-0 right-0 text-center text-[18px] font-black pt-[5px] leading-5"
                                             style={{
                                                textShadow: "1px 1px 3px black",
                                             }}
                                          >
                                             {movie.media_type === "movie"
                                                ? movie.title
                                                : movie.name}{" "}
                                             (
                                             {movie.media_type === "movie"
                                                ? movie.release_date.split(
                                                     "-"
                                                  )[0]
                                                : movie.first_air_date.split(
                                                     "-"
                                                  )[0]}
                                             )
                                          </div>
                                       </div>
                                    </div>
                                 ) : isMovieSeen(movie) ? (
                                    <div className="text-[#8d8d8d] cursor-not-allowed relative flex justify-center items-center w-[175px] h-[285px] overflow-hidden">
                                       <div>
                                          {!movie.poster_path ? (
                                             <div className="w-[175px] h-[285px] bg-[#858585] flex items-center justify-center mx-auto">
                                                Missing Image
                                             </div>
                                          ) : (
                                             <img
                                                src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`}
                                                alt={
                                                   movie.media_type === "movie"
                                                      ? movie.title
                                                      : movie.name
                                                }
                                                width="175"
                                                height="285"
                                                className="w-full h-full object-cover mx-auto"
                                             />
                                          )}
                                          <div
                                             className="absolute bg-black/50 top-0 left-0 right-0 h-[100%] font-black text-[25px] flex items-center justify-center"
                                             style={{
                                                textShadow: "1px 1px 3px black",
                                             }}
                                          >
                                             <div className="flex flex-col mt-[6px] items-center z-10">
                                                <IoMdAddCircleOutline
                                                   className={`text-[50px] rotate-45 ${
                                                      movieIDCollection[
                                                         movie.id
                                                      ]
                                                         ? "animate-rotation"
                                                         : ""
                                                   }`}
                                                />
                                                <div>Seen</div>
                                             </div>
                                          </div>
                                          <div
                                             className="absolute top-0 left-0 right-0 text-center text-[18px] font-black pt-[5px] leading-5"
                                             style={{
                                                textShadow: "1px 1px 3px black",
                                             }}
                                          >
                                             {movie.media_type === "movie"
                                                ? movie.title
                                                : movie.name}{" "}
                                             (
                                             {movie.media_type === "movie"
                                                ? movie.release_date.split(
                                                     "-"
                                                  )[0]
                                                : movie.first_air_date.split(
                                                     "-"
                                                  )[0]}
                                             )
                                          </div>
                                       </div>
                                    </div>
                                 ) : (
                                    <div className="text-white relative flex justify-center items-center w-[175px] h-[285px] overflow-hidden">
                                       <div>
                                          {!movie.poster_path ? (
                                             <div className="w-[175px] h-[285px] bg-[#858585] flex items-center justify-center mx-auto">
                                                Missing Image
                                             </div>
                                          ) : (
                                             <img
                                                src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`}
                                                alt={
                                                   movie.media_type === "movie"
                                                      ? movie.title
                                                      : movie.name
                                                }
                                                width="175"
                                                height="285"
                                                className="w-full h-full object-cover mx-auto"
                                             />
                                          )}
                                          <div
                                             className="absolute bg-black/50 top-0 left-0 right-0 h-[100%] font-black text-[25px] flex items-center justify-center"
                                             style={{
                                                textShadow: "1px 1px 3px black",
                                             }}
                                          >
                                             <div className="mt-[59px] flex flex-col items-center z-10">
                                                <IoMdAddCircleOutline
                                                   className={`text-[50px] rotate-45 ${
                                                      movieIDCollection[
                                                         movie.id
                                                      ]
                                                         ? "animate-rotation"
                                                         : ""
                                                   }`}
                                                />
                                                <div>Requested</div>
                                                <div className="text-[16px] mb-[10px] leading-[16px]">
                                                   {getMovieVoteTotal(movie)}{" "}
                                                   {getMovieVoteTotal(movie) > 1
                                                      ? "requests"
                                                      : "request"}
                                                </div>
                                                {isMovieVotedByUser(movie) ? (
                                                   <button
                                                      onClick={() =>
                                                         handleRemoveVote(movie)
                                                      }
                                                      className="w-[70px] flex justify-center bg-[#585858] hover:bg-[#858585] focus-visible:bg-[#858585] transition-colors duration-300 ease-in-out text-white p-2 uppercase text-[10px] md:text-[12px] font-bold"
                                                   >
                                                      Retract
                                                   </button>
                                                ) : (
                                                   <button
                                                      onClick={() =>
                                                         handleCastVote(movie)
                                                      }
                                                      className="w-[70px] flex justify-center bg-[#830483] hover:bg-[#a300a3] focus-visible:bg-[#a300a3] transition-colors duration-300 ease-in-out text-white p-2 uppercase text-[10px] md:text-[12px] font-bold"
                                                   >
                                                      Request
                                                   </button>
                                                )}
                                             </div>
                                          </div>
                                          <div
                                             className="absolute top-0 left-0 right-0 text-center text-[18px] font-black pt-[5px] leading-5"
                                             style={{
                                                textShadow: "1px 1px 3px black",
                                             }}
                                          >
                                             {movie.media_type === "movie"
                                                ? movie.title
                                                : movie.name}{" "}
                                             (
                                             {movie.media_type === "movie"
                                                ? movie.release_date.split(
                                                     "-"
                                                  )[0]
                                                : movie.first_air_date.split(
                                                     "-"
                                                  )[0]}
                                             )
                                          </div>
                                       </div>
                                    </div>
                                 )}
                              </>
                           ) : isUserUnderRequestLimit ? (
                              <div className="relative flex justify-center items-center w-[175px] h-[285px] overflow-hidden">
                                 <button
                                    className="block"
                                    onClick={() => handleMovieSelection(movie)}
                                    disabled={disableButton}
                                 >
                                    {!movie.poster_path ? (
                                       <div className="w-[175px] h-[285px] bg-[#858585] flex items-center justify-center mx-auto">
                                          Missing Image
                                       </div>
                                    ) : (
                                       <img
                                          src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`}
                                          alt={
                                             movie.media_type === "movie"
                                                ? movie.title
                                                : movie.name
                                          }
                                          width="175"
                                          height="285"
                                          className="w-full h-full object-cover mx-auto"
                                       />
                                    )}
                                    <div
                                       className="absolute bg-black/50 top-0 left-0 right-0 h-[100%] font-black text-white text-[25px] flex items-center justify-center"
                                       style={{
                                          textShadow: "1px 1px 3px black",
                                       }}
                                    >
                                       <div className="flex flex-col">
                                          <IoMdAddCircleOutline className="text-[50px] mx-auto" />
                                          <div>
                                             {disabledButtonStates[movie.id]
                                                ? "Pending"
                                                : "Add"}
                                          </div>
                                       </div>
                                    </div>
                                    <div
                                       className="absolute top-0 left-0 right-0 text-white text-center text-[18px] font-black pt-[5px] leading-5"
                                       style={{
                                          textShadow: "1px 1px 3px black",
                                       }}
                                    >
                                       {movie.media_type === "movie"
                                          ? movie.title
                                          : movie.name}{" "}
                                       (
                                       {movie.media_type === "movie"
                                          ? movie.release_date.split("-")[0]
                                          : movie.first_air_date.split("-")[0]}
                                       )
                                    </div>
                                 </button>
                              </div>
                           ) : (
                              <div className="cursor-not-allowed relative flex justify-center items-center w-[175px] h-[285px] overflow-hidden">
                                 <div>
                                    {!movie.poster_path ? (
                                       <div className="w-[175px] h-[285px] bg-[#858585] flex items-center justify-center mx-auto">
                                          Missing Image
                                       </div>
                                    ) : (
                                       <img
                                          src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`}
                                          alt={
                                             movie.media_type === "movie"
                                                ? movie.title
                                                : movie.name
                                          }
                                          width="175"
                                          height="285"
                                          className="w-full h-full object-cover mx-auto"
                                       />
                                    )}
                                    <div
                                       className="absolute bg-black/50 top-0 left-0 right-0 h-[100%] font-black text-[25px] flex items-center justify-center"
                                       style={{
                                          textShadow: "1px 1px 3px black",
                                       }}
                                    >
                                       <div className="flex flex-col mt-[6px] items-center z-10">
                                          <IoMdAddCircleOutline
                                             className={`text-[50px] rotate-45 ${
                                                movieIDCollection[movie.id]
                                                   ? "animate-rotation"
                                                   : ""
                                             }`}
                                          />
                                          <div>Limit Reached</div>
                                       </div>
                                    </div>
                                    <div
                                       className="absolute top-0 left-0 right-0 text-center text-[18px] font-black pt-[5px] leading-5"
                                       style={{
                                          textShadow: "1px 1px 3px black",
                                       }}
                                    >
                                       {movie.media_type === "movie"
                                          ? movie.title
                                          : movie.name}{" "}
                                       (
                                       {movie.media_type === "movie"
                                          ? movie.release_date.split("-")[0]
                                          : movie.first_air_date.split("-")[0]}
                                       )
                                    </div>
                                 </div>
                              </div>
                           )}
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
