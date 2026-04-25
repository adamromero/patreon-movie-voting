import Movie from "@/models/movieModel";
import { User } from "@/app/types/user";

function getCurrentMonthRange() {
   const start = new Date();
   start.setDate(1);
   start.setHours(0, 0, 0, 0);

   const end = new Date(start);
   end.setMonth(end.getMonth() + 1);

   return { start, end };
}

// get full list of requests
export async function getRequests() {
   return await Movie.find().sort({ createdAt: 1 });
}

// get list of requests made by current user
export async function getUserRequests(userId: string) {
   return await Movie.find({ requester: userId });
}

// get list of requests made by current user this month
export async function getMonthlyRequests(userId: string) {
   const { start, end } = getCurrentMonthRange();

   const requestsThisMonth = await Movie.find({
      createdAt: {
         $gte: start,
         $lt: end,
      },
      requester: userId,
   });

   return requestsThisMonth;
}

// get a total summary of requests made by current user this month
export async function getMonthlySummary(userId: string, isProducer: boolean) {
   const { start, end } = getCurrentMonthRange();

   const count = await Movie.count({
      createdAt: {
         $gte: start,
         $lt: end,
      },
      requester: userId,
   });

   const limit = isProducer ? 3 : 2;

   return {
      count,
      limit,
      remaining: Math.max(0, limit - count),
      isLimitReached: count >= limit,
   };
}

// post a request to the list
export async function addRequest(user: User, payload: any) {
   const { id, isProducer, isCreator } = user;

   if (!isCreator) {
      const MONTHLY_LIMIT = isProducer ? 3 : 2;

      const { start, end } = getCurrentMonthRange();

      const count = await Movie.count({
         createdAt: {
            $gte: start,
            $lt: end,
         },
         requester: id,
      });

      if (count >= MONTHLY_LIMIT) {
         throw new Error("Monthly limit reached");
      }
   }

   // maybe prevent potential duplicate by checking imdb id
   const request = await Movie.create(payload);
   return request;
}

// update request based on id
export async function updateRequest(id: string) {}

// delete request based on id
export async function deleteRequest(id: string) {
   return await Movie.findOneAndDelete({ _id: id });
}
