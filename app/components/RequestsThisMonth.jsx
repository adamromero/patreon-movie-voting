"use client";
import React, { useState, useEffect, useContext } from "react";
import { convertMonthFormat } from "../utils/convertDateFormat";
import { AiTwotoneCalendar } from "react-icons/ai";

const RequestsThisMonth = ({ userId }) => {
   const [requests, setRequests] = useState([]);
   const maxRequestsDisplayed = 3;

   useEffect(() => {
      const retrieveMoviesThisMonth = async () => {
         const response = await fetch("/api/moviesbydate");
         const requestedMoviesThisMonth = await response.json();

         const currentUsersMonthlyRequests = requestedMoviesThisMonth.filter(
            (movie) =>
               movie.requester === userId && !movie.hasReacted && !movie.hasSeen
         );
         setRequests(currentUsersMonthlyRequests);
      };

      retrieveMoviesThisMonth();
   }, [requests]);

   if (requests.length) {
      return (
         <div>
            <h2 className="flex items-center gap-[5px] mb-[5px] font-bold">
               My Requests for {convertMonthFormat(new Date().getMonth())}{" "}
               <AiTwotoneCalendar />
            </h2>
            <div className="flex gap-[10px]">
               {requests
                  .slice(
                     requests.length >= maxRequestsDisplayed
                        ? requests.length - maxRequestsDisplayed
                        : 0,
                     requests.length
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
};

export default RequestsThisMonth;
