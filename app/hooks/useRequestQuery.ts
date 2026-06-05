import { useSearchParams } from "next/navigation";

export function useRequestQuery() {
   const searchParams = useSearchParams();

   const page = Number(searchParams.get("page")) || 1;
   const limit = Number(searchParams.get("limit")) || 50;

   const title = searchParams.get("title") || "";
   const director = searchParams.get("director") || "";
   const actor = searchParams.get("actor") || "";
   const composer = searchParams.get("composer") || "";

   const sort = searchParams.get("sort") || "createdAt";

   const sortStatus = searchParams.get("sortStatus") || "";

   const genre = searchParams.get("genre") || "";

   const type = searchParams.get("type") || "";

   const status = searchParams.get("status") || "";

   const myrequests = searchParams.get("myrequests") || "";

   return {
      page,
      limit,
      title,
      director,
      actor,
      composer,
      sort,
      genre,
      type,
      status,
      myrequests,
      sortStatus,
   };
}
