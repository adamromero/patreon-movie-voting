"use client";
import React, { useContext } from "react";
import { MovieContext } from "@/context/MovieContext";

const FilterTags = () => {
   const { filterOptions } = useContext(MovieContext);

   return (
      <div className="flex gap-[10px] mb-[15px]">
         {Object.values(filterOptions).map((value, index) => {
            if (value !== "" && value !== "all") {
               return (
                  <div
                     key={index}
                     className="bg-black px-[8px] py-[5px] inline capitalize"
                  >
                     {value}
                  </div>
               );
            }
         })}
      </div>
   );
};

export default FilterTags;
