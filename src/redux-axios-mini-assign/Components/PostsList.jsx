import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostsData } from "../Posts/postSlice";
import withLoader from "./common/loader/withLoader";
import SinglePost from "./SinglePost";
import Snackbar from "@mui/material/Snackbar";

const PostsList = (props) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarContent, setSnackBarContent] = useState("");
  useEffect(() => {
    console.log("fetch inside postslist");
    fetchNewPosts();
  }, []);
  const handleClick = () => {
    setOpenSnackBar(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  const fetchNewPosts = () => {
    dispatch(getPostsData());
  };

  return (
    <>
      {posts?.postsArr.map((eachPost) => (
        <SinglePost key={eachPost?._id} eachPost={eachPost} />
      ))}
    </>
  );
};

// export default withLoader(PostsList);
export default PostsList;
