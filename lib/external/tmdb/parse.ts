export function parseInput(input: string) {
   const imdbMatch = input.match(/^tt\d+$/);
   if (imdbMatch) return { imdbId: input };

   const yearMatch = input.match(/\b(19|20)\d{2}\b/);

   if (yearMatch) {
      return {
         query: input.replace(yearMatch[0], "").trim(),
         year: yearMatch[0],
      };
   }

   return { query: input };
}
