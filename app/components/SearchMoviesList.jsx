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
      <>
         <div className="flex flex-1 gap-[5px]">
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
         <div>
            <input
               className="text-black px-[10px] py-[5px] max-w-[250px] w-full"
               type="text"
               placeholder="Search Directors"
               value={searchDirector}
               onChange={(e) => {
                  const regex = /^[a-zA-Z0-9 ]+$/;
                  setSearchDirector(
                     regex.test(e.target.value) ? e.target.value : ""
                  );
               }}
            />
         </div>
         <div>
            <input
               className="text-black px-[10px] py-[5px] max-w-[250px] w-full"
               type="text"
               placeholder="Search Actors"
               value={searchActor}
               onChange={(e) => {
                  const regex = /^[a-zA-Z0-9 ]+$/;
                  setSearchActor(
                     regex.test(e.target.value) ? e.target.value : ""
                  );
               }}
            />
         </div>
      </>
   );
};

export default SearchMoviesList;
