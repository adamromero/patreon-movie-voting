import React from "react";

const SearchMoviesList = ({ searchTitle, setSearchTitle }) => {
   return (
      <div className="flex flex-1 gap-[5px] mb-[15px]">
         <input
            className="border-[1px] border-black text-black px-[10px] py-[5px] max-w-[250px] w-full"
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
   );
};

export default SearchMoviesList;
