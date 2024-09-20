import { useState } from "react";
import { useDispatch } from "react-redux";
import withLoader from "./common/loader/withLoader";
import { createPostApiCall } from "../Posts/postSlice";
import GenericModal from "./common/modal/GenericModal";
import ButtonMUI from "./common/button/ButtonMUI";
const CreatePost = () => {
  const dispatch = useDispatch();
  const [postContent, setPostContent] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);
  const createPost = () => {
    dispatch(createPostApiCall(postContent, handleModalClose));
  };
  const handleInputChange = (event) => {
    setPostContent(event.target.value);
  };

  return (
    <div>
      {/* <button onClick={handleModalOpen}>Create Post</button> */}
      <ButtonMUI btnText={"Create Post"} eventHandler={handleModalOpen} />

      <GenericModal
        customStyles={{
          border: "none",
          borderRadius: "7px",
        }}
        openModal={openModal}
        handleModalClose={handleModalClose}
      >
        <label>Post Content : </label>
        <input type="text" value={postContent} onChange={handleInputChange} />
        <button onClick={createPost}>Create a new post</button>
      </GenericModal>
    </div>
  );
};
export default withLoader(CreatePost);
// export default CreatePost;
// abhishekEMT69!
