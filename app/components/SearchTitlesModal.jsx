"use client";
import React, { useState, useEffect, useContext, useRef } from "react";
//import { MovieContext } from "../context/MovieContext";
import { IoMdAddCircleOutline } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";

const SearchTitlesModal = ({ setIsModalOpen, currentUser }) => {
   const [input, setInput] = useState("");
   const [title, setTitle] = useState("");
   const [movies, setMovies] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");
   //const { moviesList, createMovieVote } = useContext(MovieContext);
   const inputRef = useRef(null);
   const [imdbIDCollection, setImdbIDCollection] = useState({});

   const API_URL = `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${title}`;

   //    useEffect(() => {
   //       const fetchMovieTitles = async () => {
   //          if (title) {
   //             setLoading(true);
   //             inputRef.current.blur();
   //             const response = await fetch(API_URL);
   //             const data = await response.json();
   //             if (data.Response === "True") {
   //                const titles = data.Search.filter(
   //                   (title) => title.Type === "movie" || title.Type === "series"
   //                );
   //                setMovies(titles);

   //                const ids = data.Search.map((entry) => entry.imdbID);
   //                const result = ids.reduce((obj, num) => {
   //                   obj[num] = false;
   //                   return obj;
   //                }, {});

   //                setImdbIDCollection(result);

   //                setLoading(false);
   //             } else {
   //                setMovies([]);
   //                setError(data.Error);
   //                setLoading(false);
   //             }
   //          }
   //       };
   //       if (inputRef.current) {
   //          inputRef.current.focus();
   //       }
   //       fetchMovieTitles();
   //    }, [title]);

   //    const isMovieInList = (selectedMovie) => {
   //       return moviesList.filter(
   //          (movie) => movie.data.imdbID === selectedMovie.imdbID
   //       ).length;
   //    };

   //    const isMovieWatched = (selectedMovie) => {
   //       return moviesList.find(
   //          (movie) => movie.data.imdbID === selectedMovie.imdbID
   //       ).isWatched;
   //    };

   const handleTitleSubmit = (e) => {
      e.preventDefault();
      if (input) {
         setTitle(input);
      }
   };

   //    const handleMovieSelection = async (movie) => {
   //       setImdbIDCollection({ [movie.imdbID]: true });
   //       createMovieVote(movie, currentUser);
   //    };

   return (
      <div className="p-[45px] fixed shadow-2xl	shadow-black top-[50%] translate-y-[-50%] max-w-[1024px] w-full h-[85vh] bg-black border-[1px] border-white z-50 rounded-[16px]">
         <div className="flex gap-2 items-center justify-center pb-[16px]">
            {currentUser}
            <form className="flex gap-2" onSubmit={(e) => handleTitleSubmit(e)}>
               <input
                  className="border-[1px] border-black text-black px-2"
                  type="text"
                  name=""
                  id=""
                  placeholder="Search titles"
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
            <div>or</div>

            <form>
               <input
                  className="border-[1px] border-black text-black px-2"
                  type="text"
                  placeholder="Search title by year"
               />
               <input
                  className="border-[1px] border-black text-black px-2"
                  type="text"
                  placeholder="Year"
               />
            </form>
            <button
               className="ml-auto px-3"
               onClick={() => setIsModalOpen((isOpen) => !isOpen)}
            >
               <AiOutlineClose className="text-[25px] text-white" />
            </button>
         </div>
         <div className="overflow-auto h-[65vh] relative no-scrollbar">
            {loading ? (
               <div className="loader"></div>
            ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-[32px]">
                  {movies.length ? (
                     movies.map((movie) => (
                        <div className="mx-auto" key={movie.imdbID}>
                           {/* {isMovieInList(movie) ? (
                              <div
                                 className={`${
                                    isMovieWatched(movie)
                                       ? "text-[#8d8d8d]"
                                       : "text-white"
                                 } relative cursor-not-allowed`}
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
                           )} */}
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
