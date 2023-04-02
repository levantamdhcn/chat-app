import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../configuration/axios";
import { IConversationState, TConversation } from "./types";
import { IMessage } from "../../../types/message";
import { MessageInput } from "../../../views/chat/ChatBox/ChatBox";

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT as string;

export const initialState: IConversationState = {
  currentConversation: null,
  conversations: [],
  isFetching: false,
  isError: false,
  isSuccess: false,
  isMsgSending: false,
  isMsgSendSuccess: false,
  isMsgSendError: false,
  errorMessage: "",
};

export const sendMessage = createAsyncThunk(
  `message/send`, async ({ data }: { data: MessageInput }, thunkAPI): Promise<IMessage | unknown> => {
    try {
      const response = await axios.post(`${BASE_URL}/api/message`, data);
      if (response.data) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(data);
    }
  }
);

export const getConversations = createAsyncThunk(`conversation/getAll`, async ({ userId }: { userId: string }, thunkAPI): Promise<TConversation[] | unknown> => {
  try {
    const response = await axios.get(`${BASE_URL}/api/conversation/${userId}`);
    if (response.data) {
      return response.data;
    } else {
      return thunkAPI.rejectWithValue(userId);
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(userId);
  }
})


export const slice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    clearState: () => initialState,
    setConversation: (state, { payload }) => {
      state.currentConversation = payload;
    },
    setConversations: (state, { payload }) => {
      state.conversations = payload;
    }
  },
  extraReducers: {
    [sendMessage.pending.type]: (state: IConversationState, { payload }) => {
      state.isMsgSending = true;
    },
    [sendMessage.fulfilled.type]: (state: IConversationState, { payload }) => {
      state.isMsgSending = false;
      state.currentConversation?.messages.push(payload);
      state.isMsgSendSuccess = true;
    },
    [sendMessage.rejected.type]: (state: IConversationState, { payload }) => {
      state.isMsgSendError = false;
      state.isMsgSendSuccess = false;
      state.isMsgSendError = true;
      state.errorMessage = payload;
    },
    [getConversations.pending.type]: (state: IConversationState, { payload }) => {
      state.isFetching = true;
    },
    [getConversations.fulfilled.type]: (state: IConversationState, { payload }) => {
      state.isFetching = false;
      state.isError = false;
      state.isSuccess = true;
      state.conversations = payload;
      console.log("payload conversation", payload);
    },
    [getConversations.rejected.type]: (state: IConversationState, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.conversations = [];
    },
  }
});

export const { clearState } = slice.actions;