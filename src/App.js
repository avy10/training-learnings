import PostsList from "./redux-axios-mini-assign/components/PostsList";
import CreatePost from "./redux-axios-mini-assign/components/CreatePost";
import Container from "@mui/material/Container";

import "./styles.css";
export default function App() {
  // .-.
  /*  // demo
  const demoEventHandler = () => {
    console.log("This button has its own click handler");
  };
  // ._. */
  return (
    <Container
      maxWidth="md"
      className="app"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Facebook feed</h1>
      {/* <div>
        <SubmitButton
          btnText={"Submit"}
          clickHandlerFunction={demoEventHandler}
        />
      </div> */}

      <CreatePost />
      <PostsList />
    </Container>
  );
}
