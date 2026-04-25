export interface MovieData {
   id: number;
   Type?: string;
   Title?: string;
   Year?: string;
   Rated?: string;
   Genre?: string;
   Director?: string;
   Actors?: string;
   Poster?: string;
   Backdrop?: string;
   imdbID?: string;
   Rating?: number;
   Release?: string;
   Runtime?: number;
   Composer?: string;
   Studio?: string;
}

export interface APIMovieData extends MovieData {
   //id?: number;
   posterPath?: string;
   title?: string;
   name?: string;
   releaseDate?: string;
   mediaType?: "movie" | "tv";
}

export interface Movie {
   _id: string;
   data: MovieData;
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
   isRewatchFriend: boolean;
   publishedAt: string | null;
   requester: string;
   voters: string[];
}
