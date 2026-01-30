import React from "react";
import {
  convertDateFormat,
  convertReleaseDate,
} from "../../utils/convertDateFormat";

const Details = ({ data }) => {
  return (
    <>
      {data?.data?.Genre && (
        <div>
          <span className="font-bold">Genre:</span> {data?.data?.Genre}
        </div>
      )}
      {data?.data?.Actors && (
        <div>
          <span className="font-bold">Cast:</span>{" "}
          <span className="hidden sm:inline">{data?.data?.Actors}</span>
          <span className="inline sm:hidden">
            {data?.data?.Actors.split(",").slice(0, 3).join(", ")}
          </span>
        </div>
      )}
      {data?.data?.Director && (
        <div>
          <span className="font-bold">
            {data?.data?.Type === "movie" ? "Director: " : "Creator: "}
          </span>{" "}
          {data?.data?.Director}
        </div>
      )}
      {data?.data?.Composer && (
        <div>
          <span className="font-bold">Composer:</span> {data?.data?.Composer}
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
          {convertDateFormat(convertReleaseDate(data?.data?.Release))}
        </div>
      )}
      {data?.createdAt && (
        <div>
          <span className="font-bold">Requested:</span>{" "}
          {convertDateFormat(data?.createdAt)}
        </div>
      )}

      {data?.publishedAt && (
        <div>
          <span className="font-bold">Published:</span>{" "}
          {convertDateFormat(data?.publishedAt)}
        </div>
      )}
      <div>
        <span className="font-bold">Votes:</span> {data?.voters?.length}
      </div>
      <div>
        <span className="font-bold">Status:</span> {data?.hasSeen && "Seen"}
        {data?.hasReacted && "On Channel"}
        {data?.isRewatch && "Rewatch"}
        {data?.isRewatchFriend && "Rewatch with Friend"}
        {!data?.hasSeen &&
          !data.hasReacted &&
          !data.isRewatch &&
          !data.isRewatchFriend &&
          "Unseen"}
      </div>
    </>
  );
};

export default Details;
