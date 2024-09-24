import PostsList from "./redux-axios-mini-assign/Components/PostsList";
import CreatePost from "./redux-axios-mini-assign/Components/CreatePost";
import Container from "@mui/material/Container";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPostsData } from "./redux-axios-mini-assign/Posts/postSlice";
import "./styles.css";
export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("fetch inside postslist");
    fetchNewPosts();
  }, []);
  const fetchNewPosts = () => {
    dispatch(getPostsData());
  };
  return (
    <Container maxWidth="md" className="app">
      <h1>Facebook feed</h1>
      <CreatePost />
      <PostsList />
    </Container>
  );
}
