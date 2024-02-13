import React from "react";

const InfoPage = () => {
   return (
      <div className="flex flex-col justify-between p-[16px] pt-[32px]">
         <div className="max-w-[1200px] w-full mx-auto md:text-[18px]">
            <p className="text-[18px] md:text-[20px]">
               The purpose of this app is to compile a list of requests and give
               Jen an idea on where most of the interest is. It functions the
               same as the weekly Patreon polls, except the film and series
               options are all contributed by patrons. As with the weekly polls,
               please vote for every film or series you want to see a reaction
               to. If you&#39;ve already requested something currently in the
               list, you have the option of retracting it, just like in the
               polls.
            </p>
            <br />
            <p className="text-[18px] md:text-[20px]">
               There is a monthly limit on adding{" "}
               <strong className="underline">new</strong> requests to the list,
               there is no limit on adding a request (upvoting) on a movie or
               series already in the list. New requests are limited at 3 per
               month for producers, the limit is 2 for all other tiers. You will
               get an extra 1 for every new request that was marked as &quot;On
               Channel&quot; or &quot;Seen&quot; during the same month it was
               added.
            </p>
            <br />
            <p className="text-[18px] md:text-[20px]">
               Thank you for taking the time to submit requests!
            </p>
            <br />

            <h1 className="text-[24px] font-bold">How to Use</h1>
            <p>
               Below are directions (using screenshots) on how to link your
               account and begin requesting. Please contact Jen on Patreon if
               you are having issues.
            </p>
            <br />
            <h2 className="font-bold">Link your Patreon Account</h2>
            <div>
               Step 1: Click here to connect your Patreon account.
               <img src="/connectpatreon.png" alt="" />
               Step 2: Allow access
               <p>
                  You should be brought to a prompt that will ask your
                  permission to grant access to your Patreon user information
                  (username, image, email, pledges). Your pledge status is used
                  to verify membership.
               </p>
               <br />
               <img src="/allow.png" alt="" />
               <br />
               <p>
                  After clicking &quot;Allow&quot;, you should be redirected
                  back to the request list with your username in the top right
                  corner.
               </p>
            </div>
            <br />

            <h2 className="font-bold">Vote on requests</h2>
            <p>
               To vote on a currently requested title, click request. The
               retract button will appear after you&#39;ve cast a vote if you
               change your mind.
            </p>
            <p>
               <strong>Important note: </strong> If you add a new request and
               another patron upvotes it and you decide to retract your vote, it
               will still count as part of your monthly limit.
            </p>
            <p>
               If a vote is retracted while the count is at 1, the entry will be
               removed from the list entirely. In that case, you will get a new
               request if you originally added it.
            </p>

            <div className="flex">
               <img src="/requestvote.png" alt="" />
               <img src="/retract.png" alt="" />
            </div>

            <br />

            <h2 className="font-bold">Search the current list</h2>
            <p>
               You have the option to search the list by title, director, top 10
               actors, and music composers.
            </p>
            <p>
               You can filter by genre, type (movie or series), or status. The
               &quot;Seen&quot; status refers to what Jen has seen off the
               channel.
            </p>
            <p>
               You can also sort by title, rating, request count (set by
               default), chronological (based on release date), or added (based
               on the added to the list date).
            </p>
            <br />

            <h2 className="font-bold">Make a new request.</h2>
            <p>Click this button at the top to open the request popup.</p>
            <img src="/requestbutton.png" alt="" />
            <br />
            <p>You can search by title, title and year, or by IMDB ID</p>
            <p>
               The request popup will show you if your search is currently on
               the channel, seen, or is currently requested. You may upvote from
               here as well.
            </p>
            <p>
               Keep in mind you have a limit of 3 for producer tier, limit of 2
               for all other tiers.
            </p>
            <br />
            <img src="/requestmodal.png" alt="" />

            <br />
            <h2 className="font-bold">Information popup</h2>
            <p>
               To see additional information about titles in the list, click the
               poster image.
            </p>
            <img src="/poster.png" alt="" />
            <img src="/infopopup.png" alt="" />
         </div>
      </div>
   );
};

export default InfoPage;
