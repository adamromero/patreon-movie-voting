export const genre = {
   Name: "Genre",
   Default: "",
   Action: "action",
   Adventure: "adventure",
   Animation: "animation",
   Comedy: "comedy",
   Crime: "crime",
   Documentary: "documentary",
   Drama: "drama",
   Family: "family",
   Fantasy: "fantasy",
   History: "history",
   Horror: "horror",
   Mystery: "mystery",
   Music: "music",
   Romance: "romance",
   SciFi: "sci-fi",
   Thriller: "thriller",
   Western: "western",
   War: "war",
   Halloween: "halloween",
   Christmas: "christmas",
};

export const status = {
   Name: "Status",
   Default: "",
   Seen: "seen",
   OnChannel: "channel",
   Unseen: "unseen",
   Rewatch: "rewatch",
   RewatchFriend: "rewatchfriend",
   Votable: "votable",
};

export const type = {
   Name: "Type",
   Default: "",
   Movie: "movie",
   Series: "tv",
};

export const requests = {
   Name: "Requests",
   Default: "",
   MyRequests: "myrequests",
   Voted: "voted",
   NotVoted: "notvoted",
};

export const chronological = {
   Name: "Chronological",
   Default: "",
   Older: "co",
   Newer: "cn",
};

export const added = {
   Name: "Added",
   Default: "",
   Older: "ao",
   Newer: "an",
};

export const alphabetical = {
   Name: "Title",
   Default: "",
   Ascending: "ta",
   Descending: "td",
};

export const rating = {
   Name: "Rating",
   Default: "",
   Ascending: "ra",
   Descending: "rd",
};

export const votes = {
   Name: "Votes",
   Default: "",
   Ascending: "Ascending",
   Descending: "Descending",
};

export const statusSort = {
   Name: "Status",
   Default: "",
   Watched: "Watched",
   Unwatched: "Unwatched",
};

export const published = {
   Name: "Published",
   Default: "",
   Older: "po",
   Newer: "pn",
};

export const requestFilters = {
   genre: {
      label: "Genre",
      options: [
         { value: "", label: "All" },
         { value: "action", label: "Action" },
         { value: "adventure", label: "Adventure" },
         { value: "animation", label: "Animation" },
         { value: "christmas", label: "Christmas" },
         { value: "comedy", label: "Comedy" },
         { value: "crime", label: "Crime" },
         { value: "documentary", label: "Documentary" },
         { value: "drama", label: "Drama" },
         { value: "family", label: "Family" },
         { value: "fantasy", label: "Fantasy" },
         { value: "halloween", label: "Halloween" },
         { value: "history", label: "History" },
         { value: "horror", label: "Horror" },
         { value: "mystery", label: "Mystery" },
         { value: "music", label: "Music" },
         { value: "romance", label: "Romance" },
         { value: "sci-fi", label: "Sci-Fi" },
         { value: "thriller", label: "Thriller" },
         { value: "western", label: "Western" },
         { value: "war", label: "War" },
      ],
   },

   type: {
      label: "Type",
      options: [
         { value: "", label: "All" },
         { value: "movie", label: "Movie" },
         { value: "tv", label: "Series" },
      ],
   },

   status: {
      label: "Status",
      options: [
         { value: "", label: "All" },
         { value: "channel", label: "On Channel" },
         { value: "seen", label: "Seen" },
         { value: "rewatch", label: "Rewatch" },
         { value: "unseen", label: "Unseen" },
         { value: "votable", label: "Votable" },
      ],
   },

   request: {
      label: "Requests",
      options: [
         { value: "", label: "All" },
         { value: "myrequests", label: "My Requests" },
         { value: "voted", label: "Voted" },
         { value: "notvoted", label: "Not Voted" },
      ],
   },
};

export const requestSorts = {
   title: {
      label: "Title",
      options: [
         { value: "", label: "Default" },
         { value: "ta", label: "Ascending" },
         { value: "td", label: "Descending" },
      ],
   },

   rating: {
      label: "Rating",
      options: [
         { value: "", label: "Default" },
         { value: "ra", label: "Ascending" },
         { value: "rd", label: "Descending" },
      ],
   },

   votes: {
      label: "Votes",
      options: [
         { value: "", label: "Default" },
         { value: "va", label: "Ascending" },
         { value: "vd", label: "Descending" },
      ],
   },

   status: {
      label: "Status",
      options: [
         { value: "", label: "Default" },
         { value: "su", label: "Unseen/Rewatch" },
         { value: "ss", label: "Seen/On Channel" },
      ],
   },

   chronological: {
      label: "Chronological",
      options: [
         { value: "", label: "Default" },
         { value: "co", label: "Older" },
         { value: "cn", label: "Newer" },
      ],
   },

   published: {
      label: "Published",
      options: [
         { value: "", label: "Default" },
         { value: "po", label: "Older" },
         { value: "pn", label: "Newer" },
      ],
   },

   added: {
      label: "Added",
      options: [
         { value: "", label: "Default" },
         { value: "ao", label: "Older" },
         { value: "an", label: "Newer" },
      ],
   },
};
