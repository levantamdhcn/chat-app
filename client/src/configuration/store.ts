import { configureStore } from "@reduxjs/toolkit";
// import { authApi } from "../store/apis/auth";
import { userApi } from "../store/apis/user";
import { appReducer } from "../store/reducers";

export const store = configureStore({
  reducer: appReducer,
  devTools: process.env.NODE_ENV === 'development',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;