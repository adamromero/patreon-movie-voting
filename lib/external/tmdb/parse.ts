export function parseInput(input: string) {
   const imdbMatch = input.match(/^tt\d+$/);
   if (imdbMatch) return { imdbId: input };

   const match = input.match(/^(.*?)(?:\s+y:(\d{4}))?$/i);

   if (!match) {
      return { query: input.trim() };
   }

   const query = match[1].trim();
   const year = match[2] || null;

   if (year) {
      return {
         query,
         year,
      };
   }

   return { query: input };
}
