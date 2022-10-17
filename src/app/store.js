import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../slices/basketSlice";

// The GLOBAL STORE is created here

export const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
});

// to set up REDUX