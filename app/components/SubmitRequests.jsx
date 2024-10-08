"use client";
import React, { useState, useEffect, useContext } from "react";
import SubmitRequestButton from "./SubmitRequestButton";
import CopyableList from "./CopyableList";
import { MovieContext } from "@/context/MovieContext";

const SubmitRequests = ({ user, isUnderRequestLimit }) => {
   const {
      moviesList,
      processUserRequestsByDate,
      isUserUnderRequestLimit,
      requestsRemaining,
   } = useContext(MovieContext);

   const [open, setOpen] = useState(false);
   const onOpenModal = () => setOpen(true);
   const onCloseModal = () => setOpen(false);

   const [disableRequestButton, setDisableRequestButton] =
      useState(isUnderRequestLimit);

   let id, isProducer, isCreator;
   if (user) {
      ({ id, isProducer, isCreator } = user);
   }

   useEffect(() => {
      processUserRequestsByDate(id, isCreator, isProducer);
   }, [moviesList]);

   useEffect(() => {
      if (!isUserUnderRequestLimit && !open) {
         setDisableRequestButton(true);
      } else {
         setDisableRequestButton(false);
      }
   }, [open, isUserUnderRequestLimit]);

   return (
      <div
         className={`flex flex-col ${
            user
               ? isUnderRequestLimit && !isCreator
                  ? "mb-[15px]"
                  : "my-[15px]"
               : "my-[15px]"
         }`}
      >
         {user && isUnderRequestLimit && !isCreator && (
            <div className="text-[16px] sm:text-[18px] mb-[15px]">
               You have {requestsRemaining} <strong> new</strong>{" "}
               {requestsRemaining === 1 ? "request" : "requests"} remaining this
               month.
            </div>
         )}

         {user && (
            <div className="flex max-w-[430px] text-[16px]">
               <div className="flex-1">
                  {moviesList.length ? (
                     !disableRequestButton ? (
                        <SubmitRequestButton
                           user={user}
                           open={open}
                           onOpenModal={onOpenModal}
                           onCloseModal={onCloseModal}
                        />
                     ) : (
                        <div className="max-w-[200px] w-full bg-[#262626] text-white text-center cursor-not-allowed py-1 px-3">
                           Limit Reached
                        </div>
                     )
                  ) : (
                     <div className="max-w-[200px] w-full bg-[#262626] text-white text-center cursor-not-allowed py-1 px-3">
                        <div className="loader button-loader"></div>
                     </div>
                  )}
               </div>

               {isCreator && false && (
                  <div className="flex-1 mb-[15px]">
                     <CopyableList />
                  </div>
               )}
            </div>
         )}
      </div>
   );
};

export default SubmitRequests;
