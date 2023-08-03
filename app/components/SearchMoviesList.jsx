import React from "react";

const SearchMoviesList = ({ searchTitle, setSearchTitle }) => {
   return (
      <div className="flex flex-1 gap-[5px]">
         <input
            className="text-black px-[10px] py-[5px] max-w-[250px] w-full"
            type="text"
            placeholder="Search requested movies"
            value={searchTitle}
            onChange={(e) => {
               const regex = /^[a-zA-Z0-9 ]+$/;
               setSearchTitle(regex.test(e.target.value) ? e.target.value : "");
            }}
         />
         <button
            onClick={() => setSearchTitle("")}
            className="bg-black focus-visible:bg-[#262626] hover:bg-[#262626] transition-colors duration-300 ease-in-out px-[10px] py-[5px]"
         >
            Clear
         </button>
      </div>
   );
};

export default SearchMoviesList;
