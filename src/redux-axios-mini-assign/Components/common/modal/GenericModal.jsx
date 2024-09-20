import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Button";
const GenericModal = ({
  customStyles = {},
  modalTitle = "generic-modal",
  modalDescription = "this-is-a-generic-modal",
  openModal,
  handleModalClose,
  children,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    ...customStyles,
  };

  return (
    <Modal
      open={openModal}
      onClose={handleModalClose}
      aria-labelledby={modalTitle}
      aria-describedby={modalDescription}
    >
      <Box sx={style}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
          accusantium eos fuga quas culpa aspernatur! Eum ipsam ad reprehenderit
          sunt.
        </p>
        {children}
      </Box>
    </Modal>
  );
};

export default GenericModal;
