"use client";
import React, { useState } from "react";
import Image from "next/image";
import { BiLogoPatreon } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { signIn, signOut } from "next-auth/react";

const UserSignIn = ({ user }) => {
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const handleOutsideClick = () => {
      setIsDropdownOpen(false);
   };
   const ref = useOutsideClick(handleOutsideClick);

   return (
      <div className="text-[14px] md:text-[16px]">
         <div className="flex items-center justify-end gap-[10px]">
            {user ? (
               <div className="relative">
                  <button
                     ref={ref}
                     onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                     className="flex items-center gap-[10px] p-0 sm:py-[8px] sm:px-[12px] sm:hover:bg-[#1a1a1a] sm:focus-visible:bg-[#1a1a1a] rounded-[5px]"
                  >
                     <Image
                        src={user.image}
                        alt={user.name}
                        width={40}
                        height={40}
                        className="rounded-full max-w-[40px]"
                     />

                     <span className="hidden sm:block">{user.name}</span>
                  </button>
                  {isDropdownOpen && (
                     <button
                        className="absolute top-[50px] sm:top-[60px] right-0 bg-white hover:bg-[#a9a9a9] transition-colors duration-300 ease-in-out text-black text-[16px] w-[135px] sm:w-[110px] px-[15px] py-[10px] sm:px-[10px] sm:py-[5px] flex justify-center items-center gap-[5px]"
                        onClick={() => signOut()}
                     >
                        <FiLogOut />
                        Sign Out
                     </button>
                  )}
               </div>
            ) : (
               <button
                  onClick={() => signIn("patreon")}
                  className="flex items-center gap-[3px] bg-white py-[8px] px-[10px] text-black rounded-sm"
               >
                  <BiLogoPatreon className="text-[#ff424d] text-[20px] md:text-[28px]" />
                  <span className="hidden md:inline">Connect with Patreon</span>
               </button>
            )}
         </div>
      </div>
   );
};

export default UserSignIn;
