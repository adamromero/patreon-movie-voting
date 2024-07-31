const months = [
   "January",
   "February",
   "March",
   "April",
   "May",
   "June",
   "July",
   "August",
   "September",
   "October",
   "November",
   "December",
];

export const convertDateFormat = (date, releaseDate) => {
   let originalDate, month, day, year;
   if (releaseDate) {
      month = date?.split("-")[1];
      day = date?.split("-")[2];
      year = date?.split("-")[0];
      originalDate = new Date(`${month}-${day}-${year}`);
   }

   originalDate = new Date(date);
   month = originalDate.getMonth();
   day = originalDate.getDate();
   year = originalDate.getFullYear();

   return `${months[month]} ${day}, ${year}`;
};

export const convertMonthFormat = (month) => {
   return `${months[month]}`;
};
