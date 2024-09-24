import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
const SimpleDialog = ({
	children,
	openDialog,
	handleDialogClose,
	dialogTitle,
	dialogActionsHandler,
	dialogActionName,
	onSubmitHandler,
	paperPropsObject = {},
	ariaLabelMsg = "Generic Dialog Box",
}) => {
	console.log("HIIII");

	return (
		<Dialog
			onClose={handleDialogClose}
			open={openDialog}
			aria-labelledby={ariaLabelMsg}
			PaperProps={paperPropsObject}
		>
			<DialogTitle sx={{ m: 0, p: 1 }} id="customized-dialog-title">
				{dialogTitle}
			</DialogTitle>
			<IconButton
				aria-label="close"
				onClick={handleDialogClose}
				sx={(theme) => ({
					position: "absolute",
					right: 8,
					top: 8,
					color: theme.palette.grey[500],
				})}
			>
				<CloseIcon />
			</IconButton>
			<DialogContent dividers>{children}</DialogContent>
			<DialogActions>
				{/* <Button autoFocus variant="contained" onClick={dialogActionsHandler}>
          {dialogActionName}
        </Button> */}
				<Button type="submit" variant="contained">
					{dialogActionName}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default SimpleDialog;
