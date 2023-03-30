import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISocketState } from "./types";

export const initialState: ISocketState = {
  onlineUsers: [],
  typingUsers: [],
  messages: [],
}

export const slice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    clearState: () => initialState,
    setOnlineUsersByUsername: (state, { payload }: PayloadAction<string[]>) => {
      state.onlineUsers = payload
    },
    removeTypingUser: (state, { payload }) => {
      state.typingUsers = state.typingUsers.filter(_id => _id !== payload)
    },
    setTypingUser: (state, { payload }) => {
      state.typingUsers = [payload, ...[...state.typingUsers].filter(username => username !== payload)]
    },
    addMessage: (state, { payload }) => {
      state.messages = state.messages.concat(payload);
    },
  },
  extraReducers: {

  }
});

export const { setOnlineUsersByUsername, removeTypingUser, setTypingUser, addMessage, clearState } = slice.actions;