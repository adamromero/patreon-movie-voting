import { useState, useCallback } from "react";
import { fetchMonthlySummary } from "@/lib/api/requests";
import { Summary } from "../types/summary";

export function useRequestsSummary(initialSummary: Summary) {
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
