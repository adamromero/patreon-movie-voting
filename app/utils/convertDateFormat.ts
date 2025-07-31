interface ConvertDateFormat {
   (date: string): string;
}

export const convertReleaseDate: ConvertDateFormat = (date) => {
   const month = date?.split("-")[1];
   const day = date?.split("-")[2];
   const year = date?.split("-")[0];
   return `${month}-${day}-${year}`;
};

export const convertDateFormat: ConvertDateFormat = (date) => {
   const originalDate = new Date(date);

   const month: string = originalDate.toLocaleString(undefined, {
      month: "long",
   });
   const day: number = originalDate.getDate();
   const year: number = originalDate.getFullYear();
   //const time = originalDate.toLocaleTimeString();

   return `${month} ${day}, ${year}`;
};
