import { useState } from "react";
import EditPost from "./EditPost";
import DeletePost from "./DeletePost";
import Box from "@mui/material/Box";
import ButtonMUI from "./common/button/ButtonMUI";
const SinglePost = ({ eachPost }) => {
  const [isEdit, setIsEdit] = useState(false);
  const handleIsEdit = (value) => {
    setIsEdit(value);
  };
  const [openModal, setOpenModal] = useState(false);
  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);
  return (
    <Box
      key={eachPost?._id}
      sx={{
        margin: "20px 0px",
      }}
    >
      <div>
        {/* <h3>{eachPost?.title}</h3> */}
        <p>{eachPost?.content}</p>

        {/* <p>{eachPost?.author?.name}</p> */}
      </div>
      {isEdit && (
        <EditPost
          content={eachPost?.content}
          postID={eachPost?._id}
          handleIsEdit={handleIsEdit}
          openModal={openModal}
          handleModalClose={handleModalClose}
        />
      )}
      {!isEdit && (
        <div>
          {/* <button
            onClick={() => {
              handleIsEdit(true);
              handleModalOpen();
            }}
          >
            EDIT{" "}
          </button> */}

          <ButtonMUI
            btnText={"EDIT"}
            eventHandler={() => {
              handleIsEdit(true);
              handleModalOpen();
            }}
            btnSize="small"
          />
          <DeletePost content={eachPost?.content} postID={eachPost?._id} />
        </div>
      )}
    </Box>
  );
};

export default SinglePost;
