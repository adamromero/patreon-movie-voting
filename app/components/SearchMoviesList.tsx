"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useRequestQuery } from "../hooks/useRequestQuery";
import { useDebounce } from "../hooks/useDebounce";
import { useState, useEffect } from "react";

const SearchMoviesList = () => {
   const router = useRouter();
   const searchParams = useSearchParams();
   const query = useRequestQuery();

   const [searchTitle, setSearchTitle] = useState(query.title ?? "");
   const [searchDirector, setSearchDirector] = useState(query.director ?? "");
   const [searchActor, setSearchActor] = useState(query.actor ?? "");
   const [searchComposer, setSearchComposer] = useState(query.composer ?? "");

   const debouncedTitle = useDebounce(searchTitle, 500);
   const debouncedDirector = useDebounce(searchDirector, 500);
   const debouncedActor = useDebounce(searchActor, 500);
   const debouncedComposer = useDebounce(searchComposer, 500);

   useEffect(() => {
      const params = new URLSearchParams(searchParams);

      if (debouncedTitle) {
         params.set("title", debouncedTitle);
         params.set("page", "1");
         router.push(`?${params.toString()}`, { scroll: false });
      } else {
         params.delete("title");
         router.push(`?${params.toString()}`, { scroll: false });
      }

      if (debouncedDirector) {
         params.set("director", debouncedDirector);
         params.set("page", "1");
         router.push(`?${params.toString()}`, { scroll: false });
      } else {
         params.delete("director");
         router.push(`?${params.toString()}`, { scroll: false });
      }

      if (debouncedActor) {
         params.set("actor", debouncedActor);
         params.set("page", "1");
         router.push(`?${params.toString()}`, { scroll: false });
      } else {
         params.delete("actor");
         router.push(`?${params.toString()}`, { scroll: false });
      }

      if (debouncedComposer) {
         params.set("composer", debouncedComposer);
         params.set("page", "1");
         router.push(`?${params.toString()}`, { scroll: false });
      } else {
         params.delete("composer");
         router.push(`?${params.toString()}`, { scroll: false });
      }
   }, [debouncedTitle, debouncedDirector, debouncedActor, debouncedComposer]);

   const handleClearSearchTitle = () => {
      setSearchTitle("");
      const params = new URLSearchParams(searchParams);
      params.delete("title");
      router.push(`?${params.toString()}`, { scroll: false });
   };

   const handleClearSearchDirector = () => {
      setSearchDirector("");
      const params = new URLSearchParams(searchParams);
      params.delete("director");
      router.push(`?${params.toString()}`, { scroll: false });
   };

   const handleClearSearchActor = () => {
      setSearchActor("");
      const params = new URLSearchParams(searchParams);
      params.delete("actor");
      router.push(`?${params.toString()}`, { scroll: false });
   };

   const handleClearSearchComposer = () => {
      setSearchComposer("");
      const params = new URLSearchParams(searchParams);
      params.delete("composer");
      router.push(`?${params.toString()}`, { scroll: false });
   };

   return (
      <div className="mb-[15px]">
         <div className="mb-[2px]">Search requests</div>
         <div className="flex flex-col lg:flex-row gap-[10px] w-full lg:max-w-[1000px]">
            <div className="flex flex-1 gap-[5px]">
               <input
                  className="text-black px-[10px] py-[5px] w-full lg:max-w-[200px]"
                  type="text"
                  placeholder="Search titles"
                  value={searchTitle}
                  onChange={(e) => setSearchTitle(e.target.value)}
               />
               <button
                  onClick={() => handleClearSearchTitle()}
                  className="bg-black focus-visible:bg-[#262626] hover:bg-[#262626] transition-colors duration-300 ease-in-out px-[10px] py-[5px]"
               >
                  Clear
               </button>
            </div>
            <div className="flex flex-1 gap-[5px]">
               <input
                  className="text-black px-[10px] py-[5px] w-full lg:max-w-[200px]"
                  type="text"
                  placeholder="Search directors"
                  value={searchDirector}
                  onChange={(e) => setSearchDirector(e.target.value)}
               />
               <button
                  onClick={() => handleClearSearchDirector()}
                  className="bg-black focus-visible:bg-[#262626] hover:bg-[#262626] transition-colors duration-300 ease-in-out px-[10px] py-[5px]"
               >
                  Clear
               </button>
            </div>
            <div className="flex flex-1 gap-[5px]">
               <input
                  className="text-black px-[10px] py-[5px] w-full lg:max-w-[200px]"
                  type="text"
                  placeholder="Search top actors"
                  value={searchActor}
                  onChange={(e) => setSearchActor(e.target.value)}
               />
               <button
                  onClick={() => handleClearSearchActor()}
                  className="bg-black focus-visible:bg-[#262626] hover:bg-[#262626] transition-colors duration-300 ease-in-out px-[10px] py-[5px]"
               >
                  Clear
               </button>
            </div>
            <div className="flex flex-1 gap-[5px]">
               <input
                  className="text-black px-[10px] py-[5px] w-full lg:max-w-[200px]"
                  type="text"
                  placeholder="Search composers"
                  value={searchComposer}
                  onChange={(e) => setSearchComposer(e.target.value)}
               />
               <button
                  onClick={() => handleClearSearchComposer()}
                  className="bg-black focus-visible:bg-[#262626] hover:bg-[#262626] transition-colors duration-300 ease-in-out px-[10px] py-[5px]"
               >
                  Clear
               </button>
            </div>
         </div>
      </div>
   );
};

export default SearchMoviesList;
