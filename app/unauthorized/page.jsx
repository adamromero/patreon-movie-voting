import React from "react";
import { Inter, Lato } from "next/font/google";

const lato = Lato({
   subsets: ["latin"],
   weight: ["400"],
});

const UnauthorizedPage = () => {
   return (
      <div
         className={`${lato.className} md:pt-[75px] text-[20px] p-[20px] max-w-[1000px] mx-auto gap-[20px] flex flex-col justify-center align-center`}
      >
         <p>
            To request and vote on movies, you must be a patron of this channel.
         </p>
         <div className="flex flex-col mb-[30px] sm:flex-row items-center gap-[15px]">
            <p>
               If you currently are not, please join{" "}
               <a
                  className="underline"
                  href="https://www.patreon.com/jenmurray"
                  target="_blank"
               >
                  here
               </a>
            </p>
         </div>
         <a
            className="sm:max-w-[200px] w-full text-center bg-black focus-visible:bg-[#262626] hover:bg-[#262626] transition-colors duration-300 ease-in-out px-[10px] py-[8px] text-[16px] block"
            href="/"
         >
            Return Home
         </a>
      </div>
   );
};

export default UnauthorizedPage;
