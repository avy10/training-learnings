import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../../Posts/postSlice";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

const withLoader = (Element) => {
  return (props) => {
    const { postsArr, postsUpdate } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const customStyles = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      bgcolor: "transparent",
      border: "none",
      boxShadow: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      columnGap: "10px",
    };
    const fetchNewPosts = () => {
      dispatch(getPosts());
    };
    useEffect(() => {
      fetchNewPosts();
    }, []);
    if (postsUpdate || postsArr.length === 0) {
      return (
        <Box sx={customStyles}>
          <p>Loading Posts...</p>
          <CircularProgress size="30px" />
        </Box>
      );
    }
    return <Element {...props} postsArr={postsArr} />;
  };
};
export default withLoader;
