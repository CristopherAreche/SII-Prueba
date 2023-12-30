import { configureStore } from "@reduxjs/toolkit";
import creditCardSlice from "./features/creditCardSlice/creditCardSlice";

const store = configureStore({
  reducer: {
    creditCardSlice,
  },
});

export default store;
