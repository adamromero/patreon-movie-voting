import React from "react";
import { getCurrentUser } from "@/lib/session";

const TestPage = async () => {
   const user = await getCurrentUser();
   if (!user) redirect("/");

   return (
      <div className="pt-[50px] px-[20px] leading-[35px]">
         <div className="text-[25px] flex items-center justify-center">
            Hi {user.name}. You are a{" "}
            {user.isProducer ? "Producer" : "non-producer patron"} and should
            have {user.isProducer ? "3" : "2"} new requests per month.
         </div>
      </div>
   );
};

export default TestPage;
