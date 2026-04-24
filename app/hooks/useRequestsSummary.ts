import { useState, useCallback } from "react";
import { fetchMonthlySummary } from "@/lib/api/requests";

interface SummaryResponse {
   count: number;
   limit: number;
   remaining: number;
   isLimitReached: boolean;
}

export function useRequestsSummary(initialSummary: SummaryResponse) {
   const [summary, setSummary] = useState(initialSummary);
   const [loading, setLoading] = useState(false);

   const refresh = useCallback(async () => {
      setLoading(true);
      const data = await fetchMonthlySummary();
      setSummary(data);
      setLoading(false);
   }, []);

   return {
      summary,
      loading,
      refresh,
   };
}
