import React from "react";
import {
   MdKeyboardDoubleArrowLeft,
   MdKeyboardDoubleArrowRight,
   MdKeyboardArrowLeft,
   MdKeyboardArrowRight,
} from "react-icons/md";

const Pagination = ({
   postsPerPage,
   totalPosts,
   currentPage,
   firstPage,
   lastPage,
   decrementPage,
   incrementPage,
}) => {
   return (
      <nav className="flex items-center gap-[5px]">
         <button
            className="border-[1px] border-white rounded-[5px] text-[30px] hover:bg-black/[.4] focus-visible:bg-black/[.4]"
            onClick={firstPage}
         >
            <MdKeyboardDoubleArrowLeft />
         </button>
         <button
            className="border-[1px] border-white rounded-[5px] text-[30px] hover:bg-black/[.4] focus-visible:bg-black/[.4]"
            onClick={decrementPage}
         >
            <MdKeyboardArrowLeft />
         </button>
         <div className="text-[16px] mx-[5px]">
            {currentPage} of {Math.ceil(totalPosts / postsPerPage)}
         </div>
         <button
            className="border-[1px] border-white rounded-[5px] text-[30px] hover:bg-black/[.4] focus-visible:bg-black/[.4]"
            onClick={incrementPage}
         >
            <MdKeyboardArrowRight />
         </button>
         <button
            className="border-[1px] border-white rounded-[5px] text-[30px] hover:bg-black/[.4] focus-visible:bg-black/[.4]"
            onClick={lastPage}
         >
            <MdKeyboardDoubleArrowRight />
         </button>
      </nav>
   );
};

export default Pagination;
