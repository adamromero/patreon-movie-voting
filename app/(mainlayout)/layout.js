import "../globals.css";
import { NextAuthProvider } from "../provider";
import { MovieProvider } from "@/context/MovieContext";
import Header from "../components/Header";

export default function MainLayout({ children }) {
   return (
      <NextAuthProvider>
         <MovieProvider>
            <Header />
            <main>{children}</main>
         </MovieProvider>
      </NextAuthProvider>
   );
}
