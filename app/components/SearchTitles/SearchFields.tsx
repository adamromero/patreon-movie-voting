import React, { RefObject } from "react";

interface SearchFieldsProps {
   handleTitleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
   setInput: (value: string) => void;
   input: string;
   inputRef: RefObject<HTMLInputElement | null>;
}

const SearchFields: React.FC<SearchFieldsProps> = ({
   handleTitleSubmit,
   setInput,
   input,
   inputRef,
}) => {
   return (
      <>
         <div className="flex flex-col sm:flex-row flex gap-[10px]">
            <form
               className="flex flex-1 gap-2 w-full"
               onSubmit={(e) => handleTitleSubmit(e)}
            >
               <input
                  className="text-black w-full py-[5px] px-[10px]"
                  type="text"
                  name=""
                  id=""
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
