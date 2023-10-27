import React, { useState, useContext } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { BiLogoPatreon } from "react-icons/bi";
import { AiFillYoutube } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidUpvote } from "react-icons/bi";
import { BiSolidDownvote } from "react-icons/bi";

import { MovieContext } from "@/context/MovieContext";

const MovieListEntry = ({
   data,
   currentUser,
   isCreator,
   watchedState,
   setWatchedState,
   seenState,
   setSeenState,
}) => {
   const [moreInfoOpen, setMoreInfoOpen] = useState(false);
   const onOpenMoreInfoModal = () => setMoreInfoOpen(true);
   const onCloseMoreInfoModal = () => setMoreInfoOpen(false);

   const [linkUpdateOpen, setLinkUpdateOpen] = useState(false);
   const onOpenLinkUpdateModal = () => setLinkUpdateOpen(true);
   const onCloseLinkUpdateModal = () => setLinkUpdateOpen(false);

   const [openDelete, setOpenDelete] = useState(false);
   const onOpenDeleteModal = () => setOpenDelete(true);
   const onCloseDeleteModal = () => setOpenDelete(false);

   const [removeMovieId, setRemoveMovieId] = useState();

   const [watchedMovieData, setWatchedMovieData] = useState({});
   const [patreonReactionLink, setPatreonReactionLink] = useState("");
   const [youTubeReactionLink, setYouTubeReactionLink] = useState("");

   const {
      castMovieVote,
      removeMovieVote,
      setMovieVoteToWatched,
      setMovieVoteToSeen,
      setWatchedMovieLinks,
      removeMovieVoteOverride,
   } = useContext(MovieContext);

   const handleCastVote = async (movieId, voters) => {
      castMovieVote(movieId, voters, currentUser);
   };

   const handleRemoveVote = async (movieId, voters) => {
      removeMovieVote(movieId, voters, currentUser);
   };

   const handleWatchSetting = (e, data) => {
      const isChecked = e.target.checked;
      setMovieVoteToWatched(data?._id, isChecked);
      setWatchedState((prevState) => ({
         ...prevState,
         [data?._id]: isChecked,
      }));
   };

   const handleSeenSetting = (e, data) => {
      const isChecked = e.target.checked;
      setMovieVoteToSeen(data?._id, isChecked);
      setSeenState((prevState) => ({
         ...prevState,
         [data?._id]: isChecked,
      }));
   };

   const handleLinkUpdate = (e) => {
      e.preventDefault();
      const links = {
         patreon: patreonReactionLink,
         youtube: youTubeReactionLink,
      };
      setWatchedMovieLinks(watchedMovieData.id, links);
   };

   const convertDateFormat = (date) => {
      const originalDate = new Date(date);
      const month = originalDate.getMonth() + 1;
      const day = originalDate.getDate();
      const year = originalDate.getFullYear();
      return `${month}-${day}-${year}`;
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
                     id: data?._id,
                  });
               }}
            >
               {(data?.hasReacted || data?.hasSeen) && (
                  <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-black/[.5]">
                     <p className="text-[20px] lg:text-[14px] text-shadow font-bold text-center leading-[16px]">
                        {data?.hasReacted && <>On Channel</>}
                        {data?.hasSeen && <>Seen</>}
                     </p>
                  </div>
               )}
               {data?.data?.Poster !== "N/A" ? (
                  <img
                     className="w-[100px] h-[150px] lg:w-[50px] lg:h-[75px]"
                     src={data?.data?.Poster}
                     alt={data?.data?.Title}
                  />
               ) : (
                  <div className="bg-[#585858] w-[100px] h-[150px] lg:w-[50px] lg:h-[75px] text-[20px] lg:text-[14px] text-shadow font-bold text-center leading-[16px] flex items-center">
                     Missing Image
                  </div>
               )}
            </button>
         </div>
         <div
            className={`${
               isCreator ? "pr-0" : "md:pr-[16px]"
            } flex flex-col justify-between flex-1 gap-[5px] md:grid md:grid-cols-2 md:gap-[30px] lg:flex lg:items-center lg:flex-row`}
         >
            <div className="lg:w-[250px] leading-4">
               {/* {isCreator && data?.hasReacted ? (
                  <button
                     className="text-left py-[5px]"
                     onClick={() => {
                        onOpenLinkUpdateModal();
                        setPatreonReactionLink(data?.links?.patreon);
                        setYouTubeReactionLink(data?.links?.youtube);
                        setWatchedMovieData({
                           id: data?._id,
                           title: data?.data?.Title,
                           poster: data?.data?.Poster,
                           year: data?.data?.Year,
                        });
                     }}
                     title="Click to Edit Links"
                  >
                     {data?.data?.Title} ({data?.data?.Year})
                  </button>
               ) : (
                  <> */}
               {data?.data?.Title} ({data?.data?.Year})
               {/* </>
               )} */}
            </div>
            <div className="lg:w-[200px]">{data?.data?.Genre}</div>
            <div className="lg:w-[40px]">
               <span className="inline lg:hidden">Rating:</span>{" "}
               {data?.data?.imdbRating}
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
                        Retract
                     </button>
                  ) : (
                     <button
                        className="w-[70px] flex justify-center bg-[#830483] hover:bg-[#a300a3] focus-visible:bg-[#a300a3] transition-colors duration-300 ease-in-out text-white p-2 uppercase text-[10px] md:text-[12px] font-bold"
                        onClick={() => handleCastVote(data?._id, data?.voters)}
                     >
                        Request
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
                                 className="flex justify-center items-center gap-[2px] bg-[black] text-[18px] p-[3px] border-[#585858] border-[1px]"
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
                  {data?.hasSeen ? (
                     <div className="hidden lg:block lg:w-[35px] mt-[10px] md:mt-0 relative"></div>
                  ) : (
                     <div className="lg:w-[35px] mt-[10px] md:mt-0 relative">
                        <div className="block lg:hidden">Channel</div>
                        <div className="checkbox-container">
                           <label
                              className="checkbox"
                              htmlFor={`checkbox-${data?._id}`}
                           >
                              <input
                                 type="checkbox"
                                 id={`checkbox-${data?._id}`}
                                 checked={!!watchedState[data?._id]}
                                 onChange={(e) => handleWatchSetting(e, data)}
                              />
                              <div className="checkmark"></div>
                           </label>
                        </div>
                     </div>
                  )}
                  {data?.hasReacted ? (
                     <div className="lg:w-[35px] mt-[10px] md:mt-0 relative"></div>
                  ) : (
                     <div className="lg:w-[35px] mt-[10px] md:mt-0 relative">
                        <div className="block lg:hidden">Seen</div>
                        <div className="checkbox-container">
                           <label
                              className="checkbox"
                              htmlFor={`checkbox2-${data?._id}`}
                           >
                              <input
                                 type="checkbox"
                                 id={`checkbox2-${data?._id}`}
                                 checked={!!seenState[data?._id]}
                                 onChange={(e) => handleSeenSetting(e, data)}
                              />
                              <div className="checkmark"></div>
                           </label>
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

         <Modal
            open={moreInfoOpen}
            onClose={onCloseMoreInfoModal}
            center
            classNames={{ modal: "more-info-modal" }}
         >
            <a
               href={`https://www.imdb.com/title/${data?.data?.imdbID}`}
               target="_blank"
            >
               Go to IMDB
            </a>
            <h2 className="mb-[10px] text-[18px] font-bold">
               {data?.data?.Title} ({data?.data?.Year})
            </h2>
            <div className="flex gap-[20px] flex-col xs:flex-row">
               <img
                  src={data?.data?.Poster}
                  alt={data?.data?.Title}
                  className="h-[275px] mx-auto"
               />
               <div className="flex flex-1 flex-col">
                  <div>
                     <span className="font-bold">Genre:</span>{" "}
                     {data?.data?.Genre}
                  </div>
                  <div>
                     <span className="font-bold">Cast:</span>{" "}
                     {data?.data?.Actors}
                  </div>
                  <div>
                     <span className="font-bold">Director:</span>{" "}
                     {data?.data?.Director}
                  </div>
                  <div>
                     <span className="font-bold">Rated:</span>{" "}
                     {data?.data?.Rated}
                  </div>
                  <div>
                     <span className="font-bold">IMDB Rating:</span>{" "}
                     {data?.data?.imdbRating}
                  </div>
                  <div>
                     <span className="font-bold">Requests:</span>{" "}
                     {data?.voters?.length}
                  </div>
                  <div>
                     <span className="font-bold">Requested:</span>{" "}
                     {convertDateFormat(data?.createdAt)}
                  </div>
                  <div>
                     <span className="font-bold">Status:</span>{" "}
                     {data?.hasSeen
                        ? "Seen"
                        : data?.hasReacted
                        ? "On Channel"
                        : "Unseen"}
                  </div>
                  <div className="flex flex-col gap-[5px] max-w-[100px] mt-[10px]">
                     {data?.links?.youtube && (
                        <a
                           className="flex justify-center items-center gap-[2px] bg-[red] text-[25px] p-[3px]"
                           href={data?.links?.youtube}
                           title="Watch on YouTube"
                           target="_blank"
                        >
                           <AiFillYoutube />
                        </a>
                     )}
                     {data?.links?.patreon && (
                        <a
                           className="flex justify-center items-center gap-[2px] bg-[black] text-[25px] p-[3px] border-[#585858] border-[1px]"
                           href={data?.links?.patreon}
                           title="Watch Full Length"
                           target="_blank"
                        >
                           <BiLogoPatreon />
                        </a>
                     )}
                  </div>
               </div>
            </div>
            {isCreator && data?.hasReacted && (
               <div className="flex flex-col flex-1 mt-[20px]">
                  <form
                     className="flex flex-col gap-[15px]"
                     onSubmit={handleLinkUpdate}
                  >
                     <input
                        className="w-full px-[8px] py-[5px] text-[black]"
                        type="text"
                        placeholder="YouTube Reaction Link"
                        value={youTubeReactionLink}
                        onChange={(e) => setYouTubeReactionLink(e.target.value)}
                     />
                     <input
                        className="w-full px-[8px] py-[5px] text-[black]"
                        type="text"
                        placeholder="Patreon Full Length Reaction Link"
                        value={patreonReactionLink}
                        onChange={(e) => setPatreonReactionLink(e.target.value)}
                     />
                     <button
                        className="bg-[#830483] hover:bg-[#a300a3] focus-visible:bg-[#a300a3] transition-colors duration-300 ease-in-out text-white p-[5px] max-w-[115px]"
                        type="submit"
                     >
                        Submit
                     </button>
                  </form>
               </div>
            )}
         </Modal>

         <Modal
            open={openDelete}
            onClose={onCloseDeleteModal}
            center
            classNames={{ modal: "delete-movie-modal" }}
         >
            <div className="text-center">
               Confirm you want to remove this movie?
            </div>
            <div className="flex justify-between items-center max-w-[200px] w-full mx-auto h-[60px]">
               <button
                  onClick={() => removeMovieVoteOverride(removeMovieId)}
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
