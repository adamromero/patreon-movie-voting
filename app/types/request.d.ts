import { Movie } from "movie";

export interface RequestsData {
   requests: Movie[];
   total: number;
   page: number;
   pages: number;
   limit: number;
}
