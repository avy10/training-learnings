import { useState } from "react";
import { useSelector } from "react-redux";
import withLoader from "./common/loader/withLoader";
import SinglePost from "./SinglePost";
import Snackbar from "@mui/material/Snackbar";

const PostsList = (props) => {
  const posts = useSelector((state) => state.posts);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarContent, setSnackBarContent] = useState("");

  const handleClick = () => {
    setOpenSnackBar(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  return (
    <>
      {posts?.postsArr.map((eachPost) => (
        <SinglePost key={eachPost?._id} eachPost={eachPost} />
      ))}
    </>
  );
};

export default withLoader(PostsList);
