"use client";
import React, { useState } from "react";
import SubmitRequestButton from "./SubmitRequestButton";
import { useMovieContext } from "@/context/MovieContext";

const SubmitRequests = () => {
   const [open, setOpen] = useState(false);
   const onOpenModal = () => setOpen(true);
   const onCloseModal = () => setOpen(false);

   const { user, summary } = useMovieContext();
   const isCreator = user && user.isCreator;
   const { remaining, isLimitReached } = summary ?? { count: 0, requests: [] };

   return (
      <div className="flex flex-col mb-[15px]">
         {isLimitReached ? (
            <>
               <div>
                  You have reached your monthly request limit and cannot make
                  new requests until next month.
               </div>
               <div className="mb-[15px]">
                  You may continue to vote on movies currently in the list.
               </div>
            </>
         ) : (
            <div>
               Begin requesting movies and shows. You may vote on as many
               requests as you like.
            </div>
         )}

         {!isLimitReached && !isCreator && (
            <div className="text-[16px] sm:text-[18px] mb-[15px]">
               You have {remaining} <strong> new</strong>{" "}
               {remaining === 1 ? "request" : "requests"} remaining this month.
            </div>
         )}
         <div className="flex max-w-[430px] text-[16px]">
            <div className="flex-1">
               {isLimitReached ? (
                  <div className="max-w-[200px] w-full bg-[#262626] text-white text-center cursor-not-allowed py-1 px-3">
                     Limit Reached
                  </div>
               ) : (
                  <SubmitRequestButton
                     open={open}
                     onOpenModal={onOpenModal}
                     onCloseModal={onCloseModal}
                  />
               )}
            </div>
         </div>
      </div>
   );
};

export default SubmitRequests;
