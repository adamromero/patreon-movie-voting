import connectDB from "@/lib/connectDB";
import Movie from "@/models/movieModel";
import { User } from "@/app/types/user";
import { escapeRegex } from "@/app/utils/helpers";
import { RequestData } from "next/dist/server/web/types";

function getCurrentMonthRange() {
   const start = new Date();
   start.setDate(1);
   start.setHours(0, 0, 0, 0);

   const end = new Date(start);
   end.setMonth(end.getMonth() + 1);

   return { start, end };
}

// get full list of requests
export async function getRequests(options: any, userId: string | null) {
   await connectDB();

   const query: any = {};

   if (options.title) {
      query["data.Title"] = {
         $regex: escapeRegex(options.title),
         $options: "i",
      };
   }

   if (options.director) {
      query["data.Director"] = {
         $regex: escapeRegex(options.director),
         $options: "i",
      };
   }

   if (options.actor) {
      query["data.Actors"] = {
         $regex: escapeRegex(options.actor),
         $options: "i",
      };
   }

   if (options.composer) {
      query["data.Composer"] = {
         $regex: escapeRegex(options.composer),
         $options: "i",
      };
   }

   if (options.genre) {
      if (options.genre !== "halloween" && options.genre !== "christmas") {
         query["data.Genre"] = {
            $regex: options.genre,
            $options: "i",
         };
      }

      if (options.genre === "halloween") {
         query["isHalloween"] = true;
      }

      if (options.genre === "christmas") {
         query["isChristmas"] = true;
      }
   }

   if (options.type) {
      query["data.Type"] = {
         $regex: options.type,
         $options: "i",
      };
   }

   if (options.status) {
      switch (options.status) {
         case "channel":
            query["hasReacted"] = true;
            break;
         case "seen":
            query["hasSeen"] = true;
            break;
         case "rewatch":
            query.$or = [{ isRewatch: true }, { isRewatchFriend: true }];
            break;
         case "unseen":
            query["hasReacted"] = false;
            query["hasSeen"] = false;
            query["isRewatch"] = false;
            query["isRewatchFriend"] = false;
            break;
         case "votable":
            query["hasReacted"] = false;
            query["hasSeen"] = false;
            break;
      }
   }

   if (options.myrequests) {
      switch (options.myrequests) {
         case "myrequests":
            query["requester"] = userId;
            break;
         case "voted":
            query["voters"] = {
               $in: [userId],
            };
            break;
         case "notvoted":
            query["voters"] = {
               $nin: [userId],
            };
            break;
      }
   }

   let sort: any = {};

   // if (options.sortstatus === "su") {
   //    sort.hasReacted = 1;
   //    sort.hasSeen = 1;
   // }

   // if (options.sortstatus === "ss") {
   //    sort.hasReacted = -1;
   //    sort.hasSeen = -1;
   // }

   sort.hasReacted = 1;
   sort.hasSeen = 1;

   if (options.sort === "ta") {
      sort["data.Title"] = -1;
   }

   if (options.sort === "td") {
      sort["data.Title"] = 1;
   }

   if (options.sort === "ra") {
      sort["data.Rating"] = 1;
   }

   if (options.sort === "rd") {
      sort["data.Rating"] = -1;
   }

   if (options.sort === "va") {
      sort.votes = 1;
   }

   if (options.sort === "vd") {
      sort.votes = -1;
   }

   if (options.sort === "co") {
      sort["data.Release"] = 1;
   }

   if (options.sort === "cn") {
      sort["data.Release"] = -1;
   }

   if (options.sort === "po") {
      sort.publishedAt = 1;
   }

   if (options.sort === "pn") {
      sort.publishedAt = -1;
   }

   if (options.sort === "ao") {
      sort.createdAt = 1;
   }

   if (options.sort === "an") {
      sort.createdAt = -1;
   }

   if (options.sort === "createdAt") {
      sort.createdAt = 1;
   }

   const total = await Movie.countDocuments(query);
   const limit = options.limit;
   const pages = Math.ceil(total / limit);
   const page = Math.min(options.page, Math.max(1, pages));

   const requests = await Movie.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

   const activeVotingRequests = requests.filter(
      (request) => !request.hasSeen && !request.hasReacted,
   );

   const rankings = await getRequestRankings(activeVotingRequests);

   return {
      requests,
      total,
      limit,
      page,
      pages,
      rankings,
   };
}

async function getRequestRankings(requests: any) {
   if (!requests.length) {
      return {};
   }

   const ids = requests.map((request: any) => request.data.imdbID);

   const ranked = await Movie.aggregate([
      {
         $match: {
            hasSeen: false,
            hasReacted: false,
         },
      },
      {
         $setWindowFields: {
            sortBy: {
               votes: -1,
            },
            output: {
               rank: {
                  $denseRank: {},
               },
            },
         },
      },
      {
         $match: {
            "data.imdbID": {
               $in: ids,
            },
         },
      },
      {
         $project: {
            _id: 0,
            imdbID: "$data.imdbID",
            rank: 1,
         },
      },
   ]);

   return ranked.reduce((acc, item) => {
      acc[item.imdbID] = item.rank;
      return acc;
   }, {});
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

export async function findRequestsByTmdbIds(
   items: {
      id: number;
      mediaType: string;
   }[],
) {
   return Movie.find({
      $or: items.map((item) => ({
         "data.id": item.id,
         "data.Type": item.mediaType,
      })),
   }).lean();
}
