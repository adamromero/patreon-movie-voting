"use client";
import React, { useState, useEffect } from "react";
import { useMovieContext } from "@/context/MovieContext";

import { requestSorts } from "@/app/utils/filtersOptions";
import MovieListEntry from "./MovieListEntry";
import { FaSortUp, FaSortDown, FaSort } from "react-icons/fa";
import { AiOutlineNumber } from "react-icons/ai";
import PageControls from "./PageControls";
import { useRequestQuery } from "../hooks/useRequestQuery";
import { useSearchParams, useRouter } from "next/navigation";

interface RequestStateObjectProps {
   [key: string]: {
      hasReacted: boolean;
      hasSeen: boolean;
      isRewatch: boolean;
      isRewatchFriend: boolean;
      isUnseen: boolean;
      isHalloween: boolean;
      isChristmas: boolean;
   };
}

const MovieList = () => {
   const query = useRequestQuery();

   const searchParams = useSearchParams();
   const router = useRouter();
   const params = new URLSearchParams(searchParams);

   const { user, requestsData, fetchRequests } = useMovieContext();
   const { requests, rankings } = requestsData ?? {};

   const currentUser = user && user.id;
   const isCreator = user && user.isCreator;

   const [requestStatusState, setRequestStatusState] = useState({});

   const [isRankingOn, setIsRankingOn] = useState(false);

   useEffect(() => {
      fetchRequests();
   }, [query]);

   useEffect(() => {
      const requestStateObject: RequestStateObjectProps = {};

      requests?.forEach((request) => {
         requestStateObject[request._id] = {
            hasReacted: request.hasReacted,
            hasSeen: request.hasSeen,
            isRewatch: request.isRewatch,
            isRewatchFriend: request.isRewatchFriend,
            isUnseen:
               !request.hasReacted &&
               !request.hasSeen &&
               !request.isRewatch &&
               !request.isRewatchFriend,
            isHalloween: request.isHalloween,
            isChristmas: request.isChristmas,
         };
      });

      setRequestStatusState(requestStateObject);
   }, [requests]);

   function getSortDirectionIcon(
      currentSort: string,
      sortCategory: {
         options: {
            value: string;
         }[];
      },
   ) {
      const asc = sortCategory.options[1].value;
      const desc = sortCategory.options[2].value;

      if (currentSort === asc) return "asc";
      if (currentSort === desc) return "desc";

      return null;
   }

   function toggleSortCategory(
      currentSort: string,
      sortCategory: {
         options: {
            value: string;
         }[];
      },
   ) {
      const asc = sortCategory.options[1].value;
      const desc = sortCategory.options[2].value;

      return currentSort === asc ? desc : asc;
   }

   function updateSort(sort: string) {
      params.set("sort", sort);
      router.push(`?${params.toString()}`, { scroll: false });
   }

   const titleIconDirection = getSortDirectionIcon(
      query.sort,
      requestSorts.title,
   );
   const ratingIconDirection = getSortDirectionIcon(
      query.sort,
      requestSorts.rating,
   );
   const votesIconDirection = getSortDirectionIcon(
      query.sort,
      requestSorts.votes,
   );

   const tableHead = (
      <div className="flex gap-[5px] sm:gap-[10px] lg:gap-0 bg-transparent lg:bg-black justify-between mb-[10px]">
         <div className="flex bg-black w-full lg:w-[345px]">
            <button
               className="hidden lg:flex w-[50px] px-[17px] items-center justify-center cursor-pointer"
               onClick={() => setIsRankingOn(!isRankingOn)}
               title={isRankingOn ? "Turn off ranking" : "Turn on ranking"}
            >
               <AiOutlineNumber className={isRankingOn ? "border-[1px]" : ""} />
            </button>
            <button
               onClick={() => {
                  const newSort = toggleSortCategory(
                     query.sort,
                     requestSorts.title,
                  );
                  updateSort(newSort);
               }}
               className="flex justify-center lg:block w-full text-[14px] sm:text-[16px] lg:text-left px-[5px] py-[10px] sm:p-[10px]"
            >
               <div className="flex gap-[5px] items-center">
                  {titleIconDirection === "asc" && <FaSortUp />}
                  {titleIconDirection === "desc" && <FaSortDown />}
                  {!titleIconDirection && <FaSort />}
                  Title
               </div>
            </button>
         </div>
         <div className="hidden lg:block w-[220px]">
            <div className="w-full text-left p-[10px]">Genre</div>
         </div>
         <div className="bg-black w-full lg:w-[80px]">
            <button
               onClick={() => {
                  const newSort = toggleSortCategory(
                     query.sort,
                     requestSorts.rating,
                  );
                  updateSort(newSort);
               }}
               className="flex justify-center lg:block w-full text-[14px] sm:text-[16px] lg:text-left px-[5px] py-[10px] sm:p-[10px]"
            >
               <div className="flex gap-[5px] items-center">
                  {ratingIconDirection === "asc" && <FaSortUp />}
                  {ratingIconDirection === "desc" && <FaSortDown />}
                  {!ratingIconDirection && <FaSort />}
                  Rating
               </div>
            </button>
         </div>
         <div className="bg-black w-full lg:w-[100px]">
            <button
               onClick={() => {
                  const newSort = toggleSortCategory(
                     query.sort,
                     requestSorts.votes,
                  );
                  updateSort(newSort);
               }}
               className="flex justify-center lg:block w-full text-[14px] sm:text-[16px] lg:text-left px-[5px] py-[10px] sm:p-[10px]"
            >
               <div className="flex gap-[5px] items-center">
                  {votesIconDirection === "asc" && <FaSortUp />}
                  {votesIconDirection === "desc" && <FaSortDown />}
                  {!votesIconDirection && <FaSort />}
                  Votes
               </div>
            </button>
         </div>
         <div className="hidden lg:block lg:w-[100px]"></div>
         {isCreator && (
            <>
               <div className="hidden lg:block w-[80px]">
                  <div className="w-full text-left p-[10px]">Delete</div>
               </div>
            </>
         )}
      </div>
   );

   const tableBody = (
      <div>
         {requests?.map((data) => (
            <div
               key={data._id}
               className="relative flex justify-between items-start lg:items-center mb-[10px] gap-[15px] bg-black p-[10px] lg:p-0 text-[16px]"
               style={{
                  backgroundColor:
                     data.hasReacted || data.hasSeen
                        ? "rgb(0 0 0 / 40%)"
                        : "#000",
                  position: "relative",
               }}
            >
               <MovieListEntry
                  data={data}
                  currentUser={currentUser ?? ""}
                  isCreator={isCreator ?? false}
                  isRankingOn={isRankingOn}
                  requestStatusState={requestStatusState}
                  ranking={rankings[data.data.imdbID]}
               />
            </div>
         ))}
      </div>
   );

   if (!requestsData) {
      return (
         <div className="relative flex justify-center items-center h-[100px] sm:h-[200px] mb-[100px]">
            <div className="loader relative"></div>
         </div>
      );
   }

   if (!requestsData.requests.length) {
      return <div className="text-[18px]">No results found</div>;
   }

   return (
      <>
         <div className="sticky top-[-1px] z-50 bg-[#830483] py-[10px] flex flex-col-reverse md:flex-row items-center gap-[3px] md:gap-[15px]">
            <PageControls
               total={requestsData.total}
               page={requestsData.page}
               pages={requestsData.pages}
               limit={requestsData.limit}
            />
         </div>
         <div>
            {tableHead}
            {tableBody}
         </div>
      </>
   );
};

export default MovieList;
