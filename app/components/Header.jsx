import React from "react";
import { BiLogoPatreon } from "react-icons/bi";
import { AiFillYoutube } from "react-icons/ai";
import UserSignIn from "./UserSignIn";
import { getCurrentUser } from "@/lib/session";

export async function Header() {
   const user = await getCurrentUser();

   return (
      <header className="bg-black p-[20px] mt-[10px]">
         <div className="max-w-[1200px] mx-auto">
            <div className="flex items-center justify-around gap-[25px]">
               <div className="flex flex-1 justify-end gap-[5px]">
                  <a href="https://patreon.com/" target="_blank">
                     <BiLogoPatreon className="text-white text-[32px]" />
                  </a>
                  <a href="https://www.youtube.com/" target="_blank">
                     <AiFillYoutube className="text-[red] text-[32px]" />
                  </a>
               </div>
               <h1 className="text-[20px] uppercase flex text-white font-semibold">
                  Patreon Movie Voting
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
