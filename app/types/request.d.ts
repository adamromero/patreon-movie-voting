import { Movie } from "movie";
import { Summary } from "./summary";

export interface RequestVoteResponse {
   request: Movie;
   requestId: string;
   summary: Summary;
}

export interface RequestRemoveVoteResponse {
   deleted: boolean;
   request: Movie;
   requestId: string;
   tmdbId: number;
   mediaType: string;
   summary: Summary;
}

export interface RequestsData {
   requests: Movie[];
   total: number;
   page: number;
   pages: number;
   limit: number;
   rankings: any;
}
