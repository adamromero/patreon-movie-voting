import React, { useContext } from "react";
import { MovieContext } from "@/context/MovieContext";

const HolidaySettings = ({ data, requestStatusState }) => {
   const { setRequestHolidayStatus } = useContext(MovieContext);

   const handleHolidaySetting = (e, data) => {
      const selectedValue = e.target.value;
      setRequestHolidayStatus(data?._id, selectedValue);
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
