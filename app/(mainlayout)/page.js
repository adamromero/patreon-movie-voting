import { getCurrentUser } from "@/lib/session";
import VotingApp from "../components/VotingApp";
import { redirect } from "next/navigation";

export default async function Home() {
   const user = await getCurrentUser();

   const userId = user && user.id;
   const isProducer = user && user.isProducer;
   const isCreator = user && user.isCreator;

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
            <div className="text-[16px] sm:text-[18px]">
               {user ? (
                  <>
                     <h2>Hi {user.firstName ? user.firstName : user.name}! </h2>
                     {user && user.isCreator ? (
                        <div>Begin voting and requesting movies.</div>
                     ) : (
                        <div>
                           {isUnderRequestLimit ? (
                              <>
                                 <div>
                                    Begin voting and requesting movies. You may
                                    vote on as many requests as you like.
                                 </div>
                                 {seenRequests.length > 0 && (
                                    <div>
                                       Since {seenRequests.length} of your
                                       requests this month was marked as
                                       &quot;Seen&quot;, you get an extra{" "}
                                       {seenRequests.length}.
                                    </div>
                                 )}
                                 {channelRequests.length > 0 && (
                                    <div>
                                       Since {channelRequests.length} of your
                                       requests this month was marked as
                                       &quot;On Channel&quot;, you get an extra{" "}
                                       {channelRequests.length}.
                                    </div>
                                 )}
                              </>
                           ) : (
                              <>
                                 <div>
                                    You have reached your monthly request limit
                                    and cannot make new requests until next
                                    month.
                                 </div>
                                 <div>
                                    You may continue to vote on movies currently
                                    in the list.
                                 </div>
                              </>
                           )}
                        </div>
                     )}
                  </>
               ) : (
                  <div className="text-[16px] sm:text-[18px]">
                     <p>
                        Connect with your Patreon account in the top right
                        corner to request movies and vote.
                     </p>
                     <p>You must be a current patron of this channel.</p>
                  </div>
               )}
            </div>
            <VotingApp user={user} isUnderRequestLimit={isUnderRequestLimit} />
         </div>
      </div>
   );
}
