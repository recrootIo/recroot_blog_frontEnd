import { createSlice } from "@reduxjs/toolkit";
import { SUCCESS } from "../components/constants";

const initialValues = {
  open: true,
  message: "",
  type: SUCCESS,
};

const messageSlice = createSlice({
  name: "messages",
  initialState: initialValues,
  reducers: {
    openModal: (state, action) => {
      const { message, type } = action.payload;
      return {
        ...state,
        message: message,
        type: type,
        open: true,
      };
    },
    closeModal: (state) => {
      state.message = "";
      state.open = false;
      state.type = "";
    },
  },
});

export const { openModal, closeModal } = messageSlice.actions;

export default messageSlice.reducer;
