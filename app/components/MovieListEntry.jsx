import React, { useState, useContext } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { BiLogoPatreon } from "react-icons/bi";
import { AiFillYoutube } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { MovieContext } from "@/context/MovieContext";
import { FaRegImage } from "react-icons/fa6";

const MovieListEntry = ({
   data,
   currentUser,
   isCreator,
   ranking,
   isRankingOn,
   channelState,
   setChannelState,
   seenState,
   setSeenState,
   rewatchState,
   setRewatchState,
   requestStatus,
   setRequestStatus,
}) => {
   const [moreInfoOpen, setMoreInfoOpen] = useState(false);
   const onOpenMoreInfoModal = () => setMoreInfoOpen(true);
   const onCloseMoreInfoModal = () => setMoreInfoOpen(false);

   const [openDelete, setOpenDelete] = useState(false);
   const onOpenDeleteModal = () => setOpenDelete(true);
   const onCloseDeleteModal = () => setOpenDelete(false);

   const [removeMovieId, setRemoveMovieId] = useState();

   const [watchedMovieData, setWatchedMovieData] = useState({});
   const [patreonReactionLink, setPatreonReactionLink] = useState("");
   const [youtubeReactionLink, setYouTubeReactionLink] = useState("");

   const [youtubeLinkWarning, setYouTubeLinkWarning] = useState("");
   const [patreonLinkWarning, setPatreonLinkWarning] = useState("");

   const {
      castMovieVote,
      removeMovieVote,
      setMovieStatus,
      setWatchedMovieLinks,
      removeMovieVoteOverride,
   } = useContext(MovieContext);

   const handleCastVote = async (movieId, voters) => {
      castMovieVote(movieId, voters, currentUser);
   };

   const handleRemoveVote = async (movieId, voters) => {
      removeMovieVote(movieId, voters, currentUser);
   };

   const handleStatusSetting = (e, data) => {
      const selectedValue = e.target.value;
      setMovieStatus(data?._id, selectedValue);
   };

   const handleLinkUpdate = (e) => {
      e.preventDefault();

      const processLink = (regex, link, setLinkWarning) => {
         if (regex.test(link)) {
            setLinkWarning("");
            return link;
         } else {
            setLinkWarning("Hi Jen! That link is incorrect, try again. ☝️🤓");
            return "";
         }
      };

      const validYouTubeLinkPattern =
         /^https:\/\/(www\.)?youtu\.be\/.*$|^https:\/\/(www\.)?youtube\.com\/.*$|^$/;
      const validPatreonLinkPattern = /^$|^https:\/\/www\.patreon\.com.*$/;

      const updatedYouTubeLink = processLink(
         validYouTubeLinkPattern,
         youtubeReactionLink,
         setYouTubeLinkWarning
      );
      const updatedPatreonLink = processLink(
         validPatreonLinkPattern,
         patreonReactionLink,
         setPatreonLinkWarning
      );

      const links = {
         youtube: updatedYouTubeLink,
         patreon: updatedPatreonLink,
      };

      setWatchedMovieLinks(watchedMovieData.id, links);
   };

   const convertDateFormat = (date, releaseDate) => {
      const months = [
         "January",
         "February",
         "March",
         "April",
         "May",
         "June",
         "July",
         "August",
         "September",
         "October",
         "November",
         "December",
      ];
      let originalDate, month, day, year;
      if (releaseDate) {
         month = date?.split("-")[1];
         day = date?.split("-")[2];
         year = date?.split("-")[0];
         originalDate = new Date(`${month}-${day}-${year}`);
      }

      originalDate = new Date(date);
      month = originalDate.getMonth();
      day = originalDate.getDate();
      year = originalDate.getFullYear();

      return `${months[month]} ${day}, ${year}`;
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
               {(data?.hasReacted || data?.hasSeen || data?.isRewatch) && (
                  <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-black/[.5] z-10">
                     <p
                        className={`text-[20px] text-shadow font-bold text-center ${
                           data?.isRewatch
                              ? "leading-[22px] lg:leading-[13px] lg:text-[12px]"
                              : "leading-[16px] lg:text-[14px]"
                        }`}
                     >
                        {data?.hasReacted && <>On Channel</>}
                        {data?.hasSeen && <>Seen</>}
                        {data?.isRewatch && <>Rewatch with Friend?</>}
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
               {data?.data?.Rating ? data?.data?.Rating.toFixed(1) : "N/A"}
            </div>
            <div className="lg:w-[40px]">
               <span className="inline lg:hidden">Requests:</span>{" "}
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
         <Modal
            open={moreInfoOpen}
            onClose={onCloseMoreInfoModal}
            center
            classNames={{ modal: "more-info-modal" }}
         >
            <div
               style={{
                  background: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${data?.data?.Backdrop})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
               }}
            >
               <div className="p-[20px] bg-black sm:bg-black/[.85]">
                  <div className="sm:pt-[20px]">
                     <a
                        href={`https://www.imdb.com/title/${data?.data?.imdbID}`}
                        target="_blank"
                     >
                        Go to IMDB
                     </a>
                     <h2 className="flex gap-[10px] items-center text-[18px] font-bold">
                        {data?.data?.Title}{" "}
                        {data?.data?.Year && <>({data?.data?.Year})</>}{" "}
                        {data?.data?.Rated && (
                           <span className="text-[13px] border-[1px] pl-[3px] pr-[4px] whitespace-nowrap">
                              {data?.data?.Rated}
                           </span>
                        )}
                        <span className="text-[13px]">
                           {data?.data?.Runtime > 0 &&
                              `${data?.data?.Runtime} mins.`}
                        </span>
                     </h2>
                     {data?.data?.Studio && (
                        <div className="text-[12px]">{data?.data?.Studio}</div>
                     )}
                     <div className="flex gap-[20px] flex-col xs:flex-row mt-[10px]">
                        <div className="w-[135px] sm:w-[185px] mx-auto">
                           {data?.data?.Poster ? (
                              <img
                                 src={
                                    data?.data?.Poster.includes("media-amazon")
                                       ? data?.data?.Poster
                                       : `https://image.tmdb.org/t/p/w300_and_h450_bestv2${data?.data?.Poster}`
                                 }
                                 alt={data?.data?.Title}
                                 className="h-[200px] sm:h-[275px] mx-auto"
                              />
                           ) : (
                              <div className="flex justify-center items-center bg-[#585858] h-[200px] w-[135px] sm:h-[275px] sm:w-[185px] mx-auto">
                                 <FaRegImage className="text-[40px]" />
                              </div>
                           )}
                        </div>

                        <div className="flex flex-1 flex-col">
                           {data?.data?.Genre && (
                              <div>
                                 <span className="font-bold">Genre:</span>{" "}
                                 {data?.data?.Genre}
                              </div>
                           )}
                           {data?.data?.Actors && (
                              <div>
                                 <span className="font-bold">Cast:</span>{" "}
                                 <span className="hidden sm:inline">
                                    {data?.data?.Actors}
                                 </span>
                                 <span className="inline sm:hidden">
                                    {data?.data?.Actors.split(",")
                                       .slice(0, 3)
                                       .join(", ")}
                                 </span>
                              </div>
                           )}
                           {data?.data?.Director && (
                              <div>
                                 <span className="font-bold">
                                    {data?.data?.Type === "movie"
                                       ? "Director: "
                                       : "Creator: "}
                                 </span>{" "}
                                 {data?.data?.Director}
                              </div>
                           )}
                           {data?.data?.Composer && (
                              <div>
                                 <span className="font-bold">Composer:</span>{" "}
                                 {data?.data?.Composer}
                              </div>
                           )}
                           {data?.data?.Rating > 0 && (
                              <div>
                                 <span className="font-bold">TMDB Rating:</span>{" "}
                                 {data?.data?.Rating.toFixed(1)}
                              </div>
                           )}
                           {data?.data?.Release && (
                              <div>
                                 <span className="font-bold">Released:</span>{" "}
                                 {convertDateFormat(data?.data?.Release, true)}
                              </div>
                           )}
                           {data?.createdAt && (
                              <div>
                                 <span className="font-bold">Requested:</span>{" "}
                                 {convertDateFormat(data?.createdAt, false)}
                              </div>
                           )}
                           <div>
                              <span className="font-bold">Requests:</span>{" "}
                              {data?.voters?.length}
                           </div>
                           <div>
                              <span className="font-bold">Status:</span>{" "}
                              {data?.hasSeen && "Seen"}
                              {data?.hasReacted && "On Channel"}
                              {data?.isRewatch && "Rewatch with Friend?"}
                              {!data?.hasSeen &&
                                 !data.hasReacted &&
                                 !data.isRewatch &&
                                 "Unseen"}
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
                  </div>
               </div>
            </div>
            {isCreator && (
               <div className="flex flex-col flex-1">
                  <div className="film-strip mt-[10px]"></div>
                  <div className="p-[20px]">
                     <div className="flex justify-between max-w-[400px] mx-auto">
                        <div className="flex flex-col items-center">
                           <div className="leading-[16px] mb-[8px]">
                              Channel
                           </div>
                           <div className="checkbox-container">
                              <label
                                 className="checkbox"
                                 htmlFor={`checkbox-${data?._id}`}
                              >
                                 <input
                                    type="radio"
                                    value="channel"
                                    id={`checkbox-${data?._id}`}
                                    checked={
                                       !!requestStatus[data?._id]?.hasReacted
                                    }
                                    onChange={(e) => {
                                       handleStatusSetting(e, data);
                                    }}
                                 />
                                 <div className="checkmark"></div>
                              </label>
                           </div>
                        </div>
                        <div className="flex flex-col items-center">
                           <div className="leading-[16px] mb-[8px]">Seen</div>
                           <div className="checkbox-container">
                              <label
                                 className="checkbox"
                                 htmlFor={`checkbox2-${data?._id}`}
                              >
                                 <input
                                    type="radio"
                                    value="seen"
                                    id={`checkbox2-${data?._id}`}
                                    checked={
                                       !!requestStatus[data?._id]?.hasSeen
                                    }
                                    onChange={(e) =>
                                       handleStatusSetting(e, data)
                                    }
                                 />
                                 <div className="checkmark"></div>
                              </label>
                           </div>
                        </div>
                        <div className="flex flex-col items-center">
                           <div className="leading-[16px] mb-[8px]">
                              Rewatch
                           </div>
                           <div className="checkbox-container">
                              <label
                                 className="checkbox"
                                 htmlFor={`checkbox3-${data?._id}`}
                              >
                                 <input
                                    type="radio"
                                    value="rewatch"
                                    id={`checkbox3-${data?._id}`}
                                    checked={
                                       !!requestStatus[data?._id]?.isRewatch
                                    }
                                    onChange={(e) =>
                                       handleStatusSetting(e, data)
                                    }
                                 />
                                 <div className="checkmark"></div>
                              </label>
                           </div>
                        </div>
                        <div className="flex flex-col items-center">
                           <div className="leading-[16px] mb-[8px]">Unseen</div>
                           <div className="checkbox-container">
                              <label
                                 className="checkbox"
                                 htmlFor={`checkbox4-${data?._id}`}
                              >
                                 <input
                                    type="radio"
                                    value="unseen"
                                    id={`checkbox4-${data?._id}`}
                                    checked={
                                       !!requestStatus[data?._id]?.isUnseen
                                    }
                                    onChange={(e) =>
                                       handleStatusSetting(e, data)
                                    }
                                 />
                                 <div className="checkmark"></div>
                              </label>
                           </div>
                        </div>
                     </div>
                     {data?.hasReacted && (
                        <div className="flex flex-col flex-1 mt-[20px]">
                           <form
                              className="flex flex-col gap-[15px]"
                              onSubmit={handleLinkUpdate}
                           >
                              <input
                                 className="w-full px-[8px] py-[5px] text-[black]"
                                 type="text"
                                 placeholder="YouTube Reaction Link"
                                 value={youtubeReactionLink}
                                 onChange={(e) =>
                                    setYouTubeReactionLink(
                                       e.target.value.trim()
                                    )
                                 }
                              />
                              <input
                                 className="w-full px-[8px] py-[5px] text-[black]"
                                 type="text"
                                 placeholder="Patreon Full Length Reaction Link"
                                 value={patreonReactionLink}
                                 onChange={(e) =>
                                    setPatreonReactionLink(
                                       e.target.value.trim()
                                    )
                                 }
                              />
                              <button
                                 className="bg-[#830483] hover:bg-[#a300a3] focus-visible:bg-[#a300a3] transition-colors duration-300 ease-in-out text-white p-[5px] max-w-[115px]"
                                 type="submit"
                              >
                                 Submit
                              </button>
                              {(youtubeLinkWarning || patreonLinkWarning) && (
                                 <div>
                                    {youtubeLinkWarning && (
                                       <div className="flex items-center gap-[5px] text-[red]">
                                          <AiFillYoutube className="text-[20px]" />
                                          {youtubeLinkWarning}
                                       </div>
                                    )}
                                    {patreonLinkWarning && (
                                       <div className="flex items-center gap-[5px] text-[white]">
                                          <BiLogoPatreon className="text-[20px]" />
                                          {patreonLinkWarning}
                                       </div>
                                    )}
                                 </div>
                              )}
                           </form>
                        </div>
                     )}
                  </div>
                  <div className="film-strip mb-[10px]"></div>
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
               Confirm you want to remove this request?
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
