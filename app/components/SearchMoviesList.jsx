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
      <>
         <div className="mb-[2px]">Search requested movies</div>
         <div className="flex flex-col lg:flex-row gap-[10px] w-full lg:max-w-[1000px]">
            <div className="flex flex-1 gap-[5px]">
               <input
                  className="text-black px-[10px] py-[5px] w-full lg:max-w-[200px]"
                  type="text"
                  placeholder="Search titles"
                  value={searchTitle}
                  onChange={(e) => {
                     const regex = /^[A-Za-z0-9\s,:&"!?'-/]+$/;
                     setSearchTitle(
                        regex.test(e.target.value) ? e.target.value : ""
                     );
                  }}
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
                  onChange={(e) => {
                     const regex = /^[A-Za-z0-9\s,:&"!?'-/]+$/;
                     setSearchDirector(
                        regex.test(e.target.value) ? e.target.value : ""
                     );
                  }}
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
                  onChange={(e) => {
                     const regex = /^[A-Za-z0-9\s,:&"!?'-/]+$/;
                     setSearchActor(
                        regex.test(e.target.value) ? e.target.value : ""
                     );
                  }}
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
                  onChange={(e) => {
                     const regex = /^[A-Za-z0-9\s,:&"!?'-/]+$/;
                     setSearchComposer(
                        regex.test(e.target.value) ? e.target.value : ""
                     );
                  }}
               />
               <button
                  onClick={() => setSearchComposer("")}
                  className="bg-black focus-visible:bg-[#262626] hover:bg-[#262626] transition-colors duration-300 ease-in-out px-[10px] py-[5px]"
               >
                  Clear
               </button>
            </div>
         </div>
      </>
   );
};

export default SearchMoviesList;
