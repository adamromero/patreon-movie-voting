import React from "react";
import { BiLogoPatreon } from "react-icons/bi";
import { AiFillYoutube } from "react-icons/ai";
import UserSignIn from "./UserSignIn";
import { getCurrentUser } from "@/lib/session";
import { Satisfy } from "next/font/google";

const satisfy = Satisfy({
   subsets: ["latin"],
   weight: "400",
});

export async function Header() {
   const user = await getCurrentUser();

   return (
      <header className="bg-black p-[20px] sm:mt-[10px] w-full fixed sm:static z-10">
         <div className="max-w-[1200px] mx-auto">
            <div className="flex items-center justify-around sm:gap-[25px]">
               <div className="flex-1 hidden sm:block"></div>
               <div className="flex items-center gap-[20px]">
                  <div className="flex gap-[5px]">
                     <a href="https://www.patreon.com/" target="_blank">
                        <BiLogoPatreon className="text-white text-[20px] sm:text-[32px]" />
                     </a>
                     <a href="https://www.youtube.com/" target="_blank">
                        <AiFillYoutube className="text-[red] text-[20px] sm:text-[32px]" />
                     </a>
                  </div>
                  <div>
                     <h1 className="text-[22px] sm:text-[35px] flex text-white">
                        <span className={satisfy.className}>
                           Let My Patrons Decide
                        </span>
                     </h1>
                  </div>
               </div>
               <div className="flex-1">
                  <UserSignIn user={user} />
               </div>
            </div>
         </div>
      </header>
   );
}

export default Header;
