"use client";
import React, { useState } from "react";
import Image from "next/image";
import { signIn, signOut } from "next-auth/react";

const UserSignIn = ({ user }) => {
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

   return (
      <div className="text-[14px] md:text-[16px]">
         <div className="flex items-center justify-end gap-[10px]">
            {user ? (
               <div className="relative">
                  <button
                     onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                     className="flex items-center gap-[10px] py-[8px] px-[12px] border-[1px] border-[#2a2a2a] rounded-[5px]"
                  >
                     <Image
                        src={user.image}
                        alt={user.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                     />

                     <span className="hidden sm:block">{user.name}</span>
                  </button>
                  {isDropdownOpen && (
                     <button
                        className="absolute top-[60px] right-0 bg-white hover:bg-[gray] text-black w-[100px] p-[5px]"
                        onClick={() => signOut()}
                     >
                        Sign Out
                     </button>
                  )}
               </div>
            ) : (
               <button
                  onClick={() => signIn("patreon")}
                  className="bg-[#ff424d] py-[8px] px-[10px] text-black rounded-sm"
               >
                  Connect <span className="hidden sm:inline">with Patreon</span>
               </button>
            )}
         </div>
      </div>
   );
};

export default UserSignIn;
