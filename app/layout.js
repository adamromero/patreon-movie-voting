import "./globals.css";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "./provider";
import { MovieProvider } from "@/context/MovieContext";
import { Lato } from "next/font/google";

const lato = Lato({
   subsets: ["latin"],
   weight: ["400"],
});

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
   title: "Let My Patrons Decide",
   description: "A movie voting app for the patreon channel",
   icons: {
      icon: "",
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
