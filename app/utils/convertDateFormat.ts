export const convertReleaseDate = (date) => {
   const month = date?.split("-")[1];
   const day = date?.split("-")[2];
   const year = date?.split("-")[0];
   return `${month}-${day}-${year}`;
};

export const convertDateFormat = (date) => {
   const originalDate = new Date(date);

   const month = originalDate.toLocaleString(undefined, { month: "long" });
   const day = originalDate.getDate();
   const year = originalDate.getFullYear();
   //const time = originalDate.toLocaleTimeString();

   return `${month} ${day}, ${year}`;
};
