"use client";
import React from "react";
import { AiTwotoneCalendar } from "react-icons/ai";
import { useMovieContext } from "@/context/MovieContext";

const RequestsThisMonth = () => {
   const { moviesByDateMap } = useMovieContext();

   const moviesByDateArray = Array.from(moviesByDateMap, ([key, value]) => ({
      key,
      value,
   }));

   const maxRequestsDisplayed = 3;
   const firstRequestDisplayed =
      moviesByDateArray.length >= maxRequestsDisplayed
         ? moviesByDateArray.length - maxRequestsDisplayed
         : 0;

   if (moviesByDateArray.length) {
      return (
         <div className="mb-[15px]">
            <h2 className="flex items-center gap-[5px] mb-[5px] font-bold">
               My Requests for{" "}
               {new Date().toLocaleString(undefined, { month: "long" })}{" "}
               <AiTwotoneCalendar />
            </h2>
            <div className="flex gap-[10px]">
               {moviesByDateArray
                  .slice(firstRequestDisplayed, moviesByDateArray.length)
                  .map(({ key, value: { data } }) => (
                     <div key={key}>
                        <img
                           src={`https://image.tmdb.org/t/p/w200/${data.Poster}`}
                           alt={data.Title}
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
