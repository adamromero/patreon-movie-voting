import React from "react";

const DeniedPage = () => {
   return (
      <div className="md:pt-[75px] p-[16px] max-w-[1000px] mx-auto gap-[20px] flex flex-col justify-center align-center">
         <div className=""></div>
         <p>To request and vote on movies, you must:</p>
         <ul className="flex flex-col list-disc list-inside sm:ml-[40px]">
            <li>
               Be a current patron of this channel. If you currently are not,
               please join here:
               <a
                  className="max-w-[75px] m-[20px] ml-[22px] text-center bg-black px-[10px] py-[8px] block"
                  href="/"
                  target="_blank"
               >
                  Join
               </a>
            </li>
            {/* <li>
               Have your pledges be public. Your pledges visibility settings can
               be updated here:{" "}
               <a
                  className="max-w-[150px] m-[20px] ml-[22px] text-center bg-black px-[10px] py-[8px] block"
                  href="/"
                  target="_blank"
               >
                  Update Settings
               </a>
            </li> */}
         </ul>
         <a
            className="sm:max-w-[200px] w-full mx-auto text-center bg-black px-[10px] py-[8px] block"
            href="/"
         >
            Return Home
         </a>
      </div>
   );
};

export default DeniedPage;
