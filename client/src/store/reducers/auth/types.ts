import { IUser } from "../../../types/user";

export interface AuthState {
  isFetching: boolean,
  isSuccess: boolean,
  isError: boolean,
  errorMessage: string;
  isAuthenticated: boolean;
  isInitialised: boolean;
  user: IUser | null;
  contacts: IContact[];
};

export interface IContact {
  _id: string;
  memebers: IUser[];
}