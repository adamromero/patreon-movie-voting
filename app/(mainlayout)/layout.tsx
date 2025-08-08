import "../globals.css";
import { NextAuthProvider } from "../provider";
import Header from "../components/Header";
import { Inter, Lato } from "next/font/google";
import type { ReactNode } from "react";

const lato = Lato({
   subsets: ["latin"],
   weight: ["400"],
});

const inter = Inter({ subsets: ["latin"] });

interface MainLayoutProps {
   children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
   return (
      <NextAuthProvider>
         <div className={lato.className}>
            <Header />
            <main>{children}</main>
         </div>
      </NextAuthProvider>
   );
}
