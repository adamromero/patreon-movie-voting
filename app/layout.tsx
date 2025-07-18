import "./globals.css";
import { Inter, Lato } from "next/font/google";
import { Metadata } from "next";
import type { ReactNode } from "react";

const lato = Lato({
   subsets: ["latin"],
   weight: ["400"],
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
   title: "Patron Movie Requests",
   description:
      "A requesting web app exclusive to Patreon members on the Jen Murray movie/tv reaction channel.",
   other: {
      "google-site-verification": "ik7hvs9SJ6lg9swECf_QuiptsofDCk5K1a_ucnHEw-Y",
   },
};

interface RootLayoutProps {
   children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
   return (
      <html lang="en">
         <body className={lato.className}>{children}</body>
      </html>
   );
}
