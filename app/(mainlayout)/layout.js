import "../globals.css";
import { NextAuthProvider } from "../provider";
import { MovieProvider } from "@/context/MovieContext";
import Header from "../components/Header";
import { Inter, Lato } from "next/font/google";

const lato = Lato({
   subsets: ["latin"],
   weight: ["400"],
});

const inter = Inter({ subsets: ["latin"] });

export default function MainLayout({ children }) {
   return (
      <NextAuthProvider>
         <MovieProvider>
            <div className={lato.className}>
               <Header />
               <main>{children}</main>
            </div>
         </MovieProvider>
      </NextAuthProvider>
   );
}
