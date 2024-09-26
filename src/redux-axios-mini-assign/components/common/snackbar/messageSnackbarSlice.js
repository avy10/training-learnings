import { createSlice } from "@reduxjs/toolkit";

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: {
    open: false,
    message: "",
    vertical: "top",
    horizontal: "center",
    showDuration: 4000,
  },
  reducers: {
    showSnackbar: (state, action) => {
      state.open = true;
      state.message = action.payload.message || "Something went wrong!";
      state.vertical = action.payload.vertical || "top";
      state.horizontal = action.payload.horizontal || "center";
      state.showDuration = action.payload.showDuration || 4000;
    },
    hideSnackbar: (state) => {
      state.open = false;
      state.message = "";
      state.vertical = "top";
      state.horizontal = "center";
      state.showDuration = 4000;
    },
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
