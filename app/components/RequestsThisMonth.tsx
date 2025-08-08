"use client";
import React from "react";
import { AiTwotoneCalendar } from "react-icons/ai";
import { useBoundStore } from "@/stores/useBoundStore";

const RequestsThisMonth = () => {
   const { moviesByDateMap } = useBoundStore();

   const maxRequestsDisplayed = 3;
   const firstRequestDisplayed =
      Object.keys(moviesByDateMap).length >= maxRequestsDisplayed
         ? Object.keys(moviesByDateMap).length - maxRequestsDisplayed
         : 0;

   if (Object.keys(moviesByDateMap).length) {
      return (
         <div className="mb-[15px]">
            <h2 className="flex items-center gap-[5px] mb-[5px] font-bold">
               My Requests for{" "}
               {new Date().toLocaleString(undefined, { month: "long" })}{" "}
               <AiTwotoneCalendar />
            </h2>
            <div className="flex gap-[10px]">
               {Object.entries(moviesByDateMap)
                  .slice(
                     firstRequestDisplayed,
                     Object.keys(moviesByDateMap).length
                  )
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
