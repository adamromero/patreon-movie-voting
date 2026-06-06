import { findRequestsByTmdbIds } from "@/lib/db/requests";

export async function lookupRequestsByTmdbIds(
   items: {
      id: number;
      mediaType: string;
   }[],
) {
   return findRequestsByTmdbIds(items);
}
