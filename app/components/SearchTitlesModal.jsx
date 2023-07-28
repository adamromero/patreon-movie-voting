"use client";

import React, {
   useState,
   useEffect,
   useContext,
   useRef,
   useCallback,
} from "react";
import { MovieContext } from "@/context/MovieContext";
import { IoMdAddCircleOutline } from "react-icons/io";

const SearchTitlesModal = ({ currentUser }) => {
   const mobileBreakPoint = 640;
   const [input, setInput] = useState("");
   const [title, setTitle] = useState("");
   const [inputTitle, setInputTitle] = useState("");
   const [inputYear, setInputYear] = useState("");
   const [searchTitle, setSearchTitle] = useState("");
   const [searchYear, setSearchYear] = useState("");
   const [movies, setMovies] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");
   const { moviesList, createMovieVote, castMovieVote, removeMovieVote } =
      useContext(MovieContext);
   const inputRef = useRef(null);
   const [imdbIDCollection, setImdbIDCollection] = useState({});
   const [disabledButtonStates, setDisabledButtonStates] = useState({});
   const [isSearchByYear, setIsSearchByYear] = useState(true);
   const [isDesktopView, setIsDesktopView] = useState(
      window.innerWidth >= mobileBreakPoint
   );

   const API_URL = `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&s=${title}`;

   useEffect(() => {
      const fetchMovieTitles = async () => {
         if (title) {
            setLoading(true);
            inputRef.current.blur();
            const response = await fetch(API_URL);
            const data = await response.json();
            if (data.Response === "True") {
               const titles = data.Search.filter(
                  (title) => title.Type === "movie" || title.Type === "series"
               );
               setMovies(titles);

               const ids = data.Search.map((entry) => entry.imdbID);
               const result = ids.reduce((obj, num) => {
                  obj[num] = false;
                  return obj;
               }, {});

               setImdbIDCollection(result);
               setDisabledButtonStates(result);
               setInput("");
            } else {
               setMovies([]);
               setError(data.Error);
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
            const API_URL = `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&t=${searchTitle}&y=${searchYear}`;
            const response = await fetch(API_URL);
            const data = await response.json();

            if (data.Response === "True") {
               if (data.Type === "movie" || data.Type === "series") {
                  setMovies([data]);
                  setInputTitle("");
                  setInputYear("");
               }
            } else {
               setMovies([]);
               setError(data.Error);
            }
            setLoading(false);
         }
      };

      fetchTitleByYear();
   }, [searchTitle, searchYear]);

   const handleWindowResize = useCallback(() => {
      setIsDesktopView(window.innerWidth >= mobileBreakPoint);
   }, []);

   useEffect(() => {
      window.addEventListener("resize", handleWindowResize);

      return () => {
         window.removeEventListener("resize", handleWindowResize);
      };
   }, [handleWindowResize]);

   const isMovieInList = (selectedMovie) => {
      return moviesList.filter(
         (movie) => movie.data.imdbID === selectedMovie.imdbID
      ).length;
   };

   const isMovieWatched = (selectedMovie) => {
      return moviesList.find(
         (movie) => movie.data.imdbID === selectedMovie.imdbID
      ).isWatched;
   };

   const handleTitleSubmit = (e) => {
      e.preventDefault();
      if (input) {
         setTitle(input);
      }
   };

   const handleTitleYearSubmit = (e) => {
      e.preventDefault();
      if (inputTitle) setSearchTitle(inputTitle);
      if (inputYear) setSearchYear(inputYear);
   };

   const handleMovieSelection = async (movie) => {
      setImdbIDCollection({ [movie.imdbID]: true });
      setDisabledButtonStates({ [movie.imdbID]: true });
      createMovieVote(movie, currentUser);
   };

   const isMovieVotedByUser = (selectedMovie) => {
      return moviesList.find((movie) => {
         if (movie.data.imdbID === selectedMovie.imdbID) {
            return movie.voters.filter((voter) => voter === currentUser).length;
         }
      });
   };

   const handleRemoveVote = (selectedMovie) => {
      return moviesList.find((movie) => {
         if (movie.data.imdbID === selectedMovie.imdbID) {
            removeMovieVote(movie._id, movie.voters, currentUser);
         }
      });
   };

   const handleCastVote = (selectedMovie) => {
      return moviesList.find((movie) => {
         if (movie.data.imdbID === selectedMovie.imdbID) {
            castMovieVote(movie._id, movie.voters, currentUser);
         }
      });
   };

   return (
      <div>
         <div className="flex flex-col sm:flex-row gap-2 items-center pb-[16px]">
            <button
               onClick={() => setIsSearchByYear(!isSearchByYear)}
               className="block sm:hidden bg-[#830483] text-white cursor-pointer py-1 px-3"
            >
               {isSearchByYear ? <>Search by Year</> : <>Search by Titles</>}
            </button>
            {(isSearchByYear || isDesktopView) && (
               <form
                  className="flex flex-col sm:flex-row gap-2 w-full sm:w-[initial]"
                  onSubmit={(e) => handleTitleSubmit(e)}
               >
                  <input
                     className="border-[1px] border-black text-black py-[5px] px-[10px]"
                     type="text"
                     name=""
                     id=""
                     placeholder="Search Titles"
                     value={input}
                     ref={inputRef}
                     onChange={(e) => setInput(e.target.value)}
                  />
                  <input
                     className="bg-[#830483] text-white cursor-pointer py-1 px-3"
                     type="submit"
                     value="Submit"
                  />
               </form>
            )}

            <div className="hidden sm:block">or</div>

            {(!isSearchByYear || isDesktopView) && (
               <form
                  onSubmit={(e) => handleTitleYearSubmit(e)}
                  className="flex flex-col sm:flex-row gap-2 w-full sm:w-[initial]"
               >
                  <div className="flex w-full gap-[5px]">
                     <input
                        className="flex-1 border-[1px] border-black text-black py-[5px] px-[10px]"
                        type="text"
                        placeholder="Title"
                        value={inputTitle}
                        onChange={(e) => setInputTitle(e.target.value)}
                     />
                     <input
                        className="border-[1px] border-black text-black w-[80px] py-[5px] px-[10px]"
                        type="text"
                        placeholder="Year"
                        value={inputYear}
                        maxLength="4"
                        onChange={(e) => setInputYear(e.target.value)}
                     />
                  </div>
                  <input
                     className="bg-[#830483] text-white cursor-pointer py-1 px-3"
                     type="submit"
                     value="Submit"
                  />
               </form>
            )}
         </div>
         <div className="overflow-auto h-[75vh] relative no-scrollbar">
            {loading ? (
               <div className="loader"></div>
            ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-[32px]">
                  {movies.length ? (
                     movies.map((movie) => (
                        <div className="mx-auto" key={movie.imdbID}>
                           {isMovieInList(movie) ? (
                              <div
                                 className={`${
                                    isMovieWatched(movie)
                                       ? "text-[#8d8d8d] cursor-not-allowed"
                                       : "text-white"
                                 } relative`}
                              >
                                 {movie.Poster === "N/A" ? (
                                    <div className="w-[175px] h-[285px] bg-slate-400 flex items-center justify-center mx-auto"></div>
                                 ) : (
                                    <img
                                       src={movie.Poster}
                                       alt={movie.Title}
                                       width="175"
                                       height="285"
                                       className="mx-auto"
                                    />
                                 )}
                                 <div
                                    className="absolute bg-black/50 top-0 left-0 right-0 h-[100%] font-black text-[25px] flex items-center justify-center"
                                    style={{ textShadow: "1px 1px 3px black" }}
                                 >
                                    <div className="flex flex-col items-center">
                                       <IoMdAddCircleOutline
                                          className={`text-[50px] rotate-45 ${
                                             imdbIDCollection[movie.imdbID]
                                                ? "animate-rotation"
                                                : ""
                                          }`}
                                       />
                                       <div>
                                          {isMovieWatched(movie)
                                             ? "Watched"
                                             : "Pending"}
                                       </div>

                                       {!isMovieWatched(movie) &&
                                          (isMovieVotedByUser(movie) ? (
                                             <button
                                                onClick={() =>
                                                   handleRemoveVote(movie)
                                                }
                                                className="bg-[gray] text-white p-2 uppercase text-[10px] md:text-[12px] font-bold"
                                             >
                                                Retract
                                             </button>
                                          ) : (
                                             <button
                                                onClick={() =>
                                                   handleCastVote(movie)
                                                }
                                                className="bg-[#830483] text-white p-2 uppercase text-[10px] md:text-[12px] font-bold"
                                             >
                                                Request
                                             </button>
                                          ))}
                                    </div>
                                 </div>
                                 <div
                                    className="absolute top-0 left-0 right-0 text-center text-[18px] font-black pt-[5px]"
                                    style={{ textShadow: "1px 1px 3px black" }}
                                 >
                                    {movie.Title} ({movie.Year})
                                 </div>
                              </div>
                           ) : (
                              <div className="relative">
                                 <button
                                    className="block"
                                    onClick={() => handleMovieSelection(movie)}
                                    disabled={
                                       disabledButtonStates[movie.imdbID]
                                    }
                                 >
                                    {movie.Poster === "N/A" ? (
                                       <div className="w-[175px] h-[285px] bg-slate-400 flex items-center justify-center mx-auto"></div>
                                    ) : (
                                       <img
                                          src={movie.Poster}
                                          alt={movie.Title}
                                          width="175"
                                          height="285"
                                          className="mx-auto"
                                       />
                                    )}
                                    <div
                                       className="absolute bg-black/50 top-0 left-0 right-0 h-[100%] font-black text-white text-[25px] flex items-center justify-center"
                                       style={{
                                          textShadow: "1px 1px 3px black",
                                       }}
                                    >
                                       <div className="flex flex-col">
                                          <IoMdAddCircleOutline className="text-[50px]" />
                                          <div>Add</div>
                                       </div>
                                    </div>
                                    <div
                                       className="absolute top-0 left-0 right-0 text-white text-center text-[18px] font-black pt-[5px]"
                                       style={{
                                          textShadow: "1px 1px 3px black",
                                       }}
                                    >
                                       {movie.Title} ({movie.Year})
                                    </div>
                                 </button>
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
