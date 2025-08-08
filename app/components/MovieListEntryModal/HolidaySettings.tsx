import React from "react";
import { useBoundStore } from "@/stores/useBoundStore";
import { Movie } from "@/app/types/movie";

interface HolidaySettingsProps {
   data: Movie;
   requestStatusState: Record<
      string,
      {
         isHalloween?: boolean;
         isChristmas?: boolean;
      }
   >;
}

const HolidaySettings: React.FC<HolidaySettingsProps> = ({
   data,
   requestStatusState,
}) => {
   const { setHolidayStatus } = useBoundStore();

   const handleHolidaySetting = (
      e: React.ChangeEvent<HTMLInputElement>,
      data: Movie
   ) => {
      const selectedValue = e.target.value;
      setHolidayStatus(data?._id, selectedValue as "halloween" | "christmas");
   };

   return (
      <div className="flex gap-[5px] mt-[10px]">
         <div className="flex flex-row gap-[5px] items-center">
            <div className="checkbox-container checkbox-container--holiday">
               <label
                  htmlFor="checkbox-halloween"
                  className="flex text-[12px] cursor-pointer"
               >
                  <input
                     type="checkbox"
                     value="halloween"
                     id="checkbox-halloween"
                     checked={!!requestStatusState[data?._id]?.isHalloween}
                     onChange={(e) => {
                        handleHolidaySetting(e, data);
                     }}
                  />
                  <div className="checkmark checkmark--halloween"></div>
                  Halloween
               </label>
            </div>
            <div className="checkbox-container checkbox-container--holiday">
               <label
                  htmlFor="checkbox-christmas"
                  className="flex text-[12px] cursor-pointer"
               >
                  <input
                     type="checkbox"
                     value="christmas"
                     id="checkbox-christmas"
                     checked={!!requestStatusState[data?._id]?.isChristmas}
                     onChange={(e) => {
                        handleHolidaySetting(e, data);
                     }}
                  />
                  <div className="checkmark checkmark--christmas"></div>
                  Christmas
               </label>
            </div>
         </div>
      </div>
   );
};

export default HolidaySettings;
