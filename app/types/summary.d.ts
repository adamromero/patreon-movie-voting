export interface RequestItem {
   Title: string;
   Poster: string;
}

export interface Summary {
   count: number;
   limit: number;
   remaining: number;
   isLimitReached: boolean;
   requests: RequestItem[];
}
