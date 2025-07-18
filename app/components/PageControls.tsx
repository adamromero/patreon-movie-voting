import React from "react";
import Pagination from "./Pagination";

const PageControls = ({
   currentPage,
   setCurrentPage,
   rowsPerPage,
   setRowsPerPage,
   filteredListLength,
}) => {
   const firstPage = () => setCurrentPage(1);
   const lastPage = () =>
      setCurrentPage(Math.ceil(filteredListLength / rowsPerPage));
   const decrementPage = () =>
      setCurrentPage((pageNumber) =>
         pageNumber > 1 ? pageNumber - 1 : pageNumber
      );
   const incrementPage = () => {
      setCurrentPage((pageNumber) =>
         pageNumber < Math.ceil(filteredListLength / rowsPerPage)
            ? pageNumber + 1
            : pageNumber
      );
   };

   return (
      <>
         <Pagination
            rowsPerPage={rowsPerPage}
            totalPosts={filteredListLength}
            currentPage={currentPage}
            firstPage={firstPage}
            lastPage={lastPage}
            decrementPage={decrementPage}
            incrementPage={incrementPage}
         />
         <div>Results: {filteredListLength}</div>
         <div className="flex gap-[5px]">
            <label htmlFor="rowsPerPage">Rows per page</label>
            <select
               className="text-black"
               name="rowsPerPage"
               id="rowsPerPage"
               value={rowsPerPage}
               onChange={(e) => setRowsPerPage(parseInt(e.target.value))}
            >
               <option value="10">10</option>
               <option value="20">20</option>
               <option value="50">50</option>
               <option value="100">100</option>
            </select>
         </div>
      </>
   );
};

export default PageControls;
