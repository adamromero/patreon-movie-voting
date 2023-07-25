import "./globals.css";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
   title: "Patreon Movie Voting",
   description: "A movie voting app for the patreon channel",
};

export default function RootLayout({ children }) {
   return (
      <html lang="en">
         <body>
            <NextAuthProvider>{children}</NextAuthProvider>
         </body>
      </html>
   );
}
