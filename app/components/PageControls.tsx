import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "./Pagination";

interface PageControlsProps {
   total: number;
   page: number;
   pages: number;
   limit: number;
}

const PageControls: React.FC<PageControlsProps> = ({
   total,
   page,
   pages,
   limit,
}) => {
   const router = useRouter();
   const searchParams = useSearchParams();

   const updatePage = (newPage: number) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", newPage.toString());
      router.push(`?${params.toString()}`, { scroll: false });
   };

   const handleRowsPerPage = (limit: number) => {
      const params = new URLSearchParams(searchParams);
      params.set("limit", limit.toString());
      params.set("page", "1");
      router.push(`?${params.toString()}`, { scroll: false });
   };

   return (
      <>
         <Pagination
            currentPage={page}
            totalPages={pages}
            firstPage={() => updatePage(1)}
            lastPage={() => updatePage(pages)}
            decrementPage={() => updatePage(Math.max(page - 1, 1))}
            incrementPage={() => updatePage(Math.min(page + 1, pages))}
         />
         <div>Results: {total}</div>
         <div className="flex gap-[5px]">
            <label htmlFor="rowsPerPage">Rows per page</label>
            <select
               className="text-black"
               name="rowsPerPage"
               id="rowsPerPage"
               value={limit}
               onChange={(e) => handleRowsPerPage(Number(e.target.value))}
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
