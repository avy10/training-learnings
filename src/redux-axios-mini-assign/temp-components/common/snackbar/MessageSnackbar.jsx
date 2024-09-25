import Button from "@mui/material/Button";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
const MessageSnackbar = ({ open, onCloseHandle, message }) => {
	return (
		<Snackbar
			open={open}
			autoHideDuration={6000}
			onClose={onCloseHandle}
			message={message}
		/>
	);
};

export default MessageSnackbar;
