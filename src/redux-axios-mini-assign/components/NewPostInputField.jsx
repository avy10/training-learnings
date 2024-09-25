import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
const NewPostInputField = ({ postContent, handleInputChange }) => {
  return (
    <Box sx={{ width: 400, maxWidth: "100%" }}>
      <TextField
        fullWidth
        hiddenLabel
        id="post-content-input-box"
        variant="outlined"
        multiline
        rows={5}
        placeholder="What's on your mind, User?"
        value={postContent}
        onChange={handleInputChange}
      />
    </Box>
  );
};

export default NewPostInputField;
