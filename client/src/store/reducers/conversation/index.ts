import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "./../../../configuration/axios";
import { IConversationState, TConversation } from "./types";

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
  name: 'conversation',
  initialState,
  reducers: {
    clearState: () => initialState,
    setConversation: (state, { payload }) => {
      state.currentConversation = payload;
    },
    setConversations: (state, { payload }) => {
      state.conversations = payload;
    },
    sendMessage: (state, { payload }) => {
      console.log("payload", payload)
      state.isMsgSending = false;
      if (state.currentConversation) {
        state.currentConversation = {
          ...state.currentConversation,
          messages: state.currentConversation.messages.concat([payload.data]),
        }

        state.conversations = state.conversations.map(el => {
          if (el._id === state.currentConversation?._id) {
            return state.currentConversation;
          }
          return el;
        });
      };
      state.isMsgSendSuccess = true;
    },
    addMessage: (state, { payload }) => {
      if (state.currentConversation) {
        state.currentConversation = {
          ...state.currentConversation,
          messages: state.currentConversation.messages.concat([payload]),
        }

        state.conversations = state.conversations.map(el => {
          if (el._id === state.currentConversation?._id) {
            return state.currentConversation;
          }
          return el;
        });
      };
    },
  },
  extraReducers: {
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

export const { clearState, setConversation, setConversations, sendMessage, addMessage } = slice.actions;