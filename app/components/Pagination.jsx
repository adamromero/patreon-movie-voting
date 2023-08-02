import React from "react";

const Pagination = ({ postsPerPage, totalPosts, currentPage, paginate }) => {
   const pageNumbers = [];
   for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
   }

   return (
      <nav>
         <ul className="flex gap-[5px]">
            {pageNumbers.map((number) => (
               <li key={number}>
                  <button
                     onClick={() => paginate(number)}
                     className={`${
                        currentPage === number ? "bg-black" : ""
                     } px-[8px] rounded-[3px] hover:bg-[#620062] focus-visible:bg-[#620062]`}
                  >
                     {number}
                  </button>
               </li>
            ))}
         </ul>
      </nav>
   );
};

export default Pagination;
