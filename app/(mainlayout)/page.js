import { getCurrentUser } from "@/lib/session";
import VotingApp from "../components/VotingApp";
import BirthdayMessage from "../components/BirthdayMessage";
import RequestsThisMonth from "../components/RequestsThisMonth";
import { redirect } from "next/navigation";

export default async function Home() {
   //redirect("/maintenance");

   const user = await getCurrentUser();

   const userId = user && user.id;
   const isProducer = user && user.isProducer;

   const response = await fetch(`${process.env.API_URL}/api/moviesbydate`);
   const requestedMoviesThisMonth = await response.json();
   const currentUsersMonthlyRequests = requestedMoviesThisMonth.filter(
      (movie) =>
         movie.requester === userId && !movie.hasReacted && !movie.hasSeen
   );
   const requestLimit = isProducer ? 3 : 2;
   const isUnderRequestLimit =
      currentUsersMonthlyRequests.length < requestLimit;

   const seenRequests = requestedMoviesThisMonth.filter(
      (movie) => movie.requester === userId && movie.hasSeen
   );
   const channelRequests = requestedMoviesThisMonth.filter(
      (movie) => movie.requester === userId && movie.hasReacted
   );

   return (
      <div className="flex flex-col justify-between p-[16px]">
         <div className="max-w-[1200px] w-full mx-auto">
            <BirthdayMessage />
            <VotingApp
               user={user}
               isUnderRequestLimit={isUnderRequestLimit}
               seenRequests={seenRequests}
               channelRequests={channelRequests}
            />
         </div>
      </div>
   );
}
