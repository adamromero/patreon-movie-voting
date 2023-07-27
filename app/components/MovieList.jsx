"use client";
import React, { useState, useEffect, useContext } from "react";
import { MovieContext } from "@/context/MovieContext";

const MovieList = ({ currentUser, isCreator }) => {
   const {
      moviesList,
      getMovieVotes,
      castMovieVote,
      removeMovieVote,
      filterOptions,
      setFilterOptions,
      setMovieVoteToWatched,
   } = useContext(MovieContext);
   const [filteredMoviesList, setFilteredMoviesList] = useState([]);
   const [watchedState, setWatchedState] = useState({});
   const [searchTitle, setSearchTitle] = useState("");
   const [isRequestFilterAscending, setIsRequestFilterAscending] =
      useState(true);
   const [isTitleFilterAscending, setIsTitleFilterAscending] = useState(true);

   useEffect(() => {
      getMovieVotes();
   }, []);

   useEffect(() => {
      let filteredList = [...moviesList];

      if (filterOptions.votes === "most") {
         filteredList = filteredList.sort(
            (a, b) => b.voters.length - a.voters.length
         );
      } else if (filterOptions.votes === "fewest") {
         filteredList = filteredList.sort(
            (a, b) => a.voters.length - b.voters.length
         );
      }

      if (filterOptions.alphabetical === "ascend") {
         // filteredList = filteredList.sort((a, b) => {
         //    if (a.data.Title > b.data.Title) {
         //       return 1;
         //    }
         //    return 0;
         // });
      } else if (filterOptions.alphabetical === "descend") {
         filteredList = filteredList.sort((a, b) => {
            if (a.data.Title < b.data.Title) {
               return -1;
            }
            return 0;
         });
      }

      if (filterOptions.type === "movie") {
         // filteredList = filteredList.filter((movie) =>
         //    movie.data.Type.includes("movie")
         // );
      } else if (filterOptions.type === "series") {
         // filteredList = filteredList.filter((movie) =>
         //    movie.data.Type.includes("series")
         // );
      }

      if (filterOptions.genre === "action") {
         filteredList = filteredList.filter((movie) =>
            movie.data.Genre.includes("Action")
         );
      } else if (filterOptions.genre === "animation") {
         filteredList = filteredList.filter((movie) =>
            movie.data.Genre.includes("Animation")
         );
      } else if (filterOptions.genre === "bio") {
         filteredList = filteredList.filter((movie) =>
            movie.data.Genre.includes("Biography")
         );
      } else if (filterOptions.genre === "comedy") {
         filteredList = filteredList.filter((movie) =>
            movie.data.Genre.includes("Comedy")
         );
      } else if (filterOptions.genre === "crime") {
         filteredList = filteredList.filter((movie) =>
            movie.data.Genre.includes("Crime")
         );
      } else if (filterOptions.genre === "drama") {
         filteredList = filteredList.filter((movie) =>
            movie.data.Genre.includes("Drama")
         );
      } else if (filterOptions.genre === "scifi") {
         filteredList = filteredList.filter((movie) =>
            movie.data.Genre.includes("Sci-Fi")
         );
      } else if (filterOptions.genre === "family") {
         filteredList = filteredList.filter((movie) =>
            movie.data.Genre.includes("Family")
         );
      } else if (filterOptions.genre === "fantasy") {
         filteredList = filteredList.filter((movie) =>
            movie.data.Genre.includes("Fantasy")
         );
      } else if (filterOptions.genre === "horror") {
         filteredList = filteredList.filter((movie) =>
            movie.data.Genre.includes("Horror")
         );
      } else if (filterOptions.genre === "mystery") {
         filteredList = filteredList.filter((movie) =>
            movie.data.Genre.includes("Mystery")
         );
      } else if (filterOptions.genre === "music") {
         filteredList = filteredList.filter((movie) =>
            movie.data.Genre.includes("Music")
         );
      } else if (filterOptions.genre === "thriller") {
         filteredList = filteredList.filter((movie) =>
            movie.data.Genre.includes("Thriller")
         );
      } else if (filterOptions.genre === "romance") {
         filteredList = filteredList.filter((movie) =>
            movie.data.Genre.includes("Romance")
         );
      } else if (filterOptions.genre === "sport") {
         filteredList = filteredList.filter((movie) =>
            movie.data.Genre.includes("Sport")
         );
      } else if (filterOptions.genre === "war") {
         filteredList = filteredList.filter((movie) =>
            movie.data.Genre.includes("War")
         );
      } else if (filterOptions.genre === "western") {
         filteredList = filteredList.filter((movie) =>
            movie.data.Genre.includes("Western")
         );
      }

      if (filterOptions.status === "watched") {
         filteredList = filteredList.filter((movie) => movie.isWatched);
      } else if (filterOptions.status === "unwatched") {
         filteredList = filteredList.filter((movie) => !movie.isWatched);
      }

      if (searchTitle) {
         filteredList = filteredList.filter((movie) =>
            movie.data.Title.toLowerCase().includes(searchTitle.toLowerCase())
         );
      }

      setFilteredMoviesList(filteredList);
   }, [moviesList, filterOptions, searchTitle]);

   useEffect(() => {
      const watchedStateObject = {};
      filteredMoviesList.forEach((movie) => {
         watchedStateObject[movie._id] = movie.isWatched;
      });
      setWatchedState(watchedStateObject);
   }, [filteredMoviesList]);

   const handleCastVote = async (movieId, voters) => {
      castMovieVote(movieId, voters, currentUser);
   };

   const handleRemoveVote = async (movieId, voters) => {
      removeMovieVote(movieId, voters, currentUser);
   };

   const handleWatchSetting = (e, data) => {
      const isChecked = e.target.checked;
      setMovieVoteToWatched(data._id, isChecked);
      setWatchedState((prevState) => ({
         ...prevState,
         [data._id]: isChecked,
      }));
   };

   const handleTitleFilter = () => {
      console.log("trigger title filter");
      setFilterOptions((prevOptions) => ({
         ...prevOptions,
         alphabetical: isTitleFilterAscending ? "ascend" : "descend",
      }));
   };

   const handleRequestsFilter = () => {
      console.log("requests filter");
      setFilterOptions((prevOptions) => ({
         ...prevOptions,
         votes: isRequestFilterAscending ? "most" : "fewest",
      }));
   };

   const tableHead = (
      <thead className="bg-black">
         <tr className="text-left">
            <th className="w-[100px]"></th>
            <th className="md:w-[300px]">
               <button
                  className="w-full text-left p-[10px]"
                  onClick={() => {
                     setIsTitleFilterAscending(!isTitleFilterAscending);
                     handleTitleFilter();
                  }}
               >
                  Title
               </button>
            </th>
            <th className="hidden md:table-cell">
               <div className="w-full text-left p-[10px]">Rating</div>
            </th>
            <th className="hidden md:table-cell">
               <div className="w-full text-left p-[10px]">Genre</div>
            </th>
            <th>
               <button
                  onClick={() => {
                     setIsRequestFilterAscending(!isRequestFilterAscending);
                     handleRequestsFilter();
                  }}
                  className="w-full text-left p-[10px]"
               >
                  Requests
               </button>
            </th>
            <th></th>
            {isCreator && <th>Watched</th>}
         </tr>
      </thead>
   );

   const tableBody = filteredMoviesList.length ? (
      <tbody>
         {filteredMoviesList.length ? (
            <>
               {filteredMoviesList.map((data) => (
                  <tr
                     key={data._id}
                     className="text-center md:text-left text-[12px] md:text-[16px]"
                     style={{
                        marginBottom: "20px",
                        backgroundColor: data.isWatched ? "none" : "#000",
                        color: data.isWatched ? "#000" : "#fff",
                        position: "relative",
                     }}
                  >
                     <td className="">
                        <a
                           href={`https://www.imdb.com/title/${data.data.imdbID}`}
                           title="Go to IMDB"
                           target="_blank"
                        >
                           <img
                              src={data.data.Poster}
                              width={50}
                              height={205}
                              alt={data.data.Title}
                           />
                        </a>
                     </td>
                     <td className="pr-[5px]">
                        {data.data.Title} ({data.data.Year})
                     </td>
                     <td className="hidden md:table-cell">{data.data.Rated}</td>
                     <td className="hidden md:table-cell">{data.data.Genre}</td>
                     <td>{data.voters.length}</td>
                     <td>
                        {!data.isWatched && currentUser ? (
                           data.voters.filter((voter) => voter === currentUser)
                              .length ? (
                              <button
                                 className="bg-[gray] text-white p-2 uppercase text-[10px] md:text-[12px] font-bold"
                                 onClick={() =>
                                    handleRemoveVote(data._id, data.voters)
                                 }
                              >
                                 Retract
                              </button>
                           ) : (
                              <button
                                 className="bg-[#830483] text-white p-2 uppercase text-[10px] md:text-[12px] font-bold"
                                 onClick={() =>
                                    handleCastVote(data._id, data.voters)
                                 }
                              >
                                 Request
                              </button>
                           )
                        ) : null}
                     </td>
                     {isCreator && (
                        <td>
                           <div className="container">
                              <label
                                 className="switch"
                                 htmlFor={`checkbox-${data._id}`}
                              >
                                 <input
                                    type="checkbox"
                                    id={`checkbox-${data._id}`}
                                    checked={!!watchedState[data._id]}
                                    onChange={(e) =>
                                       handleWatchSetting(e, data)
                                    }
                                 />
                                 <div className="slider round"></div>
                              </label>
                           </div>
                        </td>
                     )}
                  </tr>
               ))}
            </>
         ) : (
            <div className="loader"></div>
         )}
      </tbody>
   ) : null;

   return (
      <>
         <div className="flex gap-3 mt-[10px] mb-[20px]">
            <div>Total count: {moviesList.length}</div>
            <div>
               Not watched:{" "}
               {moviesList.filter((movie) => !movie.isWatched).length}
            </div>
            <div>
               Watched: {moviesList.filter((movie) => movie.isWatched).length}
            </div>
         </div>

         <div>
            <input
               className="border-[1px] border-black text-black px-[10px] py-[5px] mb-[20px] max-w-[250px] w-full"
               type="text"
               placeholder="Search requested movies"
               value={searchTitle}
               onChange={(e) => setSearchTitle(e.target.value)}
            />
            <button
               onClick={() => setSearchTitle("")}
               className="bg-black px-[10px] py-[5px]"
            >
               Clear
            </button>
         </div>
         <table className="w-full">
            {tableHead}
            {tableBody}
         </table>
      </>
   );
};

export default MovieList;