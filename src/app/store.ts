import { configureStore } from "@reduxjs/toolkit";
import mealReducer from "./mealSlice.ts";

export const store = configureStore({
  reducer: { meals: mealReducer }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;