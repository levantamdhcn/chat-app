import { combineReducers } from "@reduxjs/toolkit"
import { slice as authSlice } from "./auth";
import { slice as conversationSlice } from "./conversation";
import { userApi } from "../apis/user";

const reducers = {
  auth: authSlice.reducer,
  conversation: conversationSlice.reducer,
}

export const appReducer = combineReducers(reducers);