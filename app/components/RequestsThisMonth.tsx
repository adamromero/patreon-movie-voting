"use client";
import React from "react";
import { AiTwotoneCalendar } from "react-icons/ai";
import { useRequestStatus } from "../hooks/useRequestStatus";

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
   const id: UserRoleInfo["id"] = user?.id ?? "";
   const isProducer: UserRoleInfo["isProducer"] = user?.isProducer ?? false;
   const isCreator: UserRoleInfo["isCreator"] = user?.isCreator ?? false;

   const { moviesThisMonth } = useRequestStatus(id, isCreator, isProducer);

   const maxRequestsDisplayed = 3;
   const firstRequestDisplayed =
      moviesThisMonth.length >= maxRequestsDisplayed
         ? moviesThisMonth.length - maxRequestsDisplayed
         : 0;

   if (moviesThisMonth.length) {
      return (
         <div className="mb-[15px]">
            <h2 className="flex items-center gap-[5px] mb-[5px] font-bold">
               My Requests for{" "}
               {new Date().toLocaleString(undefined, { month: "long" })}{" "}
               <AiTwotoneCalendar />
            </h2>
            <div className="flex gap-[10px]">
               {moviesThisMonth
                  .slice(firstRequestDisplayed, moviesThisMonth.length)
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
