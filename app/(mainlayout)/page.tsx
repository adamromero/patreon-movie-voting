import { getCurrentUser } from "@/lib/session";
import BirthdayMessage from "../components/BirthdayMessage";
import RequestsThisMonth from "../components/RequestsThisMonth";
import SubmitRequests from "../components/SubmitRequests";
import MovieList from "../components/MovieList";
import FilterMovieList from "../components/FilterMovieList";
import SearchMoviesList from "../components/SearchMoviesList";
import { getMonthlyRequests, getMonthlySummary } from "@/lib/db/requests";
import { Movie } from "../types/movie";
import { User } from "../types/user";
import { Summary } from "../types/summary";
import { redirect } from "next/navigation";

export default async function Home() {
   //redirect("/maintenance");

   const user = await getCurrentUser();

   if (user) {
   }

   const { id, isProducer, isCreator } = user as User;

   const seenRequests: Movie[] = [];

   const monthlyRequests = await getMonthlyRequests(id);
   const summary = await getMonthlySummary(id, isProducer);

   const { limit, isLimitReached } = summary as Summary;

   monthlyRequests.forEach((movie: Movie) => {
      if (movie.hasSeen) {
         seenRequests.push(movie);
      }
   });

   // const isCreator = false,
   //    isProducer = false,
   //    limit = 2,
   //    isLimitReached = false;

   const heading = !isCreator && (
      <h2 className="text-[20px] font-bold mb-[10px]">
         <span>
            {isProducer ? "Producer" : "Standard"} Tier ({limit} New Requests
            Per Month)
         </span>
      </h2>
   );

   const userNotConnected = (
      <div className="text-[16px] sm:text-[18px]">
         <p>
            Connect with your Patreon account in the top right corner to request
            movies and vote.
         </p>
         <p>You must be a current patron of this channel.</p>
      </div>
   );

   const userConnected = user && (
      <div>
         {heading}
         <h2>
            Hi {user.firstName ? user.firstName : user.name}!{" "}
            {isCreator && (
               <span className="relative inline-block top-[-2px]">👑</span>
            )}
         </h2>
         {isCreator ? (
            <div>
               Begin requesting movies and shows, edit the status of requests,
               and add video links.
            </div>
         ) : (
            <div>
               {!isLimitReached && seenRequests.length > 0 && (
                  <div>
                     Since {seenRequests.length} of your requests this month was
                     marked as &quot;Seen&quot;, you get an extra{" "}
                     {seenRequests.length}.
                  </div>
               )}
            </div>
         )}
      </div>
   );

   return (
      <div className="flex flex-col justify-between p-[16px]">
         <div className="max-w-[1200px] w-full mx-auto">
            <div className="text-[16px] sm:text-[18px]">
               <BirthdayMessage />
               <div className="flex flex-col justify-between lg:flex-row lg:gap-[15px]">
                  <div>
                     {user ? userConnected : userNotConnected}
                     {user && <SubmitRequests />}
                  </div>
                  {user && <RequestsThisMonth />}
               </div>
            </div>
            <div>
               <SearchMoviesList />
            </div>
            <FilterMovieList />
            <MovieList />
         </div>
      </div>
   );
}
