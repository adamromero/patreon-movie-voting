import React from "react";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import RequestTracker from "../../components/RequestTracker";
import { AiTwotoneCalendar } from "react-icons/ai";
import { BiSolidFilm } from "react-icons/bi";
import { BiSolidUpvote } from "react-icons/bi";
import { PiTelevisionBold } from "react-icons/pi";
import { FaEye } from "react-icons/fa";

const DashboardPage = async () => {
   const user = await getCurrentUser();
   if (!user) redirect("/");

   const userId = user && user.id;

   const response = await fetch(`${process.env.API_URL}/api/moviesbydate`);
   const requestedMoviesThisMonth = await response.json();
   const monthlyRequests = requestedMoviesThisMonth.filter(
      (movie) => movie.requester === userId
   );

   const reactionsThisMonth = requestedMoviesThisMonth
      .filter((movie) => movie.hasReacted)
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

   const responseAll = await fetch(`${process.env.API_URL}/api/movies`);
   const requestedMovies = await responseAll.json();

   const requests = requestedMovies.filter(
      (movie) => movie.requester === userId
   );

   const requestsReacted = requestedMovies
      .filter((movie) => movie.requester === userId && movie.hasReacted)
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

   const requestsSeen = requestedMovies
      .filter((movie) => movie.requester === userId && movie.hasSeen)
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

   const votes = requestedMovies.filter((movie) =>
      movie.voters.find((voterId) => voterId === userId)
   );

   return (
      <div className="flex flex-col justify-between p-[16px]">
         <div className="max-w-[1200px] w-full mx-auto">
            <a href="/">Return to requests</a>
            <h1 className="text-[28px] font-bold">Dashboard</h1>

            <h2 className="text-[24px]">
               {user && user.name}{" "}
               <span className="text-[16px]">
                  ({user && user.isCreator && "Creator 👑"}) (
                  {user && user.isProducer && "Producer 💜"})
               </span>
            </h2>
            {user && !user.isCreator && (
               <div>
                  There is a limit of {user && user.isProducer ? "3" : "2"} new
                  requests per month on this tier
               </div>
            )}
            <div>
               {/* <h2 className="text-[24px] mt-[20px] mb-[12px] flex items-center gap-[5px]">
                  Reactions this Month <AiTwotoneCalendar />
               </h2>
               <RequestTracker requests={reactionsThisMonth} /> */}

               <h2 className="text-[24px] mt-[20px] mb-[12px] flex items-center gap-[5px]">
                  Requests this Month <AiTwotoneCalendar />
               </h2>
               <RequestTracker requests={monthlyRequests} />

               <h2 className="text-[24px] mt-[20px] mb-[12px] flex items-center gap-[5px]">
                  Requests On Channel <PiTelevisionBold />
               </h2>
               <RequestTracker requests={requestsReacted} />

               <h2 className="text-[24px] mt-[20px] mb-[12px] flex items-center gap-[5px]">
                  Requests Seen <FaEye />
               </h2>
               <RequestTracker requests={requestsSeen} />

               {/* <h2 className="text-[24px] mt-[20px] mb-[12px] flex items-center gap-[5px]">
                  All Requests <BiSolidFilm />
               </h2>
               <RequestTracker requests={requests} /> */}

               {/* <h2 className="text-[24px] mt-[20px] mb-[12px] flex items-center gap-[5px]">
                  All Upvoted Requests <BiSolidUpvote />
               </h2>
               <RequestTracker requests={votes} /> */}
            </div>
         </div>
      </div>
   );
};

export default DashboardPage;
