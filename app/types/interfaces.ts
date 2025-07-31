export interface User {
   id: string;
   name: string;
   firstName: string;
   isCreator: boolean;
   isProducer: boolean;
}

export interface APIMovieData {
   id: number;
   Type: string;
   Title: string;
   Year: string;
   Rated: string;
   Genre: string;
   Director: string;
   Actors: string;
   Poster: string;
   Backdrop: string;
   imdbID: string;
   Rating: number;
   Release: string;
   Runtime: number;
   Composer: string;
   Studio: string;
}

export interface Movie {
   _id: string;
   data: APIMovieData;
   links: {
      patreon: string;
      youtube: string;
   };
   createdAt: string;
   hasReacted: boolean;
   hasSeen: boolean;
   isChristmas: boolean;
   isHalloween: boolean;
   isRewatch: boolean;
   publishedAt: string | null;
   requester: string;
   voters: [string];
}
