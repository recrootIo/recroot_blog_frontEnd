import { configureStore } from "@reduxjs/toolkit";
import messagesSlice from "./messagesSlice";

export default configureStore({
  reducer: {
    message: messagesSlice,
  },
});
