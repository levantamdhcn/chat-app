import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { appReducer } from "../store/reducers";
import socketMiddlerware from "./middlewares/socketMiddlerware";
import SocketClient from './socketClient';

const socket = new SocketClient()

export const store = configureStore({
  reducer: appReducer,
  devTools: process.env.NODE_ENV === 'development',
  middleware: [socketMiddlerware(socket), ...getDefaultMiddleware()]
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;