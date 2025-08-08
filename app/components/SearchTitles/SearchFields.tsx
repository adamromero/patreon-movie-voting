import React, { RefObject } from "react";

interface SearchFieldsProps {
   handleTitleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
   setInput: (value: string) => void;
   handleTitleYearSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
   setInputTitle: (value: string) => void;
   setInputYear: (value: string) => void;
   handleImdbIDSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
   setInputImdbID: (value: string) => void;
   input: string;
   inputTitle: string;
   inputYear: string;
   inputImdbID: string;
   inputRef: RefObject<HTMLInputElement | null>;
}

const SearchFields: React.FC<SearchFieldsProps> = ({
   handleTitleSubmit,
   setInput,
   handleTitleYearSubmit,
   setInputTitle,
   setInputYear,
   handleImdbIDSubmit,
   setInputImdbID,
   input,
   inputTitle,
   inputYear,
   inputImdbID,
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
            <form
               onSubmit={(e) => handleTitleYearSubmit(e)}
               className="flex flex-1 gap-2 w-full "
            >
               <div className="flex w-full gap-[5px]">
                  <input
                     className="flex-[2_2_0%] w-full text-black py-[5px] px-[10px]"
                     type="text"
                     placeholder="Title"
                     value={inputTitle}
                     onChange={(e) => setInputTitle(e.target.value)}
                  />
                  <input
                     className="text-black flex-1 w-full sm:max-w-[80px] py-[5px] px-[10px]"
                     type="text"
                     placeholder="Year"
                     value={inputYear}
                     maxLength={4}
                     onChange={(e) => setInputYear(e.target.value)}
                  />
               </div>
               <input
                  className="bg-[#830483] hover:bg-[#a300a3] focus-visible:bg-[#a300a3] transition-colors duration-300 ease-in-out text-white cursor-pointer py-1 px-3"
                  type="submit"
                  value="Search"
               />
            </form>
         </div>
         <div>
            <form
               onSubmit={(e) => handleImdbIDSubmit(e)}
               className="flex flex-1 gap-2 w-full"
            >
               <div className="flex w-full gap-[5px]">
                  <input
                     className="text-black w-[80px] py-[5px] px-[10px] w-full"
                     type="text"
                     placeholder="IMDB ID"
                     value={inputImdbID}
                     onChange={(e) => setInputImdbID(e.target.value)}
                  />
               </div>
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
