import Header from "./components/Header";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import VotingApp from "./components/VotingApp";

export default async function Home() {
   const user = await getCurrentUser();
   if (user && !user.isPledged) {
      redirect("/denied");
   }

   return (
      <main>
         <Header />
         <div className="flex flex-col justify-between p-[16px] pt-[114px] sm:pt-[16px]">
            <div className="max-w-[1200px] w-full mx-auto">
               {user ? (
                  <div className="mb-[20px]">
                     <h2 className="text-[20px]">
                        Hi {user.firstName ? user.firstName : user.name}! Begin
                        voting and requesting movies.
                     </h2>
                  </div>
               ) : (
                  <div className="mb-[20px]">
                     <p>
                        Connect with your Patreon account to request movies and
                        vote.
                     </p>
                     <p>You must be a current Patron of this channel.</p>
                  </div>
               )}
               <VotingApp user={user} />
            </div>
         </div>
      </main>
   );
}
