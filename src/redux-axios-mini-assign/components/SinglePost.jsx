import { useState } from "react";
import EditPost from "./EditPost";
import DeletePost from "./DeletePost";
import Box from "@mui/material/Box";
import ButtonMUI from "./common/button/ButtonMUI";
import EditPostDialog from "./EditPostDialog";
const SinglePost = ({ eachPost }) => {
  const [editModal, setEditModal] = useState(false);
  const openEditModal = () => {
    setEditModal(true);
  };
  const closeEditModal = () => {
    setEditModal(false);
  };

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
      {/* {editModal && (
        <EditPost
          content={eachPost?.content}
          postID={eachPost?._id}
          openModal={editModal}
          handleModalClose={closeEditModal}
        />
      )} */}

      {editModal && (
        <EditPostDialog
          content={eachPost?.content}
          postID={eachPost?._id}
          openDialog={editModal}
          handleDialogClose={closeEditModal}
        />
      )}

      <div>
        <ButtonMUI
          btnText={"EDIT"}
          eventHandler={() => {
            openEditModal();
            openEditModal();
          }}
          btnSize="small"
        />
        <DeletePost content={eachPost?.content} postID={eachPost?._id} />
      </div>
    </Box>
  );
};

export default SinglePost;
