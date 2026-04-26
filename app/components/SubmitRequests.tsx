"use client";
import React, { useState } from "react";
import SubmitRequestButton from "./SubmitRequestButton";
import { useMovieContext } from "@/context/MovieContext";

interface SubmitRequestsProps {
   user?: {
      id: string;
      name: string;
      firstName: string;
      isCreator: boolean;
      isProducer: boolean;
   };
}

interface UserRoleInfo {
   id: string;
   isProducer: boolean;
   isCreator: boolean;
}

const SubmitRequests: React.FC<SubmitRequestsProps> = ({ user }) => {
   const [open, setOpen] = useState(false);
   const onOpenModal = () => setOpen(true);
   const onCloseModal = () => setOpen(false);

   const { summary } = useMovieContext();
   const { count, limit, remaining, isLimitReached } = summary;
   const isCreator = user?.isCreator ?? "";

   return (
      <div
         className={`flex flex-col ${
            user
               ? isLimitReached && !isCreator
                  ? "mb-[15px]"
                  : "my-[15px]"
               : "my-[15px]"
         }`}
      >
         {user && !isLimitReached && !isCreator && (
            <div className="text-[16px] sm:text-[18px] mb-[15px]">
               You have {remaining} <strong> new</strong>{" "}
               {remaining === 1 ? "request" : "requests"} remaining this month.
            </div>
         )}

         {user && (
            <div className="flex max-w-[430px] text-[16px]">
               <div className="flex-1">
                  {isLimitReached ? (
                     <div className="max-w-[200px] w-full bg-[#262626] text-white text-center cursor-not-allowed py-1 px-3">
                        Limit Reached
                     </div>
                  ) : (
                     <SubmitRequestButton
                        user={user}
                        open={open}
                        onOpenModal={onOpenModal}
                        onCloseModal={onCloseModal}
                     />
                  )}
               </div>
            </div>
         )}
      </div>
   );
};

export default SubmitRequests;
