import SimpleDialog from "./common/dialog/SimpleDialog";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import { editPost, clearErrorMsg, getPostsData } from "../posts/postSlice";

const EditPostDialog = ({ content, postID, openDialog, handleDialogClose }) => {
  const dispatch = useDispatch();

  const { postsDataErrorMsg, submitLoader } = useSelector(
    (state) => state.posts
  );
  // const [existingTextFieldValue] = useState() // if we make the input field state-controlled it will re-open the dialog when it is change. To prevent that material has given us this unique way of using submitFormProps
  const submitFormProps = {
    component: "form",
    onSubmit: async (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const formJson = Object.fromEntries(formData.entries());
      const postContent = formJson.postContent;
      console.log("postContent", postContent);
      const response = await dispatch(editPost({ postID, postContent }));
      console.log(response);
      if (response?.meta?.requestStatus === "fulfilled") {
        handleDialogClose();
        dispatch(getPostsData());
      }
    },
  };
  return (
    <SimpleDialog
      openDialog={openDialog}
      handleClickDialogClose={handleDialogClose}
      dialogTitle={"Edit post"}
      dialogActionName={"edit"}
      paperPropsObject={submitFormProps}
      loadingState={submitLoader}
      loadingStateText="Editing..."
    >
      <Box sx={{ width: 800, maxWidth: "100%" }}>
        {postsDataErrorMsg !== "" && (
          <Box
            sx={{
              color: "red",
            }}
          >
            Error in creating post. Please try later.
          </Box>
        )}
        <TextField
          defaultValue={content}
          autoFocus
          required
          margin="dense"
          name="postContent"
          fullWidth
          hiddenLabel
          id="post-content-input-box"
          variant="outlined"
          multiline
          rows={12}
          placeholder="What's on your mind, User?"
        />
      </Box>
    </SimpleDialog>
  );
};

export default EditPostDialog;
