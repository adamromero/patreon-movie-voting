"use client";
import React, { useState } from "react";
import SearchTitlesModal from "./SearchTitlesModal";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const RequestMovies = ({ currentUser }) => {
   const [open, setOpen] = useState(false);

   const onOpenModal = () => setOpen(true);
   const onCloseModal = () => setOpen(false);

   return (
      <>
         <button
            onClick={onOpenModal}
            className="max-w-[313px] md:max-w-none bg-[black] focus-visible:bg-[#262626] hover:bg-[#262626] transition-colors duration-300 ease-in-out text-white cursor-pointer py-1 px-3"
         >
            Request Movies
         </button>
         <Modal open={open} onClose={onCloseModal} center>
            <SearchTitlesModal currentUser={currentUser} />
         </Modal>
      </>
   );
};

export default RequestMovies;
