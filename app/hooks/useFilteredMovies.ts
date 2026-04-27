import { useMemo } from "react";
import { useMovieContext } from "@/context/MovieContext";
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

export function useFilteredMovies(currentUser?: string) {
   const {
      moviesList,
      filterOptions,
      sortOptions,
      statusSortOption,
      searchTitle,
      searchDirector,
      searchActor,
      searchComposer,
   } = useMovieContext();

   return useMemo(() => {
      let result = [...moviesList];

      // FILTERS

      if (filterOptions.type !== type.Default) {
         result = result.filter((movie) =>
            (movie.data.Type ?? "")
               .toLowerCase()
               .includes(filterOptions.type.toLowerCase()),
         );
      }

      if (filterOptions.genre !== genre.Default) {
         if (filterOptions.genre === genre.Halloween) {
            result = result.filter((m) => m.isHalloween);
         } else if (filterOptions.genre === genre.Christmas) {
            result = result.filter((m) => m.isChristmas);
         } else {
            result = result.filter((m) =>
               (m.data.Genre ?? "").includes(filterOptions.genre),
            );
         }
      }

      switch (filterOptions.status) {
         case status.Seen:
            result = result.filter((m) => m.hasSeen);
            break;
         case status.OnChannel:
            result = result.filter((m) => m.hasReacted);
            break;
         case status.Rewatch:
         case status.RewatchFriend:
            result = result.filter((m) => m.isRewatch || m.isRewatchFriend);
            break;
         case status.Unseen:
            result = result.filter(
               (m) => !m.hasSeen && !m.hasReacted && !m.isRewatch,
            );
            break;
         case status.Votable:
            result = result.filter(
               (m) => (!m.hasSeen && !m.hasReacted) || m.isRewatch,
            );
            break;
      }

      if (currentUser) {
         switch (filterOptions.requests) {
            case requests.MyRequests:
               result = result.filter((m) => m.requester === currentUser);
               break;
            case requests.Voted:
               result = result.filter((m) => m.voters.includes(currentUser));
               break;
            case requests.NotVoted:
               result = result.filter((m) => !m.voters.includes(currentUser));
               break;
         }
      }

      if (searchTitle) {
         result = result.filter((m) =>
            (m.data.Title ?? "")
               .toLowerCase()
               .includes(searchTitle.toLowerCase()),
         );
      }

      if (searchDirector) {
         result = result.filter((m) =>
            (m.data.Director ?? "")
               .toLowerCase()
               .includes(searchDirector.toLowerCase()),
         );
      }

      if (searchActor) {
         result = result.filter((m) =>
            (m.data.Actors ?? "")
               .toLowerCase()
               .includes(searchActor.toLowerCase()),
         );
      }

      if (searchComposer) {
         result = result.filter((m) =>
            (m.data.Composer ?? "")
               .toLowerCase()
               .includes(searchComposer.toLowerCase()),
         );
      }

      // SORT

      const comparator = (a: any, b: any) => {
         // votes
         if (sortOptions.votes !== votes.Default) {
            return sortOptions.votes === "Ascending"
               ? b.voters.length - a.voters.length
               : a.voters.length - b.voters.length;
         }

         if (sortOptions.alphabetical !== alphabetical.Default) {
            const res = (a.data.Title ?? "").localeCompare(b.data.Title ?? "");
            return sortOptions.alphabetical === "Ascending" ? res : -res;
         }

         if (sortOptions.rating !== rating.Default) {
            const ra = parseFloat(a.data.Rating ?? "0");
            const rb = parseFloat(b.data.Rating ?? "0");
            return sortOptions.rating === "Ascending" ? rb - ra : ra - rb;
         }

         if (sortOptions.chronological !== chronological.Default) {
            const da = new Date(a.data.Release || "1900").getTime();
            const db = new Date(b.data.Release || "1900").getTime();
            return sortOptions.chronological === "Older" ? da - db : db - da;
         }

         if (sortOptions.added !== added.Default) {
            const da = new Date(a.createdAt).getTime();
            const db = new Date(b.createdAt).getTime();
            return sortOptions.added === "Older" ? da - db : db - da;
         }

         return 0;
      };

      result.sort(comparator);

      // STATUS SORT

      if (statusSortOption.statusSort !== statusSort.Default) {
         const seen = result.filter((m) => m.hasSeen || m.hasReacted);
         const unseen = result.filter(
            (m) =>
               (!m.hasSeen && !m.hasReacted) ||
               m.isRewatch ||
               m.isRewatchFriend,
         );

         result =
            statusSortOption.statusSort === statusSort.Watched
               ? [...seen, ...unseen]
               : [...unseen, ...seen];
      }

      return result;
   }, [
      moviesList,
      filterOptions,
      sortOptions,
      statusSortOption,
      searchTitle,
      searchDirector,
      searchActor,
      searchComposer,
      currentUser,
   ]);
}
