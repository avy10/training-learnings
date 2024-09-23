import PostsList from "./redux-axios-mini-assign/Components/PostsList";
import CreatePost from "./redux-axios-mini-assign/Components/CreatePost";
import Container from "@mui/material/Container";
import "./styles.css";
export default function App() {
  return (
    <Container maxWidth="md" className="app">
      <h1>Facebook feed</h1>
      <CreatePost />
      <PostsList />
    </Container>
  );
}
