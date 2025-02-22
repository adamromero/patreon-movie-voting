import connectDB from "@/lib/connectDB";
import Movie from "@/models/movieModel";
import { NextResponse } from "next/server";

connectDB();

const extractTitle = (input) => {
   const match = input.match(/^(.*?)(?: \((\d{4})\)| S\d{2}E\d{2})/);
   return match ? match[1].trim() : "";
};

const extractYear = (input) => {
   const match = input.match(/^(.*?) \((\d{4})\)/);
   return match ? match[2].trim() : "";
};

export async function POST(req) {
   try {
      const request = await req.json();
      const { title, url, published_at } = request.data.attributes;

      if (!title || !url || !published_at) {
         return NextResponse.json(
            { message: "Invalid input, no action performed" },
            { status: 200 }
         );
      }

      if (title.toLowerCase().includes("full length reaction")) {
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
                  hasSeen: false,
                  "links.patreon": `https://www.patreon.com${url}`,
                  publishedAt: published_at,
               },
            };

            console.log(filter, update);

            const result = await Movie.updateOne(filter, update);
            if (result.modifiedCount > 0) {
               console.log("Document updated successfully");
               console.log(result);
               return NextResponse.json({
                  message: "Document updated successfully",
               });
            }
         }
      }

      return NextResponse.json(
         { message: "No action performed" },
         { status: 200 }
      );
   } catch (error) {
      console.error(error);
      return NextResponse.json(
         { error: "Internal server error" },
         { status: 500 }
      );
   }
}
