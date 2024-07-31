import React from "react";

const WelcomeSectionIntro = ({
   user,
   isUnderRequestLimit,
   seenRequests,
   channelRequests,
}) => {
   let name, firstName, isCreator, isProducer;
   if (user) {
      ({ name, firstName, isCreator, isProducer } = user);
   }

   return (
      <div className="text-[16px] sm:text-[18px]">
         {user ? (
            <>
               <div>
                  <h2 className="text-[20px] font-bold mb-[10px]">
                     {isProducer && (
                        <span>Producer Tier (3 New Requests Per Month)</span>
                     )}
                     {!isCreator && !isProducer && (
                        <span>
                           Standard Patron Tier (2 New Requests Per Month)
                        </span>
                     )}
                  </h2>
                  <p>
                     Hi {firstName ? firstName : name}
                     {isCreator && (
                        <span className="relative inline-block top-[-2px]">
                           👑
                        </span>
                     )}
                     !
                  </p>
                  {isCreator ? (
                     <div>
                        You are the content creator! You can request movies and
                        shows, edit the status of requests, and add video links.
                     </div>
                  ) : (
                     <div>
                        {isUnderRequestLimit ? (
                           <>
                              <p>
                                 Begin requesting movies and shows. You may vote
                                 on as many requests as you like.
                              </p>
                              {seenRequests.length > 0 && (
                                 <p>
                                    Since {seenRequests.length} of your requests
                                    this month was marked as &quot;Seen&quot;,
                                    you get an extra {seenRequests.length}.
                                 </p>
                              )}
                              {channelRequests.length > 0 && (
                                 <p>
                                    Since {channelRequests.length} of your
                                    requests this month was marked as &quot;On
                                    Channel&quot;, you get an extra{" "}
                                    {channelRequests.length}.
                                 </p>
                              )}
                           </>
                        ) : (
                           <>
                              <p>
                                 You have reached your monthly request limit and
                                 cannot make new requests until next month.
                              </p>
                              <p>
                                 You may continue to vote on movies currently in
                                 the list.
                              </p>
                           </>
                        )}
                     </div>
                  )}
               </div>
            </>
         ) : (
            <div className="text-[16px] sm:text-[18px]">
               <p>
                  Connect with your Patreon account in the top right corner to
                  request movies and vote.
               </p>
               <p>You must be a current patron of this channel.</p>
            </div>
         )}
      </div>
   );
};

export default WelcomeSectionIntro;
