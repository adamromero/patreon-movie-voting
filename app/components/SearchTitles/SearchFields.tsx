import React, { RefObject } from "react";

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
         <div className="flex basis-full md:basis-2/3 gap-[10px]">
            <form
               className="flex gap-2 w-full"
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
                  className="bg-[#830483] hover:bg-[#a300a3] focus-visible:bg-[#a300a3] transition-colors duration-300 ease-in-out text-white cursor-pointer py-1 px-3"
                  type="submit"
                  value="Search"
               />
            </form>
         </div>
      </>
   );
};

export default SearchFields;
