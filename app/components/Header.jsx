import React from "react";
import { BiLogoPatreon } from "react-icons/bi";
import { AiFillYoutube } from "react-icons/ai";
import UserSignIn from "./UserSignIn";
import { getCurrentUser } from "@/lib/session";
import localFont from "next/font/local";
const breathing = localFont({
   src: [
      { path: "../../public/fonts/Breathing.ttf" },
      { path: "../../public/fonts/Breathing.woff" },
      { path: "../../public/fonts/Breathing.woff2" },
   ],
});

export async function Header() {
   const user = await getCurrentUser();

   return (
      <header className="bg-black py-[6px] mt-[10px] w-full z-10">
         <div className="film-strip"></div>
         <div className="px-[16px]">
            <div className="max-w-[1200px] mx-auto py-[8px]">
               <div className="flex items-center justify-between sm:gap-[25px]">
                  <div className="flex items-center gap-[10px] sm:gap-[20px]">
                     <div className="flex gap-[5px]">
                        <a
                           href="https://www.patreon.com/jenmurray"
                           target="_blank"
                        >
                           <BiLogoPatreon className="text-white text-[28px] sm:text-[32px]" />
                        </a>
                        <a
                           href="https://www.youtube.com/@jenmurrayxo"
                           target="_blank"
                           className="relative"
                        >
                           <div className="absolute  top-[10px] left-[11px] w-[10px] h-[10px] bg-[white]"></div>
                           <AiFillYoutube className="relative text-[red] text-[28px] sm:text-[32px]" />
                        </a>
                     </div>
                     <div>
                        <h1
                           className={`${breathing.className} font-bold text-[18px] sm:text-[22px] flex text-white whitespace-nowrap mt-[5px]`}
                        >
                           Patron Movie Requests
                        </h1>
                     </div>
                  </div>
                  <div className="flex-1">
                     {/* <UserSignIn user={user} /> */}
                  </div>
               </div>
            </div>
         </div>

         <div className="film-strip"></div>
      </header>
   );
}

export default Header;
