"use client";
import React, { useContext } from "react";
import { MovieContext } from "@/context/MovieContext";
import {
   genre,
   status,
   type,
   requests,
   chronological,
   added,
   rating,
   votes,
   alphabetical,
   statusSort,
   published,
} from "@/app/utils/filtersOptions";
import FilterMovieListTags from "./FilterMovieListTags";
import FilterMovieListSortTags from "./FilterMovieListSortTags";

interface FilterMovieListProps {
   currentUser?: string;
}

const FilterMovieList: React.FC<FilterMovieListProps> = ({ currentUser }) => {
   const { filterOptions, setFilterOptions } = useContext(MovieContext);

   const handleChronologicalSort = (e) => {
      const selection = e.target.value;
      setFilterOptions((prevOptions) => ({
         ...prevOptions,
         alphabetical: alphabetical.Default,
         votes: votes.Default,
         rating: rating.Default,
         added: added.Default,
         chronological: selection,
         published: published.Default,
      }));
   };

   const handleAddedSort = (e) => {
      const selection = e.target.value;
      setFilterOptions((prevOptions) => ({
         ...prevOptions,
         alphabetical: alphabetical.Default,
         votes: votes.Default,
         rating: rating.Default,
         added: selection,
         chronological: chronological.Default,
         published: published.Default,
      }));
   };

   const handlePublishSort = (e) => {
      const selection = e.target.value;
      setFilterOptions((prevOptions) => ({
         ...prevOptions,
         alphabetical: alphabetical.Default,
         votes: votes.Default,
         rating: rating.Default,
         added: added.Default,
         chronological: chronological.Default,
         status: status.OnChannel,
         published: selection,
      }));
   };

   const handleWatchedStatusSort = (e) => {
      const selection = e.target.value;
      setFilterOptions((prevOptions) => ({
         ...prevOptions,
         statusSort: selection,
      }));
   };

   const handleTypeFilter = (e) => {
      const selection = e.target.value;
      setFilterOptions((prevOptions) => ({
         ...prevOptions,
         type: selection,
      }));
   };

   const handleGenreFilter = (e) => {
      const selection = e.target.value;
      setFilterOptions((prevOptions) => ({
         ...prevOptions,
         genre: selection,
      }));
   };

   const handleStatusFilter = (e) => {
      const selection = e.target.value;
      setFilterOptions((prevOptions) => ({
         ...prevOptions,
         status: selection,
      }));
   };

   const handleRequestsFilter = (e) => {
      const selection = e.target.value;
      setFilterOptions((prevOptions) => ({
         ...prevOptions,
         requests: selection,
      }));
   };

   return (
      <div className="flex flex-col justify-between mt-[10px] mb-[15px] sm:mt-0 xlg:flex-row gap-[10px] w-full text-white flex gap-[20px]">
         <div>
            <div className="flex gap-[4px] mb-[10px] items-center h-[30px]">
               <div>Filter By:</div>
               <FilterMovieListTags />
            </div>
            <div className="flex flex-col lg:flex-row gap-[10px]">
               <div className="flex gap-[10px]">
                  <div className="flex flex-col flex-1 lg:flex-none">
                     <label htmlFor="genre">{genre.Name}</label>
                     <select
                        className="bg-white text-black w-full lg:w-[125px] p-[5px] overflow-hidden whitespace-nowrap text-ellipsis"
                        name="genreFilter"
                        id="genre"
                        value={filterOptions.genre}
                        onChange={handleGenreFilter}
                     >
                        <option value={genre.Default}>All</option>
                        <option value={genre.Action}>Action</option>
                        <option value={genre.Adventure}>Adventure</option>
                        <option value={genre.Animation}>Animation</option>
                        <option value={genre.Christmas}>Christmas</option>
                        <option value={genre.Comedy}>Comedy</option>
                        <option value={genre.Crime}>Crime</option>
                        <option value={genre.Documentary}>Documentary</option>
                        <option value={genre.Drama}>Drama</option>
                        <option value={genre.Family}>Family</option>
                        <option value={genre.Fantasy}>Fantasy</option>
                        <option value={genre.Halloween}>Halloween</option>
                        <option value={genre.History}>History</option>
                        <option value={genre.Horror}>Horror</option>
                        <option value={genre.Mystery}>Mystery</option>
                        <option value={genre.Music}>Music</option>
                        <option value={genre.Romance}>Romance</option>
                        <option value={genre.SciFi}>Sci-Fi</option>
                        <option value={genre.Thriller}>Thriller</option>
                        <option value={genre.Western}>Western</option>
                        <option value={genre.War}>War</option>
                     </select>
                  </div>
                  <div className="flex flex-col flex-1 lg:flex-none">
                     <label htmlFor="type">{type.Name}</label>
                     <select
                        className="bg-white text-black w-full lg:w-[125px] p-[5px] overflow-hidden whitespace-nowrap text-ellipsis"
                        name="typeFilter"
                        id="type"
                        value={filterOptions.type}
                        onChange={handleTypeFilter}
                     >
                        <option value={type.Default}>All</option>
                        <option value={type.Movie}>Movie</option>
                        <option value={type.Series}>Series</option>
                     </select>
                  </div>
               </div>
               <div className="flex gap-[10px]">
                  <div className="flex flex-col flex-1 lg:flex-none">
                     <label htmlFor="status">{status.Name}</label>
                     <select
                        className="bg-white text-black w-full lg:w-[125px] p-[5px] overflow-hidden whitespace-nowrap text-ellipsis"
                        name="statusFilter"
                        id="status"
                        value={filterOptions.status}
                        onChange={handleStatusFilter}
                     >
                        <option value={status.Default}>All</option>
                        <option value={status.Watched}>On Channel</option>
                        <option value={status.Seen}>Seen</option>
                        <option value={status.Rewatch}>Rewatch</option>
                        <option value={status.Unseen}>Unseen</option>
                        <option value={status.Votable}>Votable</option>
                     </select>
                  </div>
                  {currentUser && (
                     <div className="flex flex-col flex-1 lg:flex-none">
                        <label htmlFor="requests">{requests.Name}</label>
                        <select
                           className="bg-white text-black w-full lg:w-[125px] p-[5px] overflow-hidden whitespace-nowrap text-ellipsis"
                           name="requestsFilter"
                           id="requests"
                           value={filterOptions.requests}
                           onChange={handleRequestsFilter}
                        >
                           <option value={requests.Default}>All</option>
                           <option value={requests.MyRequests}>
                              My Requests
                           </option>
                           <option value={requests.Voted}>Voted</option>
                           <option value={requests.NotVoted}>Not Voted</option>
                        </select>
                     </div>
                  )}
               </div>
            </div>
         </div>
         <div>
            <div className="flex gap-[4px] mb-[10px] items-center h-[30px]">
               <div>Sort By: </div>
               <FilterMovieListSortTags />
            </div>
            <div className="flex flex-col lg:flex-row gap-[10px]">
               <div className="flex gap-[10px]">
                  <div className="flex flex-col flex-1 lg:flex-none">
                     <label htmlFor="statusSort">{statusSort.Name}</label>
                     <select
                        className="bg-white text-black w-full lg:w-[125px] p-[5px] overflow-hidden whitespace-nowrap text-ellipsis"
                        name="watchedFilter"
                        id="watched"
                        value={filterOptions.statusSort}
                        onChange={handleWatchedStatusSort}
                     >
                        <option value={statusSort.Default}>Default</option>
                        <option value={statusSort.Unwatched}>
                           Unseen/Rewatch
                        </option>
                        <option value={statusSort.Watched}>
                           On Channel/Seen
                        </option>
                     </select>
                  </div>
                  <div className="flex flex-col flex-1 lg:flex-none">
                     <label htmlFor="chronological">{chronological.Name}</label>
                     <select
                        className="bg-white text-black w-full lg:w-[125px] p-[5px] overflow-hidden whitespace-nowrap text-ellipsis"
                        name="chronologicalFilter"
                        id="chronological"
                        value={filterOptions.chronological}
                        onChange={handleChronologicalSort}
                     >
                        <option value={chronological.Default}>Default</option>
                        <option value={chronological.Older}>Older</option>
                        <option value={chronological.Newer}>Newer</option>
                     </select>
                  </div>
               </div>
               <div className="flex gap-[10px]">
                  <div className="flex flex-col flex-1 lg:flex-none">
                     <label htmlFor="published">{published.Name}</label>
                     <select
                        className="bg-white text-black w-full lg:w-[125px] p-[5px] overflow-hidden whitespace-nowrap text-ellipsis"
                        name="publishedFilter"
                        id="published"
                        value={filterOptions.published}
                        onChange={handlePublishSort}
                     >
                        <option value={published.Default}>Default</option>
                        <option value={published.Older}>Older</option>
                        <option value={published.Newer}>Newer</option>
                     </select>
                  </div>
                  <div className="flex flex-col flex-1 lg:flex-none">
                     <label htmlFor="added">{added.Name}</label>
                     <select
                        className="bg-white text-black w-full lg:w-[125px] p-[5px] overflow-hidden whitespace-nowrap text-ellipsis"
                        name="addedFilter"
                        id="added"
                        value={filterOptions.added}
                        onChange={handleAddedSort}
                     >
                        <option value={added.Default}>Default</option>
                        <option value={added.Older}>Older</option>
                        <option value={added.Newer}>Newer</option>
                     </select>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default FilterMovieList;
