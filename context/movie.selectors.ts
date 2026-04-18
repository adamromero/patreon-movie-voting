import { useMemo } from "react";
import { Movie } from "@/app/types/movie";
import {
   genre,
   type,
   status,
   chronological,
   added,
   alphabetical,
   votes,
   requests,
   rating,
   statusSort,
   published,
} from "@/app/utils/filtersOptions";
import { getCurrentUser } from "@/lib/session";

export interface MovieFilterOptions {
   type: string;
   genre: string;
   requests: string;
   status: string;
}

export interface MovieSortOptions {
   alphabetical: string;
   votes: string;
   rating: string;
   chronological: string;
   added: string;
   published: string;
}

export type MovieSelectors = {
   moviesMap: Map<string, Movie>;
   rankedMovies: Record<string, number>;
   //moviesByDateMap: Map<string, Movie>;
};

export function useMovieSelectors({
   moviesList,
   filterOptions,
   sortOptions,
}: {
   moviesList: Movie[];
   filterOptions: MovieFilterOptions;
   sortOptions: MovieSortOptions;
}) {
   const currentUser = getCurrentUser() ?? "";

   const moviesMap = useMemo(() => {
      const map = new Map<string, Movie>();

      moviesList.forEach((movie) => {
         const key = `${movie.data.id}-${movie.data.Type}`;
         map.set(key, movie);
      });

      return map;
   }, [moviesList]);

   const rankedMovies = useMemo(() => {
      const filtered = moviesList
         .filter((m) => !m.hasSeen && !m.hasReacted)
         .sort((a, b) => b.voters.length - a.voters.length);

      const rankings: Record<string, number> = {};

      filtered.forEach((movie, index) => {
         rankings[movie.data.imdbID ?? ""] = index + 1;
      });

      return rankings;
   }, [moviesList]);

   const filteredMoviesList = useMemo(() => {
      let result = [...moviesList];

      // Example hooks for filters (you likely already have logic here)
      //Pull this in from MovieList component
      if (filterOptions.type !== "Default") {
         result = result.filter((m) => m.data.Type === filterOptions.type);
      }

      if (sortOptions.votes === votes.Ascending) {
         result = result.sort((a, b) => b?.voters?.length - a?.voters?.length);
      } else if (sortOptions.votes === votes.Descending) {
         result = result.sort((a, b) => a?.voters?.length - b?.voters?.length);
      } else {
         setIsRequestFilterAscending(true);
      }

      if (sortOptions.alphabetical === alphabetical.Ascending) {
         result = result.sort((a, b) => {
            const titleA = a.data.Title ?? "";
            const titleB = b.data.Title ?? "";
            return titleA.localeCompare(titleB);
         });
      } else if (sortOptions.alphabetical === alphabetical.Descending) {
         result = result
            .sort((a, b) => {
               const titleA = a.data.Title ?? "";
               const titleB = b.data.Title ?? "";
               return titleA.localeCompare(titleB);
            })
            .reverse();
      } else {
         setIsTitleFilterAscending(true);
      }

      if (sortOptions.rating === rating.Ascending) {
         result = result.sort(
            (a, b) =>
               parseFloat(b.data.Rating ? String(b.data.Rating) : "0") -
               parseFloat(a.data.Rating ? String(a.data.Rating) : "0"),
         );
      } else if (sortOptions.rating === rating.Descending) {
         result = result.sort(
            (a, b) =>
               parseFloat(a.data.Rating ? String(a.data.Rating) : "0") -
               parseFloat(b.data.Rating ? String(b.data.Rating) : "0"),
         );
      } else {
         setIsRatingFilterAscending(true);
      }

      if (sortOptions.chronological === chronological.Older) {
         result = result.sort(
            (a, b) =>
               new Date(a.data.Release || "1900-01-01").getTime() -
               new Date(b.data.Release || "1900-01-01").getTime(),
         );
      } else if (sortOptions.chronological === chronological.Newer) {
         result = result.sort(
            (a, b) =>
               new Date(b.data.Release || "1900-01-01").getTime() -
               new Date(a.data.Release || "1900-01-01").getTime(),
         );
      }

      if (sortOptions.published === published.Older) {
         result = result.sort(
            (a, b) =>
               new Date(a.publishedAt || "1900-01-01").getTime() -
               new Date(b.publishedAt || "1900-01-01").getTime(),
         );
      } else if (sortOptions.published === published.Newer) {
         result = result.sort(
            (a, b) =>
               new Date(b.publishedAt || "1900-01-01").getTime() -
               new Date(a.publishedAt || "1900-01-01").getTime(),
         );
      }

      if (sortOptions.added === added.Older) {
         result = result.sort(
            (a, b) =>
               new Date(a.createdAt).getTime() -
               new Date(b.createdAt).getTime(),
         );
      } else if (sortOptions.added === added.Newer) {
         result = result.sort(
            (a, b) =>
               new Date(b.createdAt).getTime() -
               new Date(a.createdAt).getTime(),
         );
      }

      if (statusSortOption.statusSort === statusSort.Watched) {
         const seenList = result.filter(
            (movie) => movie.hasSeen || movie.hasReacted,
         );
         const unseenList = result.filter(
            (movie) =>
               (!movie.hasSeen && !movie.hasReacted) ||
               movie.isRewatch ||
               movie.isRewatchFriend,
         );
         result = [...seenList, ...unseenList];
      } else if (statusSortOption.statusSort === statusSort.Unwatched) {
         const seenList = result.filter(
            (movie) => movie.hasSeen || movie.hasReacted,
         );
         const unseenList = result.filter(
            (movie) =>
               (!movie.hasSeen && !movie.hasReacted) ||
               movie.isRewatch ||
               movie.isRewatchFriend,
         );
         result = [...unseenList, ...seenList];
      }

      if (filterOptions.type === type.Movie) {
         result = result.filter((movie) =>
            (movie.data.Type ?? "").includes(type.Movie.toLowerCase()),
         );
      } else if (filterOptions.type === type.Series) {
         result = result.filter((movie) =>
            (movie.data.Type ?? "").includes(type.Series.toLowerCase()),
         );
      }

      if (filterOptions.genre === genre.Action) {
         result = result.filter((movie) =>
            (movie.data.Genre ?? "").includes(genre.Action),
         );
      } else if (filterOptions.genre === genre.Adventure) {
         result = result.filter((movie) =>
            (movie.data.Genre ?? "").includes(genre.Adventure),
         );
      } else if (filterOptions.genre === genre.Animation) {
         result = result.filter((movie) =>
            (movie.data.Genre ?? "").includes(genre.Animation),
         );
      } else if (filterOptions.genre === genre.Comedy) {
         result = result.filter((movie) =>
            (movie.data.Genre ?? "").includes(genre.Comedy),
         );
      } else if (filterOptions.genre === genre.Crime) {
         result = result.filter((movie) =>
            (movie.data.Genre ?? "").includes(genre.Crime),
         );
      } else if (filterOptions.genre === genre.Documentary) {
         result = result.filter((movie) =>
            (movie.data.Genre ?? "").includes(genre.Documentary),
         );
      } else if (filterOptions.genre === genre.Drama) {
         result = result.filter((movie) =>
            (movie.data.Genre ?? "").includes(genre.Drama),
         );
      } else if (filterOptions.genre === genre.SciFi) {
         result = result.filter((movie) =>
            (movie.data.Genre ?? "").includes(genre.SciFi),
         );
      } else if (filterOptions.genre === genre.Family) {
         result = result.filter((movie) =>
            (movie.data.Genre ?? "").includes(genre.Family),
         );
      } else if (filterOptions.genre === genre.Fantasy) {
         result = result.filter((movie) =>
            (movie.data.Genre ?? "").includes(genre.Fantasy),
         );
      } else if (filterOptions.genre === genre.History) {
         result = result.filter((movie) =>
            (movie.data.Genre ?? "").includes(genre.History),
         );
      } else if (filterOptions.genre === genre.Horror) {
         result = result.filter((movie) =>
            (movie.data.Genre ?? "").includes(genre.Horror),
         );
      } else if (filterOptions.genre === genre.Mystery) {
         result = result.filter((movie) =>
            (movie.data.Genre ?? "").includes(genre.Mystery),
         );
      } else if (filterOptions.genre === genre.Music) {
         result = result.filter((movie) =>
            (movie.data.Genre ?? "").includes(genre.Music),
         );
      } else if (filterOptions.genre === genre.Thriller) {
         result = result.filter((movie) =>
            (movie.data.Genre ?? "").includes(genre.Thriller),
         );
      } else if (filterOptions.genre === genre.Romance) {
         result = result.filter((movie) =>
            (movie.data.Genre ?? "").includes(genre.Romance),
         );
      } else if (filterOptions.genre === genre.War) {
         result = result.filter((movie) =>
            (movie.data.Genre ?? "").includes(genre.War),
         );
      } else if (filterOptions.genre === genre.Western) {
         result = result.filter((movie) =>
            (movie.data.Genre ?? "").includes(genre.Western),
         );
      } else if (filterOptions.genre === genre.Halloween) {
         result = result.filter((movie) => movie.isHalloween);
      } else if (filterOptions.genre === genre.Christmas) {
         result = result.filter((movie) => movie.isChristmas);
      }

      if (filterOptions.status === status.Seen) {
         result = result.filter((movie) => movie.hasSeen);
      } else if (filterOptions.status === status.OnChannel) {
         result = result.filter((movie) => movie.hasReacted);
      } else if (filterOptions.status === status.Rewatch) {
         result = result.filter(
            (movie) => movie.isRewatch || movie.isRewatchFriend,
         );
      } else if (filterOptions.status === status.Unseen) {
         result = result.filter(
            (movie) => !movie.hasSeen && !movie.hasReacted && !movie.isRewatch,
         );
      } else if (filterOptions.status === status.Votable) {
         result = result.filter(
            (movie) => (!movie.hasSeen && !movie.hasReacted) || movie.isRewatch,
         );
      }

      if (filterOptions.requests === requests.MyRequests) {
         result = result.filter((movie) => movie.requester === currentUser);
      } else if (filterOptions.requests === requests.Voted) {
         result = result.filter((movie) =>
            movie.voters.includes(currentUser ?? ""),
         );
      } else if (filterOptions.requests === requests.NotVoted) {
         result = result.filter(
            (movie) => !movie.voters.includes(currentUser ?? ""),
         );
      }

      if (searchTitle) {
         result = result.filter((movie) =>
            (movie.data.Title ?? "")
               .toLowerCase()
               .includes(searchTitle.toLowerCase()),
         );
      }

      if (searchDirector) {
         result = result.filter((movie) =>
            (movie.data.Director ?? "")
               .toLowerCase()
               .includes(searchDirector.toLowerCase()),
         );
      }

      if (searchActor) {
         result = result.filter((movie) =>
            (movie.data.Actors ?? "")
               .toLowerCase()
               .includes(searchActor.toLowerCase()),
         );
      }

      if (searchComposer) {
         result = result.filter((movie) =>
            movie?.data?.Composer?.toLowerCase().includes(
               searchComposer.toLowerCase(),
            ),
         );
      }

      const initialPage =
         currentPage <= Math.ceil(result.length / rowsPerPage)
            ? currentPage
            : Math.ceil(result.length / rowsPerPage);
      setCurrentPage(initialPage > 0 ? initialPage : 1);
      setFilteredMoviesList(result);

      // add your other filters + sort logic here

      return result;
   }, [moviesList, filterOptions, sortOptions]);

   return {
      moviesMap,
      rankedMovies,
      filteredMoviesList,
   };
}
