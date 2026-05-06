import connectDB from "@/lib/connectDB";
import Movie from "@/models/movieModel";

const extractTitle = (input: string) => {
   const match = input.match(/^(.*?)(?: \((\d{4})\)| \d+\s*x\s*\d+-\d+)/);
   return match ? match[1].trim() : "";
};

const extractYear = (input: string) => {
   const match = input.match(/^(.*?) \((\d{4})\)/);
   return match ? match[2].trim() : "";
};

export async function setOnChannel({
   patreonResponse,
}: {
   patreonResponse: any;
}) {
   await connectDB();
   const { title, url, published_at } = patreonResponse.data.attributes;

   if (!title || !url || !published_at) {
      throw new Error("Patreon response missing attributes, no action taken.");
   }

   const postTitleMatch = [
      "full length",
      "full length reaction",
      "full reaction",
      "watch along",
      "watch-along",
   ];
   const lowerTitle = title.toLowerCase();

   if (postTitleMatch.some((p) => lowerTitle.includes(p))) {
      const extractedTitle = extractTitle(title);
      const year = extractYear(title);

      if (extractedTitle) {
         const filter = year
            ? {
                 "data.Title": { $regex: extractedTitle, $options: "i" },
                 "data.Year": {
                    $in: [year, String(parseInt(year, 10) + 1)],
                 },
                 "data.Type": "movie",
                 publishedAt: null,
              }
            : {
                 "data.Title": { $regex: extractedTitle, $options: "i" },
                 "data.Type": "tv",
                 publishedAt: null,
              };

         const update = {
            $set: {
               hasReacted: true,
               isRewatch: false,
               isRewatchFriend: false,
               hasSeen: false,
               "links.patreon": `https://www.patreon.com${url}`,
               publishedAt: published_at,
            },
         };

         const result = await Movie.updateOne(filter, update);

         if (result.modifiedCount > 0) {
            console.log("Document updated successfully");
         }

         return result;
      }
   }
}
