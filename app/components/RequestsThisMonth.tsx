"use client";
import React, { useState, useEffect } from "react";
import { AiTwotoneCalendar } from "react-icons/ai";
import { useRequestStatus } from "../hooks/useRequestStatus";
import { useRequestsThisMonth } from "../hooks/useRequestsThisMonth";
import { useFetch } from "../hooks/useFetch";
import { Movie } from "../types/movie";

interface RequestThisMonthProps {
   user?: {
      id: string;
      name: string;
      firstName: string;
      isCreator: boolean;
      isProducer: boolean;
   };
   //isUnderRequestLimit: boolean;
}

interface UserRoleInfo {
   id: string;
   isProducer: boolean;
   isCreator: boolean;
}

const RequestsThisMonth: React.FC<RequestThisMonthProps> = ({ user }) => {
   const requestsThisMonth =
      useFetch<Movie[] | null>(
         `${process.env.NEXT_PUBLIC_API_URL}/api/requests/user/monthly`,
      ) ?? [];
   const requestCount = requestsThisMonth?.length || 0;

   const maxRequestsDisplayed = 3;
   const firstRequestDisplayed =
      requestCount >= maxRequestsDisplayed
         ? requestCount - maxRequestsDisplayed
         : 0;

   if (requestCount) {
      return (
         <div className="mb-[15px]">
            <h2 className="flex items-center gap-[5px] mb-[5px] font-bold">
               My Requests for{" "}
               {new Date().toLocaleString(undefined, { month: "long" })}{" "}
               <AiTwotoneCalendar />
            </h2>
            <div className="flex gap-[10px]">
               {requestsThisMonth
                  .slice(firstRequestDisplayed, requestCount)
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
