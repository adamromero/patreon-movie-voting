import { getCurrentUser } from "@/lib/session";
import VotingApp from "../components/VotingApp";
import BirthdayMessage from "../components/BirthdayMessage";
import RequestsThisMonth from "../components/RequestsThisMonth";
import SubmitRequests from "../components/SubmitRequests";
import { getMonthlyRequests, getMonthlySummary } from "@/lib/db/requests";
import { Movie } from "../types/movie";
import { redirect } from "next/navigation";

interface SummaryProps {
   count: number;
   limit: number;
   remaining: number;
   isLimitReached: boolean;
}

export default async function Home() {
   //redirect("/maintenance");

   const user = await getCurrentUser();
   const userId = (user && user.id) || "";
   const isProducer = (user && user.isProducer) || false;
   const isCreator = (user && user.isCreator) || false;

   const seenRequests: Movie[] = [];
   const channelRequests: Movie[] = [];

   const requestsThisMonth = await getMonthlyRequests(userId);
   const summary = !isCreator
      ? await getMonthlySummary(userId, isProducer)
      : null;

   const { count, limit, remaining, isLimitReached } = summary as SummaryProps;

   requestsThisMonth.forEach((movie: Movie) => {
      if (movie.hasSeen) {
         seenRequests.push(movie);
      }
      if (movie.hasReacted) {
         channelRequests.push(movie);
      }
   });

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
                              <span>
                                 {isProducer ? "Producer" : "Standard"} Tier (
                                 {limit} New Requests Per Month)
                              </span>
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
                                 {isLimitReached ? (
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
                                 ) : (
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
                     <SubmitRequests user={user} initialSummary={summary} />
                  </div>
                  {user && <RequestsThisMonth user={user} />}
               </div>
            </div>
            <VotingApp user={user} />
         </div>
      </div>
   );
}
