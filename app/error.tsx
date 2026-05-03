"use client";

import { useEffect } from "react";
import { Lato } from "next/font/google";
import localFont from "next/font/local";

const breathing = localFont({
   src: [
      { path: "../public/fonts/Breathing.ttf" },
      { path: "../public/fonts/Breathing.woff" },
      { path: "../public/fonts/Breathing.woff2" },
   ],
});

const lato = Lato({
   subsets: ["latin"],
   weight: ["400"],
});

type ErrorPageProps = {
   error: Error & { digest?: string };
};

export default function GlobalError({ error }: ErrorPageProps) {
   useEffect(() => {
      console.error(error);
   }, [error]);

   return (
      <html>
         <body className={`${lato.className} text-center`}>
            <main className="mx-[20px] mt-[100px]">
               <div className="flex flex-col gap-[10px] mb-[20px]">
                  <h1 className={`${breathing.className} text-[32px]`}>
                     Oh Frig!
                  </h1>
                  <h2 className="text-[24px]">Something went wrong</h2>
                  <p className="text-[18px]">
                     <strong>Error:</strong> &quot;
                     {error.message || "An unexpected error occurred."}&quot;
                  </p>
                  <p>
                     You can try again or report this error to Jen through
                     Patreon or Discord.
                  </p>
               </div>

               <button
                  onClick={() => window.location.reload()}
                  className="bg-[black] px-[20px] py-[10px] cursor-pointer"
               >
                  Try again
               </button>
            </main>
         </body>
      </html>
   );
}
