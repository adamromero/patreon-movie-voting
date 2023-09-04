import Header from "./components/Header";
import { getCurrentUser } from "@/lib/session";
import VotingApp from "./components/VotingApp";
import { redirect } from "next/navigation";

export default async function Home() {
   const user = await getCurrentUser();

   if (user && !user.isCreator) {
      redirect("/maintenance");
   }

   return (
      <main>
         <Header />
         <div className="flex flex-col justify-between p-[16px]">
            <div className="max-w-[1200px] w-full mx-auto">
               {user ? (
                  <div className="mb-[15px]">
                     <h2 className="text-[16px] sm:text-[18px]">
                        Hi {user.firstName ? user.firstName : user.name}! Begin
                        voting and requesting movies.
                     </h2>
                  </div>
               ) : (
                  <div className="text-[16px] sm:text-[18px]">
                     <p>
                        Connect with your Patreon account in the top right
                        corner to request movies and vote.
                     </p>
                     <p>You must be a current patron of this channel.</p>
                  </div>
               )}
               <VotingApp user={user} />
            </div>
         </div>
      </main>
   );
}
