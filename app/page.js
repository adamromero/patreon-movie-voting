import Header from "./components/Header";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import RequestMovies from "./components/RequestMovies";

export default async function Home() {
   const user = await getCurrentUser();
   if (user && !user.isPledged) {
      redirect("/denied");
   }

   return (
      <main>
         <Header />
         {user ? (
            <div>
               <div>
                  Welcome {user.name}! Begin requesting movies and make
                  requests.
               </div>
               <div>
                  {user.creatorId === user.id
                     ? "You are the creator 🙂"
                     : "You are a patron"}
               </div>
               <RequestMovies currentUser={user.id} />
            </div>
         ) : (
            <div>A stranger! Sign in buddy! 🙂</div>
         )}
      </main>
   );
}
