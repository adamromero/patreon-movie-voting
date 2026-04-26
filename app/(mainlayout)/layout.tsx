import "../globals.css";
import { NextAuthProvider } from "../provider";
import Header from "../components/Header";
import { Inter, Lato } from "next/font/google";
import type { ReactNode } from "react";
import { getCurrentUser } from "@/lib/session";
import { getMonthlySummary } from "@/lib/db/requests";

import { MovieProvider } from "@/context/MovieContext";

const lato = Lato({
   subsets: ["latin"],
   weight: ["400"],
});

const inter = Inter({ subsets: ["latin"] });

interface MainLayoutProps {
   children: ReactNode;
}

export default async function MainLayout({ children }: MainLayoutProps) {
   const user = await getCurrentUser();
   const summary = await getMonthlySummary(user.id, user.isProducer);

   return (
      <NextAuthProvider>
         <MovieProvider initialSummary={summary}>
            <div className={lato.className}>
               <Header />
               <main>{children}</main>
            </div>
         </MovieProvider>
      </NextAuthProvider>
   );
}
