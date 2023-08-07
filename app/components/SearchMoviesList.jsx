import React from "react";

const SearchMoviesList = ({
   searchTitle,
   setSearchTitle,
   searchDirector,
   setSearchDirector,
   searchActor,
   setSearchActor,
}) => {
   return (
      <div className="flex flex-col md:flex-row gap-[10px] mt-[15px]">
         <div className="flex gap-[5px]">
            <input
               className="text-black px-[10px] py-[5px] max-w-[250px] w-full"
               type="text"
               placeholder="Search requested movies"
               value={searchTitle}
               onChange={(e) => {
                  const regex = /^[a-zA-Z0-9 ]+$/;
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
         <div className="flex gap-[5px]">
            <input
               className="text-black px-[10px] py-[5px] max-w-[250px] w-full"
               type="text"
               placeholder="Search directors"
               value={searchDirector}
               onChange={(e) => {
                  const regex = /^[a-zA-Z0-9 ]+$/;
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
         <div className="flex gap-[5px]">
            <input
               className="text-black px-[10px] py-[5px] max-w-[250px] w-full"
               type="text"
               placeholder="Search actors"
               value={searchActor}
               onChange={(e) => {
                  const regex = /^[a-zA-Z0-9 ]+$/;
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
      </div>
   );
};

export default SearchMoviesList;
