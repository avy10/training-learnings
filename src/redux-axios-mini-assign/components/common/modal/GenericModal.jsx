import Modal from "@mui/material/Modal";
// import { Modal } from "@mui/base/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
const GenericModal = ({
  customStyles = {},
  modalTitle = "generic-modal",
  modalDescription = "this-is-a-generic-modal",
  openModal,
  handleModalClose,

  needBox = true,
  children,
}) => {
  /* needBox means do you need the default white colored box which
  renders on top of the overlay
  by default it is true means the modal will contain the white box
  in case you want your components to render inside the modal 
  use the props 
  */
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
  if (needBox) {
    return (
      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby={modalTitle}
        aria-describedby={modalDescription}
        disableEnforceFocus
      >
        <Box sx={style} className="modal-content-box">
          {/* <Button className="modal-close-button" variant="text">
          <CloseIcon sx={{ color: "red", fontSize: "18px" }} />
        </Button> */}
          <Box className="close-modal-button-box">
            <IconButton
              className="modal-close-button"
              aria-label="delete"
              size="large"
              onClick={handleModalClose}
            >
              <CloseIcon sx={{ color: "black", fontSize: "18px" }} />
            </IconButton>
          </Box>
          {children}
        </Box>
      </Modal>
    );
  }
  return (
    <Modal
      open={openModal}
      onClose={handleModalClose}
      aria-labelledby={modalTitle}
      aria-describedby={modalDescription}
    >
      {children}
    </Modal>
  );
};

export default GenericModal;
