import { IUser } from "../../../types/user";
import { TConversation } from "../conversation/types";

export interface AuthState {
  isFetching: boolean,
  isSuccess: boolean,
  isError: boolean,
  errorMessage: string;
  isAuthenticated: boolean;
  isInitialised: boolean;
  isUserActive: boolean;
  user: IUser | null;
  contacts: IContact[];
  conversations: TConversation[];
};

export interface IContact {
  _id: string;
  members: IUser[];
}