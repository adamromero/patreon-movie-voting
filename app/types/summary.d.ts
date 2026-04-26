export interface RequestItem {
   Title: string;
   Poster: string;
}

export interface Summary {
   count: number;
   limit: number;
   requests: RequestItem[];
   remaining: number;
   isLimitReached: boolean;
}
