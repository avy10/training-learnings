import { useState } from "react";
import EditPost from "./EditPost";
import DeletePost from "./DeletePost";
import Box from "@mui/material/Box";

const SinglePost = ({ eachPost }) => {
  const [isEdit, setIsEdit] = useState(false);
  const handleIsEdit = (value) => {
    setIsEdit(value);
  };
  return (
    <Box
      key={eachPost?._id}
      sx={{
        margin: "20px 0px",
      }}
    >
      {!isEdit && (
        <div>
          {/* <h3>{eachPost?.title}</h3> */}
          <p>{eachPost?.content}</p>

          {/* <p>{eachPost?.author?.name}</p> */}
        </div>
      )}
      {isEdit && (
        <EditPost postID={eachPost?._id} handleIsEdit={handleIsEdit} />
      )}
      {!isEdit && (
        <div>
          <button onClick={() => handleIsEdit(true)}>EDIT </button>
          <DeletePost content={eachPost?.content} postID={eachPost?._id} />
        </div>
      )}
    </Box>
  );
};

export default SinglePost;
