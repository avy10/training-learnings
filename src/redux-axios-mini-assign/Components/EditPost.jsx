import { useState } from "react";
import { useDispatch } from "react-redux";
import { editPost, updatingPost } from "../Posts/postSlice";
import axios from "axios";
import ButtonMUI from "./common/button/ButtonMUI";
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
  // const editPost = () => {
  //   dispatch(
  //     updatingPost(
  //       dispatch,
  //       postID,
  //       handleIsEdit,
  //       postContent,
  //       clearPostContent
  //     )
  //   );
  // };
  const editAPost = () => {
    dispatch(editPost({ postID, handleIsEdit, postContent, clearPostContent }));
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
        {/* <button onClick={editAPost}>EDIT POST</button> */}
        <ButtonMUI
          btnText={"EDIT POST"}
          eventHandler={() => {
            editAPost();
          }}
          btnSize="small"
        />
      </div>
    </GenericModal>
  );
};

export default EditPost;
/* 
  no need to wrap EditPost component because, 
  when a post is edited, a GET api call is made to get the posts data
  so that the posts data is updated
  and we already have a loader on PostsList
  
*/
