import React from "react";
import { FaWrench } from "react-icons/fa6";
import { Inter, Lato } from "next/font/google";

const lato = Lato({
   subsets: ["latin"],
   weight: ["400"],
});

const MaintenancePage = () => {
   return (
      <div
         className={`${lato.className} flex flex-col justify-center items-center h-[100vh] text-[20px] p-[20px]`}
      >
         <FaWrench className="text-[32px] mb-[16px]" />
         <p>Temporarily down for maintenance.</p>
         <p>Thanks for your patience.</p>
      </div>
   );
};

export default MaintenancePage;
