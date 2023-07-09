import { configureStore } from "@reduxjs/toolkit";
import schedulesReducer from "./scheduleSlice";

const store = configureStore({
  reducer: {
    schedules: schedulesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
