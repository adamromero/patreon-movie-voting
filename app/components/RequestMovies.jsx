"use client";
import React, { useState } from "react";
import SearchTitlesModal from "./SearchTitlesModal";

const RequestMovies = ({ currentUser }) => {
   const [isModalOpen, setIsModalOpen] = useState(false);

   return (
      <div>
         <button
            onClick={() => setIsModalOpen((isOpen) => !isOpen)}
            className="bg-[black] text-white cursor-pointer mb-4 py-1 px-3"
         >
            Request Movies
         </button>

         {isModalOpen && (
            <SearchTitlesModal
               currentUser={currentUser}
               setIsModalOpen={setIsModalOpen}
            />
         )}
      </div>
   );
};

export default RequestMovies;
