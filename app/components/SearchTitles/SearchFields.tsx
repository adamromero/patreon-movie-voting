import React, { RefObject } from "react";
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
         <div className="flex basis-full flex-col gap-[5px]">
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

            <div className="flex text-center items-start md:items-center md:text-left text-[14px] p-[5px]">
               <div className="flex flex-1 items-center flex-col lg:flex-row gap-0 lg:gap-[5px]">
                  <div className="flex items-center gap-[5px]">
                     <p className="flex gap-[5px] items-start md:items-center">
                        <TbInfoSquareRoundedFilled className="text-[#ba00d9] text-[20px] w-[30px]" />
                        Tip: You can use the 'y:' filter to narrow your results
                        by year. Example: 'star wars y:1977'.{" "}
                     </p>
                  </div>
                  <div>
                     <p>You can also search by imdb id. Example: tt0076759 </p>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default SearchFields;
