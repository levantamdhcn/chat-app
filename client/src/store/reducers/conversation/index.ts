import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../configuration/axios";
import { IConversationState } from "./types";
import { IMessage } from "../../../types/message";
import { MessageInput } from "../../../views/chat/ChatBox/ChatBox";

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT as string;

export const initialState: IConversationState = {
  currentConversation: {
    _id: "1",
    name: "No_name",
    members: [

    ],
    messages: [
      {
        _id: "1",
        fromUser: "1",
        toUser: "64046c6b6405c724942e2515",
        type: "string",
        messageText: "Helloo",
        conversationId: "1",
      },
      {
        _id: "2",
        fromUser: "64046c6b6405c724942e2515",
        toUser: "2",
        type: "string",
        messageText: "Helloo",
        conversationId: "1",
      },
      {
        _id: "1",
        fromUser: "64046c6b6405c724942e2515",
        toUser: "64046c6b6405c724942e2515",
        type: "string",
        messageText: "Helloo",
        conversationId: "1",
      },
      {
        _id: "1",
        fromUser: "1",
        toUser: "64046c6b6405c724942e2515",
        type: "string",
        messageText: "Helloo",
        conversationId: "1",
      },
    ]
  },
  conversations: [],
  isSending: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

export const sendMessage = createAsyncThunk(
  `message`, async ({ data }: { data: MessageInput }, thunkAPI): Promise<IMessage | unknown> => {
    try {
      return data;

      const response = await axios.post(`${BASE_URL}/api/message`, data);
      if (response.data) {
        const { _id,
          fromUser,
          toUser,
          type,
          messageText,
          conversationId } = response.data;

        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(data);
    }
  }
);


export const slice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    clearState: () => initialState,
  },
  extraReducers: {
    [sendMessage.pending.type]: (state: IConversationState, { payload }) => {
      state.isSending = true;
    },
    [sendMessage.fulfilled.type]: (state: IConversationState, { payload }) => {
      state.isSending = false;
      state.currentConversation?.messages.push(payload);
      state.isSuccess = true;
    },
    [sendMessage.rejected.type]: (state: IConversationState, { payload }) => {
      state.isSending = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = payload;
    },
  }
});

export const { clearState } = slice.actions;