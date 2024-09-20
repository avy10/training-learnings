// import Login from "./redux-axios-mini-assign/Components/Login";
import PostsList from "./redux-axios-mini-assign/Components/PostsList";
import CreatePost from "./redux-axios-mini-assign/Components/CreatePost";
import Container from "@mui/material/Container";
import "./styles.css";
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjlmZWNjZTMzZmE0NTVlZjg5ODA4YSIsImlhdCI6MTcyNjc1MTA1MywiZXhwIjoxNzU4Mjg3MDUzfQ.ScXemniTQ91mqpZMdvz5pI_tmqrvL-Imy5OiWEQIQSk"
export default function App() {
  return (
    <Container maxWidth="md" className="App">
      <h1>Facebook feed</h1>
      {/* <Login /> */}
      <CreatePost />
      <PostsList />
    </Container>
  );
}
