import { useMovieContext } from "@/context/MovieContext";
import { useEffect, useMemo, useState } from "react";
import { Movie } from "../types/movie";

export const useRequestsThisMonth = () => {
   const [monthlyRequests, setMonthlyRequests] = useState("");

   useEffect(() => {
      const fetchMonthlyRequests = async () => {
         const response = await fetch("/api/requests/user/monthly");
         const data = await response.json();
         setMonthlyRequests(data);
      };
      fetchMonthlyRequests();
   }, []);

   return monthlyRequests;
};
