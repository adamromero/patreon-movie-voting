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
      <header className="bg-black p-[20px] mt-[10px]">
         <div className="max-w-[1200px] mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-around gap-[10px] sm:gap-[25px]">
               <div className="flex flex-1 justify-end gap-[5px]">
                  <a href="https://patreon.com/" target="_blank">
                     <BiLogoPatreon className="text-white text-[32px]" />
                  </a>
                  <a href="https://www.youtube.com/" target="_blank">
                     <AiFillYoutube className="text-[red] text-[32px]" />
                  </a>
               </div>
               <h1 className="text-[40px] flex text-white">
                  <span className={satisfy.className}>
                     Patreon Movie Voting
                  </span>
               </h1>
               <div className="flex-1">
                  <UserSignIn user={user} />
               </div>
            </div>
         </div>
      </header>
   );
}

export default Header;
