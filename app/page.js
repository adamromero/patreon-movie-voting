import Header from "./components/Header";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import RequestMovies from "./components/RequestMovies";
import MovieList from "./components/MovieList";
import FilterMovieList from "./components/FilterMovieList";

export default async function Home() {
   const user = await getCurrentUser();
   if (user && !user.isPledged) {
      redirect("/denied");
   }

   return (
      <main>
         <Header />
         <div className="flex flex-col justify-between p-[16px] pt-[97px] sm:pt-[16px]">
            <div className="max-w-[1200px] w-full mx-auto">
               {user ? (
                  <>
                     <div className="mb-[20px]">
                        <h2 className="text-[20px] font-bold">
                           Hi {user.firstName ? user.firstName : user.name}! 🙂
                        </h2>
                        <p>Begin voting and requesting movies.</p>
                     </div>
                     <RequestMovies currentUser={user.id} />
                  </>
               ) : (
                  <div className="mb-[20px]">
                     <p>
                        Connect with your Patreon account to request movies and
                        vote.
                     </p>
                     <p>You must be a current Patron of this channel.</p>
                  </div>
               )}
               <FilterMovieList />
               <MovieList
                  currentUser={user && user.id}
                  isCreator={user && user.creatorId === user.id}
               />
            </div>
         </div>
      </main>
   );
}
