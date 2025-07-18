import React, { useState, useContext } from "react";
import { MovieContext } from "@/context/MovieContext";
import clipboardCopy from "clipboard-copy";

const CopyableList = () => {
   const { filteredMoviesList } = useContext(MovieContext);
   const [buttonText, setButtonText] = useState("Copy List");

   const handleCopyAllClick = () => {
      const allText = filteredMoviesList
         .map((movie) => {
            return `${movie.data.Title} (${movie.data.Year})`;
         })
         .join("\n");

      clipboardCopy(allText);
      setButtonText("Copied");
      setTimeout(() => {
         setButtonText("Copy List");
      }, 1000);
   };

   return (
      <div>
         <button
            className="max-w-[200px] w-full bg-[black] focus-visible:bg-[#262626] hover:bg-[#262626] transition-colors duration-300 ease-in-out text-white cursor-pointer py-1 px-3"
            onClick={handleCopyAllClick}
         >
            {buttonText}
         </button>
      </div>
   );
};

export default CopyableList;
