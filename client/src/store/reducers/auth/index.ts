import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../configuration/axios";
import { RegisterInput } from "../../../types/api";
import { SigninInput } from "../../../views/auth/Login";
import { AuthState } from "./types";
import jwtDecode from "jwt-decode";

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT as string;

export const initialState: AuthState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  isAuthenticated: false,
  isInitialised: false,
  user: null,
};

export const setSession = (accessToken: string | null) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
  } else {
    localStorage.removeItem('accessToken');
  }
}

export const register = createAsyncThunk(
  `auth/register`, async ({ data }: { data: RegisterInput }, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/registration`, data);
      if (response.data) {
        const { user, token } = response.data;
        setSession(token);

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
      if (response.data) {
        const { user, token } = response.data;
        setSession(token);

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

export const initialise = createAsyncThunk(`auth/initialise`, async ({ token }: { token: string }, thunkAPI) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/user/currentUser`);
    if (response.data) {
      const user = response.data;
      setSession(token);

      return { user };
    } else {
      return thunkAPI.rejectWithValue(token);
    }
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(token);
  }
})
export const logout = () => {
  setSession(null);
  clearState();
}

const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }
  const decoded: any = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return !decoded.exp || decoded.exp > currentTime;
}


// const token = localStorage.getItem("accessToken");

// if(token && isValidToken(token)) {
//   setSession(token);
//   initialState.isFetching = true;
//   const user = axios.get(`${BASE_URL}/api/user/currentUser`);

// }

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
      console.log("payload", payload);
      state.isFetching = false;
      state.isSuccess = true;
      state.user = payload.user;
      state.isAuthenticated = true;
    },
    [login.fulfilled.type]: (state: AuthState, { payload }: { payload: any }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.user = payload.user;
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