import { combineReducers } from "@reduxjs/toolkit"
import { slice as authSlice } from "./auth";
import { userApi } from "../apis/user";

const reducers = {
  auth: authSlice.reducer
}

export const appReducer = combineReducers(reducers);