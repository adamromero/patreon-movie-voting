export interface MovieData {
   id: number;
   media_type?: "movie" | "tv";
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
   poster_path?: string;
   title?: string;
   name?: string;
   release_date?: string;
   first_air_date?: string;
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
   publishedAt: string | null;
   requester: string;
   voters: string[];
}
