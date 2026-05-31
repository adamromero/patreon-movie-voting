import connectDB from "@/lib/connectDB";
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
export async function getRequests(options: any) {
   await connectDB();

   const query: any = {};

   // needs to be extended to include actors, director, composer
   if (options.title) {
      query["data.Title"] = {
         $regex: options.title,
         $options: "i",
      };
   }

   if (options.director) {
      query["data.Director"] = {
         $regex: options.director,
         $options: "i",
      };
   }

   if (options.actor) {
      query["data.Actors"] = {
         $regex: options.actor,
         $options: "i",
      };
   }

   if (options.composer) {
      query["data.Composer"] = {
         $regex: options.composer,
         $options: "i",
      };
   }

   if (options.genre) {
      query["data.Genre"] = {
         $regex: options.genre,
         $options: "i",
      };
   }

   if (options.type) {
      query["data.Type"] = {
         $regex: options.type,
         $options: "i",
      };
   }

   // if (options.status) {
   //    query["data.Status"] = {
   //       $regex: options.status,
   //       $options: "i",
   //    };
   // }

   //let sort: any = { createdAt: 1 };
   let sort: any = {};

   if (options.sort === "votes") {
      //voteCount needs to be added to documents in db
      sort.voters = options.order === "asc" ? 1 : -1;
   }

   if (options.sort === "chronological") {
      sort.chronological = options.order === "newer" ? 1 : -1;
   }

   if (options.sort === "published") {
      sort.published = options.order === "newer" ? 1 : -1;
   }

   if (options.sort === "added") {
      sort.added = options.order === "newer" ? 1 : -1;
   }

   const total = await Movie.countDocuments();

   const requests = await Movie.find(query)
      //.sort({ createdAt: 1 })
      .sort(sort)
      .skip((options.page - 1) * options.limit)
      .limit(options.limit)
      .lean();

   return {
      requests,
      total,
      limit: options.limit,
      page: options.page,
      pages: Math.ceil(total / options.limit),
   };
}

// get list of requests made by current user
export async function getUserRequests(userId: string) {
   await connectDB();
   return await Movie.find({ requester: userId });
}

// get list of requests made by current user this month
export async function getMonthlyRequests(userId: string) {
   await connectDB();
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
export async function getMonthlySummary(user: User) {
   await connectDB();

   const { id, isProducer, isCreator } = user;

   const { start, end } = getCurrentMonthRange();

   const requests = await Movie.find({
      createdAt: {
         $gte: start,
         $lt: end,
      },
      requester: id,
   }).select("data.id data.Title data.Poster hasSeen");

   const posters = requests.map((item) => ({
      id: item?.data?.id || "",
      Title: item?.data?.Title || "",
      Poster: item?.data?.Poster || "",
      hasSeen: item?.hasSeen || false,
   }));

   const seenRequests = requests.filter((r) => r.hasSeen).length;
   const count = requests.length - seenRequests;
   const limit = isProducer ? 3 : 2;

   return {
      count,
      limit: isCreator ? null : limit,
      remaining: isCreator ? null : Math.max(0, limit - count),
      isLimitReached: isCreator ? false : count >= limit,
      requests: posters,
   };
}

// post a request to the list
export async function addRequest(user: User, payload: any) {
   await connectDB();
   const { isCreator } = user;

   if (!isCreator) {
      const { limit, count } = await getMonthlySummary(user);

      if (limit !== null && count >= limit) {
         throw new Error("Monthly limit reached");
      }
   }

   const request = await Movie.create(payload);
   return request;
}

// delete request based on id
export async function deleteRequest(id: string, user: User) {
   await connectDB();
   await Movie.findOneAndDelete({ _id: id });
   const summary = await getMonthlySummary(user);

   return summary;
}

export async function getRequestBySearchTitle(title: string) {
   await connectDB();
   return await Movie.find().find({ "data.Title": title });
}
