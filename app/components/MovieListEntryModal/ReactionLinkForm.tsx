import React, { useState, useContext } from "react";
import { useBoundStore } from "@/stores/useBoundStore";
import { BiLogoPatreon } from "react-icons/bi";
import { AiFillYoutube } from "react-icons/ai";

const ReactionLinkForm = ({
   patreonReactionLink,
   setPatreonReactionLink,
   youtubeReactionLink,
   setYouTubeReactionLink,
   watchedMovieData,
}) => {
   const [youtubeLinkWarning, setYouTubeLinkWarning] = useState("");
   const [patreonLinkWarning, setPatreonLinkWarning] = useState("");

   const { setReactionLink } = useBoundStore();

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

      setReactionLink(watchedMovieData.id, links);
      //set published at timestampi
   };

   return (
      <div className="flex flex-col flex-1 mt-[20px]">
         <form className="flex flex-col gap-[10px]" onSubmit={handleLinkUpdate}>
            <input
               className="w-full px-[8px] py-[5px] text-[black]"
               type="text"
               placeholder="YouTube Reaction Link"
               value={youtubeReactionLink}
               onChange={(e) => setYouTubeReactionLink(e.target.value.trim())}
            />
            <input
               className="w-full px-[8px] py-[5px] text-[black]"
               type="text"
               placeholder="Patreon Full Length Reaction Link"
               value={patreonReactionLink}
               onChange={(e) => setPatreonReactionLink(e.target.value.trim())}
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
   );
};

export default ReactionLinkForm;
