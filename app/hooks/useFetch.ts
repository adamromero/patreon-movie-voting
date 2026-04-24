import { useEffect, useState } from "react";

export const useFetch = <T>(url: string) => {
   const [data, setData] = useState<T | null>(null);

   useEffect(() => {
      const fetchData = async () => {
         const response = await fetch(url);
         const data = await response.json();
         setData(data);
      };
      fetchData();
   }, []);

   return data;
};
