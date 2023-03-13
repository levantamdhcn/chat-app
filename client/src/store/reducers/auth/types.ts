import { IUser } from "../../../types/user";

export interface AuthState {
  isFetching: boolean,
  isSuccess: boolean,
  isError: boolean,
  errorMessage: string;
  isAuthenticated: boolean;
  isInitialised: boolean;
  user: IUser | null;
};