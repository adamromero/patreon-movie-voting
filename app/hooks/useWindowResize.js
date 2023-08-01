import { useEffect } from "react";

export const useWindowResize = () => {
   useEffect(() => {
      window.addEventListener("resize", handleWindowResize);

      return () => {
         window.removeEventListener("resize", handleWindowResize);
      };
   }, [handleWindowResize]);
};
