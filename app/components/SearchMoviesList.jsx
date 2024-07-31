import React, { useContext } from "react";
import { MovieContext } from "@/context/MovieContext";

const SearchMoviesList = () => {
   const {
      searchTitle,
      setSearchTitle,
      searchDirector,
      setSearchDirector,
      searchActor,
      setSearchActor,
      searchComposer,
      setSearchComposer,
   } = useContext(MovieContext);

   return (
      <div className="mb-[15px]">
         <div className="mb-[2px]">Search requested movies</div>
         <div className="flex flex-col lg:flex-row gap-[10px] w-full lg:max-w-[1000px]">
            <div className="flex flex-1 gap-[5px]">
               <input
                  className="text-black px-[10px] py-[5px] w-full lg:max-w-[200px]"
                  type="text"
                  placeholder="Search titles"
                  value={searchTitle}
                  onChange={(e) => setSearchTitle(e.target.value)}
               />
               <button
                  onClick={() => setSearchTitle("")}
                  className="bg-black focus-visible:bg-[#262626] hover:bg-[#262626] transition-colors duration-300 ease-in-out px-[10px] py-[5px]"
               >
                  Clear
               </button>
            </div>
            <div className="flex flex-1 gap-[5px]">
               <input
                  className="text-black px-[10px] py-[5px] w-full lg:max-w-[200px]"
                  type="text"
                  placeholder="Search directors"
                  value={searchDirector}
                  onChange={(e) => setSearchDirector(e.target.value)}
               />
               <button
                  onClick={() => setSearchDirector("")}
                  className="bg-black focus-visible:bg-[#262626] hover:bg-[#262626] transition-colors duration-300 ease-in-out px-[10px] py-[5px]"
               >
                  Clear
               </button>
            </div>
            <div className="flex flex-1 gap-[5px]">
               <input
                  className="text-black px-[10px] py-[5px] w-full lg:max-w-[200px]"
                  type="text"
                  placeholder="Search top actors"
                  value={searchActor}
                  onChange={(e) => setSearchActor(e.target.value)}
               />
               <button
                  onClick={() => setSearchActor("")}
                  className="bg-black focus-visible:bg-[#262626] hover:bg-[#262626] transition-colors duration-300 ease-in-out px-[10px] py-[5px]"
               >
                  Clear
               </button>
            </div>
            <div className="flex flex-1 gap-[5px]">
               <input
                  className="text-black px-[10px] py-[5px] w-full lg:max-w-[200px]"
                  type="text"
                  placeholder="Search composers"
                  value={searchComposer}
                  onChange={(e) => setSearchComposer(e.target.value)}
               />
               <button
                  onClick={() => setSearchComposer("")}
                  className="bg-black focus-visible:bg-[#262626] hover:bg-[#262626] transition-colors duration-300 ease-in-out px-[10px] py-[5px]"
               >
                  Clear
               </button>
            </div>
         </div>
      </div>
   );
};

export default SearchMoviesList;
