import React, { RefObject } from "react";
import { Tooltip } from "react-tooltip";
import { TbInfoSquareRoundedFilled } from "react-icons/tb";

interface SearchFieldsProps {
   handleTitleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
   setLoading: (value: boolean) => void;
   setInput: (value: string) => void;
   input: string;
   inputRef: RefObject<HTMLInputElement | null>;
}

const SearchFields: React.FC<SearchFieldsProps> = ({
   handleTitleSubmit,
   setLoading,
   setInput,
   input,
   inputRef,
}) => {
   return (
      <>
         <div className="flex flex-col basis-full md:basis-2/3 gap-[10px]">
            <form
               className="flex gap-2 w-full items-center"
               onSubmit={(e) => {
                  setLoading(true);
                  handleTitleSubmit(e);
               }}
            >
               <label className="sr-only" htmlFor="SearchTitles">
                  Search Titles
               </label>
               <TbInfoSquareRoundedFilled
                  className="text-[purple] text-[35px]"
                  data-tooltip-id="search-tooltip"
               />
               <input
                  className="text-black w-full py-[8px] px-[10px]"
                  type="text"
                  name="search"
                  id="SearchTitles"
                  placeholder="Search titles"
                  value={input}
                  ref={inputRef}
                  onChange={(e) => setInput(e.target.value)}
               />
               <input
                  className="bg-[#830483] hover:bg-[#a300a3] focus-visible:bg-[#a300a3] transition-colors duration-300 ease-in-out text-white cursor-pointer py-[8px] px-[18px]"
                  type="submit"
                  value="Search"
               />
            </form>
            <Tooltip
               id="search-tooltip"
               place="bottom"
               variant="info"
               style={{
                  backgroundColor: "#d022ef",
                  fontWeight: "bold",
                  color: "#222",
                  zIndex: 999,
               }}
            >
               <div>
                  Tip: You can use the 'y:' filter to narrow your results by
                  year. Example: 'star wars y:1977'.{" "}
               </div>
               <div>
                  You can also search by the film or show's imdb id. Example:
                  tt0076759{" "}
               </div>
            </Tooltip>
         </div>
      </>
   );
};

export default SearchFields;
