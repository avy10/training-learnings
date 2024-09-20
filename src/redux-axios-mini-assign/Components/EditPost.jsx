import { useState } from "react";
import { useDispatch } from "react-redux";
import { updatingPost } from "../Posts/postSlice";
import axios from "axios";
import GenericModal from "./common/modal/GenericModal";
const JWT_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjlmZWNjZTMzZmE0NTVlZjg5ODA4YSIsImlhdCI6MTcyNjc1MTA1MywiZXhwIjoxNzU4Mjg3MDUzfQ.ScXemniTQ91mqpZMdvz5pI_tmqrvL-Imy5OiWEQIQSk";

const EditPost = ({
  content,
  postID,
  handleIsEdit,
  openModal,
  handleModalClose,
}) => {
  const dispatch = useDispatch();
  const [postContent, setPostContent] = useState(content);
  const clearPostContent = () => {
    setPostContent("");
  };
  const handleInputChange = (event) => {
    setPostContent(event.target.value);
  };
  const deletePost = () => {
    dispatch(
      updatingPost(
        dispatch,
        postID,
        handleIsEdit,
        postContent,
        clearPostContent
      )
    );
  };

  return (
    <GenericModal
      customStyles={{
        border: "none",
        borderRadius: "7px",
      }}
      openModal={openModal}
      handleModalClose={handleModalClose}
    >
      <div>
        <label>Post Content : </label>
        <input type="text" value={postContent} onChange={handleInputChange} />
        <button onClick={deletePost}>EDIT POST</button>
      </div>
    </GenericModal>
  );
};

export default EditPost;
