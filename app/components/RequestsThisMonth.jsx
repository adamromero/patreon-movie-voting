"use client";
import React, { useContext } from "react";
import { convertMonthFormat } from "../utils/convertDateFormat";
import { AiTwotoneCalendar } from "react-icons/ai";
import { MovieContext } from "@/context/MovieContext";

const RequestsThisMonth = () => {
   const { moviesByDateMap } = useContext(MovieContext);
   const maxRequestsDisplayed = 3;
   const firstRequestDisplayed =
      moviesByDateMap.size >= maxRequestsDisplayed
         ? moviesByDateMap.size - maxRequestsDisplayed
         : 0;

   if (moviesByDateMap.size) {
      return (
         <div className="mb-[15px]">
            <h2 className="flex items-center gap-[5px] mb-[5px] font-bold">
               My Requests for{" "}
               {new Date().toLocaleString(undefined, { month: "long" })}{" "}
               <AiTwotoneCalendar />
            </h2>
            <div className="flex gap-[10px]">
               {Array.from(moviesByDateMap.entries())
                  .slice(firstRequestDisplayed, moviesByDateMap.size)
                  .map(([key, value]) => (
                     <div key={key}>
                        <img
                           src={`https://image.tmdb.org/t/p/w200/${value.data.Poster}`}
                           alt={value.data.Title}
                           width="75"
                           height="100"
                        />
                     </div>
                  ))}
            </div>
         </div>
      );
   }

   return null;
};

export default RequestsThisMonth;
