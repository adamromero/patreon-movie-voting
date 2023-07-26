import "./globals.css";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "./provider";
import { MovieProvider } from "@/context/MovieContext";
import { Lato } from "next/font/google";

const lato = Lato({
   subsets: ["latin"],
   weight: "400",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
   title: "Let My Patrons Decide",
   description: "A movie voting app for the patreon channel",
   icons: {
      icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%2210 0 100 100%22><text y=%22.90em%22 font-size=%2290%22>🎥</text></svg>",
   },
};

export default function RootLayout({ children }) {
   return (
      <html lang="en">
         <body className={lato.className}>
            <NextAuthProvider>
               <MovieProvider>{children}</MovieProvider>
            </NextAuthProvider>
         </body>
      </html>
   );
}
