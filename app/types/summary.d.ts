export interface RequestItem {
   id: string;
   Title: string;
   Poster: string;
   hasSeen: boolean;
}

export interface Summary {
   count: number;
   limit: number | null;
   remaining: number | null;
   isLimitReached: boolean;
   requests: RequestItem[];
}
