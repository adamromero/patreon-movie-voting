import { getCurrentUser } from "@/lib/session";
import VotingApp from "../components/VotingApp";
import BirthdayMessage from "../components/BirthdayMessage";
import RequestsThisMonth from "../components/RequestsThisMonth";
import SubmitRequests from "../components/SubmitRequests";
import { Movie } from "../types/user";
import { redirect } from "next/navigation";

export default async function Home() {
   //redirect("/maintenance");

   const user = await getCurrentUser();
   const userId = user && user.id;
   const isProducer = user && user.isProducer;
   const isCreator = user && user.isCreator;

   let isUnderRequestLimit = true;
   const seenRequests = [];
   const channelRequests = [];
   const currentUsersMonthlyRequests = [];

   if (!isCreator) {
      const response = await fetch(`${process.env.API_URL}/api/moviesbydate`);
      const requestedMoviesThisMonth = await response.json();

      requestedMoviesThisMonth.forEach((movie: Movie) => {
         if (movie.requester === userId) {
            if (!movie.hasReacted && !movie.hasSeen) {
               currentUsersMonthlyRequests.push(movie);
            }
            if (movie.hasSeen) {
               seenRequests.push(movie);
            }
            if (movie.hasReacted) {
               channelRequests.push(movie);
            }
         }
      });

      const requestLimit = isProducer ? 3 : 2;
      isUnderRequestLimit = currentUsersMonthlyRequests.length < requestLimit;
   }

   return (
      <div className="flex flex-col justify-between p-[16px]">
         <div className="max-w-[1200px] w-full mx-auto">
            <div className="text-[16px] sm:text-[18px]">
               <BirthdayMessage />
               <div className="flex flex-col justify-between lg:flex-row lg:gap-[15px]">
                  <div>
                     {user ? (
                        <div>
                           <h2 className="text-[20px] font-bold mb-[10px]">
                              {!isCreator && isProducer && (
                                 <span>
                                    Producer Tier (3 New Requests Per Month)
                                 </span>
                              )}
                              {!isCreator && !isProducer && (
                                 <span>
                                    Standard Patron Tier (2 New Requests Per
                                    Month)
                                 </span>
                              )}
                           </h2>
                           <h2>
                              Hi {user.firstName ? user.firstName : user.name}!{" "}
                              {user && isCreator && (
                                 <span className="relative inline-block top-[-2px]">
                                    👑
                                 </span>
                              )}
                           </h2>
                           {user && isCreator ? (
                              <div>
                                 Begin requesting movies and shows, edit the
                                 status of requests, and add video links.
                              </div>
                           ) : (
                              <div>
                                 {isUnderRequestLimit ? (
                                    <>
                                       <div>
                                          Begin requesting movies and shows. You
                                          may vote on as many requests as you
                                          like.
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
                                             Since {channelRequests.length} of
                                             your requests this month was marked
                                             as &quot;On Channel&quot;, you get
                                             an extra {channelRequests.length}.
                                          </div>
                                       )}
                                    </>
                                 ) : (
                                    <>
                                       <div>
                                          You have reached your monthly request
                                          limit and cannot make new requests
                                          until next month.
                                       </div>
                                       <div>
                                          You may continue to vote on movies
                                          currently in the list.
                                       </div>
                                    </>
                                 )}
                              </div>
                           )}
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
                     <SubmitRequests
                        user={user}
                        isUnderRequestLimit={isUnderRequestLimit}
                     />
                  </div>
                  {user && <RequestsThisMonth />}
               </div>
            </div>
            <VotingApp user={user} />
         </div>
      </div>
   );
}
