"use client";
import React, { useState, useEffect, useContext } from "react";
import { convertMonthFormat } from "../utils/convertDateFormat";
import { AiTwotoneCalendar } from "react-icons/ai";
import { MovieContext } from "@/context/MovieContext";

const RequestsThisMonth = ({ userId }) => {
   const maxRequestsDisplayed = 3;
   const { moviesList, requestsThisMonth, retrieveMoviesThisMonth } =
      useContext(MovieContext);

   useEffect(() => {
      retrieveMoviesThisMonth(userId);
   }, [moviesList]);

   if (requestsThisMonth && requestsThisMonth.length) {
      return (
         <div className="mb-[15px]">
            <h2 className="flex items-center gap-[5px] mb-[5px] font-bold">
               My Requests for {convertMonthFormat(new Date().getMonth())}{" "}
               <AiTwotoneCalendar />
            </h2>
            <div className="flex gap-[10px]">
               {requestsThisMonth
                  .slice(
                     requestsThisMonth.length >= maxRequestsDisplayed
                        ? requestsThisMonth.length - maxRequestsDisplayed
                        : 0,
                     requestsThisMonth.length
                  )
                  .map((movie) => (
                     <div key={movie._id}>
                        <img
                           src={`https://image.tmdb.org/t/p/w200/${movie.data.Poster}`}
                           alt={movie.data.Title}
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
