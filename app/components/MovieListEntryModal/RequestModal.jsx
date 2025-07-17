import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import ModalHeader from "./ModalHeader";
import PosterSection from "./PosterSection";
import Details from "./Details";
import HolidaySettings from "./HolidaySettings";
import StatusSelector from "./StatusSelector";
import LinksSection from "./LinksSection";

const RequestModal = ({
   data,
   moreInfoOpen,
   onCloseMoreInfoModal,
   requestStatusState,
   isCreator,
   patreonReactionLink,
   setPatreonReactionLink,
   youtubeReactionLink,
   setYouTubeReactionLink,
   watchedMovieData,
}) => {
   return (
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
                  <ModalHeader data={data} />
                  <div className="flex gap-[20px] flex-col xs:flex-row mt-[10px]">
                     <PosterSection data={data} />
                     <div className="flex flex-1 flex-col">
                        <Details data={data} />
                        <div className="flex justify-between flex-col md:flex-row">
                           <LinksSection data={data} />
                           {isCreator && (
                              <HolidaySettings
                                 data={data}
                                 requestStatusState={requestStatusState}
                              />
                           )}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {isCreator && (
            <StatusSelector
               data={data}
               requestStatusState={requestStatusState}
               patreonReactionLink={patreonReactionLink}
               setPatreonReactionLink={setPatreonReactionLink}
               youtubeReactionLink={youtubeReactionLink}
               setYouTubeReactionLink={setYouTubeReactionLink}
               watchedMovieData={watchedMovieData}
            />
         )}
      </Modal>
   );
};

export default RequestModal;
