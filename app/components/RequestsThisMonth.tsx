"use client";
import { AiTwotoneCalendar } from "react-icons/ai";
import { useMovieContext } from "@/context/MovieContext";

const RequestsThisMonth = () => {
   const { summary } = useMovieContext();

   const { count, requests } = summary;

   const maxRequestsDisplayed = 3;
   const firstRequestDisplayed =
      count >= maxRequestsDisplayed ? maxRequestsDisplayed - count : 0;

   if (count) {
      return (
         <div className="mb-[15px]">
            <h2 className="flex items-center gap-[5px] mb-[5px] font-bold">
               My Requests for{" "}
               {new Date().toLocaleString(undefined, { month: "long" })}{" "}
               <AiTwotoneCalendar />
            </h2>
            <div className="flex gap-[10px]">
               {requests.slice(firstRequestDisplayed, count).map((request) => (
                  <div key={request.Poster}>
                     <img
                        src={`https://image.tmdb.org/t/p/w200/${request.Poster}`}
                        alt={request.Title}
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
