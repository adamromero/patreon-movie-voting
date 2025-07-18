import React from "react";

const ModalHeader = ({ data }) => {
   return (
      <>
         <a
            href={`https://www.imdb.com/title/${data?.data?.imdbID}`}
            target="_blank"
         >
            Go to IMDB
         </a>
         <h2 className="flex gap-[10px] items-center text-[18px] font-bold">
            {data?.data?.Title} {data?.data?.Year && <>({data?.data?.Year})</>}{" "}
            {data?.data?.Rated && (
               <span className="text-[13px] border-[1px] pl-[3px] pr-[4px] whitespace-nowrap">
                  {data?.data?.Rated}
               </span>
            )}
            <span className="text-[13px]">
               {data?.data?.Runtime > 0 && `${data?.data?.Runtime} mins.`}
            </span>
         </h2>
         {data?.data?.Studio && (
            <div className="text-[12px]">{data?.data?.Studio}</div>
         )}
      </>
   );
};

export default ModalHeader;
