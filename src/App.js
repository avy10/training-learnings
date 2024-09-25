import PostsList from "./redux-axios-mini-assign/components/PostsList";
import CreatePost from "./redux-axios-mini-assign/components/CreatePost";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";

import { getPostsData } from "./redux-axios-mini-assign/posts/postSlice";
import "./styles.css";
import ButtonMUI from "./redux-axios-mini-assign/components/common/button/ButtonMUI";
import Snackbar from "@mui/material/Snackbar";
import SubmitButton from "./redux-axios-mini-assign/components/common/button/SubmitButton";
export default function App() {
  // snackbar states
  const [open, setOpen] = useState(false);

  const handleOpenSnackBar = () => {
    console.log("open snackbar");
    setOpen(true);
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  // .-.
  // demo
  const demoEventHandler = () => {
    console.log("This button has its own click handler");
  };
  // ._.
  return (
    <Container maxWidth="md" className="app">
      <h1>Facebook feed</h1>
      <div>
        <SubmitButton
          btnText={"Submit"}
          clickHandlerFunction={demoEventHandler}
        />
      </div>
      <ButtonMUI btnText={"Open Snackbar"} eventHandler={handleOpenSnackBar} />
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
        message="Note archived"
      />

      <CreatePost />
      <PostsList />
    </Container>
  );
}
