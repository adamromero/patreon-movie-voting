export interface RequestItem {
   id: string;
   Title: string;
   Poster: string;
   hasSeen: boolean;
}

export interface Summary {
   count: number;
   limit: number;
   remaining: number;
   isLimitReached: boolean;
   requests: RequestItem[];
}
