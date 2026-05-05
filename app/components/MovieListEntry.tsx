import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { BiLogoPatreon } from "react-icons/bi";
import { AiFillYoutube } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";

import { useMovieContext } from "@/context/MovieContext";
import { FaRegImage } from "react-icons/fa6";

import RequestModal from "./MovieListEntryModal/RequestModal";
import { Movie } from "../types/movie";
import { useRankedMovies } from "../hooks/useRankedMovies";

interface MovieListEntryProps {
   data: Movie;
   currentUser: string;
   isCreator: boolean;
   isRankingOn: boolean;
   requestStatusState: Record<string | number, boolean>;
}

type WatchedMovieRef = { _id: string };

const MovieListEntry: React.FC<MovieListEntryProps> = ({
   data,
   currentUser,
   isCreator,
   isRankingOn,
   requestStatusState,
}) => {
   const [moreInfoOpen, setMoreInfoOpen] = useState(false);
   const onOpenMoreInfoModal = () => setMoreInfoOpen(true);
   const onCloseMoreInfoModal = () => setMoreInfoOpen(false);

   const [openDelete, setOpenDelete] = useState(false);
   const onOpenDeleteModal = () => setOpenDelete(true);
   const onCloseDeleteModal = () => setOpenDelete(false);

   const [removeMovieId, setRemoveMovieId] = useState("");

   const [watchedMovieData, setWatchedMovieData] =
      useState<WatchedMovieRef | null>(null);
   const [patreonReactionLink, setPatreonReactionLink] = useState("");
   const [youtubeReactionLink, setYouTubeReactionLink] = useState("");

   const [loadingVote, setLoadingVote] = useState(false);

   const { addVoteToRequest, removeVoteFromRequest, removeRequestFromList } =
      useMovieContext();

   const rankedMovies = useRankedMovies();

   const handleAddVote = async (movieId: string) => {
      await addVoteToRequest(movieId);
      setLoadingVote(false);
   };

   const handleRemoveVote = async (movieId: string) => {
      await removeVoteFromRequest(movieId);
      setLoadingVote(false);
   };

   const handleScrollToTop = () => {
      window.scrollTo({
         top: 0,
         behavior: "smooth",
      });
      //need to set focus on patreon button
   };

   const hasVoted = data?.voters?.includes(currentUser);
   const canVote = !data?.hasReacted && !data?.hasSeen && currentUser;

   return (
      <>
         <div className="relative">
            <button
               className="block"
               title={
                  isCreator && data?.hasReacted
                     ? "Click to edit links"
                     : "See more info"
               }
               onClick={() => {
                  onOpenMoreInfoModal();
                  setPatreonReactionLink(data?.links?.patreon);
                  setYouTubeReactionLink(data?.links?.youtube);
                  setWatchedMovieData({
                     _id: data?._id,
                  });
               }}
            >
               {(data?.hasReacted ||
                  data?.hasSeen ||
                  data?.isRewatch ||
                  data?.isRewatchFriend) && (
                  <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-black/[.5] z-10">
                     <p
                        className={`text-[20px] text-shadow font-bold text-center ${
                           data?.isRewatch || data?.isRewatchFriend
                              ? "leading-[22px] px-[2px] lg:leading-[13px] lg:text-[12px]"
                              : "leading-[16px] lg:text-[14px]"
                        }`}
                     >
                        {data?.hasReacted && <>On Channel</>}
                        {data?.hasSeen && <>Seen</>}
                        {data?.isRewatch && <>Rewatch</>}
                        {data?.isRewatchFriend && <>Rewatch with Friend</>}
                     </p>
                  </div>
               )}
               {data?.data?.Poster ? (
                  <div className="relative">
                     {isRankingOn && rankedMovies[data.data.imdbID ?? ""] && (
                        <span
                           className="absolute w-full h-full items-center justify-center hidden lg:flex z-20"
                           style={{ background: "rgba(0,0,0,.75)" }}
                        >
                           {rankedMovies[data.data.imdbID ?? ""]}
                        </span>
                     )}

                     <img
                        className="w-[100px] h-[150px] lg:w-[50px] lg:h-[75px]"
                        src={
                           data?.data?.Poster.includes("media-amazon")
                              ? data?.data?.Poster
                              : `https://image.tmdb.org/t/p/w200${data?.data?.Poster}`
                        }
                        alt={data?.data?.Title}
                     />
                  </div>
               ) : (
                  <div className="flex justify-center items-center bg-[#585858] w-[100px] h-[150px] lg:w-[50px] lg:h-[75px] text-[20px] lg:text-[14px] text-shadow font-bold text-center leading-[16px]">
                     <FaRegImage className="text-[20px]" />
                  </div>
               )}
            </button>
         </div>
         <div
            className={`${
               isCreator ? "pr-0" : "md:pr-[16px]"
            } flex flex-col justify-between flex-1 gap-[5px] md:grid md:grid-cols-2 md:gap-[30px] lg:flex lg:items-center lg:flex-row`}
         >
            <div className="lg:w-[250px] leading-4 flex items-baseline md:items-center gap-[5px]">
               {data?.data?.Title}{" "}
               {data?.data?.Year && <>({data?.data?.Year})</>}
            </div>
            <div className="lg:w-[200px]">{data?.data?.Genre}</div>
            <div className="lg:hidden">
               <span>Rank:</span> {rankedMovies[data.data.imdbID ?? ""]}
            </div>
            <div className="lg:w-[40px]">
               <span className="inline lg:hidden">Rating:</span>{" "}
               {data?.data?.Rating ? data?.data?.Rating.toFixed(1) : ""}
            </div>
            <div className="lg:w-[40px]">
               <span className="inline lg:hidden">Votes:</span>{" "}
               {data?.voters?.length}
            </div>

            {canVote ? (
               <div className="mt-[10px] md:mt-0 lg:w-[70px]">
                  {hasVoted ? (
                     <button
                        className="w-[70px] flex justify-center bg-[#585858] hover:bg-[#858585] focus-visible:bg-[#858585] transition-colors duration-300 ease-in-out text-white p-2 uppercase text-[10px] md:text-[12px] font-bold"
                        onClick={() => {
                           setLoadingVote(true);
                           handleRemoveVote(data?._id);
                        }}
                     >
                        {loadingVote ? (
                           <span className="button-loader"></span>
                        ) : (
                           "Unvote"
                        )}
                     </button>
                  ) : (
                     <button
                        className="w-[70px] flex justify-center bg-[#830483] hover:bg-[#a300a3] focus-visible:bg-[#a300a3] transition-colors duration-300 ease-in-out text-white p-2 uppercase text-[10px] md:text-[12px] font-bold"
                        onClick={() => {
                           setLoadingVote(true);
                           handleAddVote(data?._id);
                        }}
                        disabled={loadingVote}
                     >
                        {loadingVote ? (
                           <span className="button-loader"></span>
                        ) : (
                           "Upvote"
                        )}
                     </button>
                  )}
               </div>
            ) : data?.hasSeen && !data?.hasReacted ? (
               <div className="w-[70px]"></div>
            ) : !currentUser && !data?.hasReacted ? (
               <div className="w-[135px]">
                  <button
                     onClick={handleScrollToTop}
                     className="block flex justify-between whitespace-nowrap bg-white gap-[3px] text-[black] py-[8px] px-[10px] rounded-sm font-bold text-[12px] mt-[10px] md:m-0"
                  >
                     <BiLogoPatreon className="text-[20px]" />
                     <span className="leading-5">Connect to Vote</span>
                  </button>
               </div>
            ) : data?.hasReacted ? (
               <div className="w-[70px]">
                  <div className="flex flex-col gap-[8px]">
                     {data?.links?.youtube && (
                        <a
                           className="flex justify-center items-center gap-[2px] bg-[red] text-[18px] p-[3px]"
                           href={data?.links?.youtube}
                           title="Watch on YouTube"
                           target="_blank"
                        >
                           <AiFillYoutube />
                        </a>
                     )}
                     {data?.links?.patreon && (
                        <a
                           className="flex justify-center items-center gap-[2px] bg-[black] text-[18px] p-[3px]"
                           href={data?.links?.patreon}
                           title="Watch Full Length"
                           target="_blank"
                        >
                           <BiLogoPatreon />
                        </a>
                     )}
                  </div>
               </div>
            ) : null}
            {isCreator && (
               <>
                  <div className="hidden lg:block lg:w-[75px] text-center">
                     <button
                        onClick={() => {
                           onOpenDeleteModal();
                           setRemoveMovieId(data?._id);
                        }}
                        className="text-[red] text-[30px]"
                     >
                        <AiFillDelete />
                     </button>
                  </div>
               </>
            )}
         </div>

         <RequestModal
            data={data}
            moreInfoOpen={moreInfoOpen}
            onCloseMoreInfoModal={onCloseMoreInfoModal}
            requestStatusState={requestStatusState}
            isCreator={isCreator}
            patreonReactionLink={patreonReactionLink}
            setPatreonReactionLink={setPatreonReactionLink}
            youtubeReactionLink={youtubeReactionLink}
            setYouTubeReactionLink={setYouTubeReactionLink}
            watchedMovieData={watchedMovieData}
         />

         <Modal
            open={openDelete}
            onClose={onCloseDeleteModal}
            center
            classNames={{ modal: "delete-movie-modal" }}
         >
            <div className="text-center">
               Confirm you want to remove this request?
            </div>
            <div className="flex justify-between items-center max-w-[200px] w-full mx-auto h-[60px]">
               <button
                  onClick={() => removeRequestFromList(removeMovieId)}
                  className="bg-[#830483] py-[5px] px-[10px]"
               >
                  Confirm
               </button>
               <button
                  onClick={onCloseDeleteModal}
                  className="bg-[#585858] py-[5px] px-[10px]"
               >
                  Cancel
               </button>
            </div>
         </Modal>
      </>
   );
};

export default MovieListEntry;
