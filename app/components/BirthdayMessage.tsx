"use client";

import React from "react";
import localFont from "next/font/local";
import BirthdayConfetti from "./BirthdayConfetti";

const breathing = localFont({
   src: [
      { path: "../../public/fonts/Breathing.ttf" },
      { path: "../../public/fonts/Breathing.woff" },
      { path: "../../public/fonts/Breathing.woff2" },
   ],
});

const BirthdayMessage = () => {
   const currentDate = new Date();
   const isBirthday =
      currentDate.getMonth() === 3 && currentDate.getDate() === 7;

   if (isBirthday) {
      return (
         <>
            <BirthdayConfetti />
            <div
               className={`text-[24px] py-[10px] text-center ${breathing.className}`}
               style={{ textShadow: "3px 3px 3px #000" }}
            >
               Happy Birthday Jen! 🥳🎂🥂
            </div>
         </>
      );
   }

   return null;
};

export default BirthdayMessage;
