"use client";
import React, { useState, useEffect, useContext } from "react";
import RequestMovies from "./RequestMovies";
import CopyableList from "./CopyableList";
import { MovieContext } from "@/context/MovieContext";
import WelcomeSectionIntro from "./WelcomeSectionIntro";

const WelcomeSection = ({
   user,
   isUnderRequestLimit,
   seenRequests,
   channelRequests,
}) => {
   const {
      moviesList,
      checkIfUserUnderRequestLimit,
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
      if (!isCreator) {
         checkIfUserUnderRequestLimit(id, isProducer);
      }
   }, [moviesList]);

   useEffect(() => {
      if (!isUserUnderRequestLimit && !open) {
         setDisableRequestButton(true);
      } else {
         setDisableRequestButton(false);
      }
   }, [open, isUserUnderRequestLimit]);

   return (
      <div>
         <WelcomeSectionIntro
            user={user}
            isUnderRequestLimit={isUserUnderRequestLimit}
            seenRequests={seenRequests}
            channelRequests={channelRequests}
         />
         <div className="flex flex-col">
            {user && isUnderRequestLimit && !isCreator && (
               <p className="text-[16px] sm:text-[18px]">
                  You have {requestsRemaining} <strong> new</strong>{" "}
                  {requestsRemaining === 1 ? "request" : "requests"} remaining
                  this month.
               </p>
            )}

            {user && (
               <div className="flex max-w-[430px]">
                  <div className="flex-1 mt-[15px]">
                     {moviesList.length ? (
                        !disableRequestButton ? (
                           <RequestMovies
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

                  {/* {isCreator && (
                     <div className="flex-1">
                        <CopyableList />
                     </div>
                  )} */}
               </div>
            )}
         </div>
      </div>
   );
};

export default WelcomeSection;
