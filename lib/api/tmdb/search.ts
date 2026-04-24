export async function searchTitles(query: string) {
   const res = await fetch(`/api/tmdb/search?query=${query}`);
   return res.json();
}
