import { Movie } from "../../app/types/movie";

export const updateMovieVotes = async (_id: string, voters: string[]) => {
   const res = await fetch(`/api/movies/${_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(voters),
   });
   return res.json();
};

export const fetchMoviesFromApi = async (): Promise<Movie[]> => {
   const res = await fetch("/api/movies");
   return res.json();
};

export const createMovieRequest = async (movie: Movie): Promise<Movie> => {
   const res = await fetch("/api/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movie),
   });
   return res.json();
};

export const deleteMovieRequest = async (id: string): Promise<void> => {
   const res = await fetch(`/api/movies/${id}`, { method: "DELETE" });
   return res.json();
};
