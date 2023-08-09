import React from "react";

const UnauthorizedPage = () => {
   return (
      <div className="md:pt-[75px] text-[20px] p-[20px] max-w-[1000px] mx-auto gap-[20px] flex flex-col justify-center align-center">
         <p>
            To request and vote on movies, you must be a patron of this channel.
         </p>
         <div className="flex flex-col mb-[30px] sm:flex-row items-center gap-[15px]">
            <p>If you currently are not, please join here:</p>
            <a
               className="max-w-[85px] w-full text-center bg-black px-[10px] py-[5px] text-[16px] block"
               href="/"
               target="_blank"
            >
               Join
            </a>
         </div>
         <a
            className="sm:max-w-[200px] w-full text-center bg-black px-[10px] py-[8px] text-[16px] block"
            href="/"
         >
            Return Home
         </a>
      </div>
   );
};

export default UnauthorizedPage;
