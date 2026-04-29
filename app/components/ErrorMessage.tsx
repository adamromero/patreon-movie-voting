import React from "react";

const ErrorMessage = ({ message }: { message: string }) => {
   if (message) {
      return (
         <div className="text-[#ff4364] font-bold text-[18px] bg-[#350707] py-[5px] px-[10px] rounded-[3px] border-[1px] border-[#ff4364] text-center">
            {message}
         </div>
      );
   }

   return null;
};

export default ErrorMessage;
