import "./globals.css";
import { Inter, Lato } from "next/font/google";

const lato = Lato({
   subsets: ["latin"],
   weight: ["400"],
});

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
   title: "Patron Movie Requests",
   description:
      "A requesting web app exclusive to Patreon members on the Jen Murray movie/tv reaction channel.",
   other: {
      "google-site-verification": "ik7hvs9SJ6lg9swECf_QuiptsofDCk5K1a_ucnHEw-Y",
   },
};

export default function RootLayout({ children }) {
   return (
      <html lang="en">
         <body className={lato.className}>{children}</body>
      </html>
   );
}
