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
            className="bg-[black] text-white cursor-pointer mb-4 py-1 px-3"
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
