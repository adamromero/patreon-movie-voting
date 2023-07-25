"use client";
import React from "react";
import Image from "next/image";
import { signIn, signOut } from "next-auth/react";

const UserSignIn = ({ user }) => {
   return (
      <div className="text-[14px] md:text-[16px]">
         {user ? (
            <div className="flex items-center gap-[10px]">
               <Image
                  src={user.image}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="rounded-full"
               />
               <span className="hidden sm:block">{user.name}</span>
               <button onClick={() => signOut()}>Sign Out</button>
            </div>
         ) : (
            <button
               onClick={() => signIn("patreon")}
               className="bg-[#ff424d] py-[8px] px-[10px] text-black rounded-sm"
            >
               Connect with Patreon
            </button>
         )}
      </div>
   );
};

export default UserSignIn;
