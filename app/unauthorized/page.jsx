import React from "react";
import { Inter, Lato } from "next/font/google";
import localFont from "next/font/local";
const breathing = localFont({
   src: [
      { path: "../../public/fonts/Breathing.ttf" },
      { path: "../../public/fonts/Breathing.woff" },
      { path: "../../public/fonts/Breathing.woff2" },
   ],
});

const lato = Lato({
   subsets: ["latin"],
   weight: ["400"],
});

const UnauthorizedPage = () => {
   return (
      <div
         className={`${lato.className} text-[20px] p-[20px] max-w-[1000px] mx-auto flex flex-col align-center`}
      >
         <div className="flex flex-col justify-center align-center bg-[black] py-[10px] h-[475px] overflow-hidden rounded-[20px]">
            <div className="film-strip"></div>
            <div className="flex flex-col justify-center align-center items-center gap-[20px] p-[40px] h-[425px] text-center">
               <h1 className="sr-only">Access is Denied</h1>
               <strong className={`${breathing.className} text-[25px]`}>
                  Oh Frig!
               </strong>
               <p>
                  To request and vote on movies and shows, you must be a current
                  patron of this channel.
               </p>
               <div className="flex flex-col mb-[30px] sm:flex-row gap-[15px]">
                  <p>
                     Please join{" "}
                     <a
                        className="underline text-[#ff52ff]"
                        href="https://www.patreon.com/jenmurray"
                        target="_blank"
                     >
                        here
                     </a>{" "}
                     to gain access.
                  </p>
               </div>
               <a href="/" className="border-b-2 border-white max-w-[120px]">
                  Return Home
               </a>
            </div>
            <div className="film-strip"></div>
         </div>
      </div>
   );
};

export default UnauthorizedPage;
