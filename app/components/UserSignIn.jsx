"use client";
import React from "react";
import Image from "next/image";
import { signIn, signOut } from "next-auth/react";

const UserSignIn = ({ user }) => {
   return (
      <div className="text-[14px] md:text-[16px]">
         <div className="flex items-center justify-end gap-[10px]">
            {user ? (
               <>
                  <Image
                     src={user.image}
                     alt={user.name}
                     width={40}
                     height={40}
                     className="rounded-full"
                  />
                  <div className="flex flex-col gap-[2px]">
                     <span className="hidden sm:block">{user.name}</span>
                     <button
                        className="bg-[gray] px-[5px] py-[2px]"
                        onClick={() => signOut()}
                     >
                        Sign Out
                     </button>
                  </div>
               </>
            ) : (
               <button
                  onClick={() => signIn("patreon")}
                  className="bg-[#ff424d] py-[8px] px-[10px] text-black rounded-sm"
               >
                  Connect with Patreon
               </button>
            )}
         </div>
      </div>
   );
};

export default UserSignIn;
