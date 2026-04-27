import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import counterReducer from "./features/counter/counterSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      counter: counterReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
