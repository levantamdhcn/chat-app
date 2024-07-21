import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../configuration/axios";
import { RegisterInput } from "../../../types/api";
import { SigninInput } from "../../../views/auth/Login";
import { AuthState } from "./types";
import jwtDecode from "jwt-decode";
import { SignUpInput } from "../../../views/auth/SignUp";

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT as string;

export const initialState: AuthState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  isAuthenticated: false,
  isInitialised: false,
  user: null,
  contacts: [],
  conversations: [],
};

export const setSession = (accessToken: string | null, refreshToken: string | null) => {
  if (accessToken && refreshToken) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  } else {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}

export const register = createAsyncThunk(
  `auth/register`, async ({ data }: { data: RegisterInput }, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/registration`, data);
      if (response.data) {
        const { user, accessToken, refreshToken } = response.data;
        setSession(accessToken, refreshToken);

        return { user };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(data);
    }
  }
);

export const login = createAsyncThunk(
  `auth/login`, async ({ data }: { data: SigninInput }, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, data);
      if (response.data.user) {
        const { user, accessToken, refreshToken } = response.data;
        setSession(accessToken, refreshToken);
        const contacts = await axios.get(`${BASE_URL}/api/contact/user/${user._id}`);
        const conversations = await axios.get(`${BASE_URL}/api/conversation/${user._id}`);

        return { user, contacts: contacts.data, conversations: conversations.data };
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(data);
    }
  }
);

export const initialise = createAsyncThunk(`auth/initialise`, async ({ accessToken, refreshToken }: { accessToken: string, refreshToken: string }, thunkAPI) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/user/currentUser`);
    if (response.data) {
      const user = response.data;
      setSession(accessToken, refreshToken);

      const contacts = await axios.get(`${BASE_URL}/api/contact/user/${user._id}`);
      const conversations = await axios.get(`${BASE_URL}/api/conversation/${user._id}`);

      return { user, contacts: contacts.data, conversations: conversations.data };
    } else {
      return thunkAPI.rejectWithValue(accessToken);
    }
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(accessToken);
  }
})
export const logout = () => {
  setSession(null, null);
  clearState();
}

export const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }
  const decoded: any = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return !decoded.exp || decoded.exp > currentTime;
}

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearState: () => initialState,
  },
  extraReducers: {
    [initialise.pending.type]: (state: AuthState, { payload }) => {
      state.isFetching = true;
    },
    [initialise.rejected.type]: (state: AuthState, { payload }) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.errorMessage = payload.errorMessage;
    },
    [initialise.fulfilled.type]: (state: AuthState, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.user = payload.user;
      state.contacts = payload.contacts;
      state.conversations = payload.conversations;
      state.isAuthenticated = true;
    },
    [login.fulfilled.type]: (state: AuthState, { payload }: { payload: any }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.user = payload.user;
      state.contacts = payload.contacts;
      state.conversations = payload.conversations;
      state.isAuthenticated = true;
    },
    [login.pending.type]: (state: AuthState) => {
      state.isFetching = true;
    },
    [login.rejected.type]: (state: AuthState, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [register.fulfilled.type]: (state: AuthState, { payload }: { payload: any }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.user = payload.user;
    },
    [register.pending.type]: (state: AuthState) => {
      state.isFetching = true;
    },
    [register.rejected.type]: (state: AuthState, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
  }
});

//TODO: export slice actions
export const { clearState } = slice.actions;