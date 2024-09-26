import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../posts/postSlice";
import { Box } from "@mui/material";
import ButtonMUI from "./common/button/ButtonMUI";
import GenericModal from "./common/modal/GenericModal";
import SubmitButton from "./common/button/SubmitButton";
const DeletePost = ({ postID }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { loader } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const postDeletion = () => {
    dispatch(deletePost({ postID, closeDeleteModal }));
  };
  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };
  const customStyles = { textAlign: "center" };
  return (
    <>
      <ButtonMUI
        eventHandler={openDeleteModal}
        btnText={"DELETE"}
        btnSize="small"
      />
      <GenericModal
        openModal={showDeleteModal}
        handleModalClose={closeDeleteModal}
        modalTitle="delete-post-modal"
        modalDescription="This is a window which asks user for confirmation before deleting the modal"
        customStyles={customStyles}
      >
        <h3>Are you sure you want to delete the post?</h3>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <SubmitButton
            btnText={"yes"}
            clickHandlerFunction={postDeletion}
            loadingState={loader}
          />
          <ButtonMUI btnText={"no"} eventHandler={closeDeleteModal} />
        </Box>
      </GenericModal>
    </>
  );
};
export default DeletePost;
