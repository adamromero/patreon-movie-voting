import React, { useContext } from "react";
import { MovieContext } from "@/context/MovieContext";
import ReactionLinkForm from "./ReactionLinkForm";

const StatusSelector = ({
  data,
  requestStatusState,
  patreonReactionLink,
  setPatreonReactionLink,
  youtubeReactionLink,
  setYouTubeReactionLink,
  watchedMovieData,
}) => {
  const { setRequestWatchStatus } = useContext(MovieContext);

  const handleStatusSetting = (e, data) => {
    const selectedValue = e.target.value;
    setRequestWatchStatus(data?._id, selectedValue);
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="film-strip mt-[10px]"></div>
      <div className="p-[15px]">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mx-auto text-center">
          <div className="flex flex-col items-center">
            <div className="leading-[16px] mb-2">Channel</div>
            <div className="checkbox-container">
              <label className="checkbox" htmlFor={`checkbox-${data?._id}`}>
                <input
                  type="radio"
                  value="channel"
                  id={`checkbox-${data?._id}`}
                  checked={!!requestStatusState[data?._id]?.hasReacted}
                  onChange={(e) => {
                    handleStatusSetting(e, data);
                  }}
                />
                <div className="checkmark"></div>
              </label>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="leading-[16px] mb-2">Seen</div>
            <div className="checkbox-container">
              <label className="checkbox" htmlFor={`checkbox2-${data?._id}`}>
                <input
                  type="radio"
                  value="seen"
                  id={`checkbox2-${data?._id}`}
                  checked={!!requestStatusState[data?._id]?.hasSeen}
                  onChange={(e) => handleStatusSetting(e, data)}
                />
                <div className="checkmark"></div>
              </label>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="leading-[16px] mb-2">Rewatch</div>
            <div className="checkbox-container">
              <label className="checkbox" htmlFor={`checkbox3-${data?._id}`}>
                <input
                  type="radio"
                  value="rewatch"
                  id={`checkbox3-${data?._id}`}
                  checked={!!requestStatusState[data?._id]?.isRewatch}
                  onChange={(e) => handleStatusSetting(e, data)}
                />
                <div className="checkmark"></div>
              </label>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="leading-[16px] mb-2">Rewatch with Friend</div>
            <div className="checkbox-container">
              <label className="checkbox" htmlFor={`checkbox4-${data?._id}`}>
                <input
                  type="radio"
                  value="rewatchFriend"
                  id={`checkbox4-${data?._id}`}
                  checked={!!requestStatusState[data?._id]?.isRewatchFriend}
                  onChange={(e) => handleStatusSetting(e, data)}
                />
                <div className="checkmark"></div>
              </label>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="leading-[16px] mb-2">Unseen</div>
            <div className="checkbox-container">
              <label className="checkbox" htmlFor={`checkbox5-${data?._id}`}>
                <input
                  type="radio"
                  value="unseen"
                  id={`checkbox5-${data?._id}`}
                  checked={!!requestStatusState[data?._id]?.isUnseen}
                  onChange={(e) => handleStatusSetting(e, data)}
                />
                <div className="checkmark"></div>
              </label>
            </div>
          </div>
        </div>
        {data?.hasReacted && (
          <ReactionLinkForm
            patreonReactionLink={patreonReactionLink}
            setPatreonReactionLink={setPatreonReactionLink}
            youtubeReactionLink={youtubeReactionLink}
            setYouTubeReactionLink={setYouTubeReactionLink}
            watchedMovieData={watchedMovieData}
          />
        )}
      </div>
      <div className="film-strip mb-[10px]"></div>
    </div>
  );
};

export default StatusSelector;
