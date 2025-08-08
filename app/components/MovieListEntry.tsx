import React, { useState, useContext } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { BiLogoPatreon } from "react-icons/bi";
import { AiFillYoutube } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";

import { useBoundStore } from "@/stores/useBoundStore";
import { FaRegImage } from "react-icons/fa6";

import RequestModal from "./MovieListEntryModal/RequestModal";
import { Movie, MovieData } from "../types/movie";

interface MovieListEntryProps {
   data: Movie;
   currentUser: string;
   isCreator: boolean;
   ranking: number;
   isRankingOn: boolean;
   requestStatusState: Record<string | number, boolean>;
}

type WatchedMovieRef = { _id: string };

const MovieListEntry: React.FC<MovieListEntryProps> = ({
   data,
   currentUser,
   isCreator,
   ranking,
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

   const { addVoteToRequest, removeVoteFromRequest, removeRequestFromList } =
      useBoundStore();

   const handleCastVote = async (movieId: string, voters: string[]) => {
      addVoteToRequest(movieId, voters, currentUser);
   };

   const handleRemoveVote = async (movieId: string, voters: string[]) => {
      removeVoteFromRequest(movieId, voters, currentUser);
   };

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
               {(data?.hasReacted || data?.hasSeen || data?.isRewatch) && (
                  <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-black/[.5] z-10">
                     <p
                        className={`text-[20px] text-shadow font-bold text-center ${
                           data?.isRewatch
                              ? "leading-[22px] px-[2px] lg:leading-[13px] lg:text-[12px]"
                              : "leading-[16px] lg:text-[14px]"
                        }`}
                     >
                        {data?.hasReacted && <>On Channel</>}
                        {data?.hasSeen && <>Seen</>}
                        {data?.isRewatch && <>Rewatch with Friend</>}
                     </p>
                  </div>
               )}
               {data?.data?.Poster ? (
                  <div className="relative">
                     {isRankingOn && (
                        <span
                           className="absolute w-full h-full items-center justify-center hidden lg:flex z-20"
                           style={{ background: "rgba(0,0,0,.75)" }}
                        >
                           {ranking}
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
                  <div className="flex justify-center items-center bg-[#585858] w-[100px] h-[150px] lg:w-[50px] lg:h-[75px] text-[20px] lg:text-[14px] text-shadow font-bold text-center leading-[16px] flex items-center">
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
               <span>Rank:</span> {ranking}
            </div>
            <div className="lg:w-[40px]">
               <span className="inline lg:hidden">Rating:</span>{" "}
               {data?.data?.Rating ? data?.data?.Rating.toFixed(1) : ""}
            </div>
            <div className="lg:w-[40px]">
               <span className="inline lg:hidden">Votes:</span>{" "}
               {data?.voters?.length}
            </div>
            {!data?.hasReacted && !data?.hasSeen && currentUser ? (
               <div className="mt-[10px] md:mt-0 lg:w-[70px]">
                  {data?.voters?.filter((voter) => voter === currentUser)
                     .length ? (
                     <button
                        className="w-[70px] flex justify-center bg-[#585858] hover:bg-[#858585] focus-visible:bg-[#858585] transition-colors duration-300 ease-in-out text-white p-2 uppercase text-[10px] md:text-[12px] font-bold"
                        onClick={() =>
                           handleRemoveVote(data?._id, data?.voters)
                        }
                     >
                        Unvote
                     </button>
                  ) : (
                     <button
                        className="w-[70px] flex justify-center bg-[#830483] hover:bg-[#a300a3] focus-visible:bg-[#a300a3] transition-colors duration-300 ease-in-out text-white p-2 uppercase text-[10px] md:text-[12px] font-bold"
                        onClick={() => handleCastVote(data?._id, data?.voters)}
                     >
                        Upvote
                     </button>
                  )}
               </div>
            ) : (
               <>
                  {!data?.hasReacted ? (
                     <div className="hidden lg:block lg:w-[70px]"></div>
                  ) : (
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
                  )}
               </>
            )}
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
