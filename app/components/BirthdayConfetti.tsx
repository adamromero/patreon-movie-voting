"use client";

import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

const BirthdayConfetti = () => {
   const [windowDimensions, setWindowDimensions] = useState({
      width: window.innerWidth,
      height: window.innerHeight,
   });

   useEffect(() => {
      const handleResize = () => {
         setWindowDimensions({
            width: window.innerWidth,
            height: window.innerHeight,
         });
      };

      window.addEventListener("resize", handleResize);

      return () => {
         window.removeEventListener("resize", handleResize);
      };
   }, []);

   return (
      <Confetti
         width={windowDimensions.width - 20}
         height={windowDimensions.height * 3}
         numberOfPieces={2000}
         recycle={false}
         tweenDuration={50000}
      />
   );
};

export default BirthdayConfetti;
