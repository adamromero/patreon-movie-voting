"use client";
import React from "react";
import SearchTitlesModal from "./SearchTitlesModal";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const SubmitRequestButton = ({ user, open, onOpenModal, onCloseModal }) => {
   return (
      <>
         <button
            onClick={onOpenModal}
            className="max-w-[200px] w-full bg-[black] focus-visible:bg-[#262626] hover:bg-[#262626] transition-colors duration-300 ease-in-out text-white cursor-pointer py-1 px-3"
         >
            Submit Requests
         </button>

         <Modal
            classNames={{
               modal: "request-movies-modal",
            }}
            open={open}
            onClose={onCloseModal}
            center
         >
            <SearchTitlesModal user={user} />
         </Modal>
      </>
   );
};

export default SubmitRequestButton;
