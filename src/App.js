// import Login from "./redux-axios-mini-assign/Components/Login";
import { useState } from "react";
import PostsList from "./redux-axios-mini-assign/Components/PostsList";
import CreatePost from "./redux-axios-mini-assign/Components/CreatePost";
import Container from "@mui/material/Container";
import "./styles.css";
import GenericModal from "./redux-axios-mini-assign/Components/common/modal/GenericModal";
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjlmZWNjZTMzZmE0NTVlZjg5ODA4YSIsImlhdCI6MTcyNjc1MTA1MywiZXhwIjoxNzU4Mjg3MDUzfQ.ScXemniTQ91mqpZMdvz5pI_tmqrvL-Imy5OiWEQIQSk"
export default function App() {
  const [openModal, setOpenModal] = useState(false);
  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);
  return (
    <Container maxWidth="md" className="App">
      <h1>Facebook feed</h1>
      <button onClick={handleModalOpen}>Open Modal</button>

      <GenericModal
        customStyles={{
          top: "20%",
          left: "20%",
          transform: "translate(-50%, -50%)",
        }}
        openModal={openModal}
        handleModalClose={handleModalClose}
      >
        ABHISHEK KUMAR
      </GenericModal>

      {/* <Login /> */}
      <CreatePost />
      <PostsList />
    </Container>
  );
}
