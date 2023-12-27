import { createSlice, configureStore } from "@reduxjs/toolkit";
import loaderSlice from "./loaderSlice";
const authSlice = createSlice({
  name: "auth",
  initialState: { user: "", isLoggedIn: false },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
    loader: loaderSlice,
  },
});
export const authActions = authSlice.actions;
export const store = configureStore({
  reducer: authSlice.reducer,
});
